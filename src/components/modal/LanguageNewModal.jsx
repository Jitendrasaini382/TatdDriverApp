import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppColors} from '../../assets/Colors'; // Adjust the import path as needed
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentView,
  setLanguageSwitch,
} from '../../redux/slices/globalSlice';
import {LANGUAGE_SWITCH} from '../../apis/Apis';

const {width, height} = Dimensions.get('window');

// Inline RadioButton Component
const RadioButton = ({label, selected, onSelect}) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.radioSelected} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const LanguageSelectionModal = ({
  visible,
  onClose,
  onConfirm,
  selectedLanguage,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const currentView = useSelector(e => e?.globalSlice?.currentView);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  //   const [languageSwitch, setlanguageSwitch] = useState(languageSwitch1);

  const handleLanguageSelect = async language => {
    // onSelect(language);
    console.log(language);
    // return
    // dispatch(setLanguageSwitch(language?.value));
    dispatch(setCurrentView(language?.label));
    // const language_ = language.toLowerCase();
    switchLanguage(language?.value);
    // setlanguageSwitch(language);
  };
  const switchLanguage = async language => {
    try {
      const response = await LANGUAGE_SWITCH({
        action: 'update_language',
        current_language: language,
      });
      console.log(response.current_language, 'response.current_language');
      dispatch(setLanguageSwitch(response.current_language));
    } catch (error) {}
  };
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {currentView == 'English' ? 'Choose Language' : 'भाषा चुनें'}
          </Text>

          <View style={styles.languageContainer}>
            <View style={styles.languageRow}>
              <View style={styles.languageOption}>
                <RadioButton
                  label="English"
                  selected={currentView == 'English'}
                  onSelect={() =>
                    handleLanguageSelect({
                      label: 'English',
                      value: 'english',
                    })
                  }
                />
              </View>

              <View style={styles.languageOption}>
                <RadioButton
                  label="हिंदी"
                  selected={currentView == 'Hindi'}
                  onSelect={() =>
                    handleLanguageSelect({
                      label: 'Hindi',
                      value: 'hindi',
                    })
                  }
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>
              {currentView == 'English' ? 'Confirm' : 'पुष्टि करें'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    minHeight: height * 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors?.black || '#000',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto-Medium',
  },
  languageContainer: {
    marginBottom: 40,
    marginHorizontal: 10,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  languageOption: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  confirmButton: {
    backgroundColor: AppColors?.mainColor || '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
  },
  // RadioButton Styles
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors?.mainColor || '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors?.mainColor || '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: AppColors?.black || '#000',
    fontFamily: 'Roboto-Medium',
  },
});

export default LanguageSelectionModal;
