import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import Modal from 'react-native-modal';
import {AppColors} from '../../assets/Colors';
import FlexibleBookingAcceptModal from '../modal/FlexibleBookingAcceptModal';
import {AppFont} from '../../assets/FontsFamily';
import {FlatList} from 'react-native';
import {WEEKLY_BOOKING} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setTriggerFunction} from '../../redux/slices/globalSlice';
const {width} = Dimensions.get('window');

const BookingCard = ({booking, index, total}) => {
  const [openModal, setOpenModal] = useState(false);

  if (!booking || booking.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.days}>{booking?.days} Days | </Text>
          <Text style={styles.price}>
            Rs {booking?.rs} | {booking?.payment_mode}
          </Text>
        </View>
        <View style={styles.vehicleType}>
          <Icon color={AppColors.mainColor} name="car" />
          <Text style={styles.vehicleText}>{booking?.vehicle_type}</Text>
        </View>
      </View>
      <Text style={styles.title}>{booking?.pickup_address}</Text>

      <View style={styles.dates}>
        <Text style={styles.dateText}>{booking?.date_wie.join(' | ')}</Text>
      </View>

      <View style={styles.times}>
        {booking?.time_wie.map((time, idx) => (
          <Text key={idx} style={styles.timeText}>
            {time}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={{fontSize: 20}}>Rs {booking?.budget} </Text>
          {booking?.hours_day} Hours/day
        </Text>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(true);
          }}
          style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>

        {/* <Modal
          backdropOpacity={0}
          onBackdropPress={() => setOpenModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={openModal}>
          <FlexibleBookingAcceptModal
            setOpenModal={setOpenModal}
            booking={booking}
          />
        </Modal> */}

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpenModal(false)}
          visible={openModal}>
          <FlexibleBookingAcceptModal
            setOpenModal={setOpenModal}
            booking={booking}
          />
        </Modal>
      </View>
    </View>
  );
};

const FlexibleBookingView = () => {
  const dispatch = useDispatch();

  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const triggerFunction = useSelector(
    state => state.globalSlice.triggerFunction,
  );

  const refreshKey = useSelector(state => state.globalSlice.refreshKey);

  useEffect(() => {
    getWeeklyBookings();

    if (triggerFunction) {
      dispatch(setTriggerFunction(false));
    }
  }, [triggerFunction, refreshKey, languageSwitch, dispatch]);

  const getWeeklyBookings = async () => {
    try {
      setLoading(true);

      const response = await WEEKLY_BOOKING({
        action: 'weekly_booking_view',
        current_language: languageSwitch,
      });

      setBookingDetails(response?.weeklybookingview);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={bookingDetails}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({item, index}) => (
        <BookingCard
          booking={item}
          index={index}
          total={bookingDetails.length}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: AppColors.mainColor,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerLeft: {flexDirection: 'row'},
  days: {
    color: AppColors.red,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    color: AppColors.mainColor,
    fontWeight: 'bold',
  },
  vehicleType: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
  vehicleText: {
    color: AppColors.mainColor,
    marginLeft: 5,
  },
  title: {
    color: '#fff',
    fontWeight: '400',
    marginBottom: 15,
    fontFamily: 'Roboto-Medium',
    fontSize: width * 0.05,
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dateText: {
    color: '#fff',
  },
  times: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  timeText: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 4,
    color: AppColors.black,
    fontSize: 9,
    margin: 1.5,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  acceptButtonText: {
    color: '#1E5ABF',
    fontWeight: 'bold',
  },
  indexIndicator: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FlexibleBookingView;
