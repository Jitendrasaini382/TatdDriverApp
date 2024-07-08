import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
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

const AgentLogin = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={false} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                        styles.rotatedTriangle,
                      ]}></View>
                  </View>
                </View>
                <Text style={styles.mainHeading}>Agent Login</Text>
              </View>

              <View style={styles.mainMiddleView}>
                <View style={styles.iconView}>
                  <Icon
                    name="phone"
                    size={moderateScale(15)}
                    color={AppColors.greyColor}
                  />
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
                style={styles.btnView}
                onPress={() => navigation.navigate('CheckAgentOtp')}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: moderateScale(15),
  },
  mainView: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: AppColors.mainColor,
    width: '100%',
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    width: '100%',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  mainTopContent: {
    flexDirection: 'row',
    paddingRight: moderateScale(6),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  headingView: {
    backgroundColor: AppColors.white,
    width: '80%',
  },
  headingText: {
    color: '#16588e',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },
  triangleMainView: {
    flexDirection: 'column',
  },
  triangleView: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(12),
    borderTopWidth: moderateScale(12),
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },
  mainHeading: {
    fontSize: moderateScale(22),
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
    fontFamily: 'Roboto-Black',
  },
  mainMiddleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: verticalScale(50),
  },
  iconView: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    padding: moderateScale(10),
  },
  inputView: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    flex: 1,
  },
  inputText: {
    height: verticalScale(36),
    fontSize: moderateScale(14),
    color: AppColors.black,
    textAlign: 'left',
  },
  btnView: {
    backgroundColor: '#16588e',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(40),
    width: '40%',
  },
  btnText: {
    fontSize: moderateScale(14),
    color: AppColors.white,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
});

export default AgentLogin;
