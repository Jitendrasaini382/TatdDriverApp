import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import Modal from 'react-native-modal';
import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';
import {ON_DEMAND_BOOKING} from '../../apis/Apis';

const TripCard = ({trip}) => {
  // console.log(trip, 'jjjjjjjjjjjj');
  const [openModal, setOpenModal] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>
          {trip.Btime} <Text style={{fontSize: 15}}>{trip.BDate}</Text>
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // padding: 10,
          }}>
          <Icon color={AppColors.white} name="car" />
          <Text style={styles.vehicleType}>
            {trip.vehicle_type} {trip.vehicle_model}
          </Text>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>
            {trip.way_type} - {trip.product_type}
          </Text>
          {/* {trip.addresses.map((address, index) => ( */}
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#0dc53d',
                alignItems: 'flex-start',
                top: 5,
                left: 10,
              }}></View>
            <Text style={styles.address}>{trip.pickup_address}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'black',
                alignItems: 'flex-start',
                top: 5,
                left: 10,
              }}></View>
            <Text style={styles.address}>{trip.drop_address}</Text>
          </View>
          {/* ))} */}
        </View>
        <View style={styles.rightContent}>
          <View style={styles.paymentDetails}>
            {/* {trip.incentive > 0 && (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive}
                </Text>
              </View>  
            )         
         : trip.incentive_eligibility_fullfillment   > 0(
          <View style={styles.incentiveBox}>
          <Text style={styles.incentiveText}>
            + Incentive ₹ {trip.incentive_eligibility_fullfillment}
          </Text>
        </View> 
         )  : 
         trip.incentive_eligible_amount_fullfillment > 0 (
          <View style={styles.incentiveBox}>
          <Text style={styles.incentiveText}>
            + Incentive ₹ {trip.incentive_eligible_amount_fullfillment}
          </Text>
        </View> 
         ) } */}
            {/* {console.log(trip.incentive_eligibility_fullfillment) } */}
            {trip.incentive > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive}
                </Text>
              </View>
            ) : trip.incentive_eligibility_fullfillment > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive_eligibility_fullfillment}
                </Text>
              </View>
            ) : trip.incentive_eligible_amount_fullfillment > 0 ? (
              <View style={styles.incentiveBox}>
                <Text style={styles.incentiveText}>
                  + Incentive ₹ {trip.incentive_eligible_amount_fullfillment}
                </Text>
              </View>
            ) : null}

            <View style={{marginRight: 5}}>
              <Text style={styles.price}>₹ {trip.bugdet_price}</Text>
              <Text style={styles.package}>
                Package - {trip.package_detail}
              </Text>
              <Text>{'\n'}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setOpenModal('')}
            style={styles.acceptButton}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <Modal
            backdropOpacity={0}
            onBackdropPress={() => setOpenModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={openModal}>
            <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const RoundTripBookingView = () => {
  // const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
  // const incityOneWayBooking = [
  //   {
  //     booking_number: '453098',
  //     BDate: '23 Jul, 2024',
  //     Btime: '16:00 PM',
  //     way_type: 'One Way',
  //     package_detail: '20 Kms',
  //     bugdet_price: '294',
  //     access_flag: 1,
  //     outstn_access_flag: 0,
  //     night_charge: 0,
  //     surge: 0,
  //     chauffeur_service: 0,
  //     washing_service: 0,
  //     incentive: '10',
  //     driver_assignment_in_10_minutes_incentive: 0,
  //     bonus: 0,
  //     incentive_eligibility_fullfillment: 0,
  //     incentive_eligible_amount_fullfillment: 0,

  //     vehicleType: 'Manual-Standard',
  //     addresses: [
  //       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
  //     ],
  //     package: 'Package-8 Hours',
  //     incentive: '0',
  //   },

  //   {
  //     booking_number: '865456',
  //     BDate: '23 Jul, 2024',
  //     Btime: '16:00 PM',
  //     way_type: 'One Way',
  //     package_detail: '20 Kms',
  //     bugdet_price: '294',
  //     access_flag: 1,
  //     outstn_access_flag: 0,
  //     night_charge: 0,
  //     surge: 0,
  //     chauffeur_service: 0,
  //     washing_service: 0,
  //     incentive: '10',
  //     driver_assignment_in_10_minutes_incentive: 0,
  //     bonus: 0,
  //     incentive_eligibility_fullfillment: 0,
  //     incentive_eligible_amount_fullfillment: 0,

  //     vehicleType: 'Manual-Standard',
  //     addresses: [
  //       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
  //     ],
  //     package: 'Package-8 Hours',
  //     incentive: '100',
  //   },
  // ];

  // const incityOneWayBooking = [
  //   {
  //     BDate: '04 Sep, 2024',
  //     Btime: '09:30 AM',
  //     access_flag: 1,
  //     bonus: 0,
  //     booking_number: '516751',
  //     bugdet_price: '366',
  //     chauffeur_service: 0,
  //     driver_assignment_in_10_minutes_incentive: 0,
  //     incentive: '0',
  //     incentive_eligibility_fullfillment: 0,
  //     incentive_eligible_amount_fullfillment: 0,
  //     night_charge: 0,
  //     outstn_access_flag: 0,
  //     package_detail: '15 Kms',
  //     surge: 0,
  //     washing_service: 0,
  //     way_type: 'One Way',
  //     addresses: [
  //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
  //       'Platinum District , Alwar',
  //     ],
  //   },
  //   {
  //     BDate: '04 Sep, 2024',
  //     Btime: '10:00 AM',
  //     access_flag: 1,
  //     bonus: 0,
  //     booking_number: '515813',
  //     bugdet_price: '366',
  //     chauffeur_service: 0,
  //     driver_assignment_in_10_minutes_incentive: 0,
  //     incentive: '0',
  //     incentive_eligibility_fullfillment: 0,
  //     incentive_eligible_amount_fullfillment: 0,
  //     night_charge: 0,
  //     outstn_access_flag: 0,
  //     package_detail: '15 Kms',
  //     surge: 0,
  //     washing_service: 0,
  //     way_type: 'One Way',
  //     addresses: [
  //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
  //       'Platinum District , Alwar',
  //     ],
  //   },
  //   {
  //     BDate: '05 Sep, 2024',
  //     Btime: '10:30 AM',
  //     access_flag: 1,
  //     bonus: 0,
  //     booking_number: '515815',
  //     bugdet_price: '429',
  //     chauffeur_service: 0,
  //     driver_assignment_in_10_minutes_incentive: 0,
  //     incentive: '0',
  //     incentive_eligibility_fullfillment: 0,
  //     incentive_eligible_amount_fullfillment: 0,
  //     night_charge: 0,
  //     outstn_access_flag: 0,
  //     package_detail: '25 Kms',
  //     surge: 0,
  //     washing_service: 0,
  //     way_type: 'OneWay',
  //     addresses: [
  //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
  //       'Platinum District , Alwar',
  //     ],
  //   },
  // ];
  const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
  const [incityRoundTripBooking, setIncityRoundTripBooking] = useState([]);

  const getIncityOneWayBookings = async data => {
    try {
      const response = await ON_DEMAND_BOOKING(data);

      // console.log(
      //   response,
      //   'getIncityOneWayBookings response',
      // );
      setIncityOneWayBooking(response.incity_one_way_bookings);
    } catch (error) {
      console.log(error, 'incity_OneWay_bookings  Error');
    }
  };

  const getIncityRoundTripBookings = async data => {
    try {
      const response = await ON_DEMAND_BOOKING(data);

      // console.log(
      //   response,
      //  'getIncityRoundTripBookings response',
      // );
      // console.log(response.incity_roundtrip_bookings,"gggggggggggggggggggggggggggggggggggggggggg");

      setIncityRoundTripBooking(response.incity_roundtrip_bookings);
    } catch (error) {
      console.log(error, 'incity_roundtrip_bookings  Error');
    }
  };

  useEffect(() => {
    //   getOnDemandBooking({
    //     action: 'ondemand_outstation_bookings',
    //   });
    getIncityRoundTripBookings({
      action: 'incity_roundtrip_booking',
    });
    getIncityOneWayBookings({
      action: 'incity_oneway_booking',
    });
  }, []);

  return (
    <>
      {incityOneWayBooking &&
        incityOneWayBooking.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      {/* {incityRoundTripBooking &&
        incityRoundTripBooking.map((e, index) => (
          <TripCard key={index} trip={e} />
        ))} */}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    color: AppColors.white,
    marginRight: 10,
  },
  vehicleType: {
    fontSize: 14,
    color: AppColors.white,
    marginLeft: 5,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 0.7,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: AppColors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
    color: AppColors.mainColor,
    fontFamily: 'Roboto',
  },
  address: {
    fontSize: 14,
    color: '#444',
    marginLeft: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  acceptText: {
    color: AppColors.mainColor,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  //
  rightContent: {
    flex: 0.4,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  paymentDetails: {
    alignSelf: 'flex-end',
  },
  incentiveBox: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  incentiveText: {
    color: AppColors.white,
    fontSize: 12,
  },
  package: {
    fontSize: 12,
    color: AppColors.white,
    marginBottom: 5,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    color: AppColors.white,
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: AppColors.white,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
});

export default RoundTripBookingView;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {AppColors} from '../../assets/Colors';
// import Modal from 'react-native-modal';
// import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';

// const TripCard = ({trip}) => {
//   const [openModal, setOpenModal] = useState(false);
//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.time}>
//           {trip.time} <Text style={{fontSize: 15}}>{trip.date}</Text>
//         </Text>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//             padding: 10,
//           }}>
//           <Icon color={AppColors.white} name="car" />
//           <Text style={styles.vehicleType}>{trip.vehicleType}</Text>
//         </View>
//       </View>
//       <View style={styles.contentWrapper}>
//         <View style={styles.leftContent}>
//           <Text style={styles.title}>{trip.title}</Text>
//           {trip.addresses.map((address, index) => (
//             <View key={index} style={{flexDirection: 'row'}}>
//               <View
//                 style={{
//                   height: 10,
//                   width: 10,
//                   borderRadius: 5,
//                   backgroundColor: index === 0 ? '#0dc53d' : AppColors.black,
//                   alignItems: 'flex-start',
//                   top: 5,
//                   left: 10,
//                 }}></View>
//               <Text style={styles.address}>{address}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.rightContent}>
//           <View style={styles.paymentDetails}>
//             {trip.incentive && (
//               <View style={styles.incentiveBox}>
//                 <Text style={styles.incentiveText}>
//                   + Incentive ₹ {trip.incentive}
//                 </Text>
//               </View>
//             )}

//             <Text style={styles.price}>₹ {trip.price}</Text>
//             <Text style={styles.package}>{trip.package}</Text>
//             <Text>{'\n'}</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => setOpenModal(true)}
//             style={styles.acceptButton}>
//             <Text style={styles.acceptText}>Accept</Text>
//           </TouchableOpacity>
//           <Modal
//             backdropOpacity={0}
//             onBackdropPress={() => setOpenModal(false)}
//             animationIn={'fadeInDown'}
//             animationOut={'fadeOutUp'}
//             isVisible={openModal}>
//             <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
//           </Modal>
//         </View>
//       </View>
//     </View>
//   );
// };

// const dummyData = [
//   {
//     time: '07:00 AM',
//     date: '28 Jun, 2024',
//     vehicleType: 'Manual-Standard',
//     title: 'Round Trip - Incity',
//     addresses: [
//       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//     ],
//     price: '943',
//     package: 'Package-8 Hours',
//     incentive: '100',
//   },
//   {
//     time: '09:00 AM',
//     date: '31 Jun, 2024',
//     vehicleType: 'Manual-Luxury',
//     title: 'Round Trip - Incity',
//     addresses: ['Main Road\nBengaluru, Karnataka ,\nBangalore', 'alwar, alwar'],
//     price: '943',
//     package: 'Package-8 Hours',
//   },
//   {
//     time: '09:00 AM',
//     date: '31 Jun, 2024',
//     vehicleType: 'Manual-Luxury',
//     title: 'Round Trip - Incity',
// addresses: [
//   'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   'Platinum District , Alwar',
// ],
//     price: '9003',
//     package: 'Package-5 Hours',
//     incentive: '500',
//   },
// ];

// const RoundTripBookingView = () => {
//   return (
//     <>
//       {dummyData.map((trip, index) => (
//         <TripCard key={index} trip={trip} />
//       ))}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: 10,
//     padding: 15,
//     // marginTop: 10,
//     marginHorizontal: 15,
//     marginVertical: 5,
//   },
//   header: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 20,
//     color: AppColors.white,
//     marginRight: 10,
//   },
//   vehicleType: {
//     fontSize: 14,
//     color: AppColors.white,
//     marginLeft: 10,
//   },
//   contentWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftContent: {
//     flex: 0.7,
//     justifyContent: 'center',
//     borderRadius: 10,
//     backgroundColor: AppColors.white,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginLeft: 8,
//     color: AppColors.mainColor,
//     fontFamily: 'Roboto',
//   },
//   address: {
//     fontSize: 14,
//     color: '#444',
//     marginLeft: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   acceptText: {
//     color: AppColors.mainColor,
//     fontSize: 15,
//     fontWeight: '600',
//     paddingHorizontal: 5,
//   },
//   //
//   rightContent: {
//     flex: 0.4,
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   paymentDetails: {
//     alignItems: 'center',
//   },
//   incentiveBox: {
//     backgroundColor: '#2076bd',
//     padding: 5,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   incentiveText: {
//     color: AppColors.white,
//     fontSize: 12,
//   },
//   package: {
//     fontSize: 12,
//     color: AppColors.white,
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     alignSelf: 'baseline',
//     color: AppColors.white,
//     marginBottom: 5,
//   },
//   acceptButton: {
//     backgroundColor: AppColors.white,
//     padding: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//     minWidth: 80,
//   },
// });

// export default RoundTripBookingView;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {AppColors} from '../../assets/Colors';
// import Modal from 'react-native-modal';
// import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';
// import {ON_DEMAND_BOOKING} from '../../apis/Apis';

// const TripCard = ({trip}) => {
//   console.log(trip, 'jjjjjjjjjjjj');
//   const [openModal, setOpenModal] = useState(false);
//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.time}>
//           {trip.Btime} <Text style={{fontSize: 15}}>{trip.BDate}</Text>
//         </Text>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//             padding: 10,
//           }}>
//           <Icon color={AppColors.white} name="car" />
//           <Text style={styles.vehicleType}>{trip.vehicle_type}{trip.vehicle_model}</Text>
//         </View>
//       </View>
//       <View style={styles.contentWrapper}>
//         <View style={styles.leftContent}>
//           <Text style={styles.title}>{trip.way_type} - {trip.product_type}</Text>
//           {/* {trip.addresses.map((address, index) => ( */}
//             <View style={{flexDirection: 'row'}}>
//               <View
//                 style={{
//                   height: 10,
//                   width: 10,
//                   borderRadius: 5,
//                   backgroundColor: '#0dc53d' ,
//                   alignItems: 'flex-start',
//                   top: 5,
//                   left: 10,
//                 }}></View>
//               <Text style={styles.address}>{trip.pickup_address}</Text>
//             </View>
//             <View style={{flexDirection: 'row'}}>
//               <View
//                 style={{
//                   height: 10,
//                   width: 10,
//                   borderRadius: 5,
//                   backgroundColor: 'black' ,
//                   alignItems: 'flex-start',
//                   top: 5,
//                   left: 10,
//                 }}></View>
//               <Text style={styles.address}>{trip.drop_address}</Text>
//             </View>
//           {/* ))} */}
//         </View>
//         <View style={styles.rightContent}>
//           <View style={styles.paymentDetails}>
//             {trip.incentive == "0" ? (
//               <View style={styles.incentiveBox}>
//                 <Text style={styles.incentiveText}>
//                   + Incentive ₹ {trip.incentive}
//                 </Text>
//               </View>
//             ) : null}
//             <View style={{marginRight: 5}}>
//               <Text style={styles.price}>₹ {trip.bugdet_price}</Text>
//               <Text style={styles.package}>
//                 Package - {trip.package_detail}
//               </Text>
//               <Text>{'\n'}</Text>
//             </View>
//           </View>
//           <TouchableOpacity
//             onPress={() => setOpenModal(true)}
//             style={styles.acceptButton}>
//             <Text style={styles.acceptText}>Accept</Text>
//           </TouchableOpacity>
//           <Modal
//             backdropOpacity={0}
//             onBackdropPress={() => setOpenModal(false)}
//             animationIn={'fadeInDown'}
//             animationOut={'fadeOutUp'}
//             isVisible={openModal}>
//             <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
//           </Modal>
//         </View>
//       </View>
//     </View>
//   );
// };

// const RoundTripBookingView = () => {
//   // const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
//   // const incityOneWayBooking = [
//   //   {
//   //     booking_number: '453098',
//   //     BDate: '23 Jul, 2024',
//   //     Btime: '16:00 PM',
//   //     way_type: 'One Way',
//   //     package_detail: '20 Kms',
//   //     bugdet_price: '294',
//   //     access_flag: 1,
//   //     outstn_access_flag: 0,
//   //     night_charge: 0,
//   //     surge: 0,
//   //     chauffeur_service: 0,
//   //     washing_service: 0,
//   //     incentive: '10',
//   //     driver_assignment_in_10_minutes_incentive: 0,
//   //     bonus: 0,
//   //     incentive_eligibility_fullfillment: 0,
//   //     incentive_eligible_amount_fullfillment: 0,

//   //     vehicleType: 'Manual-Standard',
//   //     addresses: [
//   //       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   //     ],
//   //     package: 'Package-8 Hours',
//   //     incentive: '0',
//   //   },

//   //   {
//   //     booking_number: '865456',
//   //     BDate: '23 Jul, 2024',
//   //     Btime: '16:00 PM',
//   //     way_type: 'One Way',
//   //     package_detail: '20 Kms',
//   //     bugdet_price: '294',
//   //     access_flag: 1,
//   //     outstn_access_flag: 0,
//   //     night_charge: 0,
//   //     surge: 0,
//   //     chauffeur_service: 0,
//   //     washing_service: 0,
//   //     incentive: '10',
//   //     driver_assignment_in_10_minutes_incentive: 0,
//   //     bonus: 0,
//   //     incentive_eligibility_fullfillment: 0,
//   //     incentive_eligible_amount_fullfillment: 0,

//   //     vehicleType: 'Manual-Standard',
//   //     addresses: [
//   //       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   //     ],
//   //     package: 'Package-8 Hours',
//   //     incentive: '100',
//   //   },
//   // ];

//   // const incityOneWayBooking = [
//   //   {
//   //     BDate: '04 Sep, 2024',
//   //     Btime: '09:30 AM',
//   //     access_flag: 1,
//   //     bonus: 0,
//   //     booking_number: '516751',
//   //     bugdet_price: '366',
//   //     chauffeur_service: 0,
//   //     driver_assignment_in_10_minutes_incentive: 0,
//   //     incentive: '0',
//   //     incentive_eligibility_fullfillment: 0,
//   //     incentive_eligible_amount_fullfillment: 0,
//   //     night_charge: 0,
//   //     outstn_access_flag: 0,
//   //     package_detail: '15 Kms',
//   //     surge: 0,
//   //     washing_service: 0,
//   //     way_type: 'One Way',
//   //     addresses: [
//   //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   //       'Platinum District , Alwar',
//   //     ],
//   //   },
//   //   {
//   //     BDate: '04 Sep, 2024',
//   //     Btime: '10:00 AM',
//   //     access_flag: 1,
//   //     bonus: 0,
//   //     booking_number: '515813',
//   //     bugdet_price: '366',
//   //     chauffeur_service: 0,
//   //     driver_assignment_in_10_minutes_incentive: 0,
//   //     incentive: '0',
//   //     incentive_eligibility_fullfillment: 0,
//   //     incentive_eligible_amount_fullfillment: 0,
//   //     night_charge: 0,
//   //     outstn_access_flag: 0,
//   //     package_detail: '15 Kms',
//   //     surge: 0,
//   //     washing_service: 0,
//   //     way_type: 'One Way',
//   //     addresses: [
//   //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   //       'Platinum District , Alwar',
//   //     ],
//   //   },
//   //   {
//   //     BDate: '05 Sep, 2024',
//   //     Btime: '10:30 AM',
//   //     access_flag: 1,
//   //     bonus: 0,
//   //     booking_number: '515815',
//   //     bugdet_price: '429',
//   //     chauffeur_service: 0,
//   //     driver_assignment_in_10_minutes_incentive: 0,
//   //     incentive: '0',
//   //     incentive_eligibility_fullfillment: 0,
//   //     incentive_eligible_amount_fullfillment: 0,
//   //     night_charge: 0,
//   //     outstn_access_flag: 0,
//   //     package_detail: '25 Kms',
//   //     surge: 0,
//   //     washing_service: 0,
//   //     way_type: 'OneWay',
//   //     addresses: [
//   //       'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
//   //       'Platinum District , Alwar',
//   //     ],
//   //   },
//   // ];
//   const [incityOneWayBooking, setIncityOneWayBooking] = useState([]);
//   const [incityRoundTripBooking, setIncityRoundTripBooking] = useState([])

//   const getIncityOneWayBookings = async data => {
//     try {
//       const response = await ON_DEMAND_BOOKING(data);

//       console.log(
//         response,
//         `On Demand Booking responseeeeeeeeeeee ${data.action}`,
//       );
//       setIncityOneWayBooking(response.incity_one_way_bookings);
//     } catch (error) {
//       console.log(error, 'incity_OneWay_bookings  Error');
//     }
//   };

//   const getIncityRoundTripBookings = async data => {
//     try {
//       const response = await ON_DEMAND_BOOKING(data);

//       console.log(
//         response,
//         `On Demand Booking responseeeeeeeeeeee ${data.action}`,
//       );
//       setIncityRoundTripBooking(response.incity_roundtrip_bookings);
//     } catch (error) {
//       console.log(error, 'incity_roundtrip_bookings  Error');
//     }
//   };

//   useEffect(() => {
//   //   getOnDemandBooking({
//   //     action: 'ondemand_outstation_bookings',
//   //   });
//     getIncityRoundTripBookings({
//       action: 'incity_roundtrip_booking',
//     });
//     getIncityOneWayBookings({
//       action: 'incity_oneway_booking',
//     });
//   }, []);

//   return (
//     <>
//       {incityOneWayBooking &&
//         incityOneWayBooking.map((trip, index) => (
//           <TripCard key={index} trip={trip} />
//         ))}
//          {/* {incityRoundTripBooking &&
//         incityRoundTripBooking.map((trip, index) => (
//           <TripCard key={index} trip={trip} />
//         ))} */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: AppColors.mainColor,
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 10,
//     marginHorizontal: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 20,
//     color: AppColors.white,
//     marginRight: 10,
//   },
//   vehicleType: {
//     fontSize: 14,
//     color: AppColors.white,
//     marginLeft: 10,
//   },
//   contentWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftContent: {
//     flex: 0.7,
//     justifyContent: 'center',
//     borderRadius: 10,
//     backgroundColor: AppColors.white,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginLeft: 8,
//     color: AppColors.mainColor,
//     fontFamily: 'Roboto',
//   },
//   address: {
//     fontSize: 14,
//     color: '#444',
//     marginLeft: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   acceptText: {
//     color: AppColors.mainColor,
//     fontSize: 15,
//     fontWeight: '600',
//     paddingHorizontal: 5,
//   },
//   //
//   rightContent: {
//     flex: 0.4,
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   paymentDetails: {
//     alignSelf: 'flex-end',
//   },
//   incentiveBox: {
//     backgroundColor: '#2076bd',
//     padding: 5,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   incentiveText: {
//     color: AppColors.white,
//     fontSize: 12,
//   },
//   package: {
//     fontSize: 12,
//     color: AppColors.white,
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     alignSelf: 'baseline',
//     color: AppColors.white,
//     marginBottom: 5,
//   },
//   acceptButton: {
//     backgroundColor: AppColors.white,
//     padding: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//     minWidth: 80,
//   },
// });

// export default RoundTripBookingView;

// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/dist/FontAwesome';
// // import {AppColors} from '../../assets/Colors';
// // import Modal from 'react-native-modal';
// // import RoundTripBookingAceeptModal from '../modal/RoundTripBookingAceeptModal';

// // const TripCard = ({trip}) => {
// //   const [openModal, setOpenModal] = useState(false);
// //   return (
// //     <View style={styles.card}>
// //       <View style={styles.header}>
// //         <Text style={styles.time}>
// //           {trip.time} <Text style={{fontSize: 15}}>{trip.date}</Text>
// //         </Text>
// //         <View
// //           style={{
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             flexDirection: 'row',
// //             padding: 10,
// //           }}>
// //           <Icon color={AppColors.white} name="car" />
// //           <Text style={styles.vehicleType}>{trip.vehicleType}</Text>
// //         </View>
// //       </View>
// //       <View style={styles.contentWrapper}>
// //         <View style={styles.leftContent}>
// //           <Text style={styles.title}>{trip.title}</Text>
// //           {trip.addresses.map((address, index) => (
// //             <View key={index} style={{flexDirection: 'row'}}>
// //               <View
// //                 style={{
// //                   height: 10,
// //                   width: 10,
// //                   borderRadius: 5,
// //                   backgroundColor: index === 0 ? '#0dc53d' : AppColors.black,
// //                   alignItems: 'flex-start',
// //                   top: 5,
// //                   left: 10,
// //                 }}></View>
// //               <Text style={styles.address}>{address}</Text>
// //             </View>
// //           ))}
// //         </View>
// //         <View style={styles.rightContent}>
// //           <View style={styles.paymentDetails}>
// //             {trip.incentive && (
// //               <View style={styles.incentiveBox}>
// //                 <Text style={styles.incentiveText}>
// //                   + Incentive ₹ {trip.incentive}
// //                 </Text>
// //               </View>
// //             )}

// //             <Text style={styles.price}>₹ {trip.price}</Text>
// //             <Text style={styles.package}>{trip.package}</Text>
// //             <Text>{'\n'}</Text>
// //           </View>
// //           <TouchableOpacity
// //             onPress={() => setOpenModal(true)}
// //             style={styles.acceptButton}>
// //             <Text style={styles.acceptText}>Accept</Text>
// //           </TouchableOpacity>
// //           <Modal
// //             backdropOpacity={0}
// //             onBackdropPress={() => setOpenModal(false)}
// //             animationIn={'fadeInDown'}
// //             animationOut={'fadeOutUp'}
// //             isVisible={openModal}>
// //             <RoundTripBookingAceeptModal setOpenModal={setOpenModal} />
// //           </Modal>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const dummyData = [
// //   {
// //     time: '07:00 AM',
// //     date: '28 Jun, 2024',
// //     vehicleType: 'Manual-Standard',
// //     title: 'Round Trip - Incity',
// //     addresses: [
// //       '#26, Syndicate Bank Colony,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
// //     ],
// //     price: '943',
// //     package: 'Package-8 Hours',
// //     incentive: '100',
// //   },
// //   {
// //     time: '09:00 AM',
// //     date: '31 Jun, 2024',
// //     vehicleType: 'Manual-Luxury',
// //     title: 'Round Trip - Incity',
// //     addresses: ['Main Road\nBengaluru, Karnataka ,\nBangalore', 'alwar, alwar'],
// //     price: '943',
// //     package: 'Package-8 Hours',
// //   },
// //   {
// //     time: '09:00 AM',
// //     date: '31 Jun, 2024',
// //     vehicleType: 'Manual-Luxury',
// //     title: 'Round Trip - Incity',
// // addresses: [
// //   'Alwar Alwar,\nNear Magadi Main Road\nBengaluru, Karnataka ,\nBangalore',
// //   'Platinum District , Alwar',
// // ],
// //     price: '9003',
// //     package: 'Package-5 Hours',
// //     incentive: '500',
// //   },
// // ];

// // const RoundTripBookingView = () => {
// //   return (
// //     <>
// //       {dummyData.map((trip, index) => (
// //         <TripCard key={index} trip={trip} />
// //       ))}
// //     </>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   card: {
// //     backgroundColor: AppColors.mainColor,
// //     borderRadius: 10,
// //     padding: 15,
// //     // marginTop: 10,
// //     marginHorizontal: 15,
// //     marginVertical: 5,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     marginBottom: 10,
// //     alignItems: 'center',
// //   },
// //   time: {
// //     fontSize: 20,
// //     color: AppColors.white,
// //     marginRight: 10,
// //   },
// //   vehicleType: {
// //     fontSize: 14,
// //     color: AppColors.white,
// //     marginLeft: 10,
// //   },
// //   contentWrapper: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   leftContent: {
// //     flex: 0.7,
// //     justifyContent: 'center',
// //     borderRadius: 10,
// //     backgroundColor: AppColors.white,
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     marginLeft: 8,
// //     color: AppColors.mainColor,
// //     fontFamily: 'Roboto',
// //   },
// //   address: {
// //     fontSize: 14,
// //     color: '#444',
// //     marginLeft: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   acceptText: {
// //     color: AppColors.mainColor,
// //     fontSize: 15,
// //     fontWeight: '600',
// //     paddingHorizontal: 5,
// //   },
// //   //
// //   rightContent: {
// //     flex: 0.4,
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-end',
// //   },
// //   paymentDetails: {
// //     alignItems: 'center',
// //   },
// //   incentiveBox: {
// //     backgroundColor: '#2076bd',
// //     padding: 5,
// //     borderRadius: 5,
// //     marginBottom: 5,
// //   },
// //   incentiveText: {
// //     color: AppColors.white,
// //     fontSize: 12,
// //   },
// //   package: {
// //     fontSize: 12,
// //     color: AppColors.white,
// //     marginBottom: 5,
// //   },
// //   price: {
// //     fontSize: 30,
// //     fontWeight: 'bold',
// //     alignSelf: 'baseline',
// //     color: AppColors.white,
// //     marginBottom: 5,
// //   },
// //   acceptButton: {
// //     backgroundColor: AppColors.white,
// //     padding: 5,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     minWidth: 80,
// //   },
// // });

// // export default RoundTripBookingView;
