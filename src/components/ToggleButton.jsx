import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppColors} from '../assets/Colors';

const ToggleButton = ({button1Label, button2Label, onToggle, initialState}) => {
  const [currentState, setCurrentState] = useState(initialState);

  useEffect(() => {
    setCurrentState(initialState);
  });

  const handlePress = label => {
    setCurrentState(label);
    onToggle(label);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          currentState === button1Label
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => handlePress(button1Label)}>
        <Text
          style={[
            styles.buttonText,
            currentState === button1Label
              ? styles.activeButtonText
              : styles.inactiveButtonText,
          ]}>
          {button1Label}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          currentState === button2Label
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => handlePress(button2Label)}>
        <Text
          style={[
            styles.buttonText,
            currentState === button2Label
              ? styles.activeButtonText
              : styles.inactiveButtonText,
          ]}>
          {button2Label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#edecf1',
    flexDirection: 'row',
    marginTop: 20,
    margin: 15,
    borderRadius: 5,
    padding: 8,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: AppColors.white,
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeButtonText: {
    color: AppColors.black,
  },
  inactiveButtonText: {
    color: AppColors.black,
  },
});

export default ToggleButton;
