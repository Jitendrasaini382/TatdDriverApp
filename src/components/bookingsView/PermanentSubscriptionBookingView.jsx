import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import {FlatList} from 'react-native';
import PermanentSubscrptionBookingAcceptPopup from '../modal/PermanentSubscrptionBookingAcceptPopup';
const {width} = Dimensions.get('window');

const TripCard = ({trip}) => {
  const [openModal, setOpenModal] = useState(false);

  if (!trip || trip?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Private Driver</Text>
          <View style={styles.carInfo}>
            <Icon color="white" name="car" size={17} />
            <Text style={styles.carText}>{trip?.car}</Text>
          </View>
        </View>

        <Text style={styles.price}>
          ₹ {trip?.salary}
          <Text style={styles.duration}>
            {' '}
            {trip?.working_days} Days | {trip?.working_hours} Hours
          </Text>
        </Text>

        <Text style={styles.address}>{trip?.customer_address} </Text>

        <View style={styles.footer}>
          {/* <Text style={styles.joining}>
            Joining <Text style={styles.boldText}>As soon as possible</Text>
          </Text> */}
          <TouchableOpacity
            onPress={() => setOpenModal(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenModal(false)}
        visible={openModal}>
        <PermanentSubscrptionBookingAcceptPopup
          setOpenModal={setOpenModal}
          trip={trip}
        />
      </Modal>
    </View>
  );
};

const PermanentSubscriptionBookingView = ({
  permanentSubscriptionBookingData,
}) => {
  if (
    !permanentSubscriptionBookingData ||
    permanentSubscriptionBookingData?.length === 0
  ) {
    return null;
  }

  return (
    <FlatList
      data={permanentSubscriptionBookingData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <TripCard trip={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: width * 0.9,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    color: AppColors.white,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carText: {
    fontSize: 16,
    color: AppColors.white,
    marginLeft: 6,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.white,
    marginVertical: 10,
  },
  duration: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  address: {
    fontSize: 14,
    color: AppColors.white,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  joining: {
    fontSize: 14,
    color: AppColors.white,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: AppColors.mainColor,
    fontWeight: 'bold',
  },
});

export default PermanentSubscriptionBookingView;
