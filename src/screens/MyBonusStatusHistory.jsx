import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';

const MyBonusStatusHistory = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header backButton="true" />
      <View
        style={{
          marginTop: 30,
          padding: 10,
        }}>
        <View
          style={{
            borderColor: 'rgb(128,128,128)',
            backgroundColor: 'white',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 8,
            lineHeight: 20,
            shadowColor: 'rgb(128,128,128)',
            shadowOffset: {width: 5, height: 4},
            shadowOpacity: 5,
            elevation: 15,
            shadowRadius: 5,
            marginBottom: 20,
            padding: 10,
          }}>
          <View style={{padding: 14, alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '700',
                fontSize: 21,
                fontFamily: AppFont.regularFont,
              }}>
              MY Bonus
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              padding: 1.2,
              marginTop: 16,
              marginBottom: 24,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: AppColors.mainColor,

                //   padding: 3
              }}>
              <Text
                style={{
                  padding: 5,
                  margin: 1,
                  borderWidth: 0.5,
                  borderColor: '#DDDDDD',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Create Date
              </Text>
              <Text
                style={{
                  padding: 5,
                  margin: 1,
                  borderWidth: 0.5,
                  borderColor: '#DDDDDD',
                  textAlign: 'center',
                }}>
                Name
              </Text>
              <Text
                style={{
                  padding: 5,
                  margin: 1,
                  borderWidth: 0.5,
                  borderColor: '#DDDDDD',
                  textAlign: 'center',
                }}>
                Bonus Type
              </Text>
              <Text
                style={{
                  padding: 5,
                  margin: 1,
                  borderWidth: 0.5,
                  borderColor: '#DDDDDD',
                  textAlign: 'center',
                }}>
                Payment Status
              </Text>
              <Text
                style={{
                  padding: 5,
                  margin: 1,
                  borderWidth: 0.5,
                  borderColor: '#DDDDDD',
                  textAlign: 'center',
                }}>
                Amount
              </Text>
              {/* <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: 1,
                padding: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: AppFont.regularFont,
                  alignItems: 'center',
                }}>
                Create Date
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: 1,
                padding: 5,
              }}>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Name
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: 1,
                padding: 5,
              }}>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Bonus
              </Text>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Type
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: 1,
                padding: 5,
              }}>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Payment
              </Text>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Status
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                margin: 1,
                padding: 5,
              }}>
              <Text style={{color: 'white', fontFamily: AppFont.regularFont}}>
                Amount
              </Text>
            </View> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyBonusStatusHistory;

const styles = StyleSheet.create({});
