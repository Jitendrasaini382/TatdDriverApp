import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppColors } from '../../assets/Colors';

const RoundTripBookingAceeptModal = ({setOpenModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.mainColor,
            // flex: 1,
            // backgroundColor: AppColors.white,
          }}>
          <View style={{backgroundColor: '#e5e5e5'}}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'right',
                  fontSize: 20,
                  fontFamily: 'Roboto',
                  color: AppColors.black,
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: AppColors.mainColor,
              paddingHorizontal: 10,
              paddingTop: 40,
              paddingBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: 40,
                fontFamily: 'Roboto-Medium',
              }}>
              The guest is God
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#e5e5e5',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: AppColors.mainColor,
                fontFamily: 'Roboto-Medium',
              }}>
              {'\n'}
              {'\n'}I accept this duty{'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AppColors.black,
                fontFamily: 'Roboto-Medium',
              }}>
              I will reach the coustomer on time{'\n'}
              {'\n'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Are You Confirm');
              }}
              style={{
                backgroundColor: AppColors.mainColor,
                padding: 10,
                borderWidth: 1,
                borderColor: AppColors.black,
                paddingHorizontal: 20,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: AppColors.white,
                  fontFamily: 'Roboto-Medium',
                }}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    width: 300,
  },
  header: {
    backgroundColor: '#337ab7',
    padding: 15,
  },
  headerText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    padding: 15,
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#337ab7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoundTripBookingAceeptModal;
