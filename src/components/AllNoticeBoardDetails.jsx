import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Header from './Header';
import {AppColors} from '../assets/Colors';
import {DRIVER_NOTICE} from '../apis/Apis';
import {AppFont} from '../assets/FontsFamily';
import {RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

const AllNoticeBoardComponent = () => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  console.log(
    languageSwitch,
    ' const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch) ',
  );

  const navigation = useNavigation();
  const [noticeBoardData, setNoticeBoardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getAllDriverNotice = async () => {
    console.log('runnnnnnn');

    setIsLoading(true);
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_all_notice',
        current_language: languageSwitch,
      });
      console.log(
        response,
        'view_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_notice',
      );

      setNoticeBoardData(response?.awareness_data);
    } catch (error) {
      console.error(' Driver Notice error:', error);
      setIsLoading(false);
      // Alert.alert('Error', 'Failed to fetch notices. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllDriverNotice();
    }, []),
  );

  const handleNoticePress = useCallback(
    noticeBoard => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: noticeBoard.id,
      });
    },
    [navigation],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // dispatch(setRefreshKey());
      await getAllDriverNotice();
    } catch (error) {
      console.log('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="small" color={AppColors.mainColor} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {noticeBoardData &&
        noticeBoardData.map(noticeBoard => (
          <TouchableOpacity
            key={noticeBoard.id}
            style={styles.touchable}
            onPress={() => handleNoticePress(noticeBoard)}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={
                  noticeBoard.status_image === 'open_envlop.png'
                    ? OpenEnvelop
                    : CloseEnvelop
                }
              />
            </View>
            {/* <View style={styles.textContainer}>
              <Text style={styles.subjectText}>
                {noticeBoard.subject &&
                  noticeBoard.subject.substring(0, 50) + '...'}
              </Text>
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.subjectText} numberOfLines={1}>
                {noticeBoard.subject}
              </Text>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              <Text style={styles.subjectText}>{noticeBoard.timestamp}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export const NoticeBoardDetailScreen = ({route}) => {
  const {noticeId} = route.params;
  const [notice, setNotice] = useState({});
  const [bottamButtonText, setBottamButtonText] = useState({});
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  console.log(
    languageSwitch,
    ' const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch)=============== ',
  );

  const clickStoreHomeNotice = async id => {
    console.log(id, 'clickStoreHomeNotice clickStoreHomeNotice');

    // return false;
    try {
      const response = await DRIVER_NOTICE({
        action: 'read_awareness_notice',
        awareness_id: id,
        current_language: languageSwitch,
      });

      console.log(response, ' clickStoreHomeNotice noticeeee');

      // setNotification(response.headline);
      // dispatch(setStoredRating(response.headline.rate));
    } catch (err) {
      console.error('VIEW_HEADLINE error:', err);
    }
  };

  const fetchNoticeData = useCallback(async () => {
    setLoader(true);
    try {
      const [noticeResponse] = await Promise.all([
        DRIVER_NOTICE({
          action: 'view_one_awareness',
          id: noticeId,
          current_language: languageSwitch,
        }),
      ]);

      setNotice(noticeResponse.awareness);
      setBottamButtonText(noticeResponse);

      await Promise.all([
        DRIVER_NOTICE({
          action: 'record_view_one_awareness_click',
          id: noticeId,
          subject: noticeResponse.awareness.subject,
        }),
      ]);
    } catch (error) {
      console.error('Error fetching notice data:', error);
      Alert.alert('Error', 'Failed to load notice details. Please try again.');
    } finally {
      setLoader(false);
    }
  }, [noticeId]);

  useFocusEffect(
    useCallback(() => {
      fetchNoticeData();
    }, [fetchNoticeData]),
  );

  const formatDate = useCallback(dateString => {
    const [datePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }, []);

  const handleNoticeFooterPress = useCallback(
    footerNotice => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: footerNotice.id,
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView style={styles.scrollView}>
        {/* {notice && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailSubject}>{notice.subject}</Text>
            <Text style={styles.detailDescription}>
              {notice.description}
            </Text>
          </View>
        )} */}
        {/*  */}

        {loader ? (
          <ActivityIndicator
            size={'small'}
            style={{
              marginTop: '50%',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : (
          !loader &&
          notice && (
            <View
              style={{
                flex: 1,
                padding: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#0056b3',
                  padding: 16,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {notice.subject}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: 20,
                  width: '100%',
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#e9f6ff',
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 16,
                    borderLeftColor: '#0056b3',
                    borderLeftWidth: 5,
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 18,
                      marginBottom: 20,
                    }}>
                    {notice.description}
                  </Text>

                  {bottamButtonText?.back_btn == '1' ? (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: '#0056b3',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {bottamButtonText?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        clickStoreHomeNotice(bottamButtonText?.awareness?.id)
                      }
                      style={{
                        backgroundColor: '#0056b3',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {notice?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flexGrow: 1,
  },

  detailContainer: {
    marginBottom: 15,
    padding: 20,
  },
  detailSubject: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailDescription: {
    color: AppColors.black,
    fontSize: 15,
    paddingTop: 15,
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },
  detailText: {
    fontSize: 16,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
    marginBottom: 10,
  },
  container: {
    // padding: 10,
    // margin: 10,
    backgroundColor: AppColors.white,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
  },
  selectedTouchable: {
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    marginRight: 10,
    paddingTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  footerNoticeItem: {
    flexDirection: 'row',
    margin: 5,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  subjectText: {
    fontSize: 19,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
  },
  indexText: {
    fontSize: 15,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
  },

  largeIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
    textAlign: 'center',
    padding: 20,
  },
});

export default AllNoticeBoardComponent;

//

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import {CloseEnvelop, OpenEnvelop} from '../assets/images';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import Header from './Header';
// import {AppColors} from '../assets/Colors';
// import {DRIVER_NOTICE} from '../apis/Apis';
// import {AppFont} from '../assets/FontsFamily';
// import {RefreshControl} from 'react-native';
// import {useSelector} from 'react-redux';

// const AllNoticeBoardComponent = () => {
//   const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
//   console.log(
//     languageSwitch,
//     ' const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch) ',
//   );

//   const navigation = useNavigation();
//   const [noticeBoardData, setNoticeBoardData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const getAllDriverNotice = async () => {
//     console.log('runnnnnnn');

//     setIsLoading(true);
//     try {
//       const response = await DRIVER_NOTICE({
//         action: 'view_all_notice',
//         current_language: languageSwitch,
//       });
//       console.log(
//         response,
//         'view_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_noticeview_all_notice',
//       );

//       setNoticeBoardData(response?.awareness_data);
//     } catch (error) {
//       console.error(' Driver Notice error:', error);
//       setIsLoading(false);
//       // Alert.alert('Error', 'Failed to fetch notices. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getAllDriverNotice();
//     }, []),
//   );

//   const handleNoticePress = useCallback(
//     noticeBoard => {
//       navigation.navigate('NoticeBoardDetail', {
//         noticeId: noticeBoard.id,
//       });
//     },
//     [navigation],
//   );

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       // dispatch(setRefreshKey());
//       await getAllDriverNotice();
//     } catch (error) {
//       console.log('Error during refresh:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
//         <ActivityIndicator size="small" color={AppColors.mainColor} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }>
//       {noticeBoardData &&
//         noticeBoardData.map(noticeBoard => (
//           <TouchableOpacity
//             key={noticeBoard.id}
//             style={styles.touchable}
//             onPress={() => handleNoticePress(noticeBoard)}>
//             <View style={styles.iconContainer}>
//               <Image
//                 style={styles.icon}
//                 resizeMode="contain"
//                 source={
//                   noticeBoard.status_image === 'open_envlop.png'
//                     ? OpenEnvelop
//                     : CloseEnvelop
//                 }
//               />
//             </View>
//             {/* <View style={styles.textContainer}>
//               <Text style={styles.subjectText}>
//                 {noticeBoard.subject &&
//                   noticeBoard.subject.substring(0, 50) + '...'}
//               </Text>
//             </View> */}
//             <View style={styles.textContainer}>
//               <Text style={styles.subjectText} numberOfLines={1}>
//                 {noticeBoard.subject}
//               </Text>
//             </View>
//             <View style={{alignSelf: 'flex-end'}}>
//               <Text style={styles.subjectText}>{noticeBoard.timestamp}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//     </ScrollView>
//   );
// };

// export const NoticeBoardDetailScreen = ({route}) => {
//   const {noticeId} = route.params;
//   const [notice, setNotice] = useState({});
//   const [bottamButtonText, setBottamButtonText] = useState({});
//   const [footerData, setFooterData] = useState([]);
//   const navigation = useNavigation();
//   const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
//   console.log(
//     languageSwitch,
//     ' const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch)=============== ',
//   );

//   const clickStoreHomeNotice = async id => {
//     console.log(id, 'clickStoreHomeNotice clickStoreHomeNotice');

//     // return false;
//     try {
//       const response = await DRIVER_NOTICE({
//         action: 'read_awareness_notice',
//         awareness_id: id,
//         current_language: languageSwitch,
//       });

//       console.log(response, ' clickStoreHomeNotice noticeeee');

//       // setNotification(response.headline);
//       // dispatch(setStoredRating(response.headline.rate));
//     } catch (err) {
//       console.error('VIEW_HEADLINE error:', err);
//     }
//   };

//   const fetchNoticeData = useCallback(async () => {
//     try {
//       const [noticeResponse, footerResponse] = await Promise.all([
//         DRIVER_NOTICE({
//           action: 'view_one_awareness',
//           id: noticeId,
//           current_language: languageSwitch,
//         }),
//         DRIVER_NOTICE({
//           action: 'view_one_awareness_footer_links',
//           id: noticeId,
//           bucket: 'Awareness',
//           current_language: languageSwitch,
//         }),
//       ]);

//       setNotice(noticeResponse.awareness);
//       setBottamButtonText(noticeResponse);
//       setFooterData(footerResponse.viewed);

//       await Promise.all([
//         DRIVER_NOTICE({
//           action: 'record_view_one_awareness_click',
//           id: noticeId,
//           subject: noticeResponse.awareness.subject,
//         }),
//         DRIVER_NOTICE({
//           action: 'view_one_awareness_update_sort_order',
//           id: noticeId,
//         }),
//       ]);
//     } catch (error) {
//       console.error('Error fetching notice data:', error);
//       Alert.alert('Error', 'Failed to load notice details. Please try again.');
//     }
//   }, [noticeId]);

//   useFocusEffect(
//     useCallback(() => {
//       fetchNoticeData();
//     }, [fetchNoticeData]),
//   );

//   const formatDate = useCallback(dateString => {
//     const [datePart] = dateString.split(' ');
//     const [year, month, day] = datePart.split('-');
//     const months = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];
//     return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
//   }, []);

//   const handleNoticeFooterPress = useCallback(
//     footerNotice => {
//       navigation.navigate('NoticeBoardDetail', {
//         noticeId: footerNotice.id,
//       });
//     },
//     [navigation],
//   );

//   return (
//     <SafeAreaView style={styles.fullScreenContainer}>
//       <Header backButton={true} />
//       <ScrollView style={styles.scrollView}>
//         {/* {notice && (
//           <View style={styles.detailContainer}>
//             <Text style={styles.detailSubject}>{notice.subject}</Text>
//             <Text style={styles.detailDescription}>
//               {notice.description}
//             </Text>
//           </View>
//         )} */}
//         {/*  */}

//         {notice && (
//           <View
//             style={{
//               flex: 1,
//               padding: 10,
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#0056b3',
//                 padding: 16,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: '#ffffff',
//                   fontSize: 22,
//                   fontWeight: 'bold',
//                   textAlign: 'center',
//                 }}>
//                 {notice.subject}
//               </Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 marginVertical: 20,
//                 width: '100%',
//                 borderRadius: 10,
//                 elevation: 5,
//               }}>
//               <View
//                 style={{
//                   backgroundColor: '#e9f6ff',
//                   padding: 16,
//                   borderRadius: 8,
//                   marginTop: 16,
//                   borderLeftColor: '#0056b3',
//                   borderLeftWidth: 5,
//                   margin: 20,
//                 }}>
//                 <Text
//                   style={{
//                     color: '#333',
//                     fontSize: 18,
//                     marginBottom: 20,
//                   }}>
//                   {notice.description}
//                 </Text>

//                 {bottamButtonText?.back_btn == '1' ? (
//                   <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                     style={{
//                       backgroundColor: '#0056b3',
//                       paddingVertical: 12,
//                       borderRadius: 8,
//                       alignItems: 'center',
//                       marginTop: 50,
//                       marginBottom: 5,
//                     }}>
//                     <Text
//                       style={{
//                         color: '#ffffff',
//                         fontSize: 18,
//                         fontWeight: 'bold',
//                       }}>
//                       {bottamButtonText?.btn_text}
//                     </Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() =>
//                       clickStoreHomeNotice(bottamButtonText?.awareness?.id)
//                     }
//                     style={{
//                       backgroundColor: '#0056b3',
//                       paddingVertical: 12,
//                       borderRadius: 8,
//                       alignItems: 'center',
//                       marginTop: 50,
//                       marginBottom: 5,
//                     }}>
//                     <Text
//                       style={{
//                         color: '#ffffff',
//                         fontSize: 18,
//                         fontWeight: 'bold',
//                       }}>
//                       {notice?.btn_text}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           </View>
//         )}

//         {/*  */}

//         {footerData.map(footerNotice => (
//           <View key={footerNotice.id} style={{paddingHorizontal: 20}}>
//             <TouchableOpacity
//               style={styles.footerNoticeItem}
//               onPress={() => handleNoticeFooterPress(footerNotice)}>
//               <View style={styles.iconContainer}>
//                 <Image
//                   style={styles.icon}
//                   resizeMode="contain"
//                   source={OpenEnvelop}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.subjectText} numberOfLines={1}>
//                   {footerNotice.subject}
//                 </Text>
//               </View>

//               <View style={{alignSelf: 'flex-end'}}>
//                 <Text style={styles.subjectText}>
//                   {formatDate(footerNotice.timestamp)}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   scrollView: {
//     flex: 1,
//   },

//   detailContainer: {
//     marginBottom: 15,
//     padding: 20,
//   },
//   detailSubject: {
//     color: AppColors.black,
//     fontFamily: AppFont.regularFont,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   detailDescription: {
//     color: AppColors.black,
//     fontSize: 15,
//     paddingTop: 15,
//     fontWeight: '400',
//     fontFamily: AppFont.regularFont,
//   },
//   detailText: {
//     fontSize: 16,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//     marginBottom: 10,
//   },
//   container: {
//     // padding: 10,
//     // margin: 10,
//     backgroundColor: AppColors.white,
//   },
//   touchable: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginBottom: 5,
//   },
//   selectedTouchable: {
//     backgroundColor: '#f0f0f0',
//   },
//   iconContainer: {
//     marginRight: 10,
//     paddingTop: 2,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   footerNoticeItem: {
//     flexDirection: 'row',
//     margin: 5,
//     borderBottomWidth: 1,
//     paddingBottom: 2,
//     borderBottomColor: '#E0E0E0',
//   },
//   textContainer: {
//     flex: 1,
//   },
//   subjectText: {
//     fontSize: 19,
//     color: AppColors.black,
//     fontFamily: AppFont.regularFont,
//   },
//   indexText: {
//     fontSize: 15,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//   },

//   largeIcon: {
//     width: 60,
//     height: 60,
//     marginBottom: 20,
//   },
//   detailText: {
//     fontSize: 20,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//     textAlign: 'center',
//     padding: 20,
//   },
// });

// export default AllNoticeBoardComponent;
