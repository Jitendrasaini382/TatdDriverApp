import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {FINAL_ACCEPT_BOOKING} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  setRefreshKey,
  setTriggerFunction,
} from '../../redux/slices/globalSlice';

const RoundTripBookingAceeptModal = ({setOpenModal, trip}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [loader, setLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const driverConsent = useSelector(e => e?.globalSlice?.driverConsentData);

  const {
    booking_number,
    incentive,
    incentive_eligibility_fullfillment,
    incentive_eligible_amount_fullfillment,
    driver_assignment_in_10_minutes_incentive,
  } = trip;

  const acceptBooking = async () => {
    setLoader(true);
    try {
      const response = await FINAL_ACCEPT_BOOKING({
        action: 'accept_booking',
        booking_id: booking_number,
        incentive: incentive,
        incentive_eligibility_fullfillment: incentive_eligibility_fullfillment,
        incentive_eligible_amount_fullfillment:
          incentive_eligible_amount_fullfillment,
        driver_assignment_in_10_minutes_incentive:
          driver_assignment_in_10_minutes_incentive,
        current_language: languageSwitch,
      });

      if (response?.status_code == '200') {
        if (response?.msg_type == 'error') {
          // Alert.alert('Error', response?.message, [{text: 'OK'}]);
          Alert.alert('Error', response?.message, [
            {
              text: 'OK',
              onPress: () => {
                setOpenModal(false), setLoader(true);
                return false;
              },
            },
          ]);
          dispatch(setTriggerFunction(true));
          dispatch(setRefreshKey());
          return false;
        } else {
          navigation.navigate('DutyReportUpdate', {
            bookingNumber: booking_number,
            isFirstTime: true,
            isType: 'Ondemand',
          });
        }
      } else {
        Alert.alert('Error', response?.message, [
          {
            text: 'OK',
            onPress: () => {
              setOpenModal(false), setLoader(true);
              return false;
            },
          },
        ]);
      }
    } catch (error) {
      setOpenModal(false);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
              {
                backgroundColor: checked1
                  ? AppColors.mainColor
                  : AppColors.white,
              },
            ]}>
            {checked1 && <Text style={styles.checkboxTick}>✔</Text>}
          </TouchableOpacity>
          <Pressable onPress={() => setChecked1(!checked1)}>
            <Text style={styles.checkboxLabel}>
              {driverConsent?.checkboxLabel1}
            </Text>
          </Pressable>
        </View>

        {/* Second Checkbox */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            onPress={() => setChecked2(!checked2)}
            style={[
              styles.checkbox,
              {
                backgroundColor: checked2
                  ? AppColors.mainColor
                  : AppColors.white,
              },
            ]}>
            {checked2 && <Text style={styles.checkboxTick}>✔</Text>}
          </TouchableOpacity>
          <Pressable onPress={() => setChecked2(!checked2)}>
            <Text style={styles.checkboxLabel}>
              {driverConsent?.checkboxLabel2}
            </Text>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => acceptBooking()}
        disabled={!(checked1 && checked2) || loader}
        style={[
          styles.acceptButton,
          {
            backgroundColor:
              checked1 && checked2 ? AppColors.mainColor : '#CCCCCC',
          },
        ]}>
        <Text style={styles.acceptButtonText}>
          {loader ? (
            <>
              <ActivityIndicator size="small" color="#FFFFFF" /> Please Wait...
            </>
          ) : (
            'Accept'
          )}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    color: AppColors.black,
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
    borderColor: AppColors.mainColor,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    color: AppColors.white,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.black,
    flex: 1,
  },
  acceptButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    marginBottom: 20,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  acceptButtonText: {
    fontSize: 22,
    color: AppColors.white,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
  },
});

export default RoundTripBookingAceeptModal;
