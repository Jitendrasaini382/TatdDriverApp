import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AppLogo} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import BackButton from './BackButton';
import ExtraButtons from './ExtraButtons';
import {AppColors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
const Header = ({backButton, extraButton}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContent}>
        <View style={styles.logoView}>
          <Image source={AppLogo} />
          <Text style={styles.logoText}>tat d</Text>
        </View>

        <View style={styles.logoBottom}>
          <Text style={styles.logoBottomText}>trusted & trained driver</Text>
        </View>
      </View>

      {backButton ? <BackButton /> : extraButton ? <ExtraButtons /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: 'grey',
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  leftContent: {
    backgroundColor: AppColors.white,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -5,
  },
  logoText: {
    color: AppColors.mainColor,
    marginLeft: 7,
    marginTop: 8,
    fontSize: 39,
    fontWeight: '500',
    fontFamily: AppFont.mainFont,
  },
  logoBottom: {
    justifyContent: 'flex-start',
    marginLeft: 27,
  },
  logoBottomText: {
    color: AppColors.mainColor,
    fontSize: 10,
    fontFamily: AppFont.mainFont,
  },
});

export default Header;
