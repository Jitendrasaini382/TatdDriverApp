import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import notifee from '@notifee/react-native';
import { GET_FCM_TOKEN } from '../apis/Apis';
import { playSound } from './soundVibration'; 

class NotificationService {

  // Request notification permission for both iOS and Android
  static async requestUserPermission() {
    console.log('[NotificationService] Requesting user permission...');
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('[NotificationService] Notification permission granted.');
        this.getFcmToken();
      } else {
        console.warn('[NotificationService] Notification permission denied.');
      }
    } else if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          console.log('[NotificationService] Notification permission granted.');
          this.getFcmToken();
        } else {
          console.warn('[NotificationService] Notification permission denied.');
        }
      } else {
        console.log('[NotificationService] Android version < 33, no need for POST_NOTIFICATIONS permission.');
        this.getFcmToken();
      }

      // Create the notification channel for Android devices
      await this.createNotificationChannel();
    }
  }

  // Create a notification channel for Android devices
  static async createNotificationChannel() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default', // Default notification sound
        importance: notifee.AndroidImportance.HIGH, // Set importance to high to trigger sound and vibration
      });
      console.log('[NotificationService] Notification channel created.');
    }
  }

  // Get the FCM token
  static async getFcmToken() {
    console.log('[NotificationService] Fetching FCM token...');
    try {
      const token = await messaging().getToken();
      console.log('[NotificationService] FCM Token:', token);
      if (token) {
        await this.sendNotificationMessage(token);
      }
      return token;
    } catch (error) {
      console.error('[NotificationService] Error fetching FCM Token:', error);
    }
  }

  // Send FCM token to the server
  static async sendNotificationMessage(fcmtoken) {
    console.log('[NotificationService] Sending FCM token to the server...');
    try {
      const response = await GET_FCM_TOKEN({
        fcm_token: fcmtoken,
        action: 'save_fcm'
      });
      console.log('[NotificationService] GET FCM TOKEN response:', response);
    } catch (error) {
      console.error('[NotificationService] Error sending FCM token:', error);
    }
  }

  // Handle FCM token refresh
  static onTokenRefresh() {
    return messaging().onTokenRefresh(async token => {
      console.log('[NotificationService] New FCM Token:', token);
      await this.sendNotificationMessage(token);
    });
  }

  
  // Handle foreground notification
  static async onMessageListener() {
    console.log('[NotificationService] Setting up onMessage listener...');
    messaging().onMessage(async remoteMessage => {
      console.log('[NotificationService] FCM message in foreground:', remoteMessage);

      // Play sound and trigger vibration
      console.log('[NotificationService] Playing sound and triggering vibration...');

      // Display the notification using Notifee
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'No title',
        body: remoteMessage.notification?.body || 'No body',
        android: {
          channelId: 'default', // Make sure you've created a channel for Android
        },
      });
      playSound();
    });
  }
}

export default NotificationService;






// import { Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import notifee from '@notifee/react-native';
// import { GET_FCM_TOKEN } from '../apis/Apis';
// import { playSound } from './soundVibration'; 

// class NotificationService {
  
  
//   // Request notification permission for both iOS and Android
//   static async requestUserPermission() {
//     console.log("Runnnnnnnnnnnnn111111111111111111111111");
//     if (Platform.OS === 'ios') {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Notification permission granted.');
//         this.getFcmToken();
//       } else {
//         console.log('Notification permission denied.');
//       }
//     } else if (Platform.OS === 'android') {
//     console.log("Runnnnnnnnnnnnn1111111111111111111111122222222222222222222222222222222222222222221");

//       console.log('Android Platform Detected');
//       if (Platform.Version >= 33) {
//         const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//         if (result === RESULTS.GRANTED) {
//           console.log('Notification permission granted.');
//           this.getFcmToken();
//         } else {
//           console.log('Notification permission denied.');
//         }
//       } else {
//         this.getFcmToken();
//       }

//       // Create the notification channel for Android devices
//       await this.createNotificationChannel();
//     }
//   }

//   // Create a notification channel for Android devices
//   static async createNotificationChannel() {
//     if (Platform.OS === 'android') {
//       await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         sound: 'default', // Default notification sound
//         importance: notifee.AndroidImportance.HIGH, // Set importance to high to trigger sound and vibration
//       });
//       console.log('Notification channel created');
//     }
//   }

//   // Get the FCM token
//   static async getFcmToken() {
//     try {
//       const token = await messaging().getToken();
//       console.log('FCM Token:', token);
//       if (token) {
//         await this.sendNotificationMessage(token);
//       }
//       return token;
//     } catch (error) {
//       console.error('Error fetching FCM Token:', error);
//     }
//   }

//   // Send FCM token to the server
//   static async sendNotificationMessage(fcmtoken) {
//     try {
//       const response = await GET_FCM_TOKEN({
//         fcm_token: fcmtoken,
//         action: 'save_fcm'
//       });
//       console.log('GET FCM TOKEN response:', response);
//     } catch (error) {
//       console.error('Error sending FCM token:', error);
//     }
//   }

//   // Handle FCM token refresh
//   static onTokenRefresh() {
//     return messaging().onTokenRefresh(async token => {
//       console.log('New FCM Token:', token);
//       await this.sendNotificationMessage(token);
//     });
//   }

//   // Handle foreground notification
//   static async onMessageListener() {
//     messaging().onMessage(async remoteMessage => {
//       console.log('FCM message in foreground:', remoteMessage);
//       playSound();


//       // Display the notification using Notifee
//       await notifee.displayNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         android: {
//           channelId: 'default', // Make sure you've created a channel for Android
//         },
//       });

//       // Trigger sound and vibration when notification is received
//       // playSound();
//     });
//   }
// }

// export default NotificationService;









// // import { Platform } from 'react-native';
// // import messaging from '@react-native-firebase/messaging';
// // import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// // import notifee from '@notifee/react-native'; 
// // import { GET_FCM_TOKEN } from '../apis/Apis';

// // class NotificationService {

// //   static async requestUserPermission() {
// //     if (Platform.OS === 'ios') {
// //       const authStatus = await messaging().requestPermission();
// //       const enabled =
// //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// //       if (enabled) {
// //         console.log('Notification permission granted.');
// //         this.getFcmToken();
// //       } else {
// //         console.log('Notification permission denied.');
// //       }
// //     } else if (Platform.OS === 'android') {
// //       console.log('Android Platform Detected');
// //       if (Platform.Version >= 33) {
// //         const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
// //         if (result === RESULTS.GRANTED) {
// //           console.log('Notification permission granted.');
// //           this.getFcmToken();
// //         } else {
// //           console.log('Notification permission denied.');
// //         }
// //       } else {
// //         this.getFcmToken();
// //       }
// //     }
// //   }

// //   static async getFcmToken() {
// //     try {
// //       const token = await messaging().getToken();
// //       console.log('FCM Token:', token);
// //       if (token) {
// //         await this.sendNotificationMessage(token);
// //       }
// //       return token;
// //     } catch (error) {
// //       console.error('Error fetching FCM Token:', error);
// //     }
// //   }

// //   static async sendNotificationMessage(fcmtoken) {
// //     try {
// //       const response = await GET_FCM_TOKEN({
// //         fcm_token: fcmtoken,
// //         action: 'save_fcm'
// //       });
// //       console.log('GET FCM TOKEN response:', response);
// //     } catch (error) {
// //       console.error('Error sending FCM token:', error);
// //     }
// //   }

// //   static onTokenRefresh() {
// //     return messaging().onTokenRefresh(async token => {
// //       console.log('New FCM Token:', token);
// //       await this.sendNotificationMessage(token);
// //     });
// //   }

// //   // Handle foreground notification
// //   static async onMessageListener() {
// //     messaging().onMessage(async remoteMessage => {
// //       console.log('FCM message in foreground:', remoteMessage);

// //       // Display the notification using Notifee
// //       await notifee.displayNotification({
// //         title: remoteMessage.notification.title,
// //         body: remoteMessage.notification.body,
// //         android: {
// //           channelId: 'default', // Make sure you've created a channel for Android
// //         },
// //       });
// //     });
// //   }
// // }

// // export default NotificationService;











// // // import {Platform} from 'react-native';
// // // import messaging from '@react-native-firebase/messaging';
// // // import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// // // import {GET_FCM_TOKEN} from '../apis/Apis';

// // // class NotificationService {
// // //   // Function to request user permission
// // //   static async requestUserPermission() {
// // //     if (Platform.OS === 'ios') {
// // //       // Request permission on iOS
// // //       const authStatus = await messaging().requestPermission();
// // //       const enabled =
// // //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// // //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// // //       if (enabled) {
// // //         console.log('Notification permission granted.');
// // //         this.getFcmToken(); // Fetch the FCM token
// // //       } else {
// // //         console.log('Notification permission denied.');
// // //       }
// // //     } else if (Platform.OS === 'android') {
// // //       console.log('Android Platform Detected');
// // //       // Handle Android 13+ notification permission request
// // //       if (Platform.Version >= 33) {
// // //         const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
// // //         if (result === RESULTS.GRANTED) {
// // //           console.log('Notification permission granted.');
// // //           this.getFcmToken(); // Fetch the FCM token
// // //         } else {
// // //           console.log('Notification permission denied.');
// // //         }
// // //       } else {
// // //         // For Android versions below 13, permission is auto-granted
// // //         this.getFcmToken(); // Fetch the FCM token
// // //       }
// // //     }
// // //   }

// // //   // Function to get the FCM token
// // //   static async getFcmToken() {
// // //     try {
// // //       const token = await messaging().getToken();
// // //       console.log('FCM Token:', token);
// // //       if (token) {
// // //         await this.sendNotificationMessage(token); // Send token to server
// // //       }
// // //       return token;
// // //     } catch (error) {
// // //       console.error('Error fetching FCM Token:', error);
// // //     }
// // //   }

// // //   // Function to send FCM token to your server
// // //   static async sendNotificationMessage(fcmtoken) {
// // //     try {
// // //       const response = await GET_FCM_TOKEN({
// // //         fcm_token: fcmtoken,
// // //         action: 'save_fcm',
// // //       });
// // //       console.log('GET FCM TOKEN response:', response);
// // //     } catch (error) {
// // //       console.error('Error sending FCM token:', error);
// // //     }
// // //   }

// // //   // Function to handle token refresh
// // //   static onTokenRefresh() {
// // //     return messaging().onTokenRefresh(async token => {
// // //       console.log('New FCM Token:', token);
// // //       await this.sendNotificationMessage(token); // Send refreshed token to server
// // //     });
// // //   }
// // // }

// // // export default NotificationService;

// // // // import {Platform} from 'react-native';
// // // // import messaging from '@react-native-firebase/messaging';
// // // // import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// // // // import { GET_FCM_TOKEN } from '../apis/Apis';

// // // // class NotificationService {
// // // //   // Function to request user permission
// // // //  const [fcmtoken,setFcmToken]=useState()

// // // //   static async requestUserPermission() {
// // // //     if (Platform.OS === 'ios') {
// // // //       // Request permission on iOS
// // // //       const authStatus = await messaging().requestPermission();
// // // //       const enabled =
// // // //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// // // //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// // // //       if (enabled) {
// // // //         console.log('Notification permission granted.');
// // // //         this.getFcmToken(); // Fetch the FCM token
// // // //       } else {
// // // //         console.log('Notification permission denied.');
// // // //       }
// // // //     } else if (Platform.OS === 'android') {
// // // //         console.log('=============================================================================================');
// // // //         console.log(">>>>>>>>>>>>>>>>>>>>>>");
// // // //         console.log('=========================================================================');
// // // //       // Handle Android 13+ notification permission request
// // // //       if (Platform.Version >= 33) {
// // // //         const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
// // // //         if (result === RESULTS.GRANTED) {
// // // //           console.log('Notification permission granted.');
// // // //           this.getFcmToken(); // Fetch the FCM token
// // // //         } else {
// // // //           console.log('Notification permission denied.');
// // // //         }
// // // //       } else {
// // // //         // For Android versions below 13, permission is auto-granted
// // // //         this.getFcmToken(); // Fetch the FCM token
// // // //       }
// // // //     }
// // // //   }

// // // //   // Function to get the FCM token
// // // //   static async getFcmToken() {
// // // //     console.log(
// // // //       'runnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnrunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn11111111111111111111111',
// // // //     );

// // // //     const token = await messaging().getToken();
// // // //     console.log('FCM Token:', token);
// // // //     // Optionally, you can send the token to your server here
// // // //     sendNotificationMessage(token)
// // // //     return token;
// // // //   }

// // // //   const sendNotificationMessage = async (fcmtoken)=>{
// // // //     const response = await GET_FCM_TOKEN({
// // // //       "fcm_token":fcmtoken,
// // // //       "action":"save_fcm"
// // // //   });

// // // //     console.log('GET FCM TOKEN response:', response);

// // // //     setFcmToken()

// // // //   }

// // // //   // Function to handle token refresh
// // // //   static onTokenRefresh() {
// // // //     return messaging().onTokenRefresh(token => {
// // // //       console.log('New FCM Token:', token);
// // // //       // Optionally, send the new token to your server here
// // // //     });
// // // //   }

// // // // }

// // // // export default NotificationService;
