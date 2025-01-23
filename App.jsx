import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {
  ActivityIndicator,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import {AppColors} from './src/assets/Colors';
import {checkVibrationSupport} from './src/utils/permissions';
import {playSound, triggerVibration} from './src/utils/soundVibration';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);
  const [isConnected, setIsConnected] = useState(true);

  // Function to create a notification channel
  const createNotificationChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'sound',
        vibration: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {}
  };

  // Handle incoming messages
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'remoteMessageremoteMessage app.js');

      const sound_ = remoteMessage?.data?.sound || 'tatd_driver_three_time';

      try {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || remoteMessage.data?.title,
          body: remoteMessage.notification?.body || remoteMessage.data?.body,
          android: {
            channelId: 'default',
            sound: sound_,
            vibrationPattern: [500, 300, 500, 300, 500, 300],
            importance: AndroidImportance.HIGH,
          },
        });
        playSound(sound_);
        checkVibrationSupport(10000);
        triggerVibration();
      } catch (error) {}
    });

    return unsubscribe;
  };

  // Check initial notification on app launch
  const checkInitialNotification = async () => {
    try {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        console.log(
          'App opened from notification:',
          initialNotification.notification,
        );

        console.log('Press action:', initialNotification.pressAction);
      }
    } catch (error) {
      console.error('Error checking initial notification:', error);
    }
  };

  // Monitor network connectivity
  const monitorNetworkConnection = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  };

  // useEffect hooks
  useEffect(() => {
    createNotificationChannel();
    checkInitialNotification();
  }, []);

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  useEffect(() => {
    const unsubscribeNetInfo = monitorNetworkConnection();
    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    // Set up foreground event listener
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('Notification pressed in foreground:', detail);
          break;
        case EventType.DISMISSED:
          console.log('Notification dismissed in foreground:', detail);
          break;
        default:
          console.log('Unhandled event in foreground:', type);
          break;
      }
    });

    return () => unsubscribe();
  }, []);

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
