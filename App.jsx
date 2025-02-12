import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {
  ActivityIndicator,
  Alert,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import {AppColors} from './src/assets/Colors';
import {checkVibrationSupport} from './src/utils/permissions';
import {playSound, triggerVibration} from './src/utils/soundVibration';
import {navigate} from './src/utils/navigationRef';
import {persistStore} from 'redux-persist';
import {SEND_NOTIFICATION_DETAILS} from './src/apis/Apis';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);
  const [isConnected, setIsConnected] = useState(true);

  const createNotificationChannel = async () => {
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

      console.log('Notification channels created successfully app.js');
    } catch (error) {}
  };

  useEffect(() => {
    createNotificationChannel();
  }, []);

  // Handle incoming messages
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // const ssound_ = remoteMessage?.data?.sound;
      console.log(remoteMessage,"Notification onmeesse App.js")
      // const sound_ = remoteMessage?.notification?.android?.sound;
      const channelId = remoteMessage?.data?.channel_id;
      const path = remoteMessage?.data?.path;

      console.log(channelId, 'channelIdchannelId app');
      console.log(path, 'pathpath app.js');

      // createNotificationChannel(sound_);
      // playSound(sound_);
      // checkVibrationSupport(10000);
      // triggerVibration();

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

  

  // Monitor network connectivity
  const monitorNetworkConnection = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  };

  useEffect(() => {
    // checkInitialNotification();
  }, []);

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  useEffect(() => {
    const unsubscribeNetInfo = monitorNetworkConnection();
    return () => unsubscribeNetInfo();
  }, []);

  const sendNotificationDetails = async (status, path, id) => {
    console.log(
      {
        action: 'update',
        received_status: status,
        landing_url: path,
        firebase_message_id: id,
      },
      'sending action app',
    );

    try {
      const response = await SEND_NOTIFICATION_DETAILS({
        action: 'update',
        received_status: status,
        landing_url: path,
        firebase_message_id: id,
      });

      console.log(response, 'response send notificationnnn == app');
    } catch (error) {
      console.log(error, 'sending notificationnnn');
    }
  };

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!isConnected ? (
          <View style={styles.noInternetOverlay}>
            <ActivityIndicator size="large" color={AppColors.red} />
            <Text style={styles.noInternetText}>No Internet Connection</Text>
            <Text style={styles.noInternetSubText}>
              Please check your internet connection
            </Text>
          </View>
        ) : (
          <Route />
        )}
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  noInternetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  noInternetText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  noInternetSubText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});

export default App;
