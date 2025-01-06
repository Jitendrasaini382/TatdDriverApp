import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
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

const BookingCard = ({booking, index, total}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.days}>{booking.days} Days | </Text>
          <Text style={styles.price}>
            Rs {booking.rs} | {booking.payment_mode}
          </Text>
        </View>
        <View style={styles.vehicleType}>
          <Icon color={AppColors.mainColor} name="car" />
          <Text style={styles.vehicleText}>{booking.car_model}</Text>
        </View>
      </View>
      <Text style={styles.title}>{booking.pickup_address}</Text>
      <View style={styles.dates}>
        {booking.date_wie.map((date, idx) => (
          <Text key={idx} style={styles.dateText}>
            {date} |
          </Text>
        ))}
      </View>
      <View style={styles.times}>
        {booking.time_wie.map((time, idx) => (
          <Text key={idx} style={styles.timeText}>
            {time}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={{fontSize: 20}}>Rs {booking.budget} </Text>
          {booking.hours_day} Hours/day
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
  // const bookingDetails = [
  //   {
  //     days: 4,
  //     rs: 4328,
  //     payment_mode: 'Cash',
  //     vehicle_type: 'Manual',
  //     car_model: 'Hatchback',
  //     pickup_address: 'Testing of the day status of the day status ',
  //     zone: 'Chennai',
  //     budget: '1082',
  //     hours_day: '12',
  //     date_wie: [
  //       '03 Jan',
  //       '04 Jan',
  //       '05 Jan',
  //       '07 Jan',
  //       '03 Jan',
  //       '04 Jan',
  //       '05 Jan',
  //       '07 Jan',
  //     ],
  //     time_wie: ['05:15 AM ', '05:15 AM ', '05:15 AM ', '05:15 AM '],
  //   },
  //   {
  //     days: 4,
  //     rs: 4328,
  //     payment_mode: 'Cash',
  //     vehicle_type: 'Manual',
  //     car_model: 'Hatchback',
  //     pickup_address: 'Testing of the day status of the day status ',
  //     zone: 'Chennai',
  //     budget: '1082',
  //     hours_day: '12',
  //     date_wie: ['03 Jan', '04 Jan', '05 Jan', '07 Jan'],
  //     time_wie: ['05:15 AM ', '05:15 AM ', '05:15 AM ', '05:15 AM '],
  //   },
  // ];

  const bookingDetails = [];
  const dispatch = useDispatch();

  const [bookingDetailss, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const triggerFunction = useSelector(
    state => state.globalSlice.triggerFunction,
  );

  const refreshKey = useSelector(state => state.globalSlice.refreshKey);

  // useEffect(() => {
  //   console.log(
  //     'Triggered by refreshKey, triggerFunction, or languageSwitch flexible',
  //   );

  //   // Run the required functions
  //   getWeeklyBookings();

  //   // Reset `triggerFunction` after running
  //   if (triggerFunction) {
  //     dispatch(setTriggerFunction(false));
  //   }
  // }, [triggerFunction, refreshKey, languageSwitch, dispatch]);

  const getWeeklyBookings = async () => {
    try {
      console.log('Starting getWeeklyBookings function');

      setLoading(true); // Show loader
      console.log('Loader set to true');

      const response = await WEEKLY_BOOKING({
        action: 'weekly_booking_view',
        current_language: languageSwitch,
      });
      console.log('WEEKLY_BOOKING API call made');

      console.log(response, 'getWeeklyBookings response received');

      // setBookingDetails(response.weeklybookingview);
      console.log('Booking details processing complete');
    } catch (error) {
      console.log(error, 'getWeeklyBookings Error caught');
    } finally {
      setLoading(false);
      console.log('Loader set to false');
      console.log('getWeeklyBookings function execution complete');
    }
  };

  //   return (
  //     <ScrollView>
  //       {bookingDetails.map((booking, index) => (
  //         <BookingCard
  //           key={index}
  //           booking={booking}
  //           index={index}
  //           total={bookingDetails.length}
  //         />
  //       ))}
  //     </ScrollView>
  //   );
  // };

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

    // padding: 12,
    // marginVertical: 10,
    // marginHorizontal: 10,
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
    fontSize: 22,
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
    padding: 5,
    color: AppColors.black,
    margin: 2,
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
  indexText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FlexibleBookingView;
