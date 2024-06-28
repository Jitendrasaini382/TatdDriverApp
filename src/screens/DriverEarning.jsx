import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';

const earningData = [
  {amount: 1313, days: 7},
  {amount: 1313, days: 7},
  {amount: 1313, days: 7},
];

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

const DriverEarning = () => {
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
        <Icon name="eye" size={20} color="#000" style={styles.eyeIcon} />
        <View
          style={{
            justifyContent: 'space-evenly',
            // alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripType}>
              {item.type} - {item.duration} - {item.mode}
            </Text>
            <Text style={styles.tripDate}>
              {item.date} - {item.settlementType} {item.settlementDate}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.tripAmount}>₹{item.amount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View style={styles.earningHeader}>
        <Text style={styles.earningHeaderText}>My tatd Earning ₹215147</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View
          style={{
            backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 40,
            textAlign: 'center',
            justifyContent: 'center',
            margin: 5,
          }}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              color: 'white',
              fontSize: 13,
            }}>
            <Icon name="rupee" /> 0
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: 'white',
              fontSize: 10,
            }}>
            7 days
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 40,
            textAlign: 'center',
            justifyContent: 'center',
            margin: 5,
          }}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              color: 'white',
              fontSize: 13,
            }}>
            <Icon name="rupee" /> 0
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: 'white',
              fontSize: 10,
            }}>
            7 days
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 40,
            textAlign: 'center',
            margin: 5,

            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              color: 'white',
              fontSize: 13,
            }}>
            <Icon name="rupee" /> 0
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: 'white',
              fontSize: 10,
            }}>
            7 days
          </Text>
        </View>
      </View>
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
    backgroundColor: '#fff',
  },
  earningHeader: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
  },
  earningHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
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
    // flex: 1,
  },
  tripItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tripHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  eyeIcon: {
    marginRight: 10,
  },
  tripInfo: {
    // flex: 1,
  },
  tripType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tripDate: {
    fontSize: 12,
    color: '#888',
  },
  tripAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});

export default DriverEarning;

//   const renderEarningItem = ({item}) => (
//     <View style={styles.earningItem}>
//       <Text style={styles.earningAmount}>₹{item.amount}</Text>
//       <Text style={styles.earningDays}>{item.days} days</Text>
//     </View>
//   );

//   const renderTripItem = ({item}) => (
//     <View style={styles.tripItem}>
//       <View style={styles.tripHeader}>
//         <Icon name="eye" size={20} color="#000" />
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
//     backgroundColor: '#fff',
//   },
//   earningHeader: {
//     alignItems: 'flex-end',
//     paddingRight: 15,
//     paddingTop: 20,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//   },
//   earningHeaderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
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
//                 color: 'black',
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
//       backgroundColor: 'black', // Color of the underline
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
