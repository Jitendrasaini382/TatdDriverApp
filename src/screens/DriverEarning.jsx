// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
// } from 'react-native';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import MyDriverEarning from '../components/MyDriverEarnIng';

// const {width: SCREEN_WIDTH} = Dimensions.get('window');

// const DriverEarning = ({}) => {

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header backButton={true} />
//       <MyDriverEarning/>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
// });

// export default DriverEarning;























import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import DriverEarnIngModal from '../components/modal/DriverEarnIngModal';

// const earningData = [
//   {amount: 1313, days: 7},
//   {amount: 1313, days: 7},
//   {amount: 1313, days: 7},
// ];

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const tripData = [
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '25 Jun,2024',
  },
];


const DriverEarning = ({}) => {
  const [packageDetailsDriverEarning, setPackageDetailsDriverEarning] =  useState(false);
  // const renderEarningItem = ({item}) => (
  //   <View style={{justifyContent: "space-between", alignItems: "center"}}>
  //     <View style={styles.earningItem}>
  //     <Text style={styles.earningAmount}>₹{item.amount}</Text>
  //     <Text style={styles.earningDays}>{item.days} days</Text>
  //   </View>
  //   </View>
  // );

  const renderTripItem = ({item}) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <TouchableOpacity
         onPress={() => setPackageDetailsDriverEarning(true)}
          >
          <Icon
            name="eye"
            size={20}
            color={AppColors.mainColor}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
        <Modal
        backdropOpacity={0}
        onBackdropPress={() => setPackageDetailsDriverEarning(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={packageDetailsDriverEarning}>
        

          <DriverEarnIngModal  setPackageDetailsDriverEarning={setPackageDetailsDriverEarning} />
      </Modal>

        <View style={styles.contentContainer}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripType}>
              {item.type} - {item.duration} - {item.mode}
            </Text>
            <Text style={styles.tripDate}>
              {item.date} -{' '}
              <Text style={styles.settlementType}>{item.settlementType}</Text>{' '}
              {item.settlementDate}
            </Text>
          </View>
          <Text style={styles.tripAmount}>₹{item.amount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View style={styles.earningHeader}>
        <Text style={styles.earningHeaderText}>My tatd Earning ₹215147</Text>
        <View style={styles.underLineView}></View>
      </View>

      {/* headline Content */}
      <View style={styles.headlineContainer}>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> 0
          </Text>
          <Text style={styles.headlineDays}>7 days</Text>
        </View>

        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> 0
          </Text>
          <Text style={styles.headlineDays}>7 days</Text>
        </View>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> 0
          </Text>
          <Text style={styles.headlineDays}>7 days</Text>
        </View>
      </View>

      {/* all Trip details */}
      <FlatList
        data={tripData}
        renderItem={renderTripItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.tripList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  earningHeader: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: AppColors.black,
  },
  headlineContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
  headlineContent: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 40,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  headlineAmount: {
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
  headlineDays: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontSize: 10,
  },

  earningHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  underLineView: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.black,
    height: 1,
    width: 120,
    marginTop: 5,
    marginRight: 20,
  },

  earningList: {
    paddingVertical: 10,
  },
  earningItem: {
    backgroundColor: 'red',
    borderRadius: 10,
    // padding: 15,
    // marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: SCREEN_WIDTH * 0.2,
  },
  earningAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  earningDays: {
    color: 'white',
    fontSize: 12,
  },
  tripList: {
    flex: 1,
    marginTop: 50,
  },
  tripItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    // marginTop: 10
    // borderBottomWidth: 1,
    // borderBottomColor: AppColors.black,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  tripInfo: {
    flex: 1,
  },
  tripType: {
    fontSize: 16,
    // fontWeight: 'bold',
    paddingBottom: 5,
    color: '#000',
  },
  tripDate: {
    fontSize: 12,
    color: '#888',
  },
  settlementType: {
    fontWeight: 'bold',
  },
  tripAmount: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
  },
});

export default DriverEarning;

// <View style={styles.tripItem}>
//   <View style={styles.tripHeader}>
//     <Icon
//       name="eye"
//       size={20}
//       color={AppColors.mainColor}
//       style={styles.eyeIcon}
//     />
//     <View
//       style={{
//         justifyContent: 'space-evenly',
//         // alignItems: 'flex-end',
//         flexDirection: 'row',
//       }}>
//       <View style={styles.tripInfo}>
//         <Text style={styles.tripType}>
//           {item.type} - {item.duration} - {item.mode}
//         </Text>
//         <Text style={styles.tripDate}>
//           {item.date} -{' '}
//           <Text style={{fontWeight: 'bold'}}>{item.settlementType}</Text>{' '}
//           {item.settlementDate}
//         </Text>
//       </View>
//       <View style={{}}>
//         <Text style={styles.tripAmount}>₹{item.amount}</Text>
//       </View>
//     </View>
//   </View>
//   <View style={styles.separator} />
// </View>

//   const renderEarningItem = ({item}) => (
//     <View style={styles.earningItem}>
//       <Text style={styles.earningAmount}>₹{item.amount}</Text>
//       <Text style={styles.earningDays}>{item.days} days</Text>
//     </View>
//   );

//   const renderTripItem = ({item}) => (
//     <View style={styles.tripItem}>
//       <View style={styles.tripHeader}>
//         <Icon name="eye" size={20} color=AppColors.black />
//         <View style={styles.tripInfo}>
//           <Text style={styles.tripType}>
//             {item.type} - {item.duration} - {item.mode}
//           </Text>
//           <Text style={styles.tripDate}>
//             {item.date} - {item.settlementType} {item.settlementDate}
//           </Text>
//         </View>
//         <Text style={styles.tripAmount}>₹{item.amount}</Text>
//       </View>
//       <View style={styles.separator} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Header backButton={true} />
//       <View style={styles.earningHeader}>
//         <Text style={styles.earningHeaderText}>My tatd Earning ₹215147</Text>
//       </View>
//       <FlatList
//         data={earningData}
//         renderItem={renderEarningItem}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         contentContainerStyle={styles.earningList}
//       />
//       <FlatList
//         data={tripData}
//         renderItem={renderTripItem}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.tripList}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   earningHeader: {
//     alignItems: 'flex-end',
//     paddingRight: 15,
//     paddingTop: 20,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: AppColors.black,
//   },
//   earningHeaderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: AppColors.black,
//   },
//   earningList: {
//     paddingVertical: 10,
//   },
//   earningItem: {
//     backgroundColor: 'red',
//     borderRadius: 10,
//     padding: 15,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // minWidth: 100,.
//     // height:100
//   },
//   earningAmount: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   earningDays: {
//     color: 'white',
//     fontSize: 12,
//   },

//   tripItem: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   tripHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tripInfo: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   tripType: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   tripDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   tripAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginTop: 10,
//   },
// });

// import {StatusBar, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import Header from '../components/Header';

// const earningData = [
//   { amount: 1313, days: 7 },
//   { amount: 1564, days: 15 },
//   { amount: 2606, days: 30 },
// ];

// const tripData = [
//   { type: 'Incity Roundtrip', duration: '10 Hours', mode: 'Cash', amount: 985, date: '26 Jun,2024', settlementType: 'Cash With Driver', settlementDate: '25 Jun,2024' },
//   { type: 'Incity Oneway', duration: '40 KMs', mode: 'Cash', amount: 328, date: '21 Jun,2024', settlementType: 'Settled By Driver', settlementDate: '22 Jun,2024' },
//   { type: 'Incity Oneway', duration: '25 KMs', mode: 'Cash', amount: 251, date: '18 Jun,2024', settlementType: 'Settled By Driver', settlementDate: '21 Jun,2024' },
//   { type: 'Incity Roundtrip', duration: '5 Hours', mode: 'Cash', amount: 389, date: '12 Jun,2024', settlementType: 'Settled By Driver', settlementDate: '13 Jun,2024' },
//   { type: 'Incity Roundtrip', duration: '3 Hours', mode: 'Cash', amount: 264, date: '07 Jun,2024', settlementType: 'Settled By Driver', settlementDate: '07 Jun,2024' },
//   { type: 'Incity Roundtrip', duration: '5 Hours', mode: 'Cash', amount: 389, date: '07 Jun,2024', settlementType: 'Settled By Driver', settlementDate: '07 Jun,2024' },
//   { type: 'Outstation Oneway', duration: '250 KMs', mode: 'Cash', amount: 1258, date: '23 May,2024', settlementType: 'Settled By Driver', settlementDate: '24 May,2024' },
//   { type: 'Incity Roundtrip', duration: '5 Hours', mode: 'Cash', amount: 427, date: '08 May,2024', settlementType: 'Settled By Driver', settlementDate: '08 May,2024' },
//   { type: 'Outstation Oneway', duration: '200 KMs', mode: 'Cash', amount: 1067, date: '07 May,2024', settlementType: 'Settled By Driver', settlementDate: '07 May,2024' },
// ];

// const DriverEarning = () => {
//   return (
//     <View style={{flex: 1, flexDirection: 'column'}}>
//       <Header backButton={true} />

//       <View style={{margin: 0, justifyContent: 'center'}}>
//         <View
//           style={{
//             alignItems: 'flex-end',
//             marginTop: 40,
//             marginRight: 15,
//             marginBottom: 10,
//           }}>

//           <View style={{position: 'relative'}}>
//             <Text
//               style={{
//                 color: AppColors.black,
//                 fontWeight: '400',
//                 paddingBottom: 3, // Space between text and underline
//               }}>
//               My tatd Earning <Icon name="rupee" Size={30} />0
//             </Text>
//   <View
//     style={{
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       height: .5, // Thickness of the underline
//       backgroundColor: AppColors.black, // Color of the underline
//     }}
//   />
// </View>

//           <Text
//             style={{
//               marginRight: 10,
//               fontSize: 1,
//               textDecorationLine: 'underline',
//             }}></Text>
//         </View>
//         <View
//           style={{
//             margin: 10,
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginTop: 0,
//           }}>
//           <View
//             style={{
//               backgroundColor: 'red',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 10,
//               paddingVertical: 6,
//               paddingHorizontal: 40,
//               textAlign: 'center',
//               justifyContent: 'center',
//               margin: 5,
//             }}>
//             <Text
//               style={{
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 color: 'white',
//                 fontSize: 13,
//               }}>
//               <Icon name="rupee" /> 0
//             </Text>
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 color: 'white',
//                 fontSize: 10,
//               }}>
//               7 days
//             </Text>
//           </View>
//           <View
//             style={{
//               backgroundColor: 'red',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 10,
//               paddingVertical: 6,
//               paddingHorizontal: 40,
//               textAlign: 'center',
//               justifyContent: 'center',
//               margin: 5,
//             }}>
//             <Text
//               style={{
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 color: 'white',
//                 fontSize: 13,
//               }}>
//               <Icon name="rupee" /> 0
//             </Text>
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 color: 'white',
//                 fontSize: 10,
//               }}>
//               7 days
//             </Text>
//           </View>
//           <View
//             style={{
//               backgroundColor: 'red',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 10,
//               paddingVertical: 6,
//               paddingHorizontal: 40,
//               textAlign: 'center',
//               margin: 5,

//               justifyContent: 'center',
//             }}>
//             <Text
//               style={{
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 color: 'white',
//                 fontSize: 13,
//               }}>
//               <Icon name="rupee" /> 0
//             </Text>
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 color: 'white',
//                 fontSize: 10,
//               }}>
//               7 days
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DriverEarning;

// const styles = StyleSheet.create({});
