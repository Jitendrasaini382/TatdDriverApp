import React, {useEffect, useState} from 'react';
import Route from './src/routes/Routes';
import {Alert, LogBox, Platform, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store, { _persistor, persistor } from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/routes/private';
import {PlayInstallReferrer} from 'react-native-play-install-referrer';
import AsyncStorage from '@react-native-async-storage/async-storage';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  // const persistor = persistStore(store);

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
    if (Platform.OS == 'android') {
      createNotificationChannel();
    }
  }, []);

  // Handle incoming messages
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert("P")
      console.log(remoteMessage, 'Notification onmeesse App.js');
      const channelId = remoteMessage?.data?.channel_id;
      const sound = remoteMessage?.data?.sound || 'default';
      console.log(sound)
      const path = remoteMessage?.data?.path;

      // console.log(channelId, 'channelIdchannelId app');
      // console.log(path, 'pathpath app.js');
      console.log(remoteMessage);
      try {
        await notifee.displayNotification({
          title: remoteMessage?.data?.title,
          body: remoteMessage?.data?.body,
          data: remoteMessage.data,
          android: {
            channelId,
            // sound: sound_,
            // vibrationPattern: [500, 300, 500, 300, 500, 300],
            importance: AndroidImportance.HIGH,
          },
          ios: {
            sound: `${sound}.wav`,
          },
        });
      } catch (error) {
        console.log('Notification Error:', error);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  useEffect(() => {
    const getReferrer = async () => {
      try {
        PlayInstallReferrer.getInstallReferrerInfo(
          (installReferrerInfo, error) => {
            if (!error && installReferrerInfo?.installReferrer) {
              const referrer = installReferrerInfo.installReferrer;
              // console.log('Referral code:', referrer);
              // Alert.alert(
              //   'Referral Code',
              //   `Referral code received: ${referrer}`,
              // );

              AsyncStorage.setItem('referralCode', referrer);
            } else {
              // console.log(
              //   'Error:',
              //   error?.message || 'No referrer info found.',
              // );
              // Alert.alert('Error', 'Failed to get referral code');
            }
          },
        );
      } catch (e) {
        console.log('Unexpected error:', e.message);
        // Alert.alert('Error', 'Unexpected error while fetching referral');
      }
    };

    if (Platform.OS == 'android') {
      getReferrer();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={_persistor}>
        <NavigationContainer ref={navigationRef}>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
