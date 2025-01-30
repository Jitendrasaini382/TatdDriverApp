import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {useSelector} from 'react-redux';

const RedirectPopUp = ({navigation, route}) => {
  const {bookingNumber} = route?.params;
  const {data} = route?.params;

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('TrustedDriver');
    }, 3000);
  }, []);
  const onClose = url => {
    navigation.navigate('TrustedDriver');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={true}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>
              {languageSwitch == 'english' ? 'Thank You' : 'धन्यवाद'}
            </Text>
          </View>
          {/* Content Section */}
          <View style={styles.content}>
            <View style={styles.ratingBox}>
              {/* Highlighted Text */}
              <View style={styles.ratingInner}>
                <Text style={styles.highlightedText}>{data}</Text>
              </View>

              {/* Close Button */}
              <TouchableOpacity onPress={onClose} style={styles.submitButton}>
                <Text style={styles.submitText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: AppColors.mainColor,
    width: '90%',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: AppColors.black,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  ratingBox: {
    backgroundColor: AppColors.white,
    width: '90%',
    borderRadius: 15,
    padding: 25,
    borderWidth: 2,
    borderColor: AppColors.mainColor,
    shadowColor: AppColors.black,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  ratingInner: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedText: {
    color: AppColors.mainColor,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  submitButton: {
    backgroundColor: AppColors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: AppColors.black,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  submitText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
export default RedirectPopUp;
