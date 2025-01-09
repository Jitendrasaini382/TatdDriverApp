import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import ConfirmReferFriendModal from './ConfirmReferFriendModal';
import {
  PERMANENT_REFER_ACCEPT_POPUP,
  PERMANENT_REFER_POPUP,
} from '../../apis/Apis';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const ReferFriendModal = ({setReferFriendModal, id}) => {
  const [friendName, setFriendName] = useState('');
  const [friendNumber, setFriendNumber] = useState('');
  const [loader, setLoader] = useState(false);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [confirmModal, setConfirmModal] = useState(false);
  const [permanentReferPopup, setPermanentReferPopup] = useState({});
  const [permanentReferAcceptPopup, setPermanentReferAcceptPopup] = useState(
    {},
  );

  const closeModalButton = () => {
    setConfirmModal(false);
    setReferFriendModal(false);
  };

  useEffect(() => {
    getPermanentReferPopup();
    getPermanentReferAcceptPopup(languageSwitch, id);
  }, [languageSwitch]);

  const getPermanentReferPopup = async () => {
    try {
      setLoader(true);

      const response = await PERMANENT_REFER_POPUP(languageSwitch);
      setPermanentReferPopup(response?.refer_popup_data);
      setLoader(false);
    } catch (error) {
      console.log(error, 'getPermanentReferPopup  Error');
    } finally {
      console.log('run finalyy');

      setLoader(false);
    }
  };

  const getPermanentReferAcceptPopup = async (languageSwitch, id) => {
    try {
      const response = await PERMANENT_REFER_ACCEPT_POPUP(languageSwitch, id);
      console.log(response, 'getPermanentReferAcceptPopupresponse');
      setPermanentReferAcceptPopup(response?.refer_popup_data);
    } catch (error) {
      console.log(error, 'getPermanentReferAcceptPopup  Error');
    }
  };

  const referFriend = () => {
    if (!friendName.trim()) {
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
    Keyboard.dismiss();
    setConfirmModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!loader ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setReferFriendModal(false)}>
            <Icon name="close" size={25} color={AppColors.white} />
            {/* <Text style={{color: AppColors.white, fontSize:25, fontWeight:"bold"}} >x</Text> */}
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.description}>
              {permanentReferPopup?.content}
            </Text>
          </View>

          <View style={styles.referSection}>
            <Text style={styles.sectionTitle}>
              {permanentReferPopup?.title}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                permanentReferPopup?.form_fields?.friend_name_placeholder
              }
              placeholderTextColor={'#999'}
              value={friendName}
              onChangeText={setFriendName}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'#999'}
              placeholder={
                permanentReferPopup?.form_fields?.friend_number_placeholder
              }
              value={friendNumber}
              onChangeText={setFriendNumber}
              keyboardType="number-pad"
              maxLength={10}
            />
            <TouchableOpacity style={styles.referButton} onPress={referFriend}>
              <Text style={styles.referButtonText}>
                {permanentReferPopup?.button_text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={closeModalButton}
        visible={confirmModal}>
        <ConfirmReferFriendModal
          closeModalButton={closeModalButton}
          friendName={friendName}
          friendNumber={friendNumber}
          id={id}
          data={permanentReferAcceptPopup}
        />
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
    fontSize: 19,
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
    backgroundColor: '#A6A6A6',
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
