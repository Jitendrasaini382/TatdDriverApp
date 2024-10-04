import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../assets/Colors';
import {TokenConstextApi} from '../../context/GlobalContext';
import {AppFont} from '../../assets/FontsFamily';
import ConfirmReferFriendModal from './ConfirmReferFriendModal';

const ReferFriendModal = ({setReferFriendModal}) => {
  const [friendName, setFriendName] = useState('');
  const [friendNumber, setFriendNumber] = useState('');
  const {decodedToken, setDecodedToken, jwtToken, languageSwitch} =
    useContext(TokenConstextApi);
  const [confirmModal, setConfirmModal] = useState(false);

  const closeModalButton = () => {
    setConfirmModal(false);
  };

  const referFriend = () => {
    if (!friendName) {
      Alert.alert('Please Enter Friend Name.');
      return;
    }
    if (!friendNumber) {
      Alert.alert('Please Enter Friend Mobile Number.');
      return;
    }
    if (friendNumber.length < 10) {
      Alert.alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setConfirmModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setReferFriendModal(false)}>
          <Icon name="close" size={25} color={AppColors.white} />
          {/* <Text style={{color: AppColors.white, fontSize:25, fontWeight:"bold"}} >x</Text> */}
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.description}>
            {languageSwitch == 'english'
              ? 'Now you can get this job for any of your acquaintances. Your acquaintance will be sent to the customer for an interview. If they pass the interview, their job will start, and you will receive a 250 Rs Hiring Bonus on the 7th day of their employment. \nThere is no need to register your friend in any way to get this job.'
              : 'अब आप, अपने किसी भी जानकार को यह नौकरी दिलवा सकते हैं। आपके जानकार को, कस्टमर के पास interview के लिए भेजा जाएगा। इंटरव्यू में पास होने पर, उनकी नौकरी शुरू हो जाएगी, नौकरी शुरू होने के 7 वे दिन आपको 250 Rs Hiring Bonus दिया जाएगा। \n इस नौकरी को पाने के लिए आपके दोस्त को किसी प्रकार का रजिस्ट्रेशन करवाने की जरूरत नहीं है।'}

            {/* Now you can get this job for any of your acquaintances. Your
            acquaintance will be sent to the customer for an interview. If they
            pass the interview, their job will start, and you will receive a 250
            Rs Hiring Bonus on the 7th day of their employment.
            {'\n\n'}
            There is no need to register your friend in any way to get this job. */}
          </Text>
        </View>

        <View style={styles.referSection}>
          <Text style={styles.sectionTitle}>Refer Your Friend</Text>

          <TextInput
            style={styles.input}
            placeholder={
              languageSwitch == 'english'
                ? "Your friend's name ?"
                : 'आपके दोस्त का नाम ?'
            }
            placeholderTextColor={'#999'}
            value={friendName}
            onChangeText={setFriendName}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder={
              languageSwitch == 'english'
                ? "Your friend's number ?"
                : 'आपके दोस्त का नंबर ?'
            }
            value={friendNumber}
            onChangeText={setFriendNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TouchableOpacity
            style={styles.referButton}
            onPress={referFriend}>
            <Text style={styles.referButtonText}>Refer Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={closeModalButton}
        visible={confirmModal}>
        <ConfirmReferFriendModal closeModalButton={closeModalButton} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: AppColors.mainColor,
    borderTopWidth: 1,
    borderTopColor: AppColors.mainColor,
    // paddingTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.white,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: AppColors.white,
    borderRadius: 15,
    shadowColor: AppColors.white,
    elevation: 5,
    borderWidth: 2,
    borderColor: AppColors.white,
  },
  description: {
    color: AppColors.black,
    // lineHeight: 20,
    fontSize: 16,
    fontFamily: AppFont.regularFont,
  },
  referSection: {
    backgroundColor: AppColors.mainColor,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: AppColors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    color: AppColors.black,
    marginBottom: 15,
    backgroundColor: AppColors.white,
  },
  referButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  referButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ReferFriendModal;
