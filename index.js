import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {playSound, triggerVibration} from './src/utils/soundVibration';
import {requestNotificationPermission, checkVibrationPermission} from './src/utils/permissions';

// Create notification channel with vibration enabled (for Android)
async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    vibration: true, // Ensure vibration is enabled for this channel
    vibrationPattern: [300, 500], // Custom vibration pattern
    importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
  });
}

// Background message handler for Firebase Messaging
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  // Create notification channel with vibration enabled
  await createNotificationChannel();    

  // Request necessary permissions (Android 13+ for notifications and vibration)
  // await requestNotificationPermission();  // Request notification permission for Android 13+
  await checkVibrationPermission();       // Check if vibration permission is granted

  // Play sound in the background or foreground
  playSound();

  // Trigger vibration in both foreground and background
  console.log('Triggering vibration in both foreground and background');
  triggerVibration();

  // Manually show a notification when a data message is received
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title ,
    body: remoteMessage.notification?.body || remoteMessage.data?.body ,
    android: {
      channelId: 'default', // Make sure the correct channel with vibration is used
      sound: 'default',
      vibrationPattern: [500, 300, 500, 300, 500, 300],  // Custom vibration pattern
    importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
      
    },
  });
});

// Background event handler for Notifee
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Background event received:', type);

  // Handle the background event based on the event type
  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed', detail.notification);
      triggerVibration();
      break;
    case EventType.PRESS:
      console.log('Notification press event', detail.notification);
      break;
  }
});

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
