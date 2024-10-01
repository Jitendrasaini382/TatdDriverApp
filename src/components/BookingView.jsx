import React, {useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../assets/Colors';
import {LeftArrow, RightArrow} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import Modal from 'react-native-modal';
import MyBookingAgencyModal from './modal/MyBookingAgencyModal';
import RoundTripBookingView from './bookingsView/RoundTripBookingView';
import PermanentBookingView from './bookingsView/PermanentBookingView';
import FlexibleBookingView from './bookingsView/FlexibleBookingView';
import {useDispatch} from 'react-redux';
import {setMyBookingAgencyModal} from '../redux/slices/trustedDriverSlice';
import {TokenConstextApi} from '../context/GlobalContext';
import {Buffer} from 'buffer';

const {width} = Dimensions.get('window');

const BookingView = () => {
  const dispatch = useDispatch();
  const {decodedToken, setDecodedToken, jwtToken} =
    useContext(TokenConstextApi);
  console.log(decodedToken, 'datatataatatattatatat');

  <Modal
    backdropOpacity={0}
    onBackdropPress={() => dispatch(setMyBookingAgencyModal(false))}
    animationIn={'fadeInDown'}
    animationOut={'fadeOutUp'}
    isVisible={true}>
    <MyBookingAgencyModal
    // setMyBookingAgencyModal={setMyBookingAgencyModal}
    />
  </Modal>;

  const handleLoginPress = () => {
    try {
      const encodedMobile = Buffer.from(
        decodedToken?.driver_mobile_number,
      ).toString('base64');
      const url = `https://www.tatd.in/agent-login.php?dologin=${encodedMobile}`;

      console.log('Generated URL:', url);
      Linking.openURL(url).catch(err => {
        // Alert.alert('An error occurred while opening the URL', err.message);
        console.error('Error opening URL:', err);
      });
    } catch (error) {
      console.error('Caught error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.connectContainer}>
        <Pressable
          // onPress={() => {
          //  dispatch( setMyBookingAgencyModal(true));
          // }}
          onPress={handleLoginPress}
          style={styles.connectButton}>
          <Icon color={AppColors.white} size={15} name="plus" />
          <Image style={styles.rightArrow} source={LeftArrow} />
        </Pressable>
        <Text style={styles.connectText}>
          Connect the driver to your network using this button and earn Rs 250.
        </Text>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Dear {decodedToken?.driver_name}, from now on, if you have completed
          at least one booking in the last two days and are available for
          bookings, you will receive an SMS alert when a new booking comes in.
        </Text>
      </View>
      {/* <FlexibleBookingView /> */}
      <RoundTripBookingView />
      {/* <PermanentBookingView /> */}
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
    fontSize: 15,
  },
  notificationContainer: {
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  notificationText: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
    fontSize: 15,
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
  },
  acceptButton: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: 10,
  },
  acceptButtonText: {
    color: AppColors.mainColor,
  },
});

export default BookingView;
