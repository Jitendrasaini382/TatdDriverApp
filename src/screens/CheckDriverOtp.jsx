import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {CommonActions, useRoute} from '@react-navigation/native';
import {DRIVER_LOGIN, GET_FCM_TOKEN, VERIFY_OTP_LOGIN} from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenConstextApi} from '../context/GlobalContext';
import {jwtDecode} from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';
import {AppFont} from '../assets/FontsFamily';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CheckDriverOtp = ({navigation}) => {
  const route = useRoute();
  const {mobile} = route.params;
  const [fcmtoken, setFcmToken] = useState();
  const {setRefreshToken, setJwtToken, setDecodedToken} =
    useContext(TokenConstextApi);

  const [otp, setOtp] = useState('');

  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const [field, setField] = useState({
    mobile: mobile,
  });

  const [showResendOtpText, setShowResendOtpText] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = text => {
    setOtp(text);
  };

  useEffect(() => {
    // getFcmToken()
  }, []);

  const resendOtp = () => {
    setShowResendOtpText(true);
    DRIVER_LOGIN(field)
      .then(e => {
        // console.log(e, 'resend Otp Response');
        if (e.status_code == 200) {
          setShowResendOtpText(false);

          // Alert.alert(`OTP is Resend to +91${mobile} `);
        } else {
          // Alert.alert('Failed to resend OTP');
        }
      })
      .catch(err => {
        Alert.alert('Network Error');
      });
  };

  const setJwtTokenn = async token => {
    // console.log(token, 'jjjjjjjjjjjjjjjjjjjjjjjj');
    await AsyncStorage.setItem('jwt', token);
  };

  const setRefreshTokenn = async token => {
    // console.log(token, 'rrrrrrrrrrrrrrrrrrrrrr');
    await AsyncStorage.setItem('refresh_token', token);
  };

  const getFcmToken = async () => {
    console.log('runnnnn getttttttttttttttttttttttttt');
    const token = await messaging().getToken();
    if (token) {
      console.log('Your Firebase Cloud Messaging token is:', token);
      setFcmToken(token);
    } else {
      console.log('Failed to get FCM token');
    }
  };

  const sendNotificationMessage = async fcmtoken => {
    console.log('runnnnn setttttttttttttttttttttttttt');
    const response = await GET_FCM_TOKEN({
      fcm_token: fcmtoken,
      action: 'save_fcm',
    });
    console.log('GET FCM TOKEN response:', response);
    setFcmToken();
  };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        setError('Please Enter OTP');
        return;
      } else if (otp.length !== 4) {
        setError('Please enter a 4-digit OTP');
        return;
      }
      setLoader(true);
      const response = await VERIFY_OTP_LOGIN({
        mobile: mobile,
        otp: otp,
      });

      // console.log('OTP verification response:', response);

      if (response.jwt && response.refresh_token) {
        await setJwtToken(response.jwt);
        const decoded = jwtDecode(response.jwt);
        setDecodedToken(decoded.data);
        await setRefreshToken(response.refresh_token);
        await setJwtTokenn(response.jwt);
        await setRefreshTokenn(response.refresh_token);
        setLoader(false);
        //  sendNotificationMessage(fcmtoken)
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError(err.message || 'OTP verification failed. Please try again.');
    }
  };

  // const sendNotification = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;
  //   console.log('fffffffff=====',fcmToken)
  //   if (!token) {
  //     throw new Error('No token found');
  //   }
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //     const response = await axios.post('https://www.tatd.in/app-api/customer/login/save-fcm-token-api.php',
  //       {
  //         "fcm_token":"1221299990903",
  //         "action":"save_fcm"
  //     },config
  //     );
  //     setFcmdata(response.data)
  //     console.log('toen succesfull send:', response.data);
  //   } catch (error) {
  //     console.error('error:', error);

  //   }
  // };

  //////////

  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //       getFcmToken();
  //     }
  //   };

  //   const getFcmToken = async () => {
  //     const token = await messaging().getToken();
  //     if (token) {
  //       console.log('Your Firebase Cloud Messaging token is:', token);
  //       setFcmToken(token);
  //     } else {
  //       console.log('Failed to get FCM token');
  //     }
  //   };

  //   requestUserPermission();
  //   const unsubscribe = messaging().onTokenRefresh((token) => {
  //     console.log('New FCM token:', token);
  //     setFcmToken(token);
  //   });

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.mainTopContent}>
                <View style={styles.headingView}>
                  <Text style={styles.headingText}>
                    Trusted & Trained Driver
                  </Text>
                </View>
                <View style={styles.triangleMainView}>
                  <View style={styles.triangleView}></View>
                  <View
                    style={[
                      styles.triangleView,
                      styles.rotatedTriangle,
                    ]}></View>
                </View>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Submit OTP</Text>
              </View>
            </View>

            <View style={styles.otpInfoContainer}>
              <Text style={styles.otpInfoText}>
                An OTP is sent to {mobile}{' '}
              </Text>
              <TouchableOpacity onPress={resendOtp}>
                <Text
                  style={[
                    styles.resendText,

                    {borderBottomWidth: showResendOtpText ? 0 : 0.5},
                  ]}>
                  Resend OTP ?
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: verticalScale(25),
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginLeft: moderateScale(30),
              }}>
              <View>
                <Text
                  style={{
                    color: AppColors.mainColor,
                    fontFamily: AppFont.regularFont,
                  }}>
                  {showResendOtpText ? `OTP is Resend to +91${mobile}` : ''}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="sign-in"
                    size={moderateScale(16)}
                    color="rgb(183, 183, 183)"
                  />
                </View>

                <View
                  style={[
                    styles.textInputContainer,
                    isFocused || otp ? styles.inputFocused : null,
                    {
                      borderColor: isFocused
                        ? AppColors.mainColor
                        : AppColors.greyColor,
                    },
                  ]}>
                  <TextInput
                    style={[
                      styles.textInput,
                      {fontWeight: isFocused ? 'bold' : 'normal'},
                    ]}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    value={otp}
                    maxLength={4}
                    placeholder="Enter OTP or Password"
                    placeholderTextColor="rgb(42, 42, 42)"
                    onFocus={() => setIsFocused(true)}
                    onPressIn={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>

              {/* <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange}
                  value={otp}
                  keyboardType="numeric"
                  placeholder="Enter OTP or Password"
                  placeholderTextColor="rgb(42, 42, 42)"
                />
              </View> */}
            </View>
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{error}</Text>
            </View>

            <Pressable
              style={styles.verifyButton}
              disabled={loader}
              onPress={verifyOtp}>
              <Text style={styles.verifyButtonText}>
                {loader ? 'Please Wait' : 'Verify'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    marginVertical :1
  },
  card: {
    margin: moderateScale(15),
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: AppColors.mainColor,
  },
  cardHeader: {
    backgroundColor: AppColors.mainColor,
    // width: '100%',
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(12),
  },
  headerTextContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  mainTopContent: {
    flexDirection: 'row',
    paddingRight: moderateScale(6),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  headingView: {
    backgroundColor: AppColors.white,
    width: '80%',
    height: 25,
  },
  headingText: {
    color: AppColors.mainColor,
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },
  triangleMainView: {
    flexDirection: 'column',
  },
  triangleView: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },

  whiteBackground: {
    backgroundColor: AppColors.white,
    width: '80%',
  },
  headerText: {
    color: AppColors.mainColor,
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },
  triangleContainer: {
    flexDirection: 'column',
  },
  triangleTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(12),
    borderTopWidth: moderateScale(12),
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
  },
  triangleBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(12),
    borderTopWidth: moderateScale(12),
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
    transform: [{rotate: '270deg'}],
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  title: {
    // fontSize: moderateScale(22),
    // marginTop: verticalScale(20),
    // fontWeight: '500',
    // textAlign: 'center',
    // letterSpacing: 0.3,
    // fontFamily: 'Roboto-Black',
    // color: 'rgb(255,255,255)',

    fontSize: moderateScale(28),
    marginTop: verticalScale(30),
    // paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
    fontFamily: 'Roboto-Black',
  },
  otpInfoContainer: {
    margin: moderateScale(10),
    marginTop: 0,
    alignItems: 'flex-start',
    paddingLeft: moderateScale(8),
  },
  otpInfoText: {
    color: 'rgb(146,146,146)',
    fontWeight: '400',
    fontSize: moderateScale(14),
  },
  resendText: {
    color: 'rgb(146,146,146)',
    fontWeight: '400',
    borderBottomWidth: 0.5,
    fontSize: moderateScale(14),
    borderColor: '#888',
    marginTop: verticalScale(5),
  },
  inputContainer: {
    // marginBottom: verticalScale(30),
    // marginTop: verticalScale(25),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // marginLeft: moderateScale(30),
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'rgb(183,183,183)',
    height: verticalScale(36),
    padding: moderateScale(10),
    paddingTop: verticalScale(5),
  },
  textInputContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(183,183,183)',
    width: '80%',
    height: verticalScale(36),
  },
  inputFocused: {
    borderTopColor: AppColors.mainColor,
    borderBottomColor: AppColors.mainColor,
    borderRightColor: AppColors.mainColor,
    fontWeight: 'bold',
  },
  textInput: {
    color: AppColors.black,
    justifyContent: 'center',
    textAlign: 'left',
    height: verticalScale(36),
    fontSize: moderateScale(14),
  },
  errorView: {
    marginHorizontal: moderateScale(30),
    marginBottom: verticalScale(30),
  },
  errorText: {color: 'red', fontSize: 15, marginTop: 0},
  verifyButton: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginBottom: verticalScale(40),
    width: '45%',
  },
  verifyButtonText: {
    fontSize: moderateScale(18),
    color: AppColors.white,
    fontWeight: '600',
    fontFamily: AppFont.regularFont,
  },
});

export default CheckDriverOtp;

// import React, {useContext, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Header from '../components/Header';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {AppColors} from '../assets/Colors';
// import {CommonActions, useRoute} from '@react-navigation/native';
// import {DRIVER_LOGIN, VERIFY_OTP_LOGIN} from '../apis/Apis';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TokenConstextApi} from '../context/GlobalContext';
// import {jwtDecode} from 'jwt-decode'; // Add jwtDecode import

// const {width, height} = Dimensions.get('window');
// const designWidth = width;
// const designHeight = height;

// const scale = size => (width / designWidth) * size;
// const verticalScale = size => (height / designHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// const CheckDriverOtp = ({navigation}) => {
//   const route = useRoute();
//   const {mobile} = route.params;

//   const {setRefreshToken, setJwtToken, setDecodedToken} =
//     useContext(TokenConstextApi); // Changed from setTokenData to setDecodedToken

//   const [otp, setOtp] = useState('');

//   const [error, setError] = useState(null);
//   const [field, setField] = useState({
//     mobile: mobile,
//   });

//   const handleChange = text => {
//     setOtp(text);
//   };

//   const resendOtp = () => {
//     DRIVER_LOGIN(field)
//       .then(e => {
//         console.log(e, 'resend Otp Response');
//         if (e.status_code == 200) {
//           Alert.alert(`OTP is Resend to +91${mobile} `);
//         } else {
//           Alert.alert('Failed to resend OTP');
//         }
//       })
//       .catch(err => {
//         Alert.alert('Network Error');
//       });
//   };

//   const setJwtTokenn = async token => {
//     console.log(token, 'jjjjjjjjjjjjjjjjjjjjjjjj');
//     await AsyncStorage.setItem('jwt', token);
//   };

//   const setRefreshTokenn = async token => {
//     console.log(token, 'rrrrrrrrrrrrrrrrrrrrrr');
//     await AsyncStorage.setItem('refresh_token', token);
//   };

//   const verifyOtp = async () => {
//     try {
//       if (!otp) {
//         setError('Please Enter The OTP');
//         return;
//       } else if (otp.length !== 4) {
//         setError('Please enter a 4-digit OTP');
//         return;
//       }

//       const response = await VERIFY_OTP_LOGIN({
//         mobile: mobile,
//         otp: otp,
//       });

//       console.log('OTP verification response:', response);

//       if (response.jwt && response.refresh_token) {
//         const decoded = jwtDecode(response.jwt); // Decode the token
//         await setJwtToken(response.jwt);
//         await setRefreshToken(response.refresh_token);
//         await setJwtTokenn(response.jwt);
//         await setRefreshTokenn(response.refresh_token);
//         setDecodedToken(decoded.data); // Set the decoded data in the context
//         // navigation.dispatch(
//         //   CommonActions.reset({
//         //     index: 0,
//         //     routes: [{name: 'TrustedDriver'}], // Navigate to your desired screen after verification
//         //   })
//         // );
//       } else {
//         setError('Invalid response from server');
//       }
//     } catch (err) {
//       console.error('OTP verification failed:', err);
//       setError(err.message || 'OTP verification failed. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.contentContainer}>
//           <View style={styles.card}>
//             <View style={styles.cardHeader}>
//               <View style={styles.mainTopContent}>
//                 <View style={styles.headingView}>
//                   <Text style={styles.headingText}>
//                     Trusted & Trained Driver
//                   </Text>
//                 </View>
//                 <View style={styles.triangleMainView}>
//                   <View style={styles.triangleView}></View>
//                   <View
//                     style={[
//                       styles.triangleView,
//                       styles.rotatedTriangle,
//                     ]}></View>
//                 </View>
//               </View>
//               <View style={styles.titleContainer}>
//                 <Text style={styles.title}>Submit OTP</Text>
//               </View>
//             </View>

//             <View style={styles.otpInfoContainer}>
//               <Text style={styles.otpInfoText}>
//                 An OTP is sent to {mobile}{' '}
//               </Text>
//               <TouchableOpacity onPress={resendOtp}>
//                 <Text style={styles.resendText}>Resend OTP ?</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="sign-in"
//                   size={moderateScale(16)}
//                   color="rgb(183, 183, 183)"
//                 />
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   onChangeText={handleChange}
//                   value={otp}
//                   keyboardType="numeric"
//                   placeholder="Enter OTP or Password"
//                   placeholderTextColor="rgb(42, 42, 42)"
//                 />
//               </View>
//             </View>
//             <View style={styles.errorView}>
//               <Text style={styles.errorText}>{error}</Text>
//             </View>

//             <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
//               <Text style={styles.verifyButtonText}>Verify</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     justifyContent: 'flex-start',
//   },
//   card: {
//     margin: moderateScale(15),
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: moderateScale(10),
//     borderColor: AppColors.mainColor,
//   },
//   cardHeader: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: moderateScale(6),
//     marginBottom: verticalScale(12),
//   },
//   headerTextContainer: {
//     flexDirection: 'row',
//     paddingVertical: verticalScale(10),
//     marginBottom: verticalScale(12),
//   },
//   mainTopContent: {
//     flexDirection: 'row',
//     paddingRight: moderateScale(6),
//     paddingVertical: verticalScale(10),
//     marginBottom: verticalScale(12),
//   },
//   headingView: {
//     backgroundColor: AppColors.white,
//     width: '80%',
//   },
//   headingText: {
//     color: AppColors.mainColor,
//     fontSize: moderateScale(14),
//     paddingLeft: moderateScale(4),
//   },
//   triangleMainView: {
//     flexDirection: 'column',
//   },
//   triangleView: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: moderateScale(12),
//     borderTopWidth: moderateScale(12),
//     borderRightColor: 'transparent',
//     borderTopColor: AppColors.white,
//   },
//   rotatedTriangle: {
//     transform: [{rotate: '270deg'}],
//   },
//   whiteBackground: {
//     backgroundColor: AppColors.white,
//     width: '80%',
//   },
//   headerText: {
//     color: AppColors.mainColor,
//     fontSize: moderateScale(14),
//     paddingLeft: moderateScale(4),
//   },
//   triangleContainer: {
//     flexDirection: 'column',
//   },
//   triangleTop: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: moderateScale(12),
//     borderTopWidth: moderateScale(12),
//     borderRightColor: 'transparent',
//     borderTopColor: AppColors.white,
//   },
//   triangleBottom: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: moderateScale(12),
//     borderTopWidth: moderateScale(12),
//     borderRightColor: 'transparent',
//     borderTopColor: AppColors.white,
//     transform: [{rotate: '270deg'}],
//   },
//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   title: {
//     fontSize: moderateScale(22),
//     marginTop: verticalScale(20),
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto-Black',
//     color: 'rgb(255,255,255)',
//     lineHeight: verticalScale(24.2),
//   },
//   otpInfoContainer: {
//     margin: moderateScale(10),
//     marginTop: 0,
//     alignItems: 'flex-start',
//     paddingLeft: moderateScale(8),
//   },
//   otpInfoText: {
//     color: 'rgb(146,146,146)',
//     fontWeight: '400',
//     fontSize: moderateScale(14),
//   },
//   resendText: {
//     color: 'rgb(146,146,146)',
//     fontWeight: '400',
//     borderBottomWidth: 0.5,
//     fontSize: moderateScale(14),
//     borderColor: '#888',
//     marginTop: verticalScale(5),
//   },
//   inputContainer: {
//     marginTop: verticalScale(25),
//     justifyContent: 'flex-start',
//   },
//   iconContainer: {
//     backgroundColor: AppColors.white,
//     borderColor: AppColors.mainColor,
//     borderWidth: 1,
//     borderRadius: moderateScale(6),
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: moderateScale(10),
//   },
//   textInputContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: moderateScale(10),
//   },
//   textInput: {
//     color: AppColors.mainColor,
//     fontSize: moderateScale(14),
//   },
//   errorView: {
//     alignItems: 'center',
//     marginVertical: verticalScale(10),
//   },
//   errorText: {
//     color: 'red',
//     fontSize: moderateScale(12),
//   },
//   verifyButton: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: moderateScale(6),
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: verticalScale(10),
//     marginHorizontal: moderateScale(10),
//     marginVertical: verticalScale(10),
//   },
//   verifyButtonText: {
//     color: AppColors.white,
//     fontSize: moderateScale(16),
//   },
// });

// export default CheckDriverOtp;
