import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import { AppColors } from '../assets/Colors';
const Feedback = () => {
  return (
    <SafeAreaView  style={{flex: 1}} >
      <View style={styles.mainContainer}>
      <Header backButton={true} />
      <View style={styles.container}>
          <Text style={styles.feedbackText}>
            Your feedback is invaluable to us, and we'd love for you to share
            your positive experience with others on Google
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.inspirationText}>
            "Your Voice, Our Insipiration: Share Your
          </Text>
          <Text
            style={{marginHorizontal: 15, alignSelf: 'center', fontSize: 14}}>
            Review and Shape Our Success!"
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Review as at Google</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: AppColors.mainColor,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  feedbackText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
  },
  inspirationText: {
    color: 'black',
    fontSize: 13,
    alignSelf: 'center',
    //padding:60
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  reviewContainer: {
    padding: 50,
  },
});
