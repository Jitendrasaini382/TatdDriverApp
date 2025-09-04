import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {SEND_REQUEST_AADHAR_EXEMPTION, VERIFY_AADHAR_OTP} from '../apis/Apis';
import {Triangle_Icon} from '../assets/images';
import {useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const AadharVerifyOtp = ({navigation, route}) => {
  const {data} = route?.params || {};
  const aadharNumber = data?.aadhaar_number;
  const clientId = data?.client_id;
  const driverName = data?.driver_name;
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [exemptionLoader, setExemptionLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  console.log(data, 'datadatadata');

  //   console.log(clientId, 'clientId');
  //   console.log(driverName, 'driverName');
  //   console.log(aadharNumber, 'aadharNumber');

  const verifyAadharOtp = async () => {
    if (!otp) {
      setError('Please enter OTP.');
      return;
    }
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await VERIFY_AADHAR_OTP({
        action: 'verify_aadhaar_otp_api',
        otp: otp,
        client_id: clientId,
        aadhaar_number: aadharNumber,
        current_language: languageSwitch,
      });
      if (
        response?.status_code == 200 &&
        response?.success_message == 'success'
      ) {
        navigation.navigate('TrustedDriver');
        Alert.alert('', response?.message);
      } else {
        Alert.alert('', response?.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRequestButton = async () => {
    setExemptionLoader(true);
    try {
      const response = await SEND_REQUEST_AADHAR_EXEMPTION({
        action: 'save_aadhaar_exemption',
      });
      if (
        response?.status_code == 200 &&
        response?.success_message == 'success'
      ) {
        navigation.navigate('TrustedDriver');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setExemptionLoader(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      {/* <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      /> */}
      <Header backButton={true} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled" >
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.mainView}>
              <View style={styles.mainTopView}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.mainTopContent}>
                    <Text style={styles.trustedText}>{driverName}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Image
                      source={Triangle_Icon}
                      resizeMode={'cover'}
                      style={styles.icon}
                    />
                  </View>
                </View>
                <Text style={styles.mainHeading}>Submit Aadhar OTP</Text>
              </View>

              <View style={styles.mainMiddleView}>
                <View style={styles.iconView}>
                  <Icon
                    name="sign-in"
                    size={moderateScale(15)}
                    color={AppColors.greyColor}
                  />
                </View>

                <View style={[styles.inputView]}>
                  <TextInput
                    style={[styles.inputText]}
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOtp}
                    maxLength={6}
                    placeholder="Enter 6 Digit Aadhar OTP"
                    placeholderTextColor="rgb(42, 42, 42)"
                  />
                </View>
              </View>
              <Text
                style={{
                  color: 'red',
                  marginHorizontal: moderateScale(30),
                  marginTop: 5,
                }}>
                {error}
              </Text>
              <Pressable
                disabled={loading}
                // style={styles.btnView}

                style={[
                  styles.btnView,
                  loading ? {backgroundColor: AppColors.greyColor} : null,
                ]}
                onPress={() => verifyAadharOtp()}>
                {loading ? (
                  <View style={{flexDirection: 'row'}}>
                    <ActivityIndicator size="small" color={AppColors.white} />
                    <Text style={styles.btnText}> Verifying OTP... </Text>
                  </View>
                ) : (
                  <Text style={styles.btnText}>Submit</Text>
                )}
              </Pressable>

              {data?.request_button == 1 ? (
                <>
                  <Text style={styles.descHindi}>{data?.aadhaar_sms}</Text>
                  <Pressable
                    disabled={exemptionLoader}
                    style={styles.btnView}
                    onPress={() => handleRequestButton()}>
                    <Text style={styles.btnText}>Request Button</Text>
                  </Pressable>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trustedText: {
    position: 'absolute',
    color: AppColors.mainColor,
    marginLeft: 15,
    fontFamily: 'Roboto',
  },
  iconContainer: {
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },

  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginVertical: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: moderateScale(15),
  },
  mainView: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: AppColors.mainColor,
    width: '100%',
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  mainTopContent: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    backgroundColor: AppColors.white,
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
    paddingTop: 2,
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
  mainHeading: {
    fontSize: moderateScale(28),
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
    fontFamily: 'Roboto-Black',
  },
  mainMiddleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: verticalScale(50),
  },
  iconView: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    padding: moderateScale(10),
  },
  inputView: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    flex: 1,
  },
  inputText: {
    height: verticalScale(36),
    fontSize: moderateScale(14),
    color: AppColors.black,
    textAlign: 'left',
  },
  inputFocused: {
    borderTopColor: AppColors.mainColor,
    borderBottomColor: AppColors.mainColor,
    borderRightColor: AppColors.mainColor,
    fontWeight: 'bold',
  },
  btnView: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(40),
    width: '45%',
  },
  btnText: {
    fontSize: moderateScale(18),
    color: AppColors.white,
    fontWeight: '600',
    fontFamily: AppFont.regularFont,
  },

  descHindi: {
    fontSize: 15,
    color: AppColors.black,
    // marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  descEnglish: {
    fontSize: 15,
    paddingHorizontal: 20,
    color: AppColors.black,
    marginBottom: 50,
    alignSelf: 'flex-start',
  },
});

export default AadharVerifyOtp;
