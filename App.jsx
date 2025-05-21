import React, {useEffect, useState} from 'react';
import Route from './src/routes/Routes';
import {LogBox, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {persistStore} from 'redux-persist';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/routes/private';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);

  const createNotificationChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'tatd2025',
        name: 'General Notifications',
        sound: 'tatd_driver_one_time',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
      });

      await notifee.createChannel({
        id: 'tatd2025_01',
        name: 'Driver Alerts',
        sound: 'tatd_driver_three_time',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
      });

      await notifee.createChannel({
        id: 'tatd2025_02',
        name: 'Booking Alerts',
        sound: 'ten_minute_booking',
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
      });

      console.log('Notification channels created successfully app.js');
    } catch (error) {}
  };

  useEffect(() => {
    createNotificationChannel();
  }, []);

  // Handle incoming messages
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'Notification onmeesse App.js');
      const channelId = remoteMessage?.data?.channel_id;
      const path = remoteMessage?.data?.path;

      // console.log(channelId, 'channelIdchannelId app');
      // console.log(path, 'pathpath app.js');

      try {
        await notifee.displayNotification({
          title: remoteMessage?.data?.title,
          body: remoteMessage?.data?.body,
          data: remoteMessage,
          android: {
            channelId,
            // sound: sound_,
            // vibrationPattern: [500, 300, 500, 300, 500, 300],
            importance: AndroidImportance.HIGH,
          },
        });
      } catch (error) {}
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
