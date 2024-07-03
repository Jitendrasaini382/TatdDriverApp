import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ArrowFadeBlue} from '../../assets/images';

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
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.days}>{bookingDetails.days} Days</Text>
        <Text style={styles.price}>
          Rs {bookingDetails.price} | {bookingDetails.paymentMethod}
        </Text>
        <View style={styles.vehicleType}>
          <Image style={styles.carIcon} source={ArrowFadeBlue} />
          <Text style={styles.vehicleText}>{bookingDetails.vehicleType}</Text>
        </View>
      </View>
      <Text style={styles.title}>{bookingDetails.location}</Text>
      <View style={styles.dates}>
        {bookingDetails.dates.map((date, index) => (
          <Text key={index} style={styles.dateText}>
            {date} |
          </Text>
        ))}
      </View>
      <View style={styles.times}>
        {bookingDetails.times.map((time, index) => (
          <Text key={index} style={styles.timeText}>
            {time}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {' '}
          <Text style={{fontSize: 20}}>Rs{bookingDetails.total} </Text>{' '}
          {bookingDetails.hoursPerDay} Hours/day
        </Text>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#16588e',
    // margin: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  days: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
  },
  vehicleType: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
  carIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  vehicleText: {
    color: 'black',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: 'black',
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
    // fontSize: 20
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
});

export default FlexibleBookingView;
