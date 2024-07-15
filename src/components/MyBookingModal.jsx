import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {RightArrow} from '../assets/images';
import {AppColors} from '../assets/Colors';
import {useDispatch} from 'react-redux';
import {setMyBookingModal} from '../redux/slices/trustedDriverSlice';
import {MY_BOOKING_TOP_NAVBAR} from '../apis/Apis';

const MyBookingModal = ({}) => {
  const [myBookingStyle, setMyBookingStyle] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [myBookingData, setMyBookingData] = useState({});

  const getMyAllBookings = () => {
    MY_BOOKING_TOP_NAVBAR({
      action: 'my_booking',
    })
      .then(e => {
        // console.log(e.bookings, 'MY_BOOKING_TOP_NAVBAR data');
        setMyBookingData(e);
      })
      .catch(err => {
        console.log(err, 'MY_BOOKING_TOP_NAVBAR error');
      });
  };

  useEffect(() => {
    getMyAllBookings();
    // FormattedPrice()
  }, []);

  // const extractTotal = totalString => {
  //   const numericValue = totalString.replace(/[^0-9]/g, '');
  //   return `₹ ${numericValue}`;
  // };

  // const FormattedPrice =  price => {
  //   const formattedPrice = price.replace(/<\/?[^>]+(>|$)/g, '').trim();

  //   const finalPrice = formattedPrice.replace('₹', ' ₹ ');

  //   // "₹<b>0</b>",
  //   return <Text>{finalPrice}</Text>;
  // };

  const price = myBookingData.total;
const formattedPrice = price.replace(/<\/?[^>]+(>|$)/g, "").trim().replace("₹", " ₹ ");
// console.log(formattedPrice);


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(setMyBookingModal(false))}>
        <View style={styles.closeButtonContainer}>
          <Text style={styles.closeButtonText}>x</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setMyBookingStyle(true)}>
          <View style={[styles.tabItem, myBookingStyle && styles.activeTab]}>
            <Text
              style={[styles.tabText, myBookingStyle && styles.activeTabText]}>
              {myBookingData.mybooking_txt}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMyBookingStyle(false)}>
          <View style={[styles.tabItem, !myBookingStyle && styles.activeTab]}>
            <Text
              style={[styles.tabText, !myBookingStyle && styles.activeTabText]}>
              {myBookingData.due_txt}
              {/* {(myBookingData.total)} */}
              {formattedPrice}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {myBookingStyle ? (
        <>
          <View style={styles.bookingContainer}>
            {myBookingData.bookings && myBookingData.bookings.length > 0 ? (
              myBookingData.bookings.map((booking, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('DutyReportUpdate', {
                      bookingId: booking.booking_id,
                    })
                  }>
                  <View
                    style={[styles.bookingCard, {backgroundColor: booking.bg}]}>
                    <Text style={[styles.bookingText, {color: booking.color}]}>
                      {booking.booking_id} - {booking.booking_date}
                    </Text>
                    <Image
                      resizeMode="center"
                      style={styles.arrowIcon}
                      source={RightArrow}
                    />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No bookings available</Text>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={styles.bookingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ClearMyDuePayment')}>
              <View style={[styles.bookingCard, styles.activeBookingCard]}>
                <Text style={[styles.bookingText, styles.activeBookingText]}>
                  {myBookingData.clear_my_due_txt}
                </Text>
                <Image
                  resizeMode="center"
                  style={styles.arrowIcon}
                  source={RightArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
    backgroundColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
    width: 250,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    backgroundColor: AppColors.mainColor,
    alignSelf: 'flex-end',
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: AppColors.mainColor,
  },
  tabText: {
    color: AppColors.black,
    paddingBottom: 3,
  },
  activeTabText: {
    color: AppColors.mainColor,
  },
  closeButtonText: {
    color: AppColors.white,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    color: AppColors.black,
    marginRight: 15,
    alignSelf: 'center',
    fontSize: 16,
    paddingBottom: 3,
  },
  dueAmountText: {
    color: AppColors.black,
    fontSize: 16,
  },
  bookingContainer: {
    padding: 5,
  },
  bookingCard: {
    borderRadius: 10,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  activeBookingCard: {
    backgroundColor: AppColors.mainColor,
  },
  bookingText: {
    color: AppColors.mainColor,
  },
  activeBookingText: {
    color: AppColors.white,
  },
  arrowIcon: {
    height: 20,
    width: 20,
  },
});

export default MyBookingModal;

// //////////////

// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {RightArrow} from '../assets/images';
// import {AppColors} from '../assets/Colors';
// import {useDispatch} from 'react-redux';
// import {setMyBookingModal} from '../redux/slices/trustedDriverSlice';
// import {MY_BOOKING_TOP_NAVBAR} from '../apis/Apis';

// const MyBookingModal = ({}) => {
//   const [myBookingStyle, setMyBookingStyle] = useState(true);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const myBookingData = {
//     bookings: [
//       {
//         booking_id: '429612',
//         booking_date: '13 Jul, 08:00:AM',
//         bg: 'red',
//         color: 'white',
//         url: 'https://www.tatd.in/duty-report-login.php?action=dologin&driver_mobile_number=8118813148&booking_number=429612',
//       },
//       {
//         booking_id: '436529',
//         booking_date: '11 Jul, 07:30:AM',
//         bg: 'red',
//         color: 'white',
//         url: 'https://www.tatd.in/duty-report-login.php?action=dologin&driver_mobile_number=8118813148&booking_number=436529',
//       },
//       {
//         booking_id: '432791',
//         booking_date: '08 Jul, 17:45:PM',
//         bg: 'red',
//         color: 'white',
//         url: 'https://www.tatd.in/duty-report-login.php?action=dologin&driver_mobile_number=8118813148&booking_number=432791',
//       },
//       {
//         booking_id: '438739',
//         booking_date: '06 Jul, 18:00:PM',
//         bg: 'red',
//         color: 'white',
//         url: 'https://www.tatd.in/duty-report-login.php?action=dologin&driver_mobile_number=8118813148&booking_number=438739',
//       },
//     ],
//     clear_my_due_bookings: [],
//     total: '₹<b>0</b>',
//     mybooking_txt: 'My Bookings',
//     due_txt: 'Due',
//     clear_my_due_txt: 'Clear My Due',
//   };

//   useEffect(() => {

//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => dispatch(setMyBookingModal(false))}>
//         <View style={styles.closeButtonContainer}>
//           <Text style={styles.closeButtonText}>x</Text>
//         </View>
//       </TouchableOpacity>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity onPress={() => setMyBookingStyle(true)}>
//           <View style={[styles.tabItem, myBookingStyle && styles.activeTab]}>
//             <Text
//               style={[styles.tabText, myBookingStyle && styles.activeTabText]}>
//              {myBookingData.mybooking_txt}
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setMyBookingStyle(false)}>
//           <View style={[styles.tabItem, !myBookingStyle && styles.activeTab]}>
//             <Text
//               style={[styles.tabText, !myBookingStyle && styles.activeTabText]}>
//               {/* {myBookingData.due_txt} */} Due
//               {' '}
//               <Icon
//                 name="rupee"
//                 color={myBookingStyle ? AppColors.black : AppColors.mainColor}
//               />{' '}
//               {/* {myBookingData.total} */}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       {myBookingStyle ? (
//         <>
//           <View style={styles.bookingContainer}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('DutyReportUpdate')}>
//               <View style={styles.bookingCard}>
//                 <Text style={styles.bookingText}>
//                 430664 - 26 Jun, 10:30 AM
//                 </Text>
//                 <Image
//                   resizeMode="center"
//                   style={styles.arrowIcon}
//                   source={RightArrow}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.bookingContainer}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('DutyReportUpdate')}>
//               <View style={[styles.bookingCard, styles.activeBookingCard]}>
//                 <Text style={[styles.bookingText, styles.activeBookingText]}>
//                   430664 - 26 Jun, 10:30 AM
//                 </Text>
//                 <Image
//                   resizeMode="center"
//                   style={styles.arrowIcon}
//                   source={RightArrow}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <>
//           <View style={styles.bookingContainer}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ClearMyDuePayment')}>
//               <View style={[styles.bookingCard, styles.activeBookingCard]}>
//                 <Text style={[styles.bookingText, styles.activeBookingText]}>
//                  {/* {myBookingData.clear_my_due_txt} */}
//                  Clear My Due

//                 </Text>
//                 <Image
//                   resizeMode="center"
//                   style={styles.arrowIcon}
//                   source={RightArrow}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     padding: 10,
//     borderBottomLeftRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: -2,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//     zIndex: 1000,
//     backgroundColor: 'grey',
//     borderRadius: 8,
//     overflow: 'hidden',
//     width: 250,
//   },
//   closeButtonContainer: {
//     alignItems: 'flex-end',
//     backgroundColor: AppColors.mainColor,
//     alignSelf: 'flex-end',
//     padding: 5,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabItem: {
//     margin: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   activeTab: {
//     borderBottomColor: AppColors.mainColor,
//   },
//   tabText: {
//     color: AppColors.black,
//     paddingBottom: 3,
//   },
//   activeTabText: {
//     color: AppColors.mainColor,
//   },
//   closeButtonText: {
//     color: AppColors.white,
//     paddingHorizontal: 10,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingVertical: 10,
//   },
//   headerText: {
//     color: AppColors.black,
//     marginRight: 15,
//     alignSelf: 'center',
//     fontSize: 16,
//     paddingBottom: 3,
//   },
//   dueAmountText: {
//     color: AppColors.black,
//     fontSize: 16,
//   },
//   bookingContainer: {
//     padding: 5,
//   },
//   bookingCard: {
//     borderRadius: 10,
//     backgroundColor: AppColors.white,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     justifyContent: 'space-between',
//   },
//   activeBookingCard: {
//     backgroundColor: AppColors.mainColor,
//   },
//   bookingText: {
//     color: AppColors.mainColor,
//   },
//   activeBookingText: {
//     color: AppColors.white,
//   },
//   arrowIcon: {
//     height: 20,
//     width: 20,
//   },
// });

// export default MyBookingModal;
