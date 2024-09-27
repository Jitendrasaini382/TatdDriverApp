import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';
import { useDispatch } from 'react-redux';
import { setMyBookingModal } from '../redux/slices/trustedDriverSlice';

const ExtraButtons = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openNeedHelp = () => {
    Linking.openURL('https://www.tatd.in/tickets-driver.php');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.leftView}>
        <TouchableOpacity onPress={openNeedHelp}>
          <Text style={styles.leftText}>Need Help ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={() => dispatch(setMyBookingModal(true))}>
          <Text style={styles.rightText}>My Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExtraButtons;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  leftView: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
  },
  leftText: {
    padding: 7,
    fontSize: 10,
    fontWeight: '500',
    color: AppColors.white,
  },
  rightView: {
    margin: 5,
    marginRight: 17,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
  },
  rightText: {
    padding: 7,
    fontSize: 10,
    fontWeight: '500',
    color: AppColors.white,
  },
});
