import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ToggleButton from '../components/ToggleButton';
import {OneWayIcon} from '../assets/images';
import Header from '../components/Header';
import AllNotificationComponent from '../components/AllNotificationsDetails';

const DriverNotifications = ({navigation}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <View style={{}}>
        <Header backButton={true} />
        {/* <HeaderNotification /> */}
        <ToggleButton
          button1Label="NOTIFICATIONS"
          button2Label="NOTICE BOARD"
        />
        {/* {button1Label === "NOTIFICATIONS"? <Eeeeeeeeeeeeeeeeeeeeeeeeeee/> : null} */}
        {/* <Eeeeeeeeeeeeeeeeeeeeeeeeeee /> */}
        <AllNotificationComponent/>


      </View>
   
      <TouchableOpacity onPress={() => console.warn('Clear All Notification')}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'rgb(255,165,0)',
            padding: 25,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: 27,
          }}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
            CLEAR ALL NOTIFICATIONS
          </Text>
          <Image
            style={{resizeMode: 'center', height: 30, width: 33}}
            source={OneWayIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DriverNotifications;

const styles = StyleSheet.create({});
