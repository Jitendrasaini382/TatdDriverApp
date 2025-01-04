import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppLogo, Headerlogo} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import BackButton from './BackButton';
import ExtraButtons from './ExtraButtons';
import {AppColors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
const Header = ({backButton, extraButton, isAuthenticated = true}) => {
  const navigation = useNavigation();
  const handleLogoPress = () => {
    if (isAuthenticated) {
      // Navigate to the private route
      navigation.navigate('TrustedDriver');
    } else {
      // Navigate to the public route
      navigation.navigate('DriverLogin');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContent}>
        <Pressable
          // onPress={() => navigation.navigate('TrustedDriver')}
          onPress={handleLogoPress}
          style={styles.logoView}>
          <Image
            source={Headerlogo}
            style={{resizeMode: 'contain', height: 70, width: 140}}
          />
        </Pressable>
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
    // shadowColor: 'grey',
    // shadowOpacity: 10,
    // shadowRadius: 3,
    elevation: 5,
    justifyContent: 'space-between',
    // paddingBottom: 10,
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
    marginLeft: 5,
    marginTop: 10,
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
