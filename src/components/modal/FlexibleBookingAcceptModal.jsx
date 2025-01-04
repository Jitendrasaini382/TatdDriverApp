import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {WEEKLY_BOOKING_ACCEPT} from '../../apis/Apis';
import {useSelector} from 'react-redux';

const FlexibleBookingAcceptModal = ({setOpenModal, booking}) => {
  console.log(booking, 'weekly accept modal booking');
  const bookingNumber = 'FS-18262';
  const [popupData, setPopupData] = useState({});
  const [loader, setLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  // useEffect(() => {
  //   setLoader(true);
  //   // weeklybookingAcceptPopuup();
  // }, []);

  const weeklybookingAcceptPopuup = async () => {
    console.log('Function weeklybookingAcceptPopuup invoked');
    setLoader(true);
    console.log('Loader set to true');
    try {
      console.log('Attempting to call WEEKLY_BOOKING_ACCEPT with params:', {
        action: 'accept_booking',
        current_language: languageSwitch,
        booking_id: bookingNumber,
      });
      const response = await WEEKLY_BOOKING_ACCEPT({
        action: 'accept_booking',
        current_language: languageSwitch,
        booking_id: bookingNumber,
      });
      console.log('Response received from WEEKLY_BOOKING_ACCEPT:', response);
      setLoader(false);
      console.log('Loader set to false after successful response');
      // setPopupData(response);
      console.log('Popup data set with:', response);
    } catch (error) {
      setLoader(false);
      console.log('Loader set to false in catch block');

      console.log('Error caught in weeklybookingAcceptPopuup:', error);
    } finally {
      setLoader(false);
      console.log('Loader set to false in finally block');
    }
  };

  const acceptBooking = async () => {
    console.log(bookingNumber, 'accept booking number');
    console.log('final accepttttt');
    try {
      // const response = await FINAL_ACCEPT_BOOKING({
      //   action: 'accept_booking',
      //   booking_id: booking_number,
      //   current_language: languageSwitch,
      // });
      // console.log(response, 'acceptBooking response');
      dispatch(setTriggerFunction(true));
      // navigation.navigate('DutyReportUpdate', {
      //   bookingNumber: booking_number,
      //   isFirstTime: true,
      // });
    } catch (error) {
      console.log(error, 'acceptBooking Error');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>Please Read Carefully.</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            1. Customer needs the same driver on 03 Jul, 04 Jul, 05 Jul, 06 Jul,
            07 Jul, 08 Jul, 09 Jul for 12 hours.
          </Text>

          <Text style={styles.paragraph}>
            2. This is the company's new product - Flexible Subscription, where
            the customer has booked more than one In-city booking on the same
            day. If you press the Accept button, you will receive all bookings
            for Flexible Subscription. You can view all bookings in My Bookings.
          </Text>

          <Text style={[styles.paragraph, styles.warningText]}>
            3. Only accept bookings when you can fulfill all bookings of this
            Flexible Subscription.
          </Text>

          <Text style={styles.paragraph}>
            4. Overtime will be charged at Rs 2 per minute. The commission is
            applied after removing GST on the remaining bill. Night charges will
            be 200 Rs.
          </Text>

          <Text style={[styles.paragraph, styles.highlightText]}>
            5. Please note our job is to reduce customer inconvenience, not to
            increase it.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   Alert.alert('Are You Confirm');
            // }}
            onPress={() => acceptBooking()}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.black,
    marginBottom: 20,
  },
  contentContainer: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
    color: AppColors.black,
    padding: 5,
  },
  warningText: {
    color: AppColors.red,
    fontWeight: 'bold',
    fontFamily: AppFont.regularFont,
  },
  highlightText: {
    color: AppColors.mainColor,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AppColors.black,
  },
  applyButtonText: {
    color: AppColors.white,
  },
});

export default FlexibleBookingAcceptModal;
