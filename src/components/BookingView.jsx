import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../assets/Colors';
import {LeftArrow} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import RoundTripBookingView from './bookingsView/RoundTripBookingView';
import PermanentBookingView from './bookingsView/PermanentBookingView';
import FlexibleBookingView from './bookingsView/FlexibleBookingView';
import {useNavigation} from '@react-navigation/native';
import PermanentSubscriptionBookingView from './bookingsView/PermanentSubscriptionBookingView';

const {width} = Dimensions.get('window');

const BookingView = ({
  data,
  allBookingData,
  panelData,
  permanentSubscriptionBookingData,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {panelData && (
        <View style={styles.connectContainer}>
          <Pressable
            onPress={() => navigation.navigate('AgentPanel')}
            style={styles.connectButton}>
            <Icon color={AppColors.white} size={15} name="plus" />
            <Image style={styles.rightArrow} source={LeftArrow} />
          </Pressable>
          <Text style={styles.connectText}>{panelData}</Text>
        </View>
      )}

      <View style={styles.notificationContainer}>
        {data?.driver_panel_messages?.booking_score_message && (
          <Text style={[styles.notificationText, {color: 'green'}]}>
            {data?.driver_panel_messages?.booking_score_message}
          </Text>
        )}
        {data?.driver_panel_messages?.double_booking_eligibility && (
          <Text style={styles.notificationText}>
            {data?.driver_panel_messages?.double_booking_eligibility}
          </Text>
        )}

        {data?.driver_panel_messages?.incident_error_message && (
          <Text style={styles.notificationText}>
            {data?.driver_panel_messages?.incident_error_message}
          </Text>
        )}
        {data?.driver_panel_messages?.outstanding_message && (
          <Text style={styles.notificationText}>
            {data?.driver_panel_messages?.outstanding_message}
          </Text>
        )}
        {data?.driver_panel_messages?.outstation_eligibility_message && (
          <Text style={styles.notificationText}>
            {data?.driver_panel_messages?.outstation_eligibility_message}
          </Text>
        )}
      </View>

      <RoundTripBookingView allBookingData={allBookingData} />
      <FlexibleBookingView />
      <PermanentSubscriptionBookingView
        permanentSubscriptionBookingData={permanentSubscriptionBookingData}
      />
      <PermanentBookingView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  connectContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  connectButton: {
    backgroundColor: AppColors.mainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: width * 0.2,
  },
  rightArrow: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  connectText: {
    color: AppColors.black,
    flex: 1,
    paddingLeft: 15,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: AppFont.regularFont,
    fontWeight: '700',
    fontSize: width * 0.038,
  },
  notificationContainer: {
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  notificationText: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: width * 0.04,

    marginVertical: 5,
  },
  bookingContainer: {
    marginTop: 20,
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 15,
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
  eventText: {
    color: AppColors.white,
    fontSize: 15,
    marginRight: 10,
  },
});

export default BookingView;
