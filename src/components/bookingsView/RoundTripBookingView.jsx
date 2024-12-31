import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
// import Modal from 'react-native-modal';
import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';
import {ON_DEMAND_BOOKING} from '../../apis/Apis';
import {useSelector} from 'react-redux';

const TripCard = ({trip}) => {
  // console.log(trip, 'jjjjjjjjjjjj');
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>
          {trip.Btime} <Text style={{fontSize: 16}}>{trip.BDate}</Text>{' '}
          <Icon color={AppColors.white} name="car" size={17} />{' '}
          <Text style={styles.vehicleType}>
            {trip.vehicle_type} {trip.vehicle_model}
          </Text>
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // padding: 10,
          }}></View>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>
            {trip.way_type} - {trip.product_type}
          </Text>
          {/* {trip.addresses.map((address, index) => ( */}
          <View style={{flexDirection: 'row'}}>
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
            <Text style={styles.address}>{trip.pickup_address}</Text>
          </View>
          {trip.drop_address ? (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: 'black',
                  alignItems: 'flex-start',
                  top: 5,
                  left: 10,
                }}></View>
              <Text style={styles.address}>{trip.drop_address}</Text>
            </View>
          ) : (
            ''
          )}
          {/* ))} */}
        </View>
        <View style={styles.rightContent}>
          <View style={styles.paymentDetails}>
            {/* {console.log(trip.incentive_eligibility_fullfillment) } */}
            {trip.night_charge > 0 ? (
              <View style={[styles.incentiveBox, {backgroundColor: '#FF8C00'}]}>
                <Text style={[styles.incentiveText, {color: AppColors.white}]}>
                  + ₹ {trip.night_charge} Night Charge
                </Text>
              </View>
            ) : null}
            {trip.surge > 0 ? (
              <View
                style={[
                  styles.incentiveBox,
                  {backgroundColor: AppColors.orange},
                ]}>
                <Text style={[styles.incentiveText, {color: AppColors.white}]}>
                  + ₹ {trip.surge} Surge
                </Text>
              </View>
            ) : null}
            {trip.chauffeur_service > 0 ? (
              <View
                style={[
                  styles.incentiveBox,
                  {backgroundColor: AppColors.orange},
                ]}>
                <Text style={[styles.incentiveText, {color: AppColors.white}]}>
                  + ₹ {trip.chauffeur_service} Chauffeur Service
                </Text>
              </View>
            ) : null}
            {trip.washing_service > 0 ? (
              <View
                style={[
                  styles.incentiveBox,
                  {backgroundColor: AppColors.orange},
                ]}>
                <Text style={[styles.incentiveText, {color: AppColors.white}]}>
                  + ₹ {trip.washing_service} Washing Service
                </Text>
              </View>
            ) : null}
            {trip.incentive > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive}
                </Text>
              </View>
            ) : null}
            {trip.incentive_eligibility_fullfillment > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive_eligibility_fullfillment}
                </Text>
              </View>
            ) : null}

            {trip.incentive_eligible_amount_fullfillment > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive_eligible_amount_fullfillment}
                </Text>
              </View>
            ) : null}

            <View style={{marginRight: 5}}>
              <Text style={styles.price}>₹ {trip.bugdet_price}</Text>
              <Text style={styles.package}>
                Package - {trip.package_detail}
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
          {/* <Modal
            backdropOpacity={.6}
            onBackdropPress={() => setOpenModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={openModal}>
            <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
          </Modal> */}
        </View>
      </View>
    </View>
  );
};

const RoundTripBookingView = () => {
  const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
  const [incityRoundTripBooking, setIncityRoundTripBooking] = useState([]);
  const [onDemandOutstationBooking, setOnDemandOutstationBooking] = useState(
    [],
  );

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const getIncityOneWayBookings = async data => {
    console.log(data, 'runnnnnnnnnnn');

    try {
      const response = await ON_DEMAND_BOOKING(data);

      // console.log(
      //   response,
      //   'getIncityOneWayBookings response',
      // );
      setIncityOneWayBooking(response.incity_one_way_bookings);
    } catch (error) {
      console.log(error, 'incity_OneWay_bookings  Error');
    }
  };
  const getOnDemandOutstationBookings = async data => {
    console.log(data, 'runnnnnnnnnnn');

    try {
      const response = await ON_DEMAND_BOOKING(data);

      // console.log(response, 'getOnDemandOutstationBookings response');
      setOnDemandOutstationBooking(response.ondemand_outstation_bookings);
    } catch (error) {
      console.log(error, 'ondemand_outstation_bookings  Error');
    }
  };

  const getIncityRoundTripBookings = async data => {
    console.log(data, 'runnnnnnnnnnn');

    try {
      const response = await ON_DEMAND_BOOKING(data);

      // console.log(
      //   response,
      //  'getIncityRoundTripBookings response',
      // );
      setIncityRoundTripBooking(response.incity_roundtrip_bookings);
    } catch (error) {
      console.log(error, 'incity_roundtrip_bookings  Error');
    }
  };

  useEffect(() => {
    getOnDemandOutstationBookings({
      action: 'ondemand_outstation_bookings',
    });
    getIncityRoundTripBookings({
      action: 'incity_roundtrip_booking',
    });
    getIncityOneWayBookings({
      action: 'incity_oneway_booking',
    });
  }, [languageSwitch]);

  return (
    <>
      {incityOneWayBooking &&
        incityOneWayBooking.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      {incityRoundTripBooking &&
        incityRoundTripBooking.map((e, index) => (
          <TripCard key={index} trip={e} />
        ))}
      {onDemandOutstationBooking &&
        onDemandOutstationBooking.map((x, index) => (
          <TripCard key={index} trip={x} />
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    color: AppColors.white,
    marginRight: 10,
  },
  vehicleType: {
    fontSize: 18,
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
    backgroundColor: AppColors.red,
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
    minWidth: 80,
  },
});

export default RoundTripBookingView;
