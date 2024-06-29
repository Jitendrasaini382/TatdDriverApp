import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../assets/Colors';

const MyBookingAgencyModal = ({setMyBookingAgencyModal, setModalVisible}) => {
  return (
    // <TouchableWithoutFeedback onPress={() => setMyBookingAgencyModal(false)}>
    // <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <SafeAreaView style={{flex: 1, }}>
        <View
          style={{
            backgroundColor: 'white',
            // height:800,
            // flex: 1,
            borderRadius: 20,
            shadowColor: AppColors.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            // shadowOpacity: 10,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <View style={{}}>
            <View style={{padding: 15}}>
              <View>
                {/* top */}
                <View
                  style={{
                    paddingTop: 6,
                    paddingBottom: 10,
                    // borderWidth: 1,
                    borderRadius: 5,

                    backgroundColor: AppColors.mainColor,

                    marginBottom: 12,
                  }}>
                  <View style={styles.cardHeader}>
                    <View style={styles.headerTextContainer}>
                      <View style={styles.whiteBackground}>
                        <Text style={styles.headerText}>Mohmd Varish</Text>
                      </View>
                      <View style={styles.triangleContainer}>
                        <View style={styles.triangleTop} />
                        <View style={styles.triangleBottom} />
                      </View>
                    </View>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>My Booking Agency</Text>
                    </View>
                  </View>
                </View>
                {/* bottam */}

                <View style={{}}>
                  <Text style={styles.mainText}>
                    This opportunity was initially given to only a few drivers.
                    We are extremely pleased that now you will be able to earn a
                    10% commission by directly booking for customers through the
                    booking panel. For this, you will have to press the given
                    button on your panel, which will allow you to directly
                    create a booking for the customer. Your commission will be
                    added to the agent commission when the customer's trip
                    begins, and it will be transferred to your bank account on
                    Wednesday.
                  </Text>
                  <View
                    style={[
                      styles.mainText,
                      {flexDirection: 'column', display: 'flex'},
                    ]}>
                    <Text style={{color: AppColors.black}}>
                      After becoming a booking agency:
                    </Text>
                    <Text style={{color: AppColors.black}}>
                      1) You will be able to make bookings for your
                      acquaintances.
                    </Text>
                    <Text style={{color: AppColors.black}}>
                      2) If a company customer asks you for a booking, you can
                      also make their booking.
                    </Text>
                    <Text style={{color: AppColors.black}}>
                      A 10% commission will be given to the booking agency for
                      both types of customers.
                    </Text>
                  </View>
                  <Text style={styles.mainText}>
                    The more bookings you make, the larger your booking agency
                    will grow. In June 2023, an additional 500 Rs will be given
                    after completing 10 bookings for the booking agency.
                  </Text>
                  <Text style={styles.mainText}>
                    Have a good day. Thank you.
                  </Text>
                  <Text style={styles.mainText}>
                    Ensure that if you go to a company customer without a
                    booking, your account will be permanently closed.
                  </Text>
                </View>
                <View style={{alignItems: 'center', margin: 10}}>
                  <Button
                    onPress={() => Alert.alert(' Looking... Booking Page ')}
                    color={AppColors.mainColor}
                    title="Book Now"
                  />

                  {/* <TouchableOpacity>
                        <Text > Book Now </Text>
                    </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default MyBookingAgencyModal;
const styles = StyleSheet.create({
  cardHeader: {
    backgroundColor: AppColors.mainColor,
    // width: '100%',
    borderRadius: 6,
    marginBottom: 12,
  },
  headerTextContainer: {
    flexDirection: 'row',
    // paddingVertical: 10,
    // marginBottom: 12,
  },
  whiteBackground: {
    backgroundColor: AppColors.white,
    width: '80%',
    height: 20,
  },
  headerText: {
    color: AppColors.mainColor,
    // lineHeight: 20,
    fontSize: 14,
    paddingLeft: 4,
  },
  triangleContainer: {
    flexDirection: 'column',
  },
  triangleTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginLeft: -0.5,
  },
  triangleBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginLeft: -0.5,
    transform: [{rotate: '270deg'}],
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    fontFamily: 'Roboto-Black',
    color: 'rgb(255,255,255)',
    lineHeight: 24.2,
  },
  mainText: {
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    letterSpacing: 0.3,
    color: '#333',
  },
});

// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import React from 'react';
// import {AppColors} from '../../assets/Colors';

// const MyBookingAgencyModal = ({setMyBookingAgencyModal, setModalVisible}) => {
//   return (
//     // <TouchableWithoutFeedback onPress={() => setMyBookingAgencyModal(false)}>
//     <ScrollView>
//       <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//         <View style={styles.mainContainer}>
//           <View
//             style={{
//               backgroundColor: '#ccc',
//               padding: 10,
//               flexDirection: 'column',
//             }}>
//             <View style={styles.cardHeader}>
//               <View style={styles.headerTextContainer}>
//                 <View style={styles.whiteBackground}>
//                   <Text style={styles.headerText}>Mohd Waris</Text>
//                 </View>
//                 <View style={styles.triangleContainer}>
//                   <View style={styles.triangleTop} />
//                   <View style={styles.triangleBottom} />
//                 </View>
//               </View>
//               <View style={styles.titleContainer}>
//                 <Text style={styles.title}>My Booking Agency</Text>
//               </View>
//             </View>
//             <View style={{}}>
//   <Text style={styles.mainText}>
//     This opportunity was initially given to only a few drivers. We
//     are extremely pleased that now you will be able to earn a 10%
//     commission by directly booking for customers through the booking
//     panel. For this, you will have to press the given button on your
//     panel, which will allow you to directly create a booking for the
//     customer. Your commission will be added to the agent commission
//     when the customer's trip begins, and it will be transferred to
//     your bank account on Wednesday.
//   </Text>
//   <Text style={styles.mainText}>
//     <Text>After becoming a booking agency:</Text>
//     <Text>
//       1 You will be able to make bookings for your acquaintances.
//     </Text>
//     <Text>
//       2 If a company customer asks you for a booking, you can also
//       make their booking.
//     </Text>
//     <Text>
//       A 10% commission will be given to the booking agency for both
//       types of customers.
//     </Text>
//   </Text>
//   <Text style={styles.mainText}>
//     The more bookings you make, the larger your booking agency will
//     grow. In June 2023, an additional 500 Rs will be given after
//     completing 10 bookings for the booking agency.
//   </Text>
//   <Text style={styles.mainText}>Have a good day. Thank you.</Text>
//   <Text style={styles.mainText}>
//     Ensure that if you go to a company customer without a booking,
//     your account will be permanently closed.
//   </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </ScrollView>
//   );
// };

// export default MyBookingAgencyModal;
// const styles = StyleSheet.create({
//   mainContainer: {flex: 1, elevation: 5, borderRadius: 50, borderWidth : 2},
//   cardHeader: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: 6,
//     marginBottom: 12,
//   },
//   headerTextContainer: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     marginBottom: 12,
//   },
//   whiteBackground: {
//     backgroundColor: AppColors.white,
//     width: '80%',
//   },
//   headerText: {
//     color: AppColors.mainColor,
//     lineHeight: 20,
//     fontSize: 14,
//     paddingLeft: 4,
//   },
//   triangleContainer: {
//     flexDirection: 'column',
//   },
//   triangleTop: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: 10,
//     borderTopWidth: 10,
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     marginLeft: -0.5,
//   },
//   triangleBottom: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: 10,
//     borderTopWidth: 10,
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     marginLeft: -0.5,
//     transform: [{rotate: '270deg'}],
//   },
//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 22,
//     marginTop: 20,
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto-Black',
//     color: 'rgb(255,255,255)',
//     lineHeight: 24.2,
//   },
//   mainText: {
//     marginBottom: 10,
//     fontFamily: 'Roboto-Regular',
//     fontSize: 15,
//     color: '#333',
//   },
// });
