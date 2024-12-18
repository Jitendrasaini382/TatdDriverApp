import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setModalVisible} from '../../redux/slices/trustedDriverSlice';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const OtrModal = () => {
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(setModalVisible(false));
  }, [dispatch]);

  return (
    // <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.topHeading}>What Is OTR?</Text>
            <Text style={styles.middleText}>OTR stands for On Time Reach.</Text>
            <Text style={styles.BottamText}>
              When you are sent to a customer, it is expected that you will
              reach on time. Your OTR increases when you reach on time,
              otherwise, it decreases.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={closeModal}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    borderRadius: 12,
    // maxWidth: 400,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: 'grey',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 13,
    borderWidth: 0.2,
    backgroundColor: AppColors.white,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: AppColors.mainColor,
    marginVertical: 15,
    fontSize: 20,
    fontFamily: 'Roboto-light',
    fontWeight: '700',
  },
  middleText: {
    marginVertical: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },
  BottamText: {
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
  },
  button: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
    alignSelf: 'flex-start',
  },
  buttonText: {color: AppColors.white},
});

export default React.memo(OtrModal);
