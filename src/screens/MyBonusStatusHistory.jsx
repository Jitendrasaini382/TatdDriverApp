import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import MyBonus from '../components/Eeeeeeeeeeeeeeeeeeeeeeeeeee';

const MyBonusStatusHistory = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor:'white'}}>
      <Header backButton="true" />
      <ScrollView>
      <View
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'white'
        }}>
        {/* <ClearMyDue/> */}
        <MyBonus />
      </View>
      </ScrollView>
    </View>
  );
};

export default MyBonusStatusHistory;

const styles = StyleSheet.create({});
