import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import PermanentBookingAcceptModal from '../modal/PermanentBookingAcceptModal';
import ReferFriendModal from '../modal/ReferFriendModal';
import {AppFont} from '../../assets/FontsFamily';
import {PERMANENT_BOOKING} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setTriggerFunction} from '../../redux/slices/globalSlice';
import {Clipboard} from 'react-native';

const BookingCard = ({booking}) => {
  const [openModal, setOpenModal] = useState(false);
  const [referFriendModal, setReferFriendModal] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);

  if (!booking || booking.length === 0) {
    return null;
  }

  const {
    sub_product,
    car,
    salary,
    working_days,
    working_hours,
    locality,
    trial_date,
    P_ID,
    refer_price,
    refer_button_title,
    apply_or_accept,
  } = booking;

  const [permanentBookingPopup, setPermanentBookingPopup] = useState([]);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const getPermanentBookingPopup = async P_ID => {
    try {
      setLoadingPopup(true);
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_poup',
        P_ID: P_ID,
        current_language: languageSwitch,
      });
      setPermanentBookingPopup(response?.permanent_booking_popup_data);
      setOpenModal(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to load booking details');
    } finally {
      setLoadingPopup(false);
    }
  };

  const copyToClipboard = data => {
    Clipboard.setString(data);
    Alert.alert('Copied Successfully', `${data}`);
  };

  return (
    <View style={styles.bookingContainer}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{sub_product}</Text>
        <Text style={styles.bookingCars}>
          <Icon color={AppColors.white} name="car" /> {car}
        </Text>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹ {salary}</Text>
          <Text style={styles.duration}>
            {working_days} Days | {working_hours} Hours
          </Text>
        </View>
        <Text
          //  onPress={() => copyToClipboard(locality)}
          style={styles.location}>
          {locality}
        </Text>
        <View style={styles.eventContainer}>
          <Text style={styles.eventTypeText}>Interview</Text>
          <Text style={styles.eventText}>{trial_date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setReferFriendModal(true);
            }}
            style={styles.referButton}>
            <Text style={styles.referButtonText}>
              {refer_button_title} - ₹ {refer_price}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getPermanentBookingPopup(P_ID);
            }}
            style={[
              styles.acceptButton,
              {
                backgroundColor: loadingPopup
                  ? AppColors.greyColor
                  : AppColors.white,
              },
            ]}
            disabled={loadingPopup}>
            {loadingPopup ? (
              <ActivityIndicator
                size="small"
                color={AppColors.mainColor}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              />
            ) : (
              <Text style={styles.acceptButtonText}>{apply_or_accept}</Text>
            )}
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setOpenModal(false)}
            visible={openModal}>
            <PermanentBookingAcceptModal
              setOpenModal={setOpenModal}
              data={permanentBookingPopup}
            />
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={referFriendModal}
            onRequestClose={() => setReferFriendModal(false)}>
            <ReferFriendModal
              setReferFriendModal={setReferFriendModal}
              id={P_ID}
            />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const PermanentBookingView = () => {
  const [permanentBookings, setPermanentBookings] = useState([]);
  const [permanentBookingsOthers, setPermanentBookingsOthers] = useState([]);
  const dispatch = useDispatch();

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const triggerFunction = useSelector(
    state => state?.globalSlice?.triggerFunction,
  );

  const refreshKey = useSelector(state => state?.globalSlice?.refreshKey);

  useEffect(() => {
    getPermanentBookings();
    getPermanentBookingsOthers();
    if (triggerFunction) {
      dispatch(setTriggerFunction(false));
    }
  }, [triggerFunction, refreshKey, languageSwitch, dispatch]);

  const getPermanentBookings = async () => {
    try {
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_view',
        booking_zone: 'current',
        current_language: languageSwitch,
      });

      setPermanentBookings(response?.permanent_driver_bookings_my_zone);
    } catch (error) {}
  };

  const getPermanentBookingsOthers = async () => {
    try {
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_view',
        booking_zone: 'others',
        current_language: languageSwitch,
      });

      setPermanentBookingsOthers(
        response?.permanent_driver_bookings_other_zone,
      );
    } catch (error) {}
  };

  const combinedBookings = [...permanentBookings, ...permanentBookingsOthers];

  return (
    <FlatList
      data={combinedBookings}
      keyExtractor={(item, index) => `${item.id || index}`}
      renderItem={({item}) => <BookingCard booking={item} />}
    />
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    marginVertical: 10,
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.white,
  },
  bookingCars: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.white,
  },
  bookingDetails: {
    paddingLeft: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: AppColors.white,
  },
  duration: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
    color: AppColors.white,
    alignSelf: 'center',
  },
  location: {
    color: AppColors.white,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  eventTypeText: {
    color: AppColors.white,
    fontSize: 18,
    marginRight: 10,
  },
  eventText: {
    color: AppColors.white,
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  referButton: {
    backgroundColor: '#ffa500',
    borderRadius: 8,
    padding: 10,
  },
  referButtonText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: AppFont.regularFont,
  },
  acceptButton: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: 10,
  },
  acceptButtonText: {
    color: AppColors.mainColor,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: AppFont.regularFont,
  },
});

export default PermanentBookingView;
