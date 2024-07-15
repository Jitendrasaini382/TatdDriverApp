import React, {useContext, useState} from 'react';
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
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {CommonActions, useRoute} from '@react-navigation/native';
import {DRIVER_LOGIN, VERIFY_OTP_LOGIN} from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenConstextApi} from '../context/GlobalContext';

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

  const {setJwtToken} = useContext(TokenConstextApi);
  const {setRefreshToken} = useContext(TokenConstextApi);

  const [otp, setOtp] = useState('');

  const [error, setError] = useState(null);
  const [field, setField] = useState({
    mobile: mobile,
  });

  const handleChange = text => {
    setOtp(text);
  };

  const resendOtp = () => {
    DRIVER_LOGIN(field)
      .then(e => {
        console.log(e, 'resend Otp Response');
        if (e.status_code == 200) {
          Alert.alert(`OTP is Resend to +91${mobile} `);
        } else {
          Alert.alert('Failed to resend OTP');
        }
      })
      .catch(err => {
        Alert.alert('Network Error');
      });
  };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        setError('Please Enter The OTP');

        // Alert.alert('Error', 'Please Enter The OTP');
      } else if (otp.length !== 4) {
        setError('Please enter a 4-digit OTP');
        // Alert.alert('Error', 'Please enter a 4-digit OTP');
      }
      const response = await VERIFY_OTP_LOGIN({
        mobile: mobile,
        otp: otp,
      });
      // console.log(response);
      await setRefreshToken(response.refresh_token);
      await setJwtToken(response.jwt);
      await AsyncStorage.setItem('refresh_token', response.refresh_token);
      await AsyncStorage.setItem('jwt', response.jwt);
    } catch (err) {
      console.log(err);
    }
  };

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
                <Text style={styles.resendText}>Resend OTP ?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="sign-in"
                  size={moderateScale(16)}
                  color="rgb(183, 183, 183)"
                />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange}
                  value={otp}
                  keyboardType="numeric"
                  placeholder="Enter OTP or Password"
                  placeholderTextColor="rgb(42, 42, 42)"
                />
              </View>
            </View>
            <View style={{marginHorizontal: moderateScale(30)}}>
              <Text style={{color: 'red', fontSize: 10, marginTop: 10}}>
                {error}
              </Text>
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
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
    borderRightWidth: moderateScale(12),
    borderTopWidth: moderateScale(12),
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
    fontSize: moderateScale(22),
    marginTop: verticalScale(20),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    fontFamily: 'Roboto-Black',
    color: 'rgb(255,255,255)',
    lineHeight: verticalScale(24.2),
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
    marginBottom: verticalScale(30),
    marginTop: verticalScale(25),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: moderateScale(30),
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
  textInput: {
    color: AppColors.black,
    justifyContent: 'center',
    textAlign: 'left',
    height: verticalScale(36),
    fontSize: moderateScale(14),
  },
  verifyButton: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginBottom: verticalScale(40),
    width: '40%',
  },
  verifyButtonText: {
    fontSize: moderateScale(14),
    color: AppColors.white,
    fontWeight: '400',
  },
});

export default CheckDriverOtp;
