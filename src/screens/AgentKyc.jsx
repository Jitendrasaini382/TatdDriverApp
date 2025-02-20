// // only editable

// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   TextInput,
// // } from 'react-native';
// // import Header from '../components/Header';
// // import {AppColors} from '../assets/Colors';
// // import {GET_AGENT_KYC_INFO} from '../apis/Apis';

// // const AgentKyc = () => {
// //   const [agentKycInfo, setAgentKycInfo] = useState({
// //     beneficiaryName: '',
// //     accountNumber: '',
// //     confirmAccountNumber: '',
// //     bankName: '',
// //     ifscCode: '',
// //   });

// //   const [isEditable, setIsEditable] = useState(false);

// //   useEffect(() => {
// //     getAllAgentKycInfo();
// //   }, []);

// //   const getAllAgentKycInfo = async () => {
// //     try {
// //       const response = await GET_AGENT_KYC_INFO();
// //       setAgentKycInfo({
// //         beneficiaryName: response?.response?.beneficiary_name || '',
// //         accountNumber: response?.response?.account_number || '',
// //         confirmAccountNumber: response?.response?.account_number || '',
// //         bankName: response?.response?.bank_name || '',
// //         ifscCode: response?.response?.ifsc_code || '',
// //       });
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const handleEditPress = () => {
// //     if (isEditable) {
// //       // Save Logic Here (e.g., API call to update)
// //       console.log('Saving updated KYC info:', agentKycInfo);
// //     }
// //     setIsEditable(!isEditable);
// //   };

// //   const handleInputChange = (key, value) => {
// //     setAgentKycInfo(prevState => ({
// //       ...prevState,
// //       [key]: value,
// //     }));
// //   };

// //   return (
// //     <SafeAreaView style={{backgroundColor: AppColors.white, flex: 1}}>
// //       <Header backButton={true} />
// //       <View style={styles.container}>
// //         <Text style={styles.title}>Bank Details</Text>
// //         <View style={styles.card}>
// //           <DetailInput
// //             label="Beneficiary Name"
// //             value={agentKycInfo.beneficiaryName}
// //             onChangeText={text => handleInputChange('beneficiaryName', text)}
// //             editable={isEditable}
// //           />
// //           <DetailInput
// //             label="Beneficiary Account Number"
// //             value={agentKycInfo.accountNumber}
// //             onChangeText={text => handleInputChange('accountNumber', text)}
// //             editable={isEditable}
// //             keyboardType="numeric"
// //           />
// //           <DetailInput
// //             label="Reconfirm Account Number"
// //             value={agentKycInfo.confirmAccountNumber}
// //             onChangeText={text =>
// //               handleInputChange('confirmAccountNumber', text)
// //             }
// //             editable={isEditable}
// //             keyboardType="numeric"
// //           />
// //           <DetailInput
// //             label="Bank Name"
// //             value={agentKycInfo.bankName}
// //             onChangeText={text => handleInputChange('bankName', text)}
// //             editable={isEditable}
// //           />
// //           <DetailInput
// //             label="IFSC Code"
// //             value={agentKycInfo.ifscCode}
// //             onChangeText={text => handleInputChange('ifscCode', text)}
// //             editable={isEditable}
// //           />
// //           <TouchableOpacity style={styles.button} onPress={handleEditPress}>
// //             <Text style={styles.buttonText}>
// //               {isEditable ? 'Update' : 'Edit'}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const DetailInput = ({
// //   label,
// //   value,
// //   onChangeText,
// //   keyboardType = 'default',
// //   editable = false,
// // }) => (
// //   <View style={styles.detailItem}>
// //     <Text style={styles.label}>{label}</Text>
// //     <TextInput
// //       style={[styles.input, !editable && styles.disabledInput]}
// //       value={value}
// //       onChangeText={onChangeText}
// //       keyboardType={keyboardType}
// //       editable={editable}
// //       placeholder="Enter details"
// //       placeholderTextColor={AppColors.black}
// //     />
// //   </View>
// // );

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 16,
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#2c6ba0',
// //     marginBottom: 10,
// //     textAlign: 'right',
// //   },
// //   card: {
// //     backgroundColor: AppColors.white,
// //     borderRadius: 8,
// //     padding: 16,
// //     borderWidth: 0.5,
// //     borderColor: AppColors.mainColor,
// //   },
// //   detailItem: {
// //     marginBottom: 16,
// //   },
// //   label: {
// //     fontSize: 14,
// //     color: '#888',
// //     marginBottom: 4,
// //   },
// //   input: {
// //     fontSize: 16,
// //     color: '#333',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ddd',
// //     paddingBottom: 4,
// //   },
// //   disabledInput: {
// //     backgroundColor: '#f0f0f0',
// //     color: '#888',
// //   },
// //   button: {
// //     backgroundColor: '#2c6ba0',
// //     padding: 12,
// //     borderRadius: 4,
// //     alignItems: 'center',
// //     marginTop: 8,
// //   },
// //   buttonText: {
// //     color: AppColors.white,
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default AgentKyc;

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
import {GET_AGENT_KYC_INFO, GET_AGENT_KYC_SEND_OTP} from '../apis/Apis';
import {Keyboard} from 'react-native';
import { useRoute } from '@react-navigation/native';

const AgentKyc = ({navigation}) => {
  const route = useRoute()
  console.log(route);
  
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

  useEffect(() => {
    getAllAgentKycInfo();
    setLoader(true);
  }, []);

  const getAllAgentKycInfo = async () => {
    try {
      const response = await GET_AGENT_KYC_INFO();
      setAgentKycInfo({
        beneficiaryName: response?.response?.beneficiary_name || '',
        accountNumber: response?.response?.account_number || '',
        confirmAccountNumber: response?.response?.account_number || '',
        bankName: response?.response?.bank_name || '',
        ifscCode: response?.response?.ifsc_code || '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async data => {
    console.log(data, 'sending data');

    // return false;
    try {
      const response = await GET_AGENT_KYC_SEND_OTP();

      if (response?.status_code == 200) {
        navigation.navigate('CheckAgentOtp', {response: response, data: data});
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleButtonPress = () => {
    Keyboard.dismiss();

    if (!isEditing) {
      // When clicking "Edit", clear all fields and switch to "Update"
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
      });

      // Alert.alert('Success', 'Bank details updated successfully!', [
      //   {text: 'OK'},
      // ]);
      // console.log('Saving updated KYC info:', agentKycInfo);
    }
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
      {loader ? (
        <ActivityIndicator size={'large'} color={AppColors.mainColor} 
        style={{flex: 1, alignContent: 'center'}}
        
        />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          style={styles.container}>

          <Text style={styles.title}>Bank Details</Text>{
            route?.params?.res?.message &&<Text style={{color:"green",fontSize:13,marginBottom:5}}>{route?.params?.res?.message}
          </Text>
          }
          
          <View style={styles.card}>
            <DetailInput
              label="Beneficiary Name"
              value={agentKycInfo.beneficiaryName}
              onChangeText={text => handleInputChange('beneficiaryName', text)}
              error={errors.beneficiaryName}
            />
            <DetailInput
              label="Beneficiary Account Number"
              value={agentKycInfo.accountNumber}
              onChangeText={text => handleInputChange('accountNumber', text)}
              keyboardType="numeric"
              error={errors.accountNumber}
            />
            <DetailInput
              label="Reconfirm Account Number"
              value={agentKycInfo.confirmAccountNumber}
              onChangeText={text =>
                handleInputChange('confirmAccountNumber', text)
              }
              keyboardType="numeric"
              error={errors.confirmAccountNumber}
            />
            <DetailInput
              label="Bank Name"
              value={agentKycInfo.bankName}
              onChangeText={text => handleInputChange('bankName', text)}
              error={errors.bankName}
            />
            <DetailInput
              label="IFSC Code"
              value={agentKycInfo.ifscCode}
              onChangeText={text => handleInputChange('ifscCode', text)}
              error={errors.ifscCode}
            />
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>
                {isEditing ? 'Update' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
}) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.errorInput]}
      value={value}
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
    backgroundColor: '#2c6ba0',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgentKyc;
