import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  BackHandler,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {DRIVER_LOGIN} from '../apis/Apis';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const DriverLogin = () => {
  const navigation = useNavigation();
  const [field, setField] = useState('');
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = text => {
    setField({mobile: text});
  };

  // backButton not working Stop

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

  const sendOtp = async () => {
    try {
      if (!field.mobile) {
        setError('Please Enter Mobile Number');
        return;
      } else if (field.mobile.length !== 10) {
        setError('Please Enter 10 digit Mobile Number');
        // Alert.alert('Please Enter Valid Mobile No.');
        return;
      }
      setError(null);
      setLoader(true);
      const response = await DRIVER_LOGIN(field);
      // console.log(response, 'rrrrrr');
      if (response.status_code == '200') {
        setLoader(false);
        navigation.navigate('CheckDriverOtp', {mobile: field.mobile});
      }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={false} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} >
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
                    isFocused || field.mobile ? styles.inputFocused : null,
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
                    value={field.mobile}
                    maxLength={10}
                    placeholder="Enter Driver Mobile Number"
                    placeholderTextColor="rgb(42, 42, 42)"
                    onFocus={() => setIsFocused(true)}
                    onPressIn={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>

                {/* <View style={[styles.inputView,
                      isFocused || field.mobile ? styles.inputFocused : null,
                ]}>
                  <TextInput
                    style={[styles.inputText,
                      isFocused || field.mobile ? styles.inputFocused : null,

                    ]}
                    onChangeText={handleChange}
                    // value={field.mobile}
                    keyboardType="numeric"
                    placeholder="Enter Driver Mobile Number"
                    placeholderTextColor="rgb(42, 42, 42)"
                    onFocus={() => setIsFocused(true)}
                    onPressIn={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View> */}
              </View>
              <View style={{marginHorizontal: moderateScale(30)}}>
                <Text style={{color: 'red', fontSize: 12}}>{error}</Text>
              </View>

              <Pressable
                style={styles.btnView}
                disabled={loader}
                onPress={sendOtp}>
                <Text style={styles.btnText}>
                  {loader ? 'Please Wait' : 'Submit'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor : AppColors.white
  },
  
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginVertical: 1
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
    borderRightWidth: 12,
    borderTopWidth: 12,
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
