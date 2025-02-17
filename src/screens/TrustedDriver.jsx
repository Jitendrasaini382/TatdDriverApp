import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
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
} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
// import Modal from 'react-native-modal';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';
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
import {Buffer} from 'buffer';
import Geolocation from '@react-native-community/geolocation';

import {
  ALL_TEN_MINUTE_STATUS_UPDATE,
  DRIVER_AVAILABLE_TEN_MINUTES,
  DRIVER_HEADLINE,
  DRIVER_NOTICE,
  DRIVER_NOTIFICATION,
  DRIVER_TRAINING_VIDEOS,
  EXPRESS_BOOKING_POPUP,
  GET_ALL_AVAILABILITY,
  GET_FCM_TOKEN,
  LOGIN_BUTTON,
  ON_DEMAND_BOOKING,
  PERMANENT_SUBSCRIPTION_VIEW,
  SAVE_DEVICE_INFO,
  TEN_MINUTE_AVAILABLE_CLICK_POPUP,
  UPDATE_POPUP,
} from '../apis/Apis';
import ExpressBookingModal from '../components/modal/ExpressBookingModal';
import {
  requestLocationPermission,
  requestNotificationPermission,
} from '../utils/permissions';
import {
  setBookingModal,
  setExpressBookingModal,
  setModalVisible,
  setMyBookingAgencyModal,
  setRatingModal,
  setVideosContent,
} from '../redux/slices/trustedDriverSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';
import {
  Agent_Icon,
  AppLogo,
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
const {width} = Dimensions.get('window');

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

  const handleTenMinuteButton = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      // getLocation();
      const loc = await getLocation();
      if (loc) {
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
            resolve(position.coords);
          },
          error => {
            // console.log('Location error:', error);

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
                    style: 'cancel',
                  },
                  {
                    text: 'Open Setting',
                    onPress: () => {
                      Linking.sendIntent(
                        'android.settings.LOCATION_SOURCE_SETTINGS',
                      ); // Opens phone's location settings
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

  const openConfirmTenMinuteApplyPopUp = async data => {
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
    } catch (error) {}
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
      } catch (error) {}
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
            Alert.alert('Success', response?.application_success_message, [
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
        // console.log(error, 'error getAllAvailability');
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
    state => state.trustedDriverSlice.toggleButton,
  );
  const expressBookingModal = useSelector(
    state => state.trustedDriverSlice.expressBookingModal,
  );
  const mainToggleContent = useSelector(
    state => state.trustedDriverSlice.mainToggleContent,
  );
  const videosContent = useSelector(
    state => state.trustedDriverSlice.videosContent,
  );
  const myBookingAgencyModal = useSelector(
    state => state.trustedDriverSlice.myBookingAgencyModal,
  );
  const isModalVisible = useSelector(
    state => state.trustedDriverSlice.isModalVisible,
  );
  const bookingModal = useSelector(
    state => state.trustedDriverSlice.bookingModal,
  );
  const ratingModal = useSelector(
    state => state.trustedDriverSlice.ratingModal,
  );
  const myBookingModal = useSelector(
    state => state.trustedDriverSlice.myBookingModal,
  );
  const appVersion = DeviceInfo.getVersion();

  useFocusEffect(
    useCallback(() => {
      getHeadlineData();
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

  useEffect(() => {
    if (jwt) {
      if (isRfdOn) {
        getPopup();
      }
      getHeadlineData();
      // if (isRfdOn) {
      getAllOndemandBookings();
      getPermanentSubscriptionBooking();
      // }
      getAllTrustedData();

      getHomeNotification();
      getHomeNotice();
    }
  }, [languageSwitch, refreshKey]);

  const openMyUrl = url => {
    Linking.openURL(url).then(() => {});
  };

  useEffect(() => {
    if (!isFcmSent) getFcmToken();
    if (!isDeviceInfo) fetchDeviceInfo();
  }, []);

  const currentRoute = route.name;

  const [selected, setSelected] = useState(currentRoute);
  const [showNeedHelp, setShowNeedHelp] = useState();

  const handlePress = icon => {
    setSelected(icon);
    if (icon === 'Agent') {
      handleLoginPress();
    } else if (icon === 'PremiumDriver') {
      openMyUrl('https://www.tatd.in/premium-driver.php?step=1');
    } else if (icon === 'TrustedPartner' || 'TrustedDriver') {
      navigation.navigate('TrustedDriver');
    }
  };

  const getFcmToken = async () => {
    try {
      let tokenvalue = null;

      if (Platform.OS === 'ios') {
        // Register for remote messages
        await messaging().registerDeviceForRemoteMessages();

        // Request permission for push notifications
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          return;
        }

        // Check APNS token
        const apnsToken = await messaging().getAPNSToken();

        if (!apnsToken) {
          return;
        }

        // Fetch FCM token
        tokenvalue = await messaging().getToken();
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

      // Log the response for debugging

      // Check and handle update conditions
      if (response?.app_details) {
        const {version, force_update, app_url} = response.app_details;
        if (force_update == '1' && app_url) {
          openMyUrl(app_url);
          setUpdateModal(false);
        }

        if (appVersion < version) {
          setUpdateModal(true);
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
    const newRfdValue = isRfdOn ? '0' : '1';

    // Create updated login button payload
    const updatedLoginButton = {
      ...loginButton,
      rfd: newRfdValue,
      current_language: languageSwitch,
    };

    try {
      const response = await LOGIN_BUTTON(updatedLoginButton);

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
        setLoginMessage(response?.message);
        setTimeout(() => {
          setLoginMessage('');
        }, 50000);
      }

      if (response?.redirect) {
        switch (response?.redirect) {
          case 'clear-my-due-payment':
            openMyUrl(response?.url);
            break;
          case 'driver-training-module':
            openMyUrl(response?.url);

            break;
          case 'trusted-driver':
            navigation.navigate('TrustedDriver');
            break;
          default:
            openMyUrl(response?.url);

            break;
        }
      }
    } catch (error) {
      if (error.response) {
      }
    } finally {
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

      setAllOndemandBookings(response);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getPermanentSubscriptionBooking = async () => {
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

  const handleLoginPress = () => {
    try {
      const encodedMobile = Buffer.from(
        decodedToken?.driver_mobile_number,
      ).toString('base64');
      const url = `https://www.tatd.in/agent-login.php?dologin=${encodedMobile}`;
      openMyUrl(url);
    } catch (error) {}
  };

  const getPopup = async () => {
    try {
      const response = await EXPRESS_BOOKING_POPUP({
        action: 'check_popup',
        current_language: languageSwitch,
      });

      setExpressPopupData(response?.popup_data);
      if (response.express_booking_popup_flag == 1) {
        dispatch(setExpressBookingModal(true));
        setPopupData(response.express_booking_popup_flag);
      } else {
        dispatch(setExpressBookingModal(false));
      }
    } catch (error) {}
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
        setShowNeedHelp(true);
      } else {
        setShowNeedHelp(false);
      }
      setVideoCount(response?.driver_panel_messages?.training_video_unseen);
    } catch (error) {}
  };

  const getHomeNotification = async () => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline_update',
        current_language: languageSwitch,
      });

      setHomeNotificationData(response);
    } catch (error) {}
  };

  const getHomeNotice = async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_one_awareness',
        current_language: languageSwitch,
      });

      setHomeNoticeData(response);
    } catch (error) {}
  };

  const onRefresh = async () => {
    const startTime = performance.now();
    setRefreshing(true);
    try {
      await getUpdatePopup();
      await getHeadlineData();
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

  const showVideoContent = () => {
    dispatch(setVideosContent(true));
    getTrainingVideo();
    setLoginMessage('');
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = buttonId => {
    setSelectedButton(buttonId === selectedButton ? null : buttonId);
  };

  return (
    <View style={styles.safeArea}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />
      <SafeAreaView style={{flex: 1}}>
        <Header extraButton={true} showNeedHelp={showNeedHelp} />
        {myBookingModal && <MyBookingModal />}

        <ScrollView
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
                backgroundColor: '#f4f4f4',
                padding: 16,
              }}>
              <View
                style={{
                  backgroundColor: '#0056b3',
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
                    borderLeftColor: '#0056b3',
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
                        backgroundColor: '#0056b3',
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
                        backgroundColor: '#0056b3',
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
                  )}
                </View>
              </View>
            </View>
          ) : showNotice && homeNoticeData ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#f4f4f4',
                padding: 16,
              }}>
              <View
                style={{
                  backgroundColor: '#0056b3',
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
                  {homeNoticeData?.awareness?.subject}
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
                    borderLeftColor: '#0056b3',
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
                      onPress={() => [setShowNotice(false), getHeadlineData()]}
                      style={{
                        backgroundColor: '#0056b3',
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
                        {homeNoticeData?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        clickStoreHomeNotice(homeNoticeData?.awareness?.id)
                      }
                      style={{
                        backgroundColor: '#0056b3',
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
                        {homeNoticeData?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <>
              {showTenMinuteButton && (
                <View style={{alignSelf: 'flex-end', marginHorizontal: 10}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '50%',
                      borderColor: AppColors.black,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginVertical: 8,
                      borderRadius: 50,
                      backgroundColor: isSelected
                        ? AppColors.yellow
                        : AppColors.mainColor,
                    }}
                    onPress={() => handleTenMinuteButton()}>
                    {/* Driver Icon Placement */}
                    {!isSelected && (
                      <Text
                        style={{
                          fontSize: 22,
                          backgroundColor: AppColors.white,
                          borderRadius: 11,
                          borderWidth: 1,
                          borderColor: AppColors.white,
                        }}>
                        👮
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: isSelected
                          ? AppColors.mainColor
                          : AppColors.white,
                      }}>
                      In 10 Minutes
                    </Text>
                    {isSelected && (
                      <Text
                        style={{
                          fontSize: 22,
                          backgroundColor: AppColors.white,
                          borderRadius: 11,
                          borderWidth: 1,
                          borderColor: AppColors.white,
                        }}>
                        👮
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.mainContainer}>
                {/* Marquee View */}
                <View style={styles.marqueeView}>
                  <Marquee spacing={20} speed={0.5}>
                    <Text style={styles.marqueeText}>{combinedText}</Text>
                  </Marquee>
                </View>

                {/* Middle Container */}
                <View style={styles.middleContainer}>
                  <View style={styles.middleContent}>
                    {/* Top div */}
                    <View style={styles.topView}>
                      <View style={styles.topLeft}>
                        <Text style={styles.topLeftText}>
                          {decodedToken &&
                            decodedToken.DriverCommisonData.commission}
                          %
                        </Text>
                        <Text style={styles.bottamLeftText}>Commission</Text>
                      </View>
                      <View style={styles.topRight}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('DriverEarning')}>
                          <View style={styles.earningView}>
                            <Text style={styles.rupeeIcon}>
                              <Icon name="rupee" size={responsiveSize(8)} />{' '}
                              {decodedToken &&
                                decodedToken.DriverCommisonData.earning_30days}
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
                        <View style={styles.toggleView}>
                          <ToggleSwitch
                            isOn={isRfdOn}
                            onColor={AppColors.mainColor}
                            offColor={AppColors.greyColor}
                            size="medium"
                            onToggle={() => handleToggleButton()}
                            // disabled={isDisabled}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Bottom div */}
                    <View style={styles.bottamView}>
                      <View style={styles.driverNameView}>
                        <Text style={styles.driverNameText}>
                          {decodedToken && decodedToken.driver_name}
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
                                decodedToken.TrustedDriverData.otr}{' '}
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
                                decodedToken.TrustedDriverData.rating}
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
                                decodedToken.TrustedDriverData.recent_dcr}{' '}
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
                      onPress={() => handleLoginPress()}
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
                      onPress={() => {
                        openMyUrl(
                          `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                        );
                      }}
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
                        {decodedToken && decodedToken.DRIVER_CLEAR_MY_DUE}
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

                <Text
                  style={{
                    color: AppColors.red,
                    marginVertical: 5,
                    marginHorizontal: 15,
                  }}>
                  {loginMessage}
                </Text>

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
            {/* Agent Panel */}
            <TouchableOpacity
              onPress={() => handlePress('Agent')}
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
                  fontSize: 12,
                  color: '#000',
                }}>
                AGENT PANEL
              </Text>
            </TouchableOpacity>

            {/* Premium Driver */}
            <TouchableOpacity
              onPress={() => handlePress('PremiumDriver')}
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
                  fontSize: 12,
                  color: '#000',
                }}>
                PREMIUM DRIVER
              </Text>
            </TouchableOpacity>

            {/* Trusted Partner */}
            <TouchableOpacity
              onPress={() => handlePress('TrustedPartner')}
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
                  fontSize: 12,
                  color: '#000',
                }}>
                TRUSTED PARTNER
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modals */}

        {/* <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpenModal(false)}
          visible={openModal}> */}

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setModalVisible(false))}
          visible={isModalVisible}
          style={{justifyContent: 'center', alignItems: 'center'}}
          // backdropOpacity={0}
          // onBackdropPress={() => dispatch(setModalVisible(false))}
          // animationIn={'fadeInDown'}
          // animationOut={'fadeOutUp'}
          // isVisible={isModalVisible}
        >
          <OtrModal data={allTrustedData?.otr_popup_data} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setRatingModal(false))}
          visible={ratingModal}

          // backdropOpacity={0}
          // onBackdropPress={() => dispatch(setRatingModal(false))}
          // animationIn={'fadeInDown'}
          // animationOut={'fadeOutUp'}
          // isVisible={ratingModal}
        >
          <RatingModal data={allTrustedData?.rating_popup_data} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setBookingModal(false))}
          visible={bookingModal}

          // backdropOpacity={0}
          // onBackdropPress={() => dispatch(setBookingModal(false))}
          // animationIn={'fadeInDown'}
          // animationOut={'fadeOutUp'}
          // isVisible={bookingModal}
        >
          <BookingModal data={allTrustedData?.booking_popup_data} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setMyBookingAgencyModal(false))}
          visible={myBookingAgencyModal}

          // backdropOpacity={0}
          // onBackdropPress={() => dispatch(setMyBookingAgencyModal(false))}
          // animationIn={'fadeInDown'}
          // animationOut={'fadeOutUp'}
          // isVisible={myBookingAgencyModal}
        >
          <MyBookingAgencyModal />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => dispatch(setExpressBookingModal(false))}
          visible={popupData == 1 && expressBookingModal && expressPopupData}

          // backdropOpacity={0}
          // onBackdropPress={() => dispatch(setExpressBookingModal(false))}
          // animationIn={'fadeInDown'}
          // animationOut={'fadeOutUp'}
          // isVisible={popupData == 1 && expressBookingModal && expressPopupData}
        >
          <ExpressBookingModal data={expressPopupData} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setUpdateModal(false)}
          visible={updateModal}

          // backdropOpacity={0.5}
          // onBackdropPress={() => setUpdateModal(false)}
          // isVisible={updateModal}
        >
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

        {/* 10 minute toggle modal */}

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModalVisibleTenMinutes(false), getHeadlineData();
          }}
          visible={modalVisibleTenMinutes}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                width: '90%',
                borderRadius: 10,
                alignItems: 'center',
              }}>
              {/* Close Button */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleTenMinutes(false), getHeadlineData();
                }}
                style={{
                  backgroundColor: '#333',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  X
                </Text>
              </TouchableOpacity>

              {/* Trip Options */}
              {allTripType.map((trip, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 15,
                    marginVertical: 8,
                    borderRadius: 50,
                    backgroundColor: trip.value
                      ? AppColors.yellow
                      : AppColors.mainColor,
                  }}
                  onPress={() => openConfirmTenMinuteApplyPopUp(trip)}>
                  {/* Driver Icon Placement */}
                  {!trip.value && (
                    <Text
                      style={{
                        fontSize: 22,
                        backgroundColor: AppColors.white,
                        borderRadius: 11,
                        borderWidth: 1,
                        borderColor: AppColors.white,
                      }}>
                      👮
                    </Text>
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: trip.value ? AppColors.mainColor : AppColors.white,
                    }}>
                    {trip.label}
                  </Text>
                  {trip.value && (
                    <Text
                      style={{
                        fontSize: 22,
                        backgroundColor: AppColors.white,
                        borderRadius: 11,
                        borderWidth: 1,
                        borderColor: AppColors.white,
                      }}>
                      👮
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setConfirmTenMinuteModal(false)}
          visible={Object.keys(confirmTenMinuteModal).length !== 0}>
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
                paddingVertical: 50,
                transform: [{translateY: 20}],
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#555',
                  // textAlign: 'center',
                  marginBottom: 30,
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
                  }}
                  onPress={() => setConfirmTenMinuteModal({})}>
                  <Text
                    style={{
                      color: AppColors.mainColor,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                  }}
                  disabled={tenMinuteAcceptLoader}
                  onPress={() =>
                    sendDriverAvailableInTenMinutes(confirmTenMinuteModal?.key)
                  }>
                  <Text
                    style={{
                      color: AppColors.mainColor,
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

        <Toast visibilityTime={3000} topOffset={20} />
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
  toggleView: {
    backgroundColor: 'rgb(217, 217, 217)',
    borderRadius: responsiveSize(34),
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    margin: responsiveSize(5),
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
