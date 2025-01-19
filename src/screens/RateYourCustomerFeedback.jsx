import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {RATE_YOUR_CUSTOMER} from '../apis/Apis';
import {useSelector} from 'react-redux';

const RateYourCustomerFeedback = ({navigation, route}) => {
  const {rate, bookingNumber} = route?.params;
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [message, setMessage] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    // if (!message.trim()) {
    //   alert('Please enter a message before submitting.');
    //   return;
    // }

    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await RATE_YOUR_CUSTOMER({
        action: 'rating_detail',
        booking_id: bookingNumber,
        rate: rate,
        current_language: languageSwitch,
        message: message.trim(),
      });

      console.log(response, 'submitRating API response');
      setLoading(false);
      if (response?.status_code == 200) {
        navigation.navigate('RateUsAtSocialMedia', {
          bookingNumber: bookingNumber,
        });
      }
    } catch (err) {
      console.log(err, 'submitRating API error');
      setError('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <Header backButton={true} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="always">
            <View style={{flex: 1}}>
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: AppColors.mainColor,
                    width: '90%',
                    marginHorizontal: 15,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}>
                  <View style={{padding: 10, marginBottom: 10}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      What did the TAT D impress you with ?
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderLeftWidth: 3,
                    borderRightWidth: 3,
                    borderBottomWidth: 3,
                    borderLeftColor: AppColors.mainColor,
                    borderRightColor: AppColors.mainColor,
                    borderBottomColor: AppColors.mainColor,
                    width: '90%',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <View
                    style={{
                      margin: 15,
                      marginTop: 50,
                      borderBottomWidth: 2,
                      borderColor: AppColors.mainColor,
                    }}>
                    <TextInput
                      placeholder="Tell us more"
                      placeholderTextColor={'black'}
                      style={{color: 'black'}}
                      value={message}
                      onChangeText={text => setMessage(text)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={submitRating}
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                    disabled={loading}>
                    <Text style={{color: 'grey', fontSize: 14}}>
                      {loading ? 'Please wait...' : 'SUBMIT'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RateYourCustomerFeedback;
