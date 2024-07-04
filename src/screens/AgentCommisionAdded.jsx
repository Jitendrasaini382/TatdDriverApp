import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {Check_Offer} from '../assets/images';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppFont} from '../assets/FontsFamily';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';

const AgentCommisionAdded = ({route}) => {
  const {amount, date, agentName, invoiceValue} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header backButton={true} />
      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amountValue}>
              <Icon name="rupee" size={40} color={AppColors.black} />
              {amount}
            </Text>
            <Image source={Check_Offer} style={styles.checkImage} />
          </View>
          <Text style={styles.commissionText}>
            Automatic 10% Commission Earned
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Your Agent</Text>
          <Text style={styles.detailText}>{date}</Text>
        </View>

        <View>
          <Text style={styles.agentName}>{agentName}</Text>
          <Text style={styles.invoiceValue}>
            Invoice Value {''}
            <Text>
              <Icon name="rupee" size={15} color={AppColors.black} />
              {invoiceValue}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 30,
    backgroundColor: '#ecf0f3',
    padding: 30,
  },
  amountContainer: {
    borderBottomWidth: 1,
  },
  amountLabel: {
    color: '#4f4f4f',
    fontSize: 32,
    fontFamily: AppFont.regularFont,
    marginVertical: 10,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountValue: {
    fontWeight: 'bold',
    fontSize: 42,
    color: 'black',
  },
  checkImage: {
    width: 45,
    height: 45,
    marginLeft: 5,
  },
  commissionText: {
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: '400',
    color: 'black',
    fontFamily: AppFont.regularFont,
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  detailText: {
    color: 'black',
    fontSize: 20,
    fontFamily: AppFont.regularFont,
  },
  agentName: {
    marginBottom: 20,
    color: 'black',
    fontSize: 30,
    fontFamily: AppFont.regularFont,
  },
  invoiceValue: {
    marginBottom: 20,
    fontSize: 18,
    color: 'black',
    fontFamily: AppFont.regularFont,
  },
});

export default AgentCommisionAdded;





















// import React from 'react';
// import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
// import {Check_Offer} from '../assets/images';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {AppFont} from '../assets/FontsFamily';
// import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';

// const AgentCommisionAdded = ({}) => {
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//       <Header backButton={true} />
//       <View
//         style={{
//           margin: 20,
//           marginTop: 30,
//           backgroundColor: '#ecf0f3',
//           padding: 30,
//         }}>
//         <View style={{borderBottomWidth: 1}}>
//           <Text
//             style={{
//               color: '#4f4f4f',
//               fontSize: 32,
//               fontFamily: AppFont.regularFont,
//               marginVertical: 10,
//             }}>
//             Amount
//           </Text>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={{fontWeight: 'bold', fontSize: 42, color: 'black'}}>
//               <Icon name="rupee" size={40} color={AppColors.black} />
//               880
//             </Text>
//             <Image source={Check_Offer} 
//             style={{width: 45, height: 45, marginLeft: 5, }}
//             />
//           </View>
//           <Text
//             style={{
//               fontSize: 20,
//               paddingBottom: 20,
//               fontWeight: '400',
//               color: 'black',
//               fontFamily: AppFont.regularFont,
//               marginTop: 10,
//             }}>
//             Automatic 10% Commission Earned
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginVertical: 30,
//           }}>
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 20,
//               fontFamily: AppFont.regularFont,
//             }}>
//             Your Agent
//           </Text>
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 20,
//               fontFamily: AppFont.regularFont,
//             }}>
//             23 Jun, 2024
//           </Text>
//         </View>

//         <View style={{}}>
//           <Text
//             style={{
//               marginBottom: 20,
//               color: 'black',
//               fontSize: 30,
//               fontFamily: AppFont.regularFont,
//             }}>
//             Surendar yadav
//           </Text>
//           <Text
//             style={{
//               marginBottom: 20,
//               fontSize: 18,
//               color: 'black',
//               fontFamily: AppFont.regularFont,
//             }}>
//             Invoice Value {''}
//             <Text style={{paddingLeft: 5}}>
//               <Icon name="rupee" size={15} color={AppColors.black} />
//               8800
//             </Text>
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AgentCommisionAdded;

