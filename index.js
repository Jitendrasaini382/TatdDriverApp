// // import {AppRegistry} from 'react-native';
// // import App from './App';
// // import {name as appName} from './app.json';
// // import messaging from '@react-native-firebase/messaging';
// // import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// // import {playSound} from './src/utils/soundVibration';
// // import {checkVibrationSupport} from './src/utils/permissions';
// // import {navigate} from './src/utils/navigationRef';

// // // Background Message Handler (For when notifications are received in the background)
// // messaging().setBackgroundMessageHandler(async remoteMessage => {
// //   console.log('Message handled in the background!', remoteMessage);

// //   // Extract sound from remoteMessage or use default
// //   const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time';
// //   console.log(sound_, 'index sound');

// //   // Play sound only when notification is received

// //   playSound(sound_);
// //   checkVibrationSupport(10000);
// //   // Create notification channel
// //   const channelId = await notifee.createChannel({
// //     id: 'tatd2025',
// //     name: 'tatd2025',
// //     sound: sound_,
// //     vibration: true, // Enable vibration
// //     vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
// //     importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
// //   });

// //   // Display the notification
// //   await notifee.displayNotification({
// //     title: remoteMessage.notification?.title || 'Notification',
// //     body: remoteMessage.notification?.body || 'You have a new message.',
// //     android: {
// //       channelId,
// //       smallIcon: 'ic_launcher', // Replace with your app's small icon
// //       pressAction: {
// //         id: 'default', // Default action
// //       },
// //     },
// //   });
// // });

// // // Foreground Notifications (For notifications received when the app is open)
// // messaging().onMessage(async remoteMessage => {
// //   console.log('Notification received in the foreground!', remoteMessage);

// //   // Extract sound from remoteMessage or use default
// //   const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time';

// //   // Play sound only when notification is received
// //   playSound(sound_);
// //   checkVibrationSupport(10000);

// //   // Display the notification
// //   await notifee.displayNotification({
// //     title: remoteMessage.notification?.title || 'Notification',
// //     body: remoteMessage.notification?.body || 'You have a new message.',
// //     android: {
// //       channelId: 'tatd2025',
// //       smallIcon: 'ic_launcher', // Replace with your app's small icon
// //       pressAction: {
// //         id: 'default', // Default action
// //       },
// //     },
// //   });
// // });

// // // Handle Background Notification Events (Interactions like press or dismiss)
// // notifee.onBackgroundEvent(async ({type, detail}) => {
// //   switch (type) {
// //     case EventType.PRESS:
// //       console.log('Notification pressed in background:', detail);
// //       // Handle notification press, e.g., navigate to a specific screen
// //       navigate('TrustedDriver');
// //       console.log('Pressed notification and navigated to TrustedDriver index');
// //       break;

// //     case EventType.DISMISSED:
// //       console.log('Notification dismissed in background:', detail);
// //       // Handle notification dismissal (no sound logic here)
// //       break;

// //     case EventType.BACKGROUND:
// //       console.log('Background event:', detail);
// //       // Handle other background notification events if needed
// //       break;

// //     default:
// //       console.log('Unhandled background event type:', type);
// //       break;
// //   }
// // });

// // // Register the application component
// // AppRegistry.registerComponent(appName, () => App);
// //////

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {playSound} from './src/utils/soundVibration';
import {checkVibrationSupport} from './src/utils/permissions';
import {navigate} from './src/utils/navigationRef';

let notificationProcessed = false; // Prevent duplicate sound handling

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  if (notificationProcessed) {
    console.log(
      'Duplicate notification detected, ignoring further processing.',
    );
    return;
  }
  notificationProcessed = true; // Mark as processed

  const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time';
  console.log(sound_, 'index sound');

  playSound(sound_);
  checkVibrationSupport(10000);

  await notifee.createChannel({
    id: 'tatd2025',
    name: 'tatd2025',
    sound: sound_,
    vibration: true,
    vibrationPattern: [500, 300, 500, 300, 500, 300],
    importance: AndroidImportance.HIGH,
  });

  setTimeout(() => {
    notificationProcessed = false; // Reset for the next notification
  }, 5000); // Adjust timeout duration as needed
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.PRESS:
      console.log('Notification pressed in background:', detail);
      navigate('TrustedDriver');
      break;
    case EventType.DISMISSED:
      console.log('Notification dismissed in background:', detail);
      break;
    default:
      console.log('Unhandled event in background:', type);
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);

// ////////

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import {playSound} from './src/utils/soundVibration';
// import {checkVibrationSupport} from './src/utils/permissions';
// import {navigate} from './src/utils/navigationRef';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   // await createNotificationChannel();
//   const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time'; // Default to 'sound' if not specified

//   console.log(sound_, 'index sound');

//   playSound(sound_);
//   checkVibrationSupport(10000);

//   const channelId = await notifee.createChannel({
//     id: 'tatd2025',
//     name: 'tatd2025',
//     sound: sound_,
//     vibration: true, // Ensure vibration is enabled for this channel
//     vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
//     importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
//   });
// });

// notifee.onBackgroundEvent(async ({type, detail}) => {
//   switch (type) {
//     case EventType.PRESS:
//       console.log('Notification pressed in background:', detail);
//       // Handle notification press, e.g., navigate to a specific screen
//       navigate('TrustedDriver');
//       console.log('pressed navigateee index.js');

//       // navigate('TrustedDriver', {notificationData: detail.notification});
//       break;
//     case EventType.DISMISSED:
//       console.log('Notification dismissed in background:', detail);
//       // Handle notification dismissal
//       break;
//     case EventType.BACKGROUND:
//       console.log('Background event:', detail);
//       // Handle background notification events if needed
//       break;
//     default:
//       console.log('Unhandled event in background:', type);
//       break;
//   }
// });

// AppRegistry.registerComponent(appName, () => App);
