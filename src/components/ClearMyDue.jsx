import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import ClearMyDuePaymentModal from './modal/ClearMyDuePaymentModal';
import { AppColors } from '../assets/Colors';

const ClearMyDue = () => {
  const [myDuePaymentModal, setMyDuePaymentModal ] = useState(false);
  const dummyData = [
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
    },
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
    },
    {
      bookingId: '430664',
      scheduleDate: '26 Jun, 2024 10:30:00',
      status: 'Cash With Driver',
      amount: '-307',
    },
  ];

  const totalAmount = dummyData.reduce(
    (sum, item) => sum + Math.abs(parseInt(item.amount)),
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Clear My Due</Text>
      </View>
      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setMyDuePaymentModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={myDuePaymentModal}>
          <ClearMyDuePaymentModal  setMyDuePaymentModal={setMyDuePaymentModal} />
      </Modal>
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
                <TouchableOpacity
                  onPress={() => {
                    setMyDuePaymentModal(true);
                  }}>
                  <Icon name="eye" size={18} color="#16588e" />
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
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert('Loading Payment Page...')}
        style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay ₹ 927</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    // elevation: 5,
    shadowColor: '#ccc',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainView: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    color: AppColors.black,
    fontWeight: '700',
    fontSize: 21,
    fontFamily: 'Roboto-Regular',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#16588e',
  },
  headerText: {
    color: 'white',
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
    // flexDirection: 'column',
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
    backgroundColor: '#16588e',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ClearMyDue;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const ClearMyDue = () => {
//   const dummyData = [
//     {
//       bookingId: '430664',
//       scheduleDate: '26 Jun, 2024 10:30:00',
//       status: 'Cash With Driver',
//       amount: '-307',
//     },
//     {
//         bookingId: '430664',
//         scheduleDate: '26 Jun, 2024 10:30:00',
//         status: 'Cash With Driver',
//         amount: '-307',
//       },
//       {
//         bookingId: '430664',
//         scheduleDate: '26 Jun, 2024 10:30:00',
//         status: 'Cash With Driver',
//         amount: '-307',
//       },
//   ];

//   const totalAmount = dummyData.reduce((sum, item) => sum + Math.abs(parseInt(item.amount)), 0);

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainView}>
//         <Text style={styles.title}>Clear My Due</Text>
//       </View>
//       <View style={styles.tableContainer}>
//         <View style={styles.tableHeader}>
//           <Text style={styles.headerText}>Booking Id</Text>
//           <Text style={styles.headerText}>Schedule Date</Text>
//           <Text style={styles.headerText}>Status</Text>
//           <Text style={styles.headerText}>Amount</Text>
//         </View>
//         <ScrollView>
//           {dummyData.map((item, index) => (
//             <View key={index} style={styles.tableRow}>
//               <View style={styles.bookingIdCell}>
//                 <Text style={styles.cellText}>{item.bookingId}</Text>
//                 <Icon name="eye" size={18} color="#16588e" />
//               </View>
//               <Text style={styles.cellText}>{item.scheduleDate}</Text>
//               <Text style={styles.cellText}>{item.status}</Text>
//               <Text style={styles.cellText}>{item.amount}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//       <TouchableOpacity style={styles.payButton}>
//         <Text style={styles.payButtonText}>Pay ₹307</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   mainView: {
//     alignItems: 'flex-start',
//     marginBottom: 15,
//   },
//   title: {
//     color: AppColors.black,
//     fontWeight: '700',
//     fontSize: 21,
//     fontFamily: 'Roboto-Regular',
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#16588e',
//     padding: 10,
//   },
//   headerText: {
//     color: 'white',
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//   },
//   bookingIdCell: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   cellText: {
//     flex: 1,
//     color: AppColors.black,
//     textAlign: 'center',
//   },
//   payButton: {
//     backgroundColor: '#16588e',
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   payButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ClearMyDue;

// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import Icon from 'react-native-vector-icons/Feather'; // Assuming you're using react-native-vector-icons

// // const ClearMyDue = () => {
// //   const dummyData = {
// //     bookingId: '430664',
// //     scheduleDate: '26 Jun, 2024 10:30:00',
// //     status: 'Cash With Driver',
// //     amount: '-307',
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.mainView}>
// //         <Text style={styles.title}>Clear My Due</Text>
// //       </View>
// //       <View style={styles.tableContainer}>
// //         <View style={styles.tableHeader}>
// //           <Text style={styles.headerText}>Booking Id</Text>
// //           <Text style={styles.headerText}>Schedule Date</Text>
// //           <Text style={styles.headerText}>Status</Text>
// //           <Text style={styles.headerText}>Amount</Text>
// //         </View>
// //         <View style={styles.tableRow}>
// //           <View style={styles.bookingIdCell}>
// //             <Text style={styles.cellText}>{dummyData.bookingId}</Text>
// //             <Icon name="eye" size={18} color="#16588e" />
// //           </View>
// //           <Text style={styles.cellText}>{dummyData.scheduleDate}</Text>
// //           <Text style={styles.cellText}>{dummyData.status}</Text>
// //           <Text style={styles.cellText}>{dummyData.amount}</Text>
// //         </View>
// //       </View>
// //       <TouchableOpacity style={styles.payButton}>
// //         <Text style={styles.payButtonText}>Pay ₹307</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     // backgroundColor: 'white',
// //     borderRadius: 10,
// //     padding: 20,
// //     shadowColor: AppColors.black,
// //     // shadowOffset: { width: 0, height: 2 },
// //     // shadowOpacity: 0.1,
// //     // shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   mainView: {
// //     alignItems: 'flex-start',
// //     marginBottom: 15,
// //   },
// //   title: {
// //     color: AppColors.black,
// //     fontWeight: '700',
// //     fontSize: 21,
// //     fontFamily: 'Roboto-Regular',
// //   },
// //   tableContainer: {
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 5,
// //     overflow: 'hidden',
// //   },
// //   tableHeader: {
// //     flexDirection: 'row',
// //     backgroundColor: '#16588e',
// //     padding: 10,

// //   },
// //   headerText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     flex: 1,
// //     textAlign: 'center',
// //   },
// //   tableRow: {
// //     flexDirection: 'row',
// //     borderTopWidth: 1,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     padding: 10,
// //   },
// //   bookingIdCell: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   cellText: {
// //     flex: 1,
// //     color: AppColors.black,
// //     textAlign: 'center',
// //   },
// //   payButton: {
// //     backgroundColor: '#16588e',
// //     padding: 10,
// //     borderRadius: 5,
// //     alignSelf: 'center',
// //     marginTop: 20,
// //   },
// //   payButtonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //   },
// // });

// // export default ClearMyDue;
