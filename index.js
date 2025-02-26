import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import {navigate, navigationRef} from './src/utils/navigationRef';
import {SEND_NOTIFICATION_DETAILS} from './src/apis/Apis';
import {navigationRef} from './src/routes/private';
import {checkBatteryOptimization} from './src/utils/permissions';
import {enableScreens} from 'react-native-screens';
import './gesture-handler';

enableScreens();

// 🔹 Function to handle notification click
const handleNotificationPress = async (notification, action, isAppOpen) => {
  if (!notification?.data) return;

  const path = notification?.data?.data?.path;
  const DutyReportPath = path?.includes('DutyReport/');
  // console.log(DutyReportPath, 'duty report path ');
  // return false
  // console.log(notification?.data?.data,"pfwefssswsdsd")
  const messageId = notification?.data?.messageId;

  // console.log('🔔 Notification Clicked:', path);

  try {
    await SEND_NOTIFICATION_DETAILS({
      action: 'update',
      received_status: action,
      firebase_message_id: messageId,
    });
    // console.log('✅ send notification details successful');
  } catch (error) {
    // console.error('❌ Error sending notification details:', error);
  }
  if (DutyReportPath) {
    let bokkingId = path?.split('/')[1];
    setTimeout(
      () => {
        navigationRef?.current?.navigate('DutyReportUpdate', {
          bookingNumber: bokkingId,
          state: '',
        });
      },
      isAppOpen ? 100 : 2000,
    );
  } else {
    setTimeout(
      () => {
        // navigate('TrustedDriver');
        navigationRef?.current?.navigate('TrustedDriver');
      },
      isAppOpen ? 100 : 2000,
    );
  }
};

// 🔹 Foreground notification listener
notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await handleNotificationPress(detail.notification, 'clicked', 'isAppOpen');
  } else if (type == EventType.DISMISSED) {
    await handleNotificationPress(detail.notification, 'dismiss');
  }
});

// 🔹 Background notification listener
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await handleNotificationPress(detail?.notification, 'clicked');
  } else if (type == EventType.DISMISSED) {
    await handleNotificationPress(detail?.notification, 'dismiss');
  }
});

// 🔹 Firebase Background Message Handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('📩 Background message received:', remoteMessage);

  const channelId = remoteMessage?.data?.channel_id || 'default_channel';
  const title = remoteMessage?.data?.title || 'New Notification';
  const body = remoteMessage?.data?.body || 'You have a new message';
  const sound = remoteMessage?.data?.sound || 'default';

  await notifee.displayNotification({
    title,
    body,
    data: remoteMessage, // Ensure data is passed properly

    android: {
      channelId: channelId,
      pressAction: {id: 'default'},
      importance: AndroidImportance.HIGH,
    },
  });
});

checkBatteryOptimization();

// 🔹 Headless Task for Notification Click (handles killed state)
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    '🚀 App opened from killed state by clicking notification:',
    remoteMessage,
  );

  // Call API when notification is clicked
  handleNotificationPress(remoteMessage);
});

// 🔹 Register the Headless Task (for Android)
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => messaging().setBackgroundMessageHandler,
);

// 🔹 Register the App
AppRegistry.registerComponent(appName, () => App);
