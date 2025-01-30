import React, {useState, useCallback} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ToggleButton from '../components/ToggleButton';
import Header from '../components/Header';
import AllNotificationComponent from '../components/AllNotificationsDetails';
import {AppColors} from '../assets/Colors';
import {DRIVER_NOTIFICATION} from '../apis/Apis';
import {RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const DriverNotifications = ({navigation}) => {
  const [currentView, setCurrentView] = useState('NOTIFICATIONS');
  const [refreshing, setRefreshing] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  const handleToggle = useCallback(
    label => {
      setCurrentView(label);
      if (label === 'NOTICE BOARD') {
        navigation.navigate('DriverNotice');
      }
    },
    [navigation],
  );

  // const notificationData = useSelector(e => e?.globalSlice?.notificationData);
  const dispatch = useDispatch();

  const getAllNotification = async data => {
    try {
      const response = await DRIVER_NOTIFICATION(data);
      setNotificationData(response.notifications);
    } catch (error) {
    } finally {
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getAllNotification({
        action: 'view_all_notifications',
        offset: 0,
        limit: 10,
      });
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
          <ToggleButton
            button1Label="NOTIFICATIONS"
            button2Label="NOTICE BOARD"
            onToggle={handleToggle}
            initialState="NOTIFICATIONS"
          />
        </View>

        <View style={styles.contentContainer}>
          <AllNotificationComponent data={notificationData} />
        </View>
      </ScrollView>

      {/* <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearAllNotifications}>
        <Text style={styles.clearButtonText}>CLEAR ALL NOTIFICATIONS</Text>
        <Image style={styles.clearButtonIcon} source={OneWayIcon} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

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
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,165,0)',
    padding: 20,
  },
  clearButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  clearButtonIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
});

export default DriverNotifications;
