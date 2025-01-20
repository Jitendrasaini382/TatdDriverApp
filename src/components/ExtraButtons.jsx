import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setMyBookingModal} from '../redux/slices/trustedDriverSlice';

const ExtraButtons = ({showNeedHelp}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.mainView}>
      <View style={styles.leftView}>
        {showNeedHelp && (
          <TouchableOpacity
            onPress={() => navigation.navigate('TicketsDriver')}>
            <Text style={styles.leftText}>
              {languageSwitch == 'english' ? 'Need Help?' : ' मदद चाहिए?'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={() => dispatch(setMyBookingModal(true))}>
          <Text style={styles.rightText}>
            {languageSwitch == 'english' ? 'My Bookings' : 'मेरी बुकिंगें'}
          </Text>
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
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: '500',
    color: AppColors.white,
  },
});
