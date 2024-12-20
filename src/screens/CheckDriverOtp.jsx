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
  Platform,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {CommonActions, useRoute} from '@react-navigation/native';
import {DRIVER_LOGIN, GET_FCM_TOKEN, VERIFY_OTP_LOGIN} from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';
import {AppFont} from '../assets/FontsFamily';
import {useDispatch, useSelector} from 'react-redux';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';
import store from '../redux/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CheckDriverOtp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const {mobile} = route.params;
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
    if (text.length >= 4) {
      Keyboard.dismiss();
    }
  };

  const resendOtp = () => {
    setShowResendOtpText(true);
    DRIVER_LOGIN(field)
      .then(e => {
        if (e.status_code == 200) {
          setShowResendOtpText(false);
        } else {
          setShowResendOtpText(false);
        }
      })
      .catch(err => {
        Alert.alert('Network Error');
      });
  };

  // const getFcmToken = async () => {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       // For iOS, register for remote messages explicitly
  //       await messaging().registerDeviceForRemoteMessages();
  //     } else {
  //       // For Android, ensure the registration for remote messages
  //       await messaging().registerDeviceForRemoteMessages();
  //     }

  //     // Request notification permissions (only if you plan to display notifications)
  //     // const authStatus = await messaging().requestPermission();
  //     // const enabled =
  //     //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     // if (!enabled) {
  //     //   Alert.alert('Permission not granted for notifications');
  //     //   return;
  //     // }

  //     // Retrieve the FCM token
  //     const tokenvalue = await messaging().getToken();
  //     console.warn('FCM token generated:', tokenvalue);
  //     console.log('FCM token generated:', tokenvalue);

  //     // Save the token to AsyncStorage for later use
  //     await AsyncStorage.setItem('fcmToken', tokenvalue);
  //   } catch (error) {
  //     console.log('Error generating FCM token:', error);
  //     Alert.alert(
  //       'Error generating FCM token:',
  //       error?.message || error.toString(),
  //     );
  //   }
  // };

  // const sendNotificationMessage = async (fcmtoken, jwttoken) => {
  //   console.log('runnnnn setttttttttttttttttttttttttt');
  //   // console.log(jwtw);
  //   const response = await GET_FCM_TOKEN(
  //     {
  //       fcm_token: fcmtoken,
  //       action: 'save_fcm',
  //     },
  //     {
  //       Authorization: `Bearer ${jwttoken}`,
  //     },
  //   );

  //   console.log('GET FCM TOKEN response:', response);
  //   // setFcmToken();
  // };

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
      Keyboard.dismiss();

      VERIFY_OTP_LOGIN({
        mobile: mobile,
        otp: otp,
      })
        .then(response => {
          if (response?.jwt && response?.refresh_token) {
            dispatch(
              setUserAuthStates({
                key: 'jwt',
                value: response?.jwt,
              }),
            );
            dispatch(
              setUserAuthStates({
                key: 'isFcmSent',
                value: true,
              }),
            );
          }
          return response;
        })
        .then(response => {
          dispatch(
            setUserAuthStates({
              key: 'refreshToken',
              value: response?.refresh_token,
            }),
          );
          return response;
        })
        .then(response => {
          dispatch(
            setUserAuthStates({
              key: 'userProfile',
              value: jwtDecode(response.jwt),
            }),
          );
          dispatch(
            setUserAuthStates({
              key: 'login', // The state key you want to update
              value: true, //
            }),
          );
          // sendNotificationMessage(fcmtoken, response.jwt); // Only call now

          // Wait until JWT is fully dispatched
          // store.subscribe(() => {
          //   const currentJwt = store.getState().userAuth.jwt;
          //   return false
          //   Alert.alert(currentJwt)
          //   if (currentJwt) {
          //   }
          // });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
        });
    } catch (err) {
      console.error('OTP verification failed:', err);
      setLoader(false);
      setError(err.message || 'OTP verification failed. Please try again.');
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
  //      VERIFY_OTP_LOGIN({
  //       mobile: mobile,
  //       otp: otp,
  //     }).then((response)=>{
  //       if(response?.jwt && response?.refresh_token){
  //         dispatch(
  //           setUserAuthStates({
  //             key: 'jwt', // The state key you want to update
  //             value: response?.jwt, //
  //           }),
  //         );
  //       }
  //       return response
  //     }).then((response)=>{
  //       dispatch(
  //         setUserAuthStates({
  //           key: 'refreshToken', // The state key you want to update
  //           value: response?.refresh_token
  //         }),
  //       );
  //       return response
  //     }).then((response)=>{
  //       dispatch(
  //         setUserAuthStates({
  //           key:"userProfile",
  //           value: jwtDecode(response.jwt),
  //         }),
  //       );
  //       sendNotificationMessage(fcmtoken);
  //     }).catch((err)=>{
  //       console.log(err)
  //     }).finally((e)=>{
  //       setLoader(false)
  //     })

  //   } catch (err) {
  //     console.error('OTP verification failed:', err);
  //     setLoader(false);
  //     setError(err.message || 'OTP verification failed. Please try again.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />

      <Header backButton={true} />
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
    </View>
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
