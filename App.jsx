import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {Alert, LogBox, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {
  AndroidImportance,
  EventType,
  iOSVisibility,
} from '@notifee/react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);

  async function createNotificationChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      vibration: true, // Ensure vibration is enabled for this channel
      vibrationPattern: [300, 500], // Custom vibration pattern
    });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage,"get message from backend");
      
      await createNotificationChannel();
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || remoteMessage.data?.title,
        body: remoteMessage.notification?.body || remoteMessage.data?.body,
        android: {
          channelId: 'default', // Make sure the correct channel with vibration is used
          sound: 'default',
          vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
          importance: AndroidImportance.HIGH, // High importance to allow sound and vibration
        },
      });
    });

    return unsubscribe;
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
