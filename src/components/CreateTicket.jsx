import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppColors } from '../assets/Colors';

const dummyData = [
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
  { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
 
];

const TicketList = () => {
  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index === 0 && styles.firstRow]}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.id}</Text>
      </View>
      <View style={[styles.cell, styles.middleCell]}>
        <Text style={styles.cellText}>{item.date}</Text>
      </View>
      <View style={styles.cell}>
        <View style={[styles.statusButton, index === 0 && styles.firstStatusButton]}>
          <Text style={[styles.statusText, index === 0 && styles.firstStatusText]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Ticket ID</Text>
        </View>
        <View style={[styles.headerCell, styles.middleHeaderCell]}>
          <Text style={styles.headerText}>Created Date</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Status</Text>
        </View>
      </View>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    backgroundColor: '#f8f8f8',
  },
  headerCell: {
    flex: 1,
    padding: 10,
  },
  middleHeaderCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
  },
  headerText: {
    color: '#888',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
  },
  firstRow: {
    backgroundColor: '#f0f8ff',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  middleCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
  },
  cellText: {
    color: '#333',
  },
  statusButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  firstStatusButton: {
    backgroundColor: '#1e90ff',
  },
  statusText: {
    color: '#333',
  },
  firstStatusText: {
    color: AppColors.white,
  },
});

export default TicketList;
