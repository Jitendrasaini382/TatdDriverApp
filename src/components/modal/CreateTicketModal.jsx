import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import React, {useState} from 'react';
import {AppColors} from '../../assets/Colors';
import {TICKETS_DRIVER} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {
  setButtonShow,
  setShowButtonText,
  setTicketsData,
} from '../../redux/slices/globalSlice';

const CreateTicketModal = ({setCreateTicketModal}) => {
  const dispatch = useDispatch();
  const [field, setField] = useState({
    action: 'create_driver_ticket',
    remarks: '',
    tbooking_id: '',
  });
  const [checkField, setCheckField] = useState({
    action: 'check_booking_number',
    tbooking_id: '',
  });

  const handleChange = (name, value) => {
    setField({...field, [name]: value});
    setCheckField({...checkField, [name]: value});
  };

  const checkOpenTicket = () => {
    TICKETS_DRIVER({
      action: 'open_ticket',
    })
      .then(response => {
        if (
          response.status_code == 200 &&
          response.message == 'no_open_ticket_found'
        ) {
          dispatch(setButtonShow(true));
          dispatch(setShowButtonText(''));
        } else {
          dispatch(setButtonShow(true));
          dispatch(setShowButtonText(response.message));
        }
      })
      .catch(err => {
      });
  };

  const showDriverTicket = () => {
    TICKETS_DRIVER({
      action: 'show_driver_ticket',
    })
      .then(e => {
        dispatch(setTicketsData(e.tickets));
      })
      .catch(err => {
      });
  };

  const checkBookingNumber = () => {
    TICKETS_DRIVER(checkField)
      .then(async e => {

        if (e.status_code == 200) {
          try {
            const result = await TICKETS_DRIVER(field);
            if (result.status_code == 200) {
              setCreateTicketModal(false);
              Alert.alert('Success', result.message, [
                {
                  text: 'OK',
                  onPress: async () => {
                    await checkOpenTicket();
                    await showDriverTicket();
                  },
                },
              ]);
            } else {
              Alert.alert('Network Error');
            }
          } catch (err) {
            Alert.alert(
              'Error',
              'An error occurred while creating the ticket.',
            );
          }
        } else if (e.status_code == 400) {
          Alert.alert(e.message);
        }
      })
      .catch(err => {
        Alert.alert('Please Check the Ticket Booking No.');
      });
  };

  const handleCreateTicket = () => {
    if (!field.remarks || !field.tbooking_id) {
      Alert.alert('Please enter all required values');
      return;
    }
    checkBookingNumber();
  };

  return (
    <ScrollView>
      <View style={ticketModalStyles.container}>
        <View style={{flex: 1, padding: 10, elevation: 5}}>
          <View style={ticketModalStyles.modal}>
            <TouchableOpacity
              onPress={() => setCreateTicketModal(false)}
              style={ticketModalStyles.closeButton}>
              <Text style={ticketModalStyles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={ticketModalStyles.title}>Create Ticket</Text>

            <Text style={ticketModalStyles.label}>Booking Number:</Text>

            <TextInput
              style={ticketModalStyles.input}
              placeholder="Share Your Booking Number"
              onChangeText={value => handleChange('tbooking_id', value)}
              placeholderTextColor="#6c757d"
              value={field.tbooking_id}
            />

            <Text style={ticketModalStyles.label}>Description:</Text>

            <TextInput
              style={[ticketModalStyles.input, ticketModalStyles.textArea]}
              placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
              placeholderTextColor={AppColors.silverGrey}
              multiline
              value={field.remarks}
              onChangeText={value => handleChange('remarks', value)}
              numberOfLines={4}
            />

            <TouchableOpacity
              onPress={handleCreateTicket}
              style={ticketModalStyles.button}>
              <Text style={ticketModalStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ticketModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#e7e7e7',
  },
  modal: {
    // flex:1,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Roboto-Medium',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: AppColors.black,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#e7e7e7',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: AppColors.black,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTicketModal;
