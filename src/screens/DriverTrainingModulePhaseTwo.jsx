import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Dimensions} from 'react-native';
import {GET_ALL_TRAINING_MODULE_DATA} from '../apis/Apis';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';

const screenWidth = Dimensions.get('window').width;
const DriverTrainingModulePhaseTwo = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allTrainingData, setAllTrainingData] = useState([]);
  const [errors, setErrors] = useState({});
  const [language, setLanguage] = useState('hindi'); // Default language
  const [allTrainingDataEnglish, setAllTrainingDataEnglish] = useState([]);
  const [allTrainingDataHindi, setAllTrainingDataHindi] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // For modal visibility

  useEffect(() => {
    setIsVisible(true);
    getAllTrainingModuleData();
  }, []);

  const getAllTrainingModuleData = async () => {
    try {
      const response = await GET_ALL_TRAINING_MODULE_DATA({
        action: 'driver-traning-module-view',
        phase: 'APP Understanding', // second page
      });

      if (response?.status_code == 200) {
        setAllTrainingDataHindi(response.data_hindi || []);
        setAllTrainingDataEnglish(response.data_englisg || []);
        setAllTrainingData(response?.data_hindi || []);
      }
    } catch (error) {
      console.log('error======', error);
    }
  };

  const handleSelection = (questionIndex, optionIndex, option) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleLanguageChange = selectedLanguage => {
    setLanguage(selectedLanguage);
    setAllTrainingData(
      selectedLanguage === 'hindi'
        ? allTrainingDataHindi
        : allTrainingDataEnglish,
    );
  };

  const handleSubmit = () => {
    let newErrors = {};
    let allCorrect = true;

    allTrainingData.forEach((item, index) => {
      const selectedOption = selectedAnswers[index] || null; // Get selected answer text
      const correctAnswer = item.correct_answer?.trim(); // Ensure no extra spaces

      if (selectedOption !== correctAnswer) {
        newErrors[index] = true; // Mark question as incorrect
        allCorrect = false;
      }
    });

    setErrors(newErrors); // Only incorrect answers will be marked

    if (allCorrect) {
      navigation.navigate('DriverTrainingModulePhaseThree');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View
        style={{
          backgroundColor: '#16588e',
          width: '100%',
          paddingVertical: 30,
          borderRadius: 5,
          // margin: 20,
        }}>
        <Text
          style={{
            color: 'white',
            marginHorizontal: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Partner Trainning
        </Text>
      </View>
      <View style={styles.maincontainer}>
        {/** Steps */}
        <View style={styles.stepRow}>
          {[1, 2, 3].map((step, index) => (
            <View key={step} style={styles.stepContainer}>
              {/** Line Between Steps */}
              {index !== 0 && (
                <View
                  style={[
                    styles.line,
                    currentStep >= step && styles.activeLine,
                  ]}
                />
              )}

              {/** Step Circle */}
              <View
                style={[
                  styles.circle,
                  currentStep === step
                    ? styles.activeCircle
                    : styles.inactiveCircle,
                ]}>
                <Text
                  style={[
                    styles.stepText,
                    currentStep === step
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}>
                  {step}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.languageToggle}>
        <TouchableOpacity
          onPress={() => handleLanguageChange('hindi')}
          style={[
            styles.languageButton,
            language === 'hindi' && styles.selectedLanguage,
          ]}>
          <Text style={styles.languageText}>Hindi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLanguageChange('english')}
          style={[
            styles.languageButton,
            language === 'english' && styles.selectedLanguage,
          ]}>
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginHorizontal: 20}}>
        {allTrainingData?.length > 0 ? (
          allTrainingData.map((item, questionIndex) => (
            <View key={questionIndex} style={styles.questionContainer}>
              <Text
                style={[
                  styles.questionText,
                  errors[questionIndex] && {color: 'red'}, // Highlight incorrect question
                ]}>
                {`${questionIndex + 1}. ${item.question}`}
              </Text>

              {Object.values(item.options)
                .filter(option => option.trim() !== '') // Remove empty options
                .map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={styles.optionButton}
                    onPress={() =>
                      handleSelection(questionIndex, optionIndex, option)
                    }>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedAnswers[questionIndex] === option &&
                          styles.selectedRadio,
                      ]}
                    />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}

              {/* {errors[questionIndex] && (
                <Text style={{color: 'red', marginTop: 5}}>
                  Incorrect answer. Please try again.
                </Text>
              )} */}
            </View>
          ))
        ) : (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center'}}
            color={AppColors.mainColor}
          />
          // <Text style={{textAlign: 'center', marginTop: 20}}>
          //   No training data available
          // </Text>
        )}
        {allTrainingData?.length > 0 ? (
          <TouchableOpacity
            style={{
              padding: 10,
              paddingHorizontal: 30,
              backgroundColor: AppColors.mainColor,
              marginBottom: 50,
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white', fontSize: 20}}>Submit</Text>
          </TouchableOpacity>
        ) : null}
        <Modal visible={isVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>🎉 Training Step 1 Completed!</Text>
              <Text style={styles.message}>
                Your training has been finished successfully.
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  languageButton: {
    paddingVertical: 10,

    // borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    margin: 7,
  },
  selectedLanguage: {
    backgroundColor: 'white',
  },
  languageText: {
    color: '#000',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: AppColors.mainColor,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: AppColors.mainColor,
    borderColor: AppColors.mainColor,
  },
  optionText: {
    fontSize: 14,
  },
  maincontainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: screenWidth * 0.3, // 10% of screen width
    height: 2,
    backgroundColor: '#ccc',
  },

  activeLine: {
    backgroundColor: '#F5A623',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  activeCircle: {
    backgroundColor: '#F5A623',
    borderColor: '#F5A623',
  },
  inactiveCircle: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F5A623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: AppColors.black,
  },
  closeButton: {
    backgroundColor: AppColors.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverTrainingModulePhaseTwo;
