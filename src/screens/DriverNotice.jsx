import {StyleSheet, View, SafeAreaView, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import ToggleButton from '../components/ToggleButton';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';

const DriverNotice = ({navigation}) => {
  const [currentView, setCurrentView] = useState('NOTICE BOARD');

  const handleToggle = label => {
    setCurrentView(label);
    if (label === 'NOTIFICATIONS') {
      navigation.navigate('DriverNotifications');
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
            initialState="NOTICE BOARD"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.headingHindi}>जरूरी जानकारी।</Text>
          <AllNoticeBoardDetails />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverNotice;

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
  headingHindi: {color: AppColors.black, fontSize: 15, paddingLeft: 10},
});

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
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';

// const DriverNotice = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTICE BOARD');

//   const handleToggle = (label) => {
//     setCurrentView(label);
//     if (label === 'NOTIFICATIONS') {
//       navigation.navigate('DriverNotifications');
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
//             initialState="NOTICE BOARD"
//           />
//         </View>

//         <View style={styles.contentContainer}>
//           <AllNoticeBoardDetails />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DriverNotice;

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
// });

// // import {
// //   Image,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   SafeAreaView,
// //   ScrollView,
// // } from 'react-native';
// // import React, {useState, useEffect} from 'react';
// // import ToggleButton from '../components/ToggleButton';
// // import Header from '../components/Header';
// // import {AppColors} from '../assets/Colors';
// // import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';

// // const DriverNotice = ({navigation}) => {
// //   const [currentView, setCurrentView] = useState('NOTICE BOARD');
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView contentContainerStyle={styles.scrollView}>
// //         <View style={styles.headerContainer}>
// //           <Header backButton={true} />
// //           <ToggleButton
// //             button1Label="NOTIFICATIONS"
// //             button2Label="NOTICE BOARD"
// //             onToggle={()=>navigation.navigate('DriverNotice')}
// //           />
// //         </View>

// //         <View style={styles.contentContainer}>
// //           <AllNoticeBoardDetails />
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default DriverNotice;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: AppColors.white,
// //   },
// //   scrollView: {
// //     flexGrow: 1,
// //   },
// //   headerContainer: {
// //     paddingHorizontal: 16,
// //   },
// //   contentContainer: {
// //     flex: 1,
// //     paddingHorizontal: 16,
// //   },
// // });
