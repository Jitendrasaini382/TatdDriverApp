import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {ON_DEMAND_BOOKING} from '../../apis/Apis';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const RoundTripBookingAceeptModal = ({setOpenModal, trip}) => {
  const navigation = useNavigation();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [driverConsent, setDriverConsent] = useState({});
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  console.log(trip, 'popuop datatattatatat');

  const {
    booking_number,
    incentive,
    incentive_eligibility_fullfillment,
    incentive_eligible_amount_fullfillment,
    driver_assignment_in_10_minutes_incentive,
  } = trip;

  console.log(
    booking_number,
    incentive,
    incentive_eligibility_fullfillment,
    incentive_eligible_amount_fullfillment,
    driver_assignment_in_10_minutes_incentive,
    'all recieve Data',
  );

  useEffect(() => {
    driverConsentPopupView();
  }, []);

  const driverConsentPopupView = async () => {
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'ondemand_driver_consent_popup_view',
        current_language: languageSwitch,
      });

      console.log(
        response?.ondemand_driver_consent_popup_data,
        'ondemand_driver_consent_popup_view response',
      );
      setDriverConsent(response?.ondemand_driver_consent_popup_data);
    } catch (error) {
      console.log(error, 'ondemand_driver_consent_popup_view Error');
    }
  };

  const acceptBooking = async () => {
    console.log(booking_number, 'accept booking number');
    console.log('final accepttttt');
    // navigation.navigate('DutyReportUpdate', {
    //   booking: booking_number,
    //   tripStatus: '0',
    // });
    setOpenModal(false);
    // try {
    //   const response = await ON_DEMAND_BOOKING({
    //     action: 'ondemand_driver_consent_popup_view',
    //     current_language: languageSwitch,
    //     booking_id : booking_number
    //   });

    //   console.log(
    //     response?.ondemand_driver_consent_popup_data,
    //     'ondemand_driver_consent_popup_view response',
    //   );
    //   setDriverConsent(response?.ondemand_driver_consent_popup_data);
    // } catch (error) {
    //   console.log(error, 'ondemand_driver_consent_popup_view Error');
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{driverConsent?.accept_heading}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpenModal(false)}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          {driverConsent?.accept_paragraph1}
        </Text>
        <Text style={styles.contentText}>
          {driverConsent?.accept_paragraph2}
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        {/* First Checkbox */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            onPress={() => setChecked1(!checked1)}
            style={[
              styles.checkbox,
              {backgroundColor: checked1 ? AppColors.mainColor : 'white'},
            ]}>
            {checked1 && <Text style={styles.checkboxTick}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            {driverConsent?.checkboxLabel1}
          </Text>
        </View>

        {/* Second Checkbox */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            onPress={() => setChecked2(!checked2)}
            style={[
              styles.checkbox,
              {backgroundColor: checked2 ? AppColors.mainColor : 'white'},
            ]}>
            {checked2 && <Text style={styles.checkboxTick}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            {driverConsent?.checkboxLabel2}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => acceptBooking()}
        disabled={!(checked1 && checked2)}
        style={[
          styles.acceptButton,
          {
            backgroundColor:
              checked1 && checked2 ? AppColors.mainColor : '#CCCCCC',
          },
        ]}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: AppColors.mainColor,
    backgroundColor: AppColors.white,
    margin: 5,
  },
  header: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: AppColors.black,
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  closeButton: {
    padding: 10,
    textAlign: 'right',
    fontSize: 25,
    fontFamily: 'Roboto',
    color: AppColors.gray,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  contentText: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.black,
    flex: 1,
  },
  acceptButton: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: AppColors.black,
    marginBottom: 20,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  acceptButtonText: {
    fontSize: 22,
    color: AppColors.white,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
});

export default RoundTripBookingAceeptModal;

// return (
//   // <SafeAreaView style={{flex: 1}}>
//   <View
//     style={{
//       borderWidth: 2,
//       borderColor: AppColors.mainColor,
//       // flex: 1,
//       backgroundColor: AppColors.white,
//       margin: 5,
//     }}>
//     <View
//       style={{
//         // backgroundColor: AppColors.silverGrey,
//         backgroundColor: '#F7F7F7',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 15,
//         paddingHorizontal: 20,
//         // alignContent: 'center',
//         // alignSelf: 'center',
//       }}>
//       <View
//         style={{
//           // paddingHorizontal: 10,
//           // paddingTop: 40,
//           // paddingBottom: 20,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text
//           style={{
//             color: AppColors.black,
//             fontSize: 25,
//             fontFamily: 'Roboto',
//             fontWeight: '500',
//           }}>
//           {driverConsent?.accept_heading}
//         </Text>
//       </View>
//       <TouchableOpacity onPress={() => setOpenModal(false)}>
//         <Text
//           style={{
//             padding: 10,
//             textAlign: 'right',
//             fontSize: 25,
//             fontFamily: 'Roboto',
//             color: AppColors.gray,
//             fontWeight: 'bold',
//           }}>
//           X
//         </Text>
//       </TouchableOpacity>
//     </View>
//     <View style={{paddingHorizontal: 10}}>
//       <Text style={{color: 'black', fontSize: 20, padding: 10}}>
//         {driverConsent?.accept_paragraph1}
//       </Text>
//       <Text style={{color: 'black', fontSize: 20, padding: 10}}>
//         {driverConsent?.accept_paragraph2}
//       </Text>
//     </View>
//     <View
//       style={{
//         flexDirection: 'column',
//         justifyContent: 'center',
//         padding: 10,
//       }}>
//       {/* First Checkbox */}
//       <View
//         style={{
//           flexDirection: 'row',
//           // alignItems: 'center',
//           marginBottom: 10,
//           justifyContent: 'flex-start',
//         }}>
//         <TouchableOpacity
//           onPress={() => setChecked1(!checked1)}
//           style={{
//             height: 20,
//             width: 20,
//             borderWidth: 1,
//             borderColor: 'black',
//             backgroundColor: checked1 ? AppColors.mainColor : 'white',
//             marginRight: 10,
//           }}>
//           {checked1 && (
//             <Text style={{color: 'white', fontWeight: 'bold'}}>✔</Text>
//           )}
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: 'bold',
//             // flex: 1,
//             color: AppColors.black,
//           }}>
//           {driverConsent?.checkboxLabel1}
//         </Text>
//       </View>

//       {/* Second Checkbox */}
//       <View
//         style={{
//           flexDirection: 'row',
//           // alignItems: 'center',
//           marginBottom: 10,
//           justifyContent: 'flex-start',
//         }}>
//         <TouchableOpacity
//           onPress={() => setChecked2(!checked2)}
//           style={{
//             height: 20,
//             width: 20,
//             borderWidth: 1,
//             borderColor: 'black',
//             backgroundColor: checked2 ? AppColors.mainColor : 'white',
//             marginRight: 10,
//           }}>
//           {checked2 && (
//             <Text style={{color: 'white', fontWeight: 'bold'}}>✔</Text>
//           )}
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: 'bold',
//             flex: 1,
//             color: AppColors.black,
//           }}>
//           {driverConsent?.checkboxLabel2}
//         </Text>
//       </View>
//     </View>

//     <TouchableOpacity
//       onPress={() => {
//         Alert.alert('Are You Confirm');
//       }}
//       disabled={!checked1 && !checked2}
//       style={{
//         backgroundColor:
//           checked1 && checked2 ? AppColors.mainColor : '#CCCCCC',
//         padding: 10,
//         borderWidth: 0.5,
//         borderColor: AppColors.black,
//         // paddingHorizontal: 20,
//         marginBottom: 20,
//         width: '50%',
//         justifyContent: 'center',
//         alignSelf: 'center',
//       }}>
//       <Text
//         style={{
//           fontSize: 22,
//           color: AppColors.white,
//           fontFamily: 'Roboto-Medium',
//           alignSelf: 'center',
//         }}>
//         Accept
//       </Text>
//     </TouchableOpacity>
//   </View>
//   // </SafeAreaView>
// );
// };
