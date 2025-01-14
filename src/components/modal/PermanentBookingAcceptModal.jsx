import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {
  ACCEPT_PERMANENT_BOOKING,
  APPLY_PERMANENT_BOOKING,
} from '../../apis/Apis';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTriggerFunction} from '../../redux/slices/globalSlice';

const PermanentBookingAcceptModal = ({setOpenModal, data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    condition_1,
    condition_2,
    condition_3,
    condition_4,
    condition_5,
    warning,
  } = data?.conditions;

  const {cancel, apply_or_accept, P_ID} = data?.actions;

  const handleAccept = (id, name) => {
    console.log(id, name, '==handleSubmittt');
    if (name == 'Accept') {
      console.log(name, '--- Accept run');
      handleAcceptPermanentBooking(id);
    } else if (name == 'Apply') {
      console.log(name, '--- Apply run');
      handleApplyPermanentBooking(id);
    }
  };

  // const handleApplyPermanentBooking = async id => {
  //   try {
  //     const response = await APPLY_PERMANENT_BOOKING({
  //       action: 'send_permanent_application',
  //       P_ID: id,
  //     });
  //     console.log(response, 'APPLY_PERMANENT_BOOKINGAPPLY_PERMANENT_BOOKING');
  //   } catch (error) {
  //     console.log(
  //       error,
  //       'APPLY_PERMANENT_BOOKINGAPPLY_PERMANENT_BOOKING  Error',
  //     );
  //   }
  // };

  const handleApplyPermanentBooking = async id => {
    try {
      console.log('Function started, received ID:', id);

      const payload = {
        action: 'send_permanent_application',
        P_ID: id,
      };
      console.log('Payload prepared:', payload);

      const response = await APPLY_PERMANENT_BOOKING(payload);
      console.log('Response received:', response);

      console.log(
        response,
        'APPLY_PERMANENT_BOOKINGAPPLY_PERMANENT_BOOKING completed successfully',
      );
      if (response?.status_code == 200) {
        // Alert.alert(response?.message);
        Alert.alert('Success', response?.message, [{text: 'OK'}]);
        dispatch(setTriggerFunction(true));

        setOpenModal(false);
      }
    } catch (error) {
      console.log('Error encountered:', error);
      console.log(
        error,
        'APPLY_PERMANENT_BOOKINGAPPLY_PERMANENT_BOOKING Error',
      );
    }
  };

  // const handleAcceptPermanentBooking = async id => {
  //   try {
  //     const response = await ACCEPT_PERMANENT_BOOKING({
  //       action: 'permanent_instant_driver_assignment_to_customer',
  //       P_ID: id,
  //     });
  //     console.log(response, 'ACCEPT_PERMANENT_BOOKINGACCEPT_PERMANENT_BOOKING');
  //   } catch (error) {
  //     console.log(
  //       error,
  //       'ACCEPT_PERMANENT_BOOKINGACCEPT_PERMANENT_BOOKING  Error',
  //     );
  //   }
  // };

  const handleAcceptPermanentBooking = async id => {
    console.log('Function called with id:', id);
    try {
      console.log('Attempting to call ACCEPT_PERMANENT_BOOKING with payload:', {
        action: 'permanent_instant_driver_assignment_to_customer',
        P_ID: id,
      });

      const response = await ACCEPT_PERMANENT_BOOKING({
        action: 'permanent_instant_driver_assignment_to_customer',
        P_ID: id,
      });
      console.log('Response from ACCEPT_PERMANENT_BOOKING:', response);
      if (response?.status_code == 200) {
        const bookingNumber = response?.booking_id;
        navigation.navigate('DutyReportUpdate', {
          bookingNumber: bookingNumber,
          isFirstTime: true,
          isFirstTimeId: '5',
        });
        setOpenModal(false);
        dispatch(setTriggerFunction(true));
      }
    } catch (error) {
      console.log('Caught an error:', error);
      if (error == 'Booking is not in pending status') {
        Alert.alert('This booking already accepted by another driver.');
      }
      console.log(
        error,
        'ACCEPT_PERMANENT_BOOKINGACCEPT_PERMANENT_BOOKING Error',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>{data?.instructions}</Text>

        <Text style={styles.subHeader}>
          यह एक Private नौकरी है, {data?.job_content}
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>1. {condition_1}</Text>
          <Text style={styles.listItem}>2. {condition_2}</Text>
          <Text style={styles.listItem}>3. {condition_3}</Text>
          <Text style={styles.listItem}>4. {condition_4}</Text>
          <Text style={styles.listItem}>5. {condition_5}</Text>
          <Text style={styles.warning}>6. {warning}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setOpenModal(false)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{cancel}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              // Alert.alert('Are You Confirm');
              // handleAcceptPermanentBooking(P_ID);
              // console.log(P_ID, apply_or_accept, 'accept Button Clickk');
              handleAccept(P_ID, apply_or_accept);
            }}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>{apply_or_accept}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex:1,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: AppColors.black,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: AppColors.black,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    fontSize: 18,
    color: AppColors.black,
  },
  warning: {
    color: AppColors.red,
    fontWeight: '600',
    marginBottom: 15,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AppColors.black,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: AppFont.regularFont,
  },
  applyButtonText: {
    color: AppColors.white,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: AppFont.regularFont,
  },
});

export default PermanentBookingAcceptModal;
