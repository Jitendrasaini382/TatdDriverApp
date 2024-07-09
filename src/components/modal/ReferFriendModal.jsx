import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../assets/Colors';

const ReferFriendModal = ({setReferFriendModal}) => {
  const [friendName, setFriendName] = useState('');
  const [friendNumber, setFriendNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setReferFriendModal(false)}>
          <Icon name="close" size={20} color={AppColors.white} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.description}>
            Now you can get this job for any of your acquaintances. Your
            acquaintance will be sent to the customer for an interview. If they
            pass the interview, their job will start, and you will receive a 250
            Rs Hiring Bonus on the 7th day of their employment.
            {'\n\n'}
            There is no need to register your friend in any way to get this job.
          </Text>
        </View>

        <View style={styles.referSection}>
          <Text style={styles.sectionTitle}>Refer Your Friend</Text>

          <TextInput
            style={styles.input}
            placeholder="Your friend's name?"
            placeholderTextColor={'#999'}
            value={friendName}
            onChangeText={setFriendName}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor={'#999'}
            placeholder="Your friend's number?"
            value={friendNumber}
            onChangeText={setFriendNumber}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.referButton}>
            <Text style={styles.referButtonText}>Refer Now</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    // paddingTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.white,
    zIndex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: AppColors.white,
    borderRadius: 20,
    shadowColor: AppColors.white,
    elevation: 5,
    borderWidth:2,
    borderColor:AppColors.white
  },
  description: {
    color: AppColors.black,
    // lineHeight: 20,
    fontSize: 15
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
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    color: AppColors.black,
    marginBottom: 15,
    backgroundColor: AppColors.white,
  },
  referButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  referButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ReferFriendModal;

