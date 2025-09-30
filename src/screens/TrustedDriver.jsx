import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Linking,
  RefreshControl,
  Platform,
  Image,
  Modal,
  AppState,
  Alert,
  Pressable,
  Animated,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
// import {findNodeHandle, UIManager} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';
import OtrModal from '../components/modal/OtrModal';
import RatingModal from '../components/modal/RatingModal';
import BookingModal from '../components/modal/BookingModal';
import BookingView from '../components/BookingView';
import TrainingVideo from '../components/TrainingVideos';
import MyBookingAgencyModal from '../components/modal/MyBookingAgencyModal';
import messaging from '@react-native-firebase/messaging';
import MyBookingModal from '../components/MyBookingModal';
import DeviceInfo from 'react-native-device-info';
import {AppFont} from '../assets/FontsFamily';
import ToggleButton from '../components/modal/ToggleButton';
import Geolocation from '@react-native-community/geolocation';
import TimerIcon from 'react-native-vector-icons/Ionicons';
import ScreenGuardModule from 'react-native-screenguard';
import YoutubePlayer from 'react-native-youtube-iframe';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  ALL_TEN_MINUTE_STATUS_UPDATE,
  CHECK_PREMIUM_DRIVER_ELIGIBLE,
  DRIVER_AVAILABLE_TEN_MINUTES,
  DRIVER_FAQ,
  DRIVER_HEADLINE,
  DRIVER_NOTICE,
  DRIVER_NOTIFICATION,
  DRIVER_TRAINING_VIDEOS,
  EXPRESS_BOOKING_POPUP,
  GET_ALL_AVAILABILITY,
  GET_FCM_TOKEN,
  GET_LOCALSE_BUTTON_SHOWING,
  GET_TRUSTED_DRIVER_AWARENESS_VIDEOS,
  LOCALSE_ON_CALL_SUPPORT,
  LOGIN_BUTTON,
  ON_DEMAND_BOOKING,
  PARTNER_ONBOOKING_CALL_SUPPORT,
  PERMANENT_SUBSCRIPTION_VIEW,
  SAVE_DEVICE_INFO,
  TEN_MINUTE_AVAILABLE_CLICK_POPUP,
  TEN_MINUTE_STATUS_OFF,
  UPDATE_POPUP,
  UPDATE_TRIGGER_FIVE_STAR_RATING_POPUP,
} from '../apis/Apis';
import ExpressBookingModal from '../components/modal/ExpressBookingModal';
import {
  checkBatteryOptimization,
  requestLocationPermission,
  requestNotificationPermission,
} from '../utils/permissions';
import {
  setBookingModal,
  setExpressBookingModal,
  setIsNeedHelpShow,
  setIsPremiumDriverElegibleErr,
  setModalVisible,
  setMyBookingAgencyModal,
  setMyBookingModal,
  setPremiumDriverBookingAcceptErr,
  setRatingModal,
  setVideosContent,
} from '../redux/slices/trustedDriverSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  resetUserAuthState,
  setUserAuthStates,
} from '../redux/slices/userAuthSlice';
import {
  Agent_Icon,
  AppLogo,
  CallingGif,
  Headerlogo,
  HelpImage,
  PremiumDriver,
  TrustedPartner,
} from '../assets/images';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  setCurrentView,
  setDriverConsentData,
  setLoginStatus,
  setRefreshKey,
} from '../redux/slices/globalSlice';
import {check} from 'react-native-permissions';
import axios from 'axios';
import RfdToggleSwitch from '../components/RfdToggleSwitch';
import SlideupModal from '../components/modal/SlideUpModal';
const {width, height} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const TrustedDriver = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [popupData, setPopupData] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [fcmtoken, setFcmToken] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [upadatePopupData, setUpdatePopupData] = useState({});
  const [videoCount, setVideoCount] = useState('');
  const [homeNotificationData, setHomeNotificationData] = useState({});
  const [homeNoticeData, setHomeNoticeData] = useState({});
  const [expressPopupData, setExpressPopupData] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const appType = Platform.OS;
  const [isSelected, setIsSelected] = useState(false);
  const [modalVisibleTenMinutes, setModalVisibleTenMinutes] = useState(false);
  const [showTenMinuteButton, setShowTenMinute] = useState(false);
  const [location, setLocation] = useState();
  const [tenMinuteModalData, setTenMinuteModalData] = useState();
  const [confirmTenMinuteModal, setConfirmTenMinuteModal] = useState({});
  const [tenMinuteAcceptLoader, setTenMinuteAcceptLoader] = useState(false);
  const [confirmTenMinuteLoader, setConfirmTenMinuteLoader] = useState(null);
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const [screenAccess, setScreenAccess] = useState(false);
  const [loaderPremium, setLoaderPremium] = useState(false);
  const [showLocalseButton, setShowLocalseButton] = useState(false);
  const [callSupportModal, setCallSupportModal] = useState(false);
  const [localseNewModal, setLocalseNewModal] = useState(false);
  const [localseData, setLocalseData] = useState({});
  const noticeTimerRef = useRef(null);
  const [secondsNotice, setSecondsNotice] = useState(0);
  const [loaderRfd, setLoaderRfd] = useState(false);
  const [awarenessVideo, setAwarenessVideo] = useState([]);
  const [fiveStarRatingModal, setFiveStarRatingModal] = useState(false);
  const [driverImage, setDriverImage] = useState('');
  const [fiveStarBookingNumber, setFiveStarBookingNumber] = useState('');
  const trustedRef = useRef(null);
  const [isDriverLogutModalShow, setisDriverLogutModalShow] = useState(false);
  const premiumDriverBookingAcceptErr = useSelector(
    e => e?.trustedDriverSlice?.premiumDriverBookingAcceptErr,
  );
  const isPremiumDriverElegibleErr = useSelector(
    e => e?.trustedDriverSlice?.isPremiumDriverElegibleErr,
  );
  // console.log(premiumDriverBookingAcceptErr)
  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );

  const [allTripType, setAllTripType] = useState([
    {
      label: 'Incity Roundtrip',
      value: false,
      way: 2,
      action: 'Incity',
    },
    {
      label: 'Incity Oneway',
      value: false,
      way: 1,
      action: 'Incity',
    },
    {
      label: 'Outstation Roundtrip',
      value: false,
      way: 2,
      action: 'Outstation',
    },
    {
      label: 'Outstation Oneway',
      value: false,
      way: 1,
      action: 'Outstation',
    },
  ]);

  const [tenMinLoader, settenMinLoader] = useState(false);
  const handleTenMinuteButton = async () => {
    const isBatteryDisable = await checkBatteryOptimization();

    const hasPermission = await check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission && isBatteryDisable) {
      const loc = await getLocation();
      if (loc) {
        settenMinLoader(true);
        setLocation(loc);
        getAllAvailability();
      } else {
        getLocation();
      }
    } else {
      setModalVisibleTenMinutes(false);
    }
  };

  const getLocation = async () => {
    // console.log('Running getLocation...');

    const hasPermission = await requestLocationPermission();
    // console.log('Permission check result:', hasPermission);

    if (hasPermission) {
      // console.log('Permission granted, fetching location...');

      return new Promise((resolve, reject) => {
        // console.log('Inside Promise...');

        Geolocation.getCurrentPosition(
          position => {
            // console.log('Location fetched successfully:', position);
            // setLocation(position.coords);
            // settenMinLoader(false);
            resolve(position.coords);
          },
          error => {
            // console.log('Location error:', error);
            // settenMinLoader(false);

            if (error.code === 1) {
              // console.log('Permission denied, requesting again...');
              requestLocationPermission();
            } else if (error.code === 2) {
              // console.log('Location services are OFF, showing alert...');

              Alert.alert(
                'Location Service Disabled',
                'Please enable location services to proceed.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      setLoaderRfd(false);
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Open Setting',
                    onPress: () => {
                      Linking.sendIntent(
                        'android.settings.LOCATION_SOURCE_SETTINGS',
                      ); // Opens phone's location settings
                      setLoaderRfd(false);
                    },
                  },
                ],
              );
            } else {
              // console.log('Unhandled location error:', error.message);
              reject(new Error('Error fetching location: ' + error.message));
            }
          },
        );
        // console.log('Geolocation request initiated...');
      });
    } else {
      // console.log('Permission denied, exiting getLocation...');
    }
  };

  const isFcmSent = useSelector(e => e?.userAuth?.isFcmSent);
  const isRfdOn = useSelector(state => state.globalSlice.loginStatus);
  const isDeviceInfo = useSelector(e => e?.userAuth?.isDeviceInfo);
  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const refreshKey = useSelector(state => state?.globalSlice?.refreshKey);
  const jwt = useSelector(e => e?.userAuth?.jwt);

  const openConfirmTenMinuteApplyPopUp = async (data, index) => {
    setConfirmTenMinuteLoader(index);

    if (data?.value) {
      try {
        const response = await TEN_MINUTE_STATUS_OFF({
          action: 'active_status_update_one',
          product_type: data?.action,
          way: data?.way,
          current_language: languageSwitch,
        });

        setAllTripType(prevTripTypes =>
          prevTripTypes.map(trip =>
            trip.label === data.label ? {...trip, value: false} : {...trip},
          ),
        );
      } catch (error) {
      } finally {
        setConfirmTenMinuteLoader(null);
      }
    } else {
      try {
        const response = await TEN_MINUTE_AVAILABLE_CLICK_POPUP({
          product_type: data?.action,
          way: data?.way,
        });

        setTenMinuteModalData(response);

        if (response?.status_code == 200) {
          setConfirmTenMinuteModal({
            visible: true,
            key: data,
          });
        }
      } catch (error) {
      } finally {
        setConfirmTenMinuteLoader(null);
      }
    }
  };

  const sendDriverAvailableInTenMinutes = async data => {
    setTenMinuteAcceptLoader(true);
    try {
      const response = await DRIVER_AVAILABLE_TEN_MINUTES({
        action: 'insert_availability',
        latitude: location?.latitude,
        longitude: location?.longitude,
        product_type: data?.action,
        way: data?.way,
      });

      setAllTripType(prevTripTypes =>
        prevTripTypes.map(trip =>
          trip.label === data.label ? {...trip, value: true} : {...trip},
        ),
      );
      if (response.status_code == 200) {
        setConfirmTenMinuteModal({});
        // setModalVisibleTenMinutes(false);
      }
    } catch (error) {
      setTenMinuteAcceptLoader(false);
    } finally {
      setTenMinuteAcceptLoader(false);
    }
  };

  const getAllAvailability = async () => {
    if (isSelected) {
      try {
        const response = await ALL_TEN_MINUTE_STATUS_UPDATE({
          action: 'active_status_update',
          current_language: languageSwitch,
        });

        if (response?.status_code == 200) {
          setIsSelected(false);
          setAllTripType(prevState =>
            prevState.map(trip => ({
              ...trip,
              value: false,
            })),
          );
        }
      } catch (error) {
      } finally {
        settenMinLoader(false);
      }
    } else {
      try {
        const response = await GET_ALL_AVAILABILITY(languageSwitch);

        if (response?.ten_minutes_poupup_view == '1') {
          setModalVisibleTenMinutes(true);
          setIsSelected(true);
        } else {
          if (
            response?.application_success_message &&
            response?.application_success_message?.length !== 0
          ) {
            setIsSelected(false);
            Alert.alert('', response?.application_success_message, [
              {text: 'OK', onPress: () => getHeadlineData()},
            ]);
          } else {
            setIsSelected(true);
            navigation.navigate('TenMinuteDriverApply', {data: response});
          }
        }
        setAllTripType(prevTripTypes =>
          prevTripTypes.map(trip => {
            if (trip.label === 'Incity Oneway') {
              return {...trip, value: response?.incity_oneway_flag == 1};
            }
            if (trip.label === 'Incity Roundtrip') {
              return {...trip, value: response?.incity_roundtrip_flag == 1};
            }
            if (trip.label === 'Outstation Oneway') {
              return {...trip, value: response?.outstation_oneway_flag == 1};
            }
            if (trip.label === 'Outstation Roundtrip') {
              return {...trip, value: response?.outstation_roundtrip_flag == 1};
            }
            return trip;
          }),
        );
      } catch (error) {
      } finally {
        settenMinLoader(false);
      }
    }
  };

  const [deviceInfo, setDeviceInfo] = useState({
    action: 'save_device_info',
    manufacturer: '',
    model: '',
    deviceName: '',
    systemName: '',
    systemVersion: '',
    appVersion: '',
    buildNumber: '',
    isTablet: '',
    deviceOS: appType,
  });

  const toggleButton = useSelector(
    state => state?.trustedDriverSlice?.toggleButton,
  );
  const expressBookingModal = useSelector(
    state => state?.trustedDriverSlice?.expressBookingModal,
  );
  const mainToggleContent = useSelector(
    state => state?.trustedDriverSlice?.mainToggleContent,
  );
  const videosContent = useSelector(
    state => state?.trustedDriverSlice?.videosContent,
  );
  const myBookingAgencyModal = useSelector(
    state => state?.trustedDriverSlice?.myBookingAgencyModal,
  );
  const isModalVisible = useSelector(
    state => state?.trustedDriverSlice?.isModalVisible,
  );
  const bookingModal = useSelector(
    state => state?.trustedDriverSlice?.bookingModal,
  );
  const ratingModal = useSelector(
    state => state?.trustedDriverSlice?.ratingModal,
  );
  const myBookingModal = useSelector(
    state => state?.trustedDriverSlice?.myBookingModal,
  );
  const appVersion = DeviceInfo.getVersion();

  useFocusEffect(
    useCallback(() => {
      getHeadlineData();
      getLocalseButton();
      getHomeNotification();
      getHomeNotice();
      // if (isRfdOn) {
      getPopup();
      getAllOndemandBookings();
      getPermanentSubscriptionBooking();
      getAllTrustedData();
      // }
      getUpdatePopup();
      return () => {};
    }, []),
  );

  // Handle when the app comes to the foreground
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        getHeadlineData();
        getLocalseButton();
        getHomeNotification();
        getHomeNotice();
        getUpdatePopup();
        // if (isRfdOn) {
        getAllOndemandBookings();
        getPermanentSubscriptionBooking();

        // }
        getAllTrustedData();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // console.log(languageSwitch)
  useEffect(() => {
    if (jwt) {
      if (isRfdOn) {
        getPopup();
      }
      getHeadlineData();
      getLocalseButton();
      // if (isRfdOn) {
      getAllOndemandBookings();
      getPermanentSubscriptionBooking();
      // }
      getAllTrustedData();
      getAwarenessVideo();
      getHomeNotification();
      getHomeNotice();
    }
  }, [languageSwitch, refreshKey, isRfdOn]);

  const openMyUrl = url => {
    Linking.openURL(url).then(() => {});
  };

  useEffect(() => {
    if (!isFcmSent) getFcmToken();
    if (!isDeviceInfo) fetchDeviceInfo();
  }, []);

  // const currentRoute = route?.name;

  const handlePressPremiumDriver = async () => {
    if (isRfdOn) {
      setLoaderPremium(true);

      try {
        // Fetch update popup data
        // navigation.navigate('PremiumDriverRegistrationProcess');
        // navigation.navigate('PremiumDriver');

        // return false
        const response = await CHECK_PREMIUM_DRIVER_ELIGIBLE({
          action: 'premium-diver-eligible',
          current_language: languageSwitch,
        });

        if (response?.status_code == 200) {
          if (response?.registration_premium == '1') {
            navigation.navigate('PremiumDriverRegistrationProcess');
          } else {
            navigation.navigate('PremiumDriver');
          }

          // if (response?.eligible == '0') {
          //   dispatch(setPremiumDriverBookingAcceptErr(''));
          //   setTimeout(() => {
          //     dispatch(setIsPremiumDriverElegibleErr(response?.message));
          //   });
          //   // Alert.alert('', response?.message);
          // } else if (
          //   response?.eligible == '1' &&
          //   response?.message == 'success'
          // ) {
          //   if (response?.registration_premium == '1') {
          //     navigation.navigate('PremiumDriverRegistrationProcess');
          //   } else {
          //     navigation.navigate('PremiumDriver');
          //   }
          // }
        } else {
          navigation.navigate('TrustedDriver');
        }
      } catch (error) {
      } finally {
        setLoaderPremium(false);
      }
    } else {
      showPopover();
    }
  };
  // useEffect(() => {
  //   getFcmToken();
  // }, []);
  const getFcmToken = async () => {
    try {
      let tokenvalue = null;

      if (Platform.OS === 'ios') {
        // Register for remote messages
        await messaging().registerDeviceForRemoteMessages();
        console.log(
          'registerDeviceForRemoteMessagesregisterDeviceForRemoteMessagesregisterDeviceForRemoteMessages',
        );

        // Request permission for push notifications
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          return;
        }

        // Check APNS token
        // messaging().setAPNSToken('SIMULATOR_TEST_TOKEN');
        const apnsToken = await messaging().getAPNSToken();
        console.log(apnsToken, 'APMSNSSN');

        if (!apnsToken) {
          return;
        }

        // Fetch FCM token
        tokenvalue = await messaging().getToken();
        console.log(tokenvalue);
      } else {
        requestNotificationPermission();
        // Fetch FCM token for Android
        tokenvalue = await messaging().getToken();
      }

      if (tokenvalue) {
        setFcmToken(tokenvalue);
        saveFcmToken(tokenvalue);
      } else {
      }
    } catch (error) {}
  };

  const fetchDeviceInfo = async () => {
    try {
      // Fetch device information
      const manufacturer = await DeviceInfo.getBrand();
      const model = DeviceInfo.getModel();
      const deviceName = await DeviceInfo.getDeviceName();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();
      const appVersion = DeviceInfo.getVersion();
      const buildNumber = DeviceInfo.getBuildNumber();
      const isTablet = DeviceInfo.isTablet();
      const deviceOS = Platform.OS;

      // Consolidate device info
      const fetchedDeviceInfo = {
        action: 'save_device_info',
        manufacturer,
        model,
        deviceName,
        systemName,
        systemVersion,
        appVersion,
        buildNumber,
        isTablet,
        deviceOS,
      };

      // Update state with device info
      setDeviceInfo(fetchedDeviceInfo);
      // Send device info if all properties are valid
      if (
        Object.values(fetchedDeviceInfo).every(
          value => value !== undefined && value !== null,
        )
      ) {
        await sendDeviceInfo(fetchedDeviceInfo);
      }
    } catch (error) {}
  };

  const sendDeviceInfo = async deviceInfo => {
    try {
      const response = await SAVE_DEVICE_INFO(deviceInfo);
      dispatch(
        setUserAuthStates({
          key: 'isDeviceInfo',
          value: true,
        }),
      );
    } catch (error) {}
  };

  const onRefreshfetchData = async () => {
    try {
      await getHeadlineData();
      await getLocalseButton();
      await getHomeNotification();
      await getHomeNotice();
      await getAllTrustedData();
      // if(videosContent){
      //   getTrainingVideo();
      // }
      // if (isRfdOn) {
      await getAllOndemandBookings();
      await getPermanentSubscriptionBooking();
      dispatch(setRefreshKey());
      // }
    } catch (error) {
      // Handle error if needed
    } finally {
    }
  };

  const getUpdatePopup = async () => {
    try {
      // Fetch update popup data
      const response = await UPDATE_POPUP({
        app_type: appType,
        user_type: 'Driver',
      });
      // console.log(response,"ertyuio")
      if (response?.app_details) {
        const {version, force_update, app_url} = response?.app_details;

        if (parseFloat(appVersion) < parseFloat(version)) {
          setUpdateModal(true);
          if (force_update == '1' && app_url) {
            openMyUrl(app_url);
            setUpdateModal(false);
          }
        }
      }
      // Set the update popup data
      setUpdatePopupData(response);
    } catch (error) {}
  };

  const saveFcmToken = async fcmtoken => {
    const response = await GET_FCM_TOKEN({
      fcm_token: fcmtoken,
      action: 'save_fcm',
    });
    if (response?.status_code == 200) {
      dispatch(
        setUserAuthStates({
          key: 'isFcmSent',
          value: true,
        }),
      );
    }
  };

  const [headLineData, setHeadLineData] = useState({});

  const [loginMessage, setLoginMessage] = useState('');
  const [loginButton, setLoginButton] = useState({
    action: 'login_button',
    submitR: '1',
    rfd: '0',
  });

  const handleToggleButton = async () => {
    // Toast.show({type: 'error', text1: 'Location permission is required'});
    // navigation.navigate('DriverDocumentsUploads');
    // return
    setLoaderRfd(true);
    try {
      const newRfdValue = isRfdOn ? '0' : '1';

      let updatedLoginButton = {
        ...loginButton,
        rfd: newRfdValue,
        current_language: languageSwitch,
      };

      if (newRfdValue == '1') {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          Toast.show({type: 'error', text1: 'Location permission is required'});
          setLoaderRfd(false);
          return;
        }

        const location = await getLocation();
        console.log(location, 'LOCATION SENDING FROM RFD');
        if (location?.latitude && location?.longitude) {
          updatedLoginButton.latitude = location?.latitude;
          updatedLoginButton.longitude = location?.longitude;
        }
      }

      const response = await LOGIN_BUTTON(updatedLoginButton);
      console.log(response, 'api dat of rfd');

      if (response?.rfd == '1') {
        dispatch(setLoginStatus(true));
        dispatch(setVideosContent(false));
      } else {
        dispatch(setLoginStatus(false));
      }
      if (response?.message?.length <= 30 && response?.message) {
        setLoginMessage('');
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      } else {
        setLoginMessage(response?.message || '');
        setTimeout(() => setLoginMessage(''), 5000);
      }

      if (response?.redirect) {
        switch (response.redirect) {
          case 'agent-kyc':
            navigation.navigate('AgentKyc', {
              redirect: 'Trusted',
            });
            break;
          case 'clear-my-due-payment-overtime':
            navigation.navigate('ClearMyDuePaymentOvertime');
            break;
          case 'clear-my-due-payment':
            navigation.navigate('CmdRoutes');
            break;
          case 'driver-training-module':
            navigation.navigate('DriverTrainingModulePhaseOne');
            break;
          case 'trusted-driver':
            navigation.navigate('TrustedDriver');
            break;
          case 'adhaar-verification':
            navigation.navigate('AadharVerification');
            break;
          case 'reference-verification':
            navigation.navigate('CompleteVerification');
            break;
          case 'documents-verification':
            navigation.navigate('DriverDocumentsUploads');
            break;
          default:
            openMyUrl(response?.url);
            break;
        }
        // return;
      }
    } catch (error) {
      setLoaderRfd(false);
    } finally {
      setLoaderRfd(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [allOndemandBookings, setAllOndemandBookings] = useState({});
  const [
    permanentSubscriptionBookingData,
    setPermanentSubscriptionBookingData,
  ] = useState([]);
  const [allTrustedData, setAllTrustedData] = useState({});

  const getAllOndemandBookings = async () => {
    setLoading(true);
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'ondemand_bookings',
        current_language: languageSwitch,
      });
      console.log(response, 'ONNN');

      setAllOndemandBookings(response);
    } catch (error) {
      console.log(error, 'ONN');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getPermanentSubscriptionBooking = async () => {
    return false;
    try {
      const response = await PERMANENT_SUBSCRIPTION_VIEW();
      setPermanentSubscriptionBookingData(response?.data);
    } catch (error) {
      console.error(
        'Error in getPermanentSubscriptionBooking:',
        error?.message || error,
      );
    } finally {
    }
  };

  const getAllTrustedData = async () => {
    setLoading(true);
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'trusted_other_data',
        current_language: languageSwitch,
      });
      // console.log(response)
      setAllTrustedData(response);
      dispatch(
        setDriverConsentData(response?.ondemand_driver_consent_popup_data),
      );
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getPopup = async () => {
    try {
      const response = await EXPRESS_BOOKING_POPUP({
        action: 'check_popup',
        current_language: languageSwitch,
      });

      if (!response) {
        console.log('Response is undefined or null');
        return;
      }
      setExpressPopupData(response?.popup_data);
      if (response.express_booking_popup_flag == 1) {
        dispatch(setExpressBookingModal(true));
        setPopupData(response.express_booking_popup_flag);
      } else {
        dispatch(setExpressBookingModal(false));
      }
    } catch (error) {}
  };

  const getLocalseButton = async () => {
    try {
      const response = await GET_LOCALSE_BUTTON_SHOWING({
        action: 'localse-awareness-partner-registration',
        current_language: languageSwitch,
        app_type: appType,
      });
      if (response?.status_code == 200) {
        if (response?.showmodal == 1) {
          setCallSupportModal(true);
        } else if (response?.showmodal == 0) {
          setCallSupportModal(false);
        } else {
          setCallSupportModal(false);
        }
        if (response?.buttonshow == 1) {
          setShowLocalseButton(true);
        } else if (response?.buttonshow == 0) {
          setShowLocalseButton(false);
        } else {
          setShowLocalseButton(false);
        }
        setLocalseData(response);
      }
    } catch (error) {
      // console.error('Error in getLocalseButton:', error);
    }
  };

  const getHeadlineData = async () => {
    try {
      const response = await DRIVER_HEADLINE({
        current_language: languageSwitch,
      });

      setHeadLineData(response);
      if (
        response?.driver_panel_messages
          ?.redirect_to_website_trusted_driver_flag == '1'
      ) {
        openMyUrl(
          response?.driver_panel_messages
            ?.redirect_to_website_trusted_driver_url,
        );
      }

      if (response?.driver_panel_messages?.driver_screen_access == '1') {
        setScreenAccess(true);
      } else {
        setScreenAccess(false);
      }

      if (
        response?.driver_panel_messages?.ten_minute_my_active_booking_flag == 1
      ) {
        navigation.navigate('DutyReportUpdate', {
          bookingNumber:
            response?.driver_panel_messages
              ?.ten_minute_my_active_booking_number,
          state: '',
        });
      }

      if (response?.driver_panel_messages?.rfd == '1') {
        dispatch(setLoginStatus(true));
        dispatch(setVideosContent(false));
      } else {
        dispatch(setLoginStatus(false));
      }

      if (response?.driver_panel_messages?.ten_minutes_access == '1') {
        setShowTenMinute(true);
      } else {
        setShowTenMinute(false);
      }

      if (response?.driver_panel_messages?.driver_in_10minutes_flag == '1') {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }

      if (response?.driver_panel_messages?.driver_notification_flag == '1') {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
      if (response?.driver_panel_messages?.driver_awareness_flag == '1') {
        setShowNotice(true);
      } else {
        setShowNotice(false);
      }
      if (response?.driver_panel_messages?.need_help_button == '1') {
        dispatch(setIsNeedHelpShow(true));
        setShowNeedHelp(true);
      } else {
        dispatch(setIsNeedHelpShow(false));
        setShowNeedHelp(false);
      }
      setVideoCount(response?.driver_panel_messages?.training_video_unseen);

      if (response?.driver_panel_messages?.Show_trigger_5star_popup == '1') {
        setFiveStarRatingModal(true);
      } else {
        setFiveStarRatingModal(false);
      }
      if (response?.driver_panel_messages?.driver_photo_src) {
        setDriverImage(response?.driver_panel_messages?.driver_photo_src);
      } else {
        setDriverImage('');
      }
      if (
        response?.driver_panel_messages?.Show_trigger_5star_popup_booking_number
      ) {
        setFiveStarBookingNumber(
          response?.driver_panel_messages
            ?.Show_trigger_5star_popup_booking_number,
        );
      } else {
        setFiveStarBookingNumber('');
      }
    } catch (error) {}
  };

  const getHomeNotification = async () => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline_update',
        current_language: languageSwitch,
      });
      setHomeNotificationData(response);
    } catch (error) {
      console.log('Error fetching notification:', error);
    }
  };

  const startTimerNotice = () => {
    if (noticeTimerRef.current) clearInterval(noticeTimerRef.current);
    noticeTimerRef.current = setInterval(() => {
      setSecondsNotice(prev => {
        if (prev <= 1) {
          clearInterval(noticeTimerRef.current);
          noticeTimerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (noticeTimerRef.current) {
      clearInterval(noticeTimerRef.current);
      noticeTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const formatTime = seconds => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const getHomeNotice = async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_one_awareness',
        current_language: languageSwitch,
      });
      setHomeNoticeData(response);
      setSecondsNotice(response?.awareness?.showing_time || 10);
      startTimerNotice();
    } catch (error) {}
  };

  const onRefresh = async () => {
    const startTime = performance.now();
    setRefreshing(true);
    try {
      await getUpdatePopup();
      await getHeadlineData();
      await getAwarenessVideo();
      await getLocalseButton();
    } catch (error) {
      // Handle error if needed
      setRefreshing(false);
    } finally {
      setRefreshing(false);
      const endTime = performance.now(); // End time measurement
      const duration = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    }
  };

  // return false
  const insets = useSafeAreaInsets();

  const combinedText = [
    headLineData?.headlines_data?.message,
    headLineData?.document_data?.message !== 'No action required.'
      ? headLineData?.document_data?.message
      : '',
    ...(headLineData?.headlines_data?.headlines || []),
  ]
    .filter(Boolean)
    .join(' ');

  const clickStoreHomeNotification = async id => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'read_notification',
        headline_id: id,
        current_language: languageSwitch,
      });

      getHomeNotification();
      getHeadlineData();
    } catch (err) {}
  };

  const clickStoreHomeNotice = async id => {
    // return false;
    try {
      const response = await DRIVER_NOTICE({
        action: 'read_awareness_notice',
        awareness_id: id,
        current_language: languageSwitch,
      });

      getHomeNotice();
      getHeadlineData();
    } catch (err) {}
  };

  const getTrainingVideo = async () => {
    try {
      const response = await DRIVER_TRAINING_VIDEOS(languageSwitch);

      if (response?.rfd == '1') {
        dispatch(setLoginStatus(true));
        dispatch(setVideosContent(false));
      } else {
        dispatch(setLoginStatus(false));
        dispatch(setVideosContent(true));
      }
      // dispatch(setTrainingVideoData(response?.response?.training_data));
    } catch (error) {}
  };

  const getAwarenessVideo = async () => {
    try {
      const response = await GET_TRUSTED_DRIVER_AWARENESS_VIDEOS(
        languageSwitch,
      );
      setAwarenessVideo(response?.awareness_video);
    } catch (error) {}
  };

  const showVideoContent = () => {
    dispatch(setVideosContent(true));
    getTrainingVideo();
    setLoginMessage('');
  };

  const viewRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isRfdOn) {
      // Stop any existing animation
      animationRef.current?.stop();

      // Reset the animated value
      animatedValue.setValue(0);

      // Create and start the new loop animation
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );

      animationRef.current.start();
    } else {
      // Stop animation when isRfdOn becomes true
      animationRef.current?.stop();
      animationRef.current = null; // Clear ref
      animatedValue.setValue(0);
    }

    return () => {
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [isRfdOn, dispatch]);

  const animatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const animatedShadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  const animatedStyle = {
    transform: [{scale: animatedScale}],
    shadowColor: 'rgba(59, 130, 246, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: animatedShadowOpacity,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.6)',
    borderRadius: 34,
  };

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const showPopover = async () => {
    if (viewRef.current) {
      // console.log(trustedRef)
      // trustedRef?.current?.scrollToEnd({ animated: true, offset: 0 })
      await trustedRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
      viewRef.current.measureInWindow((x, y, width, height) => {
        console.log({x, y, width, height});
        setPopoverPosition({x, y, width, height});
        setPopoverVisible(true);
      });
    }
  };

  const viewRefNeedHelp = useRef(null); // Reference to the View
  const [popoverVisibleNeedHelp, setPopoverVisibleNeedHelp] = useState(false);
  const [popoverPositionNeedHelp, setPopoverPositionNeedHelp] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const showPopoverNeedHelp = () => {
    if (viewRefNeedHelp.current) {
      viewRefNeedHelp.current.measureInWindow((x, y, width, height) => {
        console.log({x: x, y: y, width, height});
        setPopoverPositionNeedHelp({x, y: y + height + 10, width, height}); // y + height se popover neeche show hoga
        setPopoverVisibleNeedHelp(true);
      });
    }
  };

  const handlecallPress = async () => {
    if (callSupportModal) {
      setPopoverVisibleNeedHelp(false);
      setLocalseNewModal(true);
    } else {
      await submitTatdCallSupport();
    }
  };

  const submitLocalseCallSupport = async () => {
    setPopoverVisibleNeedHelp(false);
    setLocalseNewModal(false);

    try {
      const response = await LOCALSE_ON_CALL_SUPPORT({
        current_language: languageSwitch,
      });

      Alert.alert('', response?.success_message?.success_message);
    } catch (error) {
    } finally {
    }
  };

  const submitTatdCallSupport = async () => {
    try {
      const response = await PARTNER_ONBOOKING_CALL_SUPPORT({
        booking_number: 'noBookingNumber',
        current_language: languageSwitch,
      });
      if (
        response?.status_code == 200 &&
        response?.success_message?.success_message
      ) {
        setPopoverVisibleNeedHelp(false);
        Alert.alert('', response?.success_message?.success_message);
      }
    } catch (error) {
      console.error('Error in PARTNER_ONBOOKING_CALL_SUPPORT:', error);
    } finally {
    }
  };

  const [localseAgentData, setLocalseAgentData] = useState(null);
  const [localseLoading, setLocalseLoading] = useState(false);

  const getRegistredeLocalseStatus = async () => {
    try {
      setLocalseLoading(true);
      console.log('➡️ Sending POST request to API endpoint...');
      const response = await axios.post(
        'http://api.localse.in:5001/api/service_provider/get-localse-registered-status-api',
        {
          mobile: driverMobileNumber,
        },
      );

      const responseData = response?.data;

      if (!responseData) {
        console.warn('⚠️ No data found in response!');
        return;
      }

      if (responseData?.status_code == 200) {
        if (
          responseData?.isRegister == 1 &&
          responseData?.message === 'successfully'
        ) {
          navigation.navigate('LocalseAwarenessAgentRegistration', {
            localseData: localseData,
            data: responseData,
          });
        } else {
          navigation.navigate('LocalseAwarenessPartnerRegistration', {
            localseData: localseData,
          });
        }
      } else {
        navigation.navigate('LocalseAwarenessPartnerRegistration', {
          localseData: localseData,
        });
      }
      setLocalseAgentData(responseData);
    } catch (err) {
      navigation.navigate('LocalseAwarenessPartnerRegistration', {
        localseData: localseData,
      });
    } finally {
      setLocalseLoading(false);
      console.log('🔚 API call completed');
    }
  };

  useEffect(() => {
    if (!screenAccess) {
      ScreenGuardModule.registerWithoutEffect();
    } else {
      ScreenGuardModule.unregister();
    }
  }, [screenAccess]);

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const starAnimations = useRef(
    Array.from({length: 5}, () => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    const animations = starAnimations.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 100), // Stagger the start
          Animated.timing(anim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    animations.forEach(anim => anim.start());
  }, []);

  const updateTriggerFiveStarRatingPopup = async number => {
    setFiveStarRatingModal(false);
    try {
      const response = await UPDATE_TRIGGER_FIVE_STAR_RATING_POPUP({
        booking_id: number,
      });
      getHeadlineData();
    } catch (err) {}
  };

  const [commissionpressData, setcommissionpressData] = useState('');
  const [commissionPressLoader, setcommissionPressLoader] = useState(false);
  const [isShowingCommissionPressModal, setisShowingCommissionPressModal] =
    useState(false);
  const fetchDriverFaq = async () => {
    setcommissionPressLoader(true);
    try {
      const res = await DRIVER_FAQ({
        action: 'driver_faq',
        current_language: languageSwitch,
      });
      setcommissionpressData(res?.faq_data[1]?.faq_answer);
      console.log(res?.faq_data[2]?.faq_answer, 'FAQ DATA');
    } catch (error) {
      console.log(err);
    } finally {
      setcommissionPressLoader(false);
    }
  };
  const showComissionModal = () => {
    setisShowingCommissionPressModal(true);
    fetchDriverFaq();
  };

  return (
    <View style={styles.safeArea}>
      {/* <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      /> */}
      <SafeAreaView style={{flex: 1}}>
        {/* <Header extraButton={true} showNeedHelp={showNeedHelp} />
        {myBookingModal && <MyBookingModal />} */}

        {loaderRfd && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              elevation: 9999,
            }}>
            <ActivityIndicator color={AppColors.mainColor} size="large" />
          </View>
        )}

        <ScrollView
          ref={trustedRef}
          // bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => (onRefresh(), onRefreshfetchData())}
            />
          }>
          {showNotification && homeNotificationData ? (
            <View
              style={{
                flex: 1,
                backgroundColor: AppColors.white,
                padding: 16,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 16,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {homeNotificationData?.headline?.headline_type}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: 20,
                  width: '100%',
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#e9f6ff',
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 16,
                    borderLeftColor: AppColors.mainColor,
                    borderLeftWidth: 5,
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 18,
                      marginBottom: 16,
                    }}>
                    {homeNotificationData?.headline?.message}
                  </Text>

                  {homeNotificationData?.back_btn == '1' ? (
                    <TouchableOpacity
                      onPress={() => [
                        setShowNotification(false),
                        getHeadlineData(),
                      ]}
                      style={{
                        backgroundColor: AppColors.mainColor,
                        opacity: 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {homeNotificationData?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        clickStoreHomeNotification(
                          homeNotificationData?.headline?.id,
                        )
                      }
                      style={{
                        backgroundColor: AppColors.mainColor,
                        opacity: 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: AppColors.white,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {homeNotificationData?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ) : showNotice && homeNoticeData ? (
            <View
              style={{
                flex: 1,
                backgroundColor: AppColors.white,
                // padding: 16,
              }}>
              <View
                style={{
                  backgroundColor: AppColors.mainColor,
                  padding: 16,
                  borderRadius: 8,
                  margin: 16,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {homeNoticeData?.awareness?.subject}
                </Text>
              </View>

              <ToggleButton
                button1Label="Hindi"
                button2Label="English"
                onToggle={label => dispatch(setCurrentView(label))}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: 20,
                  width: '95%',
                  borderRadius: 10,
                  elevation: 5,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#e9f6ff',
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 16,
                    borderLeftColor: AppColors.mainColor,
                    borderLeftWidth: 5,
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 18,
                      marginBottom: 16,
                    }}>
                    {homeNoticeData?.awareness?.description}
                  </Text>
                  {homeNoticeData?.back_btn == '1' ? (
                    <TouchableOpacity
                      disabled={secondsNotice != 0}
                      onPress={() => [setShowNotice(false), getHeadlineData()]}
                      style={{
                        backgroundColor:
                          secondsNotice != 0
                            ? AppColors.greyColor
                            : AppColors.mainColor,
                        opacity: secondsNotice !== 0 ? 0.6 : 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      {secondsNotice == 0 ? (
                        <Text
                          style={{
                            color: AppColors.white,
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {homeNoticeData?.btn_text}
                        </Text>
                      ) : (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TimerIcon
                            name={'timer-outline'}
                            size={25}
                            color={AppColors.black}
                            style={{marginRight: 8}}
                          />
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}>
                            {formatTime(secondsNotice)}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={secondsNotice != 0}
                      onPress={() =>
                        clickStoreHomeNotice(homeNoticeData?.awareness?.id)
                      }
                      style={{
                        backgroundColor:
                          secondsNotice != 0
                            ? AppColors.greyColor
                            : AppColors.mainColor,
                        opacity: secondsNotice !== 0 ? 0.6 : 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 50,
                        marginBottom: 5,
                      }}>
                      {secondsNotice == 0 ? (
                        <Text
                          style={{
                            color: AppColors.white,
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {homeNoticeData?.btn_text}
                        </Text>
                      ) : (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TimerIcon
                            name={'timer-outline'}
                            size={25}
                            color={AppColors.black}
                            style={{marginRight: 8}}
                          />
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}>
                            {formatTime(secondsNotice)}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <>
              {/* <Header extraButton={true} showNeedHelp={showNeedHelp} /> */}

              <View
                style={{
                  backgroundColor: AppColors.white,
                  flexDirection: 'row',
                  // elevation: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#27222212',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: AppColors.white,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <Pressable
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
                  {showNeedHelp && (
                    <TouchableOpacity
                      ref={viewRefNeedHelp}
                      onPress={showPopoverNeedHelp}
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
                        {languageSwitch === 'english'
                          ? 'Need Help?'
                          : 'मदद चाहिए?'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      margin: 5,
                      marginRight: 17,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: AppColors.mainColor,
                    }}>
                    <TouchableOpacity
                      onPress={() => dispatch(setMyBookingModal(true))}>
                      <Text
                        style={{
                          padding: 7,
                          fontSize: 12,
                          fontWeight: '500',
                          color: AppColors.white,
                        }}>
                        {languageSwitch === 'english'
                          ? 'My Bookings'
                          : 'मेरी बुकिंगें'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {myBookingModal && <MyBookingModal />}

              {showTenMinuteButton && (
                <View style={{alignSelf: 'center', marginHorizontal: 10}}>
                  <Pressable
                    disabled={tenMinLoader}
                    onPress={() => handleTenMinuteButton()}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 2,
                      borderColor: AppColors.toggleYellow,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 15,
                      borderRadius: 30,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 4},
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                      elevation: 5,
                      marginVertical: 10,
                      alignSelf: 'center',
                      paddingHorizontal: 30,
                      backgroundColor:
                        isSelected && allTripType.find(e => e?.value)
                          ? AppColors.black
                          : AppColors.toggleGrey,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginRight: 15,
                        color: AppColors.toggleYellow,
                      }}>
                      DRIVER IN 10 MINUTES
                    </Text>
                    {tenMinLoader ? (
                      <ActivityIndicator
                        size={'large'}
                        color={AppColors.toggleYellow}
                      />
                    ) : (
                      <ToggleSwitch
                        isOn={isSelected && allTripType.find(e => e?.value)}
                        onColor={AppColors.toggleYellow}
                        offColor={AppColors.white}
                        thumbOnStyle={{
                          backgroundColor: '#333',
                          shadowColor: 'red',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 10,
                        }}
                        thumbOffStyle={{backgroundColor: '#333'}}
                        size="medium"
                        onToggle={() => handleTenMinuteButton()}
                      />
                    )}
                  </Pressable>
                </View>
              )}

              <View style={styles.mainContainer}>
                {/* Marquee View */}
                {combinedText && (
                  <View style={styles.marqueeView}>
                    <Marquee spacing={20} speed={0.5}>
                      <Text style={styles.marqueeText}>{combinedText}</Text>
                    </Marquee>
                  </View>
                )}
                {/* Middle Container */}
                <View style={styles.middleContainer}>
                  <View style={styles.middleContent}>
                    {/* Top div */}
                    <View style={styles.topView}>
                      <TouchableOpacity
                        style={styles.topLeft}
                        onPress={() => {
                          showComissionModal();
                        }}>
                        <Text style={styles.topLeftText}>
                          {decodedToken &&
                            decodedToken?.DriverCommisonData?.commission}
                          %
                        </Text>
                        <Text style={styles.bottamLeftText}>Commission</Text>
                      </TouchableOpacity>
                      <View style={styles.topRight}>
                        {__DEV__ && (
                          <TouchableOpacity
                            style={{marginEnd: 8}}
                            onPress={() => {
                              setisDriverLogutModalShow(true);
                            }}>
                            <SimpleLineIcons
                              name="logout"
                              size={20}
                              color={'white'}
                            />
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          onPress={() => navigation.navigate('DriverEarning')}>
                          <View style={styles.earningView}>
                            <Text style={styles.rupeeIcon}>
                              <Icon name="rupee" size={responsiveSize(8)} />{' '}
                              {decodedToken &&
                                decodedToken?.DriverCommisonData
                                  ?.earning_30days}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('DriverNotifications')
                          }>
                          <View style={styles.notification}>
                            <Icon
                              color={AppColors.white}
                              size={responsiveSize(22.5)}
                              name="bell"
                            />
                            <Text style={styles.notificationCount}>0</Text>
                          </View>
                        </TouchableOpacity>
                        {/* <View ref={viewRef} style={styles.toggleView}> */}
                        {/* <Animated.View
                          ref={viewRef}
                          style={[styles.toggleView, animatedShadowStyle]}>
                          <RfdToggleSwitch
                            isOn={isRfdOn}
                            onToggle={() => handleToggleButton()}
                            size="medium"
                            activeColor={AppColors.mainColor}
                          />
                        </Animated.View> */}
                        <Animated.View
                          ref={viewRef}
                          style={[
                            styles.toggleView,
                            !isRfdOn ? animatedStyle : styles.staticStyle,
                          ]}>
                          <RfdToggleSwitch
                            isOn={isRfdOn}
                            onToggle={handleToggleButton}
                            size="medium"
                            activeColor={AppColors.mainColor}
                          />
                        </Animated.View>
                        {/* <Animated.View
                          ref={viewRef}
                          style={[
                            {
                              alignSelf: 'center',
                              padding: 2,
                              backgroundColor: '#fff',
                            },
                            animatedStyle,
                          ]}>
                          <RfdToggleSwitch
                            isOn={isRfdOn}
                            onToggle={handleToggleButton}
                            size="medium"
                            activeColor={AppColors.mainColor}
                          />
                        </Animated.View> */}
                        {/* </View> */}
                      </View>
                    </View>

                    {/* Bottom div */}
                    <View style={styles.bottamView}>
                      <View style={styles.driverNameView}>
                        <Text style={styles.driverNameText}>
                          {decodedToken && decodedToken?.driver_name}
                        </Text>
                      </View>

                      <View style={styles.bottamRightView}>
                        <TouchableOpacity
                          onPress={() => dispatch(setModalVisible(true))}>
                          <View
                            style={[
                              styles.otrView,
                              {
                                backgroundColor:
                                  decodedToken?.otr_all_data?.otr?.background,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color: decodedToken?.otr_all_data?.otr?.color,
                                },
                              ]}>
                              {decodedToken &&
                                decodedToken?.TrustedDriverData?.otr}
                              %
                            </Text>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color: decodedToken?.otr_all_data?.otr?.color,
                                },
                              ]}>
                              {languageSwitch == 'english' ? 'OTR' : 'ओटीआर'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => dispatch(setRatingModal(true))}>
                          <View
                            style={[
                              styles.ratingView,
                              {
                                backgroundColor:
                                  decodedToken?.otr_all_data?.rating
                                    ?.background,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color:
                                    decodedToken?.otr_all_data?.rating?.color,
                                },
                              ]}>
                              {decodedToken &&
                                decodedToken?.TrustedDriverData?.rating}
                            </Text>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color:
                                    decodedToken?.otr_all_data?.rating?.color,
                                },
                              ]}>
                              {languageSwitch == 'english'
                                ? 'Rating'
                                : 'रेटिंग'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => dispatch(setBookingModal(true))}>
                          <View
                            style={[
                              styles.bookingView,
                              {
                                backgroundColor:
                                  decodedToken?.otr_all_data?.dcr?.background,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color: decodedToken?.otr_all_data?.dcr?.color,
                                },
                              ]}>
                              {decodedToken &&
                                decodedToken?.TrustedDriverData?.recent_dcr}
                              %
                            </Text>
                            <Text
                              style={[
                                styles.bottamRightText,
                                {
                                  color: decodedToken?.otr_all_data?.dcr?.color,
                                },
                              ]}>
                              {languageSwitch == 'english'
                                ? 'Booking'
                                : 'बुकिंग'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Bottom div */}
                  <View style={styles.bottamContent}>
                    <TouchableOpacity
                      onPress={() => showVideoContent()}
                      // onPress={() => dispatch(setVideosContent(!videosContent))}
                      style={[
                        styles.bottamContent1,
                        videosContent && {backgroundColor: AppColors.mainColor},
                      ]}>
                      <Text
                        style={[
                          styles.absoulteText,
                          {
                            backgroundColor:
                              videoCount == 0 ? 'grey' : 'rgb(195, 31, 31)',
                          },
                        ]}>
                        {videoCount}
                      </Text>
                      <View style={styles.absoulteView}>
                        <Text
                          style={[
                            styles.bottamContent1Text,
                            videosContent && {color: AppColors.white},
                          ]}>
                          {languageSwitch == 'english'
                            ? 'Training '
                            : 'ट्रेनिंग'}
                        </Text>
                        <Text
                          style={[
                            styles.bottamContent1Text,
                            videosContent && {color: AppColors.white},
                          ]}>
                          {languageSwitch == 'english' ? 'Videos' : 'वीडियो'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MyBonusStatusHistory')
                      }
                      style={styles.bottamContent2}>
                      <Text style={styles.mainText}>
                        {languageSwitch == 'english' ? 'My Bonus' : 'मेरा बोनस'}
                      </Text>
                      <Text style={styles.textIcon}>
                        <Icon name="rupee" size={responsiveSize(9)} />{' '}
                        {headLineData?.driver_panel_messages?.my_joining_bonus}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AgentPanel')}
                      style={styles.bottamContent3}>
                      <Text style={styles.mainText}>
                        {languageSwitch == 'english'
                          ? 'Agent panel'
                          : 'एजेंट पैनल'}
                      </Text>
                      <Text style={styles.textIcon}>
                        <Icon name="rupee" size={responsiveSize(9)} />{' '}
                        {
                          headLineData?.driver_panel_messages
                            ?.agent_panel_earning
                        }
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CmdRoutes')}
                      style={[
                        styles.bottamContent4,
                        {
                          backgroundColor:
                            decodedToken?.clear_due_color?.background ||
                            AppColors.yellow,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.mainText,
                          {
                            color:
                              decodedToken?.clear_due_color?.color ||
                              AppColors.black,
                          },
                        ]}>
                        {languageSwitch == 'english'
                          ? 'Clear My Due'
                          : 'बकाया जमा करें'}
                      </Text>
                      <Text
                        style={[
                          styles.textIcon,
                          {
                            color:
                              decodedToken?.clear_due_color?.color ||
                              AppColors.black,
                          },
                        ]}>
                        <Icon name="rupee" size={responsiveSize(9)} />{' '}
                        {decodedToken && decodedToken?.DRIVER_CLEAR_MY_DUE}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Toggle Button */}
                <ToggleButton
                  button1Label="Hindi"
                  button2Label="English"
                  onToggle={label => dispatch(setCurrentView(label))}
                />

                {/* <Text
                  style={{
                    color: AppColors.red,
                    marginVertical: 5,
                    marginHorizontal: 15,
                  }}>
                  {loginMessage}
                </Text> */}

                {awarenessVideo && awarenessVideo?.length > 0 && (
                  <View>
                    {/* Video FlatList */}
                    <FlatList
                      data={awarenessVideo}
                      keyExtractor={(item, index) => item + index}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{paddingHorizontal: 10}}
                      onViewableItemsChanged={onViewRef.current}
                      viewabilityConfig={viewConfigRef.current}
                      renderItem={({item}) => (
                        <View
                          style={{
                            width: width * 0.8,
                            height: 160,
                            marginRight: 15,
                            borderRadius: 12,
                            overflow: 'hidden',
                            backgroundColor: '#f8f8f8',
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            marginBottom: 10,
                          }}>
                          <YoutubePlayer
                            height={170}
                            width={width * 0.8}
                            videoId={item}
                          />
                        </View>
                      )}
                    />

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <FlatList
                        data={awarenessVideo}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        scrollEnabled={false}
                        contentContainerStyle={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                        renderItem={({index}) => (
                          <View
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              marginHorizontal: 4,
                              backgroundColor:
                                index === activeIndex ? '#000' : '#ccc',
                            }}
                          />
                        )}
                      />
                    </View>
                  </View>
                )}

                {/* Main Toggle Content */}
                <>
                  {isRfdOn ? (
                    <BookingView
                      data={headLineData}
                      allBookingData={allOndemandBookings}
                      panelData={allTrustedData?.agent_panel_view}
                      permanentSubscriptionBookingData={
                        permanentSubscriptionBookingData
                      }
                    />
                  ) : null}
                </>
                {videosContent ? <TrainingVideo /> : null}
              </View>
            </>
          )}
        </ScrollView>

        {/* bottam Tab bar */}
        {showNotice && homeNoticeData ? null : showNotification &&
          homeNotificationData ? null : (
          <View style={{justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 20,
                elevation: 20,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AgentPanel')}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={Agent_Icon}
                  style={{
                    width: 40,
                    height: 40,
                    marginBottom: 5,
                    tintColor: AppColors.black,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: '#000',
                  }}>
                  AGENT PANEL
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handlePressPremiumDriver()}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={PremiumDriver}
                  style={{
                    width: 40,
                    height: 40,
                    marginBottom: 5,
                    tintColor: AppColors.black,
                  }}
                />

                <Text
                  style={{
                    fontSize: 10,
                    color: '#000',
                  }}>
                  PREMIUM DRIVER
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('TrustedDriver')}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={TrustedPartner}
                  style={{
                    width: 40,
                    height: 40,
                    marginBottom: 5,
                    tintColor: AppColors.black,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: '#000',
                  }}>
                  TRUSTED DRIVER
                </Text>
              </TouchableOpacity>

              {/* New Button Beside Trusted Partner */}
              {showLocalseButton && (
                <TouchableOpacity
                  disabled={localseLoading}
                  onPress={() => getRegistredeLocalseStatus()}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                    padding: 5,
                    marginRight: -10,
                    borderRadius: 10,
                    borderTopEndRadius: 0,
                    borderBottomEndRadius: 0,
                    flexDirection: 'row',
                    paddingVertical: 15,
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    LocalSe
                  </Text>
                  {localseLoading ? (
                    <ActivityIndicator color={AppColors.white} size={18} />
                  ) : (
                    <MaterialIcons
                      name="north-east"
                      size={18}
                      color={AppColors.white}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {/* Modals */}

        {/* <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setModalVisible(false))}
          visible={isModalVisible}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <OtrModal data={allTrustedData?.otr_popup_data} />
        </Modal> */}

        <SlideupModal
          visible={isModalVisible}
          onClose={() => dispatch(setModalVisible(false))}
          loading={false}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: Platform.OS == 'ios' ? insets.bottom : 0,
            }}>
            <OtrModal data={allTrustedData?.otr_popup_data} />
          </ScrollView>
        </SlideupModal>

        <SlideupModal
          visible={isDriverLogutModalShow}
          onClose={() => setisDriverLogutModalShow(false)}
          loading={false}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#222',
              // marginBottom: 16,
              marginTop: 15,
              textAlign: 'center',
            }}>
            {languageSwitch == 'hindi'
              ? 'क्या आप लॉग आउट करना चाहते हैं?'
              : 'Are you sure you want to logout?'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 40,
            }}>
            <TouchableOpacity
              onPress={() => {
                setisDriverLogutModalShow(false);
              }}
              style={{
                flex: 1,
                marginRight: 8,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#333'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setisDriverLogutModalShow(false);
                dispatch(resetUserAuthState());
              }}
              style={{
                flex: 1,
                marginLeft: 8,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: '#E53935',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </SlideupModal>
        {/* <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setRatingModal(false))}
          visible={ratingModal}>
         
        </Modal> */}

        <SlideupModal
          visible={ratingModal}
          onClose={() => dispatch(setRatingModal(false))}
          loading={false}>
          <ScrollView
            contentContainerStyle={{
              // paddingBottom: Platform.OS == 'ios' ? insets.bottom : 0,
              paddingBottom: insets.bottom,
            }}>
            <RatingModal data={allTrustedData?.rating_popup_data} />
          </ScrollView>
        </SlideupModal>

        {/* <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setBookingModal(false))}
          visible={bookingModal}>
          <BookingModal data={allTrustedData?.booking_popup_data} />
        </Modal> */}

        <SlideupModal
          visible={bookingModal}
          onClose={() => dispatch(setBookingModal(false))}
          loading={false}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom:
                Platform.OS == 'ios' ? insets.bottom : insets.bottom,
            }}>
            <BookingModal data={allTrustedData?.booking_popup_data} />
          </ScrollView>
        </SlideupModal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setMyBookingAgencyModal(false))}
          visible={myBookingAgencyModal}>
          <MyBookingAgencyModal />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setExpressBookingModal(false))}
          visible={expressBookingModal && popupData == 1}>
          <ExpressBookingModal data={expressPopupData} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setUpdateModal(false)}
          visible={updateModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width * 0.85,
                backgroundColor: '#fff',
                borderRadius: 25,
                padding: 15,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 15},
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 15,
                transform: [{translateY: 20}],
              }}>
              <Image
                source={AppLogo}
                resizeMode="contain"
                style={{height: 70, width: 70}}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 10,
                  textAlign: 'center',
                }}>
                New Update Available
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#555',
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                {upadatePopupData?.app_details?.upgrade_message}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingVertical: 15,
                    borderRadius: 30,
                    backgroundColor: AppColors.mainColor,
                    elevation: 8,
                    shadowColor: AppColors.mainColor,
                    shadowOffset: {width: 0, height: 8},
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    marginBottom: 15,
                  }}
                  onPress={() => [
                    openMyUrl(upadatePopupData?.app_details?.app_url),
                    setUpdateModal(false),
                  ]}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    Update Now
                  </Text>
                  <Image
                    source={AppLogo}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                  }}
                  onPress={() => setUpdateModal(false)}>
                  <Text
                    style={{
                      color: AppColors.mainColor,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={fiveStarRatingModal}
          transparent={true}
          animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                width: width * 0.85,
                backgroundColor: '#fff',
                borderRadius: 20,
                paddingVertical: 25,
                paddingHorizontal: 20,
                alignItems: 'center',
                elevation: 10,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowOffset: {width: 0, height: 5},
              }}>
              <LottieView
                source={require('../assets/images/ballonAnimation.json')}
                autoPlay
                loop={true}
                style={{
                  position: 'absolute',
                  width: width,
                  height: '100%',
                  zIndex: -1,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  updateTriggerFiveStarRatingPopup(
                    fiveStarBookingNumber ||
                      headLineData?.driver_panel_messages
                        ?.Show_trigger_5star_popup_booking_number,
                  );
                  setFiveStarRatingModal(false);
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  zIndex: 1,
                }}>
                <Icon name="close" size={20} color={AppColors.black} />
              </TouchableOpacity>

              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%', // 🟢 THIS IS CRUCIAL
                  paddingHorizontal: 20,
                }}>
                <Image
                  source={{
                    uri:
                      driverImage ||
                      headLineData?.driver_panel_messages?.driver_photo_src,
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 40,
                    borderWidth: 2,
                    borderColor: '#cde7ff',
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#2d3559'}}>
                  {headLineData?.driver_panel_messages?.driver_name}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '800',
                  color: '#2d3559',
                  marginTop: 10,
                }}>
                🎉 Congratulations!
              </Text>

              <View style={{flexDirection: 'row', margin: 30}}>
                {starAnimations.map((anim, i) => (
                  <Animated.Text
                    key={i}
                    style={{
                      fontSize: 32,
                      marginHorizontal: 4,
                      transform: [{scale: anim}],
                      color: '#FFD700',
                    }}>
                    ⭐
                  </Animated.Text>
                ))}
              </View>

              <Text
                style={{
                  fontSize: 15,
                  color: '#333',
                  textAlign: 'center',
                  marginBottom: 8,
                }}>
                Your customer provided you 5 stars!
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#444',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 5,
                }}>
                Keep up the amazing work 🎉
              </Text>
            </View>
          </View>
        </Modal>

        {/* 10 minute toggle modal */}

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModalVisibleTenMinutes(false);
            getHeadlineData();
          }}
          visible={modalVisibleTenMinutes}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}>
            <Text
              style={{
                fontSize: 28,
                // fontWeight: 'bold',
                color: 'white',
                alignSelf: 'center',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: {width: 3, height: 3},
                // textDecorationLine:"underline",
                textShadowRadius: 2,
                // padding: 10,
                backgroundColor: '',
                borderRadius: 10,
                // overflow: 'hidden',
                marginBottom: 20,
              }}>
              Driver In 10 Minutes
            </Text>
            <View
              style={{
                backgroundColor: 'black',
                padding: 20,
                width: '90%',
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleTenMinutes(false);
                  getHeadlineData();
                }}
                style={{
                  margin: 5,
                  marginTop: 0,
                  marginRight: 17,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  borderColor: 'rgb(204,204,204)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: AppColors.white,
                    margin: 5,
                    opacity: 0.8,
                  }}>
                  Back
                </Text>
              </TouchableOpacity>

              {allTripType.map((trip, index) => (
                <Pressable
                  onPress={() => openConfirmTenMinuteApplyPopUp(trip, index)}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 2,
                    borderColor: AppColors.toggleYellow,
                    // alignItems: 'center',
                    // justifyContent: '',
                    padding: 15,
                    borderRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 5,
                    marginVertical: 8,
                    width: '100%',
                    backgroundColor: trip?.value
                      ? AppColors.black
                      : AppColors.toggleGrey,
                  }}>
                  <View style={{flex: 0.8}}>
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: 'bold',
                        marginRight: 15,
                        color: AppColors.toggleYellow,
                        // textAlign: 'center',
                      }}>
                      {trip?.label}
                    </Text>
                  </View>
                  <View style={{flex: 0.2}}>
                    {confirmTenMinuteLoader == index ? (
                      <ActivityIndicator
                        size={'small'}
                        color={AppColors.toggleYellow}
                      />
                    ) : (
                      <ToggleSwitch
                        isOn={trip?.value}
                        onColor={AppColors.toggleYellow}
                        offColor={AppColors.white}
                        thumbOnStyle={{
                          backgroundColor: '#333',
                          shadowColor: AppColors.toggleYellow,
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 10,
                        }}
                        thumbOffStyle={{backgroundColor: '#333'}}
                        size="medium"
                        onToggle={() =>
                          openConfirmTenMinuteApplyPopUp(trip, index)
                        }
                      />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => setConfirmTenMinuteModal(false)}
          visible={Object.keys(confirmTenMinuteModal).length !== 0}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}>
            <View
              style={{
                width: width * 0.85,
                backgroundColor: '#fff',
                borderRadius: 25,
                padding: 15,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 15},
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 15,
                paddingVertical: 50,
                transform: [{translateY: 20}],
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.black,
                  marginBottom: 30,
                  fontWeight: 'bold',
                }}>
                {languageSwitch == 'hindi'
                  ? tenMinuteModalData?.hindi_message
                  : tenMinuteModalData?.english_message}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: AppColors.greyColor,
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    elevation: 5,
                    borderColor: AppColors.black,
                  }}
                  onPress={() => setConfirmTenMinuteModal({})}>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: AppColors.toggleYellow,
                    borderRadius: 50,
                    elevation: 5,
                    borderWidth: 1,
                    borderColor: AppColors.black,
                  }}
                  disabled={tenMinuteAcceptLoader}
                  onPress={() =>
                    sendDriverAvailableInTenMinutes(confirmTenMinuteModal?.key)
                  }>
                  <Text
                    style={{
                      color: AppColors.black,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {tenMinuteAcceptLoader ? 'Please Wait...' : 'Accept'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Toast visibilityTime={3000} topOffset={insets.top} />
        <Modal transparent animationType="fade" visible={popoverVisible}>
          <SafeAreaView style={{flex: 1}}>
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
          </SafeAreaView>
        </Modal>

        {/* need help popup start */}

        <Modal
          transparent
          visible={popoverVisibleNeedHelp}
          animationType="fade">
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'rgba(121, 129, 116, 0.48)'}}
            activeOpacity={1}
            onPress={() => setPopoverVisibleNeedHelp(false)}>
            <View
              style={{
                position: 'absolute',
                top: popoverPositionNeedHelp.y,
                // left: popoverPosition.x + 10, // Adjust left offset as per design
                width: '70%',
                // width: 160,
                alignSelf: 'center',
                // left:popoverPositionNeedHelp.x/2,
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
                  left: Math.floor(
                    popoverPositionNeedHelp.x -
                      popoverPositionNeedHelp.width / 2,
                  ),
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
                  setPopoverVisibleNeedHelp(false);
                  navigation.navigate('TicketsDriver', {bookingNumber: ''});
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
                  <Text style={{fontSize: 16, color: '#333'}}>
                    Create Ticket
                  </Text>
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
                  <Text style={{fontSize: 16, color: '#333'}}>
                    Call Support
                  </Text>
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

        <Modal transparent visible={localseNewModal} animationType="fade">
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'rgba(121, 129, 116, 0.48)'}}
            activeOpacity={1}
            onPress={() => {
              setLocalseNewModal(false);
              setPopoverVisibleNeedHelp(false);
            }}>
            <View
              style={{
                position: 'absolute',
                top: popoverPositionNeedHelp.y,
                // left: popoverPosition.x - 200, // Adjust left offset as per design
                width: '45%',
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
                  left:
                    popoverPositionNeedHelp.x -
                    popoverPositionNeedHelp.width / 2,
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
                  setPopoverVisibleNeedHelp(false);
                  setLocalseNewModal(false);
                  submitTatdCallSupport();
                }}
                style={{
                  flexDirection: 'row', // Row layout
                  alignItems: 'center', // Center align items
                  paddingVertical: 8,
                  backgroundColor: AppColors.mainColor,
                  paddingHorizontal: 12,
                  marginHorizontal: 1,

                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{fontSize: 16, color: 'white'}}>tat d</Text>
                </View>

                <View
                  style={{
                    width: 30,
                    height: 30,
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

              <TouchableOpacity
                onPress={() => {
                  setPopoverVisibleNeedHelp(false);
                  setLocalseNewModal(false);
                  submitLocalseCallSupport();
                }}
                style={{
                  flexDirection: 'row', // Row layout
                  alignItems: 'center', // Center align items
                  paddingVertical: 8,
                  backgroundColor: AppColors.red,
                  marginHorizontal: 1,
                  paddingHorizontal: 12,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{fontSize: 16, color: 'white'}}>LocalSe</Text>
                </View>

                <View
                  style={{
                    width: 30,
                    height: 30,
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

        {/* <Modal
          visible={isShowingCommissionPressModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setisShowingCommissionPressModal(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <TouchableWithoutFeedback
              onPress={() => setisShowingCommissionPressModal(false)}>
              <View style={{flex: 1}} />
            </TouchableWithoutFeedback>

            <View
             >
              <View
                style={{
                  backgroundColor: AppColors.white,
                  minHeight: 200,

                  borderTopLeftRadius:16,
                      borderTopRightRadius:16,
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

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    position: 'relative',
                  }}>

                  <TouchableOpacity
                    onPress={() => setisShowingCommissionPressModal(false)}
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
                        color: AppColors.mainColor,
                        fontWeight: '800',
                      }}>
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>


                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 8,
                  }}>
                  {commissionPressLoader ? (
                    <ActivityIndicator
                      size={'large'}
                      color={AppColors.mainColor}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#17181b',
                        textAlign: 'center',
                        lineHeight: 24,
                        fontWeight: '400',
                      }}>
                      {commissionpressData}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
        <SlideupModal
          visible={isShowingCommissionPressModal}
          onClose={() => setisShowingCommissionPressModal(false)}
          loading={commissionPressLoader}>
          <Text
            style={{
              fontSize: 18,
              color: '#17181b',
              textAlign: 'justify',
              lineHeight: 28,
              marginTop: 20,
              fontWeight: '400',
            }}>
            {commissionpressData?.trim()}
          </Text>
        </SlideupModal>

        <SlideupModal
          visible={loginMessage !== ''}
          onClose={() => setLoginMessage('')}
          loading={false}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <LottieView
              autoPlay
              style={{width: 100, height: 100}}
              source={require('../assets/images/Alert.json')}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
              lineHeight: 24,
              fontWeight: '400',
            }}>
            {loginMessage}
          </Text>
        </SlideupModal>
        <SlideupModal
          visible={premiumDriverBookingAcceptErr !== ''}
          onClose={() => dispatch(setPremiumDriverBookingAcceptErr(''))}
          loading={false}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <LottieView
              autoPlay
              style={{width: 100, height: 100}}
              source={require('../assets/images/Alert.json')}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
              lineHeight: 24,
              fontWeight: '400',
            }}>
            {premiumDriverBookingAcceptErr}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: AppColors?.mainColor || '#007AFF',
              borderRadius: 8,
              paddingVertical: 15,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              handlePressPremiumDriver();
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Medium',
              }}>
              {languageSwitch === 'english' ? 'Register' : 'पंजीकरण करवाएं'}
            </Text>
          </TouchableOpacity>
        </SlideupModal>
        <SlideupModal
          visible={isPremiumDriverElegibleErr !== ''}
          onClose={() => dispatch(setIsPremiumDriverElegibleErr(''))}
          loading={false}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <LottieView
              autoPlay
              style={{width: 100, height: 100}}
              source={require('../assets/images/Alert.json')}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
              lineHeight: 24,
              fontWeight: '400',
            }}>
            {isPremiumDriverElegibleErr}
          </Text>
          {/* <TouchableOpacity
            style={{
              backgroundColor: AppColors?.mainColor || '#007AFF',
              borderRadius: 8,
              paddingVertical: 15,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              handlePressPremiumDriver();
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Medium',
              }}>
              {languageSwitch === 'english' ? 'Register' : 'पंजीकरण करवाएं'}
            </Text>
          </TouchableOpacity> */}
        </SlideupModal>
      </SafeAreaView>
    </View>
  );
};

export default TrustedDriver;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    // marginVertical: responsiveSize(20),
  },
  marqueeView: {
    paddingHorizontal: '2%',
  },
  marqueeText: {
    color: AppColors.black,
    fontSize: responsiveSize(15),
    fontWeight: '400',
    lineHeight: responsiveSize(21),
    fontFamily: 'Roboto',
  },
  middleContainer: {
    margin: '4%',
    marginTop: 0,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(10),
    borderColor: AppColors.mainColor,
    position: 'relative',
  },
  middleContent: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: '3%',
    borderRadius: responsiveSize(6),
    marginBottom: responsiveSize(2),
  },
  topView: {
    paddingTop: '3%',
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeft: {
    backgroundColor: AppColors.white,
    height: responsiveSize(80),
    width: responsiveSize(80),
    borderRadius: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftText: {
    color: AppColors.mainColor,
    fontSize: responsiveSize(29),
    fontWeight: 'bold',
    fontFamily: AppFont.regularFont,
  },
  bottamLeftText: {
    color: AppColors.mainColor,
    fontSize: responsiveSize(10),
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  earningView: {
    backgroundColor: 'rgb(255,255,255)',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(5),
  },
  rupeeIcon: {
    color: AppColors.mainColor,
    textAlign: 'center',
    fontSize: responsiveSize(9),
  },
  notification: {
    margin: responsiveSize(5),
  },
  notificationCount: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: AppColors.greyColor,
    fontSize: responsiveSize(7),
    fontWeight: '400',
    padding: responsiveSize(3),
    paddingHorizontal: responsiveSize(5),
    color: 'rgb(256,256,256)',
  },
  staticStyle: {
    backgroundColor: 'rgb(217, 217, 217)',
    borderRadius: responsiveSize(34),
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    margin: responsiveSize(5),
  },
  toggleView: {
    alignSelf: 'center',
    padding: 1,
    backgroundColor: '#fff',
  },
  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsiveSize(10),
  },
  driverNameView: {
    flex: 1,
  },
  driverNameText: {
    fontSize: responsiveSize(15),
    fontWeight: '500',
    letterSpacing: 0.3,
    fontFamily: 'Roboto',
    color: 'rgb(255,255,255)',
  },
  bottamRightView: {
    flexDirection: 'row',
  },
  otrView: {
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: AppColors.white,
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(2),
  },
  bottamRightText: {
    fontSize: responsiveSize(8),
    fontWeight: '500',
    color: AppColors.white,
  },
  ratingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: AppColors.white,
    alignItems: 'center',
    margin: responsiveSize(2),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(4),
  },
  bookingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: AppColors.white,
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    margin: responsiveSize(2),
    paddingVertical: responsiveSize(4),
  },
  bottamContent: {
    flexDirection: 'row',
    margin: responsiveSize(3),
  },
  bottamContent1: {
    backgroundColor: AppColors.white,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveSize(1),
    flexDirection: 'row',
  },
  absoulteText: {
    color: AppColors.white,
    backgroundColor: 'rgb(195, 31, 31)',
    fontSize: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 2,
  },
  absoulteView: {justifyContent: 'center', alignItems: 'center'},
  bottamContent1Text: {
    color: AppColors.mainColor,
    fontSize: 9,
    fontWeight: '400',
    textAlign: 'center',
  },

  bottamContent2: {
    backgroundColor: AppColors.white,
    paddingBottom: 3,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  bottamContent3: {
    backgroundColor: AppColors.white,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 3,
  },
  bottamContent4: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 3,
  },
  mainText: {
    color: AppColors.mainColor,
    fontSize: 10,
    fontWeight: '400',
    paddingTop: 5,
    textAlign: 'center',
  },
  textIcon: {
    color: AppColors.mainColor,
    fontSize: 10,
    textAlign: 'center',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 10,
    paddingTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    // flex: 1,
  },
  subjectText: {
    color: AppColors.black,
    fontSize: 15,
  },
});
