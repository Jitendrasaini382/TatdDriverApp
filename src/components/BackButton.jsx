import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainView}>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonView: {
    margin: 5,
    marginRight: 17,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: 'rgb(204,204,204)',
  },
  buttonText: {
    color: AppColors.black,
    margin: 5,
    opacity: 0.8,
  },
});
