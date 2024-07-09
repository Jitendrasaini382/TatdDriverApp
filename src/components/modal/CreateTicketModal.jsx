import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppColors } from '../../assets/Colors';

const CreateTicketModal = ({setCreateTicketModal}) => {
  return (
   <ScrollView>
     <View style={styles.container}>
      <View style={{flex: 1, padding: 10, elevation:5}}>
       
        <View style={styles.modal}>
        <TouchableOpacity 
          onPress={()=> setCreateTicketModal(false)}
        
        style={styles.closeButton} >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
          <Text style={styles.title}>Create Ticket</Text>

          <Text style={styles.label}>Booking Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Share Your Booking Number"
            placeholderTextColor="#6c757d"
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
            placeholderTextColor="#6c757d"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity 
          onPress={()=> setCreateTicketModal(false)

          }
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
  backgroundColor : AppColors.white,
  borderWidth: 2,
  borderRadius: 10,
  borderColor:'#e7e7e7',
},
  modal: {
    // flex:1,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    padding: 20,
    position: 'relative',  // Add this to position the close button

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
    fontFamily: "Roboto-Medium"
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
    borderColor: '#e7e7e7',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: '#e7e7e7',
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

