import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  Vibration,
} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import IntentLauncher from '@yz1311/react-native-intent-launcher';
import notifee from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          return true; // Permission granted
        } else if (result === RESULTS.DENIED) {
          return false; // Permission denied
        } else if (result === RESULTS.BLOCKED) {
          return false; // Permission blocked
        }
      } catch (error) {
        return false; // Error occurred
      }
    } else {
      return true; // For Android versions below 33
    }
  } else {
    return true; // Non-Android platforms
  }
};
// Check vibration permission

export const checkVibrationPermission = async () => {
  if (Platform.OS === 'android') {
    const result = await check(PERMISSIONS.ANDROID.VIBRATE);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        break;
      case RESULTS.GRANTED:
        break;
      case RESULTS.BLOCKED:
        break;
    }
  }
};

export const checkVibrationSupport = duration => {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Create a pattern for the specified duration (10 seconds = 10000ms)
      const interval = 100; // Vibrate every 100ms
      const repetitions = Math.floor(duration / interval); // Calculate how many intervals fit in the duration
      const pattern = Array(repetitions)
        .fill(interval)
        .flatMap(v => [v, interval]);

      Vibration.vibrate(pattern, false); // False to avoid infinite vibration
    } else {
    }
  } catch (error) {}
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app requires location access to provide services based on your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required. Please enable it in settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                return false;
              },
            },
            {
              text: 'Go to Settings',
              onPress: () => openSettings(),
            },
          ],
        );
        return;
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const openSettings = () => {
  Linking.openSettings();
};

export const openBatteryOptimizationSettings = () => {
  if (Platform.OS === 'android') {
    try {
      IntentLauncher.startActivity({
        action: 'android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
        data: 'package:com.tatd.driver', // Replace with your app's package name
      });
    } catch (error) {
      Linking.openSettings();
      // Alert.alert('Error', 'Could not open battery optimization settings.');
    }
  } else {
    // Alert.alert('Not Supported', 'This feature is only available on Android.');
  }
};

export const checkBatteryOptimization = async () => {
  const isOptimized = await notifee.isBatteryOptimizationEnabled();
  console.log(isOptimized, 'Battery optimization status');

  if (isOptimized) {
    openBatteryOptimizationSettings();
    return false;
  } else {
    return true;
  }
};
