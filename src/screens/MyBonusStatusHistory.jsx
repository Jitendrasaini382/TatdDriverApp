import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';


const MyBonus = () => {
  const bonusData = [
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
    { createDate: '26 Jun,2024', name: 'Mohd Waris', bonusType: 'Cash Adjustment-430664', paymentStatus: 'Due', amount: '100' },
   
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bonus</Text>
      <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.createDateCell]}>Create Date</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
          <Text style={[styles.headerCell, styles.bonusTypeCell]}>Bonus Type</Text>
          <Text style={[styles.headerCell, styles.paymentStatusCell]}>Payment Status</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Amount</Text>
        </View>
          {bonusData.map((item, index) => (
            <View key={index} style={[styles.dataRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={[styles.dataCell, styles.createDateCell]}>{item.createDate}</Text>
              <Text style={[styles.dataCell, styles.nameCell]}>{item.name}</Text>
              <Text style={[styles.dataCell, styles.bonusTypeCell]}>{item.bonusType}</Text>
              <Text style={[styles.dataCell, styles.paymentStatusCell]}>{item.paymentStatus}</Text>
              <Text style={[styles.dataCell, styles.amountCell]}>{item.amount}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};




const MyBonusStatusHistory = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor:'white'}}>
      <Header backButton="true" />
      <ScrollView>
      <View
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'white'
        }}>
        <MyBonus />
      </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: AppColors.black,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1e90ff',
  },
  headerCell: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  dataCell: {
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    color: AppColors.black
  },
  createDateCell: {
    flex: 1.2,
  },
  nameCell: {
    flex: 1,
  },
  bonusTypeCell: {
    flex: 1.5,
  },
  paymentStatusCell: {
    flex: 1.2,
  },
  amountCell: {
    flex: 0.8,
  },
});

export default MyBonusStatusHistory;