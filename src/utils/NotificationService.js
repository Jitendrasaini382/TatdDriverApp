import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import notifee from '@notifee/react-native';
import {playSound} from './soundVibration';

class NotificationService {
  // Request notification permission for both iOS and Android
  static async requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        this.getFcmToken();
      } else {
      }
    } else if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          this.getFcmToken();
        } else {
        }
      } else {
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
    }
  }

  // Get the FCM token
  static async getFcmToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        await this.sendNotificationMessage(token);
      }
      return token;
    } catch (error) {}
  }

  // Handle FCM token refresh
  static onTokenRefresh() {
    return messaging().onTokenRefresh(async token => {
      await this.sendNotificationMessage(token);
    });
  }

  // Handle foreground notification
  static async onMessageListener() {
    messaging().onMessage(async remoteMessage => {
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
