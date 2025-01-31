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
  PermissionsAndroid,
  RefreshControl,
  Button,
  Platform,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import {
  Address,
  Agent_Icon,
  CallingGif,
  Mask,
  TrustedPartner,
} from '../assets/images';
import {AppColors} from '../assets/Colors';
import SwipeableButton from '../components/SwipeableButton';
import RadioButton from '../components/CustomRadioButton';
import PackageDetailsDutyReportUpdate from '../components/modal/PackageDetailsDutyReportUpdate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';

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
import axios from 'axios';

const DutyReportUpdate = ({route, navigation}) => {
  const {bookingNumber, state} = route?.params;
  const isFirstTimeVisit = route?.params?.isFirstTime;
  const isType = route?.params?.isType;
  const [cancelState, setCancelState] = useState(state);
  const [modalVisibleOntheway, setModalVisibleOntheway] = useState(false);
  const [loaderOntheWay, setLoaderOntheWay] = useState(false);
  const [modalVisibleRich, setModalVisibleRich] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputKmsValue, setInputKmsValue] = useState('');
  const [inputEndKmsValue, setInputEndKmsValue] = useState('');
  const [modalVisibleinput, setModalVisibleinput] = useState(false);
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
  const [selectedFile, setSelectedFile] = useState(null);

  const jwtToken = useSelector(e => e?.userAuth?.jwt);

  const talkToCustomer = async () => {
    setLoader(true);
    try {
      const response = await TALK_TO_CUSTOMER({
        action: 'confirm_booking',
        booking_number: bookingNumber,
      });

      GetAllBookingInfo();
    } catch (error) {
      setLoader(false);
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
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      GetAllBookingInfo();
    } catch (error) {
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

      GetAllBookingInfo();
      if (response?.msg_type == 'error') {
        Alert.alert('Success', response?.message || 'No message available', [
          {text: 'OK'},
        ]);
      }
    } catch (error) {
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
        talkToCustomer();
    }
  };
  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );

  const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
    useState(false);

  const [bookingInfo, setbookingInfo] = useState({});
  const handleSwipe = () => {
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
    }
  };

  const openPhoneDialer = phoneNumber => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url);
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
      });

      if (response?.status_code == '200' && response?.message_type == 'error') {
        setCancelState('cancel');
      } else {
        setbookingInfo(response?.duty_report_booking_info);
        const statusId =
          response?.duty_report_booking_info?.condition?.next_booking_status_id;
        if (statusId != '') dutyReportTripStatusPopup(statusId);
      }
    } catch (error) {
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
      setPackageDetailsData(response);
    } catch (error) {
      setLoader(false);
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
      });

      if (response?.redirect == 'duty_report') {
        if (response?.message_type == 'error') {
          setCancelState('cancel');
          setacceptBookingPopup(false);
        } else {
          GetAllBookingInfo();
          setacceptBookingPopup(false);
        }
      }

      GetAllBookingInfo();
      setacceptBookingPopup(false);
    } catch (error) {
      GetAllBookingInfo();
      setacceptBookingPopup(false);
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
    if (!statusId) {
      return null;
    }
    setLoader(true);
    try {
      const response = await DUTY_REPORT_TRIP_STATUS_POPUP_VIEW({
        action: 'duty_report_trip_status_popup_view',
        booking_id: bookingNumber,
        booking_status_id: statusId,
        current_language: languageSwitch,
      });
      setpopupsData(response);
    } catch (error) {
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
        setisBookingApiErrPopup(true);
        setModalVisibleOntheway(false);
        setisBookingApiPopupMsge(res?.upcoming_booking_data);
        GetAllBookingInfo();
        return false;
      } else {
        driverOnTheWay();
      }
    } catch (err) {
      driverOnTheWay();
      setLoaderOntheWay(false);
    } finally {
      setLoaderOntheWay(false);
    }
  };
  const driverOnTheWay = async () => {
    try {
      const onTheWayApi = await DRIVER_ON_THE_WAY({
        action: 'duty_report_booking_ontheway',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
      });

      GetAllBookingInfo();
      setModalVisibleOntheway(false);
    } catch (err) {}
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

      if (res?.redirect == 'duty_report') {
        if (res?.message_type == 'error') {
          setCancelState('cancel');
          setModalVisibleRich(false);
        } else {
          GetAllBookingInfo();
          setModalVisibleRich(false);
        }
      }
      setModalVisibleRich(false);
      // setModalVisibleinput(true);
      GetAllBookingInfo();
    } catch (err) {
    } finally {
      setReachLoader(false);
    }
  };
  const [acceptBookingPopup, setacceptBookingPopup] = useState(false);

  const showStartAlert = () => {
    if (!inputValue) {
      Alert.alert('Please Enter Fisrt OTP');
      return;
    } else if (!inputKmsValue) {
      Alert.alert('Please Enter Fisrt Start KMS');
      return;
    } else {
      Alert.alert(
        'Are you sure?',
        `Current Meeter reading is - ${inputKmsValue}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => driverReached(),
          },
        ],
        {cancelable: true},
      );
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to capture photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCameraCapture = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(
        {mediaType: 'photo', maxHeight: 600, maxWidth: 800},
        response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
            console.error('Camera Error:', response.errorMessage);
          } else {
            const file = response.assets[0];
            setSelectedFile(file);
          }
        },
      );
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera access is required to take photos. Please enable camera permissions in your device settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  };

  const driverReached = async () => {
    if (selectedFile) {
      formData.append('start_image', {
        uri: selectedFile.uri,
        type: selectedFile.type || 'image/jpeg',
        name: selectedFile.fileName || 'photo.jpg',
      });
    } else {
      Alert.alert('No file selected for upload');
      return;
    }
    if (!inputValue) {
      Alert.alert('Please Enter Fisrt OTP');
      return;
    }
    setLoader(true);
    Keyboard.dismiss();

    const formData = new FormData();
    formData.append('action', 'duty_report_booking_start');
    formData.append('booking_id', bookingNumber);
    formData.append('current_language', languageSwitch);
    formData.append(
      'trip_status',
      bookingInfo?.condition?.next_booking_status_id,
    );
    formData.append('otp', inputValue);
    formData.append('start_kms', inputKmsValue);

    try {
      const response = await axios.post(
        'https://www.tatd.in/app-api/driver/duty-report/duty_report_booking_start.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      const res = response?.data;

      if (res?.redirect == 'duty_report') {
        if (res?.message_type == 'error') {
          setCancelState('cancel');
          setModalVisibleinput(false);
        } else {
          GetAllBookingInfo();
          setModalVisibleinput(false);
        }
      }
      if (
        res?.start_booking_message &&
        Object.keys(res?.start_booking_message).length !== 0
      ) {
        setModalVisibleinput(false);
        GetAllBookingInfo();
      } else {
        const msge = res?.otp_error_message;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: msge?.otp_error_message,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log('Server Response Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response from Server:', error.request);
      } else {
        console.error('Error Setting Up Request:', error.message);
      }
    } finally {
      setLoader(false);
    }
  };

  const driverReachedd = async () => {
    if (!inputValue) {
      Alert.alert('Please Enter Fisrt OTP');
      return;
    }
    setLoader(true);
    Keyboard.dismiss();

    try {
      const res = await DRIVE_START({
        action: 'duty_report_booking_start',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: bookingInfo?.condition?.next_booking_status_id,
        start_kms: inputKmsValue,
        otp: inputValue,
      });

      if (res?.redirect == 'duty_report') {
        if (res?.message_type == 'error') {
          setCancelState('cancel');
          setModalVisibleinput(false);
        } else {
          GetAllBookingInfo();
          setModalVisibleinput(false);
        }
      }
      if (
        res?.start_booking_message &&
        Object.keys(res?.start_booking_message).length !== 0
      ) {
        setModalVisibleinput(false);
        GetAllBookingInfo();
      } else {
        const msge = res?.otp_error_message;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: msge?.otp_error_message,
        });
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  const showEndAlert = startReading => {
    if (!inputEndKmsValue) {
      Alert.alert('Please Enter First End KMS');
      return;
    } else {
      const message = `Start Meter Reading: ${startReading}\nEnd Meter Reading: ${inputEndKmsValue}\nTotal Running KMS: ${
        inputEndKmsValue - startReading
      }`;
      Alert.alert(
        'Are you sure?',
        message,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => bookingEnd(startReading),
          },
        ],
        {cancelable: true},
      );
    }
  };

  const bookingEnd = async kms => {
    setEndModalLoader(true);

    Keyboard.dismiss();

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

      if (res?.redirect == 'duty_report') {
        if (res?.message_type == 'error') {
          setCancelState('cancel');
          setModalVisibleEnd(false);
        } else {
          GetAllBookingInfo();
          setModalVisibleEnd(false);
        }

        return false;
      } else {
        if (res?.message_type == 'error') {
          Alert.alert(res?.errormessage?.error_message);
          setModalVisibleEnd(false);
        } else {
          setModalVisibleEnd(false);
          GetAllBookingInfo();
          navigation.navigate('DueAmount', {bookingNumber});
        }
      }
    } catch (err) {
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

      Toast.show({
        type: 'success',
        text1: res?.message,
      });
    } catch (err) {
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

      setfirstTimePopupData(response?.popupdata);

      setfirstTimePopup(true);
    } catch (error) {
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
      <Header
        backButton={true}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      />

      <Toast visibilityTime={5000} topOffset={50} />
      {mainLoader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} color={AppColors.mainColor} />
        </View>
      ) : cancelState === 'cancel' ? (
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
                  : 'बुकिंग पहले ही कैंसिल कर दी गई है।'}
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
              elevation: 5,
            }}>
            <View style={{}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: AppColors.white,
                  // borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  zIndex: 10,
                }}
                onPress={() => setfirstTimePopup(false)}>
                <Icon name="close" size={16} color={AppColors.black} />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 15,
                  paddingVertical: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 20,
                    color: AppColors.white,
                    fontWeight: 'bold',
                  }}>
                  {firstTimePopupData?.acceptpopupheading}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'left',
                    color: AppColors.black,
                  }}>
                  {firstTimePopupData?.acceptpopupparagraph?.line1}
                </Text>
              </View>

              <View
                style={{
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'left',
                    color: AppColors.black,
                  }}>
                  {firstTimePopupData?.acceptpopupparagraph?.line2}
                </Text>
              </View>

              <View
                style={{
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'left',
                    color: AppColors.red,
                  }}>
                  {firstTimePopupData?.acceptpopupparagraph?.line3}
                </Text>
              </View>

              <View style={{alignItems: 'center', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.gray,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 5,
                    marginBottom: 60,
                  }}
                  onPress={() => setfirstTimePopup(false)}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontSize: 16,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* firstPopupend */}

      {/* accept bookin popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={acceptBookingPopup}
        onRequestClose={() => setacceptBookingPopup(false)}>
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
              elevation: 5,
            }}>
            <View style={{}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: AppColors.white,
                  // borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  zIndex: 10,
                }}
                onPress={() => setacceptBookingPopup(false)}>
                <Icon name="close" size={16} color={AppColors.black} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 15,
                  paddingVertical: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 20,
                    color: AppColors.white,
                    fontWeight: 'bold',
                  }}>
                  {popupsData?.popupdata?.accept_alert}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'center',
                    color: AppColors.black,
                  }}>
                  {popupsData?.popupdata?.accept_alert_h3}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: 'center',
                    color: AppColors.black,
                  }}>
                  {popupsData?.popupdata?.accept_alert_p}
                </Text>
              </View>

              <View style={{alignItems: 'center', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.gray,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderRadius: 5,
                    marginBottom: 60,
                  }}
                  onPress={() => {
                    dutyReportBookingAccept();
                  }}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontSize: 16,
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
            </View>
          </View>
        </View>
      </Modal>
      {/* on the way popup */}

      {/* onthewaypopupstart */}

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
              elevation: 5,
              alignContent: 'flex-end',
            }}>
            {loader ? (
              <ActivityIndicator size={'small'} color={AppColors.mainColor} />
            ) : (
              <View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: AppColors.white,
                    // borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    zIndex: 10,
                  }}
                  onPress={closeModal}>
                  <Icon name="close" size={16} color={AppColors.black} />
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: AppColors.mainColor,
                    padding: 15,
                    paddingVertical: 30,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Merriweather-Bold',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: AppColors.white,
                    }}>
                    {popupsData?.popupdata?.ontheway_alert}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 22,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: AppColors.mainColor,
                    }}>
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
                    // fontWeight: 'bold',
                    textAlign: 'center',
                    color: AppColors.black,
                  }}>
                  {popupsData?.popupdata?.ontheway_alert_p}
                </Text>
                <TouchableOpacity
                  disabled={loaderOntheWay}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginVertical: 50,
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 100,
                  }}
                  onPress={() => {
                    isBookingUpcomming();
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      fontSize: 17,
                      textAlign: 'center',
                    }}>
                    {loaderOntheWay
                      ? 'Please Wait...'
                      : popupsData?.popupdata?.ontheway_alert_btn}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* onthewaypopupend */}

      {/* Is booking Err Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isBookingApiErrPopup}
        onRequestClose={() => setisBookingApiErrPopup(false)}>
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
              // padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: AppColors.white,
                  // borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  zIndex: 10,
                }}
                onPress={() => setisBookingApiErrPopup(false)}>
                <Icon name="close" size={16} color={AppColors.black} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 15,
                  paddingVertical: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 20,
                    color: AppColors.white,
                    fontWeight: 'bold',
                  }}>
                  {languageSwitch == 'english'
                    ? 'Guests are like God:'
                    : 'अतिथि देवो भव:'}
                </Text>
              </View>
              <View style={{marginVertical: 20, padding: 15}}>
                <Text
                  style={{
                    color: AppColors.red,
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: AppFont.regularFont,
                  }}>
                  {isBookingApiPopupMsge?.upcoming_booking_error_msg || ''}
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
                    marginBottom: 100,
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

      {/* reachmodalstart */}

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
              // padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: AppColors.white,
                  // borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  zIndex: 10,
                }}
                onPress={() => {
                  setModalVisibleRich(false);
                }}>
                <Icon name="close" size={16} color={AppColors.black} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 15,
                  paddingVertical: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 20,
                    color: AppColors.white,
                    fontWeight: 'bold',
                  }}>
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
                  {popupsData?.popupdata?.reach_alert_p}
                </Text>

                <TouchableOpacity
                  disabled={reachLoader}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    marginVertical: 50,
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 100,
                  }}
                  onPress={() => {
                    driverBookingReach();
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                      fontSize: 17,
                    }}>
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

      {/* reachmodalend */}

      {/* otpsendmodalstart */}

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
              // padding: 20,
              elevation: 5,
              // minHeight: 400,
            }}>
            {loader ? (
              <ActivityIndicator
                color={AppColors.mainColor}
                style={{flex: 1}}
                size={'small'}
              />
            ) : (
              <ScrollView keyboardShouldPersistTaps="always">
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: AppColors.white,
                    // borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    zIndex: 10,
                  }}
                  onPress={() => setModalVisibleinput(false)}>
                  <Icon name="close" size={16} color={AppColors.black} />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: AppColors.mainColor,
                    padding: 15,
                    paddingVertical: 30,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Merriweather-Bold',
                      fontSize: 20,
                      color: AppColors.white,
                    }}>
                    {popupsData?.popupdata?.start_alert}
                  </Text>
                </View>

                {/* <Image
                  source={selectedFile ? {uri: selectedFile.uri} : Agent_Icon}
                  style={{
                    width: 200,
                    height: 200,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                /> */}

                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    alignSelf: 'center',
                    //backgroundColor: "#66a6ff",
                    backgroundColor: '#66a6ff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    margin: 10,
                    marginTop: 20,
                    borderWidth: 5,
                    borderColor: '#fff',
                  }}
                  onPress={handleCameraCapture}>
                  {selectedFile ? (
                    <Image
                      source={{uri: selectedFile?.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                        // resizeMode: "cover",
                        //borderRadius:70
                      }}
                    />
                  ) : (
                    <Image
                      source={TrustedPartner}
                      style={{
                        width: 50,
                        height: 50,
                        opacity: 0.8,
                        alignSelf: 'center',
                        marginVertical: 5,
                      }}
                    />
                  )}
                  <Text style={{marginBottom: 10}}>
                    {selectedFile ? (
                      <Text style={{color: 'white', fontSize: 15}}>Edit</Text>
                    ) : (
                      <Text style={{color: 'white', fontSize: 15}}>
                        Upload Image
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={handleCameraCapture}
                  style={{
                    margin: 10,
                    alignContent: 'center',
                    alignSelf: 'center',
                    borderWidth: 1,
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                  }}>
                  {selectedFile ? (
                    <Image
                      source={{uri: selectedFile.uri}}
                      style={{
                        width: 150,
                        resizeMode: 'center',
                        height: 150,
                        // marginBottom: 10,
                        // borderRadius: 10,
                        // borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <Image
                      source={Agent_Icon}
                      style={{
                        width: 150,
                        height: 140,
                        resizeMode: 'center',
                        // marginBottom: 10,
                        // borderRadius: 10,
                      }}
                    />
                  )}
                </TouchableOpacity> */}

                <View style={{padding: 20}}>
                  <TextInput
                    style={{
                      borderColor: '#c4c4be',
                      borderWidth: 1.5,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      color: '#333',
                      backgroundColor: '#fff',
                      // marginTop: 10,
                      padding: 10,
                    }}
                    placeholder="Enter Otp"
                    placeholderTextColor="#aaa"
                    value={inputValue}
                    maxLength={4}
                    keyboardType="number-pad"
                    onChangeText={text => setInputValue(text)}
                  />
                  <View
                    style={{
                      // alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      disabled={loaderResendOtp}
                      onPress={() => dutyReportResendOtp()}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: AppColors.mainColor,
                          alignSelf: 'flex-start',
                          marginVertical: 5,
                        }}
                        onLayout={event => {
                          const {width} = event.nativeEvent.layout;
                          setTextWidth(width);
                        }}>
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

                  {/* <Button title="Open Camera" onPress={handleCameraCapture} /> */}

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
                      keyboardType="number-pad"
                      onChangeText={text => setInputKmsValue(text)}
                    />
                  )}
                </View>

                <View style={{marginVertical: 5}}>
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
                    // onPress={() => {
                    //   driverReached();
                    // }}
                    onPress={() => {
                      if (popupsData?.popupdata?.start_kms_eligibility == '1') {
                        showStartAlert();
                      } else {
                        driverReached();
                      }
                    }}>
                    <Text
                      style={{
                        color: AppColors.white,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
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

      {/* otpsendmodalend */}

      {/* End Modal */}

      {/* endmodalstart */}

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
              // padding: 20,
              elevation: 5,
              // minHeight: 400,
            }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: AppColors.white,
                  // borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  zIndex: 10,
                }}
                onPress={() => setModalVisibleEnd(false)}>
                <Icon name="close" size={16} color={AppColors.black} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 15,
                  paddingVertical: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: AppColors.white,
                  }}>
                  {popupsData?.popupdata?.end_alert}
                </Text>
              </View>
              <View style={{marginVertical: 10, padding: 20}}>
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
                  // onPress={() => {
                  //   bookingEnd(popupsData?.popupdata?.start_meter_reading);
                  // }}
                  onPress={() => {
                    if (popupsData?.popupdata?.end_kms_eligibility == '1') {
                      showEndAlert(popupsData?.popupdata?.start_meter_reading);
                    } else {
                      bookingEnd(popupsData?.popupdata?.start_meter_reading);
                    }
                  }}>
                  <Text
                    style={{
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
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

      {/* endmodalend */}
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
