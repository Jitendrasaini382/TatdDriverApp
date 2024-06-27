import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../components/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import ClearMyDue from '../components/ClearMyDue';

const ClearMyDuePayment = () => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <Header backButton={true} />
      <View
        style={{
          marginTop: 30,
          padding: 10,
        }}>
        {/* <View style={styles.mainView}>
          <View style={{padding: 14, alignItems: 'flex-start'}}>
            <Text
              style={{
                textAlign: 'auto',
                color: 'black',
                fontWeight: '700',
                fontSize: 21,
                fontFamily: 'Poppins',
              }}>
              Clear My Due
            </Text>
          </View>
        </View> */}
        <ClearMyDue/>

        <View style={{marginTop: 20}}>
          <YoutubePlayer height={600} autoPlay={false} videoId={'SsG_qwb0zLs'} />
        </View>
      </View>
    </SafeAreaView>
  );
};


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

export default ClearMyDuePayment;