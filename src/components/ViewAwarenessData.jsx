import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {AppColors} from '../assets/Colors';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {HOME_AWARENESS} from '../apis/Apis';

const {width} = Dimensions.get('window');

const responsiveSize = size => (width / 411.42857142857144) * size;

const ViewAwarenessData = () => {
  const navigation = useNavigation();

  const [awarenessData, setAwareness] = useState([]);

  const getAllAwareness = useCallback(async () => {
    try {
      const response = await HOME_AWARENESS({
        action: 'view_all_awareness',
      });
      setAwareness(response.awareness_data);
      console.log(response, 'getAllAwareness DATAAAA');
    } catch (error) {
      console.error('getAllAwareness ', error);
    }
  }, []);

  useEffect(() => {
    getAllAwareness();
  }, [getAllAwareness]);

  //   const awarenessData = [
  //     {
  //       id: 106,
  //       subject: 'विषय: बिलिंग से संबंधित महत्वपूर्ण जानकारी',
  //       timestamp: '15 Jul 2024',
  //       status_image: 'closed_envlop.png',
  //       url: 'https://www.tatd.in/driver-awareness.php?id=106',
  //     },
  //   ];

  const handleAwarenessPress = useCallback(
    awareness => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: awareness.id,
      });
    },
    [navigation],
  );

  if (!awarenessData) return null;

  return (
    <View>
      {awarenessData.map(awareness => (
        <View key={awareness.id} style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleAwarenessPress(awareness)}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={
                  awareness.status_image === 'open_envlop.png'
                    ? OpenEnvelop
                    : CloseEnvelop
                }
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.subjectText}>{awareness.subject}</Text>
            </View>
            <View style={styles.timestampContainer}>
              <Text style={styles.timestampText}>{awareness.timestamp}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 15,
    borderRadius: 5,
    padding: 8,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
  },
  subjectText: {
    color: AppColors.black,
    fontSize: responsiveSize(15),
    fontWeight: '500',
  },
  timestampContainer: {
    marginLeft: 10,
  },
  timestampText: {
    color: AppColors.black,
    fontSize: responsiveSize(12),
  },
});

export default ViewAwarenessData;

// import React, {useCallback} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import {AppColors} from '../assets/Colors';
// import {CloseEnvelop, OpenEnvelop} from '../assets/images';

// const {width} = Dimensions.get('window');

// const responsiveSize = size => (width / 411.42857142857144) * size;

// const ViewAwarenessData = ({awarenessData}) => {
//   const navigation = useNavigation();

//   const handleAwarenessPress = useCallback(
//     awareness => {
//       navigation.navigate('NoticeBoardDetail', {
//         noticeId: awareness.id,
//       });
//     },
//     [navigation],
//   );

//   return (
//     <View>
//       {awarenessData && awarenessData.length > 0 ? (
//         awarenessData.map(awareness => (
//           <View key={awareness.id} style={styles.itemContainer}>
//             <TouchableOpacity
//               style={styles.touchable}
//               onPress={() => handleAwarenessPress(awareness)}>
//               <View style={styles.iconContainer}>
//                 <Image
//                   style={styles.icon}
//                   resizeMode="contain"
//                   source={
//                     awareness.status_image === 'open_envlop.png'
//                       ? OpenEnvelop
//                       : CloseEnvelop
//                   }
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.subjectText}>{awareness.subject}</Text>
//               </View>
//               <View style={styles.timestampContainer}>
//                 <Text style={styles.timestampText}>{awareness.timestamp}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noDataText}>No awareness data available</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     margin: 15,
//     borderRadius: 5,
//     padding: 8,
//     backgroundColor: AppColors.white,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   touchable: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   subjectText: {
//     color: AppColors.black,
//     fontSize: responsiveSize(15),
//     fontWeight: '500',
//   },
//   timestampContainer: {
//     marginLeft: 10,
//   },
//   timestampText: {
//     color: AppColors.black,
//     fontSize: responsiveSize(12),
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: AppColors.black,
//     fontSize: responsiveSize(16),
//     marginTop: 20,
//   },
// });

// export default ViewAwarenessData;

// // import React, {useCallback, useEffect, useState} from 'react';
// // import {
// //   Image,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Dimensions,
// // } from 'react-native';
// // import {AppColors} from '../assets/Colors';
// // import {AppFont} from '../assets/FontsFamily';
// // import {HOME_AWARENESS} from '../apis/Apis';
// // import {CloseEnvelop, OpenEnvelop} from '../assets/images';
// // import { useNavigation } from '@react-navigation/native';
// // const {width} = Dimensions.get('window');

// // const responsiveSize = size => {
// //   return (width / 411.42857142857144) * size;
// // };
// // const ViewAwarenessData = () => {
// const [awarenessData, setAwareness] = useState([]);

//   const awarenessData = [
//     {
//       id: 106,
//       subject: 'विषय: बिलिंग से संबंधित महत्वपूर्ण जानकारी',
//       timestamp: '15 Jul 2024',
//       status_image: 'closed_envlop.png',
//       url: 'https://www.tatd.in/driver-awareness.php?id=106',
//     },
//   ];
// //   const navigation = useNavigation()

// //   const handleAwarnessPress = useCallback(
// //     awareness => {
// //       navigation.navigate('NoticeBoardDetail', {
// //         noticeId: awareness.id,
// //       });
// //     },
// //     [navigation],
// //   );

// //   return (
// //     <>
// //       {awarenessData && awarenessData.length > 0
// //         ? awarenessData.map(awareness => (
// //             <View
// //               style={{
// //                 margin: 15,
// //                 borderRadius: 5,
// //                 padding: 8,
// //               }}>
// //               <TouchableOpacity
// //                 // key={awareness}
// //                 style={styles.touchable}
// //                 onPress={() => handleAwarnessPress(awareness)}>
// //                 <View style={styles.iconContainer}>
// //                   <Image
// //                     style={styles.icon}
// //                     resizeMode="contain"
// //                     source={
// //                       awareness.status_image === 'open_envlop.png'
// //                         ? OpenEnvelop
// //                         : CloseEnvelop
// //                     }
// //                   />
// //                 </View>
// //                 <View style={styles.textContainer}>
// //                   <Text style={styles.subjectText}>{awareness.subject}</Text>
// //                 </View>
// //                 <View style={{alignSelf: 'flex-end'}}>
// //                   <Text style={{color: AppColors.black}}>
// //                     {awareness.timestamp}
// //                   </Text>
// //                 </View>
// //               </TouchableOpacity>
// //             </View>
// //           ))
// //         : null}
// //     </>
// //   );
// // };

// // export default ViewAwarenessData;

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: AppColors.white,
// //   },
// //   mainContainer: {
// //     flex: 1,
// //     backgroundColor: AppColors.white,
// //     marginVertical: responsiveSize(20),
// //   },
// //   marqueeView: {
// //     paddingHorizontal: '2%',
// //   },
// //   marqueeText: {
// //     color: AppColors.black,
// //     fontSize: responsiveSize(15),
// //     fontWeight: '400',
// //     lineHeight: responsiveSize(21),
// //     fontFamily: 'Roboto',
// //   },
// //   middleContainer: {
// //     margin: '4%',
// //     marginTop: 0,
// //     backgroundColor: AppColors.white,
// //     borderWidth: 1,
// //     borderRadius: responsiveSize(10),
// //     borderColor: AppColors.mainColor,
// //     position: 'relative',
// //   },
// //   middleContent: {
// //     backgroundColor: AppColors.mainColor,
// //     paddingHorizontal: '3%',
// //     borderRadius: responsiveSize(6),
// //     marginBottom: responsiveSize(2),
// //   },
// //   topView: {
// //     paddingTop: '3%',
// //     marginBottom: '3%',
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   topLeft: {
// //     backgroundColor: AppColors.white,
// //     height: responsiveSize(70),
// //     width: responsiveSize(70),
// //     borderRadius: responsiveSize(35),
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   topLeftText: {
// //     color: AppColors.mainColor,
// //     fontSize: responsiveSize(25),
// //     fontWeight: '700',
// //     fontFamily: AppFont.regularFont,
// //   },
// //   bottamLeftText: {
// //     color: AppColors.mainColor,
// //     fontSize: responsiveSize(9),
// //     fontWeight: '300',
// //     fontFamily: AppFont.regularFont,
// //   },
// //   topRight: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   earningView: {
// //     backgroundColor: 'rgb(255,255,255)',
// //     paddingHorizontal: responsiveSize(6),
// //     paddingVertical: responsiveSize(4),
// //     margin: responsiveSize(5),
// //   },
// //   rupeeIcon: {
// //     color: AppColors.mainColor,
// //     textAlign: 'center',
// //     // padding: responsiveSize(2),
// //     fontSize: responsiveSize(9),
// //   },
// //   notification: {
// //     margin: responsiveSize(5),
// //   },
// //   notificationCount: {
// //     position: 'absolute',
// //     alignSelf: 'flex-end',
// //     backgroundColor: AppColors.greyColor,
// //     fontSize: responsiveSize(7),
// //     fontWeight: '400',
// //     padding: responsiveSize(3),
// //     paddingHorizontal: responsiveSize(5),
// //     color: 'rgb(256,256,256)',
// //   },
// //   toggleView: {
// //     backgroundColor: 'rgb(217, 217, 217)',
// //     borderRadius: responsiveSize(34),
// //     borderWidth: 1,
// //     borderColor: AppColors.greyColor,
// //     margin: responsiveSize(5),
// //   },
// //   bottamView: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingBottom: responsiveSize(10),
// //   },
// //   driverNameView: {
// //     flex: 1,
// //   },
// //   driverNameText: {
// //     fontSize: responsiveSize(15),
// //     fontWeight: '500',
// //     letterSpacing: 0.3,
// //     fontFamily: 'Roboto',
// //     color: 'rgb(255,255,255)',
// //   },
// //   bottamRightView: {
// //     flexDirection: 'row',
// //   },
// //   otrView: {
// //     backgroundColor: AppColors.mainColor,
// //     borderWidth: 2,
// //     borderRadius: responsiveSize(7),
// //     borderColor: AppColors.white,
// //     alignItems: 'center',
// //     paddingHorizontal: responsiveSize(8),
// //     paddingVertical: responsiveSize(4),
// //     margin: responsiveSize(2),
// //   },
// //   bottamRightText: {
// //     fontSize: responsiveSize(8),
// //     fontWeight: '500',
// //     color: AppColors.white,
// //   },
// //   ratingView: {
// //     backgroundColor: 'green',
// //     borderWidth: 2,
// //     borderRadius: responsiveSize(7),
// //     borderColor: AppColors.white,
// //     alignItems: 'center',
// //     margin: responsiveSize(2),
// //     paddingHorizontal: responsiveSize(12),
// //     paddingVertical: responsiveSize(4),
// //   },
// //   bookingView: {
// //     backgroundColor: 'green',
// //     borderWidth: 2,
// //     borderRadius: responsiveSize(7),
// //     borderColor: AppColors.white,
// //     alignItems: 'center',
// //     paddingHorizontal: responsiveSize(8),
// //     margin: responsiveSize(2),
// //     paddingVertical: responsiveSize(4),
// //   },
// //   bottamContent: {
// //     flexDirection: 'row',
// //     margin: responsiveSize(3),
// //   },
// //   bottamContent1: {
// //     backgroundColor: AppColors.white,
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: AppColors.mainColor,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     margin: responsiveSize(1),
// //     flexDirection: 'row',
// //   },
// //   absoulteText: {
// //     color: AppColors.white,
// //     backgroundColor: 'rgb(195, 31, 31)',
// //     fontSize: 8,
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 4,
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     paddingVertical: 2,
// //   },
// //   absoulteView: {justifyContent: 'center', alignItems: 'center'},
// //   bottamContent1Text: {
// //     color: AppColors.mainColor,
// //     fontSize: 9,
// //     fontWeight: '400',
// //     textAlign: 'center',
// //   },

// //   bottamContent2: {
// //     backgroundColor: AppColors.white,
// //     paddingBottom: 3,
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: AppColors.mainColor,
// //     margin: 1,
// //     display: 'flex',
// //     flexDirection: 'column',
// //   },
// //   bottamContent3: {
// //     backgroundColor: AppColors.white,
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: AppColors.mainColor,
// //     margin: 1,
// //     display: 'flex',
// //     flexDirection: 'column',
// //     paddingBottom: 3,
// //   },
// //   bottamContent4: {
// //     backgroundColor: 'yellow',
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: AppColors.mainColor,
// //     margin: 1,
// //     display: 'flex',
// //     flexDirection: 'column',
// //     paddingBottom: 3,
// //   },
// //   mainText: {
// //     color: AppColors.mainColor,
// //     fontSize: 9,
// //     fontWeight: '400',
// //     paddingTop: 5,
// //     textAlign: 'center',
// //   },
// //   textIcon: {
// //     color: AppColors.mainColor,
// //     fontSize: 9,
// //     textAlign: 'center',
// //   },
// //   touchable: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //     marginBottom: 5,
// //     justifyContent: 'space-between',
// //   },
// //   iconContainer: {
// //     marginRight: 10,
// //     paddingTop: 2,
// //   },
// //   icon: {
// //     width: 20,
// //     height: 20,
// //   },
// //   textContainer: {
// //     // flex: 1,
// //   },
// //   subjectText: {
// //     color: AppColors.black,
// //     fontSize: 15,
// //   },
// // });
