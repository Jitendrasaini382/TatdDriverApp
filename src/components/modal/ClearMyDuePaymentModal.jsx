import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../assets/Colors';

const DetailRow = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ClearMyDuePaymentModal = ({setMyDuePaymentModal, tripDetails}) => {
  console.log(tripDetails,'ddddd');
  if (!tripDetails) return null;

  return (
    <ScrollView>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Package Details</Text>
          <TouchableOpacity
            onPress={() => setMyDuePaymentModal(false)}
            style={styles.closeIcon}>
            <Text style={styles.closeIconText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <DetailRow label="Trip Type:" value={tripDetails.tripType} />
          <DetailRow label="Package:" value={tripDetails.package} />
          <DetailRow label="Package Price : Cash" value={`Rs ${tripDetails.amount}`} />
          <DetailRow label="GST : 5%" value={`Rs ${tripDetails.gst}`} />
          <DetailRow label="Commission : 20%" value={`Rs ${tripDetails.gst}`} />
          <View style={styles.divider} />
          <DetailRow label="Net Earning:" value={`Rs ${tripDetails.gst}`} />
          <View style={styles.divider} />

          <View style={styles.bulletPointContainer}>
            <BulletPoint text="Overtime Charges- Rs 2 Per Minute" />
            <BulletPoint text="Night Charges - Rs 200 Applied only in case you travel between 10:00 PM to 06:00 AM" />
            <BulletPoint text="Return to TAT D- Rs. 307" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setMyDuePaymentModal(false)}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const BulletPoint = ({text}) => (
  <View style={styles.bulletPointRow}>
    <View style={styles.bullet} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: AppColors.mainColor,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: AppColors.black,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  closeIcon: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 5,
    padding: 5,
  },
  closeIconText: {
    color: AppColors.white,
    fontSize: 17,
  },
  contentContainer: {
    margin: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: AppColors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
  },
  detailValue: {
    color: AppColors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  bulletPointContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  bulletPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.black,
  },
  bulletText: {
    color: AppColors.black,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ClearMyDuePaymentModal;

























// import {
//   Button,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {AppColors} from '../../assets/Colors';


// const ClearMyDuePaymentModal = ({setMyDuePaymentModal, tripDetails}) => {
//   if (!tripDetails) return null
//   else{

//   }
//   return (
//     <ScrollView>
//       <View
//         style={{
//             flex: 1,
//           backgroundColor: AppColors.white,
//           borderWidth: 2,
//           borderRadius: 10,
//           borderColor: AppColors.mainColor,
//         }}>
//         {/* top content */}

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             padding: 20,
//             alignItems: 'center',
//             //   marginBottom: 20,
//           }}>
//           <Text
//             style={{
//               color: AppColors.black,
//               fontSize: 17,
//               fontWeight: 'bold',
//               fontFamily: 'Roboto-Regular',
//             }}>
//             Package Details
//           </Text>
//           <TouchableOpacity
//         onPress={() => setMyDuePaymentModal(false) }
//         style={{backgroundColor: AppColors.mainColor, borderRadius: 5}}>
//             <Text
//               style={{
//                 color: AppColors.white,
//                 paddingHorizontal: 7,
//                 fontSize: 17,
//                 paddingVertical: 3,
//               }}>
//               X
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* bottam Content */}

//         {/* <View style={{margin: 30}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Trip Type:
//             </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Round Trip
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Package:
//             </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               10 Hours
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//              Package Price : Cash
//             </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//              Rs 1292
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               GST : 5%
//               </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Rs 61
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//              Commission : 20%

//             </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Rs 246
//             </Text>
//           </View>
//           <View style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginVertical: 10,
//             }}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Net Earning:
//             </Text>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 marginBottom: 10,
//                 fontFamily: 'Roboto-Regular',
//                 fontSize: 13,
//               }}>
//               Rs 985
//             </Text>
//           </View>
//           <View style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>
//           <View
//             style={{
//               marginTop: 10,
//               marginBottom: 20,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingVertical: 2,
//               }}>
//               <View
//                 style={{
//                   width: 4,
//                   height: 4,
//                   borderRadius: 2,
//                   backgroundColor: AppColors.black,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: AppColors.black,
//                   marginLeft: 10,
//                   fontFamily: 'Roboto-Regular',
//                   fontWeight: 'bold',
//                 }}>
//                 Overtime Charges- Rs 2 Per Minute
//               </Text>
//             </View>

//             <View style={styles.container}>
//               <View style={styles.bullet} />
//               <View style={styles.textContainer}>
//                 <Text style={styles.text}>
//                   Night Charges - Rs 200 Applied only incase you travel in
//                   between 10:00 PM to 06:00 AM
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 paddingVertical: 2,
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: 4,
//                   height: 4,
//                   borderRadius: 2,
//                   backgroundColor: AppColors.black,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: AppColors.black,
//                   marginLeft: 10,
//                   fontFamily: 'Roboto-Regular',
//                   fontWeight: 'bold',
//                 }}>
//                 Return to TAT D- Rs. 307
//               </Text>
//             </View>
//           </View>
//           <View style={{borderBottomWidth: 1, borderColor: '#808080'}}></View>
//         </View> */}

// <View style={styles.contentContainer}>
//           <DetailRow label="Trip Type:" value={tripDetails.tripType} />
//           <DetailRow label="Package:" value={tripDetails.package} />
//           <DetailRow label="Package Price : Cash" value={`Rs ${tripDetails.packagePrice}`} />
//           <DetailRow label="GST : 5%" value={`Rs ${tripDetails.gst}`} />
//           <DetailRow label="Commission : 20%" value={`Rs ${tripDetails.commission}`} />
//           <View style={styles.divider} />
//           <DetailRow label="Net Earning:" value={`Rs ${tripDetails.netEarning}`} />
//           <View style={styles.divider} />

//         {/* bottam content button  */}

        
//         {/* <TouchableOpacity
//         onPress={() => setMyDuePaymentModal(false) }
//         style={styles.payButton}>
//         <Text style={styles.payButtonText}>Close</Text>
//       </TouchableOpacity> */}
//        <TouchableOpacity
//           onPress={() => setMyDuePaymentModal(false)}
//           style={styles.closeButton}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//     }
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 2,
//   },
//   bullet: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: AppColors.black,
//     marginTop: 7,
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   text: {
//     color: AppColors.mainColor,
//     fontFamily: 'Roboto-Regular',
//     fontWeight: 'bold',
//   },
//   payButton: {
//     backgroundColor: '#16588e',
//     paddingHorizontal:35,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginTop: 10,
//     marginBottom: 30
//   },
//   payButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

//   export default ClearMyDuePaymentModal;