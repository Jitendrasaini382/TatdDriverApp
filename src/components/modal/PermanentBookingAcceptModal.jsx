import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import { AppFont } from '../../assets/FontsFamily';

const PermanentBookingAcceptModal = ({setOpenModal}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>Please read carefully.</Text>

        <Text style={styles.subHeader}>
          यह एक Private नौकरी है, Apply for this job only if
        </Text>

        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            1. If you live within 10 KM of the customer's home, which is in
            Vijay Nagar Single Story.
          </Text>
          <Text style={styles.listItem}>
            2. If you are proficient in driving a Altis Manual and Automatic .
          </Text>
          <Text style={styles.listItem}>
            3. If you are well-versed in maintaining and keeping the vehicle
            clean.
          </Text>
          <Text style={styles.listItem}>
            4. If you can arrive on time for the interview on 04 Oct at 09:00
            AM, the trial will be 2 hours - 0 Rs.
          </Text>
          <Text style={styles.listItem}>
            5. If you agree to work for 26 days, 12 Hours, and a salary of
            20000₹. The job will start on 02 Oct, and you need to be there every
            day at 09:00 AM.
          </Text>
          <Text style={[styles.listItem, styles.warning]}>
            6. Do not press the Accept button without reason. After accepting,
            if you fail to reach the customer, your ID will be permanently or
            temporarily suspended for 21 days.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setOpenModal(false)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert('Are You Confirm');
            }}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Accept</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex:1,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: AppColors.black,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: AppColors.black,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    color: AppColors.black,
    fontSize: 18,
  },
  warning: {
    color: 'red',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AppColors.black,
    fontSize: 20,
    fontWeight:"500",
fontFamily : AppFont.regularFont

  },
  applyButtonText: {
    color: AppColors.white,
    fontSize: 20,
    fontWeight:"500",
fontFamily : AppFont.regularFont

  },
});

export default PermanentBookingAcceptModal;
