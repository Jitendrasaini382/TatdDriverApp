// import React from 'react';
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Header from '../../components/Header';
// import {Address, CallingGif} from '../../assets/images';
// import {AppColors} from '../../assets/Colors';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import SwipeableButton from '../../components/SwipeableButton';
// import RadioButtonMyBooking from '../../components/RadioButtonMyBooking';

// const DutyReportUpdateProcess = () => {
//   const handleSwipe = () => {
//     Alert.alert('Booking Accepted', 'You have accepted the booking.');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header backButton={true} />
//       <ScrollView>
//         <View style={styles.mainView}>
//           <View style={styles.topSection}>
//             <Text style={styles.dutyTimeText}>
//               Duty Time- 05:45 PM, 08 Jul,2024
//             </Text>
//           </View>
//           <View style={styles.bookingSection}>
//             <Text style={styles.bookingNoText}>Booking No : #432791</Text>
//             <TouchableOpacity style={styles.packageDetailsButton}>
//               <Text style={styles.packageDetailsText}>Package Details</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.middleSection}>
//             <View style={styles.nameTypeContainer}>
//               <Text style={styles.nameText}>Zaid</Text>
//               <Text style={styles.typeText}>Round Trip Incity</Text>
//             </View>
//             <View style={styles.addressCallContainer}>
//               <View style={styles.addressContainer}>
//                 <Image
//                   source={Address}
//                   resizeMode="contain"
//                   style={styles.addressIcon}
//                 />
//                 <Text style={styles.addressText}>testing testing testing</Text>
//               </View>
//               <TouchableOpacity>
//                 <Image
//                   style={styles.callingGif}
//                   source={CallingGif}
//                   resizeMode="cover"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <RadioButtonMyBooking/>
//           <SwipeableButton onSwipe={handleSwipe} />
//           <View style={styles.youtubeContainer}>
//             <YoutubePlayer
//               height={200}
//               videoId={'SsG_qwb0zLs'}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   mainView: {
//     backgroundColor: 'white',
//     margin: 15,
//     borderRadius: 10,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   topSection: {
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   dutyTimeText: {
//     color: AppColors.black,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   bookingSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//   },
//   bookingNoText: {
//     color: AppColors.black,
//     fontSize: 14,
//   },
//   packageDetailsButton: {
//     padding: 8,
//     borderRadius: 5,
//     backgroundColor: 'white',
//     elevation: 2,
//   },
//   packageDetailsText: {
//     color: AppColors.black,
//     fontSize: 12,
//   },
//   middleSection: {
//     backgroundColor: '#f7f7f7',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e0e0e0',
//     padding: 15,
//   },
//   nameTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   nameText: {
//     color: AppColors.black,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   typeText: {
//     color: AppColors.black,
//     fontSize: 14,
//   },
//   addressCallContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   addressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   addressIcon: {
//     height: 20,
//     width: 20,
//     marginRight: 10,
//   },
//   addressText: {
//     color: AppColors.black,
//     fontSize: 14,
//     flex: 1,
//   },
//   callingGif: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   youtubeContainer: {
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//     overflow: 'hidden',
//     marginBottom:10
//   },
// });

// export default DutyReportUpdateProcess;

import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Address, CallingGif} from '../../assets/images';
import Modal from 'react-native-modal';
import {AppColors} from '../../assets/Colors';
import YoutubePlayer from 'react-native-youtube-iframe';
import RadioButtonMyBooking from '../../components/RadioButtonMyBooking';
import SwipeableButton from '../../components/SwipeableButton';
import PackageDetailsDutyReportUpdateProcess from '../../components/modal/PackageDetailsDutyReportUpdateProcess';

const DutyReportUpdateProcess = () => {

  const [packageDetailsDutyReportUpdateProcess, setPackageDetailsDutyReportUpdateProcess] = useState(false)

  const handleSwipe = () => {
    Alert.alert('Booking Accepted', 'You have accepted the booking.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />

      <ScrollView>
        <View style={styles.mainView}>
          {/* top */}
          <View style={styles.topSection}>
            <Text style={styles.interviewTimeText}>
              Interview Time- 10:00 AM, 26 Jun,2024
            </Text>
          </View>
          <View style={styles.bookingSection}>
            <View>
              <Text style={styles.bookingNoText}>Booking No : #431062</Text>
            </View>
            <TouchableOpacity 
            onPress={()=> setPackageDetailsDutyReportUpdateProcess(true) }
            style={styles.packageDetailsButton}>
              <Text style={styles.packageDetailsText}>Package Details</Text>
            </TouchableOpacity>
          </View>
          <Modal
        backdropOpacity={0}
        onBackdropPress={() => setPackageDetailsDutyReportUpdateProcess(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={packageDetailsDutyReportUpdateProcess}>
        <PackageDetailsDutyReportUpdateProcess
          setPackageDetailsDutyReportUpdateProcess={setPackageDetailsDutyReportUpdateProcess}
          // tripDetails={selectedTrip}
        />
      </Modal>
          {/* middle */}
          <View style={styles.middleSection}>
            <View style={styles.nameTypeContainer}>
              <Text style={styles.nameText}>Sagar Saxena</Text>
              <Text style={styles.typeText}>Permanent</Text>
            </View>
            <View style={styles.addressCallContainer}>
             <View>
             <View style={styles.addressContainer}>
                <Image
                  source={Address}
                  resizeMode="contain"
                  style={styles.addressIcon}
                />
                <Text style={styles.addressText}>D-51 A 2nd Floor</Text>
              </View>
              <View style={styles.addressContainer}>
                <Image
                  source={Address}
                  resizeMode="contain"
                  style={styles.addressIcon}
                />
                <Text style={styles.addressText}>Noida Floor</Text>
              </View>
             </View>
              <View>
                <Image
                  style={styles.callingGif}
                  source={CallingGif}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          {/* bottom */}
          <View
            style={{
              elevation: 1,
              borderRadius: 5,
              borderWidth: 1,
              backgroundColor: '#f7f7f7',
              borderColor: '#ccc',
              padding: 15,
            }}>
            <RadioButtonMyBooking />
            <SwipeableButton onSwipe={handleSwipe} />

            <View style={{marginTop: 20}}>
              <YoutubePlayer
                height={500}
                // autoPlay={false}
                videoId={'SsG_qwb0zLs'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainView: {
    borderColor: '#808080',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderStyle: 'solid',
    margin: 10,
    padding: 10,
    paddingBottom: 65,
    marginVertical: 20,
    borderRadius: 5,
    lineHeight: 20,
    shadowColor: 'rgb(128,128,128)',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 10,
    elevation: 2,
    shadowRadius: 5,
    marginBottom: 20,
    // flex: 1
  },
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  interviewTimeText: {
    color: AppColors.black,
    fontWeight: 'bold',
  },
  bookingSection: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingNoText: {
    color: AppColors.black,
  },
  packageDetailsButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
  },
  packageDetailsText: {
    color: AppColors.black,
  },
  middleSection: {
    elevation: 1,
    borderWidth: 1,
    borderRadius: 5,

    backgroundColor: '#f7f7f7',
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
  },
  nameTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    color: AppColors.black,
  },
  typeText: {
    color: AppColors.black,
  },
  addressCallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // alignSelf: 'center',
    marginVertical: 8
  },
  addressIcon: {
    height: 20,
    width: 20,
    tintColor:"grey"
  },
  addressText: {
    color: AppColors.black,
    flexWrap: 'wrap',
  },
  callingGif: {
    width: 40,
    height: 40,
    borderColor: 'greyLight',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default DutyReportUpdateProcess;
