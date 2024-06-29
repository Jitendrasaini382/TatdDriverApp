
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
const DriverLogin = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={false} />
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.mainView}>
            <View style={styles.mainTopView}>
              <View style={styles.mainTopContent}>
                <View style={styles.headingView}>
                  <Text style={styles.headingText}>
                    Trusted & Trained Driver
                  </Text>
                </View>
                <View style={styles.triangleMainView}>
                  <View style={styles.triangleView}></View>
                  <View
                    style={[
                      styles.triangleView,
                      {transform: [{rotate: '270deg'}]},
                    ]}></View>
                </View>
              </View>

              <Text style={styles.mainHeading}>Driver Login</Text>
            </View>

            <View style={styles.mainMiddleView}>
              <View style={styles.iconView}>
                <Icon name="phone" size={15} color={AppColors.greyColor} />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  placeholder="Enter Driver Mobile Number"
                  placeholderTextColor="rgb(42, 42, 42)"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('CheckDriverOtp')}>
              <View style={styles.btnView}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverLogin;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white'},
  contentContainer: {
    // flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    padding: 15,
    marginTop: 10,
  },
  mainView: {
    // margin: 15,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#16588e',
    width: '100%',
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    width: '100%',

    borderRadius: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  mainTopContent: {
    paddingRight: 6,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  headingView: {backgroundColor: AppColors.white, width: '80%', marginLeft: 0},
  headingText: {
    color: '#16588e',
    lineHeight: 20,
    fontSize: 14,
    paddingLeft: 4,
  },
  triangleMainView: {display: 'flex', flexDirection: 'column'},
  triangleView: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginLeft: -0.5,
  },
  mainHeading: {
    fontSize: 22,
    marginTop: 30,
    paddingBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: 'rgb(255, 255, 255)',
    lineHeight: 24.2,
    fontFamily: 'Roboto-Black',
  },
  mainMiddleView: {
    margin: 30,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
  },
  iconView: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: 36,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  inputView: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: AppColors.greyColor,
    borderTopColor: AppColors.greyColor,
    borderBlockColor: AppColors.greyColor,
    height: 36,
    width: '90%',
  },
  inputText: {
    height: 36,
    fontSize: 14,
    color: AppColors.black,
    // lineHeight: 20,
    justifyContent: 'center',
    // textAlign: 'auto',
    textAlign: 'left',
  },
  btnView: {
    backgroundColor: '#16588e',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    marginBottom: 40,
    width: '40%',
  },

  btnText: {
    fontSize: 14,
    color: AppColors.white,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
});
    






















// import React from 'react';
    // import {
    //   SafeAreaView,
    //   StyleSheet,
    //   Text,
    //   TextInput,
    //   TouchableOpacity,
    //   View,
    //   Dimensions,
    // } from 'react-native';
    // import Header from '../components/Header';
    // import Icon from 'react-native-vector-icons/FontAwesome';
    // import { AppColors } from '../assets/Colors';
    
    // const { width, height } = Dimensions.get('window');
    // const screenWidth = width;
    // const screenHeight = height;
    
    // const DriverLogin = ({ navigation }) => {
    //   return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //       <Header backButton={false} />
    //       <View style={styles.mainContainer}>
    //         <View style={styles.contentContainer}>
    //           <View style={styles.mainView}>
    //             <View style={styles.mainTopView}>
    //               <View style={styles.mainTopContent}>
    //                 <View style={styles.headingView}>
    //                   <Text style={styles.headingText}>
    //                     Trusted & Trained Driver
    //                   </Text>
    //                 </View>
    //                 <View style={styles.triangleMainView}>
    //                   <View style={styles.triangleView}></View>
    //                   <View
    //                     style={[
    //                       styles.triangleView,
    //                       { transform: [{ rotate: '270deg' }] },
    //                     ]}></View>
    //                 </View>
    //               </View>
    
    //               <Text style={styles.mainHeading}>Driver Login</Text>
    //             </View>
    
    //             <View style={styles.mainMiddleView}>
    //               <View style={styles.iconView}>
    //                 <Icon name="phone" size={screenWidth * 0.04} color={AppColors.greyColor} />
    //               </View>
    
    //               <View style={styles.inputView}>
    //                 <TextInput
    //                   style={styles.inputText}
    //                   keyboardType="numeric"
    //                   placeholder="Enter Driver Mobile Number"
    //                   placeholderTextColor="rgb(42, 42, 42)"
    //                 />
    //               </View>
    //             </View>
    
    //             <View style={styles.btnView}>
    //               <TouchableOpacity
    //                 onPress={() => navigation.navigate('CheckDriverOtp')}>
    //                 <Text style={styles.btnText}>Submit</Text>
    //               </TouchableOpacity>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </SafeAreaView>
    //   );
    // };
    
    // export default DriverLogin;
    
    // const styles = StyleSheet.create({
    //   mainContainer: { flex: 1, backgroundColor: 'white' },
    //   contentContainer: {
    //     backgroundColor: 'white',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 'auto',
    //     padding: screenWidth * 0.04,
    //     marginTop: screenHeight * 0.02,
    //   },
    //   mainView: {
    //     backgroundColor: AppColors.white,
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     borderColor: '#16588e',
    //     width: '100%',
    //   },
    //   mainTopView: {
    //     backgroundColor: AppColors.mainColor,
    //     width: '100%',
    //     borderRadius: 8,
    //     // marginBottom: screenHeight * 0.02,
    //     display: 'flex',
    //     flexDirection: 'column',
    //   },
    //   mainTopContent: {
    //     paddingRight: 6,
    //     paddingTop: screenHeight * 0.005,
    //     paddingBottom: screenHeight * 0.015,
    //     marginBottom: screenHeight * 0.02,
    //     display: 'flex',
    //     flexDirection: 'row',
    //   },
    //   headingView: { backgroundColor: AppColors.white, width: '80%', },
    //   headingText: {
    //     color: '#16588e',
    //     lineHeight: 20,
    //     fontSize: screenWidth * 0.035,
    //     paddingLeft: 4,
    //   },
    //   triangleMainView: { display: 'flex', flexDirection: 'column' },
    //   triangleView: {
    //     backgroundColor: 'transparent',
    //     borderStyle: 'solid',
    //     borderRightWidth: 10,
    //     borderTopWidth: 10,
    //     borderRightColor: 'transparent',
    //     borderTopColor: 'white',
    //     marginLeft: -1,
    //   },
    //   mainHeading: {
    //     fontSize: screenWidth * 0.055,
    //     marginTop: screenHeight * 0.02,
    //     paddingBottom: screenHeight * 0.015,
    //     fontWeight: '500',
    //     textAlign: 'center',
    //     letterSpacing: 0.3,
    //     color: 'rgb(255, 255, 255)',
    //     lineHeight: screenWidth * 0.06,
    //     fontFamily: 'Roboto-Black',
    //   },
    //   mainMiddleView: {
    //     margin: screenWidth * 0.08,
    //     marginTop: screenHeight * 0.07,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     display: 'flex',
    //     flexDirection: 'row',
    //   },
    //   iconView: {
    //     borderWidth: 1,
    //     borderColor: AppColors.greyColor,
    //     height: screenHeight * 0.04,
    //     padding: screenWidth * 0.025,
    //     backgroundColor: 'rgba(0,0,0,0)',
    //   },
    //   inputView: {
    //     borderTopWidth: 1,
    //     borderRightWidth: 1,
    //     borderBottomWidth: 1,
    //     borderRightColor: AppColors.greyColor,
    //     borderTopColor: AppColors.greyColor,
    //     borderBlockColor: AppColors.greyColor,
    //     height: screenHeight * 0.04,
    //     width: '90%',
    //   },
    //   inputText: {
    //     height: screenHeight * 0.04,
    //     fontSize: screenWidth * 0.035,
    //     color: AppColors.black,
    //     textAlign: 'left',
    //   },
    //   btnView: {
    //     backgroundColor: '#16588e',
    //     alignItems: 'center',
    //     borderRadius: 5,
    //     justifyContent: 'center',
    //     padding: screenHeight * 0.01,
    //     alignSelf: 'center',
    //     marginBottom: screenHeight * 0.05,
    //     width: '40%',
    //   },
    //   btnText: {
    //     fontSize: screenWidth * 0.035,
    //     color: AppColors.white,
    //     fontWeight: '400',
    //     fontFamily: 'Roboto-Regular',
    //   },
    // });
    
    // import {
    //   SafeAreaView,
    //   StyleSheet,
    //   Text,
    //   TextInput,
    //   TouchableOpacity,
    //   View,
    // } from 'react-native';
    // import React from 'react';
    // import Header from '../components/Header';
    // import Icon from 'react-native-vector-icons/FontAwesome';
    // import { AppColors } from '../assets/Colors';
    // import AppAccordion from '../components/Accordian';
    // const DriverLogin = ({navigation}) => {
    //   return (
    //     <SafeAreaView style={{flex: 1}}>
    //       <Header backButton={false} />
    //     <AppAccordion/>
    //     </SafeAreaView>
    //   );
    // };
    
    // export default DriverLogin;
