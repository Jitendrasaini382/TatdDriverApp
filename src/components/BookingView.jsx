import React, {useContext, useEffect, useState} from 'react';
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
import {ON_DEMAND_BOOKING} from '../apis/Apis';

const {width} = Dimensions.get('window');

const BookingView = () => {
  const dispatch = useDispatch();
  const {decodedToken, setDecodedToken, jwtToken, languageSwitch} =
    useContext(TokenConstextApi);
  // console.log(decodedToken, 'datatataatatattatatat');

  const [agentPanelViewData, setAgentPanelViewData] = useState([]);

  useEffect(() => {
    getAgentPanelView();
  }, [languageSwitch]);

  // <Modal
  //   backdropOpacity={0}
  //   onBackdropPress={() => dispatch(setMyBookingAgencyModal(false))}
  //   animationIn={'fadeInDown'}
  //   animationOut={'fadeOutUp'}
  //   isVisible={true}>
  //   <MyBookingAgencyModal
  //   // setMyBookingAgencyModal={setMyBookingAgencyModal}
  //   />
  // </Modal>;

  const getAgentPanelView = async () => {
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'agent_panel_view',
        current_language: languageSwitch,
      });

      console.log(response, 'getIagent Panel View response');
      setAgentPanelViewData(response.agent_panel_text);
    } catch (error) {
      console.log(error, 'getIagent Panel View  Error');
    }
  };

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
          {/* Connect the driver to your network using this button and earn Rs 250. */}
          {agentPanelViewData}
        </Text>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          {languageSwitch == 'english'
            ? `Dear ${decodedToken?.driver_name}, from now on, if you have completed at least one booking in the last two days and are available for bookings, you will receive an SMS alert when a new booking comes in.`
            : `डिअर ${decodedToken?.driver_name},अब से यदि आपने पिछले दो दिनों में कम से कम एक बुकिंग पूरी की है, और आप बुकिंग करने के लिए उपलब्ध हैं, तो नई बुकिंग आने पर आपको SMS Alert भेजा जाएगा।`}
        </Text>
      </View>
      <RoundTripBookingView />
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
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 10,
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
