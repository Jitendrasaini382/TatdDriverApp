import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Headerlogo} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import BackButton from './BackButton';
import ExtraButtons from './ExtraButtons';
import {AppColors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
const Header = ({
  backButton,
  extraButton,
  isAuthenticated = true,
  showNeedHelp = false,
  customeNavigation,
}) => {
  const navigation = useNavigation();
  const handleLogoPress = () => {
    if (isAuthenticated) {
      navigation.navigate('TrustedDriver');
    } else {
      navigation.navigate('DriverLogin');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContent}>
        <Pressable onPress={handleLogoPress} style={styles.logoView}>
          <Image
            source={Headerlogo}
            style={{resizeMode: 'contain', height: 70, width: 140}}
          />
        </Pressable>
      </View>

      {backButton ? (
        <BackButton customeNavigation={customeNavigation} />
      ) : extraButton ? (
        <ExtraButtons showNeedHelp={showNeedHelp} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white,
    display: 'flex',
    flexDirection: 'row',
    // elevation: 5,
    borderBottomWidth:1,
    borderBottomColor:"#27222212",
    justifyContent: 'space-between',
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
