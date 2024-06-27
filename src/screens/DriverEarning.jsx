import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../components/Header';

const DriverEarning = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header backButton={true} />

      <View style={{margin: 0, justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 40,
            marginRight: 15,
            marginBottom: 10,
          }}>
          {/* <Text style={{color: 'black', fontWeight: '400', }}>
            {' '}
            My tatd Earning <Icon name="rupee" Size={30} />0
          </Text> */}

          <View style={{position: 'relative'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                paddingBottom: 3, // Space between text and underline
              }}>
              My tatd Earning <Icon name="rupee" Size={30} />0
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: .5, // Thickness of the underline
                backgroundColor: 'black', // Color of the underline
              }}
            />
          </View>

          <Text
            style={{
              marginRight: 10,
              fontSize: 1,
              textDecorationLine: 'underline',
            }}></Text>
        </View>
        <View
          style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 0,
          }}>
          <View
            style={{
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 10,
              paddingVertical: 6,
              paddingHorizontal: 40,
              textAlign: 'center',
              justifyContent: 'center',
              margin: 5,
            }}>
            <Text
              style={{
                fontWeight: '600',
                textAlign: 'center',
                color: 'white',
                fontSize: 13,
              }}>
              <Icon name="rupee" /> 0
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                color: 'white',
                fontSize: 10,
              }}>
              7 days
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 10,
              paddingVertical: 6,
              paddingHorizontal: 40,
              textAlign: 'center',
              justifyContent: 'center',
              margin: 5,
            }}>
            <Text
              style={{
                fontWeight: '600',
                textAlign: 'center',
                color: 'white',
                fontSize: 13,
              }}>
              <Icon name="rupee" /> 0
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                color: 'white',
                fontSize: 10,
              }}>
              7 days
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 10,
              paddingVertical: 6,
              paddingHorizontal: 40,
              textAlign: 'center',
              margin: 5,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: '600',
                textAlign: 'center',
                color: 'white',
                fontSize: 13,
              }}>
              <Icon name="rupee" /> 0
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                color: 'white',
                fontSize: 10,
              }}>
              7 days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DriverEarning;

const styles = StyleSheet.create({});
