import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Modal from 'react-native-modal';
import {AppColors} from '../../assets/Colors';
import FlexibleBookingAcceptModal from '../modal/FlexibleBookingAcceptModal';
import { AppFont } from '../../assets/FontsFamily';

const BookingCard = ({booking, index, total}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.days}>{booking.days} Days | </Text>
          <Text style={styles.price}>
            Rs {booking.price} | {booking.paymentMethod}
          </Text>
        </View>
        <View style={styles.vehicleType}>
          <Icon color={AppColors.mainColor} name="car" />
          <Text style={styles.vehicleText}>{booking.vehicleType}</Text>
        </View>
      </View>
      <Text style={styles.title}>{booking.location}</Text>
      <View style={styles.dates}>
        {booking.dates.map((date, idx) => (
          <Text key={idx} style={styles.dateText}>
            {date} |
          </Text>
        ))}
      </View>
      <View style={styles.times}>
        {booking.times.map((time, idx) => (
          <Text key={idx} style={styles.timeText}>
            {time}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={{fontSize: 20}}>Rs {booking.total} </Text>
          {booking.hoursPerDay} Hours/day
        </Text>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(true);
          }}
          style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setOpenModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={openModal}>
          <FlexibleBookingAcceptModal setOpenModal={setOpenModal} />
        </Modal>
      </View>
    </View>
  );
};

const FlexibleBookingView = () => {
  const bookingDetails = [
    {
      days: 7,
      price: 7224,
      paymentMethod: 'Cash',
      vehicleType: 'Manual - Hatchback',
      location: 'Testing for internal purpose, Chennai',
      dates: [
        '03 Jul',
        '04 Jul',
        '05 Jul',
        '06 Jul',
        '07 Jul',
        '08 Jul',
        '09 Jul',
      ],
      times: [
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
      ],
      total: 1032,
      hoursPerDay: 12,
    },
    {
      days: 4,
      price: 1624,
      paymentMethod: 'Cash',
      vehicleType: 'Manual - Luxury',
      location: 'Testing for External purpose, Chennai',
      dates: [
        '03 Jun',
        '04 Jun',
        '05 Jun',
        '06 Jun',
        '07 Jun',
        '08 Jun',
        '09 Jun',
      ],
      times: [
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
      ],
      total: 1032,
      hoursPerDay: 12,
    },
    {
      days: 7,
      price: 7224,
      paymentMethod: 'Cash',
      vehicleType: 'Manual - Hatchback',
      location: 'Testing for internal purpose, Chennai',
      dates: [
        '03 Aug',
        '04 Aug',
        '05 Aug',
        '06 Aug',
        '07 Aug',
        '08 Aug',
        '09 Aug',
      ],
      times: [
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
      ],
      total: 1032,
      hoursPerDay: 12,
    },
    {
      days: 4,
      price: 1624,
      paymentMethod: 'Cash',
      vehicleType: 'Manual - Luxury',
      location: 'Testing for External purpose, Chennai',
      dates: [
        '03 May',
        '04 May',
        '05 May',
        '06 May',
        '07 May',
        '08 May',
        '09 May',
      ],
      times: [
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
        '10:00 AM',
      ],
      total: 1032,
      hoursPerDay: 12,
    },
  ];

  return (
    <ScrollView>
      {bookingDetails.map((booking, index) => (
        <BookingCard
          key={index}
          booking={booking}
          index={index}
          total={bookingDetails.length}
        />
      ))}
    </ScrollView>
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
    marginHorizontal:5
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
    color: 'red',
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
    justifyContent: 'space-between',
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
