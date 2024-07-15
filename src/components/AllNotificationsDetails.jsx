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

  const getAllNotification = () => {
    DRIVER_NOTIFICATION({
      action: 'view_all_notifications',
    })
      .then(response => {
        console.log(response.notifications, 'DRIVER NOTIFICATION data');
        setNotificationData(response.notifications);
      })
      .catch(err => {
        console.log(err, 'DRIVER NOTIFICATION error');
      });
  };

  useEffect(() => {
    getAllNotification();
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
    await VIEW_HEADLINE(id)
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

// import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { CloseEnvelop, OpenEnvelop } from '../assets/images';
// import { useNavigation } from '@react-navigation/native';
// import Header from './Header';
// import { DRIVER_NOTIFICATION } from '../apis/Apis';

// const { width, height } = Dimensions.get('window');

// const AllNotificationComponent = () => {
//   const [notificationData, setNotificationData] = useState([]);
//   const navigation = useNavigation();

//   // const notificationData = [
//   //   {
//   //     id: 1978314,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-15 11:54:18',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-15 11:54:18',
//   //     end_date: '2024-07-16 21:30:00',
//   //     created_by: 'Vaishali Verma',
//   //     message:
//   //       "Booking Number - 429612<br>आपकी टिकट ID 129447 का समाधान हो गया है। अभी पढ़ें। \n\n<b>आपका प्रश्न</b> -  Internal purpose testing team  <br><span style='font-size: 12px;'> - 15 Jul, 11:53:AM </span> \n\n<b>हमारा उत्तर </b>-   <br><span style='font-size: 12px;'> - 15 Jul, 11:54:AM </span> \n\n ",
//   //     clicks: 0,
//   //     support_id: 129447,
//   //     closure_by: 'Vaishali Verma',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'unread',
//   //   },
//   //   {
//   //     id: 1978309,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-15 11:53:09',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-15 11:53:09',
//   //     end_date: '2024-07-16 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>à¤¡à¤¿à¤…à¤° MOHIT DHANAWAT, à¤†à¤ªà¤•à¥€ ticket ID à¤¨à¤‚à¤¬à¤° à¤¹à¥ˆ 129447, à¤†à¤ªà¤•à¥€ ticket à¤•à¤¾ à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤…à¤—à¤²à¥‡ 24 à¤˜à¤‚à¤Ÿà¥‡ à¤®à¥‡à¤‚ à¤•à¤° à¤¦à¤¿à¤¯à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤\r\n            \r\n            à¤†à¤ªà¤•à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨ -  Internal purpose testing team  <br><span style=\\'font-size: 12px;\\'> - 15 Jul, 11:53:AM , By Trusted Driver </span> \r\n            \r\n            à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤®à¥‡à¤‚ à¤¦à¥‡à¤°à¥€ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤†à¤ª à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚ 9810338108 à¤ªà¤° à¤”à¤° à¤…à¤ªà¤¨à¥€ ticket ID à¤¬à¤¤à¤¾à¤à¤‚à¥¤ ",
//   //     clicks: 0,
//   //     support_id: 0,
//   //     closure_by: '',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'unread',
//   //   },
//   //   {
//   //     id: 1967842,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-12 20:11:12',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-12 20:11:12',
//   //     end_date: '2024-07-13 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>आपकी टिकट ID 128599 का समाधान हो गया है। अभी पढ़ें। \n\n<b>आपका प्रश्न</b> -  Internal purpose only for the same to you and  <br><span style='font-size: 12px;'> - 12 Jul, 19:20:PM </span> \n\n<b>हमारा उत्तर </b>-   <br><span style='font-size: 12px;'> - 12 Jul, 20:11:PM </span> \n\n ",
//   //     clicks: 1,
//   //     support_id: 128599,
//   //     closure_by: 'Ravi Jaiswal',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'read',
//   //   },
//   //   {
//   //     id: 1964776,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-12 19:20:20',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-12 19:20:20',
//   //     end_date: '2024-07-13 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>à¤¡à¤¿à¤…à¤° MOHIT DHANAWAT, à¤†à¤ªà¤•à¥€ ticket ID à¤¨à¤‚à¤¬à¤° à¤¹à¥ˆ 128599, à¤†à¤ªà¤•à¥€ ticket à¤•à¤¾ à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤…à¤—à¤²à¥‡ 24 à¤˜à¤‚à¤Ÿà¥‡ à¤®à¥‡à¤‚ à¤•à¤° à¤¦à¤¿à¤¯à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤\r\n            \r\n            à¤†à¤ªà¤•à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨ -  Internal purpose only for the same to you and  <br><span style=\\'font-size: 12px;\\'> - 12 Jul, 19:20:PM , By Trusted Driver </span> \r\n            \r\n            à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤®à¥‡à¤‚ à¤¦à¥‡à¤°à¥€ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤†à¤ª à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚ 9810338108 à¤ªà¤° à¤”à¤° à¤…à¤ªà¤¨à¥€ ticket ID à¤¬à¤¤à¤¾à¤à¤‚à¥¤ ",
//   //     clicks: 1,
//   //     support_id: 0,
//   //     closure_by: '',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'read',
//   //   },
//   // ];

//   const handleNotificationPress = (index) => {

//     navigation.navigate('NotificationDetail', { notification: notificationData[index] ,  });
//   };

//   const getAllNotification = () => {
//     DRIVER_NOTIFICATION({
//       action: 'view_all_notifications',
//     })
//       .then((response) => {
//         console.log(response.notifications, 'DRIVER NOTIFICATION data');
//         setNotificationData(response.notifications);
//       })
//       .catch((err) => {
//         console.log(err, 'DRIVER NOTIFICATION error');
//       });
//   };

//   useEffect(() => {
//     getAllNotification();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {notificationData.map((notification, index) => (
//         <TouchableOpacity
//           key={notification.id}
//           style={styles.touchable}
//           onPress={() => handleNotificationPress(index)}>
//           <View style={styles.iconContainer}>
//             <Image
//               style={styles.icon}
//               resizeMode="contain"
//               source={notification.status === 'unread' ? CloseEnvelop : OpenEnvelop}
//             />
//           </View>
//           <View style={styles.textContainer}>
//             <Text style={styles.previewText} numberOfLines={2}>
//               {notification.message_preview || notification.message.substring(0, 100) + '...'}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// export const NotificationDetailScreen = ({ route }) => {
//   const { notification } = route.params;

//   return (
//     <SafeAreaView style={styles.fullScreenContainer}>
//       <Header backButton={true} />
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.detailText}>{notification.message}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AllNotificationComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   touchable: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     backgroundColor: '#ffffff',
//   },
//   iconContainer: {
//     marginRight: 15,
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 30,
//     height: 30,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   previewText: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#333333',
//     lineHeight: 24,
//   },
// });

// // import React, {useEffect, useState} from 'react';
// // import {
// //   Image,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   SafeAreaView,
// //   StatusBar,
// //   ScrollView,
// //   Dimensions,
// // } from 'react-native';
// // import {CloseEnvelop, OpenEnvelop} from '../assets/images';
// // import {useNavigation} from '@react-navigation/native';
// // import Header from './Header';
// // import {AppColors} from '../assets/Colors';
// // import {AppFont} from '../assets/FontsFamily';
// // import {DRIVER_NOTIFICATION} from '../apis/Apis';

// // const {width, height} = Dimensions.get('window');
// // const designWidth = width;
// // const designHeight = height;

// // const scale = size => (width / designWidth) * size;
// // const verticalScale = size => (height / designHeight) * size;
// // const moderateScale = (size, factor = 0.5) =>
// //   size + (scale(size) - size) * factor;

// // const AllNotificationComponent = () => {
// //   // const [notificationData, setNotificationData] = useState([]);

//   // const notificationData = [
//   //   {
//   //     id: 1978314,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-15 11:54:18',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-15 11:54:18',
//   //     end_date: '2024-07-16 21:30:00',
//   //     created_by: 'Vaishali Verma',
//   //     message:
//   //       "Booking Number - 429612<br>आपकी टिकट ID 129447 का समाधान हो गया है। अभी पढ़ें। \n\n<b>आपका प्रश्न</b> -  Internal purpose testing team  <br><span style='font-size: 12px;'> - 15 Jul, 11:53:AM </span> \n\n<b>हमारा उत्तर </b>-   <br><span style='font-size: 12px;'> - 15 Jul, 11:54:AM </span> \n\n ",
//   //     clicks: 0,
//   //     support_id: 129447,
//   //     closure_by: 'Vaishali Verma',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'unread',
//   //   },
//   //   {
//   //     id: 1978309,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-15 11:53:09',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-15 11:53:09',
//   //     end_date: '2024-07-16 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>à¤¡à¤¿à¤…à¤° MOHIT DHANAWAT, à¤†à¤ªà¤•à¥€ ticket ID à¤¨à¤‚à¤¬à¤° à¤¹à¥ˆ 129447, à¤†à¤ªà¤•à¥€ ticket à¤•à¤¾ à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤…à¤—à¤²à¥‡ 24 à¤˜à¤‚à¤Ÿà¥‡ à¤®à¥‡à¤‚ à¤•à¤° à¤¦à¤¿à¤¯à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤\r\n            \r\n            à¤†à¤ªà¤•à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨ -  Internal purpose testing team  <br><span style=\\'font-size: 12px;\\'> - 15 Jul, 11:53:AM , By Trusted Driver </span> \r\n            \r\n            à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤®à¥‡à¤‚ à¤¦à¥‡à¤°à¥€ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤†à¤ª à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚ 9810338108 à¤ªà¤° à¤”à¤° à¤…à¤ªà¤¨à¥€ ticket ID à¤¬à¤¤à¤¾à¤à¤‚à¥¤ ",
//   //     clicks: 0,
//   //     support_id: 0,
//   //     closure_by: '',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'unread',
//   //   },
//   //   {
//   //     id: 1967842,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-12 20:11:12',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-12 20:11:12',
//   //     end_date: '2024-07-13 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>आपकी टिकट ID 128599 का समाधान हो गया है। अभी पढ़ें। \n\n<b>आपका प्रश्न</b> -  Internal purpose only for the same to you and  <br><span style='font-size: 12px;'> - 12 Jul, 19:20:PM </span> \n\n<b>हमारा उत्तर </b>-   <br><span style='font-size: 12px;'> - 12 Jul, 20:11:PM </span> \n\n ",
//   //     clicks: 1,
//   //     support_id: 128599,
//   //     closure_by: 'Ravi Jaiswal',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'read',
//   //   },
//   //   {
//   //     id: 1964776,
//   //     notification_bucket: '',
//   //     headline_type: 'Driver Ticket',
//   //     category: 'Private Driver',
//   //     timestamp: '2024-07-12 19:20:20',
//   //     booking_id: '',
//   //     driver_name: 'MOHIT DHANAWAT',
//   //     driver_mobile_number: '8118813148',
//   //     start_date: '2024-07-12 19:20:20',
//   //     end_date: '2024-07-13 21:30:00',
//   //     created_by: 'Trusted Driver',
//   //     message:
//   //       "Booking Number - 429612<br>à¤¡à¤¿à¤…à¤° MOHIT DHANAWAT, à¤†à¤ªà¤•à¥€ ticket ID à¤¨à¤‚à¤¬à¤° à¤¹à¥ˆ 128599, à¤†à¤ªà¤•à¥€ ticket à¤•à¤¾ à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤…à¤—à¤²à¥‡ 24 à¤˜à¤‚à¤Ÿà¥‡ à¤®à¥‡à¤‚ à¤•à¤° à¤¦à¤¿à¤¯à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤\r\n            \r\n            à¤†à¤ªà¤•à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨ -  Internal purpose only for the same to you and  <br><span style=\\'font-size: 12px;\\'> - 12 Jul, 19:20:PM , By Trusted Driver </span> \r\n            \r\n            à¤¸à¤®à¤¾à¤§à¤¾à¤¨ à¤®à¥‡à¤‚ à¤¦à¥‡à¤°à¥€ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤†à¤ª à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚ 9810338108 à¤ªà¤° à¤”à¤° à¤…à¤ªà¤¨à¥€ ticket ID à¤¬à¤¤à¤¾à¤à¤‚à¥¤ ",
//   //     clicks: 1,
//   //     support_id: 0,
//   //     closure_by: '',
//   //     tag_ticket: '',
//   //     rate: 0,
//   //     remarks: '',
//   //     closure_timestamp: '0000-00-00 00:00:00',
//   //     message_preview: '',
//   //     status: 'read',
//   //   },
//   // ];

// //   const navigation = useNavigation();

// //   const handleNotificationPress = index => {
// //     navigation.navigate('NotificationDetail', {index});
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       {notificationData.map((notification, index) => (
// //         <TouchableOpacity
// //           key={notification.id}
// //           style={styles.touchable}
// //           onPress={() => onNotificationPress(index)}>
// //           <View style={styles.iconContainer}>
// //             {console.log(notification.id, 'iiiiiiiiiiiiiiiii')}
// //             <Image
// //               style={styles.icon}
// //               resizeMode="contain"
// //               source={
// //                 notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
// //               }
// //             />
// //           </View>
// //           <View style={styles.textContainer}>
// //             {/* <Text style={styles.headlineText} numberOfLines={1}>
// //               {notification.headline_type}
// //             </Text> */}
// //             <Text style={styles.previewText} numberOfLines={2}>
// //               {notification.message_preview ||
// //                 notification.message.substring(0, 100) + '...'}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       ))}
// //     </ScrollView>
// //   );
// //   // return <NotificationList onNotificationPress={handleNotificationPress} />;

// //   const NotificationList = ({onNotificationPress}) => {};

// //   const getAllNotification = () => {
// //     DRIVER_NOTIFICATION({
// //       action: 'view_all_notifications',
// //     })
// //       .then(e => {
// //         console.log(e.notifications, 'DRIVER NOTIFICATION data');
// //         setNotificationData(e.notifications);
// //       })
// //       .catch(err => {
// //         console.log(err, 'DRIVER NOTIFICATION error');
// //       });
// //   };

// //   useEffect(() => {
// //     // getAllNotification();
// //   }, []);
// // };

// // export const NotificationDetailScreen = ({route}) => {
// //   const {index} = route.params;
// //   const NotificationDetail = ({index}) => {
// //     const notification = notifications[index];
// //     return (
// //       <SafeAreaView style={styles.fullScreenContainer}>
// //         <Header backButton={true} />
// //         <ScrollView
// //           style={styles.scrollView}
// //           contentContainerStyle={styles.contentContainer}>
// //           {/* <Text style={styles.detailHeadline}>{notification.headline_type}</Text> */}
// //           {/* <Text style={styles.detailTimestamp}>{notification.timestamp}</Text> */}
// //           <Text style={styles.detailText}>{notification.message}</Text>
// //         </ScrollView>
// //       </SafeAreaView>
// //     );
// //   };
// //   return <NotificationDetail index={index} />;
// // };

// // export default AllNotificationComponent;

// // const styles = {
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   touchable: {
// //     flexDirection: 'row',
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#e0e0e0',
// //     backgroundColor: '#ffffff',
// //   },
// //   iconContainer: {
// //     marginRight: 15,
// //     justifyContent: 'center',
// //   },
// //   icon: {
// //     width: 30,
// //     height: 30,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   headlineText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //     marginBottom: 5,
// //   },
// //   previewText: {
// //     fontSize: 14,
// //     color: '#666666',
// //   },
// //   fullScreenContainer: {
// //     flex: 1,
// //     backgroundColor: '#ffffff',
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   contentContainer: {
// //     padding: 20,
// //   },
// //   detailHeadline: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333333',
// //     marginBottom: 10,
// //   },
// //   detailTimestamp: {
// //     fontSize: 14,
// //     color: '#666666',
// //     marginBottom: 15,
// //   },
// //   detailText: {
// //     fontSize: 16,
// //     color: '#333333',
// //     lineHeight: 24,
// //   },
// // };
