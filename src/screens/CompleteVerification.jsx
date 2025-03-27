// // import {
// //   Dimensions,
// //   Image,
// //   Pressable,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from 'react-native';
// // import Header from '../components/Header';
// // import {AppColors} from '../assets/Colors';
// // import {LeftArrow, Triangle_Icon} from '../assets/images';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import {useSelector} from 'react-redux';
// // import YoutubePlayer from 'react-native-youtube-iframe';
// // import {TextInput} from 'react-native';

// // const {width, height} = Dimensions.get('window');
// // const designWidth = width;
// // const designHeight = height;
// // const scale = size => (width / designWidth) * size;
// // const verticalScale = size => (height / designHeight) * size;
// // const moderateScale = (size, factor = 0.5) =>
// //   size + (scale(size) - size) * factor;

// // const CompleteVerification = ({navigation}) => {
// //   const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

// //   return (
// //     <SafeAreaView style={{flex: 1}}>
// //       <Header backButton={true} />
// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         keyboardShouldPersistTaps="always"
// //         contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 12}}>
// //         <View style={styles.mainTopView}>
// //           <View style={{flexDirection: 'row'}}>
// //             <View style={styles.mainTopContent}>
// //               <Text style={styles.trustedText}>Trusted & Trained Driver</Text>
// //             </View>
// //             <View style={styles.iconContainer}>
// //               <Image
// //                 source={Triangle_Icon}
// //                 resizeMode={'cover'}
// //                 style={styles.icon}
// //               />
// //             </View>
// //           </View>
// //           <Text style={styles.mainHeading}>
// //             Driver Refrence Verification List
// //           </Text>
// //         </View>

// //         {/* Address */}
// //         <View style={styles.addressContainer}>
// //           <Text style={styles.addressText}>
// //             B-1/42, Gali Number 20, Kiran Garden, Uttam Nagar, Delhi, 110059
// //           </Text>
// //         </View>

// //         {/* Instructional Text + Button */}
// //         {/* <View style={styles.connectContainer}>
// //           <Pressable
// //             onPress={() => navigation.navigate('AddNewVerifier')}
// //             style={styles.connectButton}>
// //             <Icon color={AppColors.white} size={15} name="plus" />
// //             <Image style={styles.rightArrow} source={LeftArrow} />
// //           </Pressable>
// //           <Text style={styles.instructionText}>
// //             Create a list of your contacts using this button. They will receive
// //             an OTP on <Text style={{color: 'green'}}>whatsapp</Text>, and you
// //             need to collect that OTP from them and input it into the list. It is
// //             mandatory to have at least 3 contacts.
// //           </Text>
// //         </View> */}

// //         <View style={styles.connectContainer}>
// //           <Pressable
// //             onPress={() => navigation.navigate('AddNewVerifier')}
// //             style={styles.connectButton}>
// //             <Icon
// //               color={AppColors.white}
// //               size={18}
// //               name="plus"
// //               style={styles.buttonIcon}
// //             />
// //             <Image style={styles.rightArrow} source={LeftArrow} />
// //           </Pressable>
// //           <Text style={styles.instructionText}>
// //             Create a list of your contacts using this button. They will receive
// //             an OTP on whatsapp, and you need to collect that OTP from them and
// //             input it into the list. It is mandatory to have at least 3 contacts.
// //           </Text>
// //         </View>

// //         {/* YouTube Video */}
// //         <View style={styles.videoContainer}>
// //           <YoutubePlayer height={250} videoId="tcFjgwbvd8E" />
// //         </View>

// //         {/* Verified Contact Cards */}
// //         <View style={styles.contactCard}>
// //           <View style={{flexDirection: 'column'}}>
// //             <Text style={styles.contactText}>Name - Pooja</Text>
// //             <Text style={styles.contactText}>Number - 9810360792</Text>
// //             <Text style={styles.contactText}>Relation - Friend</Text>
// //           </View>
// //           <View style={styles.verifiedBox}>
// //             <Text style={styles.verifiedText}>Verified</Text>
// //             <Icon name="check-square" size={18} color="white" />
// //           </View>
// //         </View>

// //         <View style={styles.contactCard}>
// //           <View style={{flexDirection: 'column'}}>
// //             <Text style={styles.contactText}>Name - Mohit</Text>
// //             <Text style={styles.contactText}>Number - 8118813148</Text>
// //             <Text style={styles.contactText}>Relation - Friend</Text>
// //           </View>
// //           <View style={styles.verifiedBox}>
// //             <Text style={styles.verifiedText}>Verified</Text>
// //             <Icon name="check-square" size={18} color="white" />
// //           </View>
// //         </View>

// //         <View
// //           style={{
// //             backgroundColor: '#16588e',
// //             padding: 12,
// //             borderRadius: 10,
// //             marginTop: 15,
// //             flexDirection: 'row',
// //             justifyContent: 'space-between',
// //             alignItems: 'flex-start',
// //           }}>
// //           {/* Left: Contact Info */}
// //           <View style={{flex: 1}}>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Name - rahul
// //             </Text>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Number - 0987654321
// //             </Text>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Relation - Friend
// //             </Text>
// //           </View>

// //           <View
// //             style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 padding: 6,
// //                 borderWidth: 2,
// //                 paddingHorizontal: 20,
// //                 borderColor: '#FFFFFF',
// //                 borderRadius: 10,
// //                 backgroundColor: '#25568D',
// //               }}>
// //               <Icon name="check" size={24} color="#FFFFFF" />
// //             </View>

// //             {/* Bottom: Verified Section */}
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 justifyContent: 'flex-end',
// //                 marginTop: 8,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: 'white',
// //                   marginRight: 6,
// //                   fontSize: 14,
// //                   fontWeight: '500',
// //                 }}>
// //                 Verified
// //               </Text>
// //             </View>
// //           </View>
// //         </View>

// //         <View
// //           style={{
// //             backgroundColor: '#16588e',
// //             padding: 12,
// //             borderRadius: 10,
// //             marginTop: 15,
// //             flexDirection: 'row',
// //             justifyContent: 'space-between',
// //             alignItems: 'flex-start',
// //           }}>
// //           {/* Left: Contact Info */}
// //           <View style={{flex: 1}}>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Name - XYV
// //             </Text>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Number - 1234567890
// //             </Text>
// //             <Text
// //               style={{
// //                 color: 'white',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Relation - Daughter
// //             </Text>
// //           </View>

// //           <View
// //             style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 padding: 6,
// //                 borderWidth: 2,
// //                 borderColor: '#FFFFFF',
// //                 borderRadius: 10,
// //                 backgroundColor: '#25568D',
// //               }}>
// //               <Icon name="check" size={24} color="#FFFFFF" />
// //             </View>

// //             {/* Bottom: Verified Section */}
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 justifyContent: 'flex-end',
// //                 marginTop: 8,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: 'white',
// //                   marginRight: 6,
// //                   fontSize: 14,
// //                   fontWeight: '500',
// //                 }}>
// //                 Verified
// //               </Text>
// //             </View>
// //           </View>
// //         </View>

// //         <View
// //           style={{
// //             backgroundColor: '#ddd',
// //             padding: 12,
// //             borderRadius: 10,
// //             marginTop: 15,
// //             flexDirection: 'row',
// //             justifyContent: 'space-between',
// //             alignItems: 'flex-start',
// //           }}>
// //           <View style={{flex: 1}}>
// //             <Text
// //               style={{
// //                 color: '#000',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Name - XYV
// //             </Text>
// //             <Text
// //               style={{
// //                 color: '#000',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Number - 1234567890
// //             </Text>
// //             <Text
// //               style={{
// //                 color: '#000',
// //                 fontSize: 14,
// //                 marginVertical: 2,
// //                 fontWeight: '500',
// //               }}>
// //               Relation - Daughter
// //             </Text>
// //           </View>

// //           {/* Right Side: Top OTP Section + Bottom Verified */}
// //           <View
// //             style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
// //             {/* Top: OTP Input + Submit */}
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 marginBottom: 8,
// //               }}>
// //               <TextInput
// //                 placeholder="OTP भरें"
// //                 placeholderTextColor="#555"
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#aaa',
// //                   paddingVertical: 3,
// //                   paddingHorizontal: 10,
// //                   borderRadius: 5,
// //                   fontSize: 13,
// //                   minWidth: 80,
// //                   marginRight: 6,
// //                   backgroundColor: '#f9f9f9',
// //                   color: '#333',
// //                 }}
// //               />
// //               <Pressable
// //                 style={{
// //                   backgroundColor: '#2c5aa0',
// //                   paddingVertical: 6,
// //                   paddingHorizontal: 12,
// //                   borderRadius: 5,
// //                 }}>
// //                 <Text style={{color: '#fff', fontSize: 13, fontWeight: '600'}}>
// //                   जमा करें
// //                 </Text>
// //               </Pressable>
// //             </View>

// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 justifyContent: 'flex-end',
// //                 marginTop: 8,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: 'black',
// //                   marginRight: 6,
// //                   fontSize: 14,
// //                   fontWeight: '500',
// //                 }}>
// //                 Verified
// //               </Text>
// //               <Icon name="check-square" size={18} color="white" />
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   trustedText: {
// //     position: 'absolute',
// //     color: AppColors.mainColor,
// //     marginLeft: 15,
// //     fontFamily: 'Roboto',
// //   },
// //   iconContainer: {
// //     paddingVertical: 10,
// //   },
// //   icon: {
// //     width: 20,
// //     height: 20,
// //   },
// //   mainTopView: {
// //     backgroundColor: AppColors.mainColor,
// //     borderRadius: moderateScale(8),
// //     marginBottom: verticalScale(12),
// //     marginTop: 20,
// //   },
// //   mainTopContent: {
// //     flexDirection: 'row',
// //     marginVertical: 10,
// //     padding: 10,
// //     width: '70%',
// //     backgroundColor: AppColors.white,
// //   },
// //   mainHeading: {
// //     fontSize: 26,
// //     marginTop: verticalScale(30),
// //     paddingBottom: verticalScale(10),
// //     fontWeight: '500',
// //     textAlign: 'center',
// //     letterSpacing: 0.3,
// //     color: AppColors.white,
// //   },

// //   addressContainer: {
// //     backgroundColor: '#d9e9f6',
// //     borderRadius: 6,
// //     padding: 12,
// //     marginTop: 10,
// //   },
// //   addressText: {
// //     fontSize: 14,
// //     color: AppColors.black,
// //   },
// //   //   connectContainer: {
// //   //     flexDirection: 'row',
// //   //     marginTop: 15,
// //   //     marginBottom: 10,
// //   //     alignItems: 'flex-start',
// //   //   },
// //   //   connectButton: {
// //   //     backgroundColor: AppColors.mainColor,
// //   //     flexDirection: 'row',
// //   //     alignItems: 'center',
// //   //     justifyContent: 'space-evenly',
// //   //     paddingVertical: 10,
// //   //     paddingHorizontal: 10,
// //   //     borderRadius: 8,
// //   //     width: width * 0.2,
// //   //   },
// //   //   rightArrow: {
// //   //     resizeMode: 'contain',
// //   //     height: 20,
// //   //     width: 20,
// //   //     marginLeft: 6,
// //   //   },
// //   //   instructionText: {
// //   //     flex: 1,
// //   //     paddingLeft: 12,
// //   //     fontSize: 14,
// //   //     color: AppColors.black,
// //   //     fontWeight: '600',
// //   //   },
// //   connectContainer: {
// //     flexDirection: 'row',
// //     marginTop: 15,
// //     marginBottom: 10,
// //     alignItems: 'center',
// //   },

// //   connectButton: {
// //     backgroundColor: AppColors.mainColor,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingVertical: 12,
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //     width: width * 0.2, // Slightly wider for balance
// //   },

// //   rightArrow: {
// //     resizeMode: 'contain',
// //     height: 20,
// //     width: 20,
// //     marginLeft: 8,
// //   },

// //   buttonIcon: {
// //     marginRight: 8,
// //   },

// //   instructionText: {
// //     flex: 1,
// //     paddingLeft: 12,
// //     fontSize: 13, // Slightly bumped for better visual balance
// //     color: AppColors.black,
// //     fontWeight: '600',
// //     // lineHeight: 20,
// //   },

// //   videoContainer: {
// //     marginTop: 15,
// //   },
// //   contactCard: {
// //     backgroundColor: AppColors.mainColor,
// //     padding: 12,
// //     borderRadius: 10,
// //     marginTop: 15,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   contactText: {
// //     color: AppColors.white,
// //     fontSize: 14,
// //     marginVertical: 2,
// //   },
// //   verifiedBox: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-end',
// //     justifyContent: 'flex-end',
// //     marginTop: 8,
// //   },
// //   verifiedText: {
// //     color: 'white',
// //     marginRight: 6,
// //     fontSize: 14,
// //     fontWeight: '500',
// //   },
// // });

// // export default CompleteVerification;

// import {
//   Dimensions,
//   Image,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import {LeftArrow, Triangle_Icon} from '../assets/images';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {useSelector} from 'react-redux';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import {TextInput} from 'react-native';
// import {useState} from 'react';

// const {width, height} = Dimensions.get('window');
// const designWidth = width;
// const designHeight = height;
// const scale = size => (width / designWidth) * size;
// const verticalScale = size => (height / designHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// const CompleteVerification = ({navigation}) => {
//   const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
//   const [verified, setVerified] = useState(true);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Header backButton={true} />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="always"
//         contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 12}}>
//         <View style={styles.mainTopView}>
//           <View style={{flexDirection: 'row'}}>
//             <View style={styles.mainTopContent}>
//               <Text style={styles.trustedText}>Trusted & Trained Driver</Text>
//             </View>
//             <View style={styles.iconContainer}>
//               <Image
//                 source={Triangle_Icon}
//                 resizeMode={'cover'}
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//           <Text style={styles.mainHeading}>
//             Driver Refrence Verification List
//           </Text>
//         </View>

//         {/* Address */}
//         <View style={styles.addressContainer}>
//           <Text style={styles.addressText}>
//             B-1/42, Gali Number 20, Kiran Garden, Uttam Nagar, Delhi, 110059
//           </Text>
//         </View>

//         <View style={styles.connectContainer}>
//           <Pressable
//             onPress={() => navigation.navigate('AddNewVerifier')}
//             style={styles.connectButton}>
//             <Icon
//               color={AppColors.white}
//               size={18}
//               name="plus"
//               style={styles.buttonIcon}
//             />
//             <Image style={styles.rightArrow} source={LeftArrow} />
//           </Pressable>
//           <Text style={styles.instructionText}>
//             Create a list of your contacts using this button. They will receive
//             an OTP on whatsapp, and you need to collect that OTP from them and
//             input it into the list. It is mandatory to have at least 3 contacts.
//           </Text>
//         </View>

//         {/* YouTube Video */}
//         <View style={styles.videoContainer}>
//           <YoutubePlayer height={250} videoId="tcFjgwbvd8E" />
//         </View>

//         {/* Verified Contact Cards */}
//         {/* <View style={styles.contactCard}>
//           <View style={{flexDirection: 'column'}}>
//             <Text style={styles.contactText}>Name - Pooja</Text>
//             <Text style={styles.contactText}>Number - 9810360792</Text>
//             <Text style={styles.contactText}>Relation - Friend</Text>
//           </View>
//           <View style={styles.verifiedBox}>
//             <Text style={styles.verifiedText}>Verified</Text>
//             <Icon name="check-square" size={18} color="white" />
//           </View>
//         </View>

//         <View style={styles.contactCard}>
//           <View style={{flexDirection: 'column'}}>
//             <Text style={styles.contactText}>Name - Mohit</Text>
//             <Text style={styles.contactText}>Number - 8118813148</Text>
//             <Text style={styles.contactText}>Relation - Friend</Text>
//           </View>
//           <View style={styles.verifiedBox}>
//             <Text style={styles.verifiedText}>Verified</Text>
//             <Icon name="check-square" size={18} color="white" />
//           </View>
//         </View> */}

//         <View
//           style={{
//             backgroundColor: '#16588e',
//             padding: 12,
//             borderRadius: 10,
//             marginTop: 15,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//           }}>
//           {/* Left: Contact Info */}
//           <View style={{flex: 1}}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Name - rahul
//             </Text>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Number - 0987654321
//             </Text>
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Relation - Friend
//             </Text>
//           </View>

//           <View
//             style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
//             {verified && (
//               <>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 6,
//                     borderWidth: 2,
//                     paddingHorizontal: 20,
//                     borderColor: '#FFFFFF',
//                     borderRadius: 10,
//                     backgroundColor: '#25568D',
//                   }}>
//                   <Icon name="check" size={24} color="#FFFFFF" />
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'flex-end',
//                     marginTop: 8,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       marginRight: 6,
//                       fontSize: 14,
//                       fontWeight: '500',
//                     }}>
//                     Verified
//                   </Text>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>

//         <View
//           style={{
//             backgroundColor: '#ddd',
//             padding: 12,
//             borderRadius: 10,
//             marginTop: 15,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//           }}>
//           <View style={{flex: 1}}>
//             <Text
//               style={{
//                 color: '#000',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Name - Xyz
//             </Text>
//             <Text
//               style={{
//                 color: '#000',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Number - 1234567890
//             </Text>
//             <Text
//               style={{
//                 color: '#000',
//                 fontSize: 14,
//                 marginVertical: 2,
//                 fontWeight: '500',
//               }}>
//               Relation - Daughter
//             </Text>
//           </View>

//           {/* Right Side: Top OTP Section + Bottom Verified */}
//           <View
//             style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
//             {verified &&<View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginBottom: 8,
//               }}>
//               <TextInput
//                 placeholder="OTP भरें"
//                 placeholderTextColor="#555"
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#aaa',
//                   paddingVertical: 3,
//                   paddingHorizontal: 10,
//                   borderRadius: 5,
//                   fontSize: 13,
//                   minWidth: 80,
//                   marginRight: 6,
//                   backgroundColor: '#f9f9f9',
//                   color: '#333',
//                 }}
//               />
//               <Pressable
//                 style={{
//                   backgroundColor: '#2c5aa0',
//                   paddingVertical: 6,
//                   paddingHorizontal: 12,
//                   borderRadius: 5,
//                 }}>
//                 <Text style={{color: '#fff', fontSize: 13, fontWeight: '600'}}>
//                   जमा करें
//                 </Text>
//               </Pressable>
//             </View>}

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//                 marginTop: 8,
//               }}>
//               <Text
//                 style={{
//                   color: 'black',
//                   marginRight: 6,
//                   fontSize: 14,
//                   fontWeight: '500',
//                 }}>
//                 Verified
//               </Text>
//               <Icon name="check-square" size={18} color="white" />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   trustedText: {
//     position: 'absolute',
//     color: AppColors.mainColor,
//     marginLeft: 15,
//     fontFamily: 'Roboto',
//   },
//   iconContainer: {
//     paddingVertical: 10,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   mainTopView: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: moderateScale(8),
//     marginBottom: verticalScale(12),
//     marginTop: 20,
//   },
//   mainTopContent: {
//     flexDirection: 'row',
//     marginVertical: 10,
//     padding: 10,
//     width: '70%',
//     backgroundColor: AppColors.white,
//   },
//   mainHeading: {
//     fontSize: 26,
//     marginTop: verticalScale(30),
//     paddingBottom: verticalScale(10),
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     color: AppColors.white,
//   },

//   addressContainer: {
//     backgroundColor: '#d9e9f6',
//     borderRadius: 6,
//     padding: 12,
//     marginTop: 10,
//   },
//   addressText: {
//     fontSize: 14,
//     color: AppColors.black,
//   },

//   connectContainer: {
//     flexDirection: 'row',
//     marginTop: 15,
//     marginBottom: 10,
//     alignItems: 'center',
//   },

//   connectButton: {
//     backgroundColor: AppColors.mainColor,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     width: width * 0.2,
//   },

//   rightArrow: {
//     resizeMode: 'contain',
//     height: 20,
//     width: 20,
//     marginLeft: 8,
//   },

//   buttonIcon: {
//     marginRight: 8,
//   },

//   instructionText: {
//     flex: 1,
//     paddingLeft: 12,
//     fontSize: 13, // Slightly bumped for better visual balance
//     color: AppColors.black,
//     fontWeight: '600',
//     // lineHeight: 20,
//   },

//   videoContainer: {
//     marginTop: 15,
//   },
//   contactCard: {
//     backgroundColor: AppColors.mainColor,
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   contactText: {
//     color: AppColors.white,
//     fontSize: 14,
//     marginVertical: 2,
//   },
//   verifiedBox: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   verifiedText: {
//     color: 'white',
//     marginRight: 6,
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });

// export default CompleteVerification;

import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {LeftArrow, Triangle_Icon} from '../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useState} from 'react';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;
const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CompleteVerification = ({navigation}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [contactList, setContactList] = useState([
    {
      id: '1',
      name: 'Rahul',
      number: '0987654321',
      relation: 'Friend',
      isVerified: true,
      bgColor: '#16588e',
      textColor: '#fff',
    },
    {
      id: '2',
      name: 'Xyz',
      number: '1234567890',
      relation: 'Daughter',
      isVerified: false,
      bgColor: '#ddd',
      textColor: '#000',
    },
  ]);

  const handleOtpSubmit = index => {
    const updatedList = [...contactList];
    updatedList[index].isVerified = true;
    updatedList[index].bgColor = '#16588e';
    updatedList[index].textColor = '#fff';
    updatedList[index].otp = '';
    setContactList(updatedList);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 12}}>
        <View style={styles.mainTopView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.mainTopContent}>
              <Text style={styles.trustedText}>Trusted & Trained Driver</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image
                source={Triangle_Icon}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <Text style={styles.mainHeading}>
            Driver Refrence Verification List
          </Text>
        </View>

        {/* Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            B-1/42, Gali Number 20, Kiran Garden, Uttam Nagar, Delhi, 110059
          </Text>
        </View>

        {/* Add Verifier Button */}
        <View style={styles.connectContainer}>
          <Pressable
            onPress={() => navigation.navigate('AddNewVerifier')}
            style={styles.connectButton}>
            <Icon
              color={AppColors.white}
              size={18}
              name="plus"
              style={styles.buttonIcon}
            />
            <Image style={styles.rightArrow} source={LeftArrow} />
          </Pressable>
          <Text style={styles.instructionText}>
            Create a list of your contacts using this button. They will receive
            an OTP on WhatsApp, and you need to collect that OTP from them and
            input it into the list. It is mandatory to have at least 3 contacts.
          </Text>
        </View>

        {/* YouTube Video */}
        <View style={styles.videoContainer}>
          <YoutubePlayer height={250} videoId="tcFjgwbvd8E" />
        </View>

        {/* FlatList for Contact Cards */}
        <FlatList
          data={contactList}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: item.bgColor,
                padding: 12,
                borderRadius: 10,
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: item.textColor,
                    fontSize: 14,
                    marginVertical: 2,
                    fontWeight: '500',
                  }}>
                  Name - {item.name}
                </Text>
                <Text
                  style={{
                    color: item.textColor,
                    fontSize: 14,
                    marginVertical: 2,
                    fontWeight: '500',
                  }}>
                  Number - {item.number}
                </Text>
                <Text
                  style={{
                    color: item.textColor,
                    fontSize: 14,
                    marginVertical: 2,
                    fontWeight: '500',
                  }}>
                  Relation - {item.relation}
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                {item.isVerified ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 6,
                        borderWidth: 2,
                        paddingHorizontal: 20,
                        borderColor: '#FFFFFF',
                        borderRadius: 10,
                        backgroundColor: '#25568D',
                      }}>
                      <Icon name="check" size={24} color="#FFFFFF" />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: 8,
                      }}>
                      <Text
                        style={{
                          color: item.textColor,
                          marginRight: 6,
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        Verified
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}>
                      <TextInput
                        placeholder="OTP भरें"
                        placeholderTextColor="#555"
                        value={item.otp}
                        onChangeText={text => {
                          const updatedList = [...contactList];
                          updatedList[index].otp = text;
                          setContactList(updatedList);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: '#aaa',
                          paddingVertical: 3,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          fontSize: 13,
                          minWidth: 80,
                          marginRight: 6,
                          backgroundColor: '#f9f9f9',
                          color: '#333',
                        }}
                      />
                      <Pressable
                        style={{
                          backgroundColor: '#2c5aa0',
                          paddingVertical: 6,
                          paddingHorizontal: 12,
                          borderRadius: 5,
                        }}
                        onPress={() => handleOtpSubmit(index)}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 13,
                            fontWeight: '600',
                          }}>
                          जमा करें
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
            </View>
          )}
          ListFooterComponent={<View style={{height: 20}} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trustedText: {
    position: 'absolute',
    color: AppColors.mainColor,
    marginLeft: 15,
    fontFamily: 'Roboto',
  },
  iconContainer: {
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    marginTop: 20,
  },
  mainTopContent: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    backgroundColor: AppColors.white,
  },
  mainHeading: {
    fontSize: 26,
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
  },
  addressContainer: {
    backgroundColor: '#d9e9f6',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: AppColors.black,
  },
  connectContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: AppColors.mainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: width * 0.2,
  },
  rightArrow: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  instructionText: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 13,
    color: AppColors.black,
    fontWeight: '600',
  },
  videoContainer: {
    marginTop: 15,
  },
});

export default CompleteVerification;
