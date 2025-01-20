import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import PermanentBookingAcceptModal from '../modal/PermanentBookingAcceptModal';
import ReferFriendModal from '../modal/ReferFriendModal';
import {AppFont} from '../../assets/FontsFamily';
import {PERMANENT_BOOKING} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setTriggerFunction} from '../../redux/slices/globalSlice';

const BookingCard = ({booking}) => {
  const [openModal, setOpenModal] = useState(false);
  const [referFriendModal, setReferFriendModal] = useState(false);

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

  useEffect(() => {
    getPermanentBookingPopup();
  }, [languageSwitch]);

  const getPermanentBookingPopup = async () => {
    try {
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_poup',
        P_ID: P_ID,
        current_language: languageSwitch,
      });
      setPermanentBookingPopup(response.permanent_booking_popup_data);
    } catch (error) {
      console.log(error, 'permanent_booking_view  Error');
    }
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
        <Text style={styles.location}>{locality}</Text>
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
              setOpenModal(true);
            }}
            style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>{apply_or_accept}</Text>
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
    state => state.globalSlice.triggerFunction,
  );

  const refreshKey = useSelector(state => state.globalSlice.refreshKey); // For refresh actions

  useEffect(() => {
    console.log(
      'Triggered by refreshKey, triggerFunction, or languageSwitch permanent',
    );

    // Run the required functions
    getPermanentBookings();
    getPermanentBookingsOthers();
    // Reset `triggerFunction` after running
    if (triggerFunction) {
      dispatch(setTriggerFunction(false));
    }
  }, [triggerFunction, refreshKey, languageSwitch, dispatch]);

  // useEffect(() => {
  //   getPermanentBookings();
  //   getPermanentBookingsOthers();
  // }, [languageSwitch]);

  const getPermanentBookings = async () => {
    try {
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_view',
        booking_zone: 'current',
        current_language: languageSwitch,
      });

      console.log(response, 'permanent_booking_view current response');
      setPermanentBookings(response.permanent_driver_bookings_my_zone);
    } catch (error) {
      console.log(error, 'permanent_booking_view  Error');
    }
  };

  const getPermanentBookingsOthers = async () => {
    try {
      const response = await PERMANENT_BOOKING({
        action: 'permanent_booking_view',
        booking_zone: 'others',
        current_language: languageSwitch,
      });

      console.log(response, 'permanent_booking_view others response');
      setPermanentBookingsOthers(response.permanent_driver_bookings_other_zone);
    } catch (error) {
      console.log(error, 'permanent_booking_view  Error');
    }
  };

  const combinedBookings = [...permanentBookings, ...permanentBookingsOthers];

  console.log(
    combinedBookings,
    'combinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookingscombinedBookings',
  );

  const [visibleBookings, setVisibleBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 2; // Show 2 items per page

  useEffect(() => {
    loadMoreBookings();
  }, []);

  const loadMoreBookings = () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newBookings = combinedBookings.slice(startIndex, endIndex);

    if (newBookings.length > 0) {
      setVisibleBookings(prev => [...prev, ...newBookings]);
      setCurrentPage(nextPage);
    }

    setIsLoading(false);
  };

  return (
    // <FlatList
    //   data={combinedBookings}
    //   keyExtractor={(item, index) => `${item.id || index}`}
    //   renderItem={({item}) => <BookingCard booking={item} />}
    // />

    <FlatList
      data={visibleBookings}
      keyExtractor={(item, index) => `${item.id || index}`}
      renderItem={({item}) => <BookingCard booking={item} />}
      onEndReached={loadMoreBookings} // Load more when reaching the end
      onEndReachedThreshold={0.2} // Trigger when 50% of the list is scrolled
      ListFooterComponent={
        isLoading ? <ActivityIndicator size="large" color="blue" /> : null
      }
    />

    

    // <FlatList
    //   data={combinedBookings.slice(0, visibleBookings)} // Display only visible bookings
    //   keyExtractor={(item, index) => `${item.id || index}`} // Use unique keys
    //   renderItem={({item}) => <BookingCard booking={item} />}
    //   onEndReached={() => setVisibleBookings(visibleBookings + 10)}
    //   // onEndReachedThreshold={1}
    //   // windowSize={2}
    //   showsVerticalScrollIndicator={false}
    // />
  );

  // return (
  //   <ScrollView>
  //     {permanentBookings.map((booking, index) => (
  //       <BookingCard key={index} booking={booking} />
  //     ))}
  //     {permanentBookingsOthers.map((booking, index) => (
  //       <BookingCard key={index} booking={booking} />
  //     ))}
  //   </ScrollView>
  // );
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
    // marginBottom: 15,
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
