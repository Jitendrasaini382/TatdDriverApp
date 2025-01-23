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
import {
  FINAL_ACCEPT_WEEKLY_BOOKING,
  WEEKLY_BOOKING_ACCEPT,
} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {
  setRefreshKey,
  setTriggerFunction,
} from '../../redux/slices/globalSlice';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const FlexibleBookingAcceptModal = ({setOpenModal, booking}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [popupData, setPopupData] = useState({});
  const [loader, setLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    setLoader(true);
    weeklybookingAcceptPopuup();
  }, []);

  const weeklybookingAcceptPopuup = async () => {
    setLoader(true);
    try {
      const response = await WEEKLY_BOOKING_ACCEPT({
        action: 'accept_booking_show_popup_api',
        current_language: languageSwitch,
        all_booking_date: booking?.date_wie,
        FSSubscription_hours: booking?.hours_day,
      });

      setPopupData(response);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  function formatBookingIds(bookingIds) {
    return bookingIds.join(',');
  }

  const acceptBooking = async () => {
    try {
      const response = await FINAL_ACCEPT_WEEKLY_BOOKING({
        action: 'accept_booking',
        booking_ids: formatBookingIds(booking?.booking_ids),
        current_language: languageSwitch,
      });

      dispatch(setTriggerFunction(true));
      dispatch(setRefreshKey());

      setOpenModal(false);

      navigation.navigate('DutyReportUpdate', {
        bookingNumber: booking?.booking_ids[0],
        isFirstTime: true,
        isType: 'Weekly',
      });
    } catch (error) {}
  };

  if (loader) {
    return (
      <View
        style={{flex: 0.5, alignContent: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="small" color={AppColors.mainColor} />
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
            onPress={() => acceptBooking()}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Accept</Text>
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
