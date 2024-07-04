import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const AgentLeadsModal = ({setAgentLeadsModal}) => {
  return (
    <View
      style={{
        backgroundColor: '#d9d9d9',
        margin: 20,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        
        shadowColor: '#d9d9d9',
      }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: '#16588e',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          margin: 10,
          borderWidth: 2,
          borderColor: 'white',
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
          color: 'black',
          paddingHorizontal: 20,
          paddingBottom: 20,
          letterSpacing: 0.5,
          fontSize: 18,
          fontFamily: 'Roboto-Regular',
          lineHeight: 25,
          fontWeight: '400',
        }}>
        As soon as you connect the driver to your network, the registration link
        will be sent to the driver via message. If you stay connected to your
        network and maintain contact, your network will grow larger, and you
        will benefit more.
      </Text>

      <TouchableOpacity
        onPress={() => setAgentLeadsModal(false)}
        style={{
          backgroundColor: '#16588e',
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
