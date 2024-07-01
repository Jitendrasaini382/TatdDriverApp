import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CheckDriverOtp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.headerTextContainer}>
                <View style={styles.whiteBackground}>
                  <Text style={styles.headerText}>
                    Verified & Experienced Driver
                  </Text>
                </View>
                <View style={styles.triangleContainer}>
                  <View style={styles.triangleTop} />
                  <View style={styles.triangleBottom} />
                </View>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Submit OTP</Text>
              </View>
            </View>

            <View style={styles.otpInfoContainer}>
              <Text style={styles.otpInfoText}>
                An OTP is sent to 9810369319{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.warn('Resend Otp');
                }}>
                <Text style={styles.resendText}>Resend OTP ?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="sign-in"
                  size={moderateScale(16)}
                  color="rgb(183, 183, 183)"
                />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="Enter OTP or Password"
                  placeholderTextColor="rgb(42,42,42)"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => navigation.navigate('TrustedDriver')}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: 10
    // flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingVertical: verticalScale(10),
    // padding: moderateScale(15),

    // padding: 10
  },
  card: {
    margin: moderateScale(15),
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: moderateScale(10),
    borderColor: AppColors.mainColor,
    // width: '92%',
    // padding: 15
  },
  cardHeader: {
    backgroundColor: AppColors.mainColor,
    // width: '100%',
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(12),
  },
  headerTextContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  whiteBackground: {
    backgroundColor: AppColors.white,
    width: '80%',
  },
  headerText: {
    color: AppColors.mainColor,
    lineHeight: verticalScale(20),
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },
  triangleContainer: {
    flexDirection: 'column',
  },
  triangleTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(10),
    borderTopWidth: moderateScale(10),
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginLeft: -0.5,
  },
  triangleBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(10),
    borderTopWidth: moderateScale(10),
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginLeft: -0.5,
    transform: [{rotate: '270deg'}],
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(22),
    marginTop: verticalScale(20),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    fontFamily: 'Roboto-Black',
    color: 'rgb(255,255,255)',
    lineHeight: verticalScale(24.2),
  },
  otpInfoContainer: {
    margin: moderateScale(10),
    marginTop: 0,
    alignItems: 'flex-start',
    paddingLeft: moderateScale(8),
  },
  otpInfoText: {
    color: 'rgb(146,146,146)',
    fontWeight: '400',
    fontSize: moderateScale(14),
  },
  resendText: {
    color: 'rgb(146,146,146)',
    fontWeight: '400',
    borderBottomWidth: 0.5,
    fontSize: moderateScale(14),
    borderColor: '#888',
    marginTop: verticalScale(5),
  },
  inputContainer: {
    marginBottom: verticalScale(30),
    marginTop: verticalScale(25),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: moderateScale(30),
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'rgb(183,183,183)',
    height: verticalScale(36),
    padding: moderateScale(10),
    paddingTop: verticalScale(5),
  },
  textInputContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(183,183,183)',
    width: '80%',
    height: verticalScale(36),
  },
  textInput: {
    color: AppColors.black,
    justifyContent: 'center',
    textAlign: 'left',
    height: verticalScale(36),
    fontSize: moderateScale(14),
  },
  verifyButton: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginBottom: verticalScale(40),
    width: '40%',
  },
  verifyButtonText: {
    fontSize: moderateScale(14),
    color: AppColors.white,
    fontWeight: '400',
  },
});

export default CheckDriverOtp;

// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Header from '../components/Header';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {AppColors} from '../assets/Colors';

// const CheckDriverOtp = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <ScrollView>
//         <View style={styles.contentContainer}>
//           <View style={styles.card}>
//             <View style={styles.cardHeader}>
//               <View style={styles.headerTextContainer}>
//                 <View style={styles.whiteBackground}>
//                   <Text style={styles.headerText}>
//                     Verified & Experienced Driver
//                   </Text>
//                 </View>
//                 <View style={styles.triangleContainer}>
//                   <View style={styles.triangleTop} />
//                   <View style={styles.triangleBottom} />
//                 </View>
//               </View>
//               <View style={styles.titleContainer}>
//                 <Text style={styles.title}>Submit OTP</Text>
//               </View>
//             </View>

//             <View style={styles.otpInfoContainer}>
//               <Text style={styles.otpInfoText}>
//                 An OTP is sent to 9810369319{' '}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   console.warn('Resend Otp');
//                 }}>
//                 <Text style={styles.resendText}>Resend OTP ?</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.iconContainer}>
//                 <Icon name="sign-in" size={16} color="rgb(183, 183, 183)" />
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   keyboardType="numeric"
//                   placeholder="Enter OTP or Password"
//                   placeholderTextColor="rgb(42,42,42)"
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.verifyButton}
//               onPress={() => navigation.navigate('TrustedDriver')}>
//               <Text style={styles.verifyButtonText}>Verify</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   contentContainer: {
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   card: {
//     margin: 15,
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: AppColors.mainColor,
//     width: '92%',
//   },
//   cardHeader: {
//     backgroundColor: AppColors.mainColor,
//     width: '100%',
//     borderRadius: 6,
//     marginBottom: 12,
//   },
//   headerTextContainer: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     marginBottom: 12,
//   },
//   whiteBackground: {
//     backgroundColor: AppColors.white,
//     width: '80%',
//   },
//   headerText: {
//     color: AppColors.mainColor,
//     lineHeight: 20,
//     fontSize: 14,
//     paddingLeft: 4,
//   },
//   triangleContainer: {
//     flexDirection: 'column',
//   },
//   triangleTop: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: 10,
//     borderTopWidth: 10,
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     marginLeft: -0.5,
//   },
//   triangleBottom: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: 10,
//     borderTopWidth: 10,
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     marginLeft: -0.5,
//     transform: [{rotate: '270deg'}],
//   },
//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 22,
//     marginTop: 20,
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto-Black',
//     color: 'rgb(255,255,255)',
//     lineHeight: 24.2,
//   },
//   otpInfoContainer: {
//     margin: 10,
//     marginTop: 0,
//     alignItems: 'flex-start',
//     paddingLeft: 8,
//   },
//   otpInfoText: {
//     color: 'rgb(146,146,146)',
//     fontWeight: '400',
//     fontSize: 14,
//   },
//   resendText: {
//     color: 'rgb(146,146,146)',
//     fontWeight: '400',
//     borderBottomWidth: 0.5,
//     fontSize: 14,
//     borderColor: '#888',
//     marginTop: 5,
//   },
//   inputContainer: {
//     marginBottom: 30,
//     marginTop: 25,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//     marginLeft: 30,
//   },
//   iconContainer: {
//     borderWidth: 1,
//     borderColor: 'rgb(183,183,183)',
//     height: 36,
//     padding: 10,
//     paddingTop: 5,
//   },
//   textInputContainer: {
//     borderTopWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: 'rgb(183,183,183)',
//     width: '80%',
//     height: 36,
//   },
//   textInput: {
//     color: AppColors.black,
//     justifyContent: 'center',
//     textAlign: 'left',
//     height: 36,
//   },
//   verifyButton: {
//     backgroundColor: AppColors.mainColor,
//     alignItems: 'center',
//     borderRadius: 5,
//     justifyContent: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     alignSelf: 'center',
//     marginBottom: 40,
//     width: '40%',
//   },
//   verifyButtonText: {
//     fontSize: 14,
//     color: AppColors.white,
//     fontWeight: '400',
//   },
// });

// export default CheckDriverOtp;

// // import {
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import React from 'react';
// // import Header from '../components/Header';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import {AppColors} from '../assets/Colors';
// // const CheckDriverOtp = ({navigation}) => {
// //   return (
// //     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
// //       <Header />

// //       <ScrollView>
// //         <View
// //           style={{
// //             backgroundColor: 'white',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             height: 'auto',
// //             marginTop: 10,
// //           }}>
// //           <View
// //             style={{
// //               margin: 15,
// //               backgroundColor: AppColors.white,
// //               borderWidth: 1,
// //               borderRadius: 10,
// //               borderColor: AppColors.mainColor,
// //               width: '92%',
// //             }}>
// //             <View
// //               style={{
// //                 backgroundColor: AppColors.mainColor,
// //                 width: '100%',
// //                 borderRadius: 6,
// //                 marginBottom: 12,
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //               }}>
// //               <View
// //                 style={{
// //                   paddingRight: 6,
// //                   paddingTop: 10,
// //                   paddingBottom: 10,
// //                   marginBottom: 12,
// //                   display: 'flex',
// //                   flexDirection: 'row',
// //                 }}>
// //                 <View
// //                   style={{
// //                     backgroundColor: AppColors.white,
// //                     width: '80%',
// //                     marginLeft: 0,
// //                   }}>
// //                   <Text
// //                     style={{
// //                       color: AppColors.mainColor,
// //                       lineHeight: 20,
// //                       fontSize: 14,
// //                       paddingLeft: 4,
// //                     }}>
// //                     Verified & Experienced Driver
// //                   </Text>
// //                 </View>
// //                 <View style={{display: 'flex', flexDirection: 'column'}}>
// //                   <View
// //                     style={{
// //                       backgroundColor: 'transparent',
// //                       borderStyle: 'solid',
// //                       borderRightWidth: 10,
// //                       borderTopWidth: 10,
// //                       borderRightColor: 'transparent',
// //                       borderTopColor: 'white',
// //                       marginLeft: -0.5,
// //                     }}></View>
// //                   <View
// //                     style={{
// //                       backgroundColor: 'transparent',
// //                       borderStyle: 'solid',
// //                       borderRightWidth: 10,
// //                       borderTopWidth: 10,
// //                       borderRightColor: 'transparent',
// //                       borderTopColor: 'white',
// //                       marginLeft: -0.5,
// //                       transform: [{rotate: '270deg'}],
// //                     }}></View>
// //                 </View>
// //               </View>

// //               <View
// //                 style={{
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                   marginBottom: 15,
// //                 }}>
// //                 <Text
// //                   style={{
// //                     fontSize: 22,
// //                     marginTop: 20,
// //                     fontWeight: '500',
// //                     textAlign: 'center',
// //                     letterSpacing: 0.3,
// //                     fontFamily: 'Roboto-Black',
// //                     color: 'rgb(255,255,255)',
// //                     lineHeight: 24.2,
// //                   }}>
// //                   Submit OTP
// //                 </Text>
// //               </View>
// //             </View>

// //             <View
// //               style={{
// //                 margin: 10,
// //                 marginTop: 0,
// //                 alignItems: 'flex-start',
// //                 paddingLeft: 8,
// //               }}>
// //               <Text
// //                 style={{
// //                   color: 'rgb(146,146,146)',
// //                   fontWeight: '400',
// //                   fontSize: 14,
// //                 }}>
// //                 An OTP is sent to 9810369319{' '}
// //               </Text>
// //               <TouchableOpacity
// //                 onPress={() => {
// //                   console.warn('Resend Otp');
// //                 }}>
// //                 <Text
// //                   style={{
// //                     color: 'rgb(146,146,146)',
// //                     fontWeight: '400',
// //                     borderBottomWidth: 0.5,
// //                     fontSize: 14,
// //                     borderColor: '#888',
// //                     marginTop: 5,
// //                   }}>
// //                   Resend OTP ?
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View
// //               style={{
// //                 marginBottom: 30,
// //                 marginTop: 25,
// //                 justifyContent: 'flex-start',
// //                 alignItems: 'flex-start',
// //                 display: 'flex',
// //                 flexDirection: 'row',
// //                 marginLeft: 30,
// //               }}>
// //               <View
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: 'rgb(183,183,183)',
// //                   height: 36,
// //                   padding: 10,
// //                   paddingTop: 5,
// //                 }}>
// //                 <Icon name="sign-in" size={16} color="rgb(183, 183, 183)" />
// //               </View>

// //               <View
// //                 style={{
// //                   borderTopWidth: 1,
// //                   borderRightWidth: 1,
// //                   borderBottomWidth: 1,
// //                   borderRightColor: 'rgb(183,183,183)',
// //                   borderTopColor: 'rgb(183,183,183)',
// //                   borderBlockColor: 'rgb(183,183,183)',
// //                   width: '80%',
// //                   height: 36,
// //                 }}>
// //                 <TextInput
// //                   style={{
// //                     color: AppColors.black,
// //                     justifyContent: 'center',
// //                     textAlign: 'left',
// //                     height: 36,
// //                   }}
// //                   keyboardType="numeric"
// //                   placeholder="Enter OTP or Password"
// //                   placeholderTextColor="rgb(42,42,42)"
// //                 />
// //               </View>
// //             </View>

// //             <TouchableOpacity
// //               onPress={() => navigation.navigate('TrustedDriver')}>
// //               <View
// //                 style={{
// //                   backgroundColor: AppColors.mainColor,
// //                   alignItems: 'center',
// //                   borderRadius: 5,
// //                   justifyContent: 'center',
// //                   paddingTop: 8,
// //                   paddingBottom: 8,
// //                   paddingLeft: 10,
// //                   paddingRight: 10,
// //                   alignSelf: 'center',
// //                   marginBottom: 40,
// //                   width: '40%',
// //                 }}>
// //                 <Text
// //                   style={{
// //                     fontSize: 14,
// //                     color: AppColors.white,
// //                     fontFamily: '',
// //                     fontWeight: '400',
// //                   }}>
// //                   Verify
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default CheckDriverOtp;

// // const styles = StyleSheet.create({});
