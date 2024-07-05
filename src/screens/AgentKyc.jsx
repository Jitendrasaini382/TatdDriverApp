import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import { AppColors } from '../assets/Colors';

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
  
  const DetailInput = ({ label, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder= "XYZ"
        placeholderTextColor={AppColors.black}
      />
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    //   backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2c6ba0',
      marginBottom: 10,
      textAlign: "right"
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 4,
    //   elevation: 3,
    borderWidth: .5,
    borderColor: AppColors.mainColor
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

// // import { StyleSheet, Text, View } from 'react-native'
// // import React from 'react'

// // const AgentKyc = () => {
// //   return (
// //     <View>
// //       <Text style={{color: "red"}}>AgentKyc</Text>
// //     </View>
// //   )
// // }

// // export default AgentKyc

// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   Button,
//   SafeAreaView,
// } from 'react-native';
// import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';

// const AgentKyc = () => {
//   return (
    // <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
    //   <Header backButton={true} />
//       <View
//         style={{
//           justifyContent: 'center',
//           marginHorizontal: 20,
//           marginVertical: 20,
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             fontWeight: '500',
            // textAlign: 'right',
//             // marginTop: 20,
//             color: AppColors.mainColor,
//           }}>
//           Bank Details
//         </Text>
//       </View>
//       <View
//         style={{
//           borderWidth: 0.5,
//           borderRadius: 5,
//           borderColor: AppColors.mainColor,
//           margin: 20,
//           marginTop: 0,
//         }}>
//         <View style={styles.container}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Beneficiary Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="XYZ"
//               placeholderTextColor={AppColors.black}
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Beneficiary Account Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="'XYZ"
//               placeholderTextColor={AppColors.black}
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Reconfirm Account Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="XYZ"
//               placeholderTextColor={AppColors.black}
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Bank Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="XYZ"
//               placeholderTextColor={AppColors.black}
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>IFSC Code</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="XYZ"
//               placeholderTextColor={AppColors.black}
//             />
//           </View>
//           <Button title="Edit" onPress={() => {}} color={AppColors.mainColor} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     margin: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'right',
//     marginBottom: 20,
//     color: AppColors.black,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#999',
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     color: AppColors.black,
//     fontSize: 16,
//     // backgroundColor: '#f9f9f9'
//   },
// });

// export default AgentKyc;
