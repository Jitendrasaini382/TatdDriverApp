import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import notifee from '@notifee/react-native';
import {playSound} from './soundVibration';

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
        console.log(
          '[NotificationService] Android version < 33, no need for POST_NOTIFICATIONS permission.',
        );
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
      console.log(
        '[NotificationService] FCM message in foreground:',
        remoteMessage,
      );

      // Play sound and trigger vibration
      console.log(
        '[NotificationService] Playing sound and triggering vibration...',
      );

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
