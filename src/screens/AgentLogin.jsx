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
  import { AppColors } from '../assets/Colors';
  const AgentLogin = ({navigation}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header backButton={true} />
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
  
                <Text style={styles.mainHeading}>Agent Login</Text>
              </View>
  
              <View style={styles.mainMiddleView}>
                <View style={styles.iconView}>
                  <Icon name="phone" size={15} color={AppColors.greyColor} />
                </View>
  
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    keyboardType="numeric"
                    placeholder="Enter Agent Mobile Number"
                    placeholderTextColor="rgb(42, 42, 42)"
                  />
                
                </View>
              </View>
  
              <View style={styles.btnView}>
                <TouchableOpacity
                //   onPress={() => navigation.navigate('CheckDriverOtp')}
                  >
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AgentLogin;
  
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
  