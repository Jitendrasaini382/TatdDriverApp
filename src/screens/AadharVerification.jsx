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
  Keyboard,
  Alert,
  Platform,
  Linking,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {SEND_AADHAR_OTP, VIEW_AADHAR_NUMBER} from '../apis/Apis';
import {Triangle_Icon} from '../assets/images';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const AadharVerification = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [allData, setAllData] = useState(null);
  const [aadharNumber, setAadharNumber] = useState('');
  const [loader, setLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    setLoader(true);
    getAllAgentKycInfo();
  }, []);

  const getAllAgentKycInfo = async () => {
    try {
      const response = await VIEW_AADHAR_NUMBER({
        action: 'view_aadhaar_number_api',
      });
      setAllData(response);
      setAadharNumber(response?.aadhar_number);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const sendOtp = async () => {
    setOtpLoader(true);
    console.log('setOtpLoader set to true');

    try {
      const response = await SEND_AADHAR_OTP({
        action: 'submit_aadhaar_otp',
        aadhar_number: aadharNumber,
        current_language: languageSwitch,
      });
      if (
        response?.status_code == 200 &&
        response?.success_message == 'success' &&
        response?.client_id
      ) {
        navigation.navigate('AadharVerifyOtp', {data: response});
      } else {
        Alert.alert('', response?.success_message);
      }
    } catch (error) {
      console.error('Error in sendOtp function:', error);
      Alert.alert('', error?.message);
    } finally {
      setOtpLoader(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      {/* <StatusBar backgroundColor={AppColors.mainColor} /> */}
      {/* <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      /> */}
      <Header backButton={true} />
      {loader ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="small" color={AppColors.mainColor} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await getAllAgentKycInfo();
              }}
            />
          }
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always">
          <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.mainView}>
                <View style={styles.mainTopView}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.mainTopContent}>
                      <Text style={styles.trustedText}>
                        {allData?.driver_name}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Image
                        source={Triangle_Icon}
                        resizeMode={'cover'}
                        style={styles.icon}
                      />
                    </View>
                  </View>
                  <Text style={styles.mainHeading}>Verify Your Aadhar</Text>
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
                      editable={false}
                      keyboardType="numeric"
                      value={aadharNumber}
                      // maxLength={10}
                      placeholder="Enter Aadhar Number"
                      placeholderTextColor="rgb(42, 42, 42)"
                    />
                  </View>
                </View>

                <Pressable
                  disabled={otpLoader}
                  style={[
                    styles.btnView,
                    otpLoader ? {backgroundColor: AppColors.greyColor} : null,
                  ]}
                  onPress={sendOtp}>
                  {otpLoader ? (
                    <View style={{flexDirection: 'row'}}>
                      <ActivityIndicator size="small" color={AppColors.white} />
                      <Text style={styles.btnText}> Sending OTP... </Text>
                    </View>
                  ) : (
                    <Text style={styles.btnText}>Submit</Text>
                  )}
                </Pressable>

                <Text style={styles.descHindi}>{allData?.hindi_message}</Text>
                <Text style={styles.descEnglish}>
                  {allData?.english_message}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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

export default AadharVerification;
