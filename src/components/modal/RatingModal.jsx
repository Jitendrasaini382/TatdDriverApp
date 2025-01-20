import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setRatingModal} from '../../redux/slices/trustedDriverSlice';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const RatingModal = ({data}) => {
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(setRatingModal(false));
  }, [dispatch]);

  const isDataValid = data && Object.keys(data).length > 0;

  if (!isDataValid) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.topHeading}>{data?.title}</Text>
            <Text style={styles.topText}>{data?.body?.line1}</Text>
            <Text style={styles.topText}>{data?.body?.line2}</Text>
            <Text style={styles.topText}>{data?.body?.line3}</Text>
            <Text style={styles.topText}>{data?.body?.line4}</Text>
            <Text style={styles.topText}>{data?.body?.line5}</Text>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default React.memo(RatingModal);

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    padding: 10,
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 0.2,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: AppColors.mainColor,
    marginVertical: 15,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: AppFont.regularFont,
  },
  topText: {
    marginVertical: 10,
    textAlign: 'left',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  middleText: {
    textAlign: 'left',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  BottamText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 15,
  },
  button: {
    marginVertical: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
    alignSelf: 'center',
  },
  buttonText: {color: AppColors.white},
});
