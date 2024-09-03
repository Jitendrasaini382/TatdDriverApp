import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { AppColors } from '../assets/Colors';
import { bluelogo, whitelogo } from '../assets/images';

const SplashScreen = ({navigation}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={whitelogo}
          style={styles.logoImage}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: AppColors.mainColor,
    padding: 30,
    borderRadius: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
