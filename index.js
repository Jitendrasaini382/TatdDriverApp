import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {playSound} from './src/utils/soundVibration';
import {checkVibrationSupport} from './src/utils/permissions';
import {navigate} from './src/utils/navigationRef';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const sound_ = remoteMessage?.notification?.android?.sound;

  playSound(sound_);
  checkVibrationSupport(10000);

  const channelId = await notifee.createChannel({
    id: 'tatd2025',
    name: 'tatd2025',
    sound: sound_,
    vibration: true, // Ensure vibration is enabled for this channel
    vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
    importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
  });
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.PRESS:
      // Handle notification press, e.g., navigate to a specific screen
      navigate('TrustedDriver');

      break;
    case EventType.DISMISSED:
      break;
    case EventType.BACKGROUND:
      // Handle background notification events if needed
      break;
    default:
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);
