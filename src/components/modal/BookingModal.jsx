import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {useDispatch} from 'react-redux';
import {setBookingModal} from '../../redux/slices/trustedDriverSlice';

const BookingModal = ({data}) => {
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(setBookingModal(false));
  }, [dispatch]);

  const isDataValid = data && Object.keys(data).length > 0;

  if (!isDataValid) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{marginBottom: 30}}>
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

            <Text style={styles.topHeading}>{data?.body?.line1}</Text>
            <Text style={styles.topHeading}>{data?.body?.line2}</Text>
            <Text style={styles.topHeading}>{data?.body?.line3}</Text>
            <Text style={styles.topHeading}>{data?.body?.line4}</Text>
            <Text style={styles.topHeading}>{data?.body?.line5}</Text>
            {/* {bulletPoints.map(renderBulletPoint)} */}
            <Text style={styles.subHeading}>{data?.title}</Text>
            <Text style={styles.BottamText}>{data?.body?.p}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={closeModal}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(BookingModal);

const styles = StyleSheet.create({
  mainContainer: {flex: 1,borderColor:"black",borderWidth:1},
  subHeading: {
    color: AppColors.mainColor,
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '700',
  },

  contentContainer: {
    elevation: 1,
    padding: 10,
    backgroundColor: AppColors.white,
    paddingLeft: 15,
    borderWidth: 0.2,
  },
  topHeading: {
    justifyContent: 'center',
    color: AppColors.silverGrey,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '400',
  },
  middleText: {
    marginTop: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
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
    marginTop: 5,
  },
  button: {
    marginBottom: 5,
    marginTop: 30,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
    alignSelf: 'center',
  },
  buttonText: {color: AppColors.white},
});
