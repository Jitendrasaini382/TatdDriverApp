import {
  Alert,
  Button,
  Dimensions,
  Image,
  Linking,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppLogo, Triangle_Icon} from '../../assets/images';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../components/Header';
import {
  requestLocationPermission,
  requestNotificationPermission,
} from '../../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';

import IntentLauncher from '@yz1311/react-native-intent-launcher';
import axios from 'axios';
import {
  APPLY_FOR_DRIVER_JOBS,
  CREATE_ORDER_ID_APPLY_FOR_DRIVER_JOBS,
  DRIVER_LOGIN,
  GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS,
  GET_CITY_ZONE_BY_PINCODE,
  GET_FCM_TOKEN_APPLY_FOR_DRIVER_JOBS,
  SAVE_DEVICE_INFO_APPLY_FOR_DRIVER_JOBS,
  UPDATE_POPUP_APPLY_FOR_DRIVER_JOBS,
} from '../../apis/Apis';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetUserAuthState,
  setUserAuthStates,
} from '../../redux/slices/userAuthSlice';
import {Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;
const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  maxLength,
  iconName,
  error,
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        {iconName && <View style={styles.iconViewinput}>{iconName}</View>}
        <TextInput
          style={[styles.input, isFocused ? styles.inputFocused : null]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={true}
          editable={editable}
          placeholderTextColor={AppColors.black}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error ? (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginTop: 3,
            marginLeft: 5,
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const CustomAddressInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  maxLength,
  iconName,
  error,
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderColor: AppColors.black,
          minHeight: 40,
        }}>
        {iconName && (
          <View
            style={{
              minHeight: inputHeight,
              borderWidth: 1,
              borderColor: AppColors.gray,
              flexDirection: 'row',
              padding: moderateScale(10),
              alignSelf: 'center',
              justifyContent: 'center', // vertical center
              alignItems: 'center', // horizontal center
            }}>
            {iconName}
          </View>
        )}

        <TextInput
          style={{
            flex: 1,
            fontSize: 14,
            color: AppColors.black,
            borderRightWidth: 1,
            borderRightColor: AppColors.gray,
            borderBottomWidth: 1,
            borderBottomColor: AppColors.gray,
            borderTopWidth: 1,
            borderTopColor: AppColors.gray,
            paddingHorizontal: 5,
            paddingVertical: 10,
            minHeight: 40,
            height: Math.max(40, inputHeight),
            ...(isFocused && {
              borderColor: AppColors.mainColor,
              borderWidth: 1.4,
              fontWeight: 'bold',
            }),
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline
          editable={editable}
          placeholderTextColor={AppColors.black}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height); // +10 for padding
          }}
        />
      </View>
      {error ? (
        <Text style={{color: 'red', fontSize: 12, marginTop: 3, marginLeft: 5}}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const ApplyForDriverJob = ({navigation}) => {
  const [pincode, setPincode] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [zone, setZone] = useState('');
  const [serviceableArea, setServiceableArea] = useState(false);
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [visible, setVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const [upadatePopupData, setUpdatePopupData] = useState({});
  const [allData, setAllData] = useState({});
  const [orderIdData, setOrderIdData] = useState();
  const [errors, setErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isFcmSent = useSelector(e => e?.userAuth?.isFcmSent);
  const isDeviceInfo = useSelector(e => e?.userAuth?.isDeviceInfo);
  const driverMobileNumber = useSelector(e => e?.userAuth?.driverNumber);
  const map_key = 'AIzaSyAaYD9dofRG4HJ_KhOETyfFjFJs4Ni8uf4';
  const number = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );

  const handleRegisterPress = async () => {
    if (!pincode) {
      await getLocation(); // Try to get location and pincode first
      // Alert.alert('', 'Fetching location. Please try again in a few seconds.');
      return;
    }

    if (!serviceableArea) {
      Alert.alert('', 'Service not available in your area.');
      return;
    }

    const newErrors = {};
    if (!driverName.trim()) {
      newErrors.driverName = 'Driver Name required';
    }

    if (!address.trim()) {
      newErrors.address = 'Current Address required';
    } else if (address.trim().length < 20) {
      newErrors.address = 'Full Current Address Required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoader(true);

    try {
      const res = await APPLY_FOR_DRIVER_JOBS({
        action: 'apply_for_driver_job',
        name: driverName,
        city: city,
        zone: zone,
        pincode: pincode,
        current_address: address,
      });
      console.log(res, 'APPLY_FOR_DRIVER_JOBS response');
      setPopupData(res);
      setVisible(true);
    } catch (error) {
      console.error('Driver Job Apply Error:', error);
      // Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    sendOtp();
  });

  const sendOtp = async () => {
    try {
      const response = await DRIVER_LOGIN({
        mobile: driverMobileNumber || number,
        user_type: 'Driver',
        app_version: DeviceInfo.getVersion(),
        app_type: Platform.OS,
      });
      if (response?.status_code == '200' && response?.msg_type == 'error') {
        dispatch(resetUserAuthState());
      } else if (
        response?.status_code == '200' &&
        response?.message == 'OTP sent successfully'
      ) {
        dispatch(
          setUserAuthStates({
            key: 'isRegistered',
            value: response?.isRegistered === '1',
          }),
        );
      }
    } catch (err) {
      dispatch(resetUserAuthState());
    } finally {
    }
  };

  const getAddressFromCoords = async (latitude, longitude, retry = true) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${map_key}`,
      );

      if (response?.data?.results?.length > 0) {
        const address = response.data.results[0].formatted_address;
        const components = response.data.results[0].address_components;

        const pincodeObj = components.find(c =>
          c.types.includes('postal_code'),
        );
        const cityObj = components.find(c => c.types.includes('locality'));

        const pincode = pincodeObj ? pincodeObj.long_name : '';
        const city = cityObj ? cityObj.long_name : '';

        if (!pincode && retry) {
          // Retry only once
          console.warn('Pincode not found. Retrying once...');
          return await getAddressFromCoords(latitude, longitude, false);
        }

        if (pincode) {
          await getCityZoneByPincode(pincode);
          setPincode(pincode);
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        getAddressFromCoords(latitude, longitude);
      },
      error => {
        console.error('Location error:', error);
        if (error.code === 2) {
          Alert.alert(
            'Location Service Disabled',
            'Enable location services to proceed.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: () => {
                  IntentLauncher.startActivity({
                    action: 'android.settings.LOCATION_SOURCE_SETTINGS',
                  });
                },
              },
            ],
          );
        }
      },
      {maximumAge: 0},
    );
  };

  const getCityZoneByPincode = async pincode => {
    try {
      const res = await GET_CITY_ZONE_BY_PINCODE({pincode});
      if (res?.status_code == 200) {
        if (res?.serviceable_area == 0) {
          setServiceableArea(false);
          setZone('');
          setCity('');
          Alert.alert('', 'Service not available in your area.');
          return;
        } else {
          setServiceableArea(true);
          setZone(res?.serviceable_zone);
          setCity(res?.serviceable_city);
          setDriverNumber(res?.driver_mobile_number);
        }
      } else {
        setServiceableArea(false);
      }
    } catch (err) {
      console.error('Zone API error:', err);
      setServiceableArea(false);
    }
  };

  const getFcmToken = async () => {
    try {
      await requestNotificationPermission();
      let token = await messaging().getToken();
      if (token) {
        await saveFcmToken(token);
      }
    } catch (error) {
      console.error('FCM token error:', error);
    }
  };

  const saveFcmToken = async fcmtoken => {
    try {
      const res = await GET_FCM_TOKEN_APPLY_FOR_DRIVER_JOBS({
        fcm_token: fcmtoken,
        action: 'save_fcm',
      });
      if (res?.status_code == 200) {
        dispatch(setUserAuthStates({key: 'isFcmSent', value: true}));
      }
    } catch (error) {
      console.error('Save FCM error:', error);
    }
  };

  const fetchDeviceInfo = async () => {
    try {
      const info = {
        action: 'save_device_info',
        manufacturer: await DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
        deviceName: await DeviceInfo.getDeviceName(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        isTablet: DeviceInfo.isTablet(),
        deviceOS: Platform.OS,
      };

      if (Object.values(info).every(i => i !== null)) {
        await sendDeviceInfo(info);
      }
    } catch (error) {
      console.error('Device info error:', error);
    }
  };

  const sendDeviceInfo = async deviceInfo => {
    try {
      await SAVE_DEVICE_INFO_APPLY_FOR_DRIVER_JOBS(deviceInfo);
      dispatch(setUserAuthStates({key: 'isDeviceInfo', value: true}));
    } catch (error) {
      console.error('Send device info error:', error);
    }
  };

  const openMyUrl = url => {
    Linking.openURL(url).then(() => {});
  };

  const getUpdatePopup = async () => {
    try {
      console.log('Fetching update popup...');
      const response = await UPDATE_POPUP_APPLY_FOR_DRIVER_JOBS({
        app_type: Platform.OS,
        user_type: 'Driver',
      });

      console.log('Raw response:', response);

      if (response?.app_details) {
        const {version, force_update, app_url} = response.app_details;
        const currentVersion = DeviceInfo.getVersion();

        console.log(`Current version: ${currentVersion}`);
        console.log(`Required version: ${version}`);
        console.log(`Force update: ${force_update}`);
        console.log(`App URL: ${app_url}`);

        if (parseFloat(currentVersion) < parseFloat(version)) {
          console.log('Update available. Showing update modal...');
          setUpdateModal(true);

          if (force_update == '1' && app_url) {
            console.log('Force update required. Opening URL...');
            openMyUrl(app_url);
            setUpdateModal(false);
          }
        } else {
          console.log('App is up to date.');
        }
      } else {
        console.log('No app_details found in response.');
      }

      setUpdatePopupData(response);
    } catch (error) {
      console.error('Update popup error:', error);
    }
  };

  const getAllData = async () => {
    try {
      const response = await GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS();
      setAllData(response);
    } catch (error) {
      console.error('Send device info error:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (!pincode) {
        await getLocation();
      }
      getFcmToken();
      await getUpdatePopup();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!pincode) {
      getLocation();
    }
    getAllData();
    getUpdatePopup();
    // if (!isFcmSent)
    getFcmToken();
    // if (!isDeviceInfo)
    fetchDeviceInfo();
  }, []);

  const handlePayment = async amount => {
    console.log('handlePayment called with amount:', amount);
    if (!amount) return false;

    try {
      const res = await CREATE_ORDER_ID_APPLY_FOR_DRIVER_JOBS({
        action: 'apply-for-driver-job',
        payment_amount: amount,
      });

      console.log(res, '-=-=-=-=-=-=-');

      if (res?.status_code == 200) {
        if (res?.razor_order_id_data?.orderId) {
          navigation.navigate('RazorPayPaymentScreenDriverJob', {
            response: res?.razor_order_id_data,
          });
        }
      }
    } catch (error) {
      console.log('Error occurred in handlePayment:', error);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 14, flexGrow: 1}}>
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
              <Text style={styles.mainHeading}>Apply For Driver Jobs</Text>
            </View>
            {/* content start  */}
            {allData?.data_english && allData?.data_hindi && (
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedLanguage === 'Hindi' && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedLanguage('Hindi')}>
                  <Text
                    style={[
                      styles.text,
                      selectedLanguage === 'Hindi' && styles.selectedText,
                    ]}>
                    Hindi
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedLanguage === 'English' && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedLanguage('English')}>
                  <Text
                    style={[
                      styles.text,
                      selectedLanguage === 'English' && styles.selectedText,
                    ]}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {allData?.data_english && allData?.data_hindi && (
              <View style={styles.cardContainer}>
                <Text style={styles.cardHeading}>
                  {selectedLanguage === 'Hindi'
                    ? 'कंपनी की जानकारी'
                    : 'Company Info'}
                </Text>
                <ScrollView
                  style={styles.cardText}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}>
                  <Text style={styles.scrollableText}>
                    {selectedLanguage === 'Hindi'
                      ? allData?.data_english
                      : allData?.data_hindi}
                  </Text>
                </ScrollView>
              </View>
            )}

            <View style={{flexDirection: 'row', gap: 15, marginTop: 20}}>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={driverName}
                  onChangeText={e => {
                    setDriverName(e);
                    if (errors.driverName && e.trim()) {
                      setErrors(prev => ({...prev, driverName: null}));
                    }
                  }}
                  placeholder="Driver Name"
                  iconName={
                    <Icon name="user" size={15} color={AppColors.greyColor} />
                  }
                  error={errors.driverName}
                />
              </View>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={driverMobileNumber || driverNumber}
                  placeholder="Driver Number"
                  keyboardType="numeric"
                  editable={false}
                  maxLength={10}
                  iconName={
                    <Icon name="phone" size={15} color={AppColors.greyColor} />
                  }
                  error={errors.driverNumber}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <CustomAddressInput
                value={address}
                onChangeText={e => {
                  setAddress(e);
                  if (errors.address && e.trim()) {
                    setErrors(prev => ({...prev, address: null}));
                  }
                }}
                placeholder="Enter Current Address"
                iconName={
                  <Icon
                    name="map-marker"
                    size={15}
                    color={AppColors.greyColor}
                  />
                }
                error={errors.address}
              />
            </View>

            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  marginVertical: 30,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleRegisterPress()}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor:
                      serviceableArea || loader ? AppColors.mainColor : 'gray',
                    paddingHorizontal: 40,
                    paddingVertical: 14,
                    borderRadius: 25,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: AppColors.white,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Register Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={visible} animationType="slide" transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    margin: 5,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding: 16,
                    maxHeight: '95%',
                    width: '99%',
                  }}>
                  {/* Close Icon - Fixed Top Right */}
                  <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 10,
                      backgroundColor: AppColors.mainColor,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: AppColors.white,
                        alignSelf: 'center',
                      }}>
                      ✕
                    </Text>
                  </TouchableOpacity>

                  <ScrollView
                    contentContainerStyle={{paddingBottom: 24}}
                    showsVerticalScrollIndicator={false}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginVertical: 8,
                        color: AppColors.black,
                      }}>
                      Your Application ID :
                      <Text style={{color: 'green'}}>
                        {''} {popupData?.application_id}
                      </Text>
                    </Text>
                    <Text style={styles.text}>{popupData?.popup_data}</Text>

                    <TouchableOpacity
                      onPress={() => {
                        handlePayment(popupData?.price);
                      }}
                      style={{
                        marginTop: 20,
                        backgroundColor: AppColors.mainColor,
                        paddingVertical: 12,
                        borderRadius: 6,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: AppColors.white,
                          fontWeight: '600',
                          fontSize: 16,
                        }}>
                        {popupData?.price_tag}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        //  backgroundColor: AppColors.mainColor,
                        backgroundColor: AppColors.greyColor,
                        paddingVertical: 12,
                        borderRadius: 6,
                        alignItems: 'center',
                      }}
                      onPress={() => setVisible(false)}>
                      <Text
                        style={{
                          color: AppColors.white,
                          fontWeight: '600',
                          fontSize: 16,
                        }}>
                        Close
                      </Text>
                    </TouchableOpacity>

                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Proceed to Razor payment"
                        onPress={() => {
                          // Replace this with real navigation logic
                          Alert.alert(
                            'Payment',
                            `Navigate to Razor Payment Page with payment amount ₹${popupData?.price}`,
                          );
                        }}
                        style={{
                          flex: 1,
                          marginHorizontal: 5,
                          backgroundColor: AppColors.mainColor,
                          paddingVertical: 14,
                          borderRadius: 8,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: AppColors.white,
                            fontWeight: '600',
                            fontSize: 16,
                          }}>
                          {popupData?.price_tag || 'Pay Now'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Close the popup"
                        onPress={() => setVisible(false)}
                        style={{
                          flex: 1,
                          marginHorizontal: 5,
                          backgroundColor: AppColors.mainColor,
                          paddingVertical: 14,
                          borderRadius: 8,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: AppColors.white,
                            fontWeight: '600',
                            fontSize: 16,
                          }}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => setUpdateModal(false)}
              visible={updateModal}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: width * 0.85,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    padding: 15,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 15},
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 15,
                    transform: [{translateY: 20}],
                  }}>
                  <Image
                    source={AppLogo}
                    resizeMode="contain"
                    style={{height: 70, width: 70}}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 10,
                      textAlign: 'center',
                    }}>
                    New Update Available
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#555',
                      textAlign: 'center',
                      marginBottom: 30,
                    }}>
                    {upadatePopupData?.app_details?.upgrade_message}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        paddingVertical: 15,
                        borderRadius: 30,
                        backgroundColor: AppColors.mainColor,
                        elevation: 8,
                        shadowColor: AppColors.mainColor,
                        shadowOffset: {width: 0, height: 8},
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        marginBottom: 15,
                      }}
                      onPress={() => [
                        openMyUrl(upadatePopupData?.app_details?.app_url),
                        setUpdateModal(false),
                      ]}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginRight: 10,
                        }}>
                        Update Now
                      </Text>
                      <Image
                        source={AppLogo}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: '#fff',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                      }}
                      onPress={() => setUpdateModal(false)}>
                      <Text
                        style={{
                          color: AppColors.mainColor,
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '96%',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedButton: {
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.mainColor,
    marginBottom: 10,
  },
  cardText: {
    height: 200,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },

  scrollableText: {
    fontSize: 14,
    color: AppColors.black,
    marginBottom: 20,
  },

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

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  button: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedButton: {
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  mainView: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: AppColors.mainColor,
    width: '100%',
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
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    marginTop: 20,
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
  mainHeading: {
    fontSize: 28,
    // marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
  },
  mainMiddleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: verticalScale(50),
  },
  iconViewinput: {
    borderWidth: 1,
    borderColor: AppColors.gray,
    flexDirection: 'row',
    height: '100%',
    padding: moderateScale(10),
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: AppColors.black,
    borderRadius: 0,
    height: 40,
  },
  iconView: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: AppColors.black,
    borderColor: AppColors.gray,
    borderRightWidth: 1,
    borderRightColor: AppColors.gray,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray,
    borderTopWidth: 1,
    borderTopColor: AppColors.gray,
    paddingHorizontal: 5,
  },
  inputFocused: {
    borderColor: AppColors.mainColor,
    fontWeight: 'bold',
    borderWidth: 1.4,
  },

  containerPicker: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
export default ApplyForDriverJob;
