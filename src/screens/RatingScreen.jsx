import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import {AirbnbRating} from 'react-native-ratings';
import {AppColors} from '../assets/Colors';

const RatingScreen = ({navigation, route}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}>
        <View
          style={{
            backgroundColor: AppColors.mainColor,
            width: '90%',
            marginHorizontal: 15,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            padding: 10,
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '400',
              }}>
              Rate Your Customer
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
              borderColor: AppColors.mainColor,
              borderWidth: 2,
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <View style={{marginBottom: 10}}>
              <AirbnbRating
                count={5}
                reviews={['VERY BAD', 'Bad', 'AVERAGE', 'GOOD', 'LOVED IT']}
                defaultRating={0}
                size={20}
                //onFinishRating={ratingCompleted}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReviewScreen')}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginHorizontal: 20,
              marginBottom: 20,
              opacity: loading ? 0.5 : 1,
            }}
            disabled={loading}>
            <Text style={{color: 'grey', fontSize: 16}}>
              {loading ? 'Please wait...' : 'SUBMIT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;
