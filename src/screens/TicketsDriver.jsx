import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {AppFont} from '../assets/FontsFamily';
import AccordionTop from '../components/AccordianTop';
import AccordionBottam from '../components/AccordianBottam';
import TicketList from '../components/CreateTicket';
import CreateTicketModal from '../components/modal/CreateTicketModal';
import { AppColors } from '../assets/Colors';

const TicketsDriver = () => {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <Header backButton={true} />

      <ScrollView style={{margin: 15}}>
        <AccordionTop />
        <AccordionBottam />

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

export default TicketsDriver;

const styles = StyleSheet.create({
  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: 'rgb(204, 204, 204)',
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

