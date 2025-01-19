import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
} from 'react-native';
// import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import {Address, CallingGif, Mask} from '../assets/images';
import {AppColors} from '../assets/Colors';
import SwipeableButton from '../components/SwipeableButton';
import RadioButton from '../components/CustomRadioButton';
import PackageDetailsDutyReportUpdate from '../components/modal/PackageDetailsDutyReportUpdate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  CHECK_IS_BOOKING_IS_UPCOMMING,
  CUSTOMER_NOT_PICKUP_PHONE,
  CUSTOMER_WANT_TO_CANCEL,
  DRIVE_END,
  DRIVE_START,
  DRIVER_BOOKING_REACH,
  DRIVER_ON_THE_WAY,
  DUTY_REPORT_BOOKING_ACCEPT,
  DUTY_REPORT_RESEND_OTP,
  DUTY_REPORT_TRIP_STATUS_POPUP_VIEW,
  GET_BOOKING_INFO,
  GET_FIRST_POPUP_DATA,
  PACKAGE_DETAILS_DUTY_REPORT,
  TALK_TO_CUSTOMER,
} from '../apis/Apis';
import {useSelector} from 'react-redux';
import {AppFont} from '../assets/FontsFamily';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';

const DutyReportUpdate = ({route, navigation}) => {
  const {
    bookingNumber,
    // tripStatus,
    state,
  } = route?.params;
  const isFirstTimeVisit = route?.params?.isFirstTime;
  const isType = route?.params?.isType;
  console.log(bookingNumber, 'bookingggg');
  // console.log(tripStatus, 'trip status');

  const [cancel, setCancel] = useState(false);
  const [completeBooking, setCompleteBooking] = useState(false);
  const [modalVisibleOntheway, setModalVisibleOntheway] = useState(false);
  const [loaderOntheWay, setLoaderOntheWay] = useState(false);
  const [modalVisibleRich, setModalVisibleRich] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputKmsValue, setInputKmsValue] = useState('');
  const [inputEndKmsValue, setInputEndKmsValue] = useState('');
  const [modalVisibleinput, setModalVisibleinput] = useState(false);
  const [modalVisibleonTimeRich, setModalVisibleonTimeRich] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [modalVisibleEnd, setModalVisibleEnd] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setLoader] = useState(false);
  const [reachLoader, setReachLoader] = useState(false);
  const [loaderResendOtp, setLoaderResendOtp] = useState(false);
  const [endModalLoader, setEndModalLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [firstTimePopup, setfirstTimePopup] = useState(false);
  const [firstTimePopupData, setfirstTimePopupData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  console.log(bookingNumber, languageSwitch, 'radio button Booking');

  const talkToCustomer = async () => {
    setLoader(true);
    try {
      const response = await TALK_TO_CUSTOMER({
        action: 'confirm_booking',
        booking_number: bookingNumber,
      });
      console.log(
        response,
        'talkToCustomertalkToCustomertalkToCustomer API response ',
      );
      GetAllBookingInfo();
      console.log(response, 'talk to customer Api response');
    } catch (error) {
      setLoader(false);

      console.log(error.message, 'talk to customer Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const notPickupPhoneCustomer = async () => {
    setLoader(true);
    try {
      const response = await CUSTOMER_NOT_PICKUP_PHONE({
        action: 'duty_report_send_sms',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        sub_status: 'Not Picking Call',
      });

      console.log(
        response,
        ' notPickupPhoneCustomernotPickupPhoneCustomernotPickupPhoneCustomer response ',
      );
      GetAllBookingInfo();
      if (response?.msg_type == 'error') {
        // Alert.alert(response?.message);
        Alert.alert(
          'Success',
          response?.message || 'No message available', // Full message content with a fallback
          [{text: 'OK'}], // Action buttons
        );
      } else {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: response?.message,
        });
        // GetAllBookingInfo();
        console.log(response, 'talk to customer Api response');
      }
    } catch (error) {
      console.log(error, 'talk to customer Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      GetAllBookingInfo();
    } catch (error) {
      console.log('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const customerWantToCancel = async () => {
    setLoader(true);
    try {
      const response = await CUSTOMER_WANT_TO_CANCEL({
        action: 'duty_report_send_cancel_sms',
        booking_id: bookingNumber,
        sub_status: 'Cancel Booking',
        current_language: languageSwitch,
      });
      console.log(
        response,
        ' customerWantToCancelcustomerWantToCancelcustomerWantToCancelcustomerWantToCancel response ',
      );

      GetAllBookingInfo();
      if (response?.msg_type == 'error') {
        // Alert.alert(response?.message);
        Alert.alert(
          'Success',
          response?.message || 'No message available', // Full message content with a fallback
          [{text: 'OK'}], // Action buttons
        );
        // Toast.show({
        //   type: 'error',
        //   text1: response?.message,
        //   text1Style: {
        //     flexWrap: 'wrap', // Ensures the text wraps
        //     textAlign: 'left', // Align text for better readability
        //     fontSize: 14,
        //   },
        //   // text2:response?.message
        // });
      }
      console.log(response, 'talk to customer Api response');
    } catch (error) {
      console.log(error.message, 'talk to customder Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  // Function to handle selection
  const handleSelect = id => {
    setSelectedOption(id);

    // Call the appropriate function based on the selected option
    switch (id) {
      case 1:
        // handleOption1();
        talkToCustomer();
        break;
      case 2:
        notPickupPhoneCustomer();
        break;
      case 3:
        customerWantToCancel();
        break;
      default:
        console.log('Invalid option selected');
    }
  };
  // const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );

  const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
    useState(false);

  const [bookingInfo, setbookingInfo] = useState({});
  const handleSwipe = () => {
    // setModalVisibleRich(true);
    // setModalVisibleinput(true);
    // return false

    // return false;
    if (bookingInfo?.condition?.next_booking_status_name == 'Accept') {
      setacceptBookingPopup(true);
    } else if (
      bookingInfo?.condition?.next_booking_status_name == 'On The Way'
    ) {
      setModalVisibleOntheway(true);
    } else if (bookingInfo?.condition?.next_booking_status_name == 'Reach') {
      setModalVisibleRich(true);
    } else if (bookingInfo?.condition?.next_booking_status_name == 'Start') {
      setModalVisibleinput(true);
    } else if (bookingInfo?.condition?.next_booking_status_name == 'End') {
      setModalVisibleEnd(true);
      // return false;
    }
    // setModalVisibleOntheway(true);
  };

  const openPhoneDialer = phoneNumber => {
    // const phoneNumber = '9810360792';
    let url = `tel:${phoneNumber}`;

    Linking.openURL(url)
      .then(() => console.log('Phone dialer opened successfully'))
      .catch(err => {
        console.error('Error opening phone dialer:', err);
      });
  };

  const closeModal = () => {
    setModalVisibleOntheway(false);
  };

  useEffect(() => {
    if (state !== 'cancel') {
      setMainLoader(true);
      GetAllBookingInfo();
    }
  }, []);

  const GetAllBookingInfo = async () => {
    try {
      const response = await GET_BOOKING_INFO({
        action: 'duty_report_booking_info',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        // trip_status: 0,
      });

      console.log(
        {
          action: 'duty_report_booking_info',
          booking_id: bookingNumber,
          current_language: languageSwitch,
          // trip_status: tripStatus,
        },
        'send action',
      );

      setbookingInfo(response?.duty_report_booking_info);
      const statusId =
        response?.duty_report_booking_info?.condition?.next_booking_status_id;
      // if (statusId == '15') {
      if (statusId != '') dutyReportTripStatusPopup(statusId);
      console.log(
        statusId,
        'statusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusIdstatusId',
      );

      // }
      // console.log(
      // response?.duty_report_booking_info,
      // 'GetAllBookingInfo success',
      // );
      console.log(
        response?.duty_report_booking_info,
        'GetAllBookingInfo Api response',
      );
    } catch (error) {
      console.log(error, 'GetAllBookingInfo Api error - Error');
    } finally {
      setMainLoader(false);
    }
  };
  useEffect(() => {
    packageDetails();
  }, []);
  const [packageDetailsData, setPackageDetailsData] = useState({});

  const packageDetails = async () => {
    setLoader(true);
    try {
      const response = await PACKAGE_DETAILS_DUTY_REPORT({
        booking_number: bookingNumber,
      });

      console.log(response, 'packageDetails Api response');
      setPackageDetailsData(response);
    } catch (error) {
      setLoader(false);

      console.log(error.message, 'packageDetails Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const dutyReportBookingAccept = async () => {
    setLoader(true);
    try {
      const response = await DUTY_REPORT_BOOKING_ACCEPT({
        action: 'duty_report_booking_accept',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        // trip_status: "10"
      });

      if (response?.redirect?.redirect == 'duty_report') {
        GetAllBookingInfo();
        setacceptBookingPopup(false);
      }

      GetAllBookingInfo();
      console.log(response, 'dutyReportBookingAccept Api response');
      setacceptBookingPopup(false);
    } catch (error) {
      console.log(error, 'dutyReportBookingAccept Api error - General Error');
      GetAllBookingInfo();
      setacceptBookingPopup(false);
      // Toast.show('Success')
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: error?.popupdata?.success_message,
      });
    } finally {
      setLoader(false);
    }
  };
  const [popupsData, setpopupsData] = useState({});

  const dutyReportTripStatusPopup = async statusId => {
    setLoader(true);
    try {
      const response = await DUTY_REPORT_TRIP_STATUS_POPUP_VIEW({
        action: 'duty_report_trip_status_popup_view',
        booking_id: bookingNumber,
        booking_status_id: statusId,
        current_language: languageSwitch,
      });
      setpopupsData(response);

      console.log(response, 'dutyReportTripStatusPopup Api response');
    } catch (error) {
      console.log(error, 'dutyReportTripStatusPopup Api error - General Error');
    } finally {
      setLoader(false);
    }
  };
  const [isBookingApiErrPopup, setisBookingApiErrPopup] = useState(false);
  const [isBookingApiPopupMsge, setisBookingApiPopupMsge] = useState(null);
  const isBookingUpcomming = async () => {
    setLoaderOntheWay(true);
    try {
      const res = await CHECK_IS_BOOKING_IS_UPCOMMING({
        action: 'check_future_booking',
        booking_id: bookingNumber,
        current_language: languageSwitch,
      });

      if (res?.upcoming_booking_data?.upcoming_booking_eligibility == 1) {
        // Alert.alert(res?.upcoming_booking_data?.upcoming_booking_error_msg);
        setisBookingApiErrPopup(true);
        setModalVisibleOntheway(false);
        setisBookingApiPopupMsge(
          res?.upcoming_booking_data?.upcoming_booking_error_msg,
        );
        return false;
      } else {
        // dutyReportTripStatusPopup(20);
        driverOnTheWay();
      }
      console.log(res, 'isBookingChkApi Responseeeeeeeeeeeeeeeeeeee');
    } catch (err) {
      console.log(err, 'isBookingUpcommingApiErrrrrrrr');
      driverOnTheWay();
      setLoaderOntheWay(false);
    } finally {
      setLoaderOntheWay(false);
    }
  };
  const driverOnTheWay = async () => {
    // console.log(
    // {
    // action: 'duty_report_booking_ontheway',
    // booking_id: bookingNumber,
    // current_language: languageSwitch,
    // trip_status: bookingInfo?.condition?.next_booking_status_id,
    // },
    // 'on the way body data',
    // );
    // return false
    try {
      const onTheWayApi = await DRIVER_ON_THE_WAY({
        action: 'duty_report_booking_ontheway',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
      });

      // console.log({
      // action: 'duty_report_booking_ontheway',
      // booking_id: bookingNumber,
      // current_language: languageSwitch,
      // trip_status: bookingInfo?.condition?.next_booking_status_id,
      // }," send on the way action");

      console.log(
        onTheWayApi,
        'onTheWayApi Responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ',
      );
      GetAllBookingInfo();
      setModalVisibleOntheway(false);

      // setModalVisibleRich(true);
    } catch (err) {
      console.log(
        err,
        'onTheWayApi Response errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      );
    }
  };

  const driverBookingReach = async () => {
    setReachLoader(true);
    try {
      const res = await DRIVER_BOOKING_REACH({
        action: 'duty_report_booking_reach',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        // trip_status: 20,
      });
      if (res?.redirect?.redirect == 'duty_report') {
        GetAllBookingInfo();
        setModalVisibleRich(false);
      }
      console.log(res, 'duty_report_booking_reach Responseeeeee');
      setModalVisibleRich(false);
      // setModalVisibleinput(true);
      GetAllBookingInfo();
    } catch (err) {
      console.log(err, 'duty_report_booking_reach Errrrrrrrrrrrrrrrr');
    } finally {
      setReachLoader(false);
    }
  };
  const [acceptBookingPopup, setacceptBookingPopup] = useState(false);

  const driverReached = async () => {
    setLoader(true);
    Keyboard.dismiss();
    console.log(
      {
        action: 'duty_report_booking_start',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        start_kms: inputKmsValue,
        otp: inputValue,
      },
      'send action by kms apiiiiiiiiiiiiiiiiiiiiiiiiiiii',
    );

    try {
      const res = await DRIVE_START({
        action: 'duty_report_booking_start',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        start_kms: inputKmsValue,
        otp: inputValue,
      });
      console.log(res, 'OTPRESPO');
      // return false
      if (res?.redirect?.redirect == 'duty_report') {
        GetAllBookingInfo();
        setModalVisibleinput(false);
      }
      if (
        res?.start_booking_message &&
        Object.keys(res?.start_booking_message).length !== 0
      ) {
        setModalVisibleinput(false);
        // setModalVisibleEnd(true);
        GetAllBookingInfo();
      } else {
        const msge = res?.otp_error_message;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: msge?.otp_error_message,
        });
      }
      console.log(res, 'duty_report_booking_reach api response');
    } catch (err) {
      console.log(err, 'duty_report_booking_reach api ERrrrr');
    } finally {
      setLoader(false);
    }
  };
  const bookingEnd = async kms => {
    setEndModalLoader(true);

    Keyboard.dismiss();
    // setEndModalLoader(false);

    // return false;

    try {
      const res = await DRIVE_END({
        action: 'duty_report_booking_end',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        end_kms: inputEndKmsValue,
        start_kms: kms,
      });

      setInputEndKmsValue('');
      console.log(res, 'end response api');
      if (res?.redirect == 'duty_report') {
        GetAllBookingInfo();
        setModalVisibleEnd(false);
        return false;
      } else {
        if (res?.message_type == 'error') {
          // Alert.alert(res?.errormessage?.error_message);
          setModalVisibleEnd(false);
        } else {
          setModalVisibleEnd(false);
          GetAllBookingInfo();
          navigation.navigate('DueAmount', {bookingNumber});
        }
      }

      console.log(res, 'booking end api response');
    } catch (err) {
      console.log(err, 'booking end api Err');
      setEndModalLoader(false);
    } finally {
      setEndModalLoader(false);
    }
  };
  const dutyReportResendOtp = async () => {
    setLoaderResendOtp(true);
    try {
      const res = await DUTY_REPORT_RESEND_OTP({
        action: 're_send_ontheway_sms',
        booking_id: bookingNumber,
        mobile_number: driverMobileNumber,
      });
      console.log(
        {
          action: 're_send_ontheway_sms',
          booking_id: bookingNumber,
        },
        'resend otp send action',
      );
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaderResendOtp(false);
    }
  };
  const getFirstTimePopupFn = async type => {
    try {
      const response = await GET_FIRST_POPUP_DATA({
        action: 'booking_accepted_duty_report_popup',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        type: type,
      });
      console.log(
        {
          action: 'booking_accepted_duty_report_popup',
          booking_id: bookingNumber,
          current_language: languageSwitch,
          type: type,
        },
        'send first time popup action send First time popup action',
      );

      setfirstTimePopupData(response?.popupdata);
      setfirstTimePopup(true);
      console.log(
        response,
        'First time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup ResponseFirst time popup Response',
      );
    } catch (error) {
      console.log(error, 'dutyReportTripStatusPopup Api error - General Error');
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (isFirstTimeVisit && isType) {
      getFirstTimePopupFn(isType);
      setLoader(true);
    } else {
      setfirstTimePopup(false);
    }
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
      }}>
      <Header backButton={true} />
      <Toast visibilityTime={5000} topOffset={50} />
      {mainLoader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} color={AppColors.mainColor} />
        </View>
      ) : state === 'cancel' ? (
        <View
          style={{
            marginTop: 30,
            padding: 10,
          }}>
          <View
            style={{
              borderColor: 'rgb(128,128,128)',
              backgroundColor: AppColors.white,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 8,
              lineHeight: 20,
              shadowColor: 'rgb(128,128,128)',
              shadowOffset: {width: 5, height: 4},
              shadowOpacity: 5,
              elevation: 5,
              shadowRadius: 5,
              marginBottom: 20,
              padding: 10,
            }}>
            <View style={{padding: 14, alignItems: 'flex-start'}}>
              <Text
                style={{
                  textAlign: 'auto',
                  color: AppColors.black,
                  fontWeight: '700',
                  fontSize: 21,
                }}>
                {languageSwitch === 'english'
                  ? 'Booking is Already Cancelled'
                  : 'बुकिंग पहले ही Cancelled कर दी गई है।'}
              </Text>
            </View>
          </View>
        </View>
      ) : bookingInfo?.condition?.eligibility_view_invoice == 1 ? (
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            margin: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
            borderWidth: 0.5,
            borderColor: AppColors.black,
            // alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: AppColors.black,
              marginVertical: 10,
              textAlign: 'center',
            }}>
            {bookingInfo?.data?.duty_time_heading}{' '}
            {bookingInfo?.data?.duty_time_text}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginVertical: 20,
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              color: AppColors.black,
            }}>
            Booking No: #{bookingNumber}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('DueAmount', {bookingNumber})}
            style={{
              backgroundColor: 'green',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              elevation: 2,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              View Invoice
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainView}>
            {/* top */}
            <View style={styles.topSection}>
              <Text style={styles.interviewTimeText}>
                {bookingInfo?.data?.duty_time_heading}{' '}
                {bookingInfo?.data?.duty_time_text}
              </Text>
            </View>
            <View style={styles.bookingSection}>
              <View>
                <Text style={styles.bookingNoText}>
                  Booking No : #{bookingInfo?.data?.booking_id}
                </Text>
              </View>
              {bookingInfo?.condition?.eligibility_package_details == 1 && (
                <TouchableOpacity
                  onPress={() => setPackageDetailsDutyReportUpdate(true)}
                  style={styles.packageDetailsButton}>
                  <Text style={styles.packageDetailsText}>Package Details</Text>
                </TouchableOpacity>
              )}
            </View>
            <Modal
              transparent={true}
              animationType="slide"
              visible={packageDetailsDutyReportUpdate}
              onRequestClose={() => setPackageDetailsDutyReportUpdate(false)}>
              <PackageDetailsDutyReportUpdate
                setPackageDetailsDutyReportUpdate={
                  setPackageDetailsDutyReportUpdate
                }
                data={packageDetailsData}
              />
            </Modal>
            {/* middle */}
            <View style={styles.middleSection}>
              <View style={styles.nameTypeContainer}>
                <Text style={styles.nameText}>
                  {bookingInfo?.data?.customer_name}
                </Text>
                <Text style={styles.typeText}>
                  {bookingInfo?.data?.way_type}
                </Text>
              </View>
              <View style={styles.addressCallContainer}>
                <View style={{flex: 1}}>
                  {bookingInfo?.data?.pickup_address && (
                    <View style={styles.addressContainer}>
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={styles.addressIcon}
                      />
                      <Text style={styles.addressText}>
                        {bookingInfo?.data?.pickup_address}
                      </Text>
                    </View>
                  )}

                  {bookingInfo?.data?.drop_address && (
                    <View style={styles.addressContainer}>
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={styles.addressIcon}
                      />
                      <Text style={styles.addressText}>
                        {bookingInfo?.data?.drop_address}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={styles.callingGif}
                    onPress={() => {
                      openPhoneDialer(bookingInfo?.data?.circle_phone);
                    }}>
                    {/* <View style={styles.callingGif}> */}
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={CallingGif}
                      resizeMode="cover"
                    />
                    {/* </View> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* bottom */}
            <View
              style={{
                elevation: 1,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#f7f7f7',
                borderColor: '#ccc',
                padding: 15,
              }}>
              {/* <RadioButtonWithTitle booking={bookingInfo?.condition} /> */}

              <View style={styles.radioButtonView}>
                {bookingInfo?.condition?.customer_talk_done_eligibility ==
                  1 && (
                  <RadioButton
                    // key={option.id}
                    label={bookingInfo?.condition?.customer_talk_done || ''}
                    selected={selectedOption === 1}
                    onSelect={() => handleSelect(1)}
                  />
                )}

                {bookingInfo?.condition?.customer_not_pick_phone_eligibility ==
                  1 && (
                  <RadioButton
                    // key={option.id}
                    label={
                      bookingInfo?.condition?.customer_not_pick_phone || ''
                    }
                    selected={selectedOption === 2}
                    onSelect={() => handleSelect(2)}
                  />
                )}

                {bookingInfo?.condition?.customer_want_to_cancel_eligibility ==
                  1 && (
                  <RadioButton
                    // key={option.id}
                    label={
                      bookingInfo?.condition?.customer_want_to_cancel || ''
                    }
                    selected={selectedOption === 3}
                    onSelect={() => handleSelect(3)}
                  />
                )}
              </View>

              <SwipeableButton
                onSwipe={handleSwipe}
                data={bookingInfo?.condition}
              />

              {bookingInfo?.data?.youtube_video && (
                <View style={{marginTop: 20}}>
                  <YoutubePlayer
                    height={200}
                    // initialPlayerParams={{

                    // controls:false
                    // }
                    // }
                    autoPlay={false}
                    videoId={bookingInfo?.data?.youtube_video}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
      {/* First time popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={firstTimePopup}
        onRequestClose={() => setfirstTimePopup(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setfirstTimePopup(false)}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  {/* Guests are like God */}
                  {firstTimePopupData?.acceptpopupheading}
                </Text>
              </View>
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'flext-start',
                    color: AppColors.mainColor,
                  }}>
                  {/* I accept this duty. */}
                  {firstTimePopupData?.acceptpopupparagraph}
                </Text>
              </View>

              <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity
                  disabled={loader}
                  style={{
                    backgroundColor: AppColors.greyColor,

                    // padding: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 4,
                    // width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginHorizontal: '20%',
                    marginBottom: 50,
                  }}
                  onPress={() => {
                    setfirstTimePopup(false);
                  }}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontSize: 14,
                      // fontWeight: '600',
                      fontFamily: AppFont.regularFont,
                      // textAlign: 'center',
                    }}>
                    {/* {loader ? (
                      <ActivityIndicator
                        color={AppColors.white}
                        size={'small'}
                      />
                    ) : (
                      firstTimePopupData?.popupdata?.accept_alert_btn
                    )}dbcasvasvnb */}
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* accept bookin popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={acceptBookingPopup}
        onRequestClose={() => setacceptBookingPopup(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setacceptBookingPopup(false)}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  Guests are like God
                </Text>
              </View>
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: AppColors.mainColor,
                  }}>
                  I accept this duty.
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: AppFont.regularFont,
                  textAlign: 'center',
                  color: AppColors.black,
                }}>
                I will reach the customer on time.
              </Text>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity
                  disabled={loader}
                  style={{
                    backgroundColor: AppColors.mainColor,

                    // padding: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 4,
                    // width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginHorizontal: '20%',
                    marginBottom: 120,
                  }}
                  onPress={() => {
                    dutyReportBookingAccept();
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      // fontWeight: '600',
                      fontFamily: AppFont.regularFont,
                      // textAlign: 'center',
                    }}>
                    {loader ? (
                      <ActivityIndicator
                        color={AppColors.white}
                        size={'small'}
                      />
                    ) : (
                      'Accept'
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* on the way popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleOntheway}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
              minHeight: '40%',
            }}>
            {loader ? (
              <ActivityIndicator size={'small'} color={AppColors.mainColor} />
            ) : (
              <ScrollView>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.mainColor,
                    borderRadius: 20,
                    marginBottom: 20,
                    alignSelf: 'flex-end',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={closeModal}>
                  <Icon name="close" size={20} color={AppColors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: AppColors.mainColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: '100%',
                    padding: 20,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Merriweather-Bold',
                      fontSize: 18,
                      color: AppColors.white,
                    }}>
                    {popupsData?.popupdata?.ontheway_alert}
                  </Text>
                </View>
                <View style={{marginVertical: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: AppColors.mainColor,
                    }}>
                    {/* I will reach on time */}
                    {popupsData?.popupdata?.ontheway_alert_h3}
                  </Text>
                  <Image
                    source={Mask}
                    resizeMode="contain"
                    style={{
                      height: 60,
                      width: 140,
                      alignSelf: 'center',
                      marginVertical: 10,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: AppColors.mainColor,
                  }}>
                  {/* Customer's time is very valuable */}
                  {popupsData?.popupdata?.ontheway_alert_p}
                </Text>
                <TouchableOpacity
                  disabled={loaderOntheWay}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginTop: 20,
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 120,
                  }}
                  onPress={() => {
                    // driverOnTheWay();
                    isBookingUpcomming();
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    {loaderOntheWay
                      ? 'Please Wait...'
                      : popupsData?.popupdata?.ontheway_alert_btn}

                    {/* On The Way */}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Is booking Err Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isBookingApiErrPopup}
        onRequestClose={() => setisBookingApiErrPopup(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setisBookingApiErrPopup(false)}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  Guests are like God
                </Text>
              </View>
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    color: AppColors.black,
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: AppFont.regularFont,
                  }}>
                  {isBookingApiPopupMsge || ''}
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginTop: 20,
                    // padding: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 5,
                    // width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginHorizontal: '20%',
                    marginBottom: 120,
                  }}
                  onPress={() => {
                    // driverOnTheWay();
                    // isBookingUpcomming();
                    setisBookingApiErrPopup(false);
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* reach modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleRich}
        onRequestClose={() => setModalVisibleRich(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisibleRich(false);
                }}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  {/* Guests are like God */}
                  {popupsData?.popupdata?.reach_alert}
                </Text>
              </View>
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: AppColors.mainColor,
                  }}>
                  {popupsData?.popupdata?.reach_alert_h3}
                  {/* I have reached the customer's address. */}
                </Text>
              </View>
              <View style={{marginVertical: 30}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: AppColors.black,
                  }}>
                  {/* And ready to provide excellent service. */}
                  {popupsData?.popupdata?.reach_alert_p}
                </Text>
                <TouchableOpacity
                  disabled={reachLoader}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginTop: 20,
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 120,
                  }}
                  onPress={() => {
                    driverBookingReach();
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    {/* Reach */}
                    {reachLoader
                      ? 'Please Wait ...'
                      : popupsData?.popupdata?.reach_alert_btn}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* otp send modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleinput}
        onRequestClose={() => setModalVisibleinput(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
              minHeight: 400,
            }}>
            {loader ? (
              <ActivityIndicator color={AppColors.mainColor} size={'small'} />
            ) : (
              <ScrollView keyboardShouldPersistTaps="always">
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.mainColor,
                    borderRadius: 20,
                    marginBottom: 20,
                    alignSelf: 'flex-end',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setModalVisibleinput(false)}>
                  <Icon name="close" size={20} color={AppColors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: AppColors.mainColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: '100%',
                    padding: 20,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Merriweather-Bold',
                      fontSize: 18,
                      color: AppColors.white,
                    }}>
                    {/* Guests are like God */}
                    {popupsData?.popupdata?.start_alert}
                  </Text>
                </View>
                <TextInput
                  style={{
                    borderColor: '#c4c4be',
                    borderWidth: 1.5,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    color: '#333',
                    backgroundColor: '#fff',
                    marginTop: 20,
                    padding: 10,
                  }}
                  placeholder="Enter Otp"
                  placeholderTextColor="#aaa"
                  value={inputValue}
                  onChangeText={text => setInputValue(text)}
                />

                {popupsData?.popupdata?.start_kms_eligibility == '1' && (
                  <TextInput
                    style={{
                      borderColor: '#c4c4be',
                      borderWidth: 1.5,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: '#333',
                      backgroundColor: '#fff',
                      marginTop: 20,
                      padding: 10,
                    }}
                    placeholder={
                      popupsData?.popupdata?.start_kms_placeholder_text ||
                      'Enter Start KM'
                    }
                    placeholderTextColor="#aaa"
                    value={inputKmsValue}
                    onChangeText={text => setInputKmsValue(text)}
                  />
                )}
                <View style={{marginVertical: 5}}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={loaderResendOtp}
                      onPress={() => dutyReportResendOtp()}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: AppColors.mainColor,
                        }}
                        onLayout={event => {
                          const {width} = event.nativeEvent.layout;
                          setTextWidth(width);
                        }}>
                        {/* Resend OTP? */}
                        {loaderResendOtp
                          ? 'Please Wait...'
                          : popupsData?.popupdata?.resend_otp_text}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginTop: 2,
                        height: 1,
                        backgroundColor: AppColors.mainColor,
                        width: textWidth,
                      }}
                    />
                  </View>
                  <View>
                    {/* <Text
                      style={{
                        fontSize: 18,
                        color: AppColors.black,
                        fontFamily: AppFont.mainFont,
                        textAlign: 'center',
                        marginTop: 15,
                      }}>
                      {popupsData?.popupdata?.start_alert_h3}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: AppColors.black,
                        fontFamily: AppFont.mainFont,
                        textAlign: 'center',
                        marginTop: 15,
                      }}>
                      {popupsData?.popupdata?.start_alert_p}
                    </Text> */}
                  </View>
                  <TouchableOpacity
                    disabled={loader}
                    style={{
                      backgroundColor: AppColors.mainColor,
                      marginTop: '20%',
                      padding: 12,
                      borderRadius: 6,
                      width: '60%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: '20%',
                      marginBottom: 50,
                    }}
                    onPress={() => {
                      driverReached();
                    }}>
                    <Text
                      style={{
                        color: AppColors.white,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      {/* {Start} */}
                      {loader
                        ? 'Please Wait ...'
                        : popupsData?.popupdata?.start_alert_btn}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
          <Toast visibilityTime={3000} />
        </View>
      </Modal>
      {/* on time reach */}
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleonTimeRich}
        onRequestClose={() => setModalVisibleonTimeRich(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisibleonTimeRich(false)}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  marginTop: 20,
                  padding: 12,
                  borderRadius: 6,
                  width: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: '20%',
                  marginBottom: 120,
                }}
                onPress={() => {
                  // driverReached();
                }}>
                <Text
                  style={{
                    color: AppColors.white,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Reach
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal> */}

      {/* End Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleEnd}
        onRequestClose={() => setModalVisibleEnd(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              width: '90%',
              borderRadius: 10,
              padding: 15,
              elevation: 5,
            }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 20,
                  marginBottom: 10,
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisibleEnd(false)}>
                <Icon name="close" size={20} color={AppColors.white} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  {/* Guests are like God */}
                  {popupsData?.popupdata?.end_alert}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                {popupsData?.popupdata?.end_kms_eligibility == '1' && (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginVertical: 10,
                      textAlign: 'center',
                      color: AppColors.whatsAppIconColor,
                    }}>
                    Package - {popupsData?.popupdata?.Package}
                  </Text>
                )}
                {popupsData?.popupdata?.end_kms_eligibility == '1' && (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginVertical: 10,
                      color: AppColors.whatsAppIconColor,
                    }}>
                    Start Meter Reading -{' '}
                    {popupsData?.popupdata?.start_meter_reading} KMs
                  </Text>
                )}
                {popupsData?.popupdata?.end_kms_eligibility == '1' ? (
                  <TextInput
                    style={{
                      borderColor: '#c4c4be',
                      borderWidth: 1.5,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: '#333',
                      backgroundColor: '#fff',
                      marginVertical: 10,
                      padding: 10,
                    }}
                    placeholder={
                      popupsData?.popupdata?.end_kms_placeholder_text ||
                      'Enter End KMS'
                    }
                    placeholderTextColor="#aaa"
                    value={inputEndKmsValue}
                    onChangeText={text => setInputEndKmsValue(text)}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: AppColors.mainColor,
                      marginVertical: 10,
                    }}>
                    {popupsData?.popupdata?.end_alert_h3}
                  </Text>
                )}
              </View>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  disabled={endModalLoader}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginTop: 20,
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 30,
                  }}
                  onPress={() => {
                    bookingEnd(popupsData?.popupdata?.start_meter_reading);
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    {/* End */}
                    {endModalLoader
                      ? 'Please Wait...'
                      : popupsData?.popupdata?.end_alert_btn}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DutyReportUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  radioButtonView: {
    marginVertical: 12,
  },
  mainView: {
    borderColor: '#808080',
    backgroundColor: AppColors.white,
    borderWidth: 1.5,
    borderStyle: 'solid',
    margin: 10,
    padding: 10,
    paddingBottom: 65,
    marginVertical: 20,
    borderRadius: 5,
    lineHeight: 20,
    shadowColor: 'rgb(128,128,128)',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 10,
    elevation: 2,
    shadowRadius: 5,
    marginBottom: 20,
    // flex: 1
  },
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  interviewTimeText: {
    color: AppColors.black,
    fontWeight: 'bold',
  },
  bookingSection: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingNoText: {
    color: AppColors.black,
  },
  packageDetailsButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    elevation: 10,
  },
  packageDetailsText: {
    color: AppColors.black,
  },
  middleSection: {
    elevation: 1,
    borderWidth: 1,
    borderRadius: 5,

    backgroundColor: '#f7f7f7',
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
  },
  nameTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    color: AppColors.black,
  },
  typeText: {
    color: AppColors.black,
  },
  addressCallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  addressIcon: {
    height: 20,
    width: 20,
    tintColor: 'grey',
  },
  addressText: {
    color: AppColors.black,
    flexWrap: 'wrap',
  },
  callingGif: {
    width: 40,
    height: 40,
    backgroundColor: AppColors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
});
