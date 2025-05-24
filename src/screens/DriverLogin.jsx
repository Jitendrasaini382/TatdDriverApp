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

  const handleChange = text => {
    setMobile(text);
    if (text.length == 10) {
      Keyboard.dismiss();
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems?.viewableItems?.length > 0) {
      setActiveVideoIndex(viewableItems.viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const getAllData = async () => {
    try {
      const response = await GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS();
      setAllData(response);
    } catch (error) {
      console.error('Send device info error:', error);
    }
  };

  // useEffect(() => {
  //   getAllData();
  // }, []);

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
        navigation.navigate('CheckDriverOtp', {mobile: mobile});
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

            {/* <FlatList
              horizontal
              data={
                selectedLanguage === 'English'
                  ? allData?.english_video
                  : allData?.hindi_video
              }
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <View style={styles.videoWrapper}>
                  <YoutubePlayer
                    height={200}
                    videoId={item}
                    webViewProps={{
                      renderToHardwareTextureAndroid: true,
                    }}
                  />
                </View>
              )}
              // showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.horizontalList}
              pagingEnabled
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {(selectedLanguage === 'English'
                ? allData?.english_video
                : allData?.hindi_video
              ).map((_, index) => (
                <View
                  key={index}
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor:
                      activeVideoIndex === index
                        ? AppColors.mainColor
                        : AppColors.greyColor,
                    marginHorizontal: 5,
                  }}
                />
              ))} */}
            {/* </View> */}
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

// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Dimensions,
//   ScrollView,
//   Pressable,
//   Image,
//   Keyboard,
//   Alert,
//   Platform,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import Header from '../components/Header';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {AppColors} from '../assets/Colors';
// import {AppFont} from '../assets/FontsFamily';
// import {DRIVER_LOGIN} from '../apis/Apis';
// import {useNavigation} from '@react-navigation/native';
// import {Triangle_Icon} from '../assets/images';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import DeviceInfo from 'react-native-device-info';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import {setUserAuthStates} from '../redux/slices/userAuthSlice';
// import {useDispatch} from 'react-redux';

// const {width, height} = Dimensions.get('window');
// const designWidth = width;
// const designHeight = height;

// const scale = size => (width / designWidth) * size;
// const verticalScale = size => (height / designHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// const DriverLogin = () => {
//   const navigation = useNavigation();
//   const [mobile, setMobile] = useState(null);
//   const [error, setError] = useState(null);
//   const [isFocused, setIsFocused] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const appVersion = DeviceInfo.getVersion();
//   const appType = Platform.OS;
//   const dispatch = useDispatch();

//   const handleChange = text => {
//     setMobile(text);
//     if (text.length == 10) {
//       Keyboard.dismiss();
//     }
//   };

//   const [selectedLanguage, setSelectedLanguage] = useState('English');

//   const hindiVideoIds = [
//     'gOUGGl-l39E',
//     'zJIxK33h5Ng',
//     'OtaAd5aUHJw',
//     'z7fbMTl2scU',
//   ];
//   const englishVideoIds = [
//     'zJIxK33h5Ng',
//     'OtaAd5aUHJw',
//     'z7fbMTl2scU',
//     'gOUGGl-l39E',
//   ];

//   const sendOtp = async () => {
//     try {
//       if (!mobile) {
//         setError('Please Enter Mobile Number');
//         return;
//       } else if (mobile.length !== 10) {
//         setError('Please Enter 10 digit Mobile Number');
//         return;
//       }
//       setError(null);
//       Keyboard.dismiss();
//       setLoader(true);
//       const response = await DRIVER_LOGIN({
//         mobile: mobile,
//         user_type: 'Driver',
//         app_version: appVersion,
//         app_type: appType,
//       });
//       if (response?.status_code == '200' && response?.msg_type == 'error') {
//         setLoader(false);
//         Alert.alert('', response?.message);
//       } else if (
//         response?.status_code == '200' &&
//         response?.message == 'OTP sent successfully'
//       ) {
//         setLoader(false);
//         navigation.navigate('CheckDriverOtp', {mobile: mobile});
//       } else if (
//         response?.status_code == '200' &&
//         response?.message == 'Not Found in Trusted and registration table'
//       ) {
//         setLoader(false);
//         // Linking.openURL(response?.redirect);
//         dispatch(
//           setUserAuthStates({
//             key: 'isRegistered',
//             value: false,
//           }),
//         );
//         navigation.navigate('CheckDriverOtp', {mobile: mobile});
//       }
//     } catch (err) {
//       setLoader(false);
//       setError(err);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const insets = useSafeAreaInsets();
//   return (
//     <View style={[styles.safeArea]}>
//       <View
//         style={{height: insets.top, backgroundColor: AppColors.mainColor}}
//       />
//       <Header backButton={false} isAuthenticated={false} />
//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         keyboardShouldPersistTaps="always">
//         <View style={styles.mainContainer}>
//           <View style={styles.contentContainer}>
//             <View style={styles.mainView}>
//               <View style={styles.mainTopView}>
//                 <View style={{flexDirection: 'row'}}>
//                   <View style={styles.mainTopContent}>
//                     <Text style={styles.trustedText}>
//                       Trusted & Trained Driver
//                     </Text>
//                   </View>
//                   <View style={styles.iconContainer}>
//                     <Image
//                       source={Triangle_Icon}
//                       resizeMode={'cover'}
//                       style={styles.icon}
//                     />
//                   </View>
//                 </View>
//                 <Text style={styles.mainHeading}>Driver Login</Text>
//               </View>

//               <View style={styles.mainMiddleView}>
//                 <View style={styles.iconView}>
//                   <Icon
//                     name="phone"
//                     size={moderateScale(15)}
//                     color={AppColors.greyColor}
//                   />
//                 </View>

//                 <View
//                   style={[
//                     styles.inputView,
//                     isFocused || mobile ? styles.inputFocused : null,
//                     {
//                       borderColor: isFocused
//                         ? AppColors.mainColor
//                         : AppColors.greyColor,
//                     },
//                   ]}>
//                   <TextInput
//                     style={[
//                       styles.inputText,
//                       {fontWeight: isFocused ? 'bold' : 'normal'},
//                     ]}
//                     onChangeText={handleChange}
//                     keyboardType="numeric"
//                     value={mobile}
//                     maxLength={10}
//                     placeholder="Enter Driver Mobile Number"
//                     placeholderTextColor="rgb(42, 42, 42)"
//                     onFocus={() => {
//                       setIsFocused(true);
//                     }}
//                     onPressIn={() => {
//                       setIsFocused(true);
//                     }}
//                     onBlur={() => setIsFocused(false)}
//                   />
//                 </View>
//               </View>
//               <View style={{marginHorizontal: moderateScale(30)}}>
//                 <Text style={{color: AppColors.red, fontSize: 12}}>
//                   {error}
//                 </Text>
//               </View>

//               <Pressable
//                 style={styles.btnView}
//                 disabled={loader}
//                 onPress={() => sendOtp()}>
//                 <Text style={styles.btnText}>
//                   {loader ? 'Sending OTP' : 'Submit'}
//                 </Text>
//               </Pressable>
//             </View>

//             <View style={styles.languageContainer}>
//               {['Hindi', 'English'].map(lang => (
//                 <TouchableOpacity
//                   key={lang}
//                   style={[
//                     styles.languageButton,
//                     selectedLanguage === lang && styles.selectedLanguage,
//                   ]}
//                   onPress={() => setSelectedLanguage(lang)}>
//                   <Text
//                     style={
//                       selectedLanguage === lang
//                         ? styles.selectedText
//                         : styles.languageText
//                     }>
//                     {lang}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.videoContainer}>
//               {(selectedLanguage === 'English'
//                 ? englishVideoIds
//                 : hindiVideoIds
//               ).map((videoId, index) => (
//                 <View key={videoId} style={styles.videoWrapper}>
//                   <YoutubePlayer
//                     height={200}
//                     videoId={videoId}
//                     webViewProps={{
//                       renderToHardwareTextureAndroid: true,
//                     }}
//                   />
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   trustedText: {
//     position: 'absolute',
//     color: AppColors.mainColor,
//     marginLeft: 15,
//     fontFamily: 'Roboto',
//   },
//   iconContainer: {
//     paddingVertical: 10,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },

//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     marginVertical: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     padding: moderateScale(15),
//   },
//   mainView: {
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: moderateScale(10),
//     borderColor: AppColors.mainColor,
//     width: '100%',
//   },
//   mainTopView: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: moderateScale(8),
//     marginBottom: verticalScale(12),
//   },
//   mainTopContent: {
//     flexDirection: 'row',
//     marginVertical: 10,
//     padding: 10,
//     width: '70%',
//     backgroundColor: AppColors.white,
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
//     paddingTop: 2,
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
//   mainHeading: {
//     fontSize: moderateScale(28),
//     marginTop: verticalScale(30),
//     paddingBottom: verticalScale(10),
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     color: AppColors.white,
//     fontFamily: 'Roboto-Black',
//   },
//   mainMiddleView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: moderateScale(30),
//     marginTop: verticalScale(50),
//   },
//   iconView: {
//     borderWidth: 1,
//     borderColor: AppColors.greyColor,
//     height: verticalScale(36),
//     padding: moderateScale(10),
//   },
//   inputView: {
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderColor: AppColors.greyColor,
//     height: verticalScale(36),
//     flex: 1,
//   },
//   inputText: {
//     height: verticalScale(36),
//     fontSize: moderateScale(14),
//     color: AppColors.black,
//     textAlign: 'left',
//   },
//   inputFocused: {
//     borderTopColor: AppColors.mainColor,
//     borderBottomColor: AppColors.mainColor,
//     borderRightColor: AppColors.mainColor,
//     fontWeight: 'bold',
//   },
//   btnView: {
//     backgroundColor: AppColors.mainColor,
//     alignItems: 'center',
//     borderRadius: moderateScale(5),
//     justifyContent: 'center',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(10),
//     alignSelf: 'center',
//     marginTop: verticalScale(30),
//     marginBottom: verticalScale(40),
//     width: '45%',
//   },
//   btnText: {
//     fontSize: moderateScale(18),
//     color: AppColors.white,
//     fontWeight: '600',
//     fontFamily: AppFont.regularFont,
//   },
//   languageContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: AppColors.white,
//     borderRadius: 10,
//     width: '100%',
//     padding: 5,
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   languageButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   selectedLanguage: {
//     backgroundColor: AppColors.greyColor,
//   },
//   languageText: {
//     fontSize: 16,
//     color: AppColors.textDark,
//   },
//   selectedText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: AppColors.textLight,
//   },
//   videoContainer: {
//     width: '100%',
//   },
//   videoWrapper: {
//     // marginBottom: 25,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: AppColors.backgroundColor,
//     // elevation: 3,
//     padding: 10,
//   },
//   videoCaption: {
//     marginTop: 8,
//     fontSize: 14,
//     color: AppColors.textDark,
//     textAlign: 'center',
//   },
// });

// export default DriverLogin;

// // import React, {useState} from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   View,
// //   Dimensions,
// //   ScrollView,
// //   Pressable,
// //   Image,
// //   Keyboard,
// //   Alert,
// //   Platform,
// //   Linking,
// //   TouchableOpacity,
// // } from 'react-native';
// // import Header from '../components/Header';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import {AppColors} from '../assets/Colors';
// // import {AppFont} from '../assets/FontsFamily';
// // import {DRIVER_LOGIN} from '../apis/Apis';
// // import {useNavigation} from '@react-navigation/native';
// // import {Triangle_Icon} from '../assets/images';
// // import {useSafeAreaInsets} from 'react-native-safe-area-context';
// // import DeviceInfo from 'react-native-device-info';
// // import YoutubePlayer from 'react-native-youtube-iframe';
// // import {setUserAuthStates} from '../redux/slices/userAuthSlice';
// // import {useDispatch} from 'react-redux';

// // const {width, height} = Dimensions.get('window');
// // const designWidth = width;
// // const designHeight = height;

// // const scale = size => (width / designWidth) * size;
// // const verticalScale = size => (height / designHeight) * size;
// // const moderateScale = (size, factor = 0.5) =>
// //   size + (scale(size) - size) * factor;

// // const DriverLogin = () => {
// //   const navigation = useNavigation();
// //   const [mobile, setMobile] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [isFocused, setIsFocused] = useState(false);
// //   const [loader, setLoader] = useState(false);
// //   const appVersion = DeviceInfo.getVersion();
// //   const appType = Platform.OS;
// //   const dispatch = useDispatch();

// //   const handleChange = text => {
// //     setMobile(text);
// //     if (text.length == 10) {
// //       Keyboard.dismiss();
// //     }
// //   };

// //   const [selectedLanguage, setSelectedLanguage] = useState('English');

// //   const hindiVideoIds = [
// //     'gOUGGl-l39E',
// //     'zJIxK33h5Ng',
// //     'OtaAd5aUHJw',
// //     'z7fbMTl2scU',
// //   ];
// //   const englishVideoIds = [
// //     'zJIxK33h5Ng',
// //     'OtaAd5aUHJw',
// //     'z7fbMTl2scU',
// //     'gOUGGl-l39E',
// //   ];

// //   const sendOtp = async () => {
// //     try {
// //       if (!mobile) {
// //         setError('Please Enter Mobile Number');
// //         return;
// //       } else if (mobile.length !== 10) {
// //         setError('Please Enter 10 digit Mobile Number');
// //         return;
// //       }
// //       setError(null);
// //       Keyboard.dismiss();
// //       setLoader(true);
// //       const response = await DRIVER_LOGIN({
// //         mobile: mobile,
// //         user_type: 'Driver',
// //         app_version: appVersion,
// //         app_type: appType,
// //       });
// //       if (response?.status_code == '200' && response?.msg_type == 'error') {
// //         setLoader(false);
// //         Alert.alert('', response?.message);
// //       } else if (
// //         response?.status_code == '200' &&
// //         response?.message == 'OTP sent successfully'
// //       ) {
// //         setLoader(false);
// //         navigation.navigate('CheckDriverOtp', {mobile: mobile});
// //       } else if (
// //         response?.status_code == '200' &&
// //         response?.message == 'Not Found in Trusted and registration table'
// //       ) {
// //         setLoader(false);
// //         dispatch(
// //           setUserAuthStates({
// //             key: 'isRegistered',
// //             value: false,
// //           }),
// //         );
// //         navigation.navigate('CheckDriverOtp', {mobile: mobile});
// //       }
// //     } catch (err) {
// //       setLoader(false);
// //       setError(err);
// //     } finally {
// //       setLoader(false);
// //     }
// //   };

// //   const insets = useSafeAreaInsets();
// //   return (
// //     <View style={[styles.safeArea]}>
// //       <View
// //         style={{height: insets.top, backgroundColor: AppColors.mainColor}}
// //       />
// //       <Header backButton={false} isAuthenticated={false} />
// //       <ScrollView
// //         contentContainerStyle={styles.scrollViewContent}
// //         keyboardShouldPersistTaps="always"
// //         showsVerticalScrollIndicator={false}>
// //         <View style={styles.mainContainer}>
// //           <View style={styles.contentContainer}>
// //             {/* Hero Section */}
// //             <View style={styles.heroSection}>
// //               <View style={styles.badgeContainer}>
// //                 <View style={styles.badge}>
// //                   <Icon
// //                     name="shield"
// //                     size={moderateScale(16)}
// //                     color={AppColors.mainColor}
// //                     style={styles.badgeIcon}
// //                   />
// //                   <Text style={styles.badgeText}>Trusted & Trained Driver</Text>
// //                 </View>
// //               </View>

// //               <Text style={styles.mainTitle}>Welcome Back</Text>
// //               <Text style={styles.subtitle}>
// //                 Sign in to your driver account
// //               </Text>
// //             </View>

// //             {/* Login Card */}
// //             <View style={styles.loginCard}>
// //               <View style={styles.inputContainer}>
// //                 <View style={styles.inputWrapper}>
// //                   <View style={styles.inputIconContainer}>
// //                     <Icon
// //                       name="phone"
// //                       size={moderateScale(18)}
// //                       color={
// //                         isFocused ? AppColors.mainColor : AppColors.greyColor
// //                       }
// //                     />
// //                   </View>
// //                   <TextInput
// //                     style={[
// //                       styles.textInput,
// //                       isFocused && styles.textInputFocused,
// //                     ]}
// //                     onChangeText={handleChange}
// //                     keyboardType="numeric"
// //                     value={mobile}
// //                     maxLength={10}
// //                     placeholder="Enter your mobile number"
// //                     placeholderTextColor={AppColors.greyColor}
// //                     onFocus={() => setIsFocused(true)}
// //                     onBlur={() => setIsFocused(false)}
// //                   />
// //                 </View>
// //                 {error && (
// //                   <View style={styles.errorContainer}>
// //                     <Icon
// //                       name="exclamation-circle"
// //                       size={moderateScale(12)}
// //                       color={AppColors.red}
// //                     />
// //                     <Text style={styles.errorText}>{error}</Text>
// //                   </View>
// //                 )}
// //               </View>

// //               <Pressable
// //                 style={[
// //                   styles.submitButton,
// //                   loader && styles.submitButtonDisabled,
// //                 ]}
// //                 disabled={loader}
// //                 onPress={() => sendOtp()}>
// //                 <Text style={styles.submitButtonText}>
// //                   {loader ? 'Sending OTP...' : 'Get OTP'}
// //                 </Text>
// //               </Pressable>
// //             </View>

// //             {/* Language Selection */}
// //             <View style={styles.languageSection}>
// //               <Text style={styles.sectionTitle}>Choose Language</Text>
// //               <View style={styles.languageContainer}>
// //                 {['English', 'Hindi'].map(lang => (
// //                   <TouchableOpacity
// //                     key={lang}
// //                     style={[
// //                       styles.languageButton,
// //                       selectedLanguage === lang &&
// //                         styles.selectedLanguageButton,
// //                     ]}
// //                     onPress={() => setSelectedLanguage(lang)}>
// //                     <Text
// //                       style={[
// //                         styles.languageText,
// //                         selectedLanguage === lang &&
// //                           styles.selectedLanguageText,
// //                       ]}>
// //                       {lang}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>
// //             </View>

// //             {/* Video Section */}
// //             <View style={styles.videoSection}>
// //               <Text style={styles.sectionTitle}>Training Videos</Text>
// //               <View style={styles.videoContainer}>
// //                 {(selectedLanguage === 'English'
// //                   ? englishVideoIds
// //                   : hindiVideoIds
// //                 ).map((videoId, index) => (
// //                   <View key={videoId} style={styles.videoWrapper}>
// //                     <YoutubePlayer
// //                       height={220}
// //                       videoId={videoId}
// //                       webViewProps={{
// //                         renderToHardwareTextureAndroid: true,
// //                       }}
// //                     />
// //                   </View>
// //                 ))}
// //               </View>
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //   },
// //   scrollViewContent: {
// //     flexGrow: 1,
// //   },
// //   mainContainer: {
// //     flex: 1,
// //     backgroundColor:AppColors.white,
// //   },
// //   contentContainer: {
// //     flex: 1,
// //     paddingHorizontal: moderateScale(20),
// //     paddingTop: verticalScale(20),
// //   },

// //   // Hero Section
// //   heroSection: {
// //     alignItems: 'center',
// //     marginBottom: verticalScale(30),
// //   },
// //   badgeContainer: {
// //     marginBottom: verticalScale(20),
// //   },
// //   badge: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 123, 255, 0.1)',
// //     paddingHorizontal: moderateScale(12),
// //     paddingVertical: verticalScale(6),
// //     borderRadius: moderateScale(20),
// //     borderWidth: 1,
// //     borderColor: 'rgba(0, 123, 255, 0.2)',
// //   },
// //   badgeIcon: {
// //     marginRight: moderateScale(6),
// //   },
// //   badgeText: {
// //     fontSize: moderateScale(12),
// //     color: AppColors.mainColor,
// //     fontWeight: '600',
// //     fontFamily: AppFont.regularFont,
// //   },
// //   mainTitle: {
// //     fontSize: moderateScale(32),
// //     fontWeight: '700',
// //     color: '#1a1a1a',
// //     marginBottom: verticalScale(8),
// //     fontFamily: AppFont.regularFont,
// //   },
// //   subtitle: {
// //     fontSize: moderateScale(16),
// //     color: '#6c757d',
// //     fontFamily: AppFont.regularFont,
// //   },

// //   // Login Card
// //   loginCard: {
// //     backgroundColor: 'white',
// //     borderRadius: moderateScale(16),
// //     padding: moderateScale(24),
// //     marginBottom: verticalScale(24),
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 4,
// //   },
// //   inputContainer: {
// //     marginBottom: verticalScale(24),
// //   },
// //   inputWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: '#e9ecef',
// //     borderRadius: moderateScale(12),
// //     backgroundColor: '#f8f9fa',
// //     overflow: 'hidden',
// //   },
// //   inputIconContainer: {
// //     paddingHorizontal: moderateScale(16),
// //     paddingVertical: verticalScale(16),
// //     backgroundColor: 'white',
// //   },
// //   textInput: {
// //     flex: 1,
// //     fontSize: moderateScale(16),
// //     color: '#1a1a1a',
// //     paddingVertical: verticalScale(16),
// //     paddingRight: moderateScale(16),
// //     fontFamily: AppFont.regularFont,
// //   },
// //   textInputFocused: {
// //     borderColor: AppColors.mainColor,
// //   },
// //   errorContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: verticalScale(8),
// //     paddingHorizontal: moderateScale(4),
// //   },
// //   errorText: {
// //     fontSize: moderateScale(12),
// //     color: AppColors.red,
// //     marginLeft: moderateScale(6),
// //     fontFamily: AppFont.regularFont,
// //   },
// //   submitButton: {
// //     backgroundColor: AppColors.mainColor,
// //     borderRadius: moderateScale(12),
// //     paddingVertical: verticalScale(16),
// //     alignItems: 'center',
// //     shadowColor: AppColors.mainColor,
// //     shadowOffset: {
// //       width: 0,
// //       height: 4,
// //     },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   submitButtonDisabled: {
// //     opacity: 0.7,
// //   },
// //   submitButtonText: {
// //     fontSize: moderateScale(16),
// //     color: 'white',
// //     fontWeight: '600',
// //     fontFamily: AppFont.regularFont,
// //   },

// //   // Section Titles
// //   sectionTitle: {
// //     fontSize: moderateScale(18),
// //     fontWeight: '600',
// //     color: '#1a1a1a',
// //     marginBottom: verticalScale(12),
// //     fontFamily: AppFont.regularFont,
// //   },

// //   // Language Section
// //   languageSection: {
// //     marginBottom: verticalScale(24),
// //   },
// //   languageContainer: {
// //     flexDirection: 'row',
// //     backgroundColor: 'white',
// //     borderRadius: moderateScale(12),
// //     padding: moderateScale(4),
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 1,
// //     },
// //     shadowOpacity: 0.05,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   languageButton: {
// //     flex: 1,
// //     paddingVertical: verticalScale(12),
// //     alignItems: 'center',
// //     borderRadius: moderateScale(8),
// //     marginHorizontal: moderateScale(2),
// //   },
// //   selectedLanguageButton: {
// //     backgroundColor: AppColors.mainColor,
// //     shadowColor: AppColors.mainColor,
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   languageText: {
// //     fontSize: moderateScale(14),
// //     color: '#6c757d',
// //     fontWeight: '500',
// //     fontFamily: AppFont.regularFont,
// //   },
// //   selectedLanguageText: {
// //     color: 'white',
// //     fontWeight: '600',
// //   },

// //   // Video Section
// //   videoSection: {
// //     marginBottom: verticalScale(20),
// //   },
// //   videoContainer: {
// //     gap: verticalScale(16),
// //   },
// //   videoWrapper: {
// //     borderRadius: moderateScale(12),
// //     overflow: 'hidden',
// //     backgroundColor: 'white',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 4,
// //   },
// // });

// // export default DriverLogin;
