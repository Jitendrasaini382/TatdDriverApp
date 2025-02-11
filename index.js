import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {navigate} from './src/utils/navigationRef';

// Function to create notification channels
const createNotificationChannels = async () => {
  try {
    await notifee.createChannel({
      id: 'tatd2025',
      name: 'General Notifications',
      sound: 'tatd_driver_one_time',
      vibration: true,
      vibrationPattern: [300, 500],
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: 'tatd2025_01',
      name: 'Driver Alerts',
      sound: 'tatd_driver_three_time',
      vibration: true,
      vibrationPattern: [300, 500],
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: 'tatd2025_02',
      name: 'Booking Alerts',
      sound: 'ten_minute_booking',
      vibration: true,
      vibrationPattern: [300, 500],
      importance: AndroidImportance.HIGH,
    });

    console.log('Notification channels created successfully index.js');
  } catch (error) {
    console.error('Error creating notification channels:', error);
  }
};

// Background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background message index.js :', remoteMessage);

  // const sound_ = remoteMessage?.notification?.android?.sound || 'default';

  const path = remoteMessage?.data?.path;

  // playSound(sound_);
  // checkVibrationSupport(10000);

  // const channelId = await notifee.createChannel({
  //   id: 'tatd2025',
  //   name: 'General Notifications',
  //   sound: sound_,
  //   vibration: true,
  //   vibrationPattern: [500, 300, 500, 300, 500, 300],
  //   importance: AndroidImportance.HIGH,
  // });

  const channelId = remoteMessage?.notification?.android?.channelId;

  console.log(channelId, 'channelIdchannelId index');

  // await notifee.displayNotification({
  //   title: remoteMessage.notification?.title,
  //   body: remoteMessage.notification?.body,
  //   data: remoteMessage.notification,
  //   android: {
  //     channelId: channelId,
  //     smallIcon: 'ic_launcher', // Make sure this exists in your project

  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
});

// Handle notification events in the background
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Background Event:', type, detail);

  switch (type) {
    case EventType.PRESS:
      // Delayed navigation to ensure the app is ready
      navigate('TrustedDriver');
      console.log('INDEX.js press type ,detailss press pressed', type, detail);

      break;
    case EventType.DISMISSED:
      console.log(
        'index.js press type ,detailss press dismissed',
        type,
        detail,
      );

      console.log('Notification dismissed');
      break;
    default:
      console.log('Unhandled event type:', type);
      break;
  }
});

// Initialize notification channels when the app starts
(async () => {
  await createNotificationChannels();
})();

AppRegistry.registerComponent(appName, () => App);
