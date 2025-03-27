import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';
import {FlatList} from 'react-native';
import { Clipboard } from 'react-native';

const TripCard = ({trip}) => {
  const [openModal, setOpenModal] = useState(false);

  if (!trip || trip?.length === 0) {
    return null;
  }

  const copyToClipboard = data => {
    Clipboard.setString(data);
    Alert.alert('Copied Successfully', `${data}`);
  };

  return (
    <View style={{flexDirection: 'column', marginBottom: 10}}>
      <View
        style={{
          justifyContent:
            trip?.payment_mode !== 'Cash' && trip?.night_charge > 0
              ? 'space-between'
              : 'flex-end',
          flexDirection: 'row',
        }}>
        {trip?.payment_mode !== 'Cash' && (
          <View
            style={[
              {
                padding: 8,
                borderRadius: 5,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                marginHorizontal: 5,
                alignSelf: 'flex-start',
                backgroundColor: AppColors.mainColor,
              },
            ]}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: 12,
              }}>
              {trip?.payment_mode}
            </Text>
          </View>
        )}

        {trip?.night_charge > 0 ? (
          <View
            style={[
              {
                padding: 8,
                borderRadius: 5,
                borderBottomRightRadius: 0,
                marginHorizontal: 5,
                alignSelf: 'flex-end',
                backgroundColor: '#FF8C00',
              },
            ]}>
            <Text style={[styles.incentiveText, {color: AppColors.white}]}>
              + ₹ {trip?.night_charge} Night Charge
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.time}>
            {trip?.Btime} <Text style={{fontSize: 16}}>{trip?.BDate}</Text>{' '}
            <Icon color={AppColors.white} name="car" size={17} />{' '}
            <Text style={styles.vehicleType}>
              {trip?.vehicle_type} {trip?.vehicle_model}
            </Text>
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}></View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>
              {trip?.way_type} - {trip?.product_type}
            </Text>
            <Pressable
              onPress={() => copyToClipboard(trip?.pickup_address)}
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: '#0dc53d',
                  alignItems: 'flex-start',
                  top: 5,
                  left: 10,
                }}></View>
              <Text style={styles.address}>{trip?.pickup_address}</Text>
            </Pressable>
            {trip?.drop_address && (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: AppColors.black,
                    alignItems: 'flex-start',
                    top: 5,
                    left: 10,
                  }}></View>
                <Text style={styles.address}>{trip?.drop_address}</Text>
              </View>
            )}
          </View>

          <View style={styles.rightContent}>
            <View style={styles.paymentDetails}>
              {trip?.surge > 0 ? (
                <View style={[styles.incentiveBox]}>
                  <Text
                    style={[styles.incentiveText, {color: AppColors.white}]}>
                    + ₹ {trip?.surge} Surge
                  </Text>
                </View>
              ) : null}
              {trip?.chauffeur_service > 0 ? (
                <View
                  style={[
                    styles.incentiveBox,
                    {backgroundColor: AppColors.orange},
                  ]}>
                  <Text
                    style={[styles.incentiveText, {color: AppColors.white}]}>
                    + ₹ {trip?.chauffeur_service} Chauffeur Service
                  </Text>
                </View>
              ) : null}
              {trip?.washing_service > 0 ? (
                <View
                  style={[
                    styles.incentiveBox,
                    {backgroundColor: AppColors.orange},
                  ]}>
                  <Text
                    style={[styles.incentiveText, {color: AppColors.white}]}>
                    + ₹ {trip?.washing_service} Washing Service
                  </Text>
                </View>
              ) : null}
              {trip?.incentive > 0 ? (
                <View style={styles.incentiveBox}>
                  <Text style={styles.incentiveText}>
                    + Incentive ₹ {trip?.incentive}
                  </Text>
                </View>
              ) : trip?.incentive_eligibility_fullfillment == '1' &&
                trip?.incentive_eligible_amount_fullfillment > 0 ? (
                <View style={styles.incentiveBox}>
                  <Text style={styles.incentiveText}>
                    + Incentive ₹ {trip?.incentive_eligible_amount_fullfillment}
                  </Text>
                </View>
              ) : null}

              <View style={{marginRight: 5}}>
                <Text style={styles.price}>₹ {trip?.bugdet_price}</Text>
                <Text style={styles.package}>
                  Package - {trip?.package_detail}
                </Text>
                <Text>{'\n'}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
              style={styles.acceptButton}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={false}
              onRequestClose={() => setOpenModal(false)}
              visible={openModal}>
              <RoundTripBookingAceeptModal
                setOpenModal={setOpenModal}
                trip={trip}
              />
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
};

const RoundTripBookingView = ({allBookingData}) => {
  const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
  const [incityRoundTripBooking, setIncityRoundTripBooking] = useState([]);
  const [onDemandOutstationBooking, setOnDemandOutstationBooking] = useState(
    [],
  );

  useEffect(() => {
    if (allBookingData) {
      setIncityOneWayBooking(allBookingData?.incity_one_way_bookings || []);
      setIncityRoundTripBooking(
        allBookingData?.incity_roundtrip_bookings || [],
      );
      setOnDemandOutstationBooking(
        allBookingData?.ondemand_outstation_bookings || [],
      );
    }
  }, [allBookingData]);

  const allTrips = [
    ...(incityOneWayBooking || []),
    ...(incityRoundTripBooking || []),
    ...(onDemandOutstationBooking || []),
  ];

  return (
    <FlatList
      data={allTrips}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <TripCard trip={item} />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 17,
    color: AppColors.white,
    marginRight: 10,
  },
  vehicleType: {
    fontSize: 16,
    color: AppColors.white,
    marginLeft: 6,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 0.6,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: AppColors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
    color: AppColors.mainColor,
    fontFamily: 'Roboto',
  },
  address: {
    fontSize: 14,
    color: '#444',
    marginLeft: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    flex: 1,
  },
  acceptText: {
    color: AppColors.mainColor,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  rightContent: {
    flex: 0.4,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  paymentDetails: {
    alignSelf: 'flex-end',
  },
  incentiveBox: {
    backgroundColor: '#2076bd',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  incentiveText: {
    color: AppColors.white,
    fontSize: 12,
  },
  package: {
    fontSize: 12,
    color: AppColors.white,
    marginBottom: 5,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    color: AppColors.white,
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: AppColors.white,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
});

export default RoundTripBookingView;
