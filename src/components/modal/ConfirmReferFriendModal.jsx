import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {TokenConstextApi} from '../../context/GlobalContext';

const ConfirmReferFriendModal = ({closeModalButton}) => {
  const {languageSwitch} = useContext(TokenConstextApi);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>
          {languageSwitch == 'english'
            ? 'Please refer your friend with care - '
            : 'कृपया अपने दोस्त को तभी refer करें -'}
        </Text>

        {/* <Text style={styles.subHeader}>
          यह एक Private नौकरी है, Apply for this job only if
        </Text> */}

        {languageSwitch == 'english' ? (
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              1. If your friend is above 25 years old.
            </Text>
            <Text style={styles.listItem}>
              2. If their home is within 5 KM from the customer's home, which is
              in jannaram post office .
            </Text>
            <Text style={styles.listItem}>
              3. If they have no hesitation in cleaning the car.
            </Text>
            <Text style={styles.listItem}>
              4. If they have experience driving XUV 700 Atomatic.
            </Text>
            <Text style={styles.listItem}>
              5. If your acquaintance is willing to work for 26 days, 12 Hours,
              and a salary of 21000₹.
            </Text>
            <Text style={styles.listItem}>
              6. They are available for an interview of 2 hours on 04 Oct, at
              11:00 AM.
            </Text>
            <Text style={[styles.listItem, styles.warning]}>
              7. Do not refer anyone without reason, as it will negatively
              impact your record, and you may not be able to add any driver to
              the company in the future.
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              1. यदि आपके दोस्त की उम्र 25 वर्ष से अधिक है।
            </Text>
            <Text style={styles.listItem}>
              2. उनका घर कस्टमर के घर से 5 KM के अंदर है। जो की pitampura में
              है।
            </Text>
            <Text style={styles.listItem}>
              3. उन्हें गाडी की साफ़ सफाई करने में किसी प्रकार की हिचकिचाहट नहीं
              है।
            </Text>
            <Text style={styles.listItem}>
              4. उन्हें Audi and Maruti A-Star गाडी चलाने का तजुर्बा है।
            </Text>
            <Text style={styles.listItem}>
              5. यदि आपके जानकार 26 days , 10 Hours , 18500₹ सैलरी पर काम करने
              के लिए सहमत हैं ?
            </Text>
            <Text style={styles.listItem}>
              6.वह 2 घंटे के interview के लिए 04 Oct, 10:00 AM समय पर available
              हैं।
            </Text>
            <Text style={[styles.listItem, styles.warning]}>
              7. बिना वजह किसी को भी refer ना करें, ऐसा करने से आपका रिकॉर्ड
              ख़राब होगा और आगे चलकर आप, किसी भी ड्राइवर को कंपनी के साथ जोड़ नहीं
              पाएंगे।
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Pressable onPress={closeModalButton} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert('Are You Confirm');
            }}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Refer</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex:1,
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
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 30,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
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
    color: 'red',
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
