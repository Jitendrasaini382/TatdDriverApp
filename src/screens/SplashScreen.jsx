import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {AppColors} from '../assets/Colors';
import {whitelogo} from '../assets/images';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSplash} from '../redux/slices/trustedDriverSlice';

const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (isFocused) {
      timer = setTimeout(() => {
        dispatch(setSplash(false));
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isFocused, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={whitelogo} style={styles.logoImage} />
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
