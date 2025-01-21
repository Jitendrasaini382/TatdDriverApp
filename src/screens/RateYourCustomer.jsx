import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {AirbnbRating} from 'react-native-ratings';
import {AppColors} from '../assets/Colors';
import {RATE_YOUR_CUSTOMER} from '../apis/Apis';
import {useSelector} from 'react-redux';

const RateYourCustomer = ({navigation, route}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const {bookingNumber} = route?.params;

  const handleRatingCompleted = selectedRating => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    // return false;

    setLoading(true);
    try {
      const response = await RATE_YOUR_CUSTOMER({
        action: 'rating_detail',
        booking_id: bookingNumber,
        rate: rating,
        current_language: languageSwitch,
        message: '',
      });

      if (response?.status_code == 200) {
        navigation.navigate('RateYourCustomerFeedback', {
          rate: rating,
          bookingNumber: bookingNumber,
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //   return (
  //     <SafeAreaView style={{flex: 1}}>
  //       <Header backButton={true} />
  //       <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
  //         <View
  //           style={{
  //             backgroundColor: AppColors.mainColor,
  //             width: '90%',
  //             marginHorizontal: 15,
  //             borderTopRightRadius: 10,
  //             borderTopLeftRadius: 10,
  //             padding: 10,
  //           }}>
  //           <View style={{padding: 10}}>
  //             <Text
  //               style={{
  //                 color: 'white',
  //                 fontSize: 18,
  //                 fontWeight: '400',
  //               }}>
  //               Rate Your Customer
  //             </Text>
  //           </View>
  //         </View>
  //         <View
  //           style={{
  //             borderLeftWidth: 3,
  //             borderRightWidth: 3,
  //             borderBottomWidth: 3,
  //             borderLeftColor: AppColors.mainColor,
  //             borderRightColor: AppColors.mainColor,
  //             borderBottomColor: AppColors.mainColor,
  //             width: '90%',
  //             borderBottomLeftRadius: 10,
  //             borderBottomRightRadius: 10,
  //           }}>
  //           <View
  //             style={{
  //               borderColor: AppColors.mainColor,
  //               borderWidth: 2,
  //               marginHorizontal: 20,
  //               marginVertical: 20,
  //             }}>
  //             <View style={{marginBottom: 10}}>
  //               <AirbnbRating
  //                 count={5}
  //                 reviews={['VERY BAD', 'Bad', 'AVERAGE', 'GOOD', 'LOVED IT']}
  //                 defaultRating={0}
  //                 size={20}
  //                 onFinishRating={handleRatingCompleted}
  //               />
  //             </View>
  //           </View>
  //           <TouchableOpacity
  //             onPress={handleSubmit}
  //             style={{
  //               justifyContent: 'flex-end',
  //               alignItems: 'flex-end',
  //               marginHorizontal: 20,
  //               marginBottom: 20,
  //               opacity: loading ? 0.5 : 1,
  //             }}>
  //             <Text style={{color: 'grey', fontSize: 16}}>
  //               {loading ? 'Please wait...' : 'SUBMIT'}
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </SafeAreaView>
  //   );
  // };

  // export default RateYourCustomer;

  //////////

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Rate Your Customer</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingBox}>
          <View style={styles.ratingInner}>
            <AirbnbRating
              count={5}
              reviews={['VERY BAD', 'Bad', 'AVERAGE', 'GOOD', 'LOVED IT']}
              defaultRating={0}
              size={40}
              onFinishRating={handleRatingCompleted}
              showRating
            />
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, {opacity: loading ? 0.7 : 1}]}
            disabled={loading}>
           <Text style={styles.submitText}>
              {loading ? 'Please wait...' : 'SUBMIT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  headerBox: {
    backgroundColor: AppColors.mainColor,
    width: '90%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  ratingBox: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: AppColors.mainColor,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ratingInner: {
    marginBottom: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: AppColors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RateYourCustomer;
