import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {
  RATE_US_SOCIAL_MEDIA,
  RATE_US_SOCIAL_MEDIA_VIEW_DATA,
} from '../apis/Apis';
import {useSelector} from 'react-redux';

const RateUsAtSocialMedia = ({route, navigation}) => {
  const {bookingNumber} = route?.params;

  const [viewData, setViewData] = useState({});
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  console.log(
    languageSwitch,
    'languageSwitchlanguageSwitch rate us social media',
  );

  useEffect(() => {
    GetAllSocialMediaData(bookingNumber);
  }, []);

  const submitRating = url => {
    if (!url) {
      console.error('Social media link is missing.');
      return;
    }
    try {
      // Simulate API call or rating submission
      console.log('Submitting rating for booking number:', bookingNumber);
      rateusSocialMedia(bookingNumber);
      // Open the provided URL
      Linking.openURL(url)
        .then(() => console.log('URL opened successfully:', url))
        .catch(err => console.error('Error opening URL:', err));
    } catch (error) {
      console.error('Error during rating submission:', error);
    }
  };

  const GetAllSocialMediaData = async number => {
    console.log(number, 'b number');

    try {
      const response = await RATE_US_SOCIAL_MEDIA_VIEW_DATA({
        booking_id: number,
        utype: 'Driver',
      });
      setViewData(response);
      console.log(response, 'GetAllSocialMediaData Api response');
    } catch (error) {
      console.log(error, 'GetAllSocialMediaData Api error - Error');
    }
  };

  const rateusSocialMedia = async number => {
    try {
      const response = await RATE_US_SOCIAL_MEDIA({
        action: 'rate_us',
        booking_id: number,
        plateform: 'google',
        utype: 'Driver',
        current_language: languageSwitch,
      });

      console.log(response, 'rateusSocialMedia Api response');
    } catch (error) {
      console.log(error, 'rateusSocialMedia Api error - Error');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Header backButton={true} />
        <View style={styles.container}>
          <Text style={styles.feedbackText}>{viewData?.content1}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.inspirationText}>{viewData?.content2}</Text>
          <Text
            style={{marginHorizontal: 15, alignSelf: 'center', fontSize: 14}}>
            {viewData?.content3}
          </Text>
          <TouchableOpacity
            onPress={() => submitRating(viewData?.social_link)}
            style={styles.button}>
            <Text style={styles.buttonText}>Review as at Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RateUsAtSocialMedia;

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
    // alignSelf: 'center',
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