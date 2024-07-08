import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import React, {useState} from 'react';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {AppFont} from '../assets/FontsFamily';
import CreateTicketModal from '../components/modal/CreateTicketModal';
import {AppColors} from '../assets/Colors';
import AccordionData from '../components/AccordianData';

const dummyData = [
  {id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121786', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121787', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121788', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121789', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121790', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121791', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121792', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121793', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121794', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121795', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121796', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121797', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121798', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121799', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121800', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121801', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121802', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121803', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121804', date: '22 Jun, 11:08 AM', status: 'Closed'},
  {id: '121805', date: '22 Jun, 11:08 AM', status: 'Closed'},
];

const TicketList = () => {
  const renderItem = (item, index) => (
    <View key={item.id} style={[styles.row, index === 0 && styles.firstRow]}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.id}</Text>
      </View>
      <View style={[styles.cell, styles.middleCell]}>
        <Text style={styles.cellText}>{item.date}</Text>
      </View>
      <View style={styles.cell}>
        <View
          style={[
            styles.statusButton,
            index === 0 && styles.firstStatusButton,
          ]}>
          <Text
            style={[styles.statusText, index === 0 && styles.firstStatusText]}>
            {item.status}
          </Text>
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
      {dummyData.map((item, index) => renderItem(item, index))}
    </View>
  );
};

const TicketsDriver = () => {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backButton={true} />

      <ScrollView style={{margin: 15}}>
        <AccordionData />

        <TouchableOpacity
          onPress={() => setCreateTicketModal(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>Create Ticket</Text>
        </TouchableOpacity>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setCreateTicketModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={createTicketModal}>
          <CreateTicketModal setCreateTicketModal={setCreateTicketModal} />
        </Modal>
        <TicketList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,

    backgroundColor: '#f8f8f8',
  },
  headerCell: {
    flex: 1,
    padding: 10,
  },
  middleHeaderCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.borderColor,
  },
  headerText: {
    color: '#888',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,
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
    borderColor: AppColors.borderColor,
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

  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: AppColors.borderColor,
  },
  bottamText: {
    color: 'rgb(65, 84, 98)',
    fontFamily: AppFont.regularFont,
    padding: 5,
  },
  button: {
    backgroundColor: '#00A1E0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsDriver;
