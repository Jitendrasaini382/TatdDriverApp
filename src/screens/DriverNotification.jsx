import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ToggleButton from '../components/ToggleButton';
import { OneWayIcon } from '../assets/images';
import Header from '../components/Header';
import AllNotificationComponent from '../components/AllNotificationsDetails';
import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';

const DriverNotifications = ({ navigation }) => {
  const [currentView, setCurrentView] = useState('NOTIFICATIONS');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Header backButton={true} />
          <ToggleButton
            button1Label="NOTIFICATIONS"
            button2Label="NOTICE BOARD"
            onToggle={label => setCurrentView(label)}
          />
        </View>

        <View style={styles.contentContainer}>
          {currentView === 'NOTIFICATIONS' ? (
            <AllNotificationComponent />
          ) : (
            <AllNoticeBoardDetails />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => console.warn('Clear All Notification')}
      >
        <Text style={styles.clearButtonText}>CLEAR ALL NOTIFICATIONS</Text>
        <Image
          style={styles.clearButtonIcon}
          source={OneWayIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DriverNotifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
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
    color: 'white',
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















// import {
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import ToggleButton from '../components/ToggleButton';
// import {OneWayIcon} from '../assets/images';
// import Header from '../components/Header';
// import AllNotificationComponent from '../components/AllNotificationsDetails';
// import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';

// const DriverNotifications = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTIFICATIONS');

//   return (
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         flex: 1,
//         height: '100%',
//         justifyContent: 'space-between',
//         backgroundColor: 'white',
//       }}>
//       <View style={{}}>
//         <Header backButton={true} />
//         {/* <ToggleButton
//           button1Label="NOTIFICATIONS"
//           button2Label="NOTICE BOARD"
//         /> */}

//         <ToggleButton
//           button1Label="NOTIFICATIONS"
//           button2Label="NOTICE BOARD"
//           onToggle={label => setCurrentView(label)}
//         />

//         {currentView === 'NOTIFICATIONS' ? (
//           <AllNotificationComponent />
//         ) : (
//           <AllNoticeBoardDetails />
//         )}
//       </View>

//       <TouchableOpacity onPress={() => console.warn('Clear All Notification')}>
//         <View
//           style={{
//             alignItems: 'center',
//             backgroundColor: 'rgb(255,165,0)',
//             padding: 25,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             paddingBottom: 27,
//           }}>
//           <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
//             CLEAR ALL NOTIFICATIONS
//           </Text>
//           <Image
//             style={{resizeMode: 'center', height: 30, width: 33}}
//             source={OneWayIcon}
//           />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DriverNotifications;

// const styles = StyleSheet.create({});
