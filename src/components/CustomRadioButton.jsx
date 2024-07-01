import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from '../assets/Colors';

const RadioButton = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: AppColors.mainColor,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: AppColors.black,
    fontFamily: "Roboto-Regular"

  },
});

export default RadioButton;