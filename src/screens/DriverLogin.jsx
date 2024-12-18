import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  BackHandler,
  Pressable,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
  NativeModules,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {DRIVER_LOGIN} from '../apis/Apis';
import {useNavigation} from '@react-navigation/native';
import {googleLogo} from '../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const {MyTelephonyModule} = NativeModules;
// console.log('MyTelephonyModule:', MyTelephonyModule);

async function requestPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
      ]);

      if (
        granted['android.permission.READ_PHONE_STATE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_PHONE_NUMBERS'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Phone state permissions granted');
        return true;
      } else {
        console.log('Phone state permissions denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

const getSimInfo = async () => {
  const hasPermission = await requestPermissions();
  if (hasPermission) {
    try {
      // console.log('Fetching SIM information...');
      const simInfo = await MyTelephonyModule.getSimInfo();
      // console.log('SIM Information retrieved:', simInfo);
      return simInfo;
    } catch (error) {
      console.log('Error fetching SIM Info:', error);
      return 'Failed to get SIM information';
    }
  } else {
    console.log('Error fetching SIM Info:', error);
  }
};

const extractPhoneNumbers = info => {
  return info.match(/Phone Number: [\+\d]+/g).map(match => {
    const phoneNumber = match
      .replace('Phone Number: ', '')
      .replace(/^(\+91|0)/, '');
    return Number(phoneNumber);
  });
};

const DriverLogin = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [loader, setLoader] = useState(false);
  const [hasModalOpened, setHasModalOpened] = useState(false); // Track if modal has been opened
  const [simInfo, setSimInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleChange = text => {
    setMobile(text);
    if (text.length == 10) {
      Keyboard.dismiss();
    }
  };

  // Function to handle setting the number
  const handleSetNumber = item => {
    // console.log(item, 'itemmmmmmmm');
    setMobile(item); // Set the selected item as the input field value
    // if (mobile) {
    handleClose(); // Close the modal
    // }
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  // const handleOpen = () => {
  //   if (!hasModalOpened) {
  //     setModalVisible(true);
  //     setHasModalOpened(true);
  //   }
  // };
  const handleOpen = () => {
    if (
      simInfo.length > 0 &&
      !simInfo.includes('Please Allow The Permission')
    ) {
      if (!hasModalOpened) {
        setModalVisible(true);
        setHasModalOpened(true);
      }
    } else {
      console.log('No valid phone numbers available, modal will not open.');
    }
  };

  useEffect(() => {
    fetchSimInfo();
  }, []);

  const fetchSimInfo = async () => {
    try {
      const info = await getSimInfo();
      setSimInfo(extractPhoneNumbers(info));
      console.log(extractPhoneNumbers(info), 'fghjkkjhgfdfghj');
    } catch (err) {
      setSimInfo(['Please Allow The Permission']);
    }
  };

  // backButton working Stop

  // useEffect(()=>{
  //   const backAction = () => {
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // },[])

  const sendOtp = async number => {
    console.log('send otppp===========================');
    console.log(typeof number, number);
    console.log('send otppp===========================');

    try {
      console.log(number.length, mobile, 'apiiiiiiiii');

      if (!number) {
        setError('Please Enter Mobile Number');
        return;
      } else if (number.length !== 10) {
        setError('Please Enter 10 digit Mobile Number');
        return;
      }
      setError(null);
      Keyboard.dismiss();
      setLoader(true);
      const response = await DRIVER_LOGIN({mobile: number});
      console.log(response, 'loginnnnnnnnn');

      if (response.status_code == '200') {
        console.log('send otppp111111');
        setLoader(false);
        navigation.navigate('CheckDriverOtp', {mobile: number});
      }
    } catch (err) {
      setLoader(false);
      console.log(err, 'err');
    }
  };
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.safeArea]}>

      <View style={{height:insets.top,backgroundColor:AppColors.mainColor}}/>
      <Header backButtn={false} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="always">
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.mainView}>
              <View style={styles.mainTopView}>
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
                    // onFocus={() => setIsFocused(true)}
                    // onPressIn={() => setIsFocused(true)}

                    onFocus={() => {
                      setIsFocused(true);
                      handleOpen(); // Open the modal when focused
                    }}
                    onPressIn={() => {
                      setIsFocused(true);
                      handleOpen(); // Open the modal when pressed
                    }}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>
              <View style={{marginHorizontal: moderateScale(30)}}>
                <Text style={{color: 'red', fontSize: 12}}>{error}</Text>
              </View>

              <Pressable
                style={styles.btnView}
                disabled={loader}
                onPress={() => sendOtp(mobile)}>
                <Text style={styles.btnText}>
                  {loader ? 'Sending OTP' : 'Submit'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={handleClose}
          animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'flex-end',
              alignItems: 'center',
              // alignContent: "space-between"
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    borderRadius: 18,
                    height: 36,
                    width: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'center',
                      height: 30,
                      width: 30,
                    }}
                    source={googleLogo}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleClose}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 18,
                    height: 36,
                    width: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                  }}>
                  <Icon name="close" size={20} color={AppColors.greyColor} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: 'black',
                }}>
                Choose a phone number
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 5,
                  color: '#555',
                }}>
                You can choose a phone number that's assigned to your phone, and
                Google will share it only with this app.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 5,
                  color: '#555',
                }}>
                Google won't store the phone number that you share with this app
                in your Google Account
              </Text>

              <FlatList
                data={simInfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    {item !== 'Please Allow The Permission' ? (
                      <View
                        style={{
                          backgroundColor: 'grey',
                          borderRadius: 18,
                          height: 36,
                          width: 36,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 15,
                        }}>
                        <Icon
                          name="phone"
                          size={20}
                          color={AppColors.greyColor}
                        />
                      </View>
                    ) : null}
                    <TouchableOpacity
                      style={{}}
                      onPress={() => handleSetNumber(item.toString())}>
                      <Text style={{fontSize: 18, color: 'black'}}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <Text
                style={{
                  fontSize: 12,
                  marginTop: 15,
                  color: '#555',
                }}>
                You can update your phone number sharing preference in your
                device settings
                {/* <Text style={{color: '#1a73e8'}}> device settings</Text>. */}
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DriverLogin;
