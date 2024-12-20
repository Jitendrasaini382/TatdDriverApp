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
} from 'react-native';
import Header from '../components/Header';
import { AppColors } from '../assets/Colors';
const ReviewScreen = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView   style={{flex: 1}} >
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <Header backButton={true} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: '600',
                      }}></Text>
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
                    // onPress={fetchRatingDetails}
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

export default ReviewScreen;
