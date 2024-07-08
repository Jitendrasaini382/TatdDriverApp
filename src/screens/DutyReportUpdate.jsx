import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';

const DutyReportUpdate = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header backButton={true} />
      <View
        style={{
          marginTop: 30,
          padding: 10,
        }}>
        <View style={styles.mainView}>
          <View style={{padding: 14, alignItems: 'flex-start'}}>
            <Text
              style={{
                textAlign: 'auto',
                color: AppColors.black,
                fontWeight: '700',
                fontSize: 21,
                fontFamily: 'Poppins',
              }}>
              Booking is Already Cancelled{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DutyReportUpdate;

const styles = StyleSheet.create({
  mainView: {
    borderColor: 'rgb(128,128,128)',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    lineHeight: 20,
    shadowColor: 'rgb(128,128,128)',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 5,
    elevation: 5,
    shadowRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
});
