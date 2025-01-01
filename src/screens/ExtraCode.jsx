// // const CancelBooking = () => {
// //     return (
// //       <View
// //         style={{
// //           marginTop: 30,
// //           padding: 10,
// //         }}>
// //         <View
// //           style={{
// //             borderColor: 'rgb(128,128,128)',
// //             backgroundColor: AppColors.white,
// //             borderWidth: 1,
// //             borderStyle: 'solid',
// //             borderRadius: 8,
// //             lineHeight: 20,
// //             shadowColor: 'rgb(128,128,128)',
// //             shadowOffset: {width: 5, height: 4},
// //             shadowOpacity: 5,
// //             elevation: 5,
// //             shadowRadius: 5,
// //             marginBottom: 20,
// //             padding: 10,
// //           }}>
// //           <View style={{padding: 14, alignItems: 'flex-start'}}>
// //             <Text
// //               style={{
// //                 textAlign: 'auto',
// //                 color: AppColors.black,
// //                 fontWeight: '700',
// //                 fontSize: 21,
// //                 fontFamily: 'Poppins',
// //               }}>
// //               Booking is Already Cancelled{' '}
// //             </Text>
// //           </View>
// //         </View>
// //       </View>
// //     );
// //   };



// const AcceptBooking = ({modalShow, booking}) => {
//     const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
//       useState(false);
  
//     const handleSwipe = () => {
//       modalShow();
//     };
  
//     const openPhoneDialer = () => {
//       const phoneNumber = '9810360792';
//       let url = `tel:${phoneNumber}`;
  
//       Linking.openURL(url)
//         .then(() => console.log('Phone dialer opened successfully'))
//         .catch(err => {
//           console.error('Error opening phone dialer:', err);
//         });
//     };
  
//     return (
//       <ScrollView style={{flex: 1}}>
//         <View style={styles.mainView}>
//           {/* top */}
//           <View style={styles.topSection}>
//             <Text style={styles.interviewTimeText}>
//               Interview Time- {booking.booking_date}
//             </Text>
//           </View>
//           <View style={styles.bookingSection}>
//             <View>
//               <Text style={styles.bookingNoText}>Booking No : #431062</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => setPackageDetailsDutyReportUpdate(true)}
//               style={styles.packageDetailsButton}>
//               <Text style={styles.packageDetailsText}>Package Details</Text>
//             </TouchableOpacity>
//           </View>
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={packageDetailsDutyReportUpdate}
//             onRequestClose={() => setPackageDetailsDutyReportUpdate(false)}>
//             <PackageDetailsDutyReportUpdate
//               setPackageDetailsDutyReportUpdate={
//                 setPackageDetailsDutyReportUpdate
//               }
//               // tripDetails={selectedTrip}
//             />
//           </Modal>
//           {/* middle */}
//           <View style={styles.middleSection}>
//             <View style={styles.nameTypeContainer}>
//               <Text style={styles.nameText}>Sagar Saxena</Text>
//               <Text style={styles.typeText}>Permanent</Text>
//             </View>
//             <View style={styles.addressCallContainer}>
//               <View>
//                 <View style={styles.addressContainer}>
//                   <Image
//                     source={Address}
//                     resizeMode="contain"
//                     style={styles.addressIcon}
//                   />
//                   <Text style={styles.addressText}>D-51 A 2nd Floor</Text>
//                 </View>
//                 <View style={styles.addressContainer}>
//                   <Image
//                     source={Address}
//                     resizeMode="contain"
//                     style={styles.addressIcon}
//                   />
//                   <Text style={styles.addressText}>Noida Floor</Text>
//                 </View>
//               </View>
  
//               <TouchableOpacity
//                 style={styles.callingGif}
//                 onPress={openPhoneDialer}>
//                 {/* <View style={styles.callingGif}> */}
//                 <Image
//                   style={{width: '100%', height: '100%'}}
//                   source={CallingGif}
//                   resizeMode="cover"
//                 />
//                 {/* </View> */}
//               </TouchableOpacity>
//             </View>
//           </View>
  
//           {/* bottom */}
//           <View
//             style={{
//               elevation: 1,
//               borderRadius: 5,
//               borderWidth: 1,
//               backgroundColor: '#f7f7f7',
//               borderColor: '#ccc',
//               padding: 15,
//             }}>
//             <RadioButtonWithTitle booking={booking} />
//             <SwipeableButton onSwipe={handleSwipe} />
  
//             <View style={{marginTop: 20}}>
//               <YoutubePlayer
//                 height={200}
//                 // autoPlay={false}
//                 videoId={'SsG_qwb0zLs'}
//               />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   };


// jit

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFcmToken = async () => {
  let token = "";

  await checkApplicationNotificationPermission();
  await registerAppWithFCM();

  try {
    // Get FCM token
    token = await messaging().getToken();

    // Log the token
    console.log('getFcmToken -->', token);

    // Store the token in AsyncStorage
    if (token) {
      await AsyncStorage.setItem('fcmToken',token);
      console.log('FCM token stored in AsyncStorage');
    }
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }

  return token;
};

//method was called to get FCM tiken for notification
// export const getFcmToken = async () => {
//   let token = null;
//   await checkApplicationNotificationPermission();
//   await registerAppWithFCM();
//   try {
//     token = await messaging().getToken();
//     console.log('getFcmToken-->', token);
//   } catch (error) {
//     console.log('getFcmToken Device Token error ', error);
//   }
//   return token;
// };







export const getStoredFcmToken = async () => {
  try {
    // Retrieve the FCM token from AsyncStorage
    const storedFcmToken = await AsyncStorage.getItem('fcmToken');

    // Log the retrieved token
    console.log('Retrieved FCM token from AsyncStorage:', storedFcmToken);

    return storedFcmToken;
  } catch (error) {
    // Handle errors, such as AsyncStorage not being available or key not found
    console.error('Error retrieving FCM token from AsyncStorage:', error);
    return null;
  }
};


//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  console.log(
    'registerAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch(error => {
      console.log('POST_NOTIFICATIONS error ', error);
    });
};

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM(navigation) {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('onMessage Received : ', JSON.stringify(remoteMessage));
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
        navigation
      );
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        navigation.navigate('NotificationHome')
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'onNotificationOpenedApp Received',
      JSON.stringify(remoteMessage),
    );
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
    navigation.navigate('NotificationHome')

  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
    navigation.navigate('NotificationHome')

      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
     
      smallIcon: 'ic_launcher',
      // largeIcon: 'ic_launcher',
    },
  });
}