import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
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
  Platform,
  Clipboard,
  ToastAndroid,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  Address,
  CallingGif,
  Headerlogo,
  HelpImage,
  Mask,
  NavigationIcon,
  OntheWayIcon,
} from '../assets/images';
import {AppColors} from '../assets/Colors';
import SwipeableButton from '../components/SwipeableButton';
import RadioButton from '../components/CustomRadioButton';
import PackageDetailsDutyReportUpdate from '../components/modal/PackageDetailsDutyReportUpdate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import IntentLauncher from '@yz1311/react-native-intent-launcher';

import {
  CHECK_IS_BOOKING_IS_UPCOMMING,
  CUSTOMER_NOT_PICKUP_PHONE,
  CUSTOMER_WANT_TO_CANCEL,
  DRIVE_END,
  DRIVER_BOOKING_REACH,
  DRIVER_ON_THE_WAY,
  DUTY_REPORT_BOOKING_ACCEPT,
  DUTY_REPORT_RESEND_OTP,
  DUTY_REPORT_TRIP_STATUS_POPUP_VIEW,
  GET_BOOKING_INFO,
  GET_BOOKING_STATUS_ID,
  GET_FIRST_POPUP_DATA,
  PACKAGE_DETAILS_DUTY_REPORT,
  PARTNER_ONBOOKING_CALL_SUPPORT,
  RESTRICT_CALL_TO_CUSTOMER,
  START_BOOKING,
  TALK_TO_CUSTOMER,
} from '../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {AppFont} from '../assets/FontsFamily';
import Toast from 'react-native-toast-message';
import {requestLocationPermission} from '../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  ColorSpace,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import {useFocusEffect} from '@react-navigation/native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import LanguageNewModal from '../components/modal/LanguageNewModal';
import {setCurrentView, setLanguageSwitch} from '../redux/slices/globalSlice';

const DutyReportUpdate = ({route, navigation}) => {
  const dispatch = useDispatch();
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
  const [locationLoader, setLocationLoader] = useState(false);
  const [loaderResendOtp, setLoaderResendOtp] = useState(false);
  const [endModalLoader, setEndModalLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [firstTimePopup, setfirstTimePopup] = useState(false);
  const [firstTimePopupData, setfirstTimePopupData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [needHelpShow, setNeedHelpShow] = useState(false);
  const [showImageField, setShowImageField] = useState(true);
  const [loaderMap, setLoaderMap] = useState(false);
  const [isOpenLanguageModal, setisOpenLanguageModal] = useState(false);
  const [isPreventDriverToCustomerModal, setisPreventDriverToCustomerModal] =
    useState(false);
  const [prventCallData, setprventCallData] = useState({});
  const [callIconLoader, setcallIconLoader] = useState(false);

  const [isShowBookingEndModal, setisShowBookingEndModal] = useState(false);
  const [bookingEndErrPopupData, setbookingEndErrPopupData] = useState('');
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
          '',
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
      handleNeedHelpButton();
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
        Alert.alert('', response?.message || 'No message available', [
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

  const openPhoneDialer = async phoneNumber => {
    try {
      setcallIconLoader(true);
      // setisPreventDriverToCustomerModal(true);
      console.log('api calling');
      const res = await RESTRICT_CALL_TO_CUSTOMER({
        action: 'restriction-customer-number-sharing',
        booking_id: bookingNumber,
        current_language: languageSwitch,
      });
      if (res?.status_code == 200 && res?.message == 'error') {
        setisPreventDriverToCustomerModal(true);
        setprventCallData(res);
      } else {
        let url = `tel:${phoneNumber}`;
        Linking.openURL(url);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setcallIconLoader(false);
    }
    // return false;
  };

  const closeModal = () => {
    setModalVisibleOntheway(false);
  };

  useEffect(() => {
    if (state !== 'cancel') {
      setMainLoader(true);
      GetAllBookingInfo();
      handleNeedHelpButton();
    }
  }, [languageSwitch]);

  useFocusEffect(
    React.useCallback(() => {
      if (state === 'chat') {
        GetAllBookingInfo();
      }
    }, [state]),
  );

  const GetAllBookingInfo = async () => {
    try {
      const response = await GET_BOOKING_INFO({
        action: 'duty_report_booking_info',
        booking_id: bookingNumber,
        current_language: languageSwitch,
      });
      const freeStorage = await DeviceInfo.getFreeDiskStorage();
      const isGreaterThan500MB = freeStorage > 2 * 1024 * 1024 * 1024;
      if (isGreaterThan500MB) {
        // console.log(' Storage is more than 500 MB');
        setShowImageField(true);
      } else {
        setShowImageField(false);
        // console.log(' Storage is less than 500 MB');
      }

      if (
        response?.status_code == '200' &&
        response?.message_type == 'error' &&
        response?.cancel_message_show
      ) {
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
  }, [languageSwitch]);
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
          // setCancelState('cancel');
          setacceptBookingPopup(false);
          GetAllBookingInfo();
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

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      // setReachLoader(true);
      setLocationLoader(true);

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          error => {
            if (error.code === 1) {
              requestLocationPermission();
              setReachLoader(false);
              setLocationLoader(false);
            } else if (error.code === 2) {
              Alert.alert(
                'Location Service Disabled',
                'Please enable location services to proceed.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Open Setting',
                    // onPress: () => {
                    //   Linking.sendIntent(
                    //     'android.settings.LOCATION_SOURCE_SETTINGS',
                    //   );
                    // },
                    onPress: () => {
                      IntentLauncher.startActivity({
                        action: 'android.settings.LOCATION_SOURCE_SETTINGS',
                      });
                    },
                  },
                ],
              );
              setLocationLoader(false);
              setReachLoader(false);
            } else {
              reject(new Error('Error fetching location: ' + error.message));
              setReachLoader(false);
              setLocationLoader(false);
            }
          },
          {
            maximumAge: 0,
          },
        );
      });
    } else {
      setReachLoader(false);
    }
  };

  const driverBookingReach = async () => {
    const location = await getLocation();

    if (location) {
      setReachLoader(true);
      setLocationLoader(false);

      try {
        const requestData = {
          action: 'duty_report_booking_reach',
          booking_id: bookingNumber,
          current_language: languageSwitch,
          trip_status: bookingInfo?.condition?.next_booking_status_id,
          latitude: location?.latitude,
          longitude: location?.longitude,
        };

        const res = await DRIVER_BOOKING_REACH(requestData);

        if (res?.distance_message_flag == 1) {
          Alert.alert('', res?.distance_message, [
            {text: 'OK', onPress: () => setModalVisibleRich(false)},
          ]);
          return false;
        } else {
          if (res?.redirect == 'duty_report') {
            if (res?.message_type == 'error') {
              // setCancelState('cancel');
              setModalVisibleRich(false);
              GetAllBookingInfo();
            } else {
              GetAllBookingInfo();
              setModalVisibleRich(false);
            }
          }

          setModalVisibleRich(false);
          GetAllBookingInfo();
        }
      } catch (err) {
      } finally {
        setReachLoader(false);
        setLocationLoader(false);
      }
    } else {
    }
  };

  const [acceptBookingPopup, setacceptBookingPopup] = useState(false);

  const showStartAlert = () => {
    if (!inputValue || !/^\d+$/.test(inputValue) || inputValue.length !== 4) {
      const otpMessage = !inputValue
        ? languageSwitch === 'english'
          ? 'Please enter first OTP.'
          : 'कृपया पहले ओटीपी दर्ज करें।'
        : !/^\d+$/.test(inputValue)
        ? languageSwitch === 'english'
          ? 'OTP must contain only numbers.'
          : 'ओटीपी में केवल अंक होने चाहिए।'
        : languageSwitch === 'english'
        ? 'OTP must be exactly 4 digits.'
        : 'ओटीपी ठीक 4 अंकों का होना चाहिए।';

      Alert.alert(otpMessage);
      return;
    }

    if (!inputKmsValue || !/^\d+$/.test(inputKmsValue)) {
      const kmsMessage = !inputKmsValue
        ? languageSwitch === 'english'
          ? 'Please enter starting KMS.'
          : 'कृपया प्रारंभ KMS दर्ज करें।'
        : languageSwitch === 'english'
        ? 'KMS must contain only numbers.'
        : 'KMS में केवल अंक होने चाहिए।';

      Alert.alert(kmsMessage);
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

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'This app needs access to your camera to capture photos.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   }
  //   return true;
  // };
  const requestCameraPermission = async () => {
    // console.log("p")
    try {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else {
        // Alert.alert()
        const result = await request(PERMISSIONS.IOS.CAMERA);
        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.log(error);
    }
    // return false;
  };
  const handleCameraCapture = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      // console.log(hasPermission,"poiu")
      if (hasPermission) {
        launchCamera(
          {
            mediaType: 'photo',
            maxHeight: 500,
            maxWidth: 500,
            quality: 0.2,
            saveToPhotos: false,
          },
          response => {
            if (response?.didCancel) {
            } else if (response.errorCode) {
              console.error('Camera Error:', response.errorMessage);
            } else if (response?.assets && response?.assets?.length > 0) {
              // console.log(response?.assets,"response?.assetsresponse?.assets");
              // console.log(response?.assets?.length,"--response?.assetsresponse?.assets");
              const file = response?.assets[0];
              setSelectedFile(file || {});
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
    } catch (error) {
      console.log(error);
    }
  };

  const driverReached = async () => {
    if (showImageField && !selectedFile) {
      Alert.alert(
        languageSwitch == 'english'
          ? 'Please click the Photo for upload'
          : 'कृपया अपलोड करने के लिए फोटो पर क्लिक करें।',
      );
      return;
    }
    if (!inputValue || !/^\d+$/.test(inputValue) || inputValue.length !== 4) {
      const otpMessage = !inputValue
        ? languageSwitch === 'english'
          ? 'Please enter first OTP.'
          : 'कृपया पहले ओटीपी दर्ज करें।'
        : !/^\d+$/.test(inputValue)
        ? languageSwitch === 'english'
          ? 'OTP must contain only numbers.'
          : 'ओटीपी में केवल अंक होने चाहिए।'
        : languageSwitch === 'english'
        ? 'OTP must be exactly 4 digits.'
        : 'ओटीपी ठीक 4 अंकों का होना चाहिए।';
      Alert.alert(otpMessage);
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

    if (selectedFile) {
      formData.append('start_image', {
        uri: selectedFile.uri,
        type: selectedFile.type || 'image/jpeg',
        name: selectedFile.fileName || 'photo.jpg',
      });
    }
    // formData.append('start_image', {
    //   uri: selectedFile.uri,
    //   type: selectedFile.type || 'image/jpeg',
    //   name: selectedFile.fileName || 'photo.jpg',
    // });
    formData.append('otp', inputValue);
    formData.append('start_kms', inputKmsValue);

    try {
      const response = await START_BOOKING(formData);
      if (response?.redirect == 'duty_report') {
        if (response?.message_type == 'error') {
          // setCancelState('cancel');
          setModalVisibleinput(false);
          GetAllBookingInfo();
        } else {
          GetAllBookingInfo();
          setModalVisibleinput(false);
        }
      } else if (
        response?.start_booking_message &&
        Object.keys(response.start_booking_message).length !== 0
      ) {
        setModalVisibleinput(false);
        GetAllBookingInfo();
      } else {
        Alert.alert(
          'Try Again',
          response?.otp_error_message?.otp_error_message ||
            'Wrong OTP Please Try Again Later',
          [
            {
              text: 'OK',
              onPress: () => {
                setModalVisibleinput(false);
              },
            },
          ],
        );
        setModalVisibleinput(false);
        setInputValue('');
      }
    } catch (error) {
      console.log('API request failed', error);
    } finally {
      setLoader(false);
    }
  };

  const showEndAlert = startReading => {
    if (!inputEndKmsValue || !/^\d+$/.test(inputEndKmsValue)) {
      const kmsMessage = !inputEndKmsValue
        ? languageSwitch === 'english'
          ? 'Please Enter First End KMS.'
          : 'कृपया अंतिम KMS दर्ज करें।'
        : languageSwitch === 'english'
        ? 'KMS must contain only numbers.'
        : 'KMS में केवल अंक होने चाहिए।';

      Alert.alert(kmsMessage);
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
          // setCancelState('cancel');
          setModalVisibleEnd(false);
          GetAllBookingInfo();
        } else {
          GetAllBookingInfo();
          setModalVisibleEnd(false);
        }

        return false;
      } else {
        if (res?.message_type == 'error') {
          setbookingEndErrPopupData(res?.errormessage?.error_message);
          // Alert.alert('', res?.errormessage?.error_message);
          setModalVisibleEnd(false);
          setTimeout(() => {
            setisShowBookingEndModal(true);
          }, 300);
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
      handleNeedHelpButton();
      setLoader(true);
    } else {
      setfirstTimePopup(false);
    }
  }, [languageSwitch]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95); // Slightly shrink on press
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); // Restore size
  };
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  function createLatLng(latLngStr) {
    const [lat, lng] = latLngStr.split(',').map(Number);
    return {lat, lng};
  }

  const openOnlyMap = latLong => {
    if (!latLong) {
      return;
    }
    const [latitude, longitude] = latLong.split(',').map(coord => coord.trim());
    const url = Platform.select({
      ios: `maps://app?saddr=Current+Location&daddr=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    if (url) {
      Linking.openURL(url).catch(err =>
        console.error('Error opening map:', err),
      );
    }
  };

  // const openMap = async latLong => {
  //   try {
  //     setLoaderMap(true);

  //     if (
  //       !latLong ||
  //       typeof latLong !== 'string' ||
  //       !latLong.includes(',') ||
  //       latLong.split(',').length !== 2 ||
  //       latLong.split(',').some(coord => isNaN(parseFloat(coord.trim())))
  //     ) {
  //       setLoaderMap(false);
  //       return null;
  //     }

  //     const currentLocation = await getLocation();
  //     const customerLocation = createLatLng(latLong);

  //     const googleMapsAppURL = `google.navigation:q=${customerLocation?.lat},${customerLocation?.lng}&mode=d`;
  //     const googleMapsWebURL = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation?.latitude},${currentLocation?.longitude}&destination=${customerLocation?.lat},${customerLocation?.lng}&travelmode=driving`;

  //     if (bookingInfo?.condition?.live_tracking == 1) {
  //       navigation.navigate('MyMap', {
  //         googleMapsWebURL,
  //         timing: bookingInfo?.condition?.api_timing,
  //         bookingNumber,
  //       });
  //     } else {
  //       const supported = await Linking.canOpenURL('google.navigation:q=0,0');

  //       if (supported) {
  //         await Linking.openURL(googleMapsAppURL);
  //       } else {
  //         await Linking.openURL(googleMapsWebURL);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error opening Google Maps', error);
  //   } finally {
  //     setLoaderMap(false);
  //   }
  // };
  const openMap = async latLong => {
    try {
      setLoaderMap(true);
      console.log('lat----long', latLong);
  
      // Validate latLong
      if (
        !latLong ||
        typeof latLong !== 'string' ||
        !latLong.includes(',') ||
        latLong.split(',').length !== 2 ||
        latLong.split(',').some(coord => isNaN(parseFloat(coord.trim())))
      ) {
        console.error('Invalid latLong format:', latLong);
        setLoaderMap(false);
        return null;
      }
  
      // Get current location
      const currentLocation = await getLocation();
      console.log('current-----', currentLocation);
  
      if (!currentLocation) {
        console.error('Current location not found');
        setLoaderMap(false);
        return null;
      }
  
      const [latitude, longitude] = latLong.split(',').map(coord => coord.trim());
  
      // iOS Apple Maps
      const appleMapsURL = `maps://?daddr=${latitude},${longitude}&dirflg=d`;
  
      // iOS Google Maps
      const googleMapsIOSURL = `comgooglemaps://?saddr=${currentLocation.latitude},${currentLocation.longitude}&daddr=${latitude},${longitude}&directionsmode=driving`;
  
      // Android Google Maps
      const googleMapsAppURL = `google.navigation:q=${latitude},${longitude}&mode=d`;
  
      // Web fallback
      const googleMapsWebURL = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${latitude},${longitude}&travelmode=driving`;
  
      // If live tracking enabled → navigate inside app map
      if (bookingInfo?.condition?.live_tracking == 1) {
        navigation.navigate('MyMap', {
          drop_address: bookingInfo?.data?.drop_address,
          pickup_address: bookingInfo?.data?.pickup_address,
          googleMapsWebURL,
          timing: bookingInfo?.condition?.api_timing,
          bookingNumber,
        });
        return;
      }
  
      // Platform-wise handling
      if (Platform.OS === 'ios') {
        const supported = await Linking.canOpenURL('comgooglemaps://');
        if (supported) {
          await Linking.openURL(googleMapsIOSURL);
        } else {
          await Linking.openURL(appleMapsURL);
        }
      } else {
        const supported = await Linking.canOpenURL('geo:');
        if (supported) {
          await Linking.openURL(googleMapsAppURL);
        } else {
          await Linking.openURL(googleMapsWebURL);
        }
      }
    } catch (error) {
      console.error('Error opening Maps:', error);
    } finally {
      setLoaderMap(false);
    }
  };
  
  const handleLogoPress = () => {
    navigation.navigate('TrustedDriver');
  };

  const handleNeedHelpButton = async () => {
    try {
      const response = await GET_BOOKING_STATUS_ID({
        action: 'get-booking-status-id',
        booking_number: bookingNumber,
      });

      if (response?.status_code == '200' && response?.message == 'success') {
        if (response?.popup == '1') {
          setNeedHelpShow(true);
        } else {
          setNeedHelpShow(false);
        }
      } else {
        setNeedHelpShow(false);
      }
    } catch (error) {
    } finally {
    }
  };

  const viewRef = useRef(null); // Reference to the View
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const showPopover = () => {
    if (viewRef.current) {
      viewRef.current.measureInWindow((x, y, width, height) => {
        console.log({x: x, y: y, width, height});
        setPopoverPosition({x: x, y: y + height + 10, width, height}); // y + height se popover neeche show hoga
        setPopoverVisible(true);
      });
    }
  };

  const handlecallPress = async () => {
    try {
      const response = await PARTNER_ONBOOKING_CALL_SUPPORT({
        booking_number: bookingNumber,
        current_language: languageSwitch,
      });
      if (
        response?.status_code == 200 &&
        response?.success_message?.success_message
      ) {
        setPopoverVisible(false);
        Alert.alert('', response?.success_message?.success_message);
      }
    } catch (error) {
      console.error('Error in PARTNER_ONBOOKING_CALL_SUPPORT:', error);
    } finally {
      console.log('PARTNER_ONBOOKING_CALL_SUPPORT execution completed');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
      }}>
      {/* <DutyReportHeader
        extraButton={true}
        showNeedHelp={true}
        showBack={true}
        bookingNumber={bookingNumber}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      /> */}
      {/* header code start */}

      <View
        style={{
          backgroundColor: AppColors.white,
          flexDirection: 'row',
          // elevation: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#00000027',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            backgroundColor: AppColors.white,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Pressable
            onPress={handleLogoPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              marginTop: 10,
            }}>
            <Image
              source={Headerlogo}
              style={{resizeMode: 'contain', height: 70, width: 140}}
            />
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {needHelpShow && (
            <TouchableOpacity
              ref={viewRef}
              onPress={showPopover}
              style={{
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: AppColors.mainColor,
              }}>
              <Text
                style={{
                  padding: 7,
                  fontSize: 12,
                  fontWeight: '500',
                  color: AppColors.white,
                }}>
                {languageSwitch === 'english' ? 'Need Help?' : 'मदद चाहिए?'}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              margin: 5,
              marginRight: 17,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              borderColor: 'rgb(204,204,204)',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: AppColors.black, margin: 5, opacity: 0.8}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* header code end */}

      <Toast visibilityTime={5000} topOffset={50} />
      {mainLoader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} color={AppColors.mainColor} />
        </View>
      ) : cancelState === 'cancel' ? (
        <ScrollView
          style={{marginTop: 30, padding: 10}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              borderColor: 'rgb(128,128,128)',
              backgroundColor: AppColors.white,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 8,
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
        </ScrollView>
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
              {bookingInfo?.data?.booking_type && (
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: bookingInfo?.data?.booking_type_color, // White Text
                    alignSelf: 'center',
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: {width: 3, height: 3},
                    // textDecorationLine:"underline",
                    textShadowRadius: 2,
                    // padding: 10,
                    backgroundColor: bookingInfo?.data?.booking_type_bg,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  {bookingInfo?.data?.booking_type}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={styles.interviewTimeText}>
                  {bookingInfo?.data?.duty_time_heading}{' '}
                  {bookingInfo?.data?.duty_time_text}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setisOpenLanguageModal(true);
                  }}>
                  <Image
                    style={{width: 50, height: 50}}
                    source={require('../assets/images/lan2.png')}
                  />
                </TouchableOpacity>
              </View>
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
            <View style={styles.middleSection}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 10,
                }}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontWeight: '600',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {bookingInfo?.data?.customer_name?.slice(0, 30) ||
                      'Customer'}
                  </Text>
                </View>

                {/* Call Button */}
                {callIconLoader ? (
                  <ActivityIndicator
                    color={AppColors.mainColor}
                    style={{left: -10}}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: AppColors.white,
                      borderRadius: 20,
                      overflow: 'hidden',
                      elevation: 5,
                      marginHorizontal: 5,
                    }}
                    onPress={() =>
                      openPhoneDialer(bookingInfo?.data?.circle_phone)
                    }>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={CallingGif}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}

                {bookingInfo?.condition?.chat_dynamic_key == '1' ? (
                  <TouchableOpacity
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: AppColors.mainColor,
                      borderRadius: 20,
                      overflow: 'hidden',
                      elevation: 5,
                      borderColor: AppColors.mainColor,
                      borderWidth: 0.5,
                      marginHorizontal: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('ChatScreen', {bookingNumber})
                    }>
                    <MaterialCommunityIcons
                      name="message-outline"
                      size={20}
                      color={AppColors.white}
                    />
                  </TouchableOpacity>
                ) : null}

                <View style={{marginLeft: 10}}>
                  <Text style={{color: AppColors.black, fontWeight: '500'}}>
                    {bookingInfo?.data?.way_type}
                  </Text>
                </View>
              </View>

              {/* <View style={styles.addressCallContainer}>
                <View style={{flex: 1}}>
                  {bookingInfo?.data?.pickup_address && (
                    <TouchableOpacity
                      onPress={() => {
                        Clipboard.setString(bookingInfo?.data?.pickup_address);
                        ToastAndroid.show(
                          'Address copied!',
                          ToastAndroid.SHORT,
                        );
                        openOnlyMap(bookingInfo?.data?.c_latlong); // Map open karne ka function
                      }}
                      // onLongPress={() => {
                      //   Clipboard.setString(bookingInfo?.data?.pickup_address);
                      //   ToastAndroid.show('Address copied!', ToastAndroid.SHORT);
                      // }}
                      //   onPress={() => openOnlyMap(bookingInfo?.data?.c_latlong)}
                      style={styles.addressContainer}>
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={styles.addressIcon}
                      />
                      <Text style={styles.addressText}>
                        {bookingInfo?.data?.pickup_address}
                      </Text>
                    </TouchableOpacity>
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

                {bookingInfo?.data?.c_latlong && (
                  <View
                    style={{
                      flex: 0.2,
                      alignItems: 'flex-end',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      activeOpacity={0.7}
                      disabled={loaderMap}
                      onPress={() => openMap(bookingInfo?.data?.c_latlong)}>
                      {loaderMap ? (
                        <ActivityIndicator color={AppColors.mainColor} />
                      ) : (
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            transform: [{rotate: '30deg'}],
                          }}
                          source={NavigationIcon}
                          resizeMode="cover"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View> */}

              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Address}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: 'green',
                      marginVertical: 6,
                    }}
                  />
                  {bookingInfo?.data?.drop_address && (
                    <>
                      <View
                        style={{
                          width: 2,
                          height: 30,
                          borderStyle: 'dotted',
                          borderWidth: 1,
                          borderRadius: 1,
                          borderColor: AppColors.mainColor,
                          marginVertical: 2,
                        }}
                      />
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: AppColors.red,
                          marginVertical: 6,
                        }}
                      />
                    </>
                  )}
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  {bookingInfo?.data?.pickup_address && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 6,
                      }}>
                      <Text
                        onPress={() => {
                          Clipboard.setString(
                            bookingInfo?.data?.pickup_address,
                          );
                          ToastAndroid.show(
                            'Address copied!',
                            ToastAndroid.SHORT,
                          );
                          openOnlyMap(bookingInfo?.data?.c_latlong);
                        }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          marginRight: 8,
                          color: AppColors.black,
                        }}>
                        {bookingInfo?.data?.pickup_address}
                      </Text>
                      {bookingInfo?.data?.c_latlong &&
                        bookingInfo?.condition?.next_booking_status_id <= 25 &&
                        (loaderMap ? (
                          <ActivityIndicator
                            size="small"
                            color={AppColors.mainColor}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              openMap(bookingInfo?.data?.c_latlong)
                            }
                            style={{
                              width: 24,
                              height: 24,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={NavigationIcon}
                              resizeMode="contain"
                              style={{
                                width: '100%',
                                height: '100%',
                                transform: [{rotate: '30deg'}],
                              }}
                            />
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}

                  {bookingInfo?.data?.drop_address && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 6,
                      }}>
                      <Text
                        onPress={() => {
                          Clipboard.setString(bookingInfo?.data?.drop_address);
                          ToastAndroid.show(
                            'Address copied!',
                            ToastAndroid.SHORT,
                          );
                          openOnlyMap(bookingInfo?.data?.drop_latlong);
                        }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          marginRight: 8,
                          color: AppColors.black,
                        }}>
                        {bookingInfo?.data?.drop_address}
                      </Text>
                      {bookingInfo?.data?.drop_latlong &&
                        bookingInfo?.condition?.next_booking_status_id > 25 &&
                        (loaderMap ? (
                          <ActivityIndicator
                            size="small"
                            color={AppColors.mainColor}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              openMap(bookingInfo?.data?.drop_latlong)
                            }
                            style={{
                              width: 24,
                              height: 24,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={NavigationIcon}
                              resizeMode="contain"
                              style={{
                                width: '100%',
                                height: '100%',
                                transform: [{rotate: '30deg'}],
                              }}
                            />
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
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

              {bookingInfo && (
                <SwipeableButton
                  onSwipe={handleSwipe}
                  data={bookingInfo?.condition}
                />
              )}

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
      {/* center modal */}
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
        animationType="fade"
        visible={modalVisibleOntheway}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 24,
          }}>
          <View
            style={{
              borderRadius: 20,
              width: '100%',
              backgroundColor: AppColors.white,
              padding: 28,
              borderWidth: 2,
              borderColor: AppColors.mainColor,
              elevation: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 0.15,
              shadowRadius: 18,
              position: 'relative',
            }}>
            {loader ? (
              <ActivityIndicator size="large" color={AppColors.mainColor} />
            ) : (
              <>
                <TouchableOpacity
                  onPress={closeModal}
                  style={{
                    // position: 'absolute',
                    // top: 12,
                    // right: 12,
                    // width: 36,
                    // height: 36,
                    alignSelf: 'flex-end',
                    marginBottom: 20,
                  }}>
                  <Icon name="close" size={20} color={'#999'} />
                </TouchableOpacity>

                <Text
                  style={{
                    color: AppColors.mainColor,
                    fontSize: 22,
                    fontWeight: '900',
                    marginBottom: 18,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}>
                  {popupsData?.popupdata?.ontheway_alert}
                </Text>

                <Image
                  source={OntheWayIcon}
                  style={{
                    width: 64,
                    height: 64,
                    marginBottom: 20,
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    color: AppColors.mainColor,
                    fontSize: 16,
                    fontWeight: '800',
                    marginBottom: 8,
                    textAlign: 'center',
                  }}>
                  {popupsData?.popupdata?.ontheway_alert_h3}
                </Text>

                <Text
                  style={{
                    color: AppColors.black,
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 24,
                    textAlign: 'center',
                  }}>
                  {popupsData?.popupdata?.ontheway_alert_p}
                </Text>

                <TouchableOpacity
                  disabled={loaderOntheWay}
                  onPress={isBookingUpcomming}
                  style={{
                    backgroundColor: AppColors.mainColor,
                    paddingVertical: 12,
                    paddingHorizontal: 28,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    opacity: loaderOntheWay ? 0.6 : 1,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '800',
                    }}>
                    {loaderOntheWay
                      ? 'Please Wait...'
                      : popupsData?.popupdata?.ontheway_alert_btn ||
                        'On The Way'}
                  </Text>
                </TouchableOpacity>
              </>
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
                  onPress={driverBookingReach}>
                  {reachLoader ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: AppColors.white,
                          fontWeight: '600',
                          fontSize: 17,
                        }}>
                        Please Wait ...
                      </Text>
                      <ActivityIndicator
                        size="small"
                        color={AppColors.white}
                        style={{marginLeft: 8}}
                      />
                    </View>
                  ) : locationLoader ? (
                    <Text
                      style={{
                        color: AppColors.white,
                        fontWeight: '600',
                        fontSize: 17,
                      }}>
                      {`${popupsData?.popupdata?.reach_alert_btn} ....`}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: AppColors.white,
                        fontWeight: '600',
                        fontSize: 17,
                      }}>
                      {popupsData?.popupdata?.reach_alert_btn}
                    </Text>
                  )}
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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS == 'ios' ? 'padding' : null}>
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
                <ScrollView keyboardShouldPersistTaps="handled">
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

                  {showImageField && (
                    <TouchableOpacity
                      onPress={handleCameraCapture}
                      activeOpacity={0.8}
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}>
                      <View style={[styles.button]}>
                        {selectedFile ? (
                          <Image
                            source={{uri: selectedFile?.uri}}
                            style={styles.image}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="camera"
                            size={40}
                            color="#16588e"
                          />
                        )}

                        <Text style={styles.text}>
                          {selectedFile ? 'Edit' : 'Upload Image'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

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
                        marginTop: '10%',
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
                        if (
                          popupsData?.popupdata?.start_kms_eligibility == '1'
                        ) {
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
        </KeyboardAvoidingView>
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
                    keyboardType="number-pad"
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

      {/* need help button Modal */}

      {/* <Modal transparent animationType="fade" visible={popoverVisible}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(121, 129, 116, 0.48)'}}
          activeOpacity={1}
          onPress={() => setPopoverVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: popoverPosition.y, // Align with the target view's top
              left: popoverPosition.x - 120, // Position to the left
              width: 110,
              backgroundColor: AppColors.white,
              padding: 10,
              borderRadius: 5,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 5,
                right: -10,
                width: 0,
                height: 0,
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 10,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: AppColors.white, // Matches the popover background
              }}
            />
            <Text style={{color: AppColors.black, fontSize: 15}}>
              Turn It ON.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal> */}

      <Modal transparent visible={popoverVisible} animationType="fade">
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(121, 129, 116, 0.48)'}}
          activeOpacity={1}
          onPress={() => setPopoverVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: popoverPosition.y,
              // left: popoverPosition.x - 200, // Adjust left offset as per design
              width: '70%',
              // width: 160,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              paddingVertical: 10,
              borderRadius: 8,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}>
            {/* Arrow Pointer */}
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: popoverPosition.x,
                width: 0,
                height: 0,
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 10,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#fff',
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setPopoverVisible(false);
                navigation.navigate('TicketsDriver', {bookingNumber});
              }}
              style={{
                flexDirection: 'row', // Row layout
                alignItems: 'center', // Center align items
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 16, color: '#333'}}>Create Ticket</Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: AppColors.white,
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={HelpImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlecallPress();
              }}
              style={{
                flexDirection: 'row', // Row layout
                alignItems: 'center', // Center align items
                paddingVertical: 8,
                paddingHorizontal: 12,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 16, color: '#333'}}>Call Support</Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: AppColors.white,
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={CallingGif}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* endmodalend */}

      {/* Modal to prevent the driver call  */}
      <Modal
        visible={isPreventDriverToCustomerModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setisPreventDriverToCustomerModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              minHeight: 200,
              width: '85%',
              borderRadius: 20,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
            }}>
            {/* Header with title and close button */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                position: 'relative',
              }}>
              {/* Centered Heading */}
              {/* <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#2D3748',
                  textAlign: 'center',
                  flex: 1,
                }}>
                Oops! Something went wrong
              </Text> */}

              {/* Cross Icon in right corner */}
              <TouchableOpacity
                onPress={() => setisPreventDriverToCustomerModal(false)}
                style={{
                  position: 'absolute',
                  right: -8,
                  top: -8,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#F7FAFC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#718096',
                    fontWeight: '600',
                  }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Icon */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#FED7D7',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: '#E53E3E',
                  }}>
                  ⚠️
                </Text>
              </View>
            </View>

            {/* Caption below heading */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 24,
                paddingHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#17181b',
                  textAlign: 'center',
                  lineHeight: 24,
                  fontWeight: '400',
                }}>
                {prventCallData?.alert_message}
              </Text>
            </View>

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}>
              {/* Cancel Button */}
              {/* <TouchableOpacity
                onPress={() => setisPreventDriverToCustomerModal(false)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: '#E2E8F0',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#4A5568',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity> */}

              {/* Try Again Button */}
              <TouchableOpacity
                onPress={() => {
                  // Add your retry logic here
                  setisPreventDriverToCustomerModal(false);
                }}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  shadowColor: AppColors.mainColor,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}>
                  {languageSwitch === 'english' ? 'Got it' : 'समझ गया'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* modal for Booking End Api Error */}

      <Modal
        visible={isShowBookingEndModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: AppColors.white,
              minHeight: 200,
              width: '85%',
              borderRadius: 20,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 10,
            }}>
            {/* Header with title and close button */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                position: 'relative',
              }}>
              {/* Cross Icon in right corner */}
              <TouchableOpacity
                onPress={() => setisShowBookingEndModal(false)}
                style={{
                  position: 'absolute',
                  right: -8,
                  top: -8,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#F7FAFC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#718096',
                    fontWeight: '600',
                  }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Icon */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#FED7D7',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: '#E53E3E',
                  }}>
                  ⚠️
                </Text>
              </View>
            </View>

            {/* Caption below heading */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 24,
                paddingHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#17181b',
                  textAlign: 'center',
                  lineHeight: 24,
                  fontWeight: '400',
                }}>
                {bookingEndErrPopupData}
              </Text>
            </View>

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // Add your retry logic here
                  setisShowBookingEndModal(false);
                }}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  backgroundColor: AppColors.mainColor,
                  alignItems: 'center',
                  shadowColor: AppColors.mainColor,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}>
                  {languageSwitch === 'english' ? 'Ok' : 'ठीक है'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <LanguageNewModal
        visible={isOpenLanguageModal}
        onSelect={e => {
          // console.log(e, 'oiuytr');
        }}
        onClose={() => {
          setisOpenLanguageModal(false);
        }}
        onConfirm={() => {
          setisOpenLanguageModal(false);
        }}
        selectedLanguage={languageSwitch}
      />
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
  // addressContainer: {
  //   flexDirection: 'row',
  //   marginVertical: 8,
  // },

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
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d9d8d4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#fff',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    opacity: 0.8,
    alignSelf: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 15,
    color: '#16588e',
    fontSize: 13,
    fontWeight: 'bold',
    fontWeight: '800',
  },
});
