import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {AppColors} from '../../assets/Colors';
import PermanentBookingAcceptModal from '../modal/PermanentBookingAcceptModal';
import ReferFriendModal from '../modal/ReferFriendModal';

const BookingCard = ({booking}) => {
  const [openModal, setOpenModal] = useState(false);
  const [referFriendModal, setReferFriendModal] = useState(false);

  const {type, cars, amount, duration, location, eventType, date} = booking;

  return (
    <View style={styles.bookingContainer}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{type}</Text>
        <Text style={styles.bookingCars}>
          <Icon color={AppColors.white} name="car" /> {cars}
        </Text>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <Icon color={AppColors.white} name="rupee" size={27} />
            {amount}
          </Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.eventContainer}>
          <Text style={styles.eventTypeText}>{eventType}</Text>
          <Text style={styles.eventText}>{date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setReferFriendModal(true);
            }}
            style={styles.referButton}>
            <Text style={styles.referButtonText}>
              Refer Your Friend-
              <Icon name="rupee" />
              250
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}
            style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
          <Modal
            backdropOpacity={0}
            onBackdropPress={() => setOpenModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={openModal}>
            <PermanentBookingAcceptModal setOpenModal={setOpenModal} />
          </Modal>
          <Modal
            backdropOpacity={0}
            onBackdropPress={() => setReferFriendModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={referFriendModal}>
            <ReferFriendModal setReferFriendModal={setReferFriendModal} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const PermanentBookingView = () => {
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

  return (
    <ScrollView>
      {bookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  eventTypeText: {
    color: AppColors.white,
    fontSize: 15,
    marginRight: 10,
  },
  eventText: {
    color: AppColors.white,
    fontSize: 15,
    marginRight: 10,
    fontWeight: 'bold',
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

export default PermanentBookingView;

//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {
//   TouchableOpacity,
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {AppColors} from '../../assets/Colors';
// import {AppFont} from '../../assets/FontsFamily';

// const {width} = Dimensions.get('window');

// const PermanentBookingView = () => {
//   const bookings = [
//     {
//       type: 'Private Driver',
//       cars: 'Altis Manual and Exter Automatic',
//       amount: 200000,
//       duration: '26 Days | 12 Hours',
//       location: 'Vijay Nagar',
//       eventType: 'Interview',
//       date: '24 Jun, 10:00 AM',
//     },
//     {
//       type: 'Govt Driver',
//       cars: 'Creata Manual and Exter Automatic',
//       amount: 500000,
//       duration: '26 Days | 12 Hours',
//       location: 'Kiran Nagar',
//       eventType: 'Interview',
//       date: '28 Jun, 10:00 AM',
//     },
//   ];

//   const BookingCard = (booking, index) => (
//     <View key={index} style={styles.bookingContainer}>
//       <View style={styles.bookingHeader}>
//         <Text style={styles.bookingType}>{booking.type}</Text>
//         <Text style={styles.bookingCars}>
//           <Icon color={AppColors.white} name="car" /> {booking.cars}
//         </Text>
//       </View>
//       <View style={styles.bookingDetails}>
//         <View style={styles.amountContainer}>
//           <Text style={styles.amount}>
//             <Icon color={AppColors.white} name="rupee" size={27} />
//             {booking.amount}
//           </Text>
//           <Text style={styles.duration}>{booking.duration}</Text>
//         </View>
//         <Text style={styles.location}>{booking.location}</Text>
//         <View style={styles.eventContainer}>
//           <Text style={styles.eventText}>{booking.eventType}</Text>
//           <Text style={styles.eventText}>{booking.date}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={() => {
//               //   OpenReferFriendModal(true);
//             }}
//             style={styles.referButton}>
//             <Text style={styles.referButtonText}>
//               Refer Your Friend-
//               <Icon name="rupee" />
//               250
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.acceptButton}>
//             <Text style={styles.acceptButtonText}>Accept</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return <ScrollView>{bookings.map(BookingCard)}</ScrollView>;
// };

// export default PermanentBookingView;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//   },
//   connectContainer: {
//     flexDirection: 'row',
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   connectButton: {
//     backgroundColor: AppColors.orange,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     width: width * 0.2,
//   },
//   rightArrow: {
//     resizeMode: 'center',
//     height: 20,
//     width: 20,
//   },
//   connectText: {
//     color: AppColors.black,
//     flex: 1,
//     paddingLeft: 15,
//     textAlign: 'left',
//     textAlignVertical: 'center',
//     fontFamily: AppFont.regularFont,
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   notificationContainer: {
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   notificationText: {
//     color: AppColors.black,
//     fontFamily: AppFont.regularFont,
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   bookingContainer: {
//     marginTop: 20,
//     backgroundColor: AppColors.mainColor,
//     borderRadius: 10,
//     padding: 15,
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   bookingType: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: AppColors.white,
//   },
//   bookingCars: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: AppColors.white,
//   },
//   bookingDetails: {
//     paddingLeft: 10,
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   amount: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: AppColors.white,
//   },
//   duration: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginLeft: 5,
//     color: AppColors.white,
//   },
//   location: {
//     color: AppColors.white,
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   eventContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   eventText: {
//     color: AppColors.white,
//     fontSize: 15,
//     marginRight: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   referButton: {
//     backgroundColor: '#ffa500',
//     borderRadius: 8,
//     padding: 10,
//   },
//   referButtonText: {
//     color: AppColors.white,
//   },
//   acceptButton: {
//     backgroundColor: AppColors.white,
//     borderRadius: 8,
//     padding: 10,
//   },
//   acceptButtonText: {
//     color: AppColors.mainColor,
//   },
// });
