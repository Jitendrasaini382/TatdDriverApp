import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../assets/Colors';
import {RightArrow} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import Modal from 'react-native-modal';
import MyBookingAgencyModal from './modal/MyBookingAgencyModal';

const {width} = Dimensions.get('window');

const BookingView = ({setMyBookingAgencyModal}) => {
  const bookings = [
    {
      type: 'Private Driver',
      cars: 'Altis Manual and Exter Automatic',
      amount: 200000,
      duration: '26 Days | 12 Hours',
      location: 'Vijay Nagar',
      eventType: 'Interview',
      date: '24 Jun, 10:00 AM',
    },
    {
      type: 'Govt Driver',
      cars: 'Creata Manual and Exter Automatic',
      amount: 500000,
      duration: '26 Days | 12 Hours',
      location: 'Kiran Nagar',
      eventType: 'Interview',
      date: '28 Jun, 10:00 AM',
    },
  ];

  <Modal
    backdropOpacity={0}
    onBackdropPress={() => setMyBookingAgencyModal(false)}
    animationIn={'fadeInDown'}
    animationOut={'fadeOutUp'}
    isVisible={true}>
    <MyBookingAgencyModal setMyBookingAgencyModal={setMyBookingAgencyModal} />
  </Modal>;

  const renderBooking = (booking, index) => (
    <View key={index} style={styles.bookingContainer}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{booking.type}</Text>
        <Text style={styles.bookingCars}>
          <Icon color={AppColors.white} name="car" /> {booking.cars}
        </Text>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <Icon color={AppColors.white} name="rupee" size={27} />
            {booking.amount}
          </Text>
          <Text style={styles.duration}>{booking.duration}</Text>
        </View>
        <Text style={styles.location}>{booking.location}</Text>
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>{booking.eventType}</Text>
          <Text style={styles.eventText}>{booking.date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.referButton}>
            <Text style={styles.referButtonText}>
              Refer Your Friend-
              <Icon name="rupee" />
              250
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.connectContainer}>
        <TouchableOpacity
          onPress={() => {
            setMyBookingAgencyModal(true)
          }}
          style={styles.connectButton}>
          <Icon color={'white'} size={15} name="plus" />
          <Image style={styles.rightArrow} source={RightArrow} />
        </TouchableOpacity>
        <Text style={styles.connectText}>
          Connect the driver to your network using this button and earn Rs 250.
        </Text>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Dear MOHIT DHANAWAT, from now on, if you have completed at least one
          booking in the last two days and are available for bookings, you will
          receive an SMS alert when a new booking comes in.
        </Text>
      </View>

      {bookings.map(renderBooking)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  connectContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
  },
  connectButton: {
    backgroundColor: AppColors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: width * 0.2,
  },
  rightArrow: {
    resizeMode: 'center',
    height: 20,
    width: 20,
  },
  connectText: {
    color: AppColors.black,
    flex: 1,
    paddingLeft: 15,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
    fontSize: 14,
  },
  notificationContainer: {
    marginBottom: 20,
    borderRadius: 5,
  },
  notificationText: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
    fontSize: 14,
  },
  bookingContainer: {
    marginTop: 20,
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 15,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.white,
  },
  bookingCars: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.white,
  },
  bookingDetails: {
    paddingLeft: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: AppColors.white,
  },
  duration: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: AppColors.white,
  },
  location: {
    color: AppColors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  eventText: {
    color: AppColors.white,
    fontSize: 15,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  referButton: {
    backgroundColor: '#ffa500',
    borderRadius: 8,
    padding: 10,
  },
  referButtonText: {
    color: AppColors.white,
  },
  acceptButton: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    padding: 10,
  },
  acceptButtonText: {
    color: AppColors.mainColor,
  },
});

export default BookingView;

// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import { AppColors } from '../assets/Colors';
// import { RightArrow } from '../assets/images';
// import { AppFont } from '../assets/FontsFamily';

// const BookingView = () => {
//   return (
//     <>
//     <View
//       style={{
//         flexDirection: 'row',
//         borderRadius: 5,
//       }}>
//       <TouchableOpacity
//         style={{
//           backgroundColor: AppColors.mainColor,
//           flex: 0.2,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-evenly',
//           paddingVertical: 12,
//           paddingHorizontal: 15,
//           borderRadius: 8,
//         }}>
//         {/* <View style={{}}> */}
//         <Icon color={'white'} size={15} name="plus" />
//         <Image
//           style={{resizeMode: 'center', height: 20, width: 20}}
//           source={RightArrow}
//         />
//         {/* </View> */}
//       </TouchableOpacity>
//       <Text
//         style={{
//           color: AppColors.black,
//           flex: 1,
//           paddingLeft: 15,
//           textAlign: 'left',
//           textAlignVertical: 'center',
//           fontFamily: AppFont.regularFont,
//           fontWeight: '500',
//           fontSize: 14,
//         }}>
//         Connect the driver to your network using this button and earn Rs
//         250.
//       </Text>
//     </View>

//     <View
//       style={{
//         marginTop: 15,
//         marginBottom: 100,
//         borderRadius: 5,
//       }}>
//       <Text
//         style={{
//           color: AppColors.black,
//           flex: 1,
//           fontFamily: AppFont.regularFont,
//           fontWeight: '500',
//           fontSize: 14,
//         }}>
//         Dear MOHIT DHANAWAT, from now on, if you have completed at least
//         one booking in the last two days and are available for bookings,
//         you will receive an SMS alert when a new booking comes in.
//       </Text>
//     </View>

//     {/* Booking View */}
//     {/* first */}
//     <View
//       style={{
//         marginTop: 20,
//         backgroundColor: AppColors.mainColor,
//         borderRadius: 10,
//       }}>
//       <View
//         style={{
//           paddingHorizontal: 15,
//           paddingTop: 20,
//           paddingBottom: 15,
//           flexDirection: 'column',
//         }}>
//         <View
//           style={{
//             // flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               color: 'white',
//               color: AppColors.white,
//             }}>
//             Private Driver
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               alignItems: 'flex-end',
//               color: AppColors.white,
//               marginLeft: 10,
//             }}>
//             <Icon color={AppColors.white} name="car" /> Altis Manual and
//             Exter Automatic
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             marginBottom: 20,
//             paddingLeft: 10,
//             flex: 1,
//           }}>
//           <View style={{flexDirection: 'row', flex: 1}}>
//             <Text
//               style={{
//                 fontSize: 32,
//                 fontWeight: '700',
//                 color: AppColors.white,
//               }}>
//               <Icon color={AppColors.white} name="rupee" size={27} />
//               200000
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginLeft: 5,
//                 paddingRight: 50,
//                 paddingTop: 15,
//                 color: AppColors.white,
//               }}>
//               26 Days | 12 Hours
//             </Text>
//           </View>
//           <View style={{flex: 1, marginBottom: 20}}>
//             <Text style={{color: AppColors.white, fontSize: 14}}>
//               Vijay Nagar
//             </Text>
//           </View>

//           <View style={{flexDirection: 'row', marginBottom: 15}}>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 Interview
//               </Text>
//             </View>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 24 Jun, 10:00 AM
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 15,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{backgroundColor: '#ffa500', borderRadius: 8}}>
//               <Text
//                 style={{
//                   color: AppColors.white,
//                   paddingHorizontal: 20,
//                   padding: 10,
//                 }}>
//                 Refer Your Friend-
//                 <Icon name="rupee" />
//                 250
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: AppColors.white,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: AppColors.mainColor,
//                   padding: 10,
//                   paddingHorizontal: 20,
//                 }}>
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>

//     {/* second */}

//     <View
//       style={{
//         marginTop: 20,
//         backgroundColor: AppColors.mainColor,
//         borderRadius: 10,
//       }}>
//       <View
//         style={{
//           paddingHorizontal: 15,
//           paddingTop: 20,
//           paddingBottom: 15,
//           flexDirection: 'column',
//         }}>
//         <View
//           style={{
//             // flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               color: 'white',
//               color: AppColors.white,
//             }}>
//             Private Driver
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               alignItems: 'flex-end',
//               color: AppColors.white,
//               marginLeft: 10,
//             }}>
//             <Icon color={AppColors.white} name="car" /> Altis Manual and
//             Exter Automatic
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             marginBottom: 20,
//             paddingLeft: 10,
//             flex: 1,
//           }}>
//           <View style={{flexDirection: 'row', flex: 1}}>
//             <Text
//               style={{
//                 fontSize: 32,
//                 fontWeight: '700',
//                 color: AppColors.white,
//               }}>
//               <Icon color={AppColors.white} name="rupee" size={27} />
//               200000
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginLeft: 5,
//                 paddingRight: 50,
//                 paddingTop: 15,
//                 color: AppColors.white,
//               }}>
//               26 Days | 12 Hours
//             </Text>
//           </View>
//           <View style={{flex: 1, marginBottom: 20}}>
//             <Text style={{color: AppColors.white, fontSize: 14}}>
//               Vijay Nagar
//             </Text>
//           </View>

//           <View style={{flexDirection: 'row', marginBottom: 15}}>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 Interview
//               </Text>
//             </View>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 24 Jun, 10:00 AM
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 15,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{backgroundColor: '#ffa500', borderRadius: 8}}>
//               <Text
//                 style={{
//                   color: AppColors.white,
//                   paddingHorizontal: 20,
//                   padding: 10,
//                 }}>
//                 Refer Your Friend-
//                 <Icon name="rupee" />
//                 250
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: AppColors.white,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: AppColors.mainColor,
//                   padding: 10,
//                   paddingHorizontal: 20,
//                 }}>
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>

//                  {/* first */}
//     <View
//       style={{
//         marginTop: 20,
//         backgroundColor: AppColors.mainColor,
//         borderRadius: 10,
//       }}>
//       <View
//         style={{
//           paddingHorizontal: 15,
//           paddingTop: 20,
//           paddingBottom: 15,
//           flexDirection: 'column',
//         }}>
//         <View
//           style={{
//             // flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               color: 'white',
//               color: AppColors.white,
//             }}>
//             Private Driver
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               alignItems: 'flex-end',
//               color: AppColors.white,
//               marginLeft: 10,
//             }}>
//             <Icon color={AppColors.white} name="car" /> Altis Manual and
//             Exter Automatic
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             marginBottom: 20,
//             paddingLeft: 10,
//             flex: 1,
//           }}>
//           <View style={{flexDirection: 'row', flex: 1}}>
//             <Text
//               style={{
//                 fontSize: 32,
//                 fontWeight: '700',
//                 color: AppColors.white,
//               }}>
//               <Icon color={AppColors.white} name="rupee" size={27} />
//               200000
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginLeft: 5,
//                 paddingRight: 50,
//                 paddingTop: 15,
//                 color: AppColors.white,
//               }}>
//               26 Days | 12 Hours
//             </Text>
//           </View>
//           <View style={{flex: 1, marginBottom: 20}}>
//             <Text style={{color: AppColors.white, fontSize: 14}}>
//               Vijay Nagar
//             </Text>
//           </View>

//           <View style={{flexDirection: 'row', marginBottom: 15}}>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 Interview
//               </Text>
//             </View>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 24 Jun, 10:00 AM
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 15,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{backgroundColor: '#ffa500', borderRadius: 8}}>
//               <Text
//                 style={{
//                   color: AppColors.white,
//                   paddingHorizontal: 20,
//                   padding: 10,
//                 }}>
//                 Refer Your Friend-
//                 <Icon name="rupee" />
//                 250
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: AppColors.white,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: AppColors.mainColor,
//                   padding: 10,
//                   paddingHorizontal: 20,
//                 }}>
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>

//     {/* second */}

//     <View
//       style={{
//         marginTop: 20,
//         backgroundColor: AppColors.mainColor,
//         borderRadius: 10,
//       }}>
//       <View
//         style={{
//           paddingHorizontal: 15,
//           paddingTop: 20,
//           paddingBottom: 15,
//           flexDirection: 'column',
//         }}>
//         <View
//           style={{
//             // flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               color: 'white',
//               color: AppColors.white,
//             }}>
//             Private Driver
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '500',
//               alignItems: 'flex-end',
//               color: AppColors.white,
//               marginLeft: 10,
//             }}>
//             <Icon color={AppColors.white} name="car" /> Altis Manual and
//             Exter Automatic
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             marginBottom: 20,
//             paddingLeft: 10,
//             flex: 1,
//           }}>
//           <View style={{flexDirection: 'row', flex: 1}}>
//             <Text
//               style={{
//                 fontSize: 32,
//                 fontWeight: '700',
//                 color: AppColors.white,
//               }}>
//               <Icon color={AppColors.white} name="rupee" size={27} />
//               200000
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginLeft: 5,
//                 paddingRight: 50,
//                 paddingTop: 15,
//                 color: AppColors.white,
//               }}>
//               26 Days | 12 Hours
//             </Text>
//           </View>
//           <View style={{flex: 1, marginBottom: 20}}>
//             <Text style={{color: AppColors.white, fontSize: 14}}>
//               Vijay Nagar
//             </Text>
//           </View>

//           <View style={{flexDirection: 'row', marginBottom: 15}}>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 Interview
//               </Text>
//             </View>
//             <View style={{margin: 5}}>
//               <Text style={{color: AppColors.white, fontSize: 15}}>
//                 24 Jun, 10:00 AM
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 15,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{backgroundColor: '#ffa500', borderRadius: 8}}>
//               <Text
//                 style={{
//                   color: AppColors.white,
//                   paddingHorizontal: 20,
//                   padding: 10,
//                 }}>
//                 Refer Your Friend-
//                 <Icon name="rupee" />
//                 250
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: AppColors.white,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: AppColors.mainColor,
//                   padding: 10,
//                   paddingHorizontal: 20,
//                 }}>
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>

//   </>
//   )
// }

// export default BookingView

// const styles = StyleSheet.create({})
