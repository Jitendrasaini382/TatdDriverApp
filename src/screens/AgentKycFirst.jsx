import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {GET_AGENT_KYC_SEND_OTP} from '../apis/Apis';
import {Keyboard} from 'react-native';
import {useRoute} from '@react-navigation/native';

const AgentKycFirst = ({navigation}) => {
  const route = useRoute();
  const [loader, setLoader] = useState(false);
  const [agentKycInfo, setAgentKycInfo] = useState({
    beneficiaryName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async data => {
    setLoader(true);
    try {
      const response = await GET_AGENT_KYC_SEND_OTP();

      if (response?.status_code == 200) {
        navigation.navigate('CheckAgentOtp', {response: response, data: data});
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const handleButtonPress = () => {
    Keyboard.dismiss();
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
    });
  };

  const validateFields = () => {
    let newErrors = {};
    if (!agentKycInfo.beneficiaryName.trim()) {
      newErrors.beneficiaryName = 'Beneficiary Name is required';
    }
    if (!agentKycInfo.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    }
    if (!agentKycInfo.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = 'Reconfirm Account Number is required';
    } else if (
      agentKycInfo.accountNumber !== agentKycInfo.confirmAccountNumber
    ) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }
    if (!agentKycInfo.bankName.trim()) {
      newErrors.bankName = 'Bank Name is required';
    }
    if (!agentKycInfo.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC Code is required';
    }

    return newErrors;
  };

  const handleInputChange = (key, value) => {
    setAgentKycInfo(prevState => ({
      ...prevState,
      [key]: value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  return (
    <SafeAreaView style={{backgroundColor: AppColors.white, flex: 1}}>
      <Header backButton={true} />

      <ScrollView keyboardShouldPersistTaps={'always'} style={styles.container}>
        <Text style={styles.title}>Bank Details</Text>
        {route?.params?.res?.message && (
          <Text style={{color: 'green', fontSize: 13, marginBottom: 5}}>
            {route?.params?.res?.message}
          </Text>
        )}

        <View style={styles.card}>
          <DetailInput
            // isEditing={isEditing}
            label="Beneficiary Name"
            value={agentKycInfo?.beneficiaryName}
            onChangeText={text => handleInputChange('beneficiaryName', text)}
            error={errors.beneficiaryName}
          />
          <DetailInput
            label="Beneficiary Account Number"
            value={agentKycInfo?.accountNumber}
            onChangeText={text => handleInputChange('accountNumber', text)}
            keyboardType="numeric"
            error={errors.accountNumber}
          />
          <DetailInput
            label="Reconfirm Account Number"
            value={agentKycInfo?.confirmAccountNumber}
            onChangeText={text =>
              handleInputChange('confirmAccountNumber', text)
            }
            keyboardType="numeric"
            error={errors.confirmAccountNumber}
          />
          <DetailInput
            label="Bank Name"
            value={agentKycInfo?.bankName}
            onChangeText={text => handleInputChange('bankName', text)}
            error={errors.bankName}
          />
          <DetailInput
            label="IFSC Code"
            value={agentKycInfo?.ifscCode}
            onChangeText={text => handleInputChange('ifscCode', text)}
            error={errors.ifscCode}
          />
          <TouchableOpacity
            disabled={loader}
            style={[
              styles.button,
              {
                backgroundColor: loader ? AppColors.gray : AppColors.mainColor,
              },
            ]}
            onPress={handleButtonPress}>
            <Text
              style={[
                styles.buttonText,
                {color: loader ? AppColors.black : AppColors.white},
              ]}>
              {loader ? 'Sending OTP' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
}) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.errorInput]}
      value={value}
      editable={true}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder="Enter details"
      placeholderTextColor={AppColors.black}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
  detailItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgentKycFirst;
