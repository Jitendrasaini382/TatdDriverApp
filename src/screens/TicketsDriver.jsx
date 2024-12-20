import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import Header from '../components/Header';
import {AppFont} from '../assets/FontsFamily';
import {AppColors} from '../assets/Colors';
import {TICKETS_DRIVER} from '../apis/Apis';
import TicketDetails from '../components/modal/TicketDetailsModal';
import AccordionData from '../components/AccordianData';
import CreateTicketModal from '../components/modal/CreateTicketModal';
import {useDispatch, useSelector} from 'react-redux';
import {setButtonShow, setShowButtonText, setTicketsData} from '../redux/slices/globalSlice';

const TicketsDriver = ({navigation}) => {
  const dispatch = useDispatch();
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [ticketDetailsModal, setTicketDetailsModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const ticketsData = useSelector(e => e?.globalSlice?.ticketsData);
  const buttonShow = useSelector(e => e?.globalSlice?.buttonShow);
  const showButtonText = useSelector(e => e?.globalSlice?.showButtonText);

  const showDriverTicket = useCallback(async () => {
    try {
      const response = await TICKETS_DRIVER({action: 'show_driver_ticket'});
      dispatch(setTicketsData(response.tickets));
    } catch (err) {
      console.error('Show Driver Ticket Error:', err);
    }
  }, [ticketsData]);

  const checkOpenTicket = useCallback(async () => {
    try {
      const response = await TICKETS_DRIVER({action: 'open_ticket'});
      if (
        response.status_code == 200 &&
        response.message === 'no_open_ticket_found'
      ) {
        dispatch(setButtonShow(true));
        dispatch(setShowButtonText(''));
      } else {
        dispatch(setButtonShow(false));
        dispatch(setShowButtonText(response.message));
      }
    } catch (err) {
      console.error('Network Error:', err);
    }
  }, [setButtonShow, setShowButtonText]);

  useEffect(() => {
    checkOpenTicket();
    showDriverTicket();
  }, [checkOpenTicket, showDriverTicket]);

  const handleTicketPress = useCallback(
    id => {
      setTicketDetailsModal(true);
      setSelectedTicketId(id);
    },
    [setSelectedTicketId],
  );

  const renderItem = useCallback(
    ({id, timestamp, ticket_status}, index) => (
      <View key={id} style={[styles.row, index === 0 && styles.firstRow]}>
        <TouchableOpacity
          onPress={() => handleTicketPress(id)}
          style={styles.cell}>
          <Text style={styles.cellText}>{id}</Text>
        </TouchableOpacity>
        <View style={[styles.cell2, styles.middleCell]}>
          <Text style={styles.cellText}>{timestamp}</Text>
        </View>
        <View style={styles.cell}>
          <View
            style={[
              styles.statusButton,
              index === 0 && styles.firstStatusButton,
            ]}>
            <Text
              style={[
                styles.statusText,
                index === 0 && styles.firstStatusText,
              ]}>
              {ticket_status}
            </Text>
          </View>
        </View>
      </View>
    ),
    [handleTicketPress],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backButton={true} />
      <ScrollView style={styles.scrollView}>
        <AccordionData />
        {buttonShow ? (
          <TouchableOpacity
            onPress={() => setCreateTicketModal(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>Create Ticket</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.showButtonView}>
            <Text style={styles.showbtnText}>{showButtonText}</Text>
          </View>
        )}

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setCreateTicketModal(false)}
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          isVisible={createTicketModal}>
          <CreateTicketModal setCreateTicketModal={setCreateTicketModal} />
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setTicketDetailsModal(false)}
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          isVisible={ticketDetailsModal}>
          <TicketDetails
            setTicketDetailsModal={setTicketDetailsModal}
            ticketId={selectedTicketId}
          />
        </Modal>

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerCell1}>
              <Text style={styles.headerText}>Ticket ID</Text>
            </View>
            <View style={[styles.headerCell2, styles.middleHeaderCell]}>
              <Text style={styles.headerText}>Created Date</Text>
            </View>
            <View style={styles.headerCell3}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>
          {/* {ticketsData && ticketsData.map(renderItem)} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 15,
  },
  safeAreaView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    borderWidth: 1,
    marginTop: 10,
    flex: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,

    backgroundColor: '#f8f8f8',
  },
  headerCell1: {
    flex: 1,
    padding: 10,
  },
  headerCell2: {
    flex: 1.8,
    padding: 10,
  },
  headerCell3: {
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
  cell2: {
    flex: 1.8,
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
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  firstStatusButton: {
    backgroundColor: '#1e90ff',
  },
  statusText: {
    color: '#333',
    fontSize: 15,
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
  showButtonView: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 5,
    backgroundColor: '#e0e0e0',
  },
  showbtnText: {color: AppColors.black, fontWeight: '500', fontSize: 15},
});

export default TicketsDriver;
