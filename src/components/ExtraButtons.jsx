import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';

const ExtraButtons = ({OpenMyBookingModal}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        // marginTop:8
      }}>
      <View
        style={{
          margin: 5,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#16588e',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TicketsDriver')}>
          <Text
            style={{
              padding: 7,
              fontSize: 10,
              fontWeight: '500',
              color: AppColors.white,
            }}>
            Need Help ?
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 5,
          marginRight: 17,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: AppColors.mainColor,
        }}>
        <TouchableOpacity onPress={() => OpenMyBookingModal(true)}>
          <Text
            style={{
              padding: 7,
              fontSize: 10,
              fontWeight: '500',
              color: AppColors.white,
            }}>
            My Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExtraButtons;

const styles = StyleSheet.create({});
