import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {RightArrow_White} from '../assets/images';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';

const SelectYourCity = ({route, navigation}) => {
  const {state} = route.params;

  const citiesByState = {
    Delhi: [
      'Central Delhi',
      'East Delhi',
      'North Delhi',
      'South Delhi',
      'West Delhi',
    ],
    Haryana: ['Faridabad', 'Gurgaon', 'Manesar'],
    Karnataka: ['Bangalore'],
    Maharashtra: ['Mumbai', 'Navi Mumbai', 'Pune', 'Thane'],
    Telangana: ['Hyderabad'],
    'Uttar Pradesh': ['Ghaziabad', 'Greater Noida', 'Noida'],
  };

  const cities = citiesByState[state] || [];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Your City</Text>
        </View>
        <View style={styles.buttonContainer}>
          {cities.map((city, index) => (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("AgentLeads")
              }}
              key={index}
              style={styles.button}>
              <Text style={styles.buttonText}>{city}</Text>
              <Image
                style={styles.arrowImage}
                resizeMode="center"
                source={RightArrow_White}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    padding: 25,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    borderRadius: 15,
    margin: 25,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    color: AppColors.mainColor,
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#005a8c',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: AppFont.regularFont,
  },
  arrowImage: {width: 18, height: 18},
});

export default SelectYourCity;
