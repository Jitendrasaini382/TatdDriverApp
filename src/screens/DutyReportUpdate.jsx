import React, {useEffect, useState} from 'react';
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
  Platform,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
// import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import {Address, CallingGif, Facebook_Icon, Mask} from '../assets/images';
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
  DRIVER_REACH,
  DUTY_REPORT_BOOKING_ACCEPT,
  DUTY_REPORT_TRIP_STATUS_POPUP_VIEW,
  GET_BOOKING_INFO,
  PACKAGE_DETAILS_DUTY_REPORT,
  TALK_TO_CUSTOMER,
} from '../apis/Apis';
import {useSelector} from 'react-redux';
import {AppFont} from '../assets/FontsFamily';
import Toast from 'react-native-toast-message';

// const RadioButtonWithTitle = ({booking}) => {

//   return (

//   );
// };

const DutyReportUpdate = ({route, navigation}) => {
  const {
    bookingNumber,
    //  tripStatus,
    state,
  } = route?.params;
  console.log(bookingNumber, 'bookingggg');
  // console.log(tripStatus, 'trip status');

  const [cancel, setCancel] = useState(false);
  const [completeBooking, setCompleteBooking] = useState(false);
  const [modalVisibleOntheway, setModalVisibleOntheway] = useState(false);
  const [modalVisibleRich, setModalVisibleRich] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalVisibleinput, setModalVisibleinput] = useState(false);
  const [modalVisibleonTimeRich, setModalVisibleonTimeRich] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [modalVisibleEnd, setModalVisibleEnd] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setLoader] = useState(false);

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
        'talkToCustomer API uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu ',
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
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: response?.alert,
      });
      GetAllBookingInfo();
      console.log(response, 'talk to customer Api response');
    } catch (error) {
      console.log(error, 'talk to customer Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const customerWantToCancel = async () => {
    setLoader(true);
    try {
      const response = await CUSTOMER_WANT_TO_CANCEL({
        action: 'duty_report_send_cancel_sms',
        booking_id: bookingNumber,
        sub_status: 'Cancel Booking',
      });
      GetAllBookingInfo();
      console.log(response, 'talk to customer Api response');
    } catch (error) {
      console.log(error.message, 'talk to customder Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const options = [
    {id: '1', label: 'Have you talked to the customer ?'},
    {id: '2', label: 'Is the customer not picking up the phone ?'},
    {id: '3', label: 'The customer wants to cancel ?'},
  ];

  // Define functions for each option
  // const handleOption1 = () => {
  //   console.log('Option 1 selected: Have you talked to the customer?');
  //   // Add your logic here
  // };

  // const handleOption2 = () => {
  //   console.log('Option 2 selected: Is the customer not picking up the phone?');
  //   // Add your logic here
  // };

  // const handleOption3 = () => {
  //   console.log('Option 3 selected: The customer wants to cancel?');
  //   // Add your logic here
  // };

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
  // const driverMobileNumber = useSelector(
  //   e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  // );

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

      // console.log(
      //   {
      //     action: 'duty_report_booking_info',
      //     booking_id: bookingNumber,
      //     current_language: languageSwitch,
      //     // trip_status: tripStatus,
      //   },
      //   'send action',
      // );

      setbookingInfo(response?.duty_report_booking_info);

      // console.log(
      //   response?.duty_report_booking_info,
      //   'GetAllBookingInfo success',
      // );
      console.log(
        response?.duty_report_booking_info,
        'GetAllBookingInfo Api response',
      );
    } catch (error) {
      console.log(error, 'GetAllBookingInfo Api error - Error');
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

  const dutyReportTripStatusPopup = async () => {
    setLoader(true);
    try {
      const response = await DUTY_REPORT_TRIP_STATUS_POPUP_VIEW({
        action: 'duty_report_trip_status_popup_view',
        booking_id: bookingNumber,
        booking_status_id: '15',
        current_language: languageSwitch,
      });

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
    try {
      const res = await CHECK_IS_BOOKING_IS_UPCOMMING({
        action: 'check_future_booking',
        booking_id: bookingNumber,
        current_language: languageSwitch,
      });

      if (res?.upcoming_booking_data?.upcoming_booking_eligibility == 1) {
        // Alert.alert(res?.upcoming_booking_data?.upcoming_booking_error_msg);
        setisBookingApiErrPopup(true);
        setisBookingApiPopupMsge(
          res?.upcoming_booking_data?.upcoming_booking_error_msg,
        );
        return false;
      } else {
        driverOnTheWay();
      }
      console.log(res, 'isBookingChkApi Responseeeeeeeeeeeeeeeeeeee');
    } catch (err) {
      console.log(err, 'isBookingUpcommingApiErrrrrrrr');
      driverOnTheWay();
    }
  };
  const driverOnTheWay = async () => {
    // console.log(
    //   {
    //     action: 'duty_report_booking_ontheway',
    //     booking_id: bookingNumber,
    //     current_language: languageSwitch,
    //     trip_status: bookingInfo?.condition?.next_booking_status_id,
    //   },
    //   'on the way body data',
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
      //   action: 'duty_report_booking_ontheway',
      //   booking_id: bookingNumber,
      //   current_language: languageSwitch,
      //   trip_status: bookingInfo?.condition?.next_booking_status_id,
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
    try {
      const res = await DRIVER_BOOKING_REACH({
        action: 'duty_report_booking_reach',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        // trip_status: bookingInfo?.condition?.next_booking_status_id,
        trip_status: 20,
      });
      console.log(res, 'duty_report_booking_reach Responseeeeee');
      setModalVisibleRich(false);
      setModalVisibleinput(true);
      GetAllBookingInfo();
    } catch (err) {
      console.log(err, 'duty_report_booking_reach Errrrrrrrrrrrrrrrr');
    }
  };
  const [acceptBookingPopup, setacceptBookingPopup] = useState(false);

  const driverReached = async () => {
    setLoader(true);
    try {
      const res = await DRIVE_START({
        action: 'duty_report_booking_start',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: '25',
        start_kms: null,
        otp: inputValue,
      });
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
  const bookingEnd = async () => {
    try {
      const res = await DRIVE_END({
        action: 'duty_report_booking_end',
        booking_id: bookingNumber,
        current_language: languageSwitch,
        trip_status: '30',
      });
      navigation.navigate('DueAmount', {bookingNumber});
      console.log(res, 'booking end api response');
    } catch (err) {
      console.log(err, 'booking end api Err');
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
      }}>
      <Header backButton={true} />
      <Toast visibilityTime={5000} topOffset={50} />

      {state === 'cancel' ? (
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
                  fontFamily: 'Poppins',
                }}>
                Booking is Already Cancelled{' '}
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
            borderWidth:.5,
            borderColor:AppColors.black
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
              justifyContent:"flex-start",
              color: AppColors.black
            }}>
            Booking No: #{bookingNumber}
          </Text>
          <TouchableOpacity
           onPress={()=>navigation.navigate("DueAmount", {bookingNumber})}
            style={{
              backgroundColor: 'green',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              elevation: 2,
              alignSelf:"center"
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
        <ScrollView style={{flex: 1}}>
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

                    //   controls:false
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
              backgroundColor: 'white',
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
                    color: 'white',
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
                {/* <Image
                  source={Mask}
                  resizeMode="contain"
                  style={{
                    height: 60,
                    width: 140,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                /> */}
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
                      <ActivityIndicator color={AppColors.white} />
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
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
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
                    color: 'white',
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
                  I will reach on time
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
                Customer's time is very valuable
              </Text>
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
                  // driverOnTheWay();
                  isBookingUpcomming();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  On The Way
                </Text>
              </TouchableOpacity>
            </ScrollView>
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
              backgroundColor: 'white',
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
                    color: 'white',
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
                      color: 'white',
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
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: '#16588e',
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
                  backgroundColor: '#16588e',
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
                    color: 'white',
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
                  I have reached the customer's address.
                </Text>
              </View>
              <View style={{marginVertical: 30}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  And ready to provide excellent service.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#16588e',
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
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Reach
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
          <Toast visibilityTime={3000} />
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: '#16588e',
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
                  backgroundColor: '#16588e',
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
                    color: 'white',
                  }}>
                  Guests are like God
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
              <View style={{marginVertical: 5}}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    onLayout={event => {
                      const {width} = event.nativeEvent.layout;
                      setTextWidth(width);
                    }}>
                    Resend OTP?
                  </Text>
                  <View
                    style={{
                      marginTop: 2,
                      height: 1,
                      backgroundColor: 'black',
                      width: textWidth,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#16588e',
                    marginTop: '40%',
                    padding: 12,
                    borderRadius: 6,
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: '20%',
                    marginBottom: 120,
                  }}
                  onPress={() => {
                    driverReached();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* on time reach */}
      <Modal
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
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: '#16588e',
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
                  backgroundColor: '#16588e',
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
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Reach
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: '#16588e',
                  borderRadius: 20,
                  marginBottom: 20,
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
                  backgroundColor: '#16588e',
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
                    color: 'white',
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
                  I Know that our work is challenging. Despite this, I made sure
                  to provide excellent service to the customer like a
                  professional partner
                </Text>
              </View>
              <View style={{marginVertical: 30}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#16588e',
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
                    bookingEnd();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    End
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
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
});
