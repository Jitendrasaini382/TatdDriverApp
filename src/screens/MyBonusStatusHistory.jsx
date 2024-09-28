// import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import {MY_BONUS_HISTORY} from '../apis/Apis';

// const MyBonusStatusHistory = () => {
//   const [bonusData, setBonusData] = useState([]);

//   const getAllBonusData = async () => {
//     try {
//       const response = await MY_BONUS_HISTORY({
//         action: 'get_bonus_history',
//       });

//       setBonusData(response.bonuses);
//       console.log(response.bonuses, 'My Bonus History Data');
//     } catch (error) {
//       console.log(error, 'My Bonus History Error');
//       Alert.alert('Error', 'Failed to fetch bonus history. Please try again.');
//     }
//   };

//   useEffect(() => {
//     getAllBonusData();
//   }, []);

//   return (
//     <View style={styles.mainContainer}>
//       <Header backButton={true} />
//       <ScrollView>
//         <View style={styles.content}>
//           <View style={styles.container}>
//             <Text style={styles.title}>My Bonus</Text>
//             <View style={styles.tableContainer}>
//               <View style={styles.headerRow}>
//                 <Text style={[styles.headerCell, styles.createDateCell]}>
//                   Create Date
//                 </Text>
//                 <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
//                 <Text style={[styles.headerCell, styles.bonusTypeCell]}>
//                   Bonus Type
//                 </Text>
//                 <Text style={[styles.headerCell, styles.paymentStatusCell]}>
//                   Payment Status
//                 </Text>
//                 <Text style={[styles.headerCell, styles.amountCell]}>
//                   Amount
//                 </Text>
//               </View>
//               {bonusData &&
//                 bonusData.map((item, index) => (
//                   <View
//                     key={index}
//                     style={[
//                       styles.dataRow,
//                       index % 2 === 0 ? styles.evenRow : styles.oddRow,
//                     ]}>
//                     <Text style={[styles.dataCell, styles.createDateCell]}>
//                       {item.create_date}
//                     </Text>
//                     <Text style={[styles.dataCell, styles.nameCell]}>
//                       {item.name}
//                     </Text>
//                     <Text style={[styles.dataCell, styles.bonusTypeCell]}>
//                       {item.bonus_type}
//                     </Text>
//                     <Text style={[styles.dataCell, styles.paymentStatusCell]}>
//                       {item.payment_status}
//                     </Text>
//                     <Text style={[styles.dataCell, styles.amountCell]}>
//                       {item.amount}
//                     </Text>
//                   </View>
//                 ))}
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: AppColors.white,
//   },
//   container: {
//     backgroundColor: AppColors.white,
//     borderRadius: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 5,
//     shadowColor: AppColors.black,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   content: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: AppColors.white,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: AppColors.black,
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     backgroundColor: AppColors.mainColor,
//   },
//   headerCell: {
//     padding: 10,
//     color: AppColors.white,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     borderRightWidth: 1,
//     borderRightColor: AppColors.white,
//   },
//   dataRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   evenRow: {
//     backgroundColor: '#f9f9f9',
//   },
//   oddRow: {
//     backgroundColor: AppColors.white,
//   },
//   dataCell: {
//     padding: 10,
//     textAlign: 'center',
//     borderRightWidth: 1,
//     borderRightColor: '#ddd',
//     color: AppColors.black,
//   },
//   createDateCell: {
//     flex: 1.2,
//   },
//   nameCell: {
//     flex: 1,
//   },
//   bonusTypeCell: {
//     flex: 1.5,
//   },
//   paymentStatusCell: {
//     flex: 1.2,
//   },
//   amountCell: {
//     flex: 0.8,
//   },
// });

// export default MyBonusStatusHistory;
