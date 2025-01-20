import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {LANGUAGE_SWITCH} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentView,
  setLanguageSwitch,
} from '../../redux/slices/globalSlice';

const ToggleButton = ({button1Label, button2Label, onToggle}) => {
  const currentView = useSelector(e => e?.globalSlice?.currentView);

  const [currentState, setCurrentState] = useState(currentView);

  const dispatch = useDispatch();

  const handlePress = async label => {
    setCurrentState(label);
    onToggle(label);
    dispatch(setCurrentView(label));

    const language = label.toLowerCase();
    await switchLanguage(language);
  };
  const token = useSelector(e => e.userAuth);

  const switchLanguage = async language => {
    // console.log(token, 'tokennnn');
    try {
      const response = await LANGUAGE_SWITCH({
        action: 'update_language',
        current_language: language,
      });
      dispatch(setLanguageSwitch(response.current_language));
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
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
  container: {
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
  inactiveButton: {},
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
