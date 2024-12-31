import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../assets/Colors';
const FutureModal = () => {
  const [futureModal, setFutureModal] = useState(true);
  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={futureModal}
        onRequestClose={() => setFutureModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setFutureModal(false)}>
                <Icon name="close" size={20} color="white" />
              </TouchableOpacity>
              <View style={styles.titleView}>
                <Text
                  style={{
                    fontFamily: 'Merriweather-Bold',
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Call the customer immediately.
                </Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.text1}>
                  You have been assigned a booking for 20 Dec, at 03:00 PM. To
                  view all bookings, please see My Bookings.
                </Text>
                <Text style={styles.text2}>
                  Say on the phone - My name is RAJESH KUMAR, and i am calling
                  from tatd.in as a Private Driver - Partner. I will reach you
                  on time
                </Text>
                <Text style={styles.delayText}>
                  Delay in the call will reduce your Booking Score, and you will
                  face difficulties in getting work in the future.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.futureCloseButton}
                onPress={() => setFutureModal(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FutureModal;

const styles = StyleSheet.create({
  mainModalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },

  list: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Merriweather-Bold',
  },
  closeButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
  },
  closeModalButton: {
    backgroundColor: '#16588e',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  futureCloseButton: {
    backgroundColor: '#cfcbca',
    //marginTop: 20,
    padding: 12,
    borderRadius: 6,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20%',
    marginBottom: 20,
  },
  titleView: {
    backgroundColor: '#16588e',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Merriweather-Bold',
  },
  delayText: {
    color: AppColors.red,
    fontFamily: 'Merriweather-Bold',
    fontSize: 12,
  },
  text1: {
    color: 'black',
    marginBottom: 30,
    fontFamily: 'Merriweather-Bold',
    fontSize: 13,
    //marginVertical:20
  },
  text2: {
    color: 'black',
    marginVertical: 20,
    fontFamily: 'Merriweather-Bold',
    fontSize: 13,
  },
  textView: {
    marginVertical: 20,
    marginVertical: 15,
  },
});
