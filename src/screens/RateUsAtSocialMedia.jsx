import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  useEffect(() => {
    GetAllSocialMediaData(bookingNumber);
  }, []);

  const submitRating = url => {
    if (!url) {
      return;
    }
    try {
      rateusSocialMedia(bookingNumber);
      Linking.openURL(url);
    } catch (error) {}
  };

  const GetAllSocialMediaData = async number => {
    try {
      const response = await RATE_US_SOCIAL_MEDIA_VIEW_DATA({
        booking_id: number,
        utype: 'Driver',
      });
      setViewData(response);
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Header
          backButton={true}
          customeNavigation={{
            name: 'DutyReportUpdate',
            params: {
              bookingNumber: bookingNumber,
              state: '',
            },
          }}
        />

        <View style={styles.container}>
          <Text style={styles.feedbackText}>{viewData?.content1}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.inspirationText}>{viewData?.content2}</Text>

          <TouchableOpacity
            onPress={() => submitRating(viewData?.social_link)}
            style={styles.button}>
            <Text style={styles.buttonText}>{viewData?.content3}</Text>
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
    color: AppColors.black,
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
