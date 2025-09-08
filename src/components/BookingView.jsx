import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors} from '../assets/Colors';
import {LeftArrow} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import RoundTripBookingView from './bookingsView/RoundTripBookingView';
import PermanentBookingView from './bookingsView/PermanentBookingView';
import FlexibleBookingView from './bookingsView/FlexibleBookingView';
import {useNavigation} from '@react-navigation/native';
import PermanentSubscriptionBookingView from './bookingsView/PermanentSubscriptionBookingView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
            <Image resizeMode='contain' resizeMethod='resize' style={styles.rightArrow} source={LeftArrow} />
          </Pressable>
          <Text style={styles.connectText}>{panelData}</Text>
        </View>
      )}

      {(data?.driver_panel_messages?.booking_score_message ||
        data?.driver_panel_messages?.double_booking_eligibility ||
        data?.driver_panel_messages?.outstation_eligibility_message ||
        data?.driver_panel_messages?.incident_error_message ||
        data?.driver_panel_messages?.outstanding_message) && (
        <View
          style={{
            margin: 5,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 8},
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            marginBottom: 10,
          }}>
          <View style={{padding: 10}}>
            {/* 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 */}
            {data?.driver_panel_messages?.booking_score_message && (
              <>
                <View
                  style={{
                    backgroundColor: '#e8f5e9',
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <Icon name="check-circle" size={18} color="#2e7d32" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#2e7d32',
                      marginLeft: 8,
                    }}>
                    {data?.driver_panel_messages?.booking_score_message_heading}
                  </Text>
                </View>

                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: AppColors.black,
                    }}>
                    {data?.driver_panel_messages?.booking_score_message}
                  </Text>
                </View>
              </>
            )}

            {/* 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 */}
            {data?.driver_panel_messages?.double_booking_eligibility && (
              <>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: AppColors.gray,
                    marginVertical: 8,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#e8f5e9',
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <FontAwesome5
                    name="calendar-check"
                    size={16}
                    color="#2e7d32"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#2e7d32',

                      marginLeft: 8,
                    }}>
                    {
                      data?.driver_panel_messages
                        ?.double_booking_eligibility_heading
                    }
                  </Text>
                </View>

                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: AppColors.black,
                    }}>
                    {data?.driver_panel_messages?.double_booking_eligibility}
                  </Text>
                </View>
              </>
            )}

            {/* 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 */}
            {data?.driver_panel_messages?.outstation_eligibility_message && (
              <>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: AppColors.gray,
                    marginVertical: 8,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#e8f5e9',
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <FontAwesome5 name="road" size={16} color="#2e7d32" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#2e7d32',
                      marginLeft: 8,
                    }}>
                    {
                      data?.driver_panel_messages
                        ?.outstation_eligibility_message_heading
                    }
                  </Text>
                </View>

                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: AppColors.black,
                    }}>
                    {
                      data?.driver_panel_messages
                        ?.outstation_eligibility_message
                    }
                  </Text>
                </View>
              </>
            )}

            {/* 4444444444444444444444444444444444444444444 */}
            {data?.driver_panel_messages?.incident_error_message && (
              <>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: AppColors.gray,
                    marginVertical: 8,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#e8f5e9',
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <Icon name="alert-circle" size={18} color="#e65100" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#c62828',
                      marginLeft: 8,
                    }}>
                    {
                      data?.driver_panel_messages
                        ?.incident_error_message_heading
                    }
                  </Text>
                </View>

                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: AppColors.black,
                    }}>
                    {data?.driver_panel_messages?.incident_error_message}
                  </Text>
                </View>
              </>
            )}

            {/* 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5  */}
            {data?.driver_panel_messages?.outstanding_message && (
              <>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: AppColors.gray,
                    marginVertical: 8,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#e8f5e9',
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <FontAwesome5
                    name="money-check-alt"
                    size={16}
                    color="#2e7d32"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#2e7d32',
                      marginLeft: 8,
                    }}>
                    {data?.driver_panel_messages?.outstanding_message_heading}
                  </Text>
                </View>

                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: AppColors.black,
                    }}>
                    {data?.driver_panel_messages?.outstanding_message}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}
      <RoundTripBookingView allBookingData={allBookingData} />
      <FlexibleBookingView />
      {/* <PermanentSubscriptionBookingView
        permanentSubscriptionBookingData={permanentSubscriptionBookingData}
      /> */}
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
    // resizeMode: 'center',
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

  notificationContainer: {
    margin: 10,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    color: '#0f2129',
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationText: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: width * 0.04,
    marginVertical: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: AppColors.gray,
    marginVertical: 8,
  },
});

export default BookingView;
