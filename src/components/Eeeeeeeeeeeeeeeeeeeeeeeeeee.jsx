// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';

// const dummyData = [
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
//   { id: '121785', date: '22 Jun, 11:08 AM', status: 'Closed' },
 
// ];

// const TicketList = () => {
//   const renderItem = ({ item, index }) => (
//     <View style={[styles.row, index === 0 && styles.firstRow]}>
//       <View style={styles.cell}>
//         <Text style={styles.cellText}>{item.id}</Text>
//       </View>
//       <View style={[styles.cell, styles.middleCell]}>
//         <Text style={styles.cellText}>{item.date}</Text>
//       </View>
//       <View style={styles.cell}>
//         <View style={[styles.statusButton, index === 0 && styles.firstStatusButton]}>
//           <Text style={[styles.statusText, index === 0 && styles.firstStatusText]}>{item.status}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerCell}>
//           <Text style={styles.headerText}>Ticket ID</Text>
//         </View>
//         <View style={[styles.headerCell, styles.middleHeaderCell]}>
//           <Text style={styles.headerText}>Created Date</Text>
//         </View>
//         <View style={styles.headerCell}>
//           <Text style={styles.headerText}>Status</Text>
//         </View>
//       </View>
//       <FlatList
//         data={dummyData}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: 'rgb(204, 204, 204)',
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: 'rgb(204, 204, 204)',
//     backgroundColor: '#f8f8f8',
//   },
//   headerCell: {
//     flex: 1,
//     padding: 10,
//   },
//   middleHeaderCell: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: 'rgb(204, 204, 204)',
//   },
//   headerText: {
//     color: '#888',
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: 'rgb(204, 204, 204)',
//   },
//   firstRow: {
//     backgroundColor: '#f0f8ff',
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//   },
//   middleCell: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: 'rgb(204, 204, 204)',
//   },
//   cellText: {
//     color: '#333',
//   },
//   statusButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   firstStatusButton: {
//     backgroundColor: '#1e90ff',
//   },
//   statusText: {
//     color: '#333',
//   },
//   firstStatusText: {
//     color: 'white',
//   },
// });

// export default TicketList;











// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import {OpenEnvelop} from '../assets/images';
// import {useNavigation} from '@react-navigation/native';
// import Header from './Header';

// const notificationData = [
//   'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्र...',
//   "Important Job Interview Alert! Dear MOHIT DHANAWAT, Please Reach The Customer's House On Time And Upon Meet...",
//   'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
// ];

// const showNotificationData = [
//   {
//     texts: [
//       'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्रभाव सीधा आपकी रेटिंग्स पर पड़ा है, जिसकी वजह से आगे चलकर आपको कंपनी से काम मिलने मैं परेशानी हो सकती है ।',
//       'समय का पालन करें और अपने रेटिंग बरक़रार रखते हुए ज्यादा से ज्यादा कमाए ।',
//       'कृप्या अपनी और कस्टमर की सेफ्टी के लिए मास्क ज़रुर लगाए और गाड़ी को सैनिटीज़ करे।',
//       'www.tatd.in',
//     ],
//   },
//   {
//     texts: [
//       'Important Job Interview Alert!',
//       "Dear MOHIT DHANAWAT, please reach the customer's house on time and upon meeting the customer, take the OTP and press the start button. Doing so will increase the customer's trust in you and will increase the chances of you getting the job.",
//       'Remember, it is mandatory to take the OTP and press the start button as soon as you meet the customer. Failing to do this will result in the company rejecting you, and you will not be sent for any job henceforth.',
//       'Do not forget to press the End button after the interview is over.',
//       'Interview Time - 10:00 AM ,26 Jun 2024',
//       'Have a good day. Thank you.',
//       'www.tatd.in',
//     ],
//   },
//   {
//     texts: [
//       'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
//       '1- बुकिंग उठाने के बाद उस बुकिंग पर न जाने पर Service पार्टनर का अकाउंट 5 से 21 दिन तक के लिए Inactive हो जाता है और इस बीच Service पार्टनर को किसी भी प्रकार का काम कंपनी नहीं दे पाती।',
//       '2- बुकिंग पूरी होने पर कस्टमर से फीडबैक लिया जाता है, फीडबैक ख़राब मिलने पर Service पार्टनर की ID कुछ दिनों के लिए बंद कर दी जाती है। कृपया कस्टमर को बेहतर services प्रदान करें।',
//       '3- यदि बुकिंग के बाद आपकी ज्यादातर बुकिंग्स कैंसल होती है या फिर आपका बुकिंग स्कोर 70 % से नीचे गया तो आपको 15 मिनट देरी से बुकिंग दिखेगी ।',
//       'हमारा यह मानना है की Service पार्टनर का काम चुनौतियों से भरा है, सर्विस देते वक़्त Service पार्टनर्स को कई तरीके की असाधारण चुनौतियों का सामना करना पड़ता है,',
//       'हमारा यह भी मानना है की कस्टमर्स, Service पार्टनर्स को तभी बुक करते हैं, जब उन्हें Service पार्टनर की बेहद जरूरत होती है। यह सुनिश्चित करना हमारा फ़र्ज़ है, की हम समय से कस्टमर के पास पहुंचे और भरोसे पर खरा उतरें ।',
//       'हमे उम्मीद है आप बेहतर काम करेंगे। ध्यान रहे हमारा काम कस्टमर की परेशानी कम करने का है , परेशानी बढ़ाने का नहीं।',
//       'कंपनी की शुरुआत Nov 2019 से हुई थी। कंपनी का उद्देश्य है भरोसेमंद Service पार्टनर्स द्वारा कस्टमर्स को बेहतर services प्रदान करना और Service पार्टनर्स को ज्यादा से ज्यादा रोजगार प्रदान करना।',
//       'हम तीन तरह की services कस्टमर को देते हैं।',
//       'हम तीन तरह की services कस्टमर को देते हैं। , दूसरी - आउटस्टेशन बुकिंग्स , तीसरी- मंथली बुकिंग्स',
//       'लोकल बुकिंग्स में कस्टमर 1 घंटे से 12 घंटे तक की Round trip बुकिंग करते हैं या फिर 1 से 60 KM की OneWay बुकिंग्स करते हैं',
//       'ऑउटस्टेऑन बुकिंग्स में कस्टमर लम्बी दूरी की बुकिंग्स Round Trip या One Way बुकिंग्स करते हैं',
//       'मंथली बुकिंग्स में कस्टमर्स Service पार्टनर को तनख्वाह पर रखते हैं।',
//       'MOHIT DHANAWAT जी, लोकल बुकिंग्स और आउटस्टेशन बुकिंग्स पर कम्पनी का कमीशन 20 % से 10% होता है। कमीशन GST हटा के बचे हुए बिल पर लगता है।, ओवरटाइम 1.5 Rs पर मिनट के हिसाब से दिया जाता है और रात में गाड़ी चलाने पर 150 Rs नाईट चार्ज दिया जाता है। ओवरटाइम और नाईट चार्ज पूरा Service पार्टनर को दिया जाता है, इसमें कम्पनी का कोई कमीशन नहीं होता है।',
//       'यदि आप कम्पनी के साथ लगातार काम करते हैं तो लोकल और आउटस्टेशन बुकिंग्स पर आपका कमीशन कुछ इस प्रकार से कम होता है।',
//     ],
//   },
// ];

// const NotificationList = ({onNotificationPress}) => {
//   return (
//     <View style={styles.container}>
//       {notificationData.map((notification, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.touchable}
//           onPress={() => onNotificationPress(index)}>
//           <View style={styles.iconContainer}>
//             <Image
//               style={styles.icon}
//               resizeMode="contain"
//               source={OpenEnvelop}
//             />
//           </View>
//           <View style={styles.textContainer}>
//             <Text style={styles.indexText} numberOfLines={1}>
//               {notification}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const NotificationDetail = ({index}) => {
//   return (
//     <SafeAreaView style={styles.fullScreenContainer}>
//       <StatusBar barStyle="dark-content" />
//       <Header backButton={true} />
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentContainer}>
//         {showNotificationData[index].texts.map((text, i) => (
//           <Text key={i} style={styles.detailText}>
//             {text}
//           </Text>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const NotificationComponent = () => {
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const navigation = useNavigation();

//   const handleNotificationPress = index => {
//     setSelectedNotification(index);
//     navigation.navigate('NotificationDetail', {index});
//     // navigation.navigate("AgentLogin");
//   };

//   return <NotificationList onNotificationPress={handleNotificationPress} />;
// };

// export const NotificationDetailScreen = ({route}) => {
//   const {index} = route.params;
//   return <NotificationDetail index={index} />;
// };

// export default NotificationComponent;

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 20,
//     alignItems: 'flex-start', // This is now correctly applied
//   },
//   detailText: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Regular',
//     color: 'black',
//     marginBottom: 10,
//   },

//   container: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: 'white',
//   },
//   touchable: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginBottom: 5,
//   },
//   iconContainer: {
//     marginRight: 10,
//     paddingTop: 2,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   indexText: {
//     fontSize: 15,
//     fontFamily: 'Roboto-Regular',
//     color: 'black',
//   },
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   detailContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   largeIcon: {
//     width: 60,
//     height: 60,
//     marginBottom: 20,
//   },
//   detailText: {
//     fontSize: 20,
//     fontFamily: 'Roboto-Regular',
//     color: 'black',
//     textAlign: 'center',
//     padding: 20,
//   },
// });

// // import React, {useState} from 'react';
// // import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// // import {OpenEnvelop} from '../assets/images';

// // const notificationData = [
// //   'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्र...',
// //   "Important Job Interview Alert! Dear MOHIT DHANAWAT, Please Reach The Customer's House On Time And Upon Meet...",
// //   'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
// // ];

// // const showNotificationData = [
// //   'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्रभाव सीधा आपकी रेटिंग्स पर पड़ा है, जिसकी वजह से आगे चलकर आपको कंपनी से काम मिलने मैं परेशानी हो सकती है ।',
// //   "Important Job Interview Alert! Dear MOHIT DHANAWAT, Please Reach The Customer's House On Time And Upon Meeting the customer, take the OTP and press the start button. Doing so will increase the customer's trust in you and will increase the chances of you getting the job.",
// //   'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
// // ];

// // const NotificationComponent = () => {
// //   const [selectedNotification, setSelectedNotification] = useState(null);

// //   const handleNotificationPress = index => {
// //     setSelectedNotification(index);
// //   };

// //   if (selectedNotification !== null) {
// //     return (
// //       <View style={styles.container}>
// //         <TouchableOpacity
// //           style={styles.touchable}
// //           onPress={() => setSelectedNotification(null)}>
// //           <View style={styles.iconContainer}>
// //             <Image
// //               style={styles.icon}
// //               resizeMode="contain"
// //               source={OpenEnvelop}
// //             />
// //           </View>
// //           <View style={styles.textContainer}>
// //             <Text style={styles.indexText}>
// //               {showNotificationData[selectedNotification]}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {notificationData.map((notification, index) => (
// //         <TouchableOpacity
// //           key={index}
// //           style={styles.touchable}
// //           onPress={() => handleNotificationPress(index)}>
// //           <View style={styles.iconContainer}>
// //             <Image
// //               style={styles.icon}
// //               resizeMode="contain"
// //               source={OpenEnvelop}
// //             />
// //           </View>
// //           <View style={styles.textContainer}>
// //             <Text style={styles.indexText} numberOfLines={1}>
// //               {notification}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );
// // };

// // export default NotificationComponent;

// // const styles = StyleSheet.create({
// //   container: {
// //     // flex: 1,
// //     padding: 10,
// //     margin: 10,
// //     backgroundColor: 'white',
// //   },
// //   touchable: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //     marginBottom: 5,
// //   },
// //   iconContainer: {
// //     marginRight: 10,
// //     paddingTop: 2,
// //   },
// //   icon: {
// //     width: 20,
// //     height: 20,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   indexText: {
// //     fontSize: 15,
// //     fontFamily: 'Roboto-Regular',
// //     color: 'black',
// //   },
// // });
