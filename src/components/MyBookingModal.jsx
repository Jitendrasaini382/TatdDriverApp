import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../assets/Colors';
import {RotateInDownLeft} from 'react-native-reanimated';

const MyBookingModal = ({setMyBookingModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setMyBookingModal(false)}>
      <View style={styles.cornerButton}>
        <TouchableOpacity onPress={() => console.warn('close')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>

        <Text style={styles.buttonText}>Package jjjjjDetails</Text>
        <Text style={styles.buttonText}>Package jjjjjDetails</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
        <Text style={styles.buttonText}>Package Details</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
 
  cornerButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    // overflow: "scroll",
    // flex: 1,

    backgroundColor: 'red',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default MyBookingModal;
