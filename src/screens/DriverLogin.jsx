import React, {useEffect, useRef, useState} from 'react';
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
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {DRIVER_LOGIN, GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS} from '../apis/Apis';
import {useNavigation} from '@react-navigation/native';
import {Triangle_Icon} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useDispatch} from 'react-redux';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const DriverLogin = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allData, setAllData] = useState({});
  const appVersion = DeviceInfo.getVersion();
  const appType = Platform.OS;
  const dispatch = useDispatch();

  const handleChange = text => {
    setMobile(text);
    if (text.length == 10) {
      Keyboard.dismiss();
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const getAllData = async () => {
    try {
      const response = await GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS();
      setAllData(response);
    } catch (error) {
      console.error('Send device info error:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const sendOtp = async () => {
    try {
      if (!mobile) {
        setError('Please Enter Mobile Number');
        return;
      } else if (mobile.length !== 10) {
        setError('Please Enter 10 digit Mobile Number');
        return;
      }
      setError(null);
      Keyboard.dismiss();
      setLoader(true);
      const response = await DRIVER_LOGIN({
        mobile: mobile,
        user_type: 'Driver',
        app_version: appVersion,
        app_type: appType,
      });
      if (response?.status_code == '200' && response?.msg_type == 'error') {
        setLoader(false);
        Alert.alert('', response?.message);
      } else if (
        response?.status_code == '200' &&
        response?.message == 'OTP sent successfully'
      ) {
        setLoader(false);
        dispatch(
          setUserAuthStates({
            key: 'isRegistered',
            value: response?.isRegistered === '1',
          }),
        );
        navigation.navigate('CheckDriverOtp', {
          mobile: mobile,
          isRegistered: response?.isRegistered || '1',
        });
      } else if (
        response?.status_code == '200' &&
        response?.message == 'Not Found in Trusted and registration table'
      ) {
        setLoader(false);
        Linking.openURL(response?.redirect);
      }
    } catch (err) {
      setLoader(false);
      setError(err);
    } finally {
      setLoader(false);
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.safeArea]}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />
      <Header backButton={false} isAuthenticated={false} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.mainView}>
              <View style={styles.mainTopView}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.mainTopContent}>
                    <Text style={styles.trustedText}>
                      Trusted & Trained Driver
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
                <Text style={styles.mainHeading}>Driver Login</Text>
              </View>

              <View style={styles.mainMiddleView}>
                <View style={styles.iconView}>
                  <Icon
                    name="phone"
                    size={moderateScale(15)}
                    color={AppColors.greyColor}
                  />
                </View>

                <View
                  style={[
                    styles.inputView,
                    isFocused || mobile ? styles.inputFocused : null,
                    {
                      borderColor: isFocused
                        ? AppColors.mainColor
                        : AppColors.greyColor,
                    },
                  ]}>
                  <TextInput
                    style={[
                      styles.inputText,
                      {fontWeight: isFocused ? 'bold' : 'normal'},
                    ]}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    value={mobile}
                    maxLength={10}
                    placeholder="Enter Driver Mobile Number"
                    placeholderTextColor="rgb(42, 42, 42)"
                    onFocus={() => setIsFocused(true)}
                    onPressIn={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: moderateScale(30)}}>
                <Text style={{color: AppColors.red, fontSize: 12}}>
                  {error}
                </Text>
              </View>

              <Pressable
                style={styles.btnView}
                disabled={loader}
                onPress={() => sendOtp()}>
                <Text style={styles.btnText}>
                  {loader ? 'Sending OTP' : 'Submit'}
                </Text>
              </Pressable>
            </View>

            {/*  */}
            {allData?.english_video && allData?.hindi_video && (
              <View
                style={{
                  backgroundColor: AppColors.white,
                  borderRadius: 16,
                  padding: 10,
                  marginVertical: 24,
                  elevation: 4,
                }}>
                <View style={styles.languageContainer}>
                  {['Hindi', 'English'].map(lang => (
                    <TouchableOpacity
                      key={lang}
                      style={[
                        styles.languageButton,
                        selectedLanguage === lang && styles.selectedLanguage,
                      ]}
                      onPress={() => setSelectedLanguage(lang)}>
                      <Text
                        style={
                          selectedLanguage === lang
                            ? styles.selectedText
                            : styles.languageText
                        }>
                        {lang}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <FlatList
                  data={
                    selectedLanguage === 'English'
                      ? allData?.english_video
                      : allData?.hindi_video
                  }
                  keyExtractor={(item, index) => item + index}
                  renderItem={({item}) => (
                    <View style={styles.videoWrapper}>
                      <YoutubePlayer
                        height={170}
                        videoId={item}
                        webViewProps={{
                          renderToHardwareTextureAndroid: true,
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
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
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    width: '100%',
    padding: 5,
    marginVertical: 10,
    // marginBottom: 20,
    elevation: 2,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: AppColors.greyColor,
  },
  languageText: {
    fontSize: 16,
    color: AppColors.textDark,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.textLight,
  },
  videoWrapper: {
    width: 300,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: AppColors.backgroundColor,
    padding: 10,
  },
  horizontalList: {
    // paddingHorizontal: 10,
  },
});

export default DriverLogin;
