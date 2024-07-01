import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import { AppColors } from '../assets/Colors';
import TopRightComponent from './MyBookingModal';
import BookingsComponent from './Eeeeeeeeeeeeeeeeeeeeeeeeeee';

const ExtraButtons = ({OpenMyBookingModal}) => {
  // const [myBookingModal, setMyBookingModal] = useState(false);
  // const [myBookingModal, setMyBookingModal] = useState(true)

  // const [myBookingPage, setMyBookingPage] = useState(false)

  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        // marginTop:8
      }}>
      <View
        style={{
          margin: 5,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#16588e',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TicketsDriver')}>
          <Text
            style={{
              padding: 7,
              fontSize: 10,
              fontWeight: '500',
              color: 'white',
            }}>
            Need Help ?
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 5,
          marginRight: 17,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: AppColors.mainColor,
        }}>
        <TouchableOpacity
        // onPress={() => navigation.navigate('MyComponent')}>
        
        onPress={() => OpenMyBookingModal(true)}
        // onPress={() => setMyBookingModal(true)}OpenMyBookingModal
        // onPress={() => setMyBookingPage(!myBookingPage)}
        // onPress={() => console.warn('run')}
        
        >
          <Text
            style={{
              padding: 7,
              fontSize: 10,
              fontWeight: '500',
              color: 'white',
            }}>
            My Bookings
          </Text>
        </TouchableOpacity>
      </View>

      {/* {myBookingModal ? <TopRightComponent/>  : null} */}


      {/* {
        myBookingPage ? <MyComponent setMyBookingPage={setMyBookingPage} /> : null
      } */}
      {/* <Modal
        backdropOpacity={0}
        onBackdropPress={() => setMyBookingModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={myBookingModal}>
        <BookingsComponent setMyBookingModal={setMyBookingModal} />
      </Modal> */}
    </View>
    // ======================

  //   <View
  //   style={{
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     // marginTop:8
  //   }}>
  //   <View
  //     style={{
  //       margin: 5,
  //       borderWidth: 1,
  //       borderRadius: 5,
  //       backgroundColor: '#16588e',
  //     }}>
  //     <TouchableOpacity onPress={() => navigate.navigate('TicketsDriver')}>
  //       <Text
  //         style={{
  //           padding: 7,
  //           fontSize: 10,
  //           fontWeight: '500',
  //           color: 'white',
  //         }}>
  //         Need Help ?
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  //   <View
  //     style={{
  //       margin: 5,
  //       marginRight: 17,
  //       borderWidth: 1,
  //       borderRadius: 5,
  //       backgroundColor: '#16588e',
  //     }}>
  //     <TouchableOpacity onPress={() => setMyBookingModal(true)}>
  //       <Text
  //         style={{
  //           padding: 7,
  //           fontSize: 10,
  //           fontWeight: '500',
  //           color: 'white',
  //         }}>
  //         My Bookings
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // </View>
  // <Modal
  //   backdropOpacity={0}
  //   //   backdropOpacity={.5}
  //   onBackdropPress={() => setMyBookingModal(false)}
  //   animationIn={'fadeInDown'}
  //   animationOut={'fadeOutUp'}
  //   isVisible={myBookingModal}>
  //   <MyBookingModal setMyBookingModal={setMyBookingModal} />
  // </Modal>

  );
};

export default ExtraButtons;

const styles = StyleSheet.create({});
