import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import {AppColors} from '../assets/Colors';

const SuspensionInactivationRequest = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Language Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedLanguage === 'Hindi' && styles.selectedButton,
            ]}
            onPress={() => setSelectedLanguage('Hindi')}>
            <Text
              style={[
                styles.text,
                selectedLanguage === 'Hindi' && styles.selectedText,
              ]}>
              Hindi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedLanguage === 'English' && styles.selectedButton,
            ]}
            onPress={() => setSelectedLanguage('English')}>
            <Text
              style={[
                styles.text,
                selectedLanguage === 'English' && styles.selectedText,
              ]}>
              English
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.lockedText}>Account Locked</Text>
        <Text style={styles.title}>Why is your account locked?</Text>
        <Text style={styles.description}>
          • You did not follow the TAT D guidelines.
        </Text>
        <Text style={styles.description}>
          • To keep your account active, you must completeat least one ride
          every 7 days
        </Text>
        <Text style={styles.description}>
          • Your account will automatically be unlocked after 7 days
        </Text>
        <Text style={styles.footerText}>Keep your journey going! 🚀</Text>
        <Text style={styles.bold}>TAT D - Trusted and Trained Driver</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          // onPress={() =>
          //   Alert.alert(
          //     'Confirmation',
          //     'Do you agree to complete at least one booking in the next 7 days?',
          //     [
          //       {text: 'No', style: 'cancel'},
          //       {text: 'Yes, I Agree', onPress: () => console.log('Agreed')},
          //     ],
          //   )
          // }
          style={styles.unlockButton}>
          <Text style={styles.unlockButtonText}>Please Unlock</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={false} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, .5)',
          }}>
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: AppColors.white,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20}}>
              Do you agree to complete at least one booking in the next 7 days?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: AppColors.whatsAppIconColor,
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Yes, I Agree
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: AppColors.red,
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  lockedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: AppColors.black,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    width: '100%',
    marginBottom: 5,
    color: AppColors.black,
  },
  bold: {
    fontWeight: 'bold',

    color: AppColors.black,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  footerText: {
    marginTop: 10,
    fontSize: 14,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    color: AppColors.black,
    alignSelf: 'flex-start',
  },
  unlockButton: {
    backgroundColor: '#16588e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  unlockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuspensionInactivationRequest;
