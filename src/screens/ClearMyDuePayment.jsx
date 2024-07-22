import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import ClearMyDuePaymentModal from '../components/modal/ClearMyDuePaymentModal';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AppFont} from '../assets/FontsFamily';

const ClearMyDuePayment = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />
      <View style={styles.contentContainer}>
        <ClearMyDue />
        <View style={styles.youtubeView}>
          <YoutubePlayer height={500} videoId={'SsG_qwb0zLs'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const ClearMyDue = () => {
  const [myDuePaymentModal, setMyDuePaymentModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [dummyData, setDummyData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(1000);



  // const data = [
  //   {
  //     bookingId: '430664',
  //     scheduleDate: '26 Jun, 2024 10:30:00',
  //     status: 'Cash With Driver',
  //     amount: '-307',
  //     gst: '20',
  //   },
  //   {
  //     bookingId: '430665',
  //     scheduleDate: '27 Jun, 2024 11:30:00',
  //     status: 'Cash With Driver',
  //     amount: '-410',
  //     gst: '40',
  //   },
  //   {
  //     bookingId: '430666',
  //     scheduleDate: '28 Jun, 2024 09:30:00',
  //     status: 'Cash With Driver',
  //     amount: '-210',
  //     gst: '90',
  //   },
  // ];
  // useEffect(() => {
  //   // Simulating API call to fetch data
  //   // const fetchData = async () => {
  //     // Replace this with actual API call
      // const data = [
      //   {
      //     bookingId: '430664',
      //     scheduleDate: '26 Jun, 2024 10:30:00',
      //     status: 'Cash With Driver',
      //     amount: '-307',
      //     gst: '20',
      //   },
      //   {
      //     bookingId: '430665',
      //     scheduleDate: '27 Jun, 2024 11:30:00',
      //     status: 'Cash With Driver',
      //     amount: '-410',
      //     gst: '40',
      //   },
      //   {
      //     bookingId: '430666',
      //     scheduleDate: '28 Jun, 2024 09:30:00',
      //     status: 'Cash With Driver',
      //     amount: '-210',
      //     gst: '90',
      //   },
      // ];
  //     setDummyData(data);
  //     // calculateTotalAmount(data);
  //   };

  //   fetchData();
  // }, []);

  // const calculateTotalAmount = (data) => {
  //   const total = data.reduce(
  //     (sum, item) => sum + Math.abs(parseInt(item.amount)),
  //     0,
  //   );
  //   setTotalAmount(total);
  // };

  const handleEyePress = trip => {
    setSelectedTrip(trip);
    setMyDuePaymentModal(true);
  };

  const handlePayment = () => {
    Alert.alert(
      'Payment Confirmation',
      `Are you sure you want to pay ₹${totalAmount}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay',
          // onPress: () => Alert.alert('Success', 'Payment processed successfully!'),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainInnerView}>
        <Text style={styles.title}>Clear My Due</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Booking Id</Text>
          <Text style={[styles.headerText, styles.borderLeft]}>
            Schedule Date
          </Text>
          <Text style={[styles.headerText, styles.borderLeft]}>Status</Text>
          <Text style={[styles.headerText, styles.borderLeft]}>Amount</Text>
        </View>
        <ScrollView>
          {dummyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.bookingIdCell}>
                <Text style={styles.cellText}>{item.bookingId}</Text>
                <TouchableOpacity onPress={() => handleEyePress(item)}>
                  <Icon name="eye" size={18} color={AppColors.mainColor} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.scheduleDate}
              </Text>
              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.status}
              </Text>
              <Text style={[styles.cellText, styles.borderLeft]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setMyDuePaymentModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={myDuePaymentModal}>
          <ClearMyDuePaymentModal
            setMyDuePaymentModal={setMyDuePaymentModal}
            tripDetails={selectedTrip}
          />
        </Modal>
      </View>
      <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay ₹ {totalAmount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppColors.white,
  },
  contentContainer: {
    marginTop: 30,
    padding: 10,
    elevation: 5,
  },
  container: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#ccc',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainInnerView: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    color: AppColors.black,
    fontWeight: '700',
    fontSize: 21,
    fontFamily: AppFont.regularFont,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: AppColors.mainColor,
  },
  headerText: {
    color: AppColors.white,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bookingIdCell: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  cellText: {
    flex: 1,
    color: AppColors.black,
    textAlign: 'center',
    padding: 10,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },
  payButton: {
    backgroundColor: AppColors.mainColor,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
  youtubeView: {
    marginTop: 20,
    padding: 12,
  },
});

export default ClearMyDuePayment;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Feather';
// import ClearMyDuePaymentModal from '../components/modal/ClearMyDuePaymentModal';
// import {AppColors} from '../assets/Colors';
// import Header from '../components/Header';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import {AppFont} from '../assets/FontsFamily';

// const ClearMyDuePayment = () => {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: AppColors.white,
//       }}>
//       <Header backButton={true} />
//       <View
//         style={{
//           marginTop: 30,
//           padding: 10,
//           elevation: 5,
//         }}>
//         <ClearMyDue />

//         <View style={styles.youtubeView}>
//           <YoutubePlayer
//             height={500}
//             // autoPlay={false}
//             videoId={'SsG_qwb0zLs'}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const ClearMyDue = () => {
//   const [myDuePaymentModal, setMyDuePaymentModal] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState(null);

//   const [dummyData, setDummyData] = useState([]);
//   // const dummyData = [
//   //   {
//   //     bookingId: '430664',
//   //     scheduleDate: '26 Jun, 2024 10:30:00',
//   //     status: 'Cash With Driver',
//   //     amount: '-307',
//   //     gst: '20',
//   //   },
//   //   {
//   //     bookingId: '430664',
//   //     scheduleDate: '26 Jun, 2024 10:30:00',
//   //     status: 'Cash With Driver',
//   //     amount: '-307',
//   //     gst: '40',
//   //   },
//   //   {
//   //     bookingId: '430664',
//   //     scheduleDate: '26 Jun, 2024 10:30:00',
//   //     status: 'Cash With Driver',
//   //     amount: '-307',
//   //     gst: '90',
//   //   },
//   // ];

//   // const totalAmount = dummyData.reduce(
//   //   (sum, item) => sum + Math.abs(parseInt(item.amount)),
//   //   0,
//   // );

//   const handleEyePress = trip => {
//     setSelectedTrip(trip);
//     setMyDuePaymentModal(true);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainInnerView}>
//         <Text style={styles.title}>Clear My Due</Text>
//       </View>
//       <View style={styles.tableContainer}>
//         <View style={styles.tableHeader}>
//           <Text style={styles.headerText}>Booking Id</Text>
//           <Text style={[styles.headerText, styles.borderLeft]}>
//             Schedule Date
//           </Text>
//           <Text style={[styles.headerText, styles.borderLeft]}>Status</Text>
//           <Text style={[styles.headerText, styles.borderLeft]}>Amount</Text>
//         </View>
//         <ScrollView>
//           {dummyData.map((item, index) => (
//             <View key={index} style={styles.tableRow}>
//               <View style={styles.bookingIdCell}>
//                 <Text style={styles.cellText}>{item.bookingId}</Text>
//                 <TouchableOpacity onPress={() => handleEyePress(item)}>
//                   <Icon name="eye" size={18} color={AppColors.mainColor} />
//                 </TouchableOpacity>
//               </View>

//               <Text style={[styles.cellText, styles.borderLeft]}>
//                 {item.scheduleDate}
//               </Text>
//               <Text style={[styles.cellText, styles.borderLeft]}>
//                 {item.status}
//               </Text>
//               <Text style={[styles.cellText, styles.borderLeft]}>
//                 {item.amount}
//               </Text>
//             </View>
//           ))}
//         </ScrollView>
//         <Modal
//           backdropOpacity={0}
//           onBackdropPress={() => setMyDuePaymentModal(false)}
//           animationIn={'fadeInDown'}
//           animationOut={'fadeOutUp'}
//           isVisible={myDuePaymentModal}>
//           <ClearMyDuePaymentModal
//             setMyDuePaymentModal={setMyDuePaymentModal}
//             tripDetails={selectedTrip}
//           />
//         </Modal>
//       </View>
//       <TouchableOpacity
//         onPress={() => Alert.alert('Loading Payment Page...')}
//         style={styles.payButton}>
//         <Text style={styles.payButtonText}>Pay ₹ 927</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 10,
//     padding: 20,
//     // elevation: 5,
//     shadowColor: '#ccc',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   mainInnerView: {
//     alignItems: 'flex-start',
//     marginBottom: 15,
//   },
//   title: {
//     color: AppColors.black,
//     fontWeight: '700',
//     fontSize: 21,
//     fontFamily: AppFont.regularFont,
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: AppColors.mainColor,
//   },
//   headerText: {
//     color: AppColors.white,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//     padding: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   bookingIdCell: {
//     // flexDirection: 'column',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//   },
//   cellText: {
//     flex: 1,
//     color: AppColors.black,
//     textAlign: 'center',
//     padding: 10,
//   },
//   borderLeft: {
//     borderLeftWidth: 1,
//     borderColor: '#ddd',
//   },
//   payButton: {
//     backgroundColor: AppColors.mainColor,
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   payButtonText: {
//     color: AppColors.white,
//     fontWeight: 'bold',
//   },

//   mainView: {
//     borderColor: 'rgb(128,128,128)',
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderRadius: 8,
//     lineHeight: 20,
//     shadowColor: 'rgb(128,128,128)',
//     shadowOffset: {width: 5, height: 4},
//     shadowOpacity: 5,
//     elevation: 5,
//     shadowRadius: 5,
//     marginBottom: 20,
//     padding: 10,
//   },
//   youtubeView: {marginTop: 20, padding: 12},
// });

// export default ClearMyDuePayment;
