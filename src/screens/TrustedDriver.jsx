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
import MyBookingModal from '../components/MyBookingModal';
import {
  setCurrentView,
  setModalVisible,
  setBookingModal,
  setRatingModal,
  setVideosContent,
  setMyBookingAgencyModal,
  setExpressBookingModal,
} from '../redux/slices/trustedDriverSlice';
import {AppFont} from '../assets/FontsFamily';
import ToggleButton from '../components/modal/ToggleButton';
import {
  EXPRESS_BOOKING_POPUP,
  LOGIN_BUTTON,
  ON_DEMAND_BOOKING,
} from '../apis/Apis';
import {TokenConstextApi} from '../context/GlobalContext';
import ViewAwarenessData from '../components/ViewAwarenessData';
import {jwtDecode} from 'jwt-decode';
import ExpressBookingModal from '../components/modal/ExpressBookingModal';
import RoundTripBookingView from '../components/bookingsView/RoundTripBookingView';
import NotificationService from '../utils/NotificationService';
import {
  checkVibrationPermission,
  requestNotificationPermission,
} from '../utils/permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const TrustedDriver = ({navigation}) => {
  const dispatch = useDispatch();
  const {decodedToken, setDecodedToken, jwtToken, languageSwitch} =
    useContext(TokenConstextApi);
  const [popupData, setPopupData] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    currentView,
    toggleButton,
    expressBookingModal,
    mainToggleContent,
    videosContent,
    myBookingAgencyModal,
    isModalVisible,
    bookingModal,
    ratingModal,
    myBookingModal,
  } = useSelector(state => state.trustedDriver);

  useEffect(async () => {
    await requestNotificationPermission();
    await checkVibrationPermission();
    // await AsyncStorage.removeItem('jwt')
  }, []);
  const openMyUrl = url => {
    Linking.openURL(url);
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
  const timeoutRef = useRef(null);

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

  useEffect(() => {
    return () => {
      // Cleanup the timeout when the component is unmounted
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const decodeData = token => {
    const decoded = jwtDecode(token);
    // console.log(decoded.data, '>>>>>>>>>>>>>>>>');
    setDecodedToken(decoded.data);
  };

  useEffect(() => {
    decodeData(jwtToken);
  }, [jwtToken]);

  useEffect(() => {
    getPopup();
  }, [languageSwitch]);

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
    // Promise.all([]).then(() =>
    setRefreshing(false);
    // );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
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
                After watching the videos, your ID will be unlocked following a
                question and answer session.
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
                    {decodedToken && decodedToken.DriverCommisonData.commission}
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
                      openMyUrl('https://www.tatd.in/driver-notifications.php')
                    }
                    // onPress={() => navigation.navigate('DriverNotifications')}
                  >
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
                      onToggle={handleToggleButton}
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
                      <Text style={styles.bottamRightText}>{languageSwitch == 'english' ? "OTR" : "ओटीआर"}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => dispatch(setRatingModal(true))}>
                    <View style={styles.ratingView}>
                      <Text style={styles.bottamRightText}>
                        {decodedToken && decodedToken.TrustedDriverData.rating}
                      </Text>
                      <Text style={styles.bottamRightText}>{languageSwitch == 'english' ? "Rating" : "रेटिंग"}</Text>
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
                      <Text style={styles.bottamRightText}>{languageSwitch == 'english' ?"Booking" : "बुकिंग"}</Text>
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
                onPress={() => navigation.navigate('MyBonusStatusHistory')}
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
    height: responsiveSize(70),
    width: responsiveSize(70),
    borderRadius: responsiveSize(35),
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
    fontSize: responsiveSize(9),
    fontWeight: '300',
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

// import React, {useContext, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {Marquee} from '@animatereactnative/marquee';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import ToggleSwitch from 'toggle-switch-react-native';
// import Modal from 'react-native-modal';
// import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';
// import OtrModal from '../components/modal/OtrModal';
// import RatingModal from '../components/modal/RatingModal';
// import BookingModal from '../components/modal/BookingModal';
// import MainToggleModal from '../components/modal/MainToggleModal';
// import BookingView from '../components/BookingView';
// import TrainingVideo from '../components/TrainingVideos';
// import MyBookingAgencyModal from '../components/modal/MyBookingAgencyModal';
// import MyBookingModal from '../components/MyBookingModal';
// import {
//   setCurrentView,
//   setModalVisible,
//   setBookingModal,
//   setRatingModal,
//   setVideosContent,
//   setMyBookingAgencyModal,
// } from '../redux/slices/trustedDriverSlice';
// import {AppFont} from '../assets/FontsFamily';
// import ToggleButton from '../components/modal/ToggleButton';
// import {LOGIN_BUTTON} from '../apis/Apis';
// import {TokenConstextApi} from '../context/GlobalContext';
// import ViewAwarenessData from '../components/ViewAwarenessData';

// const {width} = Dimensions.get('window');

// const responsiveSize = size => {
//   return (width / 411.42857142857144) * size;
// };

// const TrustedDriver = ({navigation}) => {
//   const {jwtToken, refreshToken, setJwtToken, decodedToken, setDecodedToken} =
//     useContext(TokenConstextApi);
//   const [driverData, setDriverData] = useState(null);
//   const [isRfdOn, setIsRfdOn] = useState(false);
//   const [loginButton, setLoginButton] = useState({
//     action: 'login_button',
//     submitR: '1',
//     rfd: '0',
//   });

//   // console.log(decodedToken, '.......................');

//   const dispatch = useDispatch();
//   const {
//     currentView,
//     toggleButton,
//     mainToggleModal,
//     mainToggleContent,
//     videosContent,
//     myBookingAgencyModal,
//     isModalVisible,
//     bookingModal,
//     ratingModal,
//     myBookingModal,
//   } = useSelector(state => state.trustedDriver);

//   // const getDriverData = async () => {
//   //   if (decodedToken) {
//   //     console.log(decodedToken ,'Decoded token exists, running related code...');
//   //     // setDriverData(ddd.data);
//   //   } else {
//   //     console.log('No decoded token available, skipping related code.');
//   //   }
//   // };

//   // useEffect(() => {
//   //   getDriverData();
//   // }, [getDriverData]);

//   // console.log(driverData, 'dddddddddddddddd');

//   // console.log(ddd.data.DriverCommisonData, "ddddd data");

//   const handleToggleButton = () => {
//     const newRfdValue = isRfdOn ? '0' : '1';
//     setIsRfdOn(!isRfdOn);
//     setLoginButton(prevState => ({...prevState, rfd: newRfdValue}));

//     if (newRfdValue === '1') {
//       LOGIN_BUTTON({...loginButton, rfd: newRfdValue})
//         .then(response => {
//           console.log(response, 'LOGIN API RESPONSE');
//           Alert.alert(response.message, 'RFD Logged in successfully');
//         })
//         .catch(err => {
//           console.log(err, 'LOGIN API ERROR');
//         });
//     }
//   };
//   const Item = [
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'uuCULpkpKrA',
//     },
//     {
//       title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी। ',
//       videoId: '4HDKAi75-Vo',
//     },
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'u892FTsKLKk',
//     },
//     {
//       title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी।',
//       videoId: 'M-iyhUZ-h7o',
//     },
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'v6n5SvV3XSs',
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Header extraButton={true} />
//       {myBookingModal && <MyBookingModal />}

//       <ScrollView>
//         <View style={styles.mainContainer}>
//           {/* Marquee View */}
//           <View style={styles.marqueeView}>
//             <Marquee spacing={20} speed={0.5}>
//               <Text style={styles.marqueeText}>
//                 Please watch the remaining training videos in a quiet place.
//                 After watching the videos, your ID will be unlocked following a
//                 question and answer session.
//               </Text>
//             </Marquee>
//           </View>

//           {/* Middle Container */}
//           <View style={styles.middleContainer}>
//             <View style={styles.middleContent}>
//               {/* Top div */}
//               <View style={styles.topView}>
//                 <View style={styles.topLeft}>
//                   <Text style={styles.topLeftText}>
//                     {decodedToken && decodedToken.DriverCommisonData.commission}
//                     %
//                   </Text>
//                   <Text style={styles.bottamLeftText}>Commission</Text>
//                 </View>
//                 <View style={styles.topRight}>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('DriverEarning')}>
//                     <View style={styles.earningView}>
//                       <Text style={styles.rupeeIcon}>
//                         <Icon name="rupee" size={responsiveSize(8)} />{' '}
//                         {decodedToken &&
//                           decodedToken.DriverCommisonData.earning_30days}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('DriverNotifications')}>
//                     <View style={styles.notification}>
//                       <Icon
//                         color={AppColors.white}
//                         size={responsiveSize(22.5)}
//                         name="bell"
//                       />
//                       <Text style={styles.notificationCount}>0</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <View style={styles.toggleView}>
//                     <ToggleSwitch
//                       isOn={isRfdOn}
//                       onColor={AppColors.mainColor}
//                       offColor={AppColors.greyColor}
//                       size="medium"
//                       onToggle={handleToggleButton}
//                     />
//                   </View>
//                 </View>
//               </View>

//               {/* Bottom div */}
//               <View style={styles.bottamView}>
//                 <View style={styles.driverNameView}>
//                   <Text style={styles.driverNameText}>
//                     {/* { decodedToken &&  decodedToken.driver_name}  */}
//                     {decodedToken &&
//                       decodedToken.DriverCommisonData.driver_name}
//                     {/* Mohit */}
//                   </Text>
//                 </View>
//                 <View style={styles.bottamRightView}>
//                   <TouchableOpacity
//                     onPress={() => dispatch(setModalVisible(true))}>
//                     <View style={styles.otrView}>
//                       <Text style={styles.bottamRightText}>
//                         {' '}
//                         {decodedToken && decodedToken.TrustedDriverData.otr}
//                       </Text>
//                       <Text style={styles.bottamRightText}>OTR</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => dispatch(setRatingModal(true))}>
//                     <View style={styles.ratingView}>
//                       <Text style={styles.bottamRightText}>
//                         {decodedToken && decodedToken.TrustedDriverData.rating}
//                       </Text>
//                       <Text style={styles.bottamRightText}>Rating</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => dispatch(setBookingModal(true))}>
//                     <View style={styles.bookingView}>
//                       <Text style={styles.bottamRightText}>
//                         {decodedToken &&
//                           decodedToken.TrustedDriverData.recent_dcr}{' '}
//                         %
//                       </Text>
//                       <Text style={styles.bottamRightText}>Booking</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             {/* Bottom div */}
//             <View style={styles.bottamContent}>
//               <TouchableOpacity
//                 onPress={() => dispatch(setVideosContent(true))}
//                 style={[
//                   styles.bottamContent1,
//                   videosContent && {backgroundColor: AppColors.mainColor},
//                 ]}>
//                 <Text style={styles.absoulteText}>5</Text>
//                 <View style={styles.absoulteView}>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: AppColors.white},
//                     ]}>
//                     Training
//                   </Text>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: AppColors.white},
//                     ]}>
//                     Videos
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('MyBonusStatusHistory')}
//                 style={styles.bottamContent2}>
//                 <Text style={styles.mainText}>My Bonus</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AgentLogin')}
//                 style={styles.bottamContent3}>
//                 <Text style={styles.mainText}>Agent panel</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ClearMyDuePayment')}
//                 style={styles.bottamContent4}>
//                 <Text style={styles.mainText}>Clear My Due</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} />{' '}
//                   {decodedToken && decodedToken.DRIVER_CLEAR_MY_DUE}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Toggle Button */}
//           <ToggleButton
//             button1Label="Hindi"
//             button2Label="English"
//             onToggle={label => dispatch(setCurrentView(label))}
//           />

//           <ViewAwarenessData />

//           {/* Main Toggle Content */}
//           <View style={styles.toggleContentContainer}>
//             {mainToggleContent ? (
//               <BookingView />
//             ) : videosContent ? (
//               <TrainingVideo data={Item} />
//             ) : null}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Modals */}
//       <Modal
//         backdropOpacity={0}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={mainToggleModal}>
//         <MainToggleModal />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => dispatch(setModalVisible(false))}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={isModalVisible}>
//         <OtrModal />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => dispatch(setRatingModal(false))}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={ratingModal}>
//         <RatingModal />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => dispatch(setBookingModal(false))}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={bookingModal}>
//         <BookingModal />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => dispatch(setMyBookingAgencyModal(false))}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={myBookingAgencyModal}>
//         <MyBookingAgencyModal />
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default TrustedDriver;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     marginVertical: responsiveSize(20),
//   },
//   marqueeView: {
//     paddingHorizontal: '2%',
//   },
//   marqueeText: {
//     color: AppColors.black,
//     fontSize: responsiveSize(15),
//     fontWeight: '400',
//     lineHeight: responsiveSize(21),
//     fontFamily: 'Roboto',
//   },
//   middleContainer: {
//     margin: '4%',
//     marginTop: 0,
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: responsiveSize(10),
//     borderColor: AppColors.mainColor,
//     position: 'relative',
//   },
//   middleContent: {
//     backgroundColor: AppColors.mainColor,
//     paddingHorizontal: '3%',
//     borderRadius: responsiveSize(6),
//     marginBottom: responsiveSize(2),
//   },
//   topView: {
//     paddingTop: '3%',
//     marginBottom: '3%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   topLeft: {
//     backgroundColor: AppColors.white,
//     height: responsiveSize(70),
//     width: responsiveSize(70),
//     borderRadius: responsiveSize(35),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   topLeftText: {
//     color: AppColors.mainColor,
//     fontSize: responsiveSize(29),
//     fontWeight: 'bold',
//     fontFamily: AppFont.regularFont,
//   },
//   bottamLeftText: {
//     color: AppColors.mainColor,
//     fontSize: responsiveSize(9),
//     fontWeight: '300',
//     fontFamily: AppFont.regularFont,
//   },
//   topRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   earningView: {
//     backgroundColor: 'rgb(255,255,255)',
//     paddingHorizontal: responsiveSize(6),
//     paddingVertical: responsiveSize(4),
//     margin: responsiveSize(5),
//   },
//   rupeeIcon: {
//     color: AppColors.mainColor,
//     textAlign: 'center',
//     // padding: responsiveSize(2),
//     fontSize: responsiveSize(9),
//   },
//   notification: {
//     margin: responsiveSize(5),
//   },
//   notificationCount: {
//     position: 'absolute',
//     alignSelf: 'flex-end',
//     backgroundColor: AppColors.greyColor,
//     fontSize: responsiveSize(7),
//     fontWeight: '400',
//     padding: responsiveSize(3),
//     paddingHorizontal: responsiveSize(5),
//     color: 'rgb(256,256,256)',
//   },
//   toggleView: {
//     backgroundColor: 'rgb(217, 217, 217)',
//     borderRadius: responsiveSize(34),
//     borderWidth: 1,
//     borderColor: AppColors.greyColor,
//     margin: responsiveSize(5),
//   },
//   bottamView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: responsiveSize(10),
//   },
//   driverNameView: {
//     flex: 1,
//   },
//   driverNameText: {
//     fontSize: responsiveSize(15),
//     fontWeight: '500',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto',
//     color: 'rgb(255,255,255)',
//   },
//   bottamRightView: {
//     flexDirection: 'row',
//   },
//   otrView: {
//     backgroundColor: AppColors.mainColor,
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     paddingHorizontal: responsiveSize(8),
//     paddingVertical: responsiveSize(4),
//     margin: responsiveSize(2),
//   },
//   bottamRightText: {
//     fontSize: responsiveSize(8),
//     fontWeight: '500',
//     color: AppColors.white,
//   },
//   ratingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     margin: responsiveSize(2),
//     paddingHorizontal: responsiveSize(12),
//     paddingVertical: responsiveSize(4),
//   },
//   bookingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     paddingHorizontal: responsiveSize(8),
//     margin: responsiveSize(2),
//     paddingVertical: responsiveSize(4),
//   },
//   bottamContent: {
//     flexDirection: 'row',
//     margin: responsiveSize(3),
//   },
//   bottamContent1: {
//     backgroundColor: AppColors.white,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: responsiveSize(1),
//     flexDirection: 'row',
//   },
//   absoulteText: {
//     color: AppColors.white,
//     backgroundColor: 'rgb(195, 31, 31)',
//     fontSize: 8,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 4,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     paddingVertical: 2,
//   },
//   absoulteView: {justifyContent: 'center', alignItems: 'center'},
//   bottamContent1Text: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     fontWeight: '400',
//     textAlign: 'center',
//   },

//   bottamContent2: {
//     backgroundColor: AppColors.white,
//     paddingBottom: 3,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   bottamContent3: {
//     backgroundColor: AppColors.white,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     paddingBottom: 3,
//   },
//   bottamContent4: {
//     backgroundColor: 'yellow',
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     paddingBottom: 3,
//   },
//   mainText: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     fontWeight: '400',
//     paddingTop: 5,
//     textAlign: 'center',
//   },
//   textIcon: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     textAlign: 'center',
//   },
//   touchable: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginBottom: 5,
//     justifyContent: 'space-between',
//   },
//   iconContainer: {
//     marginRight: 10,
//     paddingTop: 2,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   textContainer: {
//     // flex: 1,
//   },
//   subjectText: {
//     color: AppColors.black,
//     fontSize: 15,
//   },
// });

// // // // ///////////////////////////////////////////////////////////////////////////////////////////

// import React, {useState, useEffect} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import {Marquee} from '@animatereactnative/marquee';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import ToggleSwitch from 'toggle-switch-react-native';
// import Modal from 'react-native-modal';
// import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';
// import OtrModal from '../components/modal/OtrModal';
// import ToggleButton from '../components/ToggleButton';
// import RatingModal from '../components/modal/RatingModal';
// import BookingModal from '../components/modal/BookingModal';
// import MainToggleModal from '../components/modal/MainToggleModal';
// import BookingView from '../components/BookingView';
// import TrainingVideo from '../components/TrainingVideos';
// import MyBookingAgencyModal from '../components/modal/MyBookingAgencyModal';
// import MyBookingModal from '../components/MyBookingModal';

// const {width, height} = Dimensions.get('window');

// const responsiveSize = size => {
//   return (width / 411.42857142857144) * size;
// };

// const TrustedDriver = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTIFICATIONS');
//   const [toggleButton, setToggleButton] = useState(false);
//   const [mainToggleModal, setMainToggleModal] = useState(false);
//   const [mainToggleContent, setMainToggleContent] = useState(false);
//   const [videosContent, setVideoContent] = useState(false);
//   const [myBookingAgencyModal, setMyBookingAgencyModal] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [bookingModal, setBookingModal] = useState(false);
//   const [ratingModal, setRatingModal] = useState(false);
//   const [myBookingModal, setMyBookingModal] = useState(false);

//   const MainToggleHandle = () => {
//     if (!toggleButton) {
//       setToggleButton(true);
//       setMainToggleModal(true);
//       setMainToggleContent(true);
//     } else {
//       setToggleButton(false);
//       setMainToggleContent(false);
//       setVideoContent(false);
//     }
//   };

//   const OpenMyBookingModal = () => {
//     setMyBookingModal(true);
//   };

//   const Item = [
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'uuCULpkpKrA',
//     },
//     {
//       title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी। ',
//       videoId: '4HDKAi75-Vo',
//     },
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'u892FTsKLKk',
//     },
//     {
//       title: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी।',
//       videoId: 'M-iyhUZ-h7o',
//     },
//     {
//       title: 'Video देखें, Login और अपनी Reference Verification पूरी करें।',
//       videoId: 'v6n5SvV3XSs',
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Header extraButton={true} OpenMyBookingModal={OpenMyBookingModal} />
//       {myBookingModal ? (
//         <MyBookingModal setMyBookingModal={setMyBookingModal} />
//       ) : null}

//       <ScrollView>
//         <View style={styles.mainContainer}>
//           {/* Marquee View */}
//           <View style={styles.marqueeView}>
//             <Marquee spacing={20} speed={0.5}>
//               <Text style={styles.marqueeText}>
//                 Please watch the remaining training videos in a quiet place.
//                 After watching the videos, your ID will be unlocked following a
//                 question and answer session.
//               </Text>
//             </Marquee>
//           </View>

//           {/* Middle Container */}
//           <View style={styles.middleContainer}>
//             <View style={styles.middleContent}>
//               {/* Top div */}
//               <View style={styles.topView}>
//                 <View style={styles.topLeft}>
//                   <Text style={styles.topLeftText}>20%</Text>
//                   <Text style={styles.bottamLeftText}>Commission</Text>
//                 </View>
//                 <View style={styles.topRight}>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('DriverEarning')}>
//                     <View style={styles.earningView}>
//                       <Text style={styles.rupeeIcon}>
//                         <Icon name="rupee" size={responsiveSize(7)} />
//                         15115
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('DriverNotifications')}>
//                     <View style={styles.notification}>
//                       <Icon
//                         color={AppColors.white}
//                         size={responsiveSize(22.5)}
//                         name="bell"
//                       />
//                       <Text style={styles.notificationCount}>0</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <View style={styles.toggleView}>
//                     <ToggleSwitch
//                       isOn={toggleButton}
//                       onColor={AppColors.mainColor}
//                       offColor={AppColors.greyColor}
//                       size="medium"
//                       onToggle={() => MainToggleHandle()}
//                     />
//                   </View>
//                 </View>
//               </View>

//               {/* Bottom div */}
//               <View style={styles.bottamView}>
//                 <View style={styles.driverNameView}>
//                   <Text style={styles.driverNameText}>MOHIT DHANAWAT</Text>
//                 </View>
//                 <View style={styles.bottamRightView}>
//                   <TouchableOpacity onPress={() => setModalVisible(true)}>
//                     <View style={styles.otrView}>
//                       <Text style={styles.bottamRightText}>4</Text>
//                       <Text style={styles.bottamRightText}>OTR</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => setRatingModal(true)}>
//                     <View style={styles.ratingView}>
//                       <Text style={styles.bottamRightText}>4</Text>
//                       <Text style={styles.bottamRightText}>Rating</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => setBookingModal(true)}>
//                     <View style={styles.bookingView}>
//                       <Text style={styles.bottamRightText}>70 %</Text>
//                       <Text style={styles.bottamRightText}>Booking</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             {/* Bottom div */}
//             <View style={styles.bottamContent}>
//               <TouchableOpacity
//                 onPress={() => setVideoContent(true)}
//                 style={[
//                   styles.bottamContent1,
//                   videosContent && {backgroundColor: AppColors.mainColor},
//                 ]}>
//                 <Text style={styles.absoulteText}>5</Text>
//                 <View style={styles.absoulteView}>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: AppColors.white},
//                     ]}>
//                     Training
//                   </Text>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: AppColors.white},
//                     ]}>
//                     Videos
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('MyBonusStatusHistory')}
//                 style={styles.bottamContent2}>
//                 <Text style={styles.mainText}>My Bonus</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AgentLogin')}
//                 style={styles.bottamContent3}>
//                 <Text style={styles.mainText}>Agent panel</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ClearMyDuePayment')}
//                 style={styles.bottamContent4}>
//                 <Text style={styles.mainText}>Clear My Due</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={responsiveSize(9)} /> 0
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Toggle Button */}
//           <ToggleButton
//             button1Label="Hindi"
//             button2Label="English"
//             onToggle={label => setCurrentView(label)}
//           />

//           {/* Main Toggle Content */}
//           <View style={styles.toggleContentContainer}>
//             {mainToggleContent ? (
//               <BookingView setMyBookingAgencyModal={setMyBookingAgencyModal} />
//             ) : videosContent ? (
//               <TrainingVideo data={Item} />
//             ) : null}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Modals */}
//       <Modal
//         backdropOpacity={0}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={mainToggleModal}>
//         <MainToggleModal setMainToggleModal={setMainToggleModal} />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => setModalVisible(false)}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={isModalVisible}>
//         <OtrModal setModalVisible={setModalVisible} />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => setRatingModal(false)}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={ratingModal}>
//         <RatingModal setRatingModal={setRatingModal} />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => setBookingModal(false)}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={bookingModal}>
//         <BookingModal setBookingModal={setBookingModal} />
//       </Modal>

//       <Modal
//         backdropOpacity={0}
//         onBackdropPress={() => setMyBookingAgencyModal(false)}
//         animationIn={'fadeInDown'}
//         animationOut={'fadeOutUp'}
//         isVisible={myBookingAgencyModal}>
//         <MyBookingAgencyModal
//           setMyBookingAgencyModal={setMyBookingAgencyModal}
//         />
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     marginVertical: responsiveSize(20),
//   },
//   marqueeView: {
//     paddingHorizontal: '2%',
//   },
//   marqueeText: {
//     color: AppColors.black,
//     fontSize: responsiveSize(15),
//     fontWeight: '400',
//     lineHeight: responsiveSize(21),
//     fontFamily: 'Roboto',
//   },
//   middleContainer: {
//     margin: '4%',
//     marginTop: 0,
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: responsiveSize(10),
//     borderColor: AppColors.mainColor,
//     position: 'relative',
//   },
//   middleContent: {
//     backgroundColor: AppColors.mainColor,
//     paddingHorizontal: '3%',
//     borderRadius: responsiveSize(6),
//     marginBottom: responsiveSize(2),
//   },
//   topView: {
//     paddingTop: '3%',
//     marginBottom: '3%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   topLeft: {
//     backgroundColor: AppColors.white,
//     height: responsiveSize(70),
//     width: responsiveSize(70),
//     borderRadius: responsiveSize(35),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   topLeftText: {
//     color: AppColors.mainColor,
//     fontSize: responsiveSize(25),
//     fontWeight: '700',
//     fontFamily: AppFont.regularFont,
//   },
//   bottamLeftText: {
//     color: AppColors.mainColor,
//     fontSize: responsiveSize(9),
//     fontWeight: '300',
//     fontFamily: AppFont.regularFont,
//   },
//   topRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   earningView: {
//     backgroundColor: 'rgb(255,255,255)',
//     paddingHorizontal: responsiveSize(6),
//     paddingVertical: responsiveSize(4),
//     margin: responsiveSize(5),
//   },
//   rupeeIcon: {
//     color: AppColors.mainColor,
//     textAlign: 'center',
//     padding: responsiveSize(2),
//     fontSize: responsiveSize(7),
//   },
//   notification: {
//     margin: responsiveSize(5),
//   },
//   notificationCount: {
//     position: 'absolute',
//     alignSelf: 'flex-end',
//     backgroundColor: AppColors.greyColor,
//     fontSize: responsiveSize(7),
//     fontWeight: '400',
//     padding: responsiveSize(3),
//     paddingHorizontal: responsiveSize(5),
//     color: 'rgb(256,256,256)',
//   },
//   toggleView: {
//     backgroundColor: 'rgb(217, 217, 217)',
//     borderRadius: responsiveSize(34),
//     borderWidth: 1,
//     borderColor: AppColors.greyColor,
//     margin: responsiveSize(5),
//   },
//   bottamView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: responsiveSize(10),
//   },
//   driverNameView: {
//     flex: 1,
//   },
//   driverNameText: {
//     fontSize: responsiveSize(15),
//     fontWeight: '500',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto',
//     color: 'rgb(255,255,255)',
//   },
//   bottamRightView: {
//     flexDirection: 'row',
//   },
//   otrView: {
//     backgroundColor: AppColors.mainColor,
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     paddingHorizontal: responsiveSize(8),
//     paddingVertical: responsiveSize(4),
//     margin: responsiveSize(2),
//   },
//   bottamRightText: {
//     fontSize: responsiveSize(8),
//     fontWeight: '500',
//     color: AppColors.white,
//   },
//   ratingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     margin: responsiveSize(2),
//     paddingHorizontal: responsiveSize(12),
//     paddingVertical: responsiveSize(4),
//   },
//   bookingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: responsiveSize(7),
//     borderColor: AppColors.white,
//     alignItems: 'center',
//     paddingHorizontal: responsiveSize(8),
//     margin: responsiveSize(2),
//     paddingVertical: responsiveSize(4),
//   },
//   bottamContent: {
//     flexDirection: 'row',
//     margin: responsiveSize(3),
//   },
//   bottamContent1: {
//     backgroundColor: AppColors.white,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: responsiveSize(1),
//     flexDirection: 'row',
//   },
//   absoulteText: {
//     color: AppColors.white,
//     backgroundColor: 'rgb(195, 31, 31)',
//     fontSize: 8,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 4,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     paddingVertical: 2,
//   },
//   absoulteView: {justifyContent: 'center', alignItems: 'center'},
//   bottamContent1Text: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     fontWeight: '400',
//     textAlign: 'center',
//   },

//   bottamContent2: {
//     backgroundColor: AppColors.white,
//     paddingBottom: 3,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   bottamContent3: {
//     backgroundColor: AppColors.white,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     paddingBottom: 3,
//   },
//   bottamContent4: {
//     backgroundColor: 'yellow',
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     paddingBottom: 3,
//   },
//   mainText: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     fontWeight: '400',
//     paddingTop: 5,
//     textAlign: 'center',
//   },
//   textIcon: {
//     color: AppColors.mainColor,
//     fontSize: 9,
//     textAlign: 'center',
//   },
// });

// export default TrustedDriver;
