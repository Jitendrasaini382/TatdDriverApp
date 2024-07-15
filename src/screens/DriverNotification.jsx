import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import ToggleButton from '../components/ToggleButton';
import {OneWayIcon} from '../assets/images';
import Header from '../components/Header';
import AllNotificationComponent from '../components/AllNotificationsDetails';
import {AppColors} from '../assets/Colors';
import {DRIVER_NOTIFICATION} from '../apis/Apis';

const DriverNotifications = ({navigation}) => {
  const [currentView, setCurrentView] = useState('NOTIFICATIONS');
  const [notificationData, setNotificationData] = useState([]);

  const clearAllNotification = data => {
    DRIVER_NOTIFICATION(data)
      .then(e => {
        Alert.alert(e.message);
        console.log(e.message, 'clear notification     data');
      })
      .catch(err => {
        console.log(err, 'err clear Notification');
      });
  };

  const handleToggle = label => {
    setCurrentView(label);
    if (label === 'NOTICE BOARD') {
      navigation.navigate('DriverNotice');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <ToggleButton
            button1Label="NOTIFICATIONS"
            button2Label="NOTICE BOARD"
            onToggle={handleToggle}
            initialState="NOTIFICATIONS"
          />
        </View>

        <View style={styles.contentContainer}>
          <AllNotificationComponent />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={() =>
          clearAllNotification({
            action: 'clear_all_notifications',
          })
        }>
        <Text style={styles.clearButtonText}>CLEAR ALL NOTIFICATIONS</Text>
        <Image style={styles.clearButtonIcon} source={OneWayIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  headerContainer: {
    // paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,165,0)',
    padding: 20,
  },
  clearButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  clearButtonIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
});

export default DriverNotifications;

// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import ToggleButton from '../components/ToggleButton';
// import {OneWayIcon} from '../assets/images';
// import Header from '../components/Header';
// import AllNotificationComponent from '../components/AllNotificationsDetails';
// import {AppColors} from '../assets/Colors';

// const DriverNotifications = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTIFICATIONS');

//   const handleToggle = (label) => {
//     setCurrentView(label);
//     if (label === 'NOTICE BOARD') {
//       navigation.navigate('DriverNotice');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.headerContainer}>
//           <Header backButton={true} />
//           <ToggleButton
//             button1Label="NOTIFICATIONS"
//             button2Label="NOTICE BOARD"
//             onToggle={handleToggle}
//             initialState="NOTIFICATIONS"

//           />
//         </View>

//         <View style={styles.contentContainer}>
//           <AllNotificationComponent />
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.clearButton}
//         onPress={() => console.warn('Clear All Notification')}>
//         <Text style={styles.clearButtonText}>CLEAR ALL NOTIFICATIONS</Text>
//         <Image style={styles.clearButtonIcon} source={OneWayIcon} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default DriverNotifications;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   scrollView: {
//     flexGrow: 1,
//   },
//   headerContainer: {
//     paddingHorizontal: 16,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   clearButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgb(255,165,0)',
//     padding: 20,
//   },
//   clearButtonText: {
//     color: AppColors.white,
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 10,
//   },
//   clearButtonIcon: {
//     resizeMode: 'contain',
//     height: 24,
//     width: 24,
//   },
// });

// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import ToggleButton from '../components/ToggleButton';
// import {OneWayIcon} from '../assets/images';
// import Header from '../components/Header';
// import AllNotificationComponent from '../components/AllNotificationsDetails';
// import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';
// import { AppColors } from '../assets/Colors';

// const DriverNotifications = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTIFICATIONS');
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.headerContainer}>
//           <Header backButton={true} />
//           <ToggleButton
//             button1Label="NOTIFICATIONS"
//             button2Label="NOTICE BOARD"
//             onToggle={label => setCurrentView(label)}
//           />
//         </View>

//         <View style={styles.contentContainer}>
//           {currentView === 'NOTIFICATIONS' ? (
//             <AllNotificationComponent />
//           ) : (
//             <AllNoticeBoardDetails />
//           )}
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.clearButton}
//         onPress={() => console.warn('Clear All Notification')}>
//         <Text style={styles.clearButtonText}>CLEAR ALL NOTIFICATIONS</Text>
//         <Image style={styles.clearButtonIcon} source={OneWayIcon} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default DriverNotifications;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   scrollView: {
//     flexGrow: 1,
//   },
//   headerContainer: {
//     paddingHorizontal: 16,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   clearButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgb(255,165,0)',
//     padding: 20,
//   },
//   clearButtonText: {
//     color: AppColors.white,
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 10,
//   },
//   clearButtonIcon: {
//     resizeMode: 'contain',
//     height: 24,
//     width: 24,
//   },
// });
