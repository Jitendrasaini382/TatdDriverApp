import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {WEEKLY_BOOKING_ACCEPT} from '../../apis/Apis';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');

const FlexibleBookingAcceptModal = ({setOpenModal, booking}) => {
  console.log(booking, 'weekly accept modal booking');
  const bookingNumber = 'FS-18262';
  const [popupData, setPopupData] = useState({});
  const [loader, setLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    setLoader(true);
    weeklybookingAcceptPopuup();
  }, []);
  console.log(
    booking,
    'WEEKLY_BOOKING_ACCEPTWEEKLY_BOOKING_ACCEPTWEEKLY_BOOKING_ACCEPT',
  );

  const weeklybookingAcceptPopuup = async () => {
    console.log('Function weeklybookingAcceptPopuup invoked');
    setLoader(true);
    console.log('Loader set to true');
    try {
      console.log('Attempting to call WEEKLY_BOOKING_ACCEPT with params:', {
        action: 'accept_booking_show_popup_api',
        current_language: languageSwitch,
        all_booking_date: booking?.date_wie,
        FSSubscription_hours: booking?.hours_day,
      });
      const response = await WEEKLY_BOOKING_ACCEPT({
        action: 'accept_booking_show_popup_api',
        current_language: languageSwitch,
        all_booking_date: booking?.date_wie,
        FSSubscription_hours: booking?.hours_day,
      });

      console.log('Response received from WEEKLY_BOOKING_ACCEPT:', response);
      setPopupData(response);
      setLoader(false);
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

  if (loader) {
    return (
      <View
        style={{flex: 0.5, alignContent: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={AppColors.mainColor} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>{popupData?.heading}</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>1. {popupData?.line1}</Text>

          <Text style={styles.paragraph}>2. {popupData?.line2}</Text>

          <Text style={[styles.paragraph, styles.warningText]}>
            3. {popupData?.line3}
          </Text>

          <Text style={styles.paragraph}>4. {popupData?.line4}</Text>

          <Text style={[styles.paragraph, styles.highlightText]}>
            5. {popupData?.line5}
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
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: AppColors.black,
    marginBottom: 20,
  },
  contentContainer: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 10,
    color: AppColors.black,
    padding: 5,
    fontSize: width * 0.04,
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
