import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
import { AppColors } from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

const OtrModal = ({setModalVisible}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.topHeading}>What Is OTR?</Text>
          <Text style={styles.middleText}>OTR stands for On Time Reach.</Text>
          <Text style={styles.BottamText}>
            When you are sent to a customer, it is expected that you will reach
            on time. Your OTR increases when you reach on time, otherwise, it
            decreases.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtrModal;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    borderRadius: 10,
    // maxWidth: 400,
    padding: 20,
    shadowColor: 'grey',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 13,
    // padding: 10,
    backgroundColor: AppColors.white,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#195788',
    marginVertical: 15,
    fontSize: 20,
    fontFamily: 'Roboto-Black',
    fontWeight: '100',
  },
  middleText: {
    marginVertical: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color:AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  BottamText: {
    color:AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
  },
  button: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#195788',
    alignSelf: 'flex-start',
  },
  buttonText: {color: AppColors.white},
});
