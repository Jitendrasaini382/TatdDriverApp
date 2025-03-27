import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const AgentLeadsModal = ({setAgentLeadsModal, data}) => {
  if (!data) return null;

  return (
    <View
      style={{
        backgroundColor: AppColors.gray,
        margin: 20,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},

        shadowColor: AppColors.gray,
      }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: AppColors.mainColor,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          margin: 10,
          borderWidth: 2,
          borderColor: AppColors.white,
        }}
        onPress={() => setAgentLeadsModal(false)}>
        <Text
          style={{
            color: AppColors.white,
            fontFamily: 'Roboto-Bold',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          x
        </Text>
        {/* <Icon name="close" size={20} color={AppColors.white} /> */}
      </TouchableOpacity>
      <Text
        style={{
          color: AppColors.black,
          paddingHorizontal: 20,
          paddingBottom: 20,
          letterSpacing: 0.5,
          fontSize: 18,
          fontFamily: AppFont.regularFont,
          lineHeight: 25,
          fontWeight: '400',
        }}>
        {data}
      </Text>

      <TouchableOpacity
        onPress={() => setAgentLeadsModal(false)}
        style={{
          backgroundColor: AppColors.mainColor,
          justifyContent: 'center',
          alignSelf: 'center',
          padding: 5,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginVertical: 20,
        }}>
        <Text
          style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold', fontSize: 15}}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgentLeadsModal;

const styles = StyleSheet.create({});
