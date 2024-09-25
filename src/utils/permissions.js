import {Platform} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Request notification permission for Android 13+
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    if (result === RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else if (result === RESULTS.DENIED) {
      console.log('Notification permission denied');
    } else if (result === RESULTS.BLOCKED) {
      console.log('Notification permission blocked');
    }
  } else {
    console.log('Notification permission not required for this Android version');
  }
};

// Check vibration permission
export const checkVibrationPermission = async () => {
  if (Platform.OS === 'android') {
    const result = await check(PERMISSIONS.ANDROID.VIBRATE);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('Vibration feature is not available on this device');
        break;
      case RESULTS.DENIED:
        console.log('Vibration permission is denied but requestable');
        break;
      case RESULTS.GRANTED:
        console.log('Vibration permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('Vibration permission is blocked and cannot be requested');
        break;
    }
  }
};
