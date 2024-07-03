


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const FlexibleBookingAcceptModal = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>Please Read Carefully.</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            1. Customer needs the same driver on 03 Jul, 04 Jul, 05 Jul, 06 Jul,
            07 Jul, 08 Jul, 09 Jul for 12 hours.
          </Text>

          <Text style={styles.paragraph}>
            2. This is the company's new product - Flexible Subscription, where
            the customer has booked more than one In-city booking on the same
            day. If you press the Accept button, you will receive all bookings
            for Flexible Subscription. You can view all bookings in My Bookings.
          </Text>

          <Text style={[styles.paragraph, styles.warningText]}>
            3. Only accept bookings when you can fulfill all bookings of this
            Flexible Subscription.
          </Text>

          <Text style={styles.paragraph}>
            4. Overtime will be charged at Rs 2 per minute. The commission is
            applied after removing GST on the remaining bill. Night charges will
            be 200 Rs.
          </Text>

          <Text style={[styles.paragraph, styles.highlightText]}>
            5. Please note our job is to reduce customer inconvenience, not to
            increase it.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  contentContainer: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 10,
    color: 'black',
  },
  warningText: {
    color: 'red',
    fontWeight: 'bold',
  },
  highlightText: {
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#0047AB',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
  },
  acceptButtonText: {
    color: 'white',
  },
});

export default FlexibleBookingAcceptModal;
