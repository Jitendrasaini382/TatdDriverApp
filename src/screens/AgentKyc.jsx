import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  Modal,
} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AppColors} from '../assets/Colors';
import {
  GET_AGENT_KYC_INFO,
  GET_AGENT_KYC_UPDATE_DETAILS,
  SUBMIT_CONFIRM_AGENT_KYC_DETAILS,
} from '../apis/Apis';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';

const AgentKyc = ({navigation}) => {
  const route = useRoute();
  const redirect = route?.params?.redirect;
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [videoId, setVideoId] = useState('');
  const [agentKycInfo, setAgentKycInfo] = useState({
    beneficiaryName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderSubmit, setLoaderSubmit] = useState(false);
  const [confirmLoaderSubmit, setConfirmLoaderSubmit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [shortForm, setShortForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalResponse, setModalResponse] = useState({});

  useEffect(() => {
    getAllAgentKycInfo();
  }, []);

  const submitConfirmaAgentKycDetails = async key => {
    if (key == 'submit') {
      setConfirmLoaderSubmit(true);
    } else {
      setConfirmLoaderSubmit(false);
    }
    try {
      const res = await SUBMIT_CONFIRM_AGENT_KYC_DETAILS({
        confirm_action: key,
        current_language: languageSwitch,
      });
      if (res?.status_code == 200 && res?.message == 'success') {
        navigation.navigate('TrustedDriver');
        setShowModal(false);
      } else {
        setShowModal(false);
        Alert.alert(
          '',
          res?.message_alert,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('TrustedDriver'),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
    } finally {
      setConfirmLoaderSubmit(false);
    }
  };

  const getAllAgentKycInfo = async () => {
    setLoader(true);
    try {
      const response = await GET_AGENT_KYC_INFO();

      if (redirect !== 'Trusted') {
        setAgentKycInfo({
          beneficiaryName: response?.response?.beneficiary_name || '',
          accountNumber: response?.response?.account_number || '',
          confirmAccountNumber: response?.response?.account_number || '',
          bankName: response?.response?.bank_name || '',
          ifscCode: response?.response?.ifsc_code || '',
        });

        if (response?.response?.account_number) {
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      } else {
        setIsEditing(true);
      }

      setVideoId(response?.response?.kyc_awareness_video || '');

      setShortForm(response?.response?.chekDynamicFunctionKey == '1');

      setErrors({});
    } catch (error) {
      setIsEditing(true);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const handleSubmit = async data => {
    setLoaderSubmit(true);

    try {
      if (shortForm) {
        const response = await GET_AGENT_KYC_UPDATE_DETAILS(data);

        if (
          response?.status_code == 200 &&
          response?.message === 'message_alert'
        ) {
          Alert.alert('', response?.success_message, [{text: 'OK'}], {
            cancelable: false,
          });
          return;
        }

        if (response?.status_code == 200 && response?.message === 'error') {
          Alert.alert('', response?.error_message, [{text: 'OK'}], {
            cancelable: false,
          });
          return;
        }

        if (
          response?.status_code == 200 &&
          response?.message === 'nameVerified'
        ) {
          navigation.navigate('TrustedDriver');
          return;
        }

        if (response?.status_code == 200 && response?.message === 'success') {
          setModalResponse({
            beneficiary_name: response?.beneficiary_name,
            account_number: response?.account_number,
            bank_name: response?.bank_name,
            ifsc: response?.ifsc,
          });
          setShowModal(true);
          return;
        }
      } else {
        const response = await GET_AGENT_KYC_UPDATE_DETAILS(data);
        if (response?.status_code == 200 && response?.message === 'success') {
          navigation.navigate('TrustedDriver');
          return;
        }
      }
    } catch (error) {
      console.error('[AgentKyc:handleSubmit] Network error:', error);
    } finally {
      setLoaderSubmit(false);
    }
  };

  const handleButtonPress = () => {
    if (loader) {
      return;
    }
    Keyboard.dismiss();
    if (!isEditing) {
      setAgentKycInfo({
        beneficiaryName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        bankName: '',
        ifscCode: '',
      });
      setErrors({});
      setIsEditing(true);
    } else {
      const validationErrors = validateFields();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      handleSubmit({
        beneficiary_name: agentKycInfo?.beneficiaryName,
        account_number: agentKycInfo?.accountNumber,
        ifsc_code: agentKycInfo?.ifscCode,
        bank_name: agentKycInfo?.bankName,
        current_language: languageSwitch,
      });
    }
  };

  const handleInputChange = (key, value) => {
    if (key === 'ifscCode') {
      setAgentKycInfo(prevState => ({
        ...prevState,
        [key]: value,
      }));
    } else if (key === 'beneficiaryName') {
      setAgentKycInfo(prevState => ({
        ...prevState,
        [key]: value,
      }));
    } else {
      setAgentKycInfo(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  const validateFields = () => {
    let newErrors = {};
    const {
      beneficiaryName,
      accountNumber,
      confirmAccountNumber,
      bankName,
      ifscCode,
    } = agentKycInfo;

    if (shortForm) {
      if (!beneficiaryName.trim()) {
        newErrors.beneficiaryName = 'Beneficiary Name is required';
      } else if (beneficiaryName.length <= 4) {
        newErrors.beneficiaryName = 'Beneficiary Name must be complete';
      }

      if (!accountNumber.trim()) {
        newErrors.accountNumber = 'Account Number is required';
      } else if (accountNumber.length <= 4) {
        newErrors.accountNumber = 'Account Number must be complete';
      } else if (!/^\d+$/.test(accountNumber)) {
        newErrors.accountNumber =
          'Account Number must contain digits only, no spaces or letters';
      }

      if (!confirmAccountNumber.trim()) {
        newErrors.confirmAccountNumber = 'Reconfirm Account Number is required';
      } else if (accountNumber !== confirmAccountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match';
      } else if (!/^\d+$/.test(confirmAccountNumber)) {
        newErrors.confirmAccountNumber =
          'Account Number must contain digits only, no spaces or letters';
      }

      if (!ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC Code is required';
      } else if (!/^[A-Z0-9]{11}$/.test(ifscCode)) {
        newErrors.ifscCode =
          'IFSC Code must be 11 characters, no special characters';
      } else if (/\s/.test(ifscCode)) {
        newErrors.ifscCode = 'IFSC Code must not contain spaces';
      }
    } else {
      if (!beneficiaryName.trim()) {
        newErrors.beneficiaryName = 'Beneficiary Name is required';
      } else if (beneficiaryName.length <= 4) {
        newErrors.beneficiaryName = 'Beneficiary Name must be complete';
      }

      if (!accountNumber.trim()) {
        newErrors.accountNumber = 'Account Number is required';
      } else if (accountNumber.length <= 4) {
        newErrors.accountNumber = 'Account Number must be complete';
      } else if (!/^\d+$/.test(accountNumber)) {
        newErrors.accountNumber =
          'Account Number must contain digits only, no spaces or letters';
      }

      if (!confirmAccountNumber.trim()) {
        newErrors.confirmAccountNumber = 'Reconfirm Account Number is required';
      } else if (accountNumber !== confirmAccountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match';
      } else if (!/^\d+$/.test(confirmAccountNumber)) {
        newErrors.confirmAccountNumber =
          'Account Number must contain digits only, no spaces or letters';
      }

      if (!bankName.trim()) {
        newErrors.bankName = 'Bank Name is required';
      }

      if (!ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC Code is required';
      } else if (!/^[A-Z0-9]{11}$/.test(ifscCode)) {
        newErrors.ifscCode =
          'IFSC Code must be 11 characters, no special characters';
      } else if (/\s/.test(ifscCode)) {
        newErrors.ifscCode = 'IFSC Code must not contain spaces';
      }
    }

    return newErrors;
  };

  return (
    <SafeAreaView style={{backgroundColor: AppColors.white, flex: 1}}>
      <Header backButton />
      {loader ? (
        <ActivityIndicator
          size="large"
          color={AppColors.mainColor}
          style={{flex: 1}}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getAllAgentKycInfo}
            />
          }
          keyboardShouldPersistTaps="always"
          style={styles.container}>
          <Text style={styles.title}>
            {redirect !== 'Trusted' ? 'Update' : 'Add'} Bank Details
          </Text>
          <View style={styles.card}>
            <DetailInput
              label="Beneficiary Name"
              value={agentKycInfo?.beneficiaryName}
              onChangeText={text => handleInputChange('beneficiaryName', text)}
              onEndEditing={() =>
                handleInputChange(
                  'beneficiaryName',
                  agentKycInfo.beneficiaryName.toUpperCase(),
                )
              }
              error={errors.beneficiaryName}
              isEditing={isEditing}
            />

            <DetailInput
              label="Beneficiary Account Number"
              value={agentKycInfo?.accountNumber}
              onChangeText={text => handleInputChange('accountNumber', text)}
              keyboardType="numeric"
              secureTextEntry={true}
              error={errors.accountNumber}
              isEditing={isEditing}
            />
            <DetailInput
              label="Reconfirm Account Number"
              value={agentKycInfo?.confirmAccountNumber}
              onChangeText={text =>
                handleInputChange('confirmAccountNumber', text)
              }
              keyboardType="numeric"
              error={errors.confirmAccountNumber}
              isEditing={isEditing}
            />
            {!shortForm && (
              <DetailInput
                label="Bank Name"
                value={agentKycInfo?.bankName}
                onChangeText={text => handleInputChange('bankName', text)}
                error={errors.bankName}
                isEditing={isEditing}
              />
            )}
            <DetailInput
              label="IFSC Code"
              onEndEditing={() =>
                handleInputChange(
                  'ifscCode',
                  agentKycInfo.ifscCode.toUpperCase(),
                )
              }
              value={agentKycInfo?.ifscCode}
              onChangeText={text => handleInputChange('ifscCode', text)}
              error={errors.ifscCode}
              maxLength={11}
              isEditing={isEditing}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: loaderSubmit
                    ? AppColors.greyColor
                    : AppColors.mainColor,
                },
              ]}
              disabled={loaderSubmit}
              onPress={handleButtonPress}>
              {loaderSubmit ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={[styles.buttonText, {marginLeft: 8}]}>
                    Updating...
                  </Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>
                  {isEditing ? 'Add' : 'Edit'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {videoId && (
            <View style={{marginTop: 20, padding: 12}}>
              <YoutubePlayer height={200} videoId={videoId} />
            </View>
          )}
        </ScrollView>
      )}

      {showModal && (
        <Modal
          animationType="fade"
          transparent
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '85%',
                backgroundColor: AppColors.white,
                borderRadius: 16,
                padding: 20,
                elevation: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 15,
                  textAlign: 'center',
                  color: AppColors.black,
                }}>
                Confirm Your Bank Details ?
              </Text>

              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row', marginVertical: 4}}>
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: '600',
                      color: AppColors.black,
                    }}>
                    Name:
                  </Text>
                  <Text style={{flex: 2, color: AppColors.black}}>
                    {modalResponse?.beneficiary_name || '—'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 4}}>
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: '600',
                      color: AppColors.black,
                    }}>
                    Account Number:
                  </Text>
                  <Text style={{flex: 2, color: AppColors.black}}>
                    {modalResponse?.account_number || '—'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 4}}>
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: '600',
                      color: AppColors.black,
                    }}>
                    Bank Name:
                  </Text>
                  <Text style={{flex: 2, color: AppColors.black}}>
                    {modalResponse?.bank_name || '—'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 4}}>
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: '600',
                      color: AppColors.black,
                    }}>
                    IFSC Code:
                  </Text>
                  <Text style={{flex: 2, color: AppColors.black}}>
                    {modalResponse?.ifsc || '—'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    marginLeft: 10,
                    backgroundColor: AppColors.gray,
                  }}
                  onPress={() => submitConfirmaAgentKycDetails('cancel')}>
                  <Text style={{color: AppColors.black, fontWeight: '600'}}>
                    Edit Details
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    marginLeft: 10,
                    flexDirection: 'row', // This will lay children side by side
                    alignItems: 'center', // Center them vertically
                    backgroundColor: confirmLoaderSubmit
                      ? AppColors.greyColor
                      : AppColors.mainColor,
                  }}
                  onPress={() => submitConfirmaAgentKycDetails('submit')}
                  disabled={confirmLoaderSubmit} // Optional: disable button while updating
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {confirmLoaderSubmit && (
                      <ActivityIndicator
                        size="small"
                        color={AppColors.white}
                        style={{marginRight: 8}} // spacing between spinner and text
                      />
                    )}
                    <Text style={{color: AppColors.white, fontWeight: '600'}}>
                      {confirmLoaderSubmit ? 'Updating...' : 'Submit'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const DetailInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
  onEndEditing,
  isEditing,
  maxLength,
  secureTextEntry = false,
}) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.errorInput]}
      value={value}
      editable={isEditing}
      onEndEditing={onEndEditing} // attach it here
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      // placeholder={`Enter ${label}`}
      placeholderTextColor={AppColors.greyColor}
      autoCapitalize="characters"
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {padding: 16, flexGrow: 1},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c6ba0',
    marginBottom: 10,
    textAlign: 'right',
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 0.5,
    borderColor: AppColors.mainColor,
  },
  detailItem: {marginBottom: 16},
  label: {fontSize: 14, color: '#888', marginBottom: 4},
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  errorInput: {borderBottomColor: 'red'},
  errorText: {fontSize: 12, color: 'red', marginTop: 4},
  button: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {color: AppColors.white, fontSize: 16, fontWeight: 'bold'},
});

export default AgentKyc;
