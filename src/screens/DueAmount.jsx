import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {Triangle_Icon} from '../assets/images';
import {AppColors} from '../assets/Colors';
import {DUE_AMOUNT} from '../apis/Apis';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const DueAmount = ({route, navigation}) => {
  const [textWidth, setTextWidth] = useState(0);
  const [dueData, setDueData] = useState({});
  const {bookingNumber} = route?.params;
  const [loading, setLoading] = useState(false);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDueAmount(bookingNumber);
    }, [bookingNumber]),
  );

  const getDueAmount = async bookingNumber => {
    try {
      const response = await DUE_AMOUNT({
        booking_number: bookingNumber,
        current_language: languageSwitch,
      });

      if (response.status_code == 200) {
        setDueData(response.data);
        setLoading(false);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'small'} color={AppColors.mainColor} />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.dueContainer}>
            <View style={styles.header}>
              <View style={styles.trustedContainer}>
                <Text style={styles.trustedText}>{dueData?.category}</Text>
                <View style={styles.iconContainer}>
                  <Image
                    source={Triangle_Icon}
                    resizeMode={'cover'}
                    style={styles.icon}
                  />
                </View>
              </View>
              <View style={styles.dueTextContainer}>
                <Text style={styles.dueText}>Due</Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 60,
              }}>
              <Text style={styles.duePrice}>₹ {dueData?.balance_amount}</Text>
              <Text
                style={{color: 'blue'}}
                onPress={() =>
                  navigation.navigate('DueAmountDetails', {
                    bookingNumber: dueData?.booking_number,
                  })
                }
                onLayout={event => {
                  const {width} = event.nativeEvent.layout;
                  setTextWidth(width);
                }}>
                {dueData?.invoice_text}
              </Text>
              <View style={[styles.dividerInput, {width: textWidth}]} />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  marginTop: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                    margin: 5,
                    fontWeight: '600',
                    paddingHorizontal: 10,
                  }}>
                  {dueData?.action_text}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DueAmount;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  dueContainer: {
    margin: 20,
    borderBottomWidth: 2,
    borderLeftColor: AppColors.mainColor,
    borderRightColor: AppColors.mainColor,
    borderBottomColor: AppColors.mainColor,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
  },
  header: {
    backgroundColor: AppColors.mainColor,
    height: 100,
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: AppColors.mainColor,
  },
  trustedContainer: {
    marginVertical: 7,
    height: 20,
    width: '78%',
    backgroundColor: 'white',
  },
  trustedText: {
    position: 'absolute',
    color: AppColors.mainColor,
    marginLeft: 5,
    fontFamily: 'Roboto',
  },
  iconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    left: 20,
  },
  icon: {
    width: 20,
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: 'white',
  },
  dueTextContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dueText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  duePrice: {
    color: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
    //alignItems:'center'
  },
  dividerInput: {
    height: 1.2,
    backgroundColor: 'black',
  },
});
