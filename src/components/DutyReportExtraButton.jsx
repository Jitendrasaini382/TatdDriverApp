import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';
import {useSelector} from 'react-redux';

const DutyReportExtraButton = ({
  showNeedHelp,
  showBack,
  customeNavigation = null,
  bookingNumber = '',
}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const needHelpShow = useSelector(e => e?.trustedDriverSlice?.isNeedHelpShow);

  console.log(
    needHelpShow,
    'needHelpShowneedHelpShowneedHelpShowneedHelpShow headerrrr',
  );

  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    if (customeNavigation && customeNavigation.name) {
      navigation.navigate(
        customeNavigation.name,
        customeNavigation.params || {},
      );
    } else {
      navigation.goBack();
    }
  }, [navigation, customeNavigation]);

  return (
    <View style={styles.mainView}>
      <View style={styles.leftView}>
        {needHelpShow && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TicketsDriver', {
                bookingNumber: bookingNumber,
              })
            }>
            <Text style={styles.leftText}>
              {languageSwitch == 'english' ? 'Need Help?' : ' मदद चाहिए?'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
        {showBack && (
          <TouchableOpacity
            onPress={() => handlePress()}
            style={{
              margin: 5,
              marginRight: 17,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              borderColor: 'rgb(204,204,204)',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: AppColors.black, margin: 5, opacity: 0.8}}>
              Back
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DutyReportExtraButton;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  leftView: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
  },
  leftText: {
    padding: 7,
    fontSize: 12,
    fontWeight: '500',
    color: AppColors.white,
  },
  rightView: {
    margin: 5,
    marginRight: 17,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
  },
  rightText: {
    padding: 7,
    fontSize: 12,
    fontWeight: '500',
    color: AppColors.white,
  },
});
