import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {Triangle_Icon} from '../assets/images';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import {DRIVER_REFRENCE_SEND_OTP} from '../apis/Apis';

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

const AddNewVerifier = ({navigation}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [formData, setFormData] = useState({
    driverName: '',
    driverNumber: '',
    relation: '',
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [relationModalVisible, setRelationModalVisible] = useState(false);

  const relationList = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Uncle',
    'Aunty',
    'Friend',
    'Wife',
    'Son',
    'Daughter',
  ];

  const handleInputChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const handleSubmit = async () => {
    let tempErrors = {};

    const trimmedName = formData.driverName.trim();
    const trimmedNumber = formData.driverNumber.trim();

    const updatedFormData = {
      ...formData,
      driverName: trimmedName,
      driverNumber: trimmedNumber,
    };
    setFormData(updatedFormData);

    // Validation
    if (!trimmedName) tempErrors.driverName = 'Enter driver name';
    if (!trimmedNumber) tempErrors.driverNumber = 'Enter number';
    if (trimmedNumber.length !== 10)
      tempErrors.driverNumber = 'Enter Valid number';
    if (!updatedFormData.relation)
      tempErrors.relation = 'Please select relation';

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      console.log('Form Submitted:', updatedFormData);

      setLoader(true);
      try {
        const response = await DRIVER_REFRENCE_SEND_OTP({
          action: 'add_reference_verification',
          verifier_name: updatedFormData?.driverName,
          verifier_number: updatedFormData?.driverNumber,
          relationship: updatedFormData?.relation,
          current_language: languageSwitch,
        });

        console.log(response, 'responseresponse add new verifier');

        if (
          response?.status_code == 200 &&
          response?.success_message == 'error'
        ) {
          Alert.alert('', response?.message);
        } else if (
          response?.status_code == 200 &&
          response?.success_message == 'success'
        ) {
          navigation.navigate('CompleteVerification');
        } else {
          navigation.navigate('TrustedDriver');
        }
      } catch (error) {
        // console.log(error, 'API Error');
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
     <KeyboardAvoidingView style={{flex:1}}  behavior='padding'>
     <View style={{flex: 1, paddingHorizontal: 10}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{paddingBottom: 14}}>
          <View style={styles.mainTopView}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.mainTopContent}>
                <Text style={styles.trustedText}>
                  Partner Reference Verification
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
            <Text style={styles.mainHeading}>
              {languageSwitch == 'hindi'
                ? 'अपने जानकार का नाम और नंबर डाले'
                : 'Enter Your Reference Name And Number'}
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 15, marginTop: 20}}>
            <View style={{flex: 1}}>
              <CustomTextInput
                value={formData.driverName}
                onChangeText={e => handleInputChange('driverName', e)}
                placeholder="Name"
                keyboardType="default"
                iconName={
                  <Icon name="user" size={15} color={AppColors.greyColor} />
                }
                error={errors.driverName}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomTextInput
                value={formData.driverNumber}
                onChangeText={e => handleInputChange('driverNumber', e.trim())}
                placeholder="Number"
                keyboardType="numeric"
                maxLength={10}
                iconName={
                  <Icon name="phone" size={15} color={AppColors.greyColor} />
                }
                error={errors.driverNumber}
              />
            </View>
          </View>

          {/* Relation Dropdown */}
          <View style={{marginTop: 20}}>
            <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '600'}}>
              Relation
            </Text>
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: AppColors.borderColor,
                borderRadius: 4,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
              onPress={() => setRelationModalVisible(true)}>
              <Text
                style={{
                  color: formData.relation ? AppColors.black : 'gray',
                  fontSize: 14,
                }}>
                {formData?.relation ? formData?.relation : 'Select Relation'}
              </Text>
              <Icon name="angle-down" size={18} color={AppColors.greyColor} />
            </Pressable>
            {errors.relation ? (
              <Text style={{color: 'red', fontSize: 12, marginTop: 3}}>
                {errors.relation}
              </Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              disabled={loader}
              onPress={handleSubmit}
              style={{
                backgroundColor: loader
                  ? AppColors.greyColor
                  : AppColors.mainColor,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: AppColors.white,
                  fontWeight: 'bold',
                }}>
                {loader
                  ? 'Sending OTP...'
                  : languageSwitch == 'hindi'
                  ? 'OTP भेजें?'
                  : 'Send OTP?'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
     </KeyboardAvoidingView>

      {/* Relation Modal   */}

      {/* in center */}
      <Modal
        transparent
        visible={relationModalVisible}
        animationType="fade"
        onRequestClose={() => setRelationModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setRelationModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: AppColors.white,
              borderRadius: 8,
              paddingVertical: 10,
            }}>
            {relationList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFormData({...formData, relation: item});
                  setRelationModalVisible(false);
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  //   borderBottomWidth: index !== relationList.length - 1 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderColor: '#ddd',
                }}>
                <Text style={{fontSize: 16, color: AppColors.black}}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setRelationModalVisible(false)}
              style={{
                // paddingVertical: 10,
                marginVertical: 10,
                alignItems: 'center',
                backgroundColor: 'red',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  mainHeading: {
    fontSize: 26,
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: AppColors.greyColor,
    borderRadius: 0,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: AppColors.black,
    borderColor: AppColors.borderColor,
    borderWidth: 1,
    paddingRight: 5,
  },
  inputFocused: {
    borderColor: 'skyblue',
    fontWeight: 'bold',
    borderWidth: 1.4,
  },
  iconViewinput: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: 40,
    padding: moderateScale(10),
  },
});

export default AddNewVerifier;
