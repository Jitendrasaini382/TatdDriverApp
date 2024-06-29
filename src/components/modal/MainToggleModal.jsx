import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppColors } from '../../assets/Colors';

const {width} = Dimensions.get('window');

const MainToggleModal = ({setMainToggleModal}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setMainToggleModal(false)}>
         <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.mainView}>
            <View style={styles.mainTopView}>
              <View style={styles.mainTopContent}>
                <View style={styles.headingView}>
                  <Text style={styles.headingText}>Next 30 Minutes</Text>
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

              <View>
                <Text style={styles.mainHeading}>MOHIT DHANAWAT</Text>
              </View>
            </View>
            <View style={{padding: 5}}>
              <Text style={{color: AppColors.black, fontSize: 15}}>
                Are you available for any booking in the entire{' '}
                <Text style={{color: AppColors.mainColor,fontWeight: '500' }}> South Delhi </Text>
                 area in the next
                <Text style={{color: AppColors.mainColor,fontWeight: '500'}}> 30 minutes</Text> ?
                If yes, you will be notified by SMS as soon as an Express
                booking comes in.
              </Text>
            </View>
            <View style={{padding: 5}}>
              <Text style={{color: AppColors.black, fontSize: 15}}>
                Please do not provide incorrect information to avoid wasting
                both your and our time.
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', padding: 5, margin: 5}}>
            <TouchableOpacity style={{flex: 1}}>
              <View
                style={{
                  margin: 5,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  backgroundColor: AppColors.mainColor,
                }}>
                <Text style={{color: 'white'}}>I am available</Text>

                {/* <Button color={AppColors.mainColor} title="i am available" /> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <View
                style={{
                  margin: 5,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: AppColors.mainColor,
                }}>
                <Text style={{color: 'white'}}>I am not available</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
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
    borderRadius: 8,
    borderColor: '#16588e',
    width: '100%',
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  mainTopContent: {
    // paddingRight: 6,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  headingView: {backgroundColor: AppColors.white, width: '80%', marginLeft: 0},
  headingText: {
    color: AppColors.mainColor,
    fontSize: 15,
    paddingLeft: 4,
    // fontWeight: '200',
    fontFamily: 'Poppins-Regular',
  },
  triangleMainView: {display: 'flex', flexDirection: 'column'},
  triangleView: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  mainHeading: {
    fontSize: 27,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: 'rgb(255, 255, 255)',
    // lineHeight: 24.2,
    fontFamily: 'Roboto-Regular',
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
  

export default MainToggleModal;
