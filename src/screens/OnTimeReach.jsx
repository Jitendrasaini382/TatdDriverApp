import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { AppColors } from '../assets/Colors';

const OnTimeReach = () => {
  return (
    <SafeAreaView  style={{flex: 1}} >
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>On Time Reach</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.container}>
            <Text style={styles.notificationText}>
              "Well done RAJESH, www.tatd.in" Button: I Have Read the Updates
              Thank you for reaching the customer on time. For your and the
              customer's safety, please wear a mask and sanitize the vehicle.
            </Text>
            <Text style={styles.notificationText}></Text>
            <View style={styles.button}>
              <Text style={styles.buttonText}>I Have Read the Updates</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnTimeReach;

const styles = StyleSheet.create({
  titlecontainer: {
    backgroundColor: '#0056b3',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 10,
    marginBottom: 15,
    width: '70%',
    marginHorizontal: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    backgroundColor: '#f1f8ff',
    borderLeftWidth: 5,
    borderLeftColor: AppColors.mainColor,
    borderRadius: 10,
  },
  notificationText: {
    color: 'black',
    margin: 10,
  },
});
