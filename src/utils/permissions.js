import {Platform, Vibration} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Request notification permission for Android 13+
// export const requestNotificationPermission = async () => {
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//     if (result === RESULTS.GRANTED) {
//       console.log('Notification permission granted');
//     } else if (result === RESULTS.DENIED) {
//       console.log('Notification permission denied');
//     } else if (result === RESULTS.BLOCKED) {
//       console.log('Notification permission blocked');
//     }
//   } else {
//     console.log('Notification permission not required for this Android version');
//   }
// };

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          console.log('Notification permission granted');
          return true; // Permission granted
        } else if (result === RESULTS.DENIED) {
          console.log('Notification permission denied');
          return false; // Permission denied
        } else if (result === RESULTS.BLOCKED) {
          console.log('Notification permission blocked');
          return false; // Permission blocked
        }
      } catch (error) {
        console.log('Error requesting notification permission:', error);
        return false; // Error occurred
      }
    } else {
      console.log(
        'Notification permission not required for this Android version',
      );
      return true; // For Android versions below 33
    }
  } else {
    console.log('Notification permission not applicable on this platform');
    return true; // Non-Android platforms
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

// export const checkVibrationSupport = async time => {
//   try {
//     if (Platform.OS === 'ios') {
//       // Vibration works directly on iOS (no permission required)
//       Vibration.vibrate(time);
//       console.log('Vibration triggered successfully on iOS');
//     } else if (Platform.OS === 'android') {
//       // Test vibration on Android
//       Vibration.vibrate(time); // Vibrates for 500ms
//       console.log('Vibration triggered successfully on Android');
//     } else {
//       console.log('Vibration not supported on this platform');
//     }
//   } catch (error) {
//     console.log('Vibration feature failed', error);
//   }
// };

export const checkVibrationSupport = async time => {
  try {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(time); // iOS vibration works directly
      console.log('Vibration triggered successfully on iOS');
    } else if (Platform.OS === 'android') {
      const pattern = [0, time]; // Vibration pattern
      Vibration.vibrate(pattern); // False: Do not repeat
      console.log('Vibration triggered successfully on Android');
    } else {
      console.log('Vibration not supported on this platform');
    }
  } catch (error) {
    console.log('Vibration feature failed', error);
  }
};

// export const checkVibrationSupport = async time => {
//   if (Platform.OS === 'android') {
//     // Directly test vibration since permission might not be required
//     try {
//       Vibration.vibrate(time); // Vibrates for 500ms
//       console.log('Vibration triggered successfully =====');
//     } catch (error) {
//       console.log('Vibration feature failed', error);
//     }
//   } else {
//     console.log('Vibration not supported on this platform');
//   }
// };
