import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';

const AgentKyc = () => {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Header backButton={true} />
      <View style={styles.container}>
        <Text style={styles.title}>Bank Details</Text>
        <View style={styles.card}>
          <DetailInput
            label="Beneficiary Name"
            value={beneficiaryName}
            onChangeText={setBeneficiaryName}
          />
          <DetailInput
            label="Beneficiary Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
          <DetailInput
            label="Reconfirm Account Number"
            value={confirmAccountNumber}
            onChangeText={setConfirmAccountNumber}
            keyboardType="numeric"
          />
          <DetailInput
            label="Bank Name"
            value={bankName}
            onChangeText={setBankName}
          />
          <DetailInput
            label="IFSC Code"
            value={ifscCode}
            place
            onChangeText={setIfscCode}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const DetailInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder="XYZ"
      placeholderTextColor={AppColors.black}
    />
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
    backgroundColor: 'white',
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
  button: {
    backgroundColor: '#2c6ba0',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgentKyc;
