import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import {DRIVER_NOTIFICATION} from '../apis/Apis';
import {AppColors} from '../assets/Colors';
import {TokenConstextApi} from '../context/GlobalContext';
import {AppFont} from '../assets/FontsFamily';

const {width, height} = Dimensions.get('window');

const AllNotificationComponent = () => {
  const [notificationData, setNotificationData] = useState([]);
  const navigation = useNavigation();

  const handleNotificationPress = notification => {
    navigation.navigate('NotificationDetail', {
      notificationId: notification.id,
    });
  };

  const getAllNotification = async data => {
    try {
      await DRIVER_NOTIFICATION(data)
        .then(response => {
          setNotificationData(response.notifications);
        })
        .catch(err => {
          console.log(err, 'DRIVER NOTIFICATION err');
        });
    } catch (error) {
      console.log(error, 'DRIVER NOTIFICATION error');
    }
  };

  useEffect(() => {
    getAllNotification({
      action: 'view_all_notifications',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {notificationData.map(notification => (
        <TouchableOpacity
          key={notification.id}
          style={styles.touchable}
          onPress={() => handleNotificationPress(notification)}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={
                notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
              }
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.previewText} numberOfLines={2}>
              {notification.message_preview ||
                notification.message.substring(0, 100) + '...'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const NotificationDetailScreen = ({route}) => {
  const {notificationId} = route.params;
  const [notification, setNotification] = useState({});
  const {rating} = useContext(TokenConstextApi);
  const {setRating} = useContext(TokenConstextApi);
  const [feedback, setFeedback] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime =
        now.getFullYear() +
        '-' +
        String(now.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(now.getDate()).padStart(2, '0') +
        ' ' +
        String(now.getHours()).padStart(2, '0') +
        ':' +
        String(now.getMinutes()).padStart(2, '0') +
        ':' +
        String(now.getSeconds()).padStart(2, '0');

      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Initial update
    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const shouldShowRating = () => {
    return (
      notification.headline_type === 'Driver Ticket' &&
      notification.support_id > 0 &&
      currentDateTime < notification.end_date
    );
  };

  const viewHeadline = async () => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline',
        id: notificationId,
      });
      console.log(response.headline, 'VIEW_HEADLINE DATA');
      setNotification(response.headline);

      setRating(response.headline.rate);
    } catch (err) {
      console.log(err, 'VIEW_HEADLINE error');
    }
  };

  const saveBookingExperience = async newRating => {
    try {
      await DRIVER_NOTIFICATION({
        action: 'save_booking_experience',
        headline_id: notificationId,
        rate: newRating,
      })
        .then(e => {
          Alert.alert(e.message);
          console.log(e.rate, 'saveBookingExperience, Data saved');
          setRating(e.rate);
        })
        .catch(err => {
          console.log(err, 'saveBookingExperience Error');
        });
    } catch (err) {
      console.log(err, 'saveBookingExperience, error');
    }
  };

  useEffect(() => {
    console.log('Notification ID:', notificationId);
    viewHeadline();
  }, [notificationId]);

  const handleStarPress = async selectedRating => {
    setRating(selectedRating);
    await saveBookingExperience(selectedRating);
  };

  const saveBookingRemarks = async () => {
    try {
      await DRIVER_NOTIFICATION({
        action: 'save_booking_experience_remarks',
        headline_id: notificationId,
        remarks: feedback,
      })
        .then(e => {
          Alert.alert(e.message);
          console.log(e, 'save_booking_experience_remarks, Data saved');
          setFeedback(null);
        })
        .catch(err => {
          console.log(err, 'save_booking_experience_remarks Error');
        });
    } catch (err) {
      console.log(err, 'save_booking_experience_remarks, error');
    }
  };
  // console.log(notification.message, 'kkkkkkkkkkkkkkkkkk');

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.detailText}>{notification.message_preview}</Text>
        </View>

        {/* {console.log(shouldShowRating(),"kkkkkkkkkkkkkkkkkk")} */}

        {shouldShowRating() && (
          <>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                alignSelf: 'center',
                margin: 20,
                marginTop: 50,
              }}>
              Rate Our Response ?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={{
                    padding: 5,
                  }}>
                  <Icon
                    name={star <= rating ? 'star' : 'star-o'}
                    size={30}
                    color={AppColors.mainColor}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* <Text
                  style={{
                    marginTop: 20,
                    fontSize: 16,
                    color: 'red',
                  }}>
                  Current Rating: {rating}
                  </Text> */}

            <View style={styles.extraView}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.feedbackInput}>
                    <TextInput
                      style={styles.inputType}
                      placeholder="Type your feedback here..."
                      value={feedback}
                      onChangeText={setFeedback}
                      placeholderTextColor={AppColors.black}
                      multiline
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.btnView}
                  onPress={saveBookingRemarks}>
                  <Icon
                    size={20}
                    color={AppColors.mainColor}
                    name="paper-plane"
                    style={styles.IconType}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllNotificationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  touchable: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flex: 1,
  },
  previewText: {
    fontSize: 14,
    color: '#666666',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // padding: 20,
    margin: 20,
    justifyContent: 'center',
  },

  detailText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  extraView: {
    padding: 20,
    marginVertical: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    paddingBottom: 15,
    backgroundColor: AppColors.gray,
  },
  feedbackInput: {
    padding: 10,
    paddingTop: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputType: {
    fontFamily: AppFont.regularFont,
    alignSelf: 'flex-start',
    color: AppColors.black,
  },
  btnView: {
    alignSelf: 'flex-end',
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  IconType: {
    alignSelf: 'center',
  },
});

// import React, {useContext, useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {CloseEnvelop, OpenEnvelop} from '../assets/images';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import Header from './Header';
// import {DRIVER_NOTIFICATION, VIEW_HEADLINE} from '../apis/Apis';
// import {AppColors} from '../assets/Colors';
// import {TokenConstextApi} from '../context/GlobalContext';

// const {width, height} = Dimensions.get('window');

// const AllNotificationComponent = () => {
//   const [notificationData, setNotificationData] = useState([]);
//   const navigation = useNavigation();

//   const handleNotificationPress = notification => {
//     navigation.navigate('NotificationDetail', {
//       notificationId: notification.id,
//     });
//   };

//   const getAllNotification = data => {
//     DRIVER_NOTIFICATION(data)
//       .then(response => {
//         setNotificationData(response.notifications);
//       })
//       .catch(err => {
//         console.log(err, 'DRIVER NOTIFICATION error');
//       });
//   };

//   useEffect(() => {
//     getAllNotification({
//       action: 'view_all_notifications',
//     });
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {notificationData.map(notification => (
//         <TouchableOpacity
//           key={notification.id}
//           style={styles.touchable}
//           onPress={() => handleNotificationPress(notification)}>
//           <View style={styles.iconContainer}>
//             <Image
//               style={styles.icon}
//               resizeMode="contain"
//               source={
//                 notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
//               }
//             />
//           </View>
//           <View style={styles.textContainer}>
//             <Text style={styles.previewText} numberOfLines={2}>
//               {notification.message_preview ||
//                 notification.message.substring(0, 100) + '...'}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// export const NotificationDetailScreen = ({route}) => {
//   const {notificationId} = route.params;
//   const [notification, setNotification] = useState({});

//   const {rating} = useContext(TokenConstextApi);
//   const {setRating} = useContext(TokenConstextApi);

//   const [id, setId] = useState({
//     action: 'view_headline',
//     id: notificationId,
//   });

//   const viewHeadline = async () => {
//     await DRIVER_NOTIFICATION(id)
//       .then(e => {
//         console.log(e, 'VIEW_HEADLINE DATA');
//         setNotification(e.headline);
//         setRating(e.headline.rating ); // Set the rating from the fetched data
//       })
//       .catch(err => {
//         console.log(err, 'VIEW_HEADLINE error');
//       });
//   };

//   const saveBookingExperience = async newRating => {
//     await DRIVER_NOTIFICATION({
//       action: 'save_booking_experience',
//       headline_id: notificationId,
//       rate: newRating,
//     })
//       .then(e => {
//         console.log(e.rate, 'saveBookingExperience , Data');
//       })
//       .catch(err => {
//         console.log(err, 'saveBookingExperience , error');
//       });
//   };

//   useEffect(() => {
//     console.log('Notification ID:', notificationId);
//     viewHeadline();
//   }, [notificationId]);

//   const handleStarPress = selectedRating => {
//     setRating(selectedRating);
//     saveBookingExperience(selectedRating);
//   };

//   return (
//     <SafeAreaView style={styles.fullScreenContainer}>
//       <Header backButton={true} />
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentContainer}>
//         <View style={{flex: 1}}>
//           <Text style={styles.detailText}>{notification.message}</Text>
//         </View>

//         <Text
//           style={{
//             fontSize: 20,
//             color: 'black',
//             alignSelf: 'center',
//             margin: 20,
//             marginTop: 50,
//           }}>
//           Rate Our Response ?
//         </Text>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           {[1, 2, 3, 4, 5].map(star => (
//             <TouchableOpacity
//               key={star}
//               onPress={() => handleStarPress(star)}
//               style={{
//                 padding: 5,
//               }}>
//               <Icon
//                 name={star <= rating ? 'star' : 'star-o'}
//                 size={30}
//                 color={AppColors.mainColor}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text
//           style={{
//             marginTop: 20,
//             fontSize: 16,
//             color: 'red',
//           }}>
//           Current Rating: {rating}
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AllNotificationComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   touchable: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     backgroundColor: '#ffffff',
//   },
//   iconContainer: {
//     marginRight: 15,
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 30,
//     height: 30,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   previewText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     // padding: 20,
//     margin: 20,
//     justifyContent: 'center',
//   },
//   // detailIdText: {
//   //   fontSize: 16,
//   //   fontWeight: 'bold',
//   //   color: '#333333',
//   //   marginBottom: 10,
//   // },
//   detailText: {
//     fontSize: 16,
//     color: '#333333',
//     lineHeight: 24,
//   },
// });

// // import React, {useContext, useEffect, useState} from 'react';
// // import {
// //   Image,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   SafeAreaView,
// //   ScrollView,
// //   Dimensions,
// // } from 'react-native';
// // import {CloseEnvelop, OpenEnvelop} from '../assets/images';
// // import {useNavigation} from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/dist/FontAwesome';
// // import Header from './Header';
// // import {DRIVER_NOTIFICATION, VIEW_HEADLINE} from '../apis/Apis';
// // import {AppColors} from '../assets/Colors';
// // import {TokenConstextApi} from '../context/GlobalContext';

// // const {width, height} = Dimensions.get('window');

// // const AllNotificationComponent = () => {
// //   const [notificationData, setNotificationData] = useState([]);
// //   const navigation = useNavigation();

// //   const handleNotificationPress = notification => {
// //     navigation.navigate('NotificationDetail', {
// //       notificationId: notification.id,
// //     });
// //   };

// //   const getAllNotification = data => {
// //     DRIVER_NOTIFICATION(data)
// //       .then(response => {
// //         // console.log(response.notifications, 'DRIVER NOTIFICATION data');
// //         setNotificationData(response.notifications);
// //       })
// //       .catch(err => {
// //         console.log(err, 'DRIVER NOTIFICATION error');
// //       });
// //   };

// //   useEffect(() => {
// //     getAllNotification({
// //       action: 'view_all_notifications',
// //     });
// //   }, []);

// //   return (
// //     <ScrollView style={styles.container}>
// //       {notificationData.map(notification => (
// //         <TouchableOpacity
// //           key={notification.id}
// //           style={styles.touchable}
// //           onPress={() => handleNotificationPress(notification)}>
// //           <View style={styles.iconContainer}>
// //             <Image
// //               style={styles.icon}
// //               resizeMode="contain"
// //               source={
// //                 notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
// //               }
// //             />
// //           </View>
// //           <View style={styles.textContainer}>
// //             <Text style={styles.previewText} numberOfLines={2}>
// //               {notification.message_preview ||
// //                 notification.message.substring(0, 100) + '...'}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       ))}
// //     </ScrollView>
// //   );
// // };

// // export const NotificationDetailScreen = ({route}) => {
// //   const {notificationId} = route.params;
// //   const [notification, setNotification] = useState({});
// //   const [id, setId] = useState({
// //     action: 'view_headline',
// //     id: notificationId,
// //   });

// //   const {rating} = useContext(TokenConstextApi);

// //   const {setRating} = useContext(TokenConstextApi);

// //   const viewHeadline = async () => {
// //     await DRIVER_NOTIFICATION(id)
// //       .then(e => {
// //         console.log(e, 'VIEW_HEADLINE DATA');
// //         setNotification(e.headline);
// //       })
// //       .catch(err => {
// //         console.log(err, 'VIEW_HEADLINE error');
// //       });
// //   };

// //   const saveBookingExperience = async () => {
// //     await DRIVER_NOTIFICATION({
// //       action: 'save_booking_experience',
// //       headline_id: notificationId,
// //       rate: rating,
// //     })
// //       .then(e => {
// //         console.log(e, 'saveBookingExperience , Data');
// //       })
// //       .catch(err => {
// //         console.log(err, 'saveBookingExperience , error');
// //       });
// //   };

// //   useEffect(() => {
// //     console.log('Notification ID:', notificationId);
// //     viewHeadline();
// //   }, [notificationId]);

// //   const handleStarPress = selectedRating => {
// //     setRating(selectedRating);
// //     saveBookingExperience();
// //   };

// //   return (
// //     <SafeAreaView style={styles.fullScreenContainer}>
// //       <Header backButton={true} />
// //       <ScrollView
// //         style={styles.scrollView}
// //         contentContainerStyle={styles.contentContainer}>
// //         <View style={{flex: 1}}>
// //           <Text style={styles.detailText}>{notification.message}</Text>
// //         </View>

// //         <Text
// //           style={{
// //             fontSize: 20,
// //             color: 'black',
// //             alignSelf: 'center',
// //             margin: 20,
// //             marginTop: 50,
// //           }}>
// //           Rate Our Response ?
// //         </Text>

// //         <View
// //           style={{
// //             flexDirection: 'row',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //           }}>
// //           {[1, 2, 3, 4, 5].map(star => (
// //             <TouchableOpacity
// //               key={star}
// //               onPress={() => handleStarPress(star)}
// //               style={{
// //                 padding: 5,
// //               }}>
// //               <Icon
// //                 name={star <= rating ? 'star' : 'star-o'}
// //                 size={30}
// //                 color={AppColors.mainColor}
// //               />
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         <Text
// //           style={{
// //             marginTop: 20,
// //             fontSize: 16,
// //             color: 'red',
// //           }}>
// //           Current Rating: {rating}
// //         </Text>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default AllNotificationComponent;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   touchable: {
// //     flexDirection: 'row',
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#e0e0e0',
// //     backgroundColor: '#ffffff',
// //   },
// //   iconContainer: {
// //     marginRight: 15,
// //     justifyContent: 'center',
// //   },
// //   icon: {
// //     width: 30,
// //     height: 30,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   previewText: {
// //     fontSize: 14,
// //     color: '#666666',
// //   },
// //   fullScreenContainer: {
// //     flex: 1,
// //     backgroundColor: '#ffffff',
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   contentContainer: {
// //     // padding: 20,
// //     margin: 20,
// //     justifyContent: 'center',
// //   },
// //   // detailIdText: {
// //   //   fontSize: 16,
// //   //   fontWeight: 'bold',
// //   //   color: '#333333',
// //   //   marginBottom: 10,
// //   // },
// //   detailText: {
// //     fontSize: 16,
// //     color: '#333333',
// //     lineHeight: 24,
// //   },
// // });
