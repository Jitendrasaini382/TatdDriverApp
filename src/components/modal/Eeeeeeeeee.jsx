// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import {AppFont} from '../../assets/FontsFamily';
// import { AppColors } from '../../assets/Colors';
// import { RightArrow_White } from '../../assets/images';

// const states = [
//   'Delhi',
//   'Haryana',
//   'Karnataka',
//   'Maharashtra',
//   'Telangana',
//   'Uttar Pradesh',
// ];

// const State = () => {
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           borderBottomWidth: 2,
//           borderBottomColor: '#16588e',
//           alignSelf: 'flex-start',
//         }}>
//         <Text style={styles.title}>Select Your State</Text>
//       </View>
//       <View style={{marginTop: 25}}>
//         {states.map((state, index) => (
//           <TouchableOpacity key={index} style={styles.button}>
//             <Text style={styles.buttonText}>{state}</Text>
//             <Image 
//               style={styles.arrowImage}
//             resizeMode='center'
//             source={RightArrow_White}  />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 25,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     borderRadius: 15,
//     margin: 25,
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 20,
//     paddingBottom: 10,
//     color: '#16588e',
//     fontFamily: AppFont.regularFont,
//     fontWeight: '500',
//   },
//   button: {
//     backgroundColor: '#005a8c',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: AppFont.regularFont,
//     borderBottomWidth: .5,
//     borderBottomColor: "white"
//   },
//   arrowImage : {width: 18, height: 18, }
 
// });

// export default State;

// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import { RightArrow } from '../../assets/images';

// const states = [
//   'Delhi',
//   'Haryana',
//   'Karnataka',
//   'Maharashtra',
//   'Telangana',
//   'Uttar Pradesh',
// ];

// const StateSelector = () => {
//   const [selectedState, setSelectedState] = useState(null);

//   return (
//     <View style={styles.container}>
//       <View style={{borderBottomWidth:1}}>

//       <Text style={styles.title}>Select Your State</Text>
//       </View>
//       {states.map(state => (
//         <TouchableOpacity
//           key={state}
//           style={styles.stateButton}
//           onPress={() => setSelectedState(state)}>
//           <Text style={styles.stateButtonText}>{state}</Text>
//           <Image
//             source={require('../../assets/images/arrow-right-white-tatd.png')}
//             style={styles.arrow}  />

//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     // backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#16588e',
//     width: '80%',
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//     // paddingBottom:5
//   },
//   stateButton: {
//     backgroundColor: '#16588e',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   stateButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },

// });

// export default StateSelector;

// // import React from 'react';
// // import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
// // import Icon from 'react-native-vector-icons/dist/FontAwesome';
// // import { Linking } from 'react-native';

// // const DATA = [
// //   {phone: '9595856995', date: '02 Jun 2024 17:51 PM', amount: '283 Rs'},
// //   {phone: '9500551047', date: '29 Mar 2024 10:39 AM', amount: '55 Rs'},
// //   {phone: '961007344', date: '09 Apr 2024 07:35 AM', amount: '119 Rs'},
// //   {phone: '909794411', date: '02 Jan 2024 09:06 AM', amount: '28 Rs'},
// //   {phone: '901966369', date: '03 Oct 2023 14:52 PM', amount: '67 Rs'},
// //   {phone: '968992293', date: '17 Jun 2024 17:34 PM', amount: '143 Rs'},
// //   {phone: '9717253684', date: '04 Aug 2023 15:51 PM', amount: '255 Rs'},
// // ];

// // const ListItem = ({phone, date, amount}) => (
// //   <View style={styles.itemContainer}>
// //     <View style={{flexDirection: 'row'}}>
// //       <Text style={styles.phoneText}>{phone}</Text>
// //       <Text style={styles.dateText}>{date}</Text>
// //     </View>
// //     <View
// //       style={{
// //         flexDirection: 'row',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //       }}>
// //       <Text style={styles.amountText}>{amount}</Text>
// //       <TouchableOpacity onPress={openWhatsApp} >

// //       <Icon color={'#34a728'} name="whatsapp" />
// //       </TouchableOpacity>
// //     </View>
// //   </View>
// // );

// // 'whatsapp://send?phone=+123456789&text=Hello'

// // const openWhatsApp = () => {
// //     // let url = 'whatsapp://send?text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
// //     let url = 'whatsapp://send?phone=+919810360792&text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
// //     Linking.openURL(url)
// //       .then((data) => {
// //         console.log('WhatsApp Opened');
// //       })
// //       .catch(() => {
// //         console.log('Make sure WhatsApp is installed on your device');
// //       });
// //   };

// // const DataListComponent = () => {
// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={DATA}
// //         renderItem={({item}) => <ListItem {...item} />}
// //         keyExtractor={item => item.phone}
// //         contentContainerStyle={styles.listContent}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     // flex: 1,
// //     backgroundColor: 'white',
// //     padding: 10,
// //   },
// //   listContent: {
// //     paddingVertical: 5,
// //   },
// //   itemContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 5,
// //   },
// //   phoneText: {
// //     fontSize: 15,
// //     color: '#878787',
// //     fontWeight: "bold",
// //     marginHorizontal: 1,
// //   },
// //   dateText: {
// //     fontSize: 14,
// //     color: '#a5a5a5',
// //     marginHorizontal: 8,
// //   },
// //   amountText: {
// //     fontSize: 14,
// //     color: '#a5a5a5',
// //     marginRight: 15,
// //   },
// // });

// // export default DataListComponent;
// ///////////////////////////////////////////////////////////////
// // import React from 'react';
// // import { View, Text, StyleSheet, FlatList } from 'react-native';

// // const dummyData = [
// //   { id: '1', number: '9958586999', date: '23 Jun, 2024 17:01 PM', amount: '880 Rs' },
// //   { id: '2', number: '9205531389', date: '23 Apr, 2024 08:51 AM', amount: '35 Rs' },
// //   { id: '3', number: '9810017344', date: '05 Apr, 2024 07:53 AM', amount: '110 Rs' },
// //   { id: '4', number: '9891794411', date: '10 Jan, 2024 09:06 AM', amount: '36 Rs' },
// //   { id: '5', number: '9312866369', date: '29 Oct, 2023 14:59 PM', amount: '57 Rs' },
// //   { id: '6', number: '9582892293', date: '17 Jun, 2024 17:46 PM', amount: '163 Rs' },
// //   { id: '7', number: '7317253684', date: '05 Aug, 2022 12:51 PM', amount: '250 Rs' },
// // ];

// // const WalletData = () => {
// //   const renderItem = ({ item }) => (
// //     <View style={styles.itemContainer}>
// //       <Text style={styles.number}>{item.number}</Text>
// //       <Text style={styles.date}>{item.date}</Text>
// //       <Text style={styles.amount}>{item.amount}</Text>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={dummyData}
// //         renderItem={renderItem}
// //         keyExtractor={item => item.id}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     // flex: 1,
// //     padding: 10,
// //   },
// //   itemContainer: {
// //     backgroundColor: '#fff',
// //     padding: 10,
// //     borderRadius: 8,
// //     marginBottom: 10,
// //     borderColor: '#ddd',
// //     borderWidth: 1,
// //   },
// //   number: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   date: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   amount: {
// //     fontSize: 14,
// //     color: '#000',
// //   },
// // });

// // export default WalletData;

// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // const ReferFriendModal = ({setReferFriendModal}) => {
// //   const [friendName, setFriendName] = useState('');
// //   const [friendNumber, setFriendNumber] = useState('');

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <View style={styles.container}>
// //         <TouchableOpacity
// //           style={styles.closeButton}
// //           onPress={() => setReferFriendModal(false)}>
// //           <Icon name="close" size={20} color="white" />
// //         </TouchableOpacity>
// //         <View style={styles.content}>
// //           <Text style={styles.description}>
// //             Now you can get this job for any of your acquaintances. Your
// //             acquaintance will be sent to the customer for an interview. If they
// //             pass the interview, their job will start, and you will receive a 250
// //             Rs Hiring Bonus on the 7th day of their employment.
// //             {'\n\n'}
// //             There is no need to register your friend in any way to get this job.
// //           </Text>
// //         </View>

// //         <View style={styles.referSection}>
// //           <Text style={styles.sectionTitle}>Refer Your Friend</Text>

// //           <TextInput
// //             style={styles.input}
// //             placeholder="Your friend's name?"
// //             placeholderTextColor={'#999'}
// //             value={friendName}
// //             onChangeText={setFriendName}
// //           />

// //           <TextInput
// //             style={styles.input}
// //             placeholderTextColor={'#999'}
// //             placeholder="Your friend's number?"
// //             value={friendNumber}
// //             onChangeText={setFriendNumber}
// //             keyboardType="phone-pad"
// //           />

// //           <TouchableOpacity style={styles.referButton}>
// //             <Text style={styles.referButtonText}>Refer Now</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     // backgroundColor: 'rgba(0,0,0,0.5)',
// //     justifyContent: 'flex-end',
// //   },
// //   container: {
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     backgroundColor: '#16588e',
// //     // paddingTop: 20,
// //   },
// //   closeButton: {
// //     position: 'absolute',
// //     top: -15,
// //     right: 15,
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: '#16588e',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: 'white',
// //     zIndex: 1,
// //   },
// //   content: {
// //     padding: 20,
// //     backgroundColor: 'white',
// //     borderRadius: 20,
// //     shadowColor: "white",
// //     elevation: 5,
// //     borderWidth:2,
// //     borderColor:"white"
// //   },
// //   description: {
// //     color: 'black',
// //     // lineHeight: 20,
// //     fontSize: 15
// //   },
// //   referSection: {
// //     backgroundColor: '#16588e',
// //     padding: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// //     color: 'white',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 5,
// //     padding: 10,
// //     fontSize: 15,
// //     color: 'black',
// //     marginBottom: 15,
// //     backgroundColor: 'white',
// //   },
// //   referButton: {
// //     backgroundColor: '#ddd',
// //     padding: 15,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   referButtonText: {
// //     color: '#333',
// //     fontWeight: 'bold',
// //   },
// // });

// // export default ReferFriendModal;

// // // import React, {useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   SafeAreaView,
// // // } from 'react-native';
// // // import Icon from 'react-native-vector-icons/Ionicons';

// // // const ReferFriendModal = ({setModalVisible}) => {
// // //   const [friendName, setFriendName] = useState('');
// // //   const [friendNumber, setFriendNumber] = useState('');

// // //   return (
// // //     <SafeAreaView
// // //       style={{
// // //         flex: 1,

// // //         justifyContent: 'flex-end',
// // //       }}>
// // //       <TouchableOpacity
// // //         style={{
// // //           width: 30,
// // //           height: 30,
// // //           borderRadius: 15,
// // //           backgroundColor: '#16588e',
// // //           justifyContent: 'center',
// // //           alignItems: 'center',
// // //           borderTopColor: 'white',
// // //           borderLeftColor: 'white',
// // //           borderRightColor: 'white',
// // //           borderWidth: 2,
// // //           alignSelf: 'flex-end',
// // //         }}
// // //         onPress={() => setModalVisible(false)}>
// // //         <Icon name="close" size={15} color="white" />
// // //       </TouchableOpacity>
// // //       <View style={styles.container}>
// // //         <View style={styles.content}>
// // //           <Text style={styles.description}>
// // //             Now you can get this job for any of your acquaintances. Your
// // //             acquaintance will be sent to the customer for an interview. If they
// // //             pass the interview, their job will start, and you will receive a 250
// // //             Rs Hiring Bonus on the 7th day of their employment.
// // //             {'\n\n'}
// // //             There is no need to register your friend in any way to get this job.
// // //           </Text>
// // //         </View>

// // //         <View style={{backgroundColor: '#16588e', marginTop: 20, padding: 20}}>
// // //           <Text style={styles.sectionTitle}>Refer Your Friend</Text>

// // //           <TextInput
// // //             style={styles.input}
// // //             placeholder="Your friend's name?"
// // //             placeholderTextColor={'grey'}
// // //             value={friendName}
// // //             onChangeText={setFriendName}
// // //           />

// // //           <TextInput
// // //             style={styles.input}
// // //             placeholderTextColor={'grey'}
// // //             placeholder="Your friend's number?"
// // //             value={friendNumber}
// // //             onChangeText={setFriendNumber}
// // //             keyboardType="phone-pad"
// // //           />

// // //           <TouchableOpacity style={styles.referButton}>
// // //             <Text style={styles.referButtonText}>Refer Now</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     borderTopLeftRadius: 20,
// // //     borderTopRightRadius: 20,
// // //     backgroundColor: '#16588e',
// // //     // overflow: 'hidden',
// // //     // position: "relative"
// // //     // borderWidth:2
// // //     // flex: 1,
// // //     // justifyContent: "flex-end"
// // //   },

// // //   headerText: {
// // //     color: 'black',
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //   },
// // //   closeButton: {
// // //     // padding: 5,
// // //     // color: 'black',
// // //   },
// // //   content: {
// // //     padding: 10,
// // //     backgroundColor: 'white',
// // //     borderRadius: 10,
// // //     borderWidth: 2,
// // //     borderColor: 'white',
// // //   },
// // //   description: {
// // //     marginBottom: 20,
// // //     lineHeight: 20,
// // //     color: 'black',
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //     marginBottom: 15,
// // //     color: 'white',
// // //     fontFamily: 'Roboto-Regular',
// // //   },
// // //   input: {
// // //     borderWidth: 1,
// // //     borderColor: '#ddd',
// // //     borderRadius: 5,
// // //     padding: 10,
// // //     fontSize: 15,
// // //     color: 'black',
// // //     marginBottom: 15,
// // //     backgroundColor: 'white',
// // //   },
// // //   referButton: {
// // //     backgroundColor: 'grey',
// // //     padding: 15,
// // //     borderRadius: 5,
// // //     alignItems: 'center',
// // //   },
// // //   referButtonText: {
// // //     color: '#333',
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default ReferFriendModal;

// // // /////////////////////////////////////////////////////

// // // import React from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   SafeAreaView,
// // // } from 'react-native';

// // // const BookingNotice = () => {
// // //   return (
// // //     <SafeAreaView style={{flex: 1}}>
// // //       <View style={styles.card}>
// // //         <Text style={styles.header}>Please Read Carefully.</Text>

// // //         <View style={styles.contentContainer}>
// // //           <Text style={styles.paragraph}>
// // //             1. Customer needs the same driver on 03 Jul, 04 Jul, 05 Jul, 06 Jul,
// // //             07 Jul, 08 Jul, 09 Jul for 12 hours.
// // //           </Text>

// // //           <Text style={styles.paragraph}>
// // //             2. This is the company's new product - Flexible Subscription, where
// // //             the customer has booked more than one In-city booking on the same
// // //             day. If you press the Accept button, you will receive all bookings
// // //             for Flexible Subscription. You can view all bookings in My Bookings.
// // //           </Text>

// // //           <Text style={[styles.paragraph, styles.warningText]}>
// // //             3. Only accept bookings when you can fulfill all bookings of this
// // //             Flexible Subscription.
// // //           </Text>

// // //           <Text style={styles.paragraph}>
// // //             4. Overtime will be charged at Rs 2 per minute. The commission is
// // //             applied after removing GST on the remaining bill. Night charges will
// // //             be 200 Rs.
// // //           </Text>

// // //           <Text style={[styles.paragraph, styles.highlightText]}>
// // //             5. Please note our job is to reduce customer inconvenience, not to
// // //             increase it.
// // //           </Text>
// // //         </View>

// // //         <View style={styles.buttonContainer}>
// // //           <TouchableOpacity style={styles.cancelButton}>
// // //             <Text style={styles.cancelButtonText}>Cancel</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity style={styles.acceptButton}>
// // //             <Text style={styles.acceptButtonText}>Accept</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   card: {
// // //     backgroundColor: 'white',
// // //     borderRadius: 10,
// // //     padding: 20,
// // //     margin: 10,
// // //     shadowColor: '#000',
// // //     shadowOffset: {width: 0, height: 2},
// // //     shadowOpacity: 0.25,
// // //     shadowRadius: 3.84,
// // //     elevation: 5,
// // //   },
// // //   header: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: 'black',
// // //     marginBottom: 15,
// // //   },
// // //   contentContainer: {
// // //     marginBottom: 20,
// // //   },
// // //   paragraph: {
// // //     marginBottom: 10,
// // //     color: 'black',
// // //   },
// // //   warningText: {
// // //     color: 'red',
// // //     fontWeight: 'bold',
// // //   },
// // //   highlightText: {
// // //     color: 'blue',
// // //   },
// // //   buttonContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   cancelButton: {
// // //     backgroundColor: '#f0f0f0',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     alignItems: 'center',
// // //   },
// // //   acceptButton: {
// // //     backgroundColor: '#0047AB',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     alignItems: 'center',
// // //   },
// // //   cancelButtonText: {
// // //     color: 'black',
// // //   },
// // //   acceptButtonText: {
// // //     color: 'white',
// // //   },
// // // });

// // // export default BookingNotice;

// // // import React from 'react';
// // // import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// // // const JobNotice = () => {
// // //   return (
// // //     <SafeAreaView  style={{flex:1, backgroundColor: "white"}}>

// // //     <View style={styles.card}>
// // //       <Text style={styles.header}>Please Read Carefully.</Text>

// // //       <Text style={styles.subHeader}>Company Me Kaam Hai:</Text>

// // //       <View style={styles.listContainer}>
// // //         <Text style={styles.listItem}>1. If you live within 10 KM of the customer's home, which is in manmeet society, sector 122003.</Text>
// // //         <Text style={styles.listItem}>2. If you are proficient in driving a Audi, volvo.</Text>
// // //         <Text style={styles.listItem}>3. If you are well-versed in maintaining and keeping the vehicle clean.</Text>
// // //         <Text style={styles.listItem}>4. If you can arrive on time for the interview on 03 Jul at 08:00 AM, the trial will be 2 hours - 0 Rs.</Text>
// // //         <Text style={styles.listItem}>5. If you agree to work for 26 days, 12 Hours, and a salary of 22000₹. The job will start on 29 Jun, and you need to be there every day at 07:00 AM.</Text>
// // //         <Text style={[styles.listItem, styles.warning]}>6. Do not press the Accept button without reason. After accepting, if you fail to reach the customer, your ID will be permanently or temporarily suspended for 21 days.</Text>
// // //       </View>

// // //       <View style={styles.buttonContainer}>
// // //         <TouchableOpacity style={styles.cancelButton}>
// // //           <Text style={styles.cancelButtonText}>Cancel</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.applyButton}>
// // //           <Text style={styles.applyButtonText}>Apply</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   card: {
// // //     // flex:1,
// // //     backgroundColor: 'white',
// // //     borderRadius: 10,
// // //     padding: 20,
// // //     margin: 10,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.25,
// // //     shadowRadius: 3.84,
// // //     elevation: 5,
// // //   },
// // //   header: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //     color: "black"
// // //   },
// // //   subHeader: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //     color: "black"

// // //   },
// // //   listContainer: {
// // //     marginBottom: 20,
// // //   },
// // //   listItem: {
// // //     marginBottom: 10,
// // //     color: "black"
// // //   },
// // //   warning: {
// // //     color: 'red',
// // //     fontWeight: 'bold',
// // //   },
// // //   buttonContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   cancelButton: {
// // //     backgroundColor: '#f0f0f0',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     alignItems: 'center',
// // //   },
// // //   applyButton: {
// // //     backgroundColor: '#0047AB',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //     width: '45%',
// // //     alignItems: 'center',
// // //   },
// // //   cancelButtonText: {
// // //     color: 'black',
// // //   },
// // //   applyButtonText: {
// // //     color: 'white',
// // //   },
// // // });

// // // export default JobNotice;

// // // // // // /// ///////////////////////////

// // // // import React from 'react';
// // // // // import { useSelector } from 'react-redux';
// // // // import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// // // // import { selectBookingDetails } from '../features/booking/bookingSelectors';
// // // // import { ArrowFadeBlue } from '../../assets/images';

// // // // const FlexibleBookingView = () => {
// // // //     const bookingDetails = {
// // // //         days: 7,
// // // //         price: 7224,
// // // //         paymentMethod: 'Cash',
// // // //         vehicleType: 'Manual - Hatchback',
// // // //         location: 'Testing for internal purpose, Chennai',
// // // //         dates: ['03 Jul', '04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul'],
// // // //         times: ['10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM'],
// // // //         total: 1032,
// // // //         hoursPerDay: 12,
// // // //       };

// // // // //   useSelector(selectBookingDetails);

// // // //   return (
// // // //     <View style={styles.card}>
// // // //       <View style={styles.header}>
// // // //         <Text style={styles.days}>{bookingDetails.days} Days</Text>
// // // //         <Text style={styles.price}>Rs {bookingDetails.price} | {bookingDetails.paymentMethod}</Text>
// // // //         <View style={styles.vehicleType}>
// // // //           <Image style={styles.carIcon} source={ArrowFadeBlue} />
// // // //           <Text style={styles.vehicleText}>{bookingDetails.vehicleType}</Text>
// // // //         </View>
// // // //       </View>
// // // //       <Text style={styles.title}>{bookingDetails.location}</Text>
// // // //       <View style={styles.dates}>
// // // //         {bookingDetails.dates.map((date, index) => (
// // // //           <Text key={index} style={styles.dateText}>{date} |</Text>
// // // //         ))}
// // // //       </View>
// // // //       <View style={styles.times}>
// // // //         {bookingDetails.times.map((time, index) => (
// // // //           <Text key={index} style={styles.timeText}>{time}</Text>
// // // //         ))}
// // // //       </View>
// // // //       <View style={styles.footer}>
// // // //         <Text style={styles.footerText}> <Text style={{fontSize:20}} >Rs{bookingDetails.total}  </Text> {bookingDetails.hoursPerDay} Hours/day</Text>
// // // //         <TouchableOpacity style={styles.acceptButton}>
// // // //           <Text style={styles.acceptButtonText}>Accept</Text>
// // // //         </TouchableOpacity>
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   card: {
// // // //     borderWidth: 1,
// // // //     borderColor: '#ddd',
// // // //     borderRadius: 10,
// // // //     padding: 10,
// // // //     backgroundColor: '#16588e',
// // // //     // margin: 20
// // // //   },
// // // //   header: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-between',
// // // //     // alignItems: 'center',
// // // //     backgroundColor: "white",
// // // //     padding: 5,
// // // //     borderRadius:5,
// // // //     marginBottom: 10
// // // //   },
// // // //   days: {
// // // //     color: 'red',
// // // //     fontWeight: 'bold',
// // // //     textAlign: "left"
// // // //   },
// // // //   price: {
// // // //     color: 'black',
// // // //     fontWeight: 'bold',
// // // //   },
// // // //   vehicleType: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     textAlign : "right"
// // // //   },
// // // //   carIcon: {
// // // //     width: 20,
// // // //     height: 20,
// // // //     marginRight: 5
// // // //   },
// // // //   vehicleText: {
// // // //     color: "black"
// // // //   },
// // // //   title: {
// // // //     color: '#fff',
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 10
// // // //   },
// // // //   dates: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-between',
// // // //     marginBottom: 10
// // // //   },
// // // //   dateText: {
// // // //     color: '#fff'
// // // //   },
// // // //   times: {
// // // //     flexDirection: 'row',
// // // //     flexWrap: 'wrap',
// // // //     marginBottom: 10
// // // //   },
// // // //   timeText: {
// // // //     backgroundColor: '#fff',
// // // //     borderRadius: 5,
// // // //     padding: 5,
// // // //     color: "black",
// // // //     margin: 2
// // // //   },
// // // //   footer: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-between',
// // // //     alignItems: 'center'
// // // //   },
// // // //   footerText: {
// // // //     color: '#fff',
// // // //     fontWeight: 'bold',
// // // //     // fontSize: 20
// // // //   },
// // // //   acceptButton: {
// // // //     backgroundColor: '#fff',
// // // //     paddingVertical: 5,
// // // //     paddingHorizontal: 10,
// // // //     borderRadius: 5
// // // //   },
// // // //   acceptButtonText: {
// // // //     color: '#1E5ABF',
// // // //     fontWeight: 'bold'
// // // //   }
// // // // });

// // // // export default FlexibleBookingView;

// // // // // import React from 'react';
// // // // // import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// // // // // const { width } = Dimensions.get('window');

// // // // // const CarRentalCard = () => {
// // // // //   const times = ['10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM'];
// // // // //   const dates = ['03 Jul', '04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul'];

// // // // //   return (
// // // // //     <View style={styles.card}>
// // // // //       <View style={styles.header}>
// // // // //         <View style={styles.leftHeader}>
// // // // //           <Text style={styles.days}>7 Days</Text>
// // // // //           <Text style={styles.price}>Rs 7224</Text>
// // // // //           <Text style={styles.paymentMethod}>Cash</Text>
// // // // //         </View>
// // // // //         <View style={styles.rightHeader}>
// // // // //           <Text style={styles.carType}>Manual - Hatchback</Text>
// // // // //         </View>
// // // // //       </View>

// // // // //       <Text style={styles.purpose}>Testing for internal purpose, Chennai</Text>

// // // // //       <View style={styles.dateTimeContainer}>
// // // // //         {dates.map((date, index) => (
// // // // //           <View key={index} style={styles.dateTime}>
// // // // //             <Text style={styles.date}>{date}</Text>
// // // // //             <View style={styles.timeWrapper}>
// // // // //               <Text style={styles.time}>{times[index]}</Text>
// // // // //             </View>
// // // // //           </View>
// // // // //         ))}
// // // // //       </View>

// // // // //       <View style={styles.footer}>
// // // // //         <Text style={styles.rate}>Rs 1032 <Text style={styles.rateSubtext}>12 Hours/day</Text></Text>
// // // // //         <TouchableOpacity style={styles.acceptButton}>
// // // // //           <Text style={styles.acceptButtonText}>Accept</Text>
// // // // //         </TouchableOpacity>
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   card: {
// // // // //     backgroundColor: '#0047AB',
// // // // //     borderRadius: 10,
// // // // //     padding: 15,
// // // // //     width: width - 30,
// // // // //     alignSelf: 'center',
// // // // //   },
// // // // //   header: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'space-between',
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   leftHeader: {
// // // // //     flexDirection: 'row',
// // // // //   },
// // // // //   days: {
// // // // //     color: 'white',
// // // // //     marginRight: 10,
// // // // //   },
// // // // //   price: {
// // // // //     color: 'white',
// // // // //     fontWeight: 'bold',
// // // // //     marginRight: 10,
// // // // //   },
// // // // //   paymentMethod: {
// // // // //     color: 'white',
// // // // //   },
// // // // //   rightHeader: {
// // // // //     backgroundColor: 'rgba(255,255,255,0.2)',
// // // // //     padding: 5,
// // // // //     borderRadius: 5,
// // // // //   },
// // // // //   carType: {
// // // // //     color: 'white',
// // // // //   },
// // // // //   purpose: {
// // // // //     color: 'white',
// // // // //     fontSize: 16,
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   dateTimeContainer: {
// // // // //     flexDirection: 'row',
// // // // //     flexWrap: 'wrap',
// // // // //     justifyContent: 'space-between',
// // // // //   },
// // // // //   dateTime: {
// // // // //     width: '30%',
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   date: {
// // // // //     color: 'white',
// // // // //     textAlign: 'center',
// // // // //   },
// // // // //   timeWrapper: {
// // // // //     backgroundColor: 'white',
// // // // //     borderRadius: 5,
// // // // //     padding: 5,
// // // // //     marginTop: 5,
// // // // //   },
// // // // //   time: {
// // // // //     color: '#0047AB',
// // // // //     textAlign: 'center',
// // // // //   },
// // // // //   footer: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'space-between',
// // // // //     alignItems: 'center',
// // // // //     marginTop: 10,
// // // // //   },
// // // // //   rate: {
// // // // //     color: 'white',
// // // // //     fontSize: 18,
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // //   rateSubtext: {
// // // // //     fontSize: 14,
// // // // //     fontWeight: 'normal',
// // // // //   },
// // // // //   acceptButton: {
// // // // //     backgroundColor: 'white',
// // // // //     padding: 10,
// // // // //     borderRadius: 5,
// // // // //   },
// // // // //   acceptButtonText: {
// // // // //     color: '#0047AB',
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // // });

// // // // // export default CarRentalCard;

// // // // // // import React from 'react';
// // // // // // import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
// // // // // // // Make sure you have the correct path to the car icon image
// // // // // // import {ArrowFadeBlue} from '../../assets/images';

// // // // // // const BookingCard = () => {
// // // // // //   return (
// // // // // //     <View style={styles.card}>
// // // // // //       <View style={styles.header}>
// // // // // //         <Text style={styles.days}>7 Days</Text>
// // // // // //         <Text style={styles.price}>Rs 7224 | Cash</Text>
// // // // // //         <View style={styles.vehicleType}>
// // // // // //           <Image style={styles.carIcon} source={ArrowFadeBlue} />
// // // // // //           <Text style={styles.vehicleText}>Manual - Hatchback</Text>
// // // // // //         </View>
// // // // // //       </View>
// // // // // //       <Text style={styles.title}>Testing for internal purpose, Chennai</Text>
// // // // // //       <View style={styles.dates}>
// // // // // //         <Text style={styles.dateText}>03 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>04 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>05 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>06 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>07 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>08 Jul |</Text>
// // // // // //         <Text style={styles.dateText}>09 Jul |</Text>
// // // // // //       </View>
// // // // // //       <View style={styles.times}>
// // // // // //         <Text style={styles.timeText}>10:00 AM</Text>
// // // // // //         <Text style={styles.timeText}>10:00 AM</Text>
// // // // // //         <Text style={styles.timeText}>10:00 AM</Text>
// // // // // //         <Text style={styles.timeText}>10:00 AM</Text>
// // // // // //       </View>
// // // // // //       <View style={styles.footer}>
// // // // // //         <Text style={styles.footerText}>Rs 1032 12 Hours/day</Text>
// // // // // //         <TouchableOpacity style={styles.acceptButton}>
// // // // // //           <Text style={styles.acceptButtonText}>Accept</Text>
// // // // // //         </TouchableOpacity>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //   card: {
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: '#ddd',
// // // // // //     borderRadius: 10,
// // // // // //     padding: 10,
// // // // // //     backgroundColor: '#1E5ABF',
// // // // // //     margin: 20,
// // // // // //   },
// // // // // //   header: {
// // // // // //     flexDirection: 'row',
// // // // // //     justifyContent: 'space-between',
// // // // // //     alignItems: 'center',
// // // // // //     marginBottom: 10,
// // // // // //     backgroundColor: 'white',
// // // // // //     paddingHorizontal: 10,
// // // // // //     paddingVertical: 10,
// // // // // //     borderRadius: 5,
// // // // // //   },
// // // // // //   days: {
// // // // // //     color: 'red',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // //   price: {
// // // // // //     color: 'black',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // //   vehicleType: {
// // // // // //     flexDirection: 'row',
// // // // // //     alignItems: 'center',
// // // // // //   },
// // // // // //   carIcon: {
// // // // // //     width: 20,
// // // // // //     height: 20,
// // // // // //     marginRight: 5,
// // // // // //   },
// // // // // //   vehicleText: {
// // // // // //     color: "black"
// // // // // //     // color: '#fff',
// // // // // //   },
// // // // // //   title: {
// // // // // //     color: '#fff',
// // // // // //     fontWeight: 'bold',
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   dates: {
// // // // // //     flexDirection: 'row',
// // // // // //     justifyContent: 'space-between',
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   dateText: {
// // // // // //     color: '#fff',
// // // // // //   },
// // // // // //   times: {
// // // // // //     flexDirection: 'row',
// // // // // //     justifyContent: 'space-between',
// // // // // //     marginBottom: 10,
// // // // // //     // marginHorizontal: 5
// // // // // //   },
// // // // // //   timeText: {
// // // // // //     backgroundColor: '#fff',
// // // // // //     borderRadius: 5,
// // // // // //     padding: 5,
// // // // // //     color: 'black',
// // // // // //     marginHorizontal: 5,
// // // // // //   },
// // // // // //   footer: {
// // // // // //     flexDirection: 'row',
// // // // // //     justifyContent: 'space-between',
// // // // // //     alignItems: 'center',
// // // // // //   },
// // // // // //   footerText: {
// // // // // //     color: '#fff',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // //   acceptButton: {
// // // // // //     backgroundColor: '#fff',
// // // // // //     paddingVertical: 5,
// // // // // //     paddingHorizontal: 10,
// // // // // //     borderRadius: 5,
// // // // // //   },
// // // // // //   acceptButtonText: {
// // // // // //     color: '#1E5ABF',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // // });

// // // // // // export default BookingCard;

// // // // // // // import React from 'react';
// // // // // // // import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

// // // // // // // const { width } = Dimensions.get('window');

// // // // // // // const BookingCard = () => {
// // // // // // //   return (
// // // // // // //     <View style={styles.container}>
// // // // // // //       <View style={styles.header}>
// // // // // // //         <Text style={styles.headerText}>7 Days | Rs 7224 | Cash</Text>
// // // // // // //         <View style={styles.carInfo}>
// // // // // // //           <Image   />
// // // // // // //           <Text style={styles.headerText}>Manual - Hatchback</Text>
// // // // // // //         </View>
// // // // // // //       </View>
// // // // // // //       <Text style={styles.title}>Testing for internal purpose, Chennai</Text>
// // // // // // //       <View style={styles.dates}>
// // // // // // //         {['03 Jul', '04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul'].map((date, index) => (
// // // // // // //           <Text key={index} style={styles.dateText}>{date}</Text>
// // // // // // //         ))}
// // // // // // //       </View>
// // // // // // //       <View style={styles.times}>
// // // // // // //         {[...Array(7)].map((_, index) => (
// // // // // // //           <View key={index} style={styles.timeItem}>
// // // // // // //             <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // //           </View>
// // // // // // //         ))}
// // // // // // //       </View>
// // // // // // //       <View style={styles.footer}>
// // // // // // //         <View style={styles.price}>
// // // // // // //           <Text style={styles.priceText}>Rs 1032</Text>
// // // // // // //           <Text style={styles.hoursText}>12 Hours/day</Text>
// // // // // // //         </View>
// // // // // // //         <TouchableOpacity style={styles.button}>
// // // // // // //           <Text style={styles.buttonText}>Accept</Text>
// // // // // // //         </TouchableOpacity>
// // // // // // //       </View>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // };

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     backgroundColor: '#0056a8',
// // // // // // //     padding: width * 0.04,
// // // // // // //     borderRadius: 10,
// // // // // // //     width: width * 0.9,
// // // // // // //     alignSelf: 'center',
// // // // // // //   },
// // // // // // //   header: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     alignItems: 'center',
// // // // // // //     marginBottom: width * 0.02,
// // // // // // //     backgroundColor: "white"
// // // // // // //   },
// // // // // // //   headerText: {
// // // // // // //     color: 'black',
// // // // // // //     fontSize: width * 0.035,
// // // // // // //   },
// // // // // // //   carInfo: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   title: {
// // // // // // //     color: 'white',
// // // // // // //     fontSize: width * 0.045,
// // // // // // //     fontWeight: 'bold',
// // // // // // //     marginBottom: width * 0.02,
// // // // // // //   },
// // // // // // //   dates: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     marginBottom: width * 0.02,
// // // // // // //   },
// // // // // // //   dateText: {
// // // // // // //     color: 'white',
// // // // // // //     fontSize: width * 0.03,
// // // // // // //   },
// // // // // // //   times: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     marginBottom: width * 0.04,
// // // // // // //   },
// // // // // // //   timeItem: {
// // // // // // //     backgroundColor: 'white',
// // // // // // //     padding: width * 0.015,
// // // // // // //     borderRadius: 5,
// // // // // // //   },
// // // // // // //   timeText: {
// // // // // // //     color: '#0056a8',
// // // // // // //     fontSize: width * 0.025,
// // // // // // //   },
// // // // // // //   footer: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   price: {
// // // // // // //     flex: 1,
// // // // // // //   },
// // // // // // //   priceText: {
// // // // // // //     color: 'white',
// // // // // // //     fontSize: width * 0.05,
// // // // // // //     fontWeight: 'bold',
// // // // // // //   },
// // // // // // //   hoursText: {
// // // // // // //     color: 'white',
// // // // // // //     fontSize: width * 0.035,
// // // // // // //   },
// // // // // // //   button: {
// // // // // // //     backgroundColor: 'white',
// // // // // // //     padding: width * 0.02,
// // // // // // //     borderRadius: 5,
// // // // // // //     width: width * 0.2,
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   buttonText: {
// // // // // // //     color: '#0056a8',
// // // // // // //     fontWeight: 'bold',
// // // // // // //     fontSize: width * 0.035,
// // // // // // //   },
// // // // // // // });

// // // // // // // export default BookingCard;

// // // // // // // // import React from 'react';
// // // // // // // // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// // // // // // // // const BookingCard = () => {
// // // // // // // //   return (
// // // // // // // //     <View style={styles.container}>
// // // // // // // //       <View style={styles.header}>
// // // // // // // //         <Text style={styles.headerText}>7 Days | Rs 7224 | Cash</Text>
// // // // // // // //         <View style={styles.carIcon}>
// // // // // // // //           {/* Add car icon here */}
// // // // // // // //         </View>
// // // // // // // //         <Text style={styles.headerText}>Manual - Hatchback</Text>
// // // // // // // //       </View>
// // // // // // // //       <Text style={styles.title}>Testing for internal purpose, Chennai</Text>
// // // // // // // //       <View style={styles.dates}>
// // // // // // // //         <Text style={styles.dateText}>03 Jul | 04 Jul | 05 Jul | 06 Jul | 07 Jul | 08 Jul | 09 Jul</Text>
// // // // // // // //       </View>
// // // // // // // //       <View style={styles.times}>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //         <View style={styles.timeItem}>
// // // // // // // //           <Text style={styles.timeText}>10:00 AM</Text>
// // // // // // // //         </View>
// // // // // // // //       </View>
// // // // // // // //       <View style={styles.price}>
// // // // // // // //         <Text style={styles.priceText}>Rs 1032</Text>
// // // // // // // //         <Text style={styles.priceText}>12 Hours/day</Text>
// // // // // // // //       </View>
// // // // // // // //       <TouchableOpacity style={styles.button}>
// // // // // // // //         <Text style={styles.buttonText}>Accept</Text>
// // // // // // // //       </TouchableOpacity>
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: {
// // // // // // // //     backgroundColor: '#2980b9',
// // // // // // // //     padding: 20,
// // // // // // // //     borderRadius: 10,
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   header: {
// // // // // // // //     flexDirection: 'row',
// // // // // // // //     justifyContent: 'space-between',
// // // // // // // //     alignItems: 'center',
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   headerText: {
// // // // // // // //     color: 'white',
// // // // // // // //     fontWeight: 'bold',
// // // // // // // //   },
// // // // // // // //   carIcon: {
// // // // // // // //     // Add car icon styling here
// // // // // // // //   },
// // // // // // // //   title: {
// // // // // // // //     color: 'white',
// // // // // // // //     fontSize: 20,
// // // // // // // //     fontWeight: 'bold',
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   dates: {
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   dateText: {
// // // // // // // //     color: 'white',
// // // // // // // //   },
// // // // // // // //   times: {
// // // // // // // //     flexDirection: 'row',
// // // // // // // //     justifyContent: 'space-between',
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   timeItem: {
// // // // // // // //     backgroundColor: 'white',
// // // // // // // //     padding: 5,
// // // // // // // //     borderRadius: 5,
// // // // // // // //   },
// // // // // // // //   timeText: {
// // // // // // // //     color: '#2980b9',
// // // // // // // //   },
// // // // // // // //   price: {
// // // // // // // //     flexDirection: 'row',
// // // // // // // //     justifyContent: 'space-between',
// // // // // // // //     alignItems: 'center',
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   priceText: {
// // // // // // // //     color: 'white',
// // // // // // // //     fontSize: 20,
// // // // // // // //     fontWeight: 'bold',
// // // // // // // //   },
// // // // // // // //   button: {
// // // // // // // //     backgroundColor: 'white',
// // // // // // // //     padding: 10,
// // // // // // // //     borderRadius: 5,
// // // // // // // //   },
// // // // // // // //   buttonText: {
// // // // // // // //     color: '#2980b9',
// // // // // // // //     fontWeight: 'bold',
// // // // // // // //   },
// // // // // // // // });

// // // // // // // // export default BookingCard;
