import {Alert, AppRegistry, AppState, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  EventType,
  iOSVisibility,
} from '@notifee/react-native';
import {playSound, triggerVibration} from './src/utils/soundVibration';
import {
  requestNotificationPermission,
  checkVibrationPermission,
  checkVibrationSupport,
} from './src/utils/permissions';
import {useEffect} from 'react';

// Create notification channel with vibration enabled (for Android)
// async function createNotificationChannel() {
//   await notifee.createChannel({
//     id: 'tatd2025',
//     name: 'tatd2025',
//     sound: 'default',
//     vibration: true, // Ensure vibration is enabled for this channel
//     vibrationPattern: [300, 500], // Custom vibration pattern
//     importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
//   });
// }

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // await createNotificationChannel();
  const sound_ = remoteMessage?.data?.sound || 'sound'; // Default to 'sound' if not specified

  const channelId = await notifee.createChannel({
    id: 'tatd2025',
    name: 'tatd2025',
    sound: sound_,
    vibration: true, // Ensure vibration is enabled for this channel
    vibrationPattern: [300, 500], // Custom vibration pattern
    importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
  });
  playSound(sound_)
  checkVibrationSupport(10000)
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title,
    body: remoteMessage.notification?.body || remoteMessage.data?.body,
    android: {
      channelId
    },
    ios: {
      sound: 'default', // Use default sound or specify a custom one
      critical: true, // Enable critical alerts if needed
      criticalVolume: 1.0, // Set critical alert volume (0.0 - 1.0)
    },
  });
});


notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.PRESS:
      console.log('Notification pressed in background:', detail);
      // Handle notification press, e.g., navigate to a specific screen
      Alert.alert("ooo")
      break;
    case EventType.DISMISSED:
      console.log('Notification dismissed in background:', detail);
      // Handle notification dismissal
      break;
    case EventType.BACKGROUND:
      console.log('Background event:', detail);
      // Handle background notification events if needed
      break;
    default:
      console.log('Unhandled event in background:', type);
      break;
  }
});
// messaging().onMessage(async remoteMessage => {
//   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   console.log(remoteMessage, 'app on state notification');
// });

// Background message handler for Firebase Messaging
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);

//   // Create notification channel with vibration enabled
//   await createNotificationChannel();

//   // Request necessary permissions (Android 13+ for notifications and vibration)
//   await requestNotificationPermission(); // Request notification permission for Android 13+
//   await checkVibrationPermission(); // Check if vibration permission is granted

//   // Play sound in the background or foreground
//   // playSound();

//   // Trigger vibration in both foreground and background
//   console.log('Triggering vibration in both foreground and background');
//   // triggerVibration();
//   checkVibrationSupport();

//   // Manually show a notification when a data message is received
//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || remoteMessage.data?.title,
//     body: remoteMessage.notification?.body || remoteMessage.data?.body,
//     android: {
//       channelId: 'default', // Make sure the correct channel with vibration is used
//       sound: 'default',
//       vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
//       importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
//     },
//   });
// });

// messaging().onMessage(async remoteMessage => {
//   console.log('Message handled in the foreground!', remoteMessage);

//   // Create notification channel with vibration enabled for Android
//   await notifee.requestPermission();
//   // await createNotificationChannel();

//   // Request necessary permissions
//   // await requestNotificationPermission();
//   // await checkVibrationPermission();

//   // Play sound in the foreground
//   // playSound();1

//   // Trigger vibration in both foreground and background (iOS doesn't vibrate by default for notifications)
//   // console.log('Triggering vibration in the foreground');
//   // checkVibrationSupport();

//   // Manually show a notification when a data message is received
//   await notifee.displayNotification({
//     title: 'hii',
//     body: 'this is notification',
//     ios: {
//       sound: 'default',
//       badge: 1,
//       // iOS notifications do not natively support vibration, but you can use custom actions
//       categoryId: 'default', // Set the appropriate category for your app's actions
//     },
//     android: {
//       channelId: 'default', // Make sure the correct channel with vibration is used for Android
//       sound: 'default',
//       vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern for Android
//     },
//     importance: Platform.OS === 'ios' ? 'high' : AndroidImportance.HIGH, // High importance for iOS and Android
//     visibility: Platform.OS === 'ios' ? iOSVisibility.PUBLIC : undefined, // Ensure visibility for iOS
//   });
// });

// Background message handler for when the app is in the background or terminated (iOS)
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);

//   // Create notification channel with vibration enabled for Android
//   // await createNotificationChannel();

//   // Request necessary permissions
//   await requestNotificationPermission();
//   await checkVibrationPermission();

//   // Play sound in the background
//   playSound();

//   // Trigger vibration (only Android supports vibration in background)
//   console.log('Triggering vibration in the background');
//   checkVibrationSupport();

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Notification caused app to open from background:', remoteMessage);
//     // if (remoteMessage.data?.type === 'navigateToNotificationScreen') {
//     //   navigation.navigate('NotificationScreen'); // Navigate when opened from background
//     // }
//   });

//   // Manually show a notification when a data message is received
//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || remoteMessage.data?.title,
//     body: remoteMessage.notification?.body || remoteMessage.data?.body,
//     ios: {
//       sound: 'default',
//       badge: 1,
//     },
//     android: {
//       channelId: 'default', // Make sure the correct channel with vibration is used
//       sound: '',
//       vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern for Android
//     },
//     importance: Platform.OS === 'ios' ? 'high' : AndroidImportance.HIGH, // High importance for iOS and Android
//     visibility: Platform.OS === 'ios' ? iOSVisibility.PUBLIC : undefined, // Ensure visibility for iOS
//   });
// });

// Background event handler for Notifee
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   console.log('Background event received:', type);

//   // Handle the background event based on the event type
//   switch (type) {
//     case EventType.DISMISSED:
//       console.log('Notification dismissed', detail.notification);
//       triggerVibration();
//       break;
//     case EventType.PRESS:
//       console.log('Notification press event', detail.notification);
//       break;
//   }
// });

// PushNotification.configure({
//      onNotification: function(notification) {
//         if (notification.foreground) {
//            PushNotification.localNotification(notification);
//         }
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//      },
//   })

AppRegistry.registerComponent(appName, () => App);

// import {AppRegistry, AppState} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import {playSound, triggerVibration} from './src/utils/soundVibration';

// // Create notification channel with vibration enabled (for Android)
// async function createNotificationChannel() {
//   await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     sound: 'default',
//     vibration: true, // Ensure vibration is enabled for this channel
//     vibrationPattern: [300, 500], // Custom vibration pattern
//     importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
//   });
// }

// // Background message handler for Firebase Messaging
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);

//   // Create notification channel with vibration enabled
//   await createNotificationChannel();

//   // Play sound in the background or foreground
//   playSound();

//   // Trigger vibration in both foreground and background
//   console.log('Triggering vibration in both foreground and background');

//     triggerVibration();

//   // Manually show a notification when a data message is received
//   await notifee.displayNotification({
//     title:
//       remoteMessage.notification?.title ||
//       remoteMessage.data?.title ||
//       'Background Notification',
//     body:
//       remoteMessage.notification?.body ||
//       remoteMessage.data?.body ||
//       'Notification body',
//     android: {
//       channelId: 'default', // Make sure the correct channel with vibration is used
//       sound: 'default',
//       vibrationPattern: [300, 500], // Custom vibration pattern for this notification
//     },
//   });
// });

// // Background event handler for Notifee
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   console.log('Background event received:', type);

//   // Handle the background event based on the event type
//   switch (type) {
//     case EventType.DISMISSED:
//       console.log('Notification dismissed', detail.notification);
//       triggerVibration();
//       break;
//     case EventType.PRESS:
//       console.log('Notification press event', detail.notification);
//       break;
//   }
// });

// AppRegistry.registerComponent(appName, () => App);

// // /**
// //  * @format
// //  */
// // import { AppRegistry } from 'react-native';
// // import App from './App';
// // import { name as appName } from './app.json';
// // import messaging from '@react-native-firebase/messaging';
// // import notifee from '@notifee/react-native';  // Import Notifee
// // import { playSound, triggerVibration } from './src/utils/soundVibration';

// // // Background message handler
// // messaging().setBackgroundMessageHandler(async remoteMessage => {
// // console.log('Message handled in the background!', remoteMessage);
// // playSound()
// // triggerVibration()

// // // Manually show a notification when a data message is received
// // await notifee.displayNotification({
// //     title: remoteMessage.notification?.title || remoteMessage.data?.title || 'Background Notification',
// //     body: remoteMessage.notification?.body || remoteMessage.data?.body || 'Notification body',
// //     android: {
// //     channelId: 'default',
// //     sound: 'default',
// //     },
// // });
// // });

// // AppRegistry.registerComponent(appName, () => App);
