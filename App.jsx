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
import notifee, {AndroidImportance} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import {AppColors} from './src/assets/Colors';
import {checkVibrationSupport} from './src/utils/permissions';
import { playSound, triggerVibration } from './src/utils/soundVibration';

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
    } catch (error) {
      console.error('Error creating notification channel:', error);
    }
  };

  // Handle incoming messages
  const handleIncomingMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);

      const sound_ = remoteMessage?.data?.sound || 'sound';

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
        triggerVibration()
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
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
  }, []);

  useEffect(() => {
    const unsubscribeMessages = handleIncomingMessages();
    return () => unsubscribeMessages();
  }, []);

  useEffect(() => {
    checkInitialNotification();
  }, []);

  useEffect(() => {
    const unsubscribeNetInfo = monitorNetworkConnection();
    return () => unsubscribeNetInfo();
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

// import React, {useEffect, useState} from 'react';
// import 'react-native-gesture-handler';
// import Route from './src/routes/Routes';
// import {ActivityIndicator, LogBox, Text, TextInput, View} from 'react-native';
// import {Provider} from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
// import store from './src/redux/store';
// import {persistStore} from 'redux-persist';
// import {PersistGate} from 'redux-persist/integration/react';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import NetInfo from '@react-native-community/netinfo';

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;
// LogBox.ignoreAllLogs();

// const App = () => {
//   const persistor = persistStore(store);
//   const [isConnected, setIsConnected] = useState(true);

//   // Create notification channel once at the start
//   async function createNotificationChannel() {
//     await notifee.createChannel({
//       id: 'default', // Unique channel ID
//       name: 'default',
//       sound: 'sound', // Default sound
//       vibration: true,
//       vibrationPattern: [300, 500], // Custom vibration pattern
//       importance: AndroidImportance.HIGH,
//     });
//   }

//   // Handle incoming foreground messages
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log(remoteMessage, 'get message from backend');

//       // Get the dynamic sound from notification payload
//       const sound_ = remoteMessage?.data?.sound || 'sound'; // Default to 'sound' if not specified

//       // Display the notification with dynamically fetched sound
//       await notifee.displayNotification({
//         title: remoteMessage.notification?.title || remoteMessage.data?.title,
//         body: remoteMessage.notification?.body || remoteMessage.data?.body,
//         android: {
//           channelId: 'default', // Use the default channel ID
//           sound: sound_, // Dynamically set sound based on the payload
//           vibrationPattern: [500, 300, 500, 300, 500, 300], // Custom vibration pattern
//           importance: AndroidImportance.HIGH, // High importance for visibility
//         },
//       });

//       playSound(sound_);
//       checkVibrationSupport(10000);
//     });

//     return unsubscribe;
//   }, []);

//   async function bootstrap() {
//     const initialNotification = await notifee.getInitialNotification();

//     if (initialNotification) {
//       console.log(
//         'Notification caused application to open',
//         initialNotification.notification,
//       );
//       console.log(
//         'Press action used to open the app',
//         initialNotification.pressAction,
//       );
//     }
//   }
//   useEffect(() => {
//     bootstrap()
//       .then(e => console.log(e))
//       .catch(console.error);
//   }, []);

//   // Initialize notification channels
//   useEffect(() => {
//     createNotificationChannel(); // Call this once at the start
//   }, []);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   console.log(isConnected,"netttttt");

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Route />
//         {!isConnected && (
//           <View
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             }}>
//             <ActivityIndicator size="large" color="red" />
//             <Text style={{color: 'white', fontSize: 18, marginTop: 10}}>
//               No Internet Connection
//             </Text>
//             <Text style={{color: 'white', fontSize: 14, marginTop: 5}}>
//               Please check your internet connection
//             </Text>
//           </View>
//         )}
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;
