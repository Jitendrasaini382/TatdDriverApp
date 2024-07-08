import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import {Address, CallingGif} from '../assets/images';
import {AppColors} from '../assets/Colors';
import SwipeableButton from '../components/SwipeableButton';
import RadioButton from '../components/CustomRadioButton';
import PackageDetailsDutyReportUpdate from '../components/modal/PackageDetailsDutyReportUpdate';


const RadioButtonWithTitle = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {id: '1', label: 'Have you talked to the customer ?'},
    {id: '2', label: 'Is the customer not picking up the phone ?'},
    {id: '3', label: 'The customer wants to cancel ?'},
  ];

  const handleSelect = id => {
    setSelectedOption(id);
  };

  return (
    <View style={styles.radioButtonView}>
      {options.map(option => (
        <RadioButton
          key={option.id}
          label={option.label}
          selected={selectedOption === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </View>
  );
};
const DutyReportUpdate = () => {
  const [cancel, setCancel] = useState(false);

  const [
    packageDetailsDutyReportUpdate,
    setPackageDetailsDutyReportUpdate,
  ] = useState(false);

  const handleSwipe = () => {
    Alert.alert('Booking Accepted', 'You have accepted the booking.');
  };

  const openPhoneDialer = () => {
    const phoneNumber = '9810360792';
    let url = `tel:${phoneNumber}`;

    Linking.openURL(url)
      .then(() => console.log('Phone dialer opened successfully'))
      .catch(err => {
        console.error('Error opening phone dialer:', err);
      });
  };




  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
      }}>
      <Header backButton={true} />

      {cancel ? (
        <View
          style={{
            marginTop: 30,
            padding: 10,
          }}>
          <View
            style={{
              borderColor: 'rgb(128,128,128)',
              backgroundColor: 'white',
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 8,
              lineHeight: 20,
              shadowColor: 'rgb(128,128,128)',
              shadowOffset: {width: 5, height: 4},
              shadowOpacity: 5,
              elevation: 5,
              shadowRadius: 5,
              marginBottom: 20,
              padding: 10,
            }}>
            <View style={{padding: 14, alignItems: 'flex-start'}}>
              <Text
                style={{
                  textAlign: 'auto',
                  color: AppColors.black,
                  fontWeight: '700',
                  fontSize: 21,
                  fontFamily: 'Poppins',
                }}>
                Booking is Already Cancelled{' '}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        // }

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
                onPress={() => setPackageDetailsDutyReportUpdate(true)}
                style={styles.packageDetailsButton}>
                <Text style={styles.packageDetailsText}>Package Details</Text>
              </TouchableOpacity>
            </View>
            <Modal
              backdropOpacity={0}
              onBackdropPress={() =>
                setPackageDetailsDutyReportUpdate(false)
              }
              animationIn={'fadeInDown'}
              animationOut={'fadeOutUp'}
              isVisible={packageDetailsDutyReportUpdate}>
              <PackageDetailsDutyReportUpdate
                setPackageDetailsDutyReportUpdate={
                  setPackageDetailsDutyReportUpdate
                }
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
                <TouchableOpacity onPress={openPhoneDialer}>
                  <Image
                    style={styles.callingGif}
                    source={CallingGif}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
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
              <RadioButtonWithTitle />
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
      )}
    </SafeAreaView>
  );
};

export default DutyReportUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  radioButtonView: {
    marginVertical: 12,
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
    marginVertical: 8,
  },
  addressIcon: {
    height: 20,
    width: 20,
    tintColor: 'grey',
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

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';

// const DutyReportUpdate = () => {
//   return (
//     <View style={{flex: 1, flexDirection: 'column'}}>
//       <Header backButton={true} />
//       <View
//         style={{
//           marginTop: 30,
//           padding: 10,
//         }}>
//         <View style={styles.mainView}>
//           <View style={{padding: 14, alignItems: 'flex-start'}}>
//             <Text
//               style={{
//                 textAlign: 'auto',
//                 color: AppColors.black,
//                 fontWeight: '700',
//                 fontSize: 21,
//                 fontFamily: 'Poppins',
//               }}>
//               Booking is Already Cancelled{' '}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DutyReportUpdate;

// const styles = StyleSheet.create({
//   mainView: {
//     borderColor: 'rgb(128,128,128)',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderRadius: 8,
//     lineHeight: 20,
//     shadowColor: 'rgb(128,128,128)',
//     shadowOffset: {width: 5, height: 4},
//     shadowOpacity: 5,
//     elevation: 5,
//     shadowRadius: 5,
//     marginBottom: 20,
//     padding: 10,
//   },
// });
