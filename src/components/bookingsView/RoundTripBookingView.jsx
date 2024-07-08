import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import Modal from 'react-native-modal';
import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';

const TripCard = ({trip}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>
          {trip.time} <Text style={{fontSize: 15}}>{trip.date}</Text>
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Icon color={AppColors.white} name="car" />
          <Text style={styles.vehicleType}>{trip.vehicleType}</Text>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>{trip.title}</Text>
          {trip.addresses.map((address, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: index === 0 ? '#0dc53d' : AppColors.black,
                  alignItems: 'flex-start',
                  top: 5,
                  left: 10,
                }}></View>
              <Text style={styles.address}>{address}</Text>
            </View>
          ))}
        </View>
        <View style={styles.rightContent}>
          <View style={styles.paymentDetails}>
            {trip.incentive && (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive}
                </Text>
              </View>
            )}

            <Text style={styles.price}>₹ {trip.price}</Text>
            <Text style={styles.package}>{trip.package}</Text>
            <Text>{'\n'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setOpenModal(true)}
            style={styles.acceptButton}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <Modal
            backdropOpacity={0}
            onBackdropPress={() => setOpenModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={openModal}>
            <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const dummyData = [
  {
    time: '07:00 AM',
    date: '28 Jun, 2024',
    vehicleType: 'Manual-Standard',
    title: 'Round Trip - Incity',
    addresses: [
      '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
    ],
    price: '943',
    package: 'Package-8 Hours',
    incentive: '100',
  },
  {
    time: '09:00 AM',
    date: '31 Jun, 2024',
    vehicleType: 'Manual-Luxury',
    title: 'Round Trip - Incity',
    addresses: ['Main Road\nBengaluru, Karnataka ,\nBangalore', 'alwar, alwar'],
    price: '943',
    package: 'Package-8 Hours',
  },
  {
    time: '09:00 AM',
    date: '31 Jun, 2024',
    vehicleType: 'Manual-Luxury',
    title: 'Round Trip - Incity',
    addresses: [
      'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
      'Platinum District , Alwar',
    ],
    price: '9003',
    package: 'Package-5 Hours',
    incentive: '500',
  },
];

const RoundTripBookingView = () => {
  return (
    <ScrollView>
      {dummyData.map((trip, index) => (
        <TripCard key={index} trip={trip} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16588e',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  vehicleType: {
    fontSize: 14,
    color: 'white',
    marginLeft: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 0.7,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
    color: '#16588e',
    fontFamily: 'Roboto',
  },
  address: {
    fontSize: 14,
    color: '#444',
    marginLeft: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  acceptText: {
    color: '#16588e',
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  //
  rightContent: {
    flex: 0.4,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  paymentDetails: {
    alignItems: 'center',
  },
  incentiveBox: {
    backgroundColor: '#2076bd',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  incentiveText: {
    color: 'white',
    fontSize: 12,
  },
  package: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    color: 'white',
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
});

export default RoundTripBookingView;
