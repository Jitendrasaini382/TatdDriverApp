import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {DRIVER_NOTIFICATION, VIEW_HEADLINE} from '../apis/Apis';

const {width, height} = Dimensions.get('window');

const AllNotificationComponent = () => {
  const [notificationData, setNotificationData] = useState([]);
  const navigation = useNavigation();

  const handleNotificationPress = notification => {
    navigation.navigate('NotificationDetail', {
      notificationId: notification.id,
      notification: notification,
    });
  };

  const getAllNotification = data => {
    DRIVER_NOTIFICATION(data)
      .then(response => {
        console.log(response.notifications, 'DRIVER NOTIFICATION data');
        setNotificationData(response.notifications);
      })
      .catch(err => {
        console.log(err, 'DRIVER NOTIFICATION error');
      });
  };

  useEffect(() => {
    getAllNotification({
      action: 'view_all_notifications',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {notificationData.map(notification => (
        <TouchableOpacity
          key={notification.id}
          style={styles.touchable}
          onPress={() => handleNotificationPress(notification)}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={
                notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
              }
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.previewText} numberOfLines={2}>
              {notification.message_preview ||
                notification.message.substring(0, 100) + '...'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const NotificationDetailScreen = ({route}) => {
  const {notificationId, notification} = route.params;
  const [id, setId] = useState({
    action: 'view_headline',
    id: notificationId,
  });

  const viewHeadline = async () => {
    await DRIVER_NOTIFICATION(id)
      .then(e => {
        console.log(e, 'VIEW_HEADLINE DATA');
      })
      .catch(err => {
        console.log(err, 'VIEW_HEADLINE error');
      });
  };

  useEffect(() => {
    console.log('Notification ID:', notificationId);
    viewHeadline();
  }, [notificationId]);

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.detailIdText}>Notification ID: {notificationId}</Text> */}
        <Text style={styles.detailText}>{notification.message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllNotificationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  touchable: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flex: 1,
  },
  previewText: {
    fontSize: 14,
    color: '#666666',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  // detailIdText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#333333',
  //   marginBottom: 10,
  // },
  detailText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
});
