import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import ClearMyDuePaymentModal from './modal/ClearMyDuePaymentModal';
import {AppColors} from '../assets/Colors';

const ClearMyDue = () => {
  const [myDuePaymentModal, setMyDuePaymentModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const dummyData = [
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
      gst : '20'
    },
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
      gst : '40'

    },
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
      gst : '90'

    },
  ];

  const totalAmount = dummyData.reduce(
    (sum, item) => sum + Math.abs(parseInt(item.amount)),
    0,
  );

  const handleEyePress = trip => {
    setSelectedTrip(trip);
    setMyDuePaymentModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Clear My Due</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Booking Id</Text>
          <Text style={[styles.headerText, styles.borderLeft]}>
            Schedule Date
          </Text>
          <Text style={[styles.headerText, styles.borderLeft]}>Status</Text>
          <Text style={[styles.headerText, styles.borderLeft]}>Amount</Text>
        </View>
        <ScrollView>
          {dummyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.bookingIdCell}>
                <Text style={styles.cellText}>{item.bookingId}</Text>
                <TouchableOpacity onPress={() => handleEyePress(item)}>
                  <Icon name="eye" size={18} color={AppColors.mainColor} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.scheduleDate}
              </Text>
              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.status}
              </Text>
              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Modal
        backdropOpacity={0}
        onBackdropPress={() => setMyDuePaymentModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={myDuePaymentModal}>
        <ClearMyDuePaymentModal
          setMyDuePaymentModal={setMyDuePaymentModal}
          tripDetails={selectedTrip}
        />
      </Modal>
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert('Loading Payment Page...')}
        style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay ₹ 927</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    // elevation: 5,
    shadowColor: '#ccc',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainView: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    color: AppColors.black,
    fontWeight: '700',
    fontSize: 21,
    fontFamily: 'Roboto-Regular',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#16588e',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bookingIdCell: {
    // flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  cellText: {
    flex: 1,
    color: AppColors.black,
    textAlign: 'center',
    padding: 10,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },
  payButton: {
    backgroundColor: '#16588e',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ClearMyDue;

