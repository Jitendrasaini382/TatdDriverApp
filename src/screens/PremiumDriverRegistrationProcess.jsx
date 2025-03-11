import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';
import {PremiumDriverImage1, PremiumDriverImage2} from '../assets/images';
import {useCallback, useEffect, useState} from 'react';
import {
  GET_ALL_PREMIUM_REGISTRATION_DATA,
  UPLOAD_PIC_PREMIUM_DRIVER,
} from '../apis/Apis';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import DeviceInfo from 'react-native-device-info';
import {setUserAuthStates} from '../redux/slices/userAuthSlice';
import {jwtDecode} from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const PremiumDriverRegistrationProcess = ({navigation}) => {
  const processvalue = useSharedValue(0);
  const pending1 = true;
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);

  const jwtToken = useSelector(e => e?.userAuth?.jwt);
  const refreshToken = useSelector(e => e?.userAuth?.refreshToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setDataLoader(true);
    getAllPremiumRegistrationData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllPremiumRegistrationData();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getAllPremiumRegistrationData = async () => {
    try {
      const response = await GET_ALL_PREMIUM_REGISTRATION_DATA({
        action: 'premium-diver-registration-process',
      });

      setData(response);
      processvalue.value = withTiming(Number(response?.current_step) || 0, {
        duration: 1000,
      });
    } catch (error) {
      setDataLoader(false);
    } finally {
      setDataLoader(false);
    }
  };
  const openGallery = async () => {
    console.log('Running openGallery...');

    try {
      setLoader(true);

      const options = {
        mediaType: 'photo',
        quality: 0.4,
        selectionLimit: 1,
      };

      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setLoader(false);
          return;
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
          Alert.alert('Error', 'Failed to open gallery. Please try again.');
          setLoader(false);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];

          if (!image.uri || !image.type) {
            Alert.alert('Error', 'Invalid file. Please select another image.');
            setLoader(false);
            return;
          }

          const formData = new FormData();
          formData.append('delivered_item_image', {
            uri: image.uri,
            type: image.type, // MIME type (e.g., "image/jpeg")
            name: image.fileName || `photo_${Date.now()}.jpg`,
          });

          try {
            // const uploadResponse = await axios.post(
            //   `${API_BASE_URL}/registration/premium-driver-photo-upload-api.php`,
            //   formData,
            //   {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //       Authorization: `Bearer ${jwtToken}`,
            //     },
            //   },
            // );

            const res = await UPLOAD_PIC_PREMIUM_DRIVER(formData);

            // const res = uploadResponse?.data;
            if (res?.status_code == 200) {
              Alert.alert('Success', res?.session_msg, [
                {
                  text: 'OK',
                  onPress: () => getAllPremiumRegistrationData(),
                },
              ]);
            }
          } catch (error) {
            // if (error.response) {
            //   console.log('Server Error:', error.response.data);
            //   if (
            //     error.response.status === 401 ||
            //     error.response.status === 400
            //   ) {
            //     if (
            //       error.response?.data?.message === 'Token has expired' &&
            //       !error.config._retry
            //     ) {
            //       error.config._retry = true;
            //       if (refreshToken) {
            //         try {
            //           const appVersion = DeviceInfo.getVersion();
            //           const refreshResponse = await axios.post(
            //             `${API_BASE_URL}/login/refresh_token.php`,
            //             {refresh_token: refreshToken, app_version: appVersion},
            //           );
            //           if (refreshResponse.data?.jwt) {
            //             dispatch(
            //               setUserAuthStates({
            //                 key: 'jwt',
            //                 value: refreshResponse.data.jwt,
            //               }),
            //             );
            //             dispatch(
            //               setUserAuthStates({
            //                 key: 'userProfile',
            //                 value: jwtDecode(refreshResponse.data.jwt),
            //               }),
            //             );
            //             return openGallery();
            //           }
            //         } catch (refreshError) {
            //           console.error('Error Refreshing Token:', refreshError);
            //           Alert.alert('Session Expired', 'Please log in again.');
            //         }
            //       }
            //     }
            //   } else {
            //     Alert.alert('Upload Failed', 'Server error. Please try again.');
            //   }
            // } else if (error.request) {
            //   console.log('No response from server:', error.request);
            //   Alert.alert(
            //     'Network Error',
            //     'No response from server. Check your connection.',
            //   );
            // } else {
            //   console.log('Error setting up request:', error.message);
            //   Alert.alert(
            //     'Upload Error',
            //     'Something went wrong. Please try again.',
            //   );
            // }
          } finally {
            setLoader(false);
          }
        } else {
          Alert.alert('Error', 'No image selected. Please try again.');
          setLoader(false);
        }
      });
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${processvalue.value}%`,
  }));
  return (
    <>
      <Header
        backButton={true}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      />
      <SafeAreaView style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
              Registration process
            </Text>
            <Text style={{color: 'black', fontSize: 14}}>
              Follow the steps to complete your registration
            </Text>
          </View>
          <View
            style={{
              height: 17,
              borderRadius: 50,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'gray',
              marginTop: 15,
            }}>
            <Animated.View
              style={[
                {
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  backgroundColor: 'green',
                },
                animatedStyle,
              ]}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{color: AppColors.black, fontWeight: 'bold'}}>
              Step {data?.current_step_point} of 5 completed
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 1: Purchase premium uniform
            </Text>
            <Text style={styles.boxcaption}>
              You need to purchase the premium uniform package to proceed{' '}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {data?.step_1 == 'Completed' ? (
                <View
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: 'green',
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>Completed</Text>
                </View>
              ) : (
                <View style={styles.boxbtn}>
                  <Text style={styles.boxbtnText}>Pending</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 2: Interview via On-call or Video Call
            </Text>
            <Text style={styles.boxcaption}>
              After purchasing the uniform, an interview will be conducted. If
              successful, your uniform will be ordered and sent to your address.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {data?.step_2 == 'Completed' ? (
                <View
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: 'green',
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>Completed</Text>
                </View>
              ) : (
                <View style={styles.boxbtn}>
                  <Text style={styles.boxbtnText}>Pending</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 3: Uniform Fabric Received
            </Text>
            <Text style={styles.boxcaption}>
              Once you receive the uniform, get it tailored and take a full
              photo of yourself wearing it. Upload the photo to continue.{' '}
            </Text>
            <View
              style={{
                height: 220,
                flexDirection: 'row',
                marginTop: 10,
                gap: 5,
              }}>
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMethod="resize"
                  source={PremiumDriverImage1}
                />
              </View>
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMethod="resize"
                  source={PremiumDriverImage2}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>
              {data?.step_3 == 'Completed' ? (
                <View
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: 'green',
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>Completed</Text>
                </View>
              ) : (
                <View style={styles.boxbtn}>
                  <Text style={styles.boxbtnText}>Pending</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>Step 4: Upload Photo</Text>
            <Text style={styles.boxcaption}>
              Upload the photo of yourself in the tailored uniform. Your premium
              service account will then be activated.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {data?.step_4 == 'Completed' ? (
                <View
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: 'green',
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>Completed</Text>
                </View>
              ) : data?.step_4 == 'Upload' ? (
                <TouchableOpacity
                  // onPress={()=>Alert.alert("hello")}
                  onPress={openGallery}
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: AppColors.mainColor,
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>+Upload</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.boxbtn}>
                  <Text style={styles.boxbtnText}>Pending</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>
              Step 5: Activate Premium Service Account
            </Text>
            <Text style={styles.boxcaption}>
              Once your photo is approved, your premium service account will be
              activated.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {data?.step_5 == 'Completed' ? (
                <View
                  style={[
                    styles.boxbtn,
                    {
                      backgroundColor: 'green',
                    },
                  ]}>
                  <Text style={styles.boxbtnText}>Completed</Text>
                </View>
              ) : (
                <View style={styles.boxbtn}>
                  <Text style={styles.boxbtnText}>Pending</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: AppColors.white,
    elevation: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  boxHeading: {color: 'black', fontWeight: 'bold', fontSize: 22},
  boxcaption: {fontSize: 14, color: AppColors.black, marginTop: 5},
  boxbtn: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  boxbtnText: {color: AppColors.white, fontSize: 14},
});
export default PremiumDriverRegistrationProcess;
