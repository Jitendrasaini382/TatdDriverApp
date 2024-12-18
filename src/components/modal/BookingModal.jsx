import React, {useCallback, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setBookingModal} from '../../redux/slices/trustedDriverSlice';
import {TokenConstextApi} from '../../context/GlobalContext';

const BookingModal = () => {
  const dispatch = useDispatch();
  // const {decodedToken, setDecodedToken, jwtToken} =
  //   useContext(TokenConstextApi);
  // // const userName = useSelector(state => state.user?.name) || 'Driver';


  const decodedToken = useSelector((e)=>e?.userAuth?.userProfile?.data)
  const languageSwitch = "Hindi"

  const closeModal = useCallback(() => {
    dispatch(setBookingModal(false));
  }, [dispatch]);

  const renderBulletPoint = (text, index) => (
    <Text key={index} style={styles.middleText}>
      {`${index + 1} - ${text}`}
    </Text>
  );

  const bulletPoints = [
    'Local bookings will be immediately visible on the panel; otherwise, they will appear late.',
    'If you have completed 5 out of the last 10 bookings locally, then outstation bookings will be visible on your panel.',
    'And if your Rating Score is more than 4, then you can take more than one booking in a day.',
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.topHeading}>
              If your Booking Score is more than 70%, then:
            </Text>
            {bulletPoints.map(renderBulletPoint)}
            <Text style={styles.subHeading}>Booking Score Clarity</Text>
            <Text style={styles.BottamText}>
              {/* Dear {userName.toUpperCase()}, customers book drivers only when they */}
              Dear {decodedToken && decodedToken.driver_name}, customers book
              drivers only when they urgently need them. It is our
              responsibility to ensure that we reach the customer on time and
              fulfill their trust. Customer cancellations occur in 10% to 20% of
              cases. Additionally, cancellations often happen when the customer
              does not answer the call promptly or when the customer is
              disrespectful. Please inform the customer as soon as you pick up
              the booking - "My name is Anil Rawat, and I am speaking as your
              driver from TatD. I will reach you on time." If the customer does
              not answer, press the 'Customer Not Answering' button, which sends
              a message to the customer from the company to answer the driver's
              call. In most cases, customers answer the call, reducing
              cancellations. It is common for drivers with fewer cancellations
              to get more work. Have a great day! www.tatd.in
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={closeModal}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(BookingModal);

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  subHeading: {
    color: AppColors.mainColor,
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '700',
  },

  contentContainer: {
    elevation: 1,
    padding: 10,
    backgroundColor: AppColors.white,
    paddingLeft: 15,
    borderWidth: 0.2,
  },
  topHeading: {
    justifyContent: 'center',
    color: AppColors.silverGrey,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '400',
  },
  middleText: {
    marginTop: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  BottamText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5,
  },
  button: {
    marginBottom: 5,
    marginTop: 30,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
    alignSelf: 'flex-start',
  },
  buttonText: {color: AppColors.white},
});

// import React from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Dimensions,
//   View,
// } from 'react-native';
// import {AppColors} from '../../assets/Colors';
// import {useDispatch} from 'react-redux';
// import {setBookingModal} from '../../redux/slices/trustedDriverSlice';
// const {width, height} = Dimensions.get('window');

// const BookingModal = () => {
//   const dispatch = useDispatch();

//   return (
//     <TouchableWithoutFeedback onPress={() => dispatch(setBookingModal(false))}>
//       {/* <ScrollView> */}
//       <View style={styles.mainContainer}>
//         <View style={styles.contentContainer}>
//           <Text style={styles.topHeading}>
//             If your Booking Score is more than 70%, then:
//           </Text>
//           <Text style={{color: AppColors.silverGrey, fontSize: 18}}>
//             1 - Local bookings will be immediately visible on the panel;
//             otherwise, they will appear late.
//           </Text>
//           <Text style={{color: AppColors.silverGrey, fontSize: 18}}>
//             2 - If you have completed 5 out of the last 10 bookings locally,
//             then outstation bookings will be visible on your panel.
//           </Text>
//           <Text style={{color: AppColors.silverGrey, fontSize: 18}}>
//             3 - And if your Rating Score is more than 4, then you can take more
//             than one booking in a day.
//           </Text>
//           <Text
//             style={{
//               color: AppColors.mainColor,
//               fontSize: 20,
//               alignSelf: 'center',
//               marginVertical: 20,
//             }}>
//             Booking Score Clarity
//           </Text>
//           <Text style={{color: AppColors.silverGrey, fontSize: 18}}>
//             Dear MOHIT DHANAWAT, customers book drivers only when they urgently
//             need them. It is our responsibility to ensure that we reach the
//             customer on time and fulfill their trust. Customer cancellations
//             occur in 10% to 20% of cases. Additionally, cancellations often
//             happen when the customer does not answer the call promptly or when
//             the customer is disrespectful. Please inform the customer as soon as
//             you pick up the booking - "My name is Anil Rawat, and I am speaking
//             as your driver from TatD. I will reach you on time." If the customer
//             does not answer, press the 'Customer Not Answering' button, which
//             sends a message to the customer from the company to answer the
//             driver's call. In most cases, customers answer the call, reducing
//             cancellations. It is common for drivers with fewer cancellations to
//             get more work. Have a great day! www.tatd.in
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => dispatch(setBookingModal(false))}>
//             <Text style={styles.buttonText}>close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* </ScrollView> */}
//     </TouchableWithoutFeedback>
//   );
// };

// export default BookingModal;

// const styles = StyleSheet.create({
//   mainContainer: {flex: 1},
//   contentContainer: {
//     elevation: 3,
//     padding: 10,
//     backgroundColor: AppColors.white,
//     // borderRadius: 12,
//     paddingLeft: 15,
//   },
//   topHeading: {
//     // textAlign: '',
//     justifyContent: 'center',
//     color: AppColors.silverGrey,
//     paddingVertical: 10,
//     fontSize: 20,
//     fontWeight: '400',
//   },
//   middleText: {
//     marginTop: 5,
//     textAlign: 'left',
//     justifyContent: 'flex-start',
//     color: AppColors.silverGrey,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   BottamText: {
//     textAlign: 'left',
//     justifyContent: 'flex-start',
//     color: AppColors.silverGrey,
//     fontSize: 18,
//     fontWeight: '400',
//     marginTop: 5,
//     // marginBottom: 15,
//   },
//   button: {
//     marginBottom: 5,
//     marginTop: 30,
//     paddingVertical: 3,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: AppColors.mainColor,
//     alignSelf: 'flex-start',
//   },
//   buttonText: {color: AppColors.white},
// });

// import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
// import React from 'react';

// import {Dimensions} from 'react-native';
// import {AppColors} from '../assets/Colors';
// const {width, height} = Dimensions.get('window');

// const BookingModal = ({setBookingModal}) => {
//   return (
//     <TouchableWithoutFeedback onPress={() => setBookingModal(false)}>
//       <View style={styles.mainContainer}>
//         <View style={styles.contentContainer}>
//           <Text>hello</Text>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default BookingModal;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: AppColors.greyColor,
//     justifyContent: 'flex-end',
//   },
//   contentContainer: {
//     backgroundColor: AppColors.greyColor,
//     width: width * 0.4,
//     height: 300,
//   },
// });
