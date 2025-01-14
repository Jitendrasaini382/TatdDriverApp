import {Alert, AppRegistry, AppState, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {playSound} from './src/utils/soundVibration';
import {checkVibrationSupport} from './src/utils/permissions';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // await createNotificationChannel();
  const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time'; // Default to 'sound' if not specified


  console.log(sound_,"index sound");
  


  const channelId = await notifee.createChannel({
    id: 'tatd2025',
    name: 'tatd2025',
    sound: sound_,
    vibration: true, // Ensure vibration is enabled for this channel
    vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
    importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
  });
  playSound(sound_);
  checkVibrationSupport(10000);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.PRESS:
      console.log('Notification pressed in background:', detail);
      // Handle notification press, e.g., navigate to a specific screen
      Alert.alert('ooo');
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

AppRegistry.registerComponent(appName, () => App);
