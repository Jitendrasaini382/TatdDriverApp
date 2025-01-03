import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {LogBox, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);

  // Create notification channel once at the start
  async function createNotificationChannel() {
    await notifee.createChannel({
      id: 'default', // Unique channel ID
      name: 'default',
      sound: 'sound', // Default sound
      vibration: true,
      vibrationPattern: [300, 500], // Custom vibration pattern
      importance: AndroidImportance.HIGH,
    });
  }

  // Handle background events like notification press
  // useEffect(() => {
  //   notifee.onBackgroundEvent(async ({type, detail}) => {
  //     switch (type) {
  //       case EventType.PRESS:
  //         console.log('Notification pressed in background:', detail);
  //         // Handle notification press, e.g., navigate to a specific screen
  //         break;
  //       case EventType.DISMISSED:
  //         console.log('Notification dismissed in background:', detail);
  //         // Handle notification dismissal
  //         break;
  //       case EventType.BACKGROUND:
  //         console.log('Background event:', detail);
  //         // Handle background notification events if needed
  //         break;
  //       default:
  //         console.log('Unhandled event in background:', type);
  //         break;
  //     }
  //   });

  //   return () => {
  //     unsubscribeBackground();
  //   };
  // }, []);

  // Handle incoming foreground messages
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'get message from backend');

      // Get the dynamic sound from notification payload
      const sound_ = remoteMessage?.data?.sound || 'sound'; // Default to 'sound' if not specified

      // Display the notification with dynamically fetched sound
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || remoteMessage.data?.title,
        body: remoteMessage.notification?.body || remoteMessage.data?.body,
        android: {
          channelId: 'default', // Use the default channel ID
          sound: sound_, // Dynamically set sound based on the payload
          vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
          importance: AndroidImportance.HIGH, // High importance for visibility
        },
      });

      playSound(sound_);
      checkVibrationSupport(10000);
    });

    return unsubscribe;
  }, []);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }
  useEffect(() => {
    bootstrap()
      .then(e => console.log(e))
      .catch(console.error);
  }, []);

  // Initialize notification channels
  useEffect(() => {
    createNotificationChannel(); // Call this once at the start
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
};

export default App;
