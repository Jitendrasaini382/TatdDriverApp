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
  Alert,
  Linking,
  RefreshControl,
  Platform,
  Image,
  AppState,
} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal from 'react-native-modal';
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
import Svg, {Path, G} from 'react-native-svg';
import DeviceInfo from 'react-native-device-info';
import {AppFont} from '../assets/FontsFamily';
import ToggleButton from '../components/modal/ToggleButton';
import {Buffer} from 'buffer';
import {
  DRIVER_HEADLINE,
  DRIVER_NOTICE,
  DRIVER_NOTIFICATION,
  EXPRESS_BOOKING_POPUP,
  GET_FCM_TOKEN,
  LOGIN_BUTTON,
  ON_DEMAND_BOOKING,
  SAVE_DEVICE_INFO,
  UPDATE_POPUP,
} from '../apis/Apis';
import ExpressBookingModal from '../components/modal/ExpressBookingModal';
import {requestNotificationPermission} from '../utils/permissions';
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
import {Agent_Icon, AppLogo} from '../assets/images';
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

  const isFcmSent = useSelector(e => e?.userAuth?.isFcmSent);
  const isRfdOn = useSelector(state => state.globalSlice.loginStatus);
  const isDeviceInfo = useSelector(e => e?.userAuth?.isDeviceInfo);

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

  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const triggerFunction = useSelector(
    state => state?.globalSlice?.triggerFunction,
  );
  const refreshKey = useSelector(state => state?.globalSlice?.refreshKey);

  const jwt = useSelector(e => e?.userAuth?.jwt);

  useFocusEffect(
    useCallback(() => {
      getHeadlineData();
      getHomeNotification();
      getHomeNotice();
      getPopup();
      getAllOndemandBookings();
      getAllTrustedData();

      return () => {
        console.log('Screen unfocused, cleanup if necessary.');
      };
    }, []),
  );

  // Handle when the app comes to the foreground
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        console.log('App is active, refetching data...');
        getHeadlineData();
        getHomeNotification();
        getHomeNotice();
        getPopup();
        if (isRfdOn) {
          getAllOndemandBookings();
        }
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

  // useEffect(() => {
  //   getHeadlineData();
  //   getPopup();
  //   getTrainingVideo();
  //   getTrustedPopupRating();
  //   getTrustedPopupBooking();
  //   getTrustedPopupOtr();
  //   getUpdatePopup();
  //   getHomeNotification();
  //   getHomeNotice();
  // }, []);

  useEffect(() => {
    if (jwt) {
      // if (isRfdOn) {
      getPopup();
      // }
      getHeadlineData();
      // getTrainingVideo();
      // getTrustedPopupRating();
      // getTrustedPopupBooking();
      // getTrustedPopupOtr();
      // if (isRfdOn) {
      getAllOndemandBookings();
      // }
      getAllTrustedData();

      // getUpdatePopup();
      getHomeNotification();
      getHomeNotice();
    }
  }, [jwt, languageSwitch, refreshKey]);

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
      navigation.navigate('CommanWebview', {
        url: `https://www.tatd.in/premium-driver.php?step=1`,
      });
    } else if (icon === 'TrustedPartner' || 'TrustedDriver') {
      navigation.navigate('TrustedDriver');
    }
  };

  const getFcmToken = async () => {
    try {
      console.log('Starting getFcmToken function.');
      let tokenvalue = null;

      if (Platform.OS === 'ios') {
        console.log('Platform is iOS.');

        // Register for remote messages
        await messaging().registerDeviceForRemoteMessages();
        console.log('iOS: Registered device for remote messages.');

        // Request permission for push notifications
        const authStatus = await messaging().requestPermission();
        console.log('iOS: Permission status:', authStatus);

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('iOS: Permission not granted.');
          return;
        }

        // Check APNS token
        const apnsToken = await messaging().getAPNSToken();
        console.log('iOS: APNS token:', apnsToken);

        if (!apnsToken) {
          console.log('Error: No APNS token retrieved.');
          console.log(
            'Ensure the device is configured for Push Notifications.',
          );
          return;
        }

        // Fetch FCM token
        tokenvalue = await messaging().getToken();
        console.log('iOS: FCM token:', tokenvalue);
      } else {
        console.log('Platform is Android.');
        requestNotificationPermission();
        // Fetch FCM token for Android
        tokenvalue = await messaging().getToken();
        console.log('Android: FCM token:', tokenvalue);
      }

      if (tokenvalue) {
        console.log('FCM token generated successfully:', tokenvalue);
        // Use token as needed
        setFcmToken(tokenvalue);
        saveFcmToken(tokenvalue);
      } else {
        console.log('Failed to generate FCM token.');
      }
    } catch (error) {
      console.log('Error generating FCM token:', error);
    }
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
    } catch (error) {
      console.error('Error fetching device information:', error);
    }
  };

  const sendDeviceInfo = async deviceInfo => {
    try {
      console.log('Sending device information...', deviceInfo);
      const response = await SAVE_DEVICE_INFO(deviceInfo);
      console.log('SAVE_DEVICE_INFO response:', response);
      dispatch(
        setUserAuthStates({
          key: 'isDeviceInfo',
          value: true,
        }),
      );
    } catch (error) {
      console.error('Error sending device information:', error);
    }
  };

  const getUpdatePopup = async () => {
    console.log('Starting to fetch update popup data...');

    try {
      // Fetch update popup data
      const response = await UPDATE_POPUP({
        app_type: appType,
        user_type: 'Driver',
      });

      // Log the response for debugging
      console.log(
        response,
        'responseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update apiresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse App Update api',
      );

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
    } catch (error) {
      // Log any errors encountered during the API call
      console.error('getUpdatePopup Error:', error);
    }
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
    console.log('Function handleToggleButton called');

    console.log('Initial isRfdOn:', isRfdOn);
    const newRfdValue = isRfdOn ? '0' : '1';
    console.log('New RFD Value:', newRfdValue);

    // Create updated login button payload
    const updatedLoginButton = {
      ...loginButton,
      rfd: newRfdValue,
      current_language: languageSwitch,
    };
    console.log('Updated loginButton payload:', updatedLoginButton);

    try {
      console.log('Calling LOGIN_BUTTON API with payload:', updatedLoginButton);
      const response = await LOGIN_BUTTON(updatedLoginButton);

      if (response?.rfd == '1') {
        dispatch(setLoginStatus(true));
      } else {
        dispatch(setLoginStatus(false));
      }

      // dispatch(setLoginStatus(response?.login_status));
      if (response?.message?.length <= 30 && response?.message) {
        setLoginMessage('');
        // Show toast if the message length is 30 or less
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      } else {
        // If the message is longer than 30 characters, set it in state
        setLoginMessage(response?.message);
        setTimeout(() => {
          setLoginMessage('');
        }, 50000);
      }

      if (response?.redirect) {
        switch (response?.redirect) {
          case 'clear-my-due-payment':
            navigation.navigate('CommanWebview', {
              url: response?.url,
            });
            break;
          case 'driver-training-module':
            navigation.navigate('CommanWebview', {
              url: response?.url,
            });
            break;
          case 'trusted-driver':
            navigation.navigate('TrustedDriver');
            break;
          default:
            navigation.navigate('CommanWebview', {
              url: response?.url,
            });
            break;
        }
      }
    } catch (error) {
      console.log('LOGIN API ERROR:', error);
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Response Status:', error.response.status);
      }
    } finally {
      console.log('Finally block executed');
    }
  };

  const [loading, setLoading] = useState(false);
  const [allOndemandBookings, setAllOndemandBookings] = useState({});
  const [allTrustedData, setAllTrustedData] = useState({});

  const getAllOndemandBookings = async () => {
    setLoading(true);
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'ondemand_bookings',
        current_language: languageSwitch,
      });

      // console.log(
      //   response,
      //   'getAllOndemandBookingsgetAllOndemandBookingsgetAllOndemandBookings response',
      // );
      setAllOndemandBookings(response);
    } catch (error) {
      console.log(
        error,
        'getAllOndemandBookingsgetAllOndemandBookingsgetAllOndemandBookings  Error',
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getAllTrustedData = async () => {
    setLoading(true);
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'trusted_other_data',
        current_language: languageSwitch,
      });

      // console.log(
      //   response,
      //   'getAllTrustedDatagetAllTrustedDatagetAllTrustedDatagetAllTrustedData response',
      // );
      setAllTrustedData(response);
      dispatch(
        setDriverConsentData(response?.ondemand_driver_consent_popup_data),
      );
    } catch (error) {
      console.log(
        error,
        'getAllTrustedDatagetAllTrustedDatagetAllTrustedDatagetAllTrustedData  Error',
      );
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

      console.log('Generated URL:', url);
      navigation.navigate('CommanWebview', {
        url: url,
      });
    } catch (error) {
      console.log('Caught error:', error);
    }
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
    } catch (error) {
      console.log(error, 'GET_POPUPGET_POPUP Error');
    }
  };

  const getHeadlineData = async () => {
    console.log('Starting to fetch headline data...');

    try {
      console.log('Sending request to DRIVER_HEADLINE with:', {
        action: 'headline_message',
        current_language: languageSwitch,
      });

      const response = await DRIVER_HEADLINE({
        current_language: languageSwitch,
      });

      console.log(
        response?.driver_panel_messages
          ?.redirect_to_website_trusted_driver_flag,
        '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
      );

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
      } else {
        dispatch(setLoginStatus(false));
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
    } catch (error) {
      console.log('DRIVER_HEADLINE Error:', error);
    }
  };

  const getHomeNotification = async () => {
    console.log('Starting to getHomeNotificationgetHomeNotification data...');

    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline_update',
        current_language: languageSwitch,
      });
      console.log(response, 'getHomeNotificationgetHomeNotificatio ----- ');

      setHomeNotificationData(response);
    } catch (error) {
      console.log('getHomeNotificationgetHomeNotification Error:', error);
    }
  };

  const getHomeNotice = async () => {
    console.log('Starting to getHomeNoticegetHomeNotice data...');

    try {
      const response = await DRIVER_NOTICE({
        action: 'view_one_awareness',
        current_language: languageSwitch,
      });

      setHomeNoticeData(response);
    } catch (error) {
      console.log('getHomeNoticegetHomeNotice Error:', error);
    }
  };

  // const getTrustedPopupRating = async () => {
  //   console.log(
  //     'Starting to getTrustedPopupRatinggetTrustedPopupRating data...',
  //   );

  //   try {
  //     const response = await GET_TRUSTED_POPUP_DATA({
  //       action: 'rating_popup_data',
  //       current_language: languageSwitch,
  //     });

  //     setRatingTrustedData(response?.rating_popup_data);
  //   } catch (error) {
  //     console.log('getTrustedPopupRatinggetTrustedPopupRating Error:', error);
  //   }
  // };

  // const getTrainingVideo = async () => {
  //   try {
  //     const response = await DRIVER_TRAINING_VIDEOS(languageSwitch);
  //     console.log(
  //       'DRIVER_TRAINING_VIDEOS DRIVER_TRAINING_VIDEOS Response::',
  //       response?.response?.training_data,
  //     );
  //     setTrainingVideoData(response?.response?.training_data);
  //   } catch (error) {
  //     console.log(error, 'DRIVER_TRAINING_VIDEOS  Error');
  //   }
  // };

  // const getTrustedPopupOtr = async () => {
  //   console.log('Starting to getTrustedPopupOtrgetTrustedPopupOtr data...');

  //   try {
  //     const response = await GET_TRUSTED_POPUP_DATA({
  //       action: 'otr_popup_data',
  //       current_language: languageSwitch,
  //     });

  //     setOtrTrustedData(response?.otr_popup_data);
  //   } catch (error) {
  //     console.log('getTrustedPopupOtrgetTrustedPopupOtr Error:', error);
  //   }
  // };

  // const getTrustedPopupBooking = async () => {
  //   console.log(
  //     'Starting to getTrustedPopupBookinggetTrustedPopupBooking data...',
  //   );

  //   try {
  //     const response = await GET_TRUSTED_POPUP_DATA({
  //       action: 'booking_popup_data',
  //       current_language: languageSwitch,
  //     });

  //     setBookingTrustedData(response?.booking_popup_data);
  //   } catch (error) {
  //     console.log('getTrustedPopupBookinggetTrustedPopupBooking Error:', error);
  //   }
  // };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(setRefreshKey());
      await getUpdatePopup();
      await getHeadlineData();
      await getHomeNotification();
      await getHomeNotice();
      await getAllTrustedData();
      if (isRfdOn) {
        await getAllOndemandBookings();
      }
    } catch (error) {
      console.log('Error during refresh:', error);
      setRefreshing(false);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, getUpdatePopup, triggerFunction, refreshKey]);

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

      console.log(
        response,
        'clickStoreHomeNotificationclickStoreHomeNotification response ',
      );

      getHeadlineData();
      getHomeNotification();
    } catch (err) {
      console.error('VIEW_HEADLINE error:', err);
    }
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
    } catch (err) {
      console.error('VIEW_HEADLINE error:', err);
    }
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {showNotification && homeNotificationData ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#f4f4f4',
                padding: 16,
              }}>
              {/* {console.log(
                '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
              )}
              {console.log(
                'run-------------------------- trustedd showNotice',
                showNotice,
              )}
              {console.log(
                'run-------------------------- trustedd showNotification',
                showNotification,
              )}
              {console.log(
                'run-------------------------- trustedd homeNotificationData',
                homeNotificationData,
              )}
              {console.log(
                'run-------------------------- trustedd homeNoticeData',
                homeNoticeData,
              )}
              {console.log(
                '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
              )} */}
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
                  {/* <TouchableOpacity
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
                      marginTop: 60,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      I Have Read the Updates notification
                    </Text>
                  </TouchableOpacity> */}

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
              {/* {console.log(
                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
              )}
              {console.log(
                'run-------------------------- trustedd showNotice',
                showNotice,
              )}
              {console.log(
                'run-------------------------- trustedd showNotification',
                showNotification,
              )}
              {console.log(
                'run-------------------------- trustedd homeNotificationData',
                homeNotificationData,
              )}
              {console.log(
                'run-------------------------- trustedd homeNoticeData',
                homeNoticeData,
              )}
              {console.log(
                '------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
              )} */}
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
            <View style={styles.mainContainer}>
              {/* {console.log(
                '==============================================================================================================================================================================================================================================================================================================================================================================================================================================',
              )}
              {console.log(
                'run-------------------------- trustedd showNotice',
                showNotice,
              )}
              {console.log(
                'run-------------------------- trustedd showNotification',
                showNotification,
              )}
              {console.log(
                'run-------------------------- trustedd homeNotificationData',
                homeNotificationData,
              )}
              {console.log(
                'run-------------------------- trustedd homeNoticeData',
                homeNoticeData,
              )}
              {console.log(
                '==============================================================================================================================================================================================================================================================================================================================================================================================================================================',
              )} */}
              {/* Marquee View */}
              <View style={styles.marqueeView}>
                <Marquee spacing={20} speed={0.5}>
                  {/* <Text style={styles.marqueeText}>
                  {headLineData?.headlines_data?.message || headLineData?.headlines_data?.headlines.map(())}
                 
                </Text> */}

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
                        onPress={() => navigation.navigate('DriverEarning')}
                        // onPress={()=>checkVibrationSupport()}
                        // onPress={() =>
                        //   openMyUrl('https://www.tatd.in/driver-earning.php')
                        // }
                      >
                        <View style={styles.earningView}>
                          <Text style={styles.rupeeIcon}>
                            <Icon name="rupee" size={responsiveSize(8)} />{' '}
                            {decodedToken &&
                              decodedToken.DriverCommisonData.earning_30days}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        // onPress={() =>
                        //   openMyUrl(
                        //     'https://www.tatd.in/driver-notifications.php',
                        //   )
                        // }

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
                            {decodedToken && decodedToken.TrustedDriverData.otr}{' '}
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
                              decodedToken.TrustedDriverData.rating}
                          </Text>
                          <Text
                            style={[
                              styles.bottamRightText,
                              {
                                color: decodedToken?.otr_all_data?.dcr?.color,
                              },
                            ]}>
                            {languageSwitch == 'english' ? 'Rating' : 'रेटिंग'}
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
                                decodedToken?.otr_all_data?.rating?.background,
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
                              decodedToken.TrustedDriverData.recent_dcr}{' '}
                            %
                          </Text>
                          <Text
                            style={[
                              styles.bottamRightText,
                              {
                                color:
                                  decodedToken?.otr_all_data?.rating?.color,
                              },
                            ]}>
                            {languageSwitch == 'english' ? 'Booking' : 'बुकिंग'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Bottom div */}
                <View style={styles.bottamContent}>
                  <TouchableOpacity
                    onPress={() => dispatch(setVideosContent(!videosContent))}
                    style={[
                      styles.bottamContent1,
                      videosContent && {backgroundColor: AppColors.mainColor},
                    ]}>
                    <Text style={styles.absoulteText}>{videoCount || 0}</Text>
                    <View style={styles.absoulteView}>
                      <Text
                        style={[
                          styles.bottamContent1Text,
                          videosContent && {color: AppColors.white},
                        ]}>
                        {languageSwitch == 'english' ? 'Training ' : 'ट्रेनिंग'}
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
                    onPress={() => navigation.navigate('MyBonusStatusHistory')}
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
                    // onPress={() => navigation.navigate('AgentLogin')}
                    // onPress={() =>
                    //   navigation.navigate('CommanWebview', {
                    //     url: `https://www.tatd.in/agent-login.php`,
                    //   })
                    // }
                    onPress={() => handleLoginPress()}
                    style={styles.bottamContent3}>
                    <Text style={styles.mainText}>
                      {languageSwitch == 'english'
                        ? 'Agent panel'
                        : 'एजेंट पैनल'}
                    </Text>
                    <Text style={styles.textIcon}>
                      <Icon name="rupee" size={responsiveSize(9)} />{' '}
                      {headLineData?.driver_panel_messages?.agent_panel_earning}
                      {/* {decodedToken?.TrustedDriverData?.agent_panel_earning} */}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      () =>
                        navigation.navigate('CommanWebview', {
                          url: `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                        })
                      // openMyUrl(
                      //   `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                      // )
                    }
                    // onPress={() => navigation.navigate('ClearMyDuePayment')}
                    style={[
                      styles.bottamContent4,
                      {
                        backgroundColor:
                          decodedToken?.clear_due_color?.background || 'yellow',
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

              {/* <ViewAwarenessData /> */}
              {/* <RoundTripBookingView /> */}
              {/* <BookingView /> */}
              <Text
                style={{
                  color: AppColors.red,
                  marginVertical: 5,
                  marginHorizontal: 15,
                }}>
                {loginMessage}
              </Text>

              {/* <Text style={{color: AppColors.whatsAppIconColor, margin: 10}}>
              {headLineData?.driver_panel_messages?.booking_score_message}
            </Text> */}

              {/* Main Toggle Content */}
              <>
                {isRfdOn ? (
                  <BookingView
                    data={headLineData}
                    allBookingData={allOndemandBookings}
                    panelData={allTrustedData?.agent_panel_view}
                  />
                ) : null}
              </>
              {/* <BookingView /> */}
              {videosContent ? <TrainingVideo /> : null}
            </View>
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
                source={Agent_Icon} // Replace with your actual image path
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 10,
                  // tintColor:
                  //   selected === 'Agent'
                  //     ? AppColors.mainColor
                  //     : AppColors.black,

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
                source={Agent_Icon} // Replace with your actual image path
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 10,
                  // tintColor:
                  //   selected === 'PremiumDriver'
                  //     ? AppColors.mainColor
                  //     : AppColors.black,

                  tintColor: AppColors.black,
                }}
              />
              {/* <Svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="30" // Set a larger width for better visibility
                height="30" // Set a larger height for better visibility
                viewBox="0 0 512 512" // Ensure this matches the actual size of your content
                preserveAspectRatio="xMidYMid meet">
                <G
                  transform="translate(0,512) scale(0.1,-0.1)"
                  fill="black"
                  stroke="black"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  strokeLinecap="round">
                  <Path d="M1490 4821 c-164 -53 -274 -166 -316 -326 -11 -38 -14 -150 -14 -462 l0 -412 26 -20 c33 -26 54 -26 87 -1 l26 21 3 417 3 417 26 56 c33 69 88 124 159 158 l55 26 325 3 c315 3 326 4 347 24 30 28 29 69 0 96 -23 22 -28 22 -348 21 -282 0 -331 -2 -379 -18z" />
                  <Path d="M2431 4814 c-27 -35 -27 -65 2 -92 19 -18 35 -22 93 -22 61 0 74 3 92 23 28 30 28 68 -1 95 -19 18 -35 22 -94 22 -65 0 -73 -2 -92 -26z" />
                  <Path d="M2821 4814 c-26 -33 -26 -54 -1 -87 l21 -26 572 -3 572 -3 56 -26 c71 -33 125 -87 158 -158 l26 -56 3 -995 2 -996 -55 10 -55 10 0 953 c0 927 -1 954 -20 1006 -24 63 -76 117 -145 149 -48 22 -60 23 -306 23 l-256 0 -49 -30 c-57 -36 -91 -89 -100 -158 -11 -80 10 -77 -479 -77 -489 0 -468 -3 -479 78 -9 66 -54 135 -108 164 -41 22 -52 23 -288 23 -179 0 -258 -4 -293 -14 -57 -16 -129 -77 -160 -135 l-22 -41 -3 -1107 -2 -1108 -55 0 -55 0 0 388 0 389 -23 21 c-30 28 -68 28 -95 -1 -22 -23 -22 -27 -22 -410 l0 -387 -99 0 c-146 0 -203 -26 -245 -109 -31 -60 -38 -105 -72 -430 l-28 -264 -60 -38 c-34 -20 -71 -45 -84 -54 l-23 -17 3 -267 3 -268 28 -36 c30 -40 74 -67 107 -67 19 0 20 -6 20 -102 0 -121 19 -174 78 -210 34 -21 51 -23 196 -26 201 -5 237 1 283 41 51 45 63 81 63 192 l0 95 264 0 264 0 4 -114 c4 -132 14 -156 88 -193 41 -21 58 -23 215 -23 157 0 174 2 215 23 25 12 55 37 67 56 20 30 23 47 23 143 0 95 2 109 18 114 9 3 35 14 57 25 37 18 63 19 353 19 l312 0 0 -190 c0 -177 1 -191 20 -210 20 -20 33 -20 600 -20 567 0 580 0 600 20 19 19 20 33 20 273 0 252 0 254 -23 275 -17 16 -36 22 -70 22 l-47 0 0 83 0 84 49 32 c87 56 159 160 195 280 14 47 16 122 16 536 l0 482 -22 33 c-34 49 -67 70 -126 77 l-52 6 0 982 c0 1071 2 1021 -57 1139 -33 65 -116 147 -184 181 -106 55 -109 55 -721 55 l-567 0 -20 -26z" />
                  <Path d="M699 361 c9 -10 19 -38 23 -63 13 -79 56 -135 127 -164 56 -24 930 -24 986 0 71 29 114 85 127 164 13 82 7 80 269 80 214 0 233 -2 264 -20 65 -40 62 7 62 -1041 0 -902 -1 -951 -17 -944 -10 4 -53 10 -95 13 l-78 5 0 264 c0 291 -3 309 -63 371 -103 108 -275 100 -364 -16 -18 -24 -37 -59 -43 -80 -6 -23 -10 -214 -10 -502 l-1 -465 -25 30 c-111 129 -193 210 -228 226 -49 22 -143 25 -190 5 -92 -38 -149 -125 -150 -226 l0 -65 183 -330 c253 -455 282 -501 353 -567 l61 -58 -337 0 -336 0 0 108 c0 105 -1 109 -27 134 -16 14 -54 40 -85 59 -52 30 -58 37 -63 74 -3 22 -18 162 -34 312 -33 299 -46 349 -107 403 -18 16 -50 34 -71 39 -23 7 -169 11 -370 11 l-333 0 0 1075 c0 1184 -3 1125 62 1165 31 18 50 20 264 20 207 0 232 -2 246 -17z" />
                  <Path d="M1499 -1432 l29 -29 0 -476 c0 -463 1 -477 20 -496 29 -29 72 -30 102 -3 15 13 18 38 20 162 l3 146 58 3 57 3 0 -146 c0 -132 2 -147 20 -165 29 -29 72 -30 102 -3 15 13 18 38 20 162 l3 146 58 3 57 3 0 -149 c0 -136 2 -152 21 -176 24 -31 66 -35 98 -8 19 16 21 28 23 172 l3 155 58 3 58 3 -3 -468 -3 -468 -29 -62 c-32 -69 -107 -148 -173 -181 -22 -12 -43 -28 -47 -37 -3 -9 -6 -68 -6 -131 l0 -114 -320 0 -320 0 0 123 c0 143 -3 136 -107 192 -40 20 -84 50 -98 66 -34 41 -95 145 -296 507 -180 323 -188 345 -149 395 22 28 74 43 110 32 12 -4 95 -91 186 -195 90 -103 171 -191 180 -194 29 -11 54 -6 74 14 20 20 20 33 20 574 0 304 3 567 6 585 16 80 108 109 165 52z" />
                  <Path d="M1408 960 c24 -9 41 -40 52 -98 l7 -33 -676 0 -676 0 0 25 c0 40 27 94 52 105 30 12 1209 13 1241 1z" />
                  <Path d="M81 -358 c4 -43 9 -99 13 -125 l6 -48 -720 0 -719 0 12 113 c7 61 13 118 13 125 1 9 147 12 695 12 l693 0 7 -77z" />
                  <Path d="M179 -399 c-82 -42 -156 -83 -162 -92 -33 -41 1 -112 52 -112 14 0 108 41 209 92 l184 92 51 -33 51 -33 0 -190 c0 -111 -4 -197 -10 -209 -10 -18 -24 -19 -250 -19 l-240 0 0 78 c0 91 -18 118 -87 178 -39 37 -81 63 -147 72z" />
                </G>
              </Svg> */}

              {/* <Svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">
                <G
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="black"
                  stroke="none">
                  <Path d="M1490 4821 c-164 -53 -274 -166 -316 -326 -11 -38 -14 -150 -14 -462 l0 -412 26 -20 c33 -26 54 -26 87 -1 l26 21 3 417 3 417 26 56 c33 69 88 124 159 158 l55 26 325 3 c315 3 326 4 347 24 30 28 29 69 0 96 -23 22 -28 22 -348 21 -282 0 -331 -2 -379 -18z" />
                  <Path d="M2431 4814 c-27 -35 -27 -65 2 -92 19 -18 35 -22 93 -22 61 0 74 3 92 23 28 30 28 68 -1 95 -19 18 -35 22 -94 22 -65 0 -73 -2 -92 -26z" />
                  <Path d="M2821 4814 c-26 -33 -26 -54 -1 -87 l21 -26 572 -3 572 -3 56 -26 c71 -33 125 -87 158 -158 l26 -56 3 -995 2 -996 -55 10 -55 10 0 953 c0 927 -1 954 -20 1006 -24 63 -76 117 -145 149 -48 22 -60 23 -306 23 l-256 0 -49 -30 c-57 -36 -91 -89 -100 -158 -11 -80 10 -77 -479 -77 -489 0 -468 -3 -479 78 -9 66 -54 135 -108 164 -41 22 -52 23 -288 23 -179 0 -258 -4 -293 -14 -57 -16 -129 -77 -160 -135 l-22 -41 -3 -1107 -2 -1108 -55 0 -55 0 0 388 0 389 -23 21 c-30 28 -68 28 -95 -1 -22 -23 -22 -27 -22 -410 l0 -387 -99 0 c-146 0 -203 -26 -245 -109 -31 -60 -38 -105 -72 -430 l-28 -264 -60 -38 c-34 -20 -71 -45 -84 -54 l-23 -17 3 -267 3 -268 28 -36 c30 -40 74 -67 107 -67 19 0 20 -6 20 -102 0 -121 19 -174 78 -210 34 -21 51 -23 196 -26 201 -5 237 1 283 41 51 45 63 81 63 192 l0 95 264 0 264 0 4 -114 c4 -132 14 -156 88 -193 41 -21 58 -23 215 -23 157 0 174 2 215 23 25 12 55 37 67 56 20 30 23 47 23 143 0 95 2 109 18 114 9 3 35 14 57 25 37 18 63 19 353 19 l312 0 0 -190 c0 -177 1 -191 20 -210 20 -20 33 -20 600 -20 567 0 580 0 600 20 19 19 20 33 20 273 0 252 0 254 -23 275 -17 16 -36 22 -70 22 l-47 0 0 83 0 84 49 32 c87 56 159 160 195 280 14 47 16 122 16 536 l0 482 -22 33 c-34 49 -67 70 -126 77 l-52 6 0 982 c0 1071 2 1021 -57 1139 -33 65 -116 147 -184 181 -106 55 -109 55 -721 55 l-567 0 -20 -26z" />
                  <Path d="M699 361 c9 -10 19 -38 23 -63 13 -79 56 -135 127 -164 56 -24 930 -24 986 0 71 29 114 85 127 164 13 82 7 80 269 80 214 0 233 -2 264 -20 65 -40 62 7 62 -1041 0 -902 -1 -951 -17 -944 -10 4 -53 10 -95 13 l-78 5 0 264 c0 291 -3 309 -63 371 -103 108 -275 100 -364 -16 -18 -24 -37 -59 -43 -80 -6 -23 -10 -214 -10 -502 l-1 -465 -25 30 c-111 129 -193 210 -228 226 -49 22 -143 25 -190 5 -92 -38 -149 -125 -150 -226 l0 -65 183 -330 c253 -455 282 -501 353 -567 l61 -58 -337 0 -336 0 0 108 c0 105 -1 109 -27 134 -16 14 -54 40 -85 59 -52 30 -58 37 -63 74 -3 22 -18 162 -34 312 -33 299 -46 349 -107 403 -18 16 -50 34 -71 39 -23 7 -169 11 -370 11 l-333 0 0 1075 c0 1184 -3 1125 62 1165 31 18 50 20 264 20 207 0 232 -2 246 -17z" />
                  <Path d="M1499 -1432 l29 -29 0 -476 c0 -463 1 -477 20 -496 29 -29 72 -30 102 -3 15 13 18 38 20 162 l3 146 58 3 57 3 0 -146 c0 -132 2 -147 20 -165 29 -29 72 -30 102 -3 15 13 18 38 20 162 l3 146 58 3 57 3 0 -149 c0 -136 2 -152 21 -176 24 -31 66 -35 98 -8 19 16 21 28 23 172 l3 155 58 3 58 3 -3 -468 -3 -468 -29 -62 c-32 -69 -107 -148 -173 -181 -22 -12 -43 -28 -47 -37 -3 -9 -6 -68 -6 -131 l0 -114 -320 0 -320 0 0 123 c0 143 -3 136 -107 192 -40 20 -84 50 -98 66 -34 41 -95 145 -296 507 -180 323 -188 345 -149 395 22 28 74 43 110 32 12 -4 95 -91 186 -195 90 -103 171 -191 180 -194 29 -11 54 -6 74 14 20 20 20 33 20 574 0 304 3 567 6 585 16 80 108 109 165 52z" />
                  <Path d="M1408 960 c24 -9 41 -40 52 -98 l7 -33 -676 0 -676 0 0 25 c0 40 27 94 52 105 30 12 1209 13 1241 1z" />
                  <Path d="M81 -358 c4 -43 9 -99 13 -125 l6 -48 -720 0 -719 0 12 113 c7 61 13 118 13 125 1 9 147 12 695 12 l693 0 7 -77z" />
                  <Path d="M179 -399 c-82 -42 -156 -83 -162 -92 -33 -41 1 -112 52 -112 14 0 108 41 209 92 l184 92 51 -33 51 -33 0 -190 c0 -111 -4 -197 -10 -209 -10 -18 -24 -19 -250 -19 l-240 0 0 78 c0 91 -18 118 -87 178 -39 37 -81 63 -147 72z" />
                </G>
              </Svg> */}
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
                source={Agent_Icon} // Replace with your actual image path
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 10,
                  // tintColor:
                  //   selected === 'TrustedPartner'
                  //     ? AppColors.mainColor
                  //     : AppColors.black,

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

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setModalVisible(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          style={{justifyContent: 'center', alignItems: 'center'}}
          isVisible={isModalVisible}>
          <OtrModal data={allTrustedData?.otr_popup_data} />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setRatingModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={ratingModal}>
          <RatingModal data={allTrustedData?.rating_popup_data} />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setBookingModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={bookingModal}>
          <BookingModal data={allTrustedData?.booking_popup_data} />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setMyBookingAgencyModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={myBookingAgencyModal}>
          <MyBookingAgencyModal />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setExpressBookingModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={popupData == 1 && expressBookingModal && expressPopupData}>
          <ExpressBookingModal data={expressPopupData} />
        </Modal>

        <Modal
          backdropOpacity={0.5}
          onBackdropPress={() => setUpdateModal(false)}
          isVisible={updateModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                // width: Dimensions.get('window').width * 0.85,
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
    marginVertical: responsiveSize(20),
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
    // borderBottomLeftRadius : 0,
    // borderBottomRightRadius: 0,
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
    // padding: responsiveSize(2),
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
