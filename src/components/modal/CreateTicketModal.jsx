import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {CREATE_TICKRT_DRIVER} from '../../apis/Apis';

const CreateTicketModal = ({setCreateTicketModal}) => {
  const [field, setField] = useState({
    action: 'create_driver_ticket',
    remarks: '',
    tbooking_id: '',
  });

  const handleChange = (name, value) => {
    setField({...field, [name]: value});
  };

  const createDriverTicket = () => {
    CREATE_TICKRT_DRIVER(field)
      .then(response => {
        console.log(response.message);
        Alert.alert(response.message);
        setCreateTicketModal(false);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flex: 1, padding: 10, elevation: 5}}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => setCreateTicketModal(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Ticket</Text>

            <Text style={styles.label}>Booking Number:</Text>
            {/* <TextInput
              style={styles.input}
              placeholder="Share Your Booking Number"
                  onChangeText={handleChange}
              placeholderTextColor="#6c757d"
              value={field.tbooking_id}

            /> */}

            <TextInput
              style={styles.input}
              placeholder="Share Your Booking Number"
              onChangeText={value => handleChange('tbooking_id', value)}
              placeholderTextColor="#6c757d"
              value={field.tbooking_id}
            />

            <Text style={styles.label}>Description:</Text>
            {/* <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
              placeholderTextColor="#6c757d"
              multiline
              value={field.remarks}
              onChangeText={handleChange}


              numberOfLines={4}
            /> */}

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
              placeholderTextColor={AppColors.silverGrey}
              multiline
              value={field.remarks}
              onChangeText={value => handleChange('remarks', value)}
              numberOfLines={4}
            />

            <TouchableOpacity
              onPress={createDriverTicket}
              style={styles.button}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    position: 'relative', // Add this to position the close button
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
    // backgroundColor: "#e7e7e7",
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
