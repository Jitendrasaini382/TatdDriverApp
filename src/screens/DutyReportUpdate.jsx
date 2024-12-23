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
  CUSTOMER_NOT_PICKUP_PHONE,
  CUSTOMER_WANT_TO_CANCEL,
  GET_BOOKING_INFO,
  TALK_TO_CUSTOMER,
} from '../apis/Apis';
import {useSelector} from 'react-redux';

const RadioButtonWithTitle = ({booking}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [loader, setLoader] = useState(false);

  console.log(booking, languageSwitch, 'radio button Booking');

  const talkToCustomer = async () => {
    setLoader(true);
    try {
      const response = await TALK_TO_CUSTOMER({
        action: 'confirm_booking',
        booking_number: booking,
      });

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
        booking_number: booking,
        current_language: languageSwitch,
        sub_status: 'Not Picking Call',
      });

      console.log(response, 'talk to customer Api response');
    } catch (error) {
      console.log(error.message, 'talk to customer Api error - General Error');
    } finally {
      setLoader(false);
    }
  };

  const customerWantToCancel = async () => {
    setLoader(true);
    try {
      const response = await CUSTOMER_WANT_TO_CANCEL({
        action: 'duty_report_send_cancel_sms',
        booking_number: booking,
        sub_status: 'Cancel Booking',
      });
      console.log(response, 'talk to customer Api response');
    } catch (error) {
      console.log(error.message, 'talk to customer Api error - General Error');
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
      case '1':
        // handleOption1();
        talkToCustomer();
        break;
      case '2':
        notPickupPhoneCustomer();
        break;
      case '3':
        customerWantToCancel();
        break;
      default:
        console.log('Invalid option selected');
    }
  };

  return (
    <View style={styles.radioButtonView}>
      {options.map(option => (
        <RadioButton
          key={option.id}
          label={option.label}
          selected={selectedOption === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </View>
  );
};

// const CancelBooking = () => {
//   return (
//     <View
//       style={{
//         marginTop: 30,
//         padding: 10,
//       }}>
//       <View
//         style={{
//           borderColor: 'rgb(128,128,128)',
//           backgroundColor: AppColors.white,
//           borderWidth: 1,
//           borderStyle: 'solid',
//           borderRadius: 8,
//           lineHeight: 20,
//           shadowColor: 'rgb(128,128,128)',
//           shadowOffset: {width: 5, height: 4},
//           shadowOpacity: 5,
//           elevation: 5,
//           shadowRadius: 5,
//           marginBottom: 20,
//           padding: 10,
//         }}>
//         <View style={{padding: 14, alignItems: 'flex-start'}}>
//           <Text
//             style={{
//               textAlign: 'auto',
//               color: AppColors.black,
//               fontWeight: '700',
//               fontSize: 21,
//               fontFamily: 'Poppins',
//             }}>
//             Booking is Already Cancelled{' '}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const AcceptBooking = ({modalShow, booking}) => {
//   const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
//     useState(false);

//   const handleSwipe = () => {
//     modalShow();
//   };

//   const openPhoneDialer = () => {
//     const phoneNumber = '9810360792';
//     let url = `tel:${phoneNumber}`;

//     Linking.openURL(url)
//       .then(() => console.log('Phone dialer opened successfully'))
//       .catch(err => {
//         console.error('Error opening phone dialer:', err);
//       });
//   };

//   return (
//     <ScrollView style={{flex: 1}}>
//       <View style={styles.mainView}>
//         {/* top */}
//         <View style={styles.topSection}>
//           <Text style={styles.interviewTimeText}>
//             Interview Time- {booking.booking_date}
//           </Text>
//         </View>
//         <View style={styles.bookingSection}>
//           <View>
//             <Text style={styles.bookingNoText}>Booking No : #431062</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => setPackageDetailsDutyReportUpdate(true)}
//             style={styles.packageDetailsButton}>
//             <Text style={styles.packageDetailsText}>Package Details</Text>
//           </TouchableOpacity>
//         </View>
//         <Modal
//           transparent={true}
//           animationType="slide"
//           visible={packageDetailsDutyReportUpdate}
//           onRequestClose={() => setPackageDetailsDutyReportUpdate(false)}>
//           <PackageDetailsDutyReportUpdate
//             setPackageDetailsDutyReportUpdate={
//               setPackageDetailsDutyReportUpdate
//             }
//             // tripDetails={selectedTrip}
//           />
//         </Modal>
//         {/* middle */}
//         <View style={styles.middleSection}>
//           <View style={styles.nameTypeContainer}>
//             <Text style={styles.nameText}>Sagar Saxena</Text>
//             <Text style={styles.typeText}>Permanent</Text>
//           </View>
//           <View style={styles.addressCallContainer}>
//             <View>
//               <View style={styles.addressContainer}>
//                 <Image
//                   source={Address}
//                   resizeMode="contain"
//                   style={styles.addressIcon}
//                 />
//                 <Text style={styles.addressText}>D-51 A 2nd Floor</Text>
//               </View>
//               <View style={styles.addressContainer}>
//                 <Image
//                   source={Address}
//                   resizeMode="contain"
//                   style={styles.addressIcon}
//                 />
//                 <Text style={styles.addressText}>Noida Floor</Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.callingGif}
//               onPress={openPhoneDialer}>
//               {/* <View style={styles.callingGif}> */}
//               <Image
//                 style={{width: '100%', height: '100%'}}
//                 source={CallingGif}
//                 resizeMode="cover"
//               />
//               {/* </View> */}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* bottom */}
//         <View
//           style={{
//             elevation: 1,
//             borderRadius: 5,
//             borderWidth: 1,
//             backgroundColor: '#f7f7f7',
//             borderColor: '#ccc',
//             padding: 15,
//           }}>
//           <RadioButtonWithTitle booking={booking} />
//           <SwipeableButton onSwipe={handleSwipe} />

//           <View style={{marginTop: 20}}>
//             <YoutubePlayer
//               height={200}
//               // autoPlay={false}
//               videoId={'SsG_qwb0zLs'}
//             />
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

const DutyReportUpdate = ({route, navigation}) => {
  // const {booking} = route?.params;
  const booking = '642971';

  const [cancel, setCancel] = useState(false);
  const [modalVisibleOntheway, setModalVisibleOntheway] = useState(false);
  const [modalVisibleRich, setModalVisibleRich] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalVisibleinput, setModalVisibleinput] = useState(false);
  const [modalVisibleonTimeRich, setModalVisibleonTimeRich] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [modalVisibleEnd, setModalVisibleEnd] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );

  const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
    useState(false);

  const handleSwipe = () => {
    setModalVisibleOntheway(true);
  };

  const openPhoneDialer = () => {
    const phoneNumber = '9810360792';
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
    // GetAllBookingInfo(booking?.booking_id);
  }, []);

  const GetAllBookingInfo = async number => {
    try {
      // if (!booking?.booking_id) {
      //   console.log('Invalid booking object: booking_id is missing');
      //   return;
      // }

      const response = await GET_BOOKING_INFO({
        driver_mobile_number: driverMobileNumber,
        booking_number: number,
        current_language: languageSwitch,
      });

      console.log(response, 'GetAllBookingInfo Api response');
    } catch (error) {
      console.log(error, 'GetAllBookingInfo Api error - Error');
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

      {
        cancel ? (
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
        ) : (
          <ScrollView style={{flex: 1}}>
            <View style={styles.mainView}>
              {/* top */}
              <View style={styles.topSection}>
                <Text style={styles.interviewTimeText}>
                  Interview Time- {booking.booking_date}
                </Text>
              </View>
              <View style={styles.bookingSection}>
                <View>
                  <Text style={styles.bookingNoText}>Booking No : #431062</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setPackageDetailsDutyReportUpdate(true)}
                  style={styles.packageDetailsButton}>
                  <Text style={styles.packageDetailsText}>Package Details</Text>
                </TouchableOpacity>
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
                  // tripDetails={selectedTrip}
                />
              </Modal>
              {/* middle */}
              <View style={styles.middleSection}>
                <View style={styles.nameTypeContainer}>
                  <Text style={styles.nameText}>Sagar Saxena</Text>
                  <Text style={styles.typeText}>Permanent</Text>
                </View>
                <View style={styles.addressCallContainer}>
                  <View>
                    <View style={styles.addressContainer}>
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={styles.addressIcon}
                      />
                      <Text style={styles.addressText}>D-51 A 2nd Floor</Text>
                    </View>
                    <View style={styles.addressContainer}>
                      <Image
                        source={Address}
                        resizeMode="contain"
                        style={styles.addressIcon}
                      />
                      <Text style={styles.addressText}>Noida Floor</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.callingGif}
                    onPress={openPhoneDialer}>
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
                <RadioButtonWithTitle booking={booking} />
                <SwipeableButton onSwipe={handleSwipe} />

                <View style={{marginTop: 20}}>
                  <YoutubePlayer
                    height={200}
                    // autoPlay={false}
                    videoId={'SsG_qwb0zLs'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )
      }

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
                  setModalVisibleOntheway(false), setModalVisibleRich(true);
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
                    setModalVisibleRich(false);
                    setModalVisibleinput(true);
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
                    setModalVisibleinput(false);
                    setModalVisibleEnd(true);
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
                  setModalVisibleonTimeRich(false);
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
                    setModalVisibleinput(false);
                    setModalVisibleEnd(false);
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
