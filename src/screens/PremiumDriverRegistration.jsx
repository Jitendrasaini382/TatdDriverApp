import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {PremiumDriverImage, Triangle_Icon} from '../assets/images';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useRoute} from '@react-navigation/native';
import {PREMIUM_DRIVER_PAYMENT_CREATE_ORDER_ID} from '../apis/Apis';

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
          textAlignVertical="top"
          //   multiline={true}
          numberOfLines={4}
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
const PremiumDriverRegistration = ({navigation}) => {
  const route = useRoute();

  const {data} = route?.params || {};

  if (!data) {
    return null;
  }
  const amount = route?.params?.data?.premium_registration_amount || '';

  const [formData, setFormData] = useState({
    driverName: data?.driver_name,
    driverNumber: data?.driver_mobile_number,
    address: data?.permanent_address,
    pincode: data?.pin_code,
    city: data?.driver_city,
    zone: data?.driver_zone,
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error when user starts typing
    setErrors(prev => ({
      ...prev,
      [field]: '',
    }));
  };

  // Validate the form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = '📍 Address is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = '📌 Pincode is required';
    }
    if (!formData.zone.trim()) {
      newErrors.zone = '🗺️ Zone is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = '🏙️ City is required';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData) {
      console.error('❌ Error: formData is undefined!');
      return;
    }

    if (!validateForm()) {
      console.warn('⚠️ Form validation failed. Please fix errors.');
      return;
    }

    setLoader(true);

    try {
      const response = await PREMIUM_DRIVER_PAYMENT_CREATE_ORDER_ID({
        action: 'premium-driver-create-orderid',
        address: formData.address,
        pincode: formData.pincode,
        zone: formData.zone,
        city: formData.city,
        amount: amount,
      });

      console.log(response, 'responseresponseresponseresponse');

      if (response?.status_code == 200) {
        if (response?.message == 'Success' && response?.razorpay_order_id) {
          navigation.navigate('RazorPayPaymentScreen', {
            pageType: response?.page_type,
            description: response?.description,
            amount: response?.amount,
            orderId: response?.razorpay_order_id,
          });
        }
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header backButton={true} />
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{paddingBottom: 14}}>
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
              <Text style={styles.mainHeading}>Premium Drivers</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                height: 300,
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 0,
                  overflow: 'hidden',
                  borderRadius: 10,
                }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{width: '100%', aspectRatio: 1, height: '100%'}}
                  source={PremiumDriverImage}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 15, marginTop: 20}}>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={formData.driverName}
                  onChangeText={e => handleInputChange('driverName', e)}
                  placeholder="Driver Name"
                  keyboardType="numeric"
                  iconName={
                    <Icon name="user" size={15} color={AppColors.greyColor} />
                  }
                  error={errors.driverName}
                />
              </View>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={formData.driverNumber}
                  onChangeText={e => handleInputChange('driverName', e)}
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
              <CustomTextInput
                value={formData.address}
                onChangeText={e => handleInputChange('address', e)}
                placeholder="Delivery Address"
                keyboardType="numeric"
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
            <View style={{marginTop: 20}}>
              <CustomTextInput
                value={formData.pincode}
                onChangeText={e => handleInputChange('pincode', e)}
                placeholder="Pincode"
                keyboardType="numeric"
                maxLength={10}
                iconName={
                  <Icon name="calendar" size={15} color={AppColors.greyColor} />
                }
                error={errors.pincode}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 15, marginTop: 20}}>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={formData.city}
                  onChangeText={e => handleInputChange('city', e)}
                  placeholder="City"
                  // keyboardType="numeric"
                  // maxLength={10}
                  iconName={
                    <Icon
                      name="envelope"
                      size={15}
                      color={AppColors.greyColor}
                    />
                  }
                  error={errors.city}
                />
              </View>
              <View style={{flex: 1}}>
                <CustomTextInput
                  value={formData.zone}
                  onChangeText={e => handleInputChange('zone', e)}
                  placeholder="Zone"
                  // keyboardType="numeric"
                  // maxLength={10}
                  iconName={
                    <Icon
                      name="envelope"
                      size={15}
                      color={AppColors.greyColor}
                    />
                  }
                  error={errors.zone}
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: AppColors.mainColor,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: AppColors.white,
                    fontWeight: 'bold',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
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
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
    // fontFamily: 'Roboto-Black',
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
    borderColor: AppColors.greyColor,
    height: 40,
    padding: moderateScale(10),
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: AppColors.greyColor,
    borderRadius: 0,
    height: 40,
  },
  iconView: {
    marginRight: 10,
    // height:40
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: AppColors.black,
    borderColor: AppColors.borderColor,
    borderWidth: 1,
    paddingRight: 5
  },
  inputFocused: {
    borderColor: 'skyblue',
    fontWeight: 'bold',
    borderWidth: 1.4,
  },
});
export default PremiumDriverRegistration;
