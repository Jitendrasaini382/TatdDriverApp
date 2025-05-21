import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {SAVE_REFER_PERMANENT} from '../../apis/Apis';
import {useSelector} from 'react-redux';

const ConfirmReferFriendModal = ({
  closeModalButton,
  friendName,
  friendNumber,
  id,
  data,
}) => {
  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [saveReferPermanent, setSaveReferPermanent] = useState();

  const bookingData = {
    action: 'permanent_booking_refer_accept_insert',
    current_language: languageSwitch,
    friend_number: friendNumber,
    friend_name: friendName,
    driver_name: decodedToken?.driver_name,
    driver_mobile_number: decodedToken?.driver_mobile_number,
    P_ID: id,
  };

  const handleSaveReferPermanent = async () => {
    try {
      const response = await SAVE_REFER_PERMANENT(bookingData);

      if (response?.status_code == 200) {
        Alert.alert('', response?.message || '', [
          {
            text: 'OK',
            onPress: () => {
              closeModalButton();
            },
          },
        ]);
      }
      setSaveReferPermanent(response);
    } catch (error) {}
  };
  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>{data?.title}</Text>
        <View style={styles.listContainer}>
          {Array.isArray(data?.points) &&
            data.points.map((point, index) => (
              <Text
                key={index}
                style={[styles.listItem, index === 6 ? styles.warning : null]}>
                {index + 1}. {point}
              </Text>
            ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={closeModalButton} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{data?.cancel_button}</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSaveReferPermanent()}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>{data?.refer_button}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 30,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    color: AppColors.black,
    fontSize: 18,
  },
  warning: {
    color: AppColors.red,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AppColors.black,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: AppFont.regularFont,
  },
  applyButtonText: {
    color: AppColors.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: AppFont.regularFont,
  },
});

export default ConfirmReferFriendModal;
