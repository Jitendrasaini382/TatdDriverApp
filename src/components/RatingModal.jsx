import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const RatingModal = ({setRatingModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setRatingModal(false)}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.topHeading}>Rating </Text>
          <Text style={styles.middleText}>Dear Mohit DHANAWAT, If your Rating Score is more than 4, then you will</Text>
          <Text style={styles.BottamText}>
            When you are sent to a customer, it is expected that you will reach
            on time. Your OTR increases when you reach on time, otherwise, it
            decreases.
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
    elevation: 3,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingLeft: 15,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#195788',
    paddingTop: 5,
    fontSize: 20,
    fontWeight: '600',
  },
  middleText: {
    marginTop: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '400',
  },
  BottamText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5,
    // marginBottom: 15,
  },
  button: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#195788',
    alignSelf: 'flex-start',
  },
  buttonText: {color: '#fff'},
});
