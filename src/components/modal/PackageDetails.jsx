
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';

const PackageDetails = ({setModalVisible}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View
        style={{
          borderWidth: 1,
          borderColor: AppColors.mainColor,
          flexDirection: 'column',
          backgroundColor: AppColors.white,
        }}>
        <View
          style={{
            borderColor: '#ccc',
            borderBottomRightRadius: 5,
            borderWidth: 1,
            padding: 15,
            borderBottomLeftRadius: 5,
            marginBottom: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', fontSize: 15, color: AppColors.black}}>
              Package Details
            </Text>
            <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{backgroundColor: AppColors.mainColor, borderRadius: 5}}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 15,
                  color: AppColors.white,
                  padding: 5,
                  //   paddingHorizontal:10,
                  //   margin:5
                }}>
                <Icon name="close" size={15} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 50}}>
            <Text style={{color: AppColors.black, fontFamily: 'Nirmala'}}>
              Salary - Rs 20000
            </Text>
            <Text style={{color: AppColors.black, fontFamily: 'Nirmala'}}>
              Working Days - 26
            </Text>
            <Text style={{color: AppColors.black, fontFamily: 'Nirmala'}}>
              Working Hours - 12
            </Text>
            <Text style={{color: AppColors.black, fontFamily: 'Nirmala'}}>
              Overtime - 60 Rs Per Hour
            </Text>
            <Text
              style={{color: AppColors.black, fontFamily: 'Nirmala', marginTop: 20}}>
              Trial 2 hours - 0 Rs का है।
            </Text>
            <Text style={{color: AppColors.mainColor}}>
              <Icon name="circle" color={AppColors.black} size={5} /> ध्यान रहे - हमे
              कस्टमर की परेशानी कम करनी है उसे बढ़ाना नहीं। Accept करने के बाद,
              कस्टमर के पास नहीं पहुँचने पर, आपकी ID हमेशा के लिए या फिर 21 दिन
              के लिए बंद हो जाएगी।
            </Text>
            <Text style={{color: AppColors.black, fontFamily: 'Nirmala'}}>
              <Icon name="circle" color={AppColors.black} size={5} /> Return to TAT D -
              Rs. 0
            </Text>
          </View>
        </View>
        <View style={{marginTop: 15, alignSelf: 'center', marginBottom: 10}}>
          <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{paddingl: 18, backgroundColor: AppColors.mainColor}}>
            <Text
              style={{
                paddingHorizontal: 40,
                paddingVertical: 9,
                fontFamily: 'Nirmala',
              }}>
              {' '}
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    marginBottom: 10,
    color: AppColors.black,
  },
  closeButtonBottom: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonBottomText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
});

export default PackageDetails;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const PackageDetails = () => {
//   return (
//     <View>
//       <Text>PackageDetails</Text>
//     </View>
//   )
// }

// export default PackageDetails

// const styles = StyleSheet.create({})