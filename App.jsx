// import React, {useState, useEffect} from 'react';
// import 'react-native-gesture-handler';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TextInput,
// } from 'react-native';
// import {LogBox} from 'react-native';
// import Route from './src/routes/Routes';
// import {Provider} from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
// import store from './src/redux/store';
// import {persistStore} from 'redux-persist';
// import {PersistGate} from 'redux-persist/integration/react';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import NetInfo from '@react-native-community/netinfo';
// import {AppColors} from './src/assets/Colors';

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;
// LogBox.ignoreAllLogs();

// const App = () => {
//   const [isConnected, setIsConnected] = useState(true); // Internet connection state
//   const persistor = persistStore(store);

//   // Create notification channel
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
//       console.log(remoteMessage, 'Message received from backend');

//       const sound_ = remoteMessage?.data?.sound || 'sound'; // Default to 'sound'

//       // Display notification
//       await notifee.displayNotification({
//         title: remoteMessage.notification?.title || remoteMessage.data?.title,
//         body: remoteMessage.notification?.body || remoteMessage.data?.body,
//         android: {
//           channelId: 'default',
//           sound: sound_,
//           vibrationPattern: [500, 300, 500, 300, 500, 300],
//           importance: AndroidImportance.HIGH,
//         },
//       });
//     });

//     return unsubscribe;
//   }, []);

//   // Bootstrap notification system
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

//   // Initialize notification and internet listeners
//   useEffect(() => {
//     createNotificationChannel();
//     bootstrap().catch(console.error);

//     // Internet connectivity listener
//     const unsubscribeNetInfo = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribeNetInfo();
//     };
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {isConnected ? (
//           <Route />
//         ) : (
          // <View style={styles.overlay}>
          //   <ActivityIndicator size="large" color={AppColors.mainColor} />
          //   <Text style={styles.message}>No Internet Connection</Text>
          //   <Text style={styles.subMessage}>
          //     Please check your internet connection
          //   </Text>
          // </View>
//         )}
//       </PersistGate>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   message: {
//     fontSize: 18,
//     color: 'white',
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   subMessage: {
//     fontSize: 14,
//     color: 'white',
//     marginTop: 5,
//   },
// });

// export default App;

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
