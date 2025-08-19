import React, {useState, useCallback} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import ToggleButton from '../components/ToggleButton';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import AllNoticeBoardDetails from '../components/AllNoticeBoardDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
const DriverNotice = ({navigation}) => {
  const [currentView, setCurrentView] = useState('NOTICE BOARD');

  const handleToggle = useCallback(
    label => {
      setCurrentView(label);
      if (label === 'NOTIFICATIONS') {
        navigation.navigate('DriverNotifications');
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <ToggleButton
            button1Label="NOTIFICATIONS"
            button2Label="NOTICE BOARD"
            onToggle={handleToggle}
            initialState="NOTICE BOARD"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.headingHindi}>जरूरी जानकारी।</Text>
          <AllNoticeBoardDetails />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  headerContainer: {
    // paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  headingHindi: {
    color: AppColors.black,
    fontSize: 15,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
