import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import {AppColors} from '../../assets/Colors';
import PermanentBookingAcceptModal from '../modal/PermanentBookingAcceptModal';
import ReferFriendModal from '../modal/ReferFriendModal';
import {AppFont} from '../../assets/FontsFamily';

const BookingCard = ({booking}) => {
  const [openModal, setOpenModal] = useState(false);
  const [referFriendModal, setReferFriendModal] = useState(false);

  const {type, cars, amount, duration, location, eventType, date} = booking;

  return (
    <View style={styles.bookingContainer}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{type}</Text>
        <Text style={styles.bookingCars}>
          <Icon color={AppColors.white} name="car" /> {cars}
        </Text>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <Icon color={AppColors.white} name="rupee" size={27} />
            {amount}
          </Text>
          {/* <Text style={styles.duration}>{duration}</Text> */}
        </View>
        {/* <Text style={styles.location}>{location}</Text> */}
        <View style={styles.eventContainer}>
          {/* <Text style={styles.eventTypeText}>{eventType}</Text> */}
          {/* <Text style={styles.eventText}>{date}</Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setReferFriendModal(true);
            }}
            style={styles.referButton}>
            <Text style={styles.referButtonText}>
              Refer Your Friend-
              <Icon name="rupee" />
              250
            </Text>
          </TouchableOpacity>
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
            <PermanentBookingAcceptModal setOpenModal={setOpenModal} />
          </Modal> */}

          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => setOpenModal(false)}
            visible={openModal}>
            <PermanentBookingAcceptModal setOpenModal={setOpenModal} />
          </Modal>
          {/* <Modal
            backdropOpacity={0}
            onBackdropPress={() => setReferFriendModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={referFriendModal}> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={referFriendModal}
            onRequestClose={() => setReferFriendModal(false)}>
            <ReferFriendModal setReferFriendModal={setReferFriendModal} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const PermanentBookingView = () => {
  const permanentBookings = [
    {
      type: 'Private Driver',
      cars: 'Altis Manual and Exter Automatic',
      amount: 200000,
      duration: '26 Days | 12 Hours',
      location: 'Vijay Nagar',
      eventType: 'Interview',
      date: '24 Jun, 10:00 AM',
    },
    // {
    //   type: 'Govt Driver',
    //   cars: 'Creata Manual and Exter Automatic',
    //   amount: 500000,
    //   duration: '26 Days | 12 Hours',
    //   location: 'Kiran Nagar',
    //   eventType: 'Interview',
    //   date: '28 Jun, 10:00 AM',
    // },
  ];

  return (
    <ScrollView>
      {permanentBookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    marginTop: 20,
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.white,
  },
  bookingCars: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: AppColors.white,
  },
  location: {
    color: AppColors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  eventTypeText: {
    color: AppColors.white,
    fontSize: 15,
    marginRight: 10,
  },
  eventText: {
    color: AppColors.white,
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
    fontFamily: AppFont.regularFont,
  },
});

export default PermanentBookingView;
