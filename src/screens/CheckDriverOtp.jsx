import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Pressable,
  Platform,
  Keyboard,
  Animated,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import Toast from 'react-native-toast-message';

import {DRIVER_LOGIN, VERIFY_OTP_LOGIN} from '../apis/Apis';
import {jwtDecode} from 'jwt-decode';
import {AppFont} from '../assets/FontsFamily';
import {useDispatch} from 'react-redux';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';
import store from '../redux/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useOtpVerify} from 'react-native-otp-verify';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CELL_COUNT = 4;
const {Value, Text: AnimatedText} = Animated;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const CheckDriverOtp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const appVersion = DeviceInfo.getVersion();
  const appType = Platform.OS;

  const {mobile} = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [field, setField] = useState({
    mobile: mobile,
    user_type: 'Driver',
    app_version: appVersion,
    app_type: appType,
  });
  const [showResendOtpText, setShowResendOtpText] = useState(false);
  const [loader, setLoader] = useState(false);

  const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
  const [inputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const {otp: otps, hash} = useOtpVerify({numberOfDigits: 4});
  useEffect(() => {
    if (otps?.length) {
      setOtp(otps);
    }
  }, [otps]);

  useEffect(() => {
    if (otp && otp.length === 4) {
      verifyOtp(otp);
    }
  }, [otp]);
  const resendOtp = () => {
    setShowResendOtpText(true);
    DRIVER_LOGIN(field)
      .then(e => {
        if (e.status_code == 200) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: e.message,
          });
          setShowResendOtpText(false);
        } else {
          setShowResendOtpText(false);
        }
      })
      .catch(err => {
        // Alert.alert('Network Error');
        console.log(err);

        Toast.show({
          type: 'error',
          text1: 'error',
          text2: err,
        });
        setShowResendOtpText(false);
      });
  };
  // const verifyOtp = async () => {
  //   console.log('clickkkkked');
  //   try {
  //     console.log('Verify OTP process started'); // Debug console
  //     if (!otp) {
  //       console.log('No OTP entered'); // Debug console
  //       // setError('Please Enter OTP');
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Please Enter OTP',
  //       });
  //       return;
  //     } else if (otp.length !== 4) {
  //       console.log(`Invalid OTP length: ${otp.length}`); // Debug console
  //       // setError('Please enter a 4-digit OTP');
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Please enter a 4-digit OTP',
  //       });
  //       return;
  //     }

  //     console.log('Setting loader to true and dismissing keyboard'); // Debug console
  //     setLoader(true);
  //     Keyboard.dismiss();

  //     console.log('Calling VERIFY_OTP_LOGIN API with data:', {mobile, otp}); // Debug console
  //     VERIFY_OTP_LOGIN({
  //       mobile: mobile,
  //       otp: otp,
  //     })
  //       .then(response => {
  //         console.log('VERIFY_OTP_LOGIN response:', response); // Debug console
  //         if (response?.jwt && response?.refresh_token) {
  //           console.log('Dispatching JWT to state:', response.jwt); // Debug console
  //           dispatch(
  //             setUserAuthStates({
  //               key: 'jwt',
  //               value: response?.jwt,
  //             }),
  //           );
  //         }
  //         return response;
  //       })
  //       .then(response => {
  //         console.log(
  //           'Dispatching refresh token to state:',
  //           response?.refresh_token,
  //         ); // Debug console
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'refreshToken',
  //             value: response?.refresh_token,
  //           }),
  //         );
  //         return response;
  //       })
  //       .then(response => {
  //         console.log('Decoding JWT and updating user profile:', response?.jwt); // Debug console
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'userProfile',
  //             value: jwtDecode(response.jwt),
  //           }),
  //         );
  //         console.log('Updating login state to true'); // Debug console
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'login',
  //             value: true,
  //           }),
  //         );
  //       })
  //       .catch(err => {
  //         console.warn('Error during VERIFY_OTP_LOGIN API call:', err); // Debug console
  //         Toast.show({
  //           type: 'error',
  //           text1: err,
  //         });
  //       })
  //       .finally(() => {
  //         console.log('Setting loader to false in finally block'); // Debug console
  //         setLoader(false);
  //       });
  //   } catch (err) {
  //     console.log(
  //       'OTP verification failed in catch block: messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage',
  //       err,
  //     ); // Debug console
  //     // setLoader(false);
  //     // Toast.show({
  //     //   type: 'error',
  //     //   text1: err?.message,
  //     // });
  //     // setError(err.message, 'OTP verification failed. Please try again.');
  //   } finally {
  //     console.log('Setting loader to false in finally block last finall'); // Debug console
  //     setLoader(false);
  //   }
  // };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please Enter OTP',
        });
        return;
      } else if (otp.length !== 4) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please enter a 4-digit OTP',
        });
        return;
      }

      setLoader(true);
      Keyboard.dismiss();

      const response = await VERIFY_OTP_LOGIN({
        mobile: mobile,
        otp: otp,
      });

      if (response?.jwt && response?.refresh_token) {
        dispatch(
          setUserAuthStates({
            key: 'jwt',
            value: response.jwt,
          }),
        );

        dispatch(
          setUserAuthStates({
            key: 'refreshToken',
            value: response.refresh_token,
          }),
        );

        dispatch(
          setUserAuthStates({
            key: 'userProfile',
            value: jwtDecode(response.jwt),
          }),
        );

        dispatch(
          setUserAuthStates({
            key: 'login',
            value: true,
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'OTP verified successfully!',
        });
      } else {
        console.log('run else  wrong otp');

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Invalid OTP. Please try again.',
        });
        return;
      }
    } catch (err) {
      console.error('Error during OTP verification:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoader(false);
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     if (!otp) {
  //       setError('Please Enter OTP');
  //       return;
  //     } else if (otp.length !== 4) {
  //       setError('Please enter a 4-digit OTP');
  //       return;
  //     }
  //     setLoader(true);
  //     Keyboard.dismiss();

  //     VERIFY_OTP_LOGIN({
  //       mobile: mobile,
  //       otp: otp,
  //     })
  //       .then(response => {
  //         if (response?.jwt && response?.refresh_token) {
  //           dispatch(
  //             setUserAuthStates({
  //               key: 'jwt',
  //               value: response?.jwt,
  //             }),
  //           );
  //         }
  //         return response;
  //       })
  //       .then(response => {
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'refreshToken',
  //             value: response?.refresh_token,
  //           }),
  //         );
  //         return response;
  //       })
  //       .then(response => {
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'userProfile',
  //             value: jwtDecode(response.jwt),
  //           }),
  //         );
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'login', // The state key you want to update
  //             value: true, //
  //           }),
  //         );
  //         // sendNotificationMessage(fcmtoken, response.jwt); // Only call now

  //         // Wait until JWT is fully dispatched
  //         // store.subscribe(() => {
  //         //   const currentJwt = store.getState().userAuth.jwt;
  //         //   return false
  //         //   Alert.alert(currentJwt)
  //         //   if (currentJwt) {
  //         //   }
  //         // });
  //       })
  //       .catch(err => {
  //         console.log(err, 'otp errorrrrr');
  //         Toast.show({
  //           type: 'error',
  //           text1: err?.message,
  //         });
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   } catch (err) {
  //     console.error('OTP verification failed:', err);
  //     setLoader(false);
  //     setError(err.message, 'lOTP verification failed. Please try again.');
  //   }
  // };

  // const verifyOtp = async () => {
  // try {
  // if (!otp) {
  // setError('Please Enter OTP');
  // return;
  // } else if (otp.length !== 4) {
  // setError('Please enter a 4-digit OTP');
  // return;
  // }
  // setLoader(true);
  // Keyboard.dismiss();

  // VERIFY_OTP_LOGIN({
  // mobile: mobile,
  // otp: otp,
  // })
  // .then(response => {
  // if (response?.jwt && response?.refresh_token) {
  // dispatch(
  // setUserAuthStates({
  // key: 'jwt',
  // value: response?.jwt,
  // }),
  // );
  // }
  // return response;
  // })
  // .then(response => {
  // dispatch(
  // setUserAuthStates({
  // key: 'refreshToken',
  // value: response?.refresh_token,
  // }),
  // );
  // return response;
  // })
  // .then(response => {
  // dispatch(
  // setUserAuthStates({
  // key: 'userProfile',
  // value: jwtDecode(response.jwt),
  // }),
  // );
  // dispatch(
  // setUserAuthStates({
  // key: 'login', // The state key you want to update
  // value: true, //
  // }),
  // );

  // })
  // .catch(err => {
  // console.log(err, 'otp errorrrrr');
  // Toast.show({
  // type: 'error',
  // text1: err?.message,
  // });
  // })
  // .finally(() => {
  // setLoader(false);
  // });
  // } catch (err) {
  // console.error('OTP verification failed:', err);
  // setLoader(false);
  // setError(err.message, 'lOTP verification failed. Please try again.');
  // }
  // };

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />

      <Header backButton={true} isAuthenticated={false} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="always">
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
              {/* <Text style={{color: 'white', marginHorizontal: 10}}>{hash}</Text> */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Submit OTP</Text>
              </View>
            </View>

            <View style={styles.otpInfoContainer}>
              <Text style={styles.otpInfoText}>
                An OTP is sent to {mobile}{' '}
              </Text>
              <TouchableOpacity
                style={{
                  borderBottomWidth: showResendOtpText ? 0 : 0.5,
                  borderBottomColor: AppColors.black,
                }}
                onPress={resendOtp}>
                <Text style={[styles.resendText, ,]}>Resend OTP ?</Text>
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
                  {/* {showResendOtpText ? `OTP is Resend to +91${mobile}` : ''} */}
                </Text>
              </View>

              <CodeField
                ref={ref}
                {...inputProps}
                value={otp}
                onChangeText={setOtp}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{error}</Text>
            </View>

            <Pressable
              style={styles.verifyButton}
              // disabled={loader}
              onPress={verifyOtp}>
              <Text style={styles.verifyButtonText}>
                {loader ? 'Please Wait' : 'Verify'}
              </Text>
            </Pressable>
          </View>
        </View>
        <Toast visibilityTime={3000} />
      </ScrollView>
    </View>
  );
};

const CELL_SIZE = 60;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = AppColors.mainColor;
const ACTIVE_CELL_BG_COLOR = AppColors.mainColor;

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: 'white',
    backgroundColor: 'red',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    marginVertical: 1,
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
    borderRightWidth: 12.5,
    borderTopWidth: 12.5,
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },

  headerText: {
    color: AppColors.mainColor,
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(28),
    marginTop: verticalScale(30),
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
  errorText: {color: AppColors.red, fontSize: 15, marginTop: 5, marginLeft: 18},
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

// import React, {useContext, useEffect, useState} from 'react';
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
//   Pressable,
//   Platform,
//   Keyboard,
// } from 'react-native';
// import Header from '../components/Header';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {AppColors} from '../assets/Colors';
// import {CommonActions, useRoute} from '@react-navigation/native';
// import Toast from 'react-native-toast-message';

// import {DRIVER_LOGIN, GET_FCM_TOKEN, VERIFY_OTP_LOGIN} from '../apis/Apis';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import messaging from '@react-native-firebase/messaging';
// import {AppFont} from '../assets/FontsFamily';
// import {useDispatch, useSelector} from 'react-redux';
// import {setUserAuthStates} from '../redux/slices/userAuthSlice';
// import store from '../redux/store';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// const {width, height} = Dimensions.get('window');
// const designWidth = width;
// const designHeight = height;

// const scale = size => (width / designWidth) * size;
// const verticalScale = size => (height / designHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// const CheckDriverOtp = ({navigation, route}) => {
//   const dispatch = useDispatch();
//   const insets = useSafeAreaInsets();

//   const {mobile} = route.params;
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState(null);
//   const [isFocused, setIsFocused] = useState(false);
//   const [field, setField] = useState({
//     mobile: mobile,
//   });
//   const [showResendOtpText, setShowResendOtpText] = useState(false);
//   const [loader, setLoader] = useState(false);

//   const handleChange = text => {
//     setOtp(text);
//     if (text.length >= 4) {
//       Keyboard.dismiss();
//     }
//   };

//   // const getFcmToken = async () => {
//   //   try {
//   //     if (Platform.OS === 'ios') {
//   //       // For iOS, register for remote messages explicitly
//   //       await messaging().registerDeviceForRemoteMessages();
//   //     } else {
//   //       // For Android, ensure the registration for remote messages
//   //       await messaging().registerDeviceForRemoteMessages();
//   //     }

//   //     // Request notification permissions (only if you plan to display notifications)
//   //     // const authStatus = await messaging().requestPermission();
//   //     // const enabled =
//   //     //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//   //     //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   //     // if (!enabled) {
//   //     //   Alert.alert('Permission not granted for notifications');
//   //     //   return;
//   //     // }

//   //     // Retrieve the FCM token
//   //     const tokenvalue = await messaging().getToken();
//   //     console.warn('FCM token generated:', tokenvalue);
//   //     console.log('FCM token generated:', tokenvalue);

//   //     // Save the token to AsyncStorage for later use
//   //     await AsyncStorage.setItem('fcmToken', tokenvalue);
//   //   } catch (error) {
//   //     console.log('Error generating FCM token:', error);
//   //     Alert.alert(
//   //       'Error generating FCM token:',
//   //       error?.message || error.toString(),
//   //     );
//   //   }
//   // };

//   // const sendNotificationMessage = async (fcmtoken, jwttoken) => {
//   //   console.log('runnnnn setttttttttttttttttttttttttt');
//   //   // console.log(jwtw);
//   //   const response = await GET_FCM_TOKEN(
//   //     {
//   //       fcm_token: fcmtoken,
//   //       action: 'save_fcm',
//   //     },
//   //     {
//   //       Authorization: `Bearer ${jwttoken}`,
//   //     },
//   //   );

//   //   console.log('GET FCM TOKEN response:', response);
//   //   // setFcmToken();
//   // };

//   // const resendOtp = () => {
//   //   Toast.show({
//   //     type: 'info',
//   //     text1: 'This is an info message'
//   //   });
//   //   setShowResendOtpText(true);
//   //   DRIVER_LOGIN(field)
//   //     .then(e => {
//   //       if (e.status_code == 200) {
//   //         setShowResendOtpText(false);
//   //         Toast.show({
//   //           type: 'success',
//   //           text1: 'Hello',
//   //           text2: 'This is some something 👋'
//   //         });
//   //       } else {
//   //         setShowResendOtpText(false);
//   //       }
//   //     })
//   //     .catch(err => {
//   //       Alert.alert('Network Error');
//   //     });
//   // };

//   const resendOtp = () => {
//     setShowResendOtpText(true);
//     DRIVER_LOGIN(field)
//       .then(e => {
//         if (e.status_code == 200) {
//           Toast.show({
//             type: 'success',
//             text1: 'Success',
//             text2: e.message,
//           });
//           setShowResendOtpText(false);
//         } else {
//           setShowResendOtpText(false);
//         }
//       })
//       .catch(err => {
//         // Alert.alert('Network Error');
//         console.log(err);

//         Toast.show({
//           type: 'error',
//           text1: 'error',
//           text2: err,
//         });
//         setShowResendOtpText(false);
//       });
//   };

//   const verifyOtp = async () => {
//     try {
//       if (!otp) {
//         setError('Please Enter OTP');
//         return;
//       } else if (otp.length !== 4) {
//         setError('Please enter a 4-digit OTP');
//         return;
//       }
//       setLoader(true);
//       Keyboard.dismiss();

//       VERIFY_OTP_LOGIN({
//         mobile: mobile,
//         otp: otp,
//       })
//         .then(response => {
//           if (response?.jwt && response?.refresh_token) {
//             dispatch(
//               setUserAuthStates({
//                 key: 'jwt',
//                 value: response?.jwt,
//               }),
//             );
//           }
//           return response;
//         })
//         .then(response => {
//           dispatch(
//             setUserAuthStates({
//               key: 'refreshToken',
//               value: response?.refresh_token,
//             }),
//           );
//           return response;
//         })
//         .then(response => {
//           dispatch(
//             setUserAuthStates({
//               key: 'userProfile',
//               value: jwtDecode(response.jwt),
//             }),
//           );
//           dispatch(
//             setUserAuthStates({
//               key: 'login', // The state key you want to update
//               value: true, //
//             }),
//           );
//           // sendNotificationMessage(fcmtoken, response.jwt); // Only call now

//           // Wait until JWT is fully dispatched
//           // store.subscribe(() => {
//           //   const currentJwt = store.getState().userAuth.jwt;
//           //   return false
//           //   Alert.alert(currentJwt)
//           //   if (currentJwt) {
//           //   }
//           // });
//         })
//         .catch(err => {
//           console.log(err, 'otp errorrrrr');
//           Toast.show({
//             type: 'error',
//             text1: err?.message,
//           });
//         })
//         .finally(() => {
//           setLoader(false);
//         });
//     } catch (err) {
//       console.error('OTP verification failed:', err);
//       setLoader(false);
//       setError(err.message, 'lOTP verification failed. Please try again.');
//     }
//   };

//   // const verifyOtp = async () => {
//   //   try {
//   //     if (!otp) {
//   //       setError('Please Enter OTP');
//   //       return;
//   //     } else if (otp.length !== 4) {
//   //       setError('Please enter a 4-digit OTP');
//   //       return;
//   //     }
//   //     setLoader(true);
//   //      VERIFY_OTP_LOGIN({
//   //       mobile: mobile,
//   //       otp: otp,
//   //     }).then((response)=>{
//   //       if(response?.jwt && response?.refresh_token){
//   //         dispatch(
//   //           setUserAuthStates({
//   //             key: 'jwt', // The state key you want to update
//   //             value: response?.jwt, //
//   //           }),
//   //         );
//   //       }
//   //       return response
//   //     }).then((response)=>{
//   //       dispatch(
//   //         setUserAuthStates({
//   //           key: 'refreshToken', // The state key you want to update
//   //           value: response?.refresh_token
//   //         }),
//   //       );
//   //       return response
//   //     }).then((response)=>{
//   //       dispatch(
//   //         setUserAuthStates({
//   //           key:"userProfile",
//   //           value: jwtDecode(response.jwt),
//   //         }),
//   //       );
//   //       sendNotificationMessage(fcmtoken);
//   //     }).catch((err)=>{
//   //       console.log(err)
//   //     }).finally((e)=>{
//   //       setLoader(false)
//   //     })

//   //   } catch (err) {
//   //     console.error('OTP verification failed:', err);
//   //     setLoader(false);
//   //     setError(err.message || 'OTP verification failed. Please try again.');
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{height: insets.top, backgroundColor: AppColors.mainColor}}
//       />

//       <Header backButton={true} isAuthenticated={false}/>
//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         keyboardShouldPersistTaps="always">
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
//               <TouchableOpacity
//                 style={{
//                   borderBottomWidth: showResendOtpText ? 0 : 0.5,
//                   borderBottomColor: AppColors.black,
//                 }}
//                 onPress={resendOtp}>
//                 <Text style={[styles.resendText, ,]}>Resend OTP ?</Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'column',
//                 marginTop: verticalScale(25),
//                 justifyContent: 'flex-start',
//                 alignItems: 'flex-start',
//                 marginLeft: moderateScale(30),
//               }}>
//               <View>
//                 <Text
//                   style={{
//                     color: AppColors.mainColor,
//                     fontFamily: AppFont.regularFont,
//                   }}>
//                   {/* {showResendOtpText ? `OTP is Resend to +91${mobile}` : ''} */}
//                 </Text>
//               </View>
//               <View style={styles.inputContainer}>
//                 <View style={styles.iconContainer}>
//                   <Icon
//                     name="sign-in"
//                     size={moderateScale(16)}
//                     color="rgb(183, 183, 183)"
//                   />
//                 </View>

//                 <View
//                   style={[
//                     styles.textInputContainer,
//                     isFocused || otp ? styles.inputFocused : null,
//                     {
//                       borderColor: isFocused
//                         ? AppColors.mainColor
//                         : AppColors.greyColor,
//                     },
//                   ]}>
//                   <TextInput
//                     style={[
//                       styles.textInput,
//                       {fontWeight: isFocused ? 'bold' : 'normal'},
//                     ]}
//                     onChangeText={handleChange}
//                     keyboardType="numeric"
//                     value={otp}
//                     maxLength={4}
//                     placeholder="Enter OTP or Password"
//                     placeholderTextColor="rgb(42, 42, 42)"
//                     onFocus={() => setIsFocused(true)}
//                     onPressIn={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={styles.errorView}>
//               <Text style={styles.errorText}>{error}</Text>
//             </View>

//             <Pressable
//               style={styles.verifyButton}
//               disabled={loader}
//               onPress={verifyOtp}>
//               <Text style={styles.verifyButtonText}>
//                 {loader ? 'Please Wait' : 'Verify'}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//         <Toast visibilityTime={3000} />
//       </ScrollView>
//     </View>
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
//     marginVertical: 1,
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
//     // width: '100%',
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
//     height: 25,
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
//     borderRightWidth: 12.5,
//     borderTopWidth: 12.5,
//     borderRightColor: 'transparent',
//     borderTopColor: AppColors.white,
//   },
//   rotatedTriangle: {
//     transform: [{rotate: '270deg'}],
//   },

//   headerText: {
//     color: AppColors.mainColor,
//     fontSize: moderateScale(14),
//     paddingLeft: moderateScale(4),
//   },

//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   title: {
//     fontSize: moderateScale(28),
//     marginTop: verticalScale(30),
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     color: AppColors.white,
//     fontFamily: 'Roboto-Black',
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
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//   },
//   iconContainer: {
//     borderWidth: 1,
//     borderColor: 'rgb(183,183,183)',
//     height: verticalScale(36),
//     padding: moderateScale(10),
//     paddingTop: verticalScale(5),
//   },
//   textInputContainer: {
//     borderTopWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: 'rgb(183,183,183)',
//     width: '80%',
//     height: verticalScale(36),
//   },
//   inputFocused: {
//     borderTopColor: AppColors.mainColor,
//     borderBottomColor: AppColors.mainColor,
//     borderRightColor: AppColors.mainColor,
//     fontWeight: 'bold',
//   },
//   textInput: {
//     color: AppColors.black,
//     justifyContent: 'center',
//     textAlign: 'left',
//     height: verticalScale(36),
//     fontSize: moderateScale(14),
//   },
//   errorView: {
//     marginHorizontal: moderateScale(30),
//     marginBottom: verticalScale(30),
//   },
//   errorText: {color: AppColors.red, fontSize: 15, marginTop: 0},
//   verifyButton: {
//     backgroundColor: AppColors.mainColor,
//     alignItems: 'center',
//     borderRadius: moderateScale(5),
//     justifyContent: 'center',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(10),
//     alignSelf: 'center',
//     marginBottom: verticalScale(40),
//     width: '45%',
//   },
//   verifyButtonText: {
//     fontSize: moderateScale(18),
//     color: AppColors.white,
//     fontWeight: '600',
//     fontFamily: AppFont.regularFont,
//   },
// });

// export default CheckDriverOtp;
