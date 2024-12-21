import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

import {AppFont} from '../assets/FontsFamily';
import ToggleButton from '../components/modal/ToggleButton';
import {
  EXPRESS_BOOKING_POPUP,
  GET_FCM_TOKEN,
  LOGIN_BUTTON,
  ON_DEMAND_BOOKING,
} from '../apis/Apis';
import ExpressBookingModal from '../components/modal/ExpressBookingModal';
import {
  checkVibrationPermission,
  requestNotificationPermission,
} from '../utils/permissions';
import {
  setBookingModal,
  setCurrentView,
  setExpressBookingModal,
  setModalVisible,
  setMyBookingAgencyModal,
  setRatingModal,
  setVideosContent,
} from '../redux/slices/trustedDriverSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';
const {width} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const TrustedDriver = ({navigation}) => {
  const dispatch = useDispatch();
  const [popupData, setPopupData] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [fcmtoken, setFcmToken] = useState();

  const currentView = useSelector(
    state => state.trustedDriverSlice.currentView,
  );
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

  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  // useEffect(() => {
  //   const initializePermissions = async () => {
  //     try {
  //       await requestNotificationPermission();
  //       await checkVibrationPermission();
  //       // Optionally remove JWT for testing
  //       // await AsyncStorage.removeItem('jwt');
  //     } catch (error) {
  //       console.error('Error initializing permissions:', error);
  //     }
  //   };

  //   initializePermissions();
  // }, []);
  const openMyUrl = url => {
    Linking.openURL(url);
  };

  const isFcmSent = useSelector(e => e?.userAuth?.isFcmSent);
  console.log(isFcmSent, 'isFcmSentisFcmSentisFcmSentisFcmSentisFcmSent');

  useEffect(() => {
    if (!isFcmSent) getFcmToken();
  }, []);

  // const getFcmToken = async () => {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       // For iOS, register for remote messages explicitly
  //       await messaging().registerDeviceForRemoteMessages();
  //     } else {
  //       // For Android, ensure the registration for remote messages
  //       await requestNotificationPermission();
  //     }

  //     // Request notification permissions (only if you plan to display notifications)
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (!enabled) {
  //       // Alert.alert('Permission not granted for notifications');
  //       return;
  //     }

  //     // Retrieve the FCM token
  //     const tokenvalue = await messaging().getToken();
  //     // console.warn('FCM token generated:', tokenvalue);
  //     sendNotificationMessage(tokenvalue)
  //     setFcmToken(tokenvalue)
  //     console.log('FCM token generated:', tokenvalue);

  //     // Save the token to AsyncStorage for later use
  //     // await AsyncStorage.setItem('fcmToken', tokenvalue);
  //   } catch (error) {
  //     console.log('Error generating FCM token:', error);
  //     // Alert.alert(
  //     //   'Error generating FCM token:',
  //     //   error?.message || error.toString(),
  //     // );
  //   }
  // };

  const getFcmToken = async () => {
    try {
      let tokenvalue = null;

      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('iOS: Permission not granted.');
          return;
        }

        tokenvalue = await messaging().getToken();
        console.log(tokenvalue, 'ios tokenios token');
      } else {
        // For Android, directly get the token without requiring permission
        await requestNotificationPermission();
        tokenvalue = await messaging().getToken();
        console.log(tokenvalue, 'Android tokenAndroid token');
      }

      if (tokenvalue) {
        sendNotificationMessage(tokenvalue);
        setFcmToken(tokenvalue);
        console.log('FCM token generated:', tokenvalue);
      } else {
        console.log('Failed to generate FCM token.');
      }
    } catch (error) {
      console.log('Error generating FCM token:', error);
    }
  };

  const sendNotificationMessage = async fcmtoken => {
    const response = await GET_FCM_TOKEN({
      fcm_token: fcmtoken,
      action: 'save_fcm',
    });
    dispatch(
      setUserAuthStates({
        key: 'isFcmSent',
        value: true,
      }),
    );
  };

  // const [loginButton, setLoginButton] = useState({
  //   action: 'login_button',
  //   submitR: '1',
  //   rfd: '0',
  // });
  // const [isRfdOn, setIsRfdOn] = useState(false); // State to track if the toggle is on
  // const [isDisabled, setIsDisabled] = useState(false); // State to disable the toggle button
  // const timerRef = useRef(null); // Ref to store the timeout

  // const handleToggleButton = () => {
  //   if (isRfdOn && isDisabled) {
  //     Alert.alert('Please wait 30 minutes');
  //     return;
  //   }

  //   const newRfdValue = isRfdOn ? '0' : '1';
  //   setIsRfdOn(!isRfdOn); // Update the toggle state
  //   setLoginButton(prevState => ({
  //     ...prevState,
  //     rfd: newRfdValue,
  //   })); // Update the loginButton state

  //   if (newRfdValue === '1') {
  //     // Disable the button for 30 minutes
  //     // setIsDisabled(true);

  //     // Call the LOGIN_BUTTON function (replace with your actual API call)
  //     LOGIN_BUTTON({...loginButton, rfd: newRfdValue})
  //       .then(response => {
  //         console.log(response, 'LOGIN API RESPONSE');
  //         Alert.alert(response.data?.message);
  //       })
  //       .catch(err => {
  //         console.log(err, 'LOGIN API ERROR');
  //       });

  //     // Set a 30-minute timeout to enable the toggle again
  //     timerRef.current = setTimeout(() => {
  //       setIsRfdOn(false); // Automatically turn off the toggle after 30 minutes
  //       setLoginButton(prevState => ({
  //         ...prevState,
  //         rfd: '0',
  //       }));
  //       setIsDisabled(false); // Re-enable the toggle button after 30 minutes
  //       Alert.alert('Toggle automatically turned off after 30 minutes');
  //     }, 1800000); // 30 minutes in milliseconds
  //   } else {
  //     // If toggled OFF manually, clear the existing timeout (if any)
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //       timerRef.current = null;
  //     }
  //   }
  // };

  // // useEffect to clear the timeout if the component is unmounted or re-rendered
  // useEffect(() => {
  //   return () => {
  //     // Cleanup the timer when the component unmounts
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };
  // }, []);

  const [isRfdOn, setIsRfdOn] = useState(false);
  const [loginButton, setLoginButton] = useState({
    action: 'login_button',
    submitR: '1',
    rfd: '0',
  });

  const handleToggleButton = () => {
    const newRfdValue = isRfdOn ? '0' : '1';
    setIsRfdOn(!isRfdOn);
    setLoginButton(prevState => ({...prevState, rfd: newRfdValue}));

    // if (newRfdValue == '1') {
    //   // Start the 30 minute timer
    //   timeoutRef.current = setTimeout(() => {
    //     setIsRfdOn(false);
    //     setLoginButton(prevState => ({...prevState, rfd: '0'}));
    //     Alert.alert('Toggle switched off after 30 minutes');
    //   }, 1800000); // 30 minutes in milliseconds (1800000 ms)

    LOGIN_BUTTON({...loginButton, rfd: newRfdValue})
      .then(response => {
        console.log(response, 'LOGIN API RESPONSE');
        // Alert.alert(response.message, response.data.redirect);
      })
      .catch(err => {
        console.log(err, 'LOGIN API ERROR');
      });
    // }
    // else {
    //   // If toggled off before 30 minutes, clear the timeout
    //   if (timeoutRef.current) {
    //     clearTimeout(timeoutRef.current);
    //     timeoutRef.current = null;
    //   }
    // }
  };

  // const decodeData = token => {
  //   const decoded = jwtDecode(token);
  //   // console.log(decoded.data, '>>>>>>>>>>>>>>>>');
  //   setDecodedToken(decoded.data);
  // };

  // useEffect(() => {
  //   decodeData(jwtToken);
  // }, [jwtToken]);
  const jwt = useSelector(e => e?.userAuth?.jwt);
  // console.log(jwt, 'jwt token FROM TETSED DRVICE SCEEEB');
  useEffect(() => {
    if (jwt) {
      getPopup();
    }
  }, [jwt]);

  const getPopup = async () => {
    try {
      const response = await EXPRESS_BOOKING_POPUP({
        action: 'check_popup',
        current_language: languageSwitch,
      });
      console.log(response, 'GET_POPUP  Response ');
      if (response.express_booking_popup_flag == 1) {
        console.log('run popup flaggggggg');

        dispatch(setExpressBookingModal(true));
        setPopupData(response.express_booking_popup_flag);
      } else {
        dispatch(setExpressBookingModal(false));
      }
    } catch (error) {
      console.log(error, 'GET_POPUPGET_POPUP Error');
    }
  };

  const [showBookingView, setBookingView] = useState(1);

  // const getOnDemandBooking = async data => {
  //   try {
  //     const response = await ON_DEMAND_BOOKING(data);

  //     console.log(
  //       response.incity_one_way_bookings.access_flag,
  //       `On Demand Booking response ${data.action}`,
  //     );
  //     // setBookingView(response.incity_one_way_bookings.access_flag);
  //     // setIncityOneWayBooking(response.incity_one_way_bookings);
  //   } catch (error) {
  //     console.log(error, 'On Demand Booking  Error');
  //   }
  // };

  // useEffect(() => {
  //   getOnDemandBooking({
  //     action: 'ondemand_outstation_bookings',
  //   });
  //   getOnDemandBooking({
  //     action: 'incity_roundtrip_booking',
  //   });
  //   getOnDemandBooking({
  //     action: 'incity_oneway_booking',
  //   });
  // }, []);
  ///////////
  // const handleToggleButton = () => {
  //   const newRfdValue = isRfdOn ? '0' : '1';
  //   setIsRfdOn(!isRfdOn);
  //   setLoginButton(prevState => ({...prevState, rfd: newRfdValue}));

  //   if (newRfdValue === '1') {
  //     LOGIN_BUTTON({...loginButton, rfd: newRfdValue})
  //       .then(response => {
  //         console.log(response, 'LOGIN API RESPONSE');
  //         // navigation.navigate('TrustedDriver');
  //         Alert.alert(response.data?.message);
  //       })
  //       .catch(err => {
  //         console.log(err, 'LOGIN API ERROR');
  //       });
  //   }
  // };

  const Item = [
    {
      title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
      videoId: 'uuCULpkpKrA',
    },
    {
      title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी। ',
      videoId: '4HDKAi75-Vo',
    },
    {
      title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
      videoId: 'u892FTsKLKk',
    },
    {
      title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी।',
      videoId: 'M-iyhUZ-h7o',
    },
    {
      title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
      videoId: 'v6n5SvV3XSs',
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);
  // return false
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safeArea}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />
      <SafeAreaView style={{flex: 1}}>
        <Header extraButton={true} />
        {myBookingModal && <MyBookingModal />}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            {/* Marquee View */}
            <View style={styles.marqueeView}>
              <Marquee spacing={20} speed={0.5}>
                <Text style={styles.marqueeText}>
                  Please watch the remaining training videos in a quiet place.
                  After watching the videos, your ID will be unlocked following
                  a question and answer session.
                </Text>
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
                      // onPress={() => navigation.navigate('DriverEarning')}
                      onPress={() =>
                        openMyUrl('https://www.tatd.in/driver-earning.php')
                      }>
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
                        openMyUrl(
                          'https://www.tatd.in/driver-notifications.php',
                        )
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
                      <View style={styles.otrView}>
                        <Text style={styles.bottamRightText}>
                          {decodedToken && decodedToken.TrustedDriverData.otr} %
                        </Text>
                        <Text style={styles.bottamRightText}>
                          {languageSwitch == 'english' ? 'OTR' : 'ओटीआर'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(setRatingModal(true))}>
                      <View style={styles.ratingView}>
                        <Text style={styles.bottamRightText}>
                          {decodedToken &&
                            decodedToken.TrustedDriverData.rating}
                        </Text>
                        <Text style={styles.bottamRightText}>
                          {languageSwitch == 'english' ? 'Rating' : 'रेटिंग'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(setBookingModal(true))}>
                      <View style={styles.bookingView}>
                        <Text style={styles.bottamRightText}>
                          {decodedToken &&
                            decodedToken.TrustedDriverData.recent_dcr}{' '}
                          %
                        </Text>
                        <Text style={styles.bottamRightText}>
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
                  <Text style={styles.absoulteText}>5</Text>
                  <View style={styles.absoulteView}>
                    <Text
                      style={[
                        styles.bottamContent1Text,
                        videosContent && {color: AppColors.white},
                      ]}>
                      {languageSwitch == 'english' ? 'Training' : 'ट्रेनिंग'}
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
                  // onPress={() => navigation.navigate('MyBonusStatusHistory')}
                  // onPress={() => navigation.navigate('DueAmountDetails')}
                  // onPress={() => navigation.navigate('DutyReportUpdateScreen')}
                  onPress={() => navigation.navigate('RateUsAtSocialMedia')}
                  // onPress={() => navigation.navigate('OnTimeReach')}
                  // onPress={() => navigation.navigate('RatingScreen')}
                  // onPress={() => navigation.navigate('ReviewScreen')}
                  // onPress={() => navigation.navigate('DutyReportUpdate')}
                  // onPress={() => navigation.navigate('DueAmount')}

                  style={styles.bottamContent2}>
                  <Text style={styles.mainText}>
                    {languageSwitch == 'english' ? 'My Bonus' : 'मेरा बोनस'}
                  </Text>
                  <Text style={styles.textIcon}>
                    <Icon name="rupee" size={responsiveSize(9)} /> 0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AgentLogin')}
                  style={styles.bottamContent3}>
                  <Text style={styles.mainText}>
                    {languageSwitch == 'english' ? 'Agent panel' : 'एजेंट पैनल'}
                  </Text>
                  <Text style={styles.textIcon}>
                    <Icon name="rupee" size={responsiveSize(9)} /> 0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    openMyUrl(
                      `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                    )
                  }
                  // onPress={() => navigation.navigate('ClearMyDuePayment')}
                  style={styles.bottamContent4}>
                  <Text style={styles.mainText}>
                    {languageSwitch == 'english'
                      ? 'Clear My Due'
                      : 'बकाया जमा करें'}
                  </Text>
                  <Text style={styles.textIcon}>
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

            {/* Main Toggle Content */}
            <>{isRfdOn ? <BookingView /> : null}</>
            {/* {videosContent ? <TrainingVideo data={Item} /> : null} */}
          </View>
        </ScrollView>

        {/* Modals */}

        <Modal
          backdropOpacity={0}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={popupData == 1 && expressBookingModal}>
          <ExpressBookingModal />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setModalVisible(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          style={{justifyContent: 'center', alignItems: 'center'}}
          isVisible={isModalVisible}>
          <OtrModal />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setRatingModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={ratingModal}>
          <RatingModal />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => dispatch(setBookingModal(false))}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={bookingModal}>
          <BookingModal />
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
          isVisible={expressBookingModal}>
          <ExpressBookingModal />
        </Modal>
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
    backgroundColor: AppColors.mainColor,
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
    backgroundColor: 'yellow',
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
