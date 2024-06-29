import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
import { AppColors } from '../assets/Colors';
const {width, height} = Dimensions.get('window');

const RatingModal = ({setRatingModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setRatingModal(false)}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.topHeading}>Rating </Text>
          <Text style={styles.topText}>
            Dear MOHIT DHANAWAT, If your Rating Score is more than 4, then you
            will:
          </Text>
          <Text style={styles.middleText}>
            1 - See bookings immediately on the panel; otherwise, they will
            appear late.
          </Text>
          <Text style={styles.middleText}>
            2 - Be notified via SMS when new bookings come in your area.
          </Text>
          <Text style={styles.middleText}>
            3 - If your Rating Score is more than 4 and your Booking Score is
            more than 70%, you can see and take more than one booking in a day.
          </Text>
          <Text style={styles.BottamText}>
          To increase your Rating, provide customers with a good experience.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setRatingModal(false)}>
            <Text style={styles.buttonText}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    elevation: 13,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#195788',
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'Roboto-Regular',
  },
  topText: {
    marginVertical: 10,
    textAlign: 'left',
    // justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  middleText: {
    // marginVertical: 5,
    textAlign: 'left',
    // justifyContent: 'flex-start',
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
    // marginBottom: 15,
  },
  button: {
    marginVertical: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#195788',
    alignSelf: 'flex-start',
  },
  buttonText: {color: AppColors.white},
});
