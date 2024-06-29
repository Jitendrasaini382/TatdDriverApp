import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        // justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        //   paddingBottom: 5,
        //   marginTop: 40
      }}>
      <View
        style={{
          margin: 5,
          // justifyContent: 'flex-end',

          marginRight: 17,
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 5,
          borderColor: 'rgb(204,204,204)',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: AppColors.black,
              margin: 5,
              opacity: 0.8,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
