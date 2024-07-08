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

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
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
    duration: '5 Hours',
    mode: 'Cash',
    amount: 1000,
    date: '28 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '17 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '15 Hours',
    mode: 'Cash',
    amount: 800,
    date: '14 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '10 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '1 Hours',
    mode: 'Cash',
    amount: 700,
    date: '71 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '14 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '6 Hours',
    mode: 'Cash',
    amount: 985,
    date: '17 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '66 Jun,2024',
  },
  {
    type: 'Incity Roundtrip',
    duration: '10 Hours',
    mode: 'Cash',
    amount: 985,
    date: '26 Jun,2024',
    settlementType: 'Cash With Driver',
    settlementDate: '44 Jun,2024',
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
  const [packageDetailsDriverEarning, setPackageDetailsDriverEarning] =
    useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const renderTripItem = ({item}) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTrip(item);
            setPackageDetailsDriverEarning(true);
          }}>
          <Icon
            name="eye"
            size={20}
            color={AppColors.mainColor}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
     
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
      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setPackageDetailsDriverEarning(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={packageDetailsDriverEarning}>
        <DriverEarnIngModal
          setPackageDetailsDriverEarning={setPackageDetailsDriverEarning}
          tripDetails={selectedTrip}
        />
      </Modal>
      <View style={styles.earningHeader}>
        <Text style={styles.earningHeaderText}>My tatd Earning ₹215147</Text>
        <View style={styles.underLineView}></View>
      </View>

      <View style={styles.headlineContainer}>
        {[7, 30, 90].map(days => (
          <View key={days} style={styles.headlineContent}>
            <Text style={styles.headlineAmount}>
              <Icon name="rupee" /> 0
            </Text>
            <Text style={styles.headlineDays}>{days} days</Text>
          </View>
        ))}
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
    backgroundColor: AppColors.white,
  },
  earningHeader: {
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingTop: '5%',
    paddingBottom: '2%',
  },
  headlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: '2%',
  },
  headlineContent: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: '1.5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
  },
  headlineAmount: {
    fontWeight: '600',
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.035,
  },
  headlineDays: {
    fontWeight: '600',
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.025,
  },
  earningHeaderText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  underLineView: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.black,
    height: 1,
    width: SCREEN_WIDTH * 0.3,
    marginTop: 5,
    marginRight: 20,
  },
  tripList: {
    flex: 1,
    marginTop: '5%',
  },
  tripItem: {
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginRight: SCREEN_WIDTH * 0.02,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    paddingBottom: '2%',
    borderBottomWidth: 1,
  },
  tripInfo: {
    flex: 1,
  },
  tripType: {
    fontSize: SCREEN_WIDTH * 0.04,
    paddingBottom: 5,
    color: '#000',
  },
  tripDate: {
    fontSize: SCREEN_WIDTH * 0.03,
    color: '#888',
  },
  settlementType: {
    fontWeight: 'bold',
  },
  tripAmount: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#000',
  },
});

export default DriverEarning;

// import React, {useState} from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   Dimensions,
//   SafeAreaView,
//   View,
//   FlatList,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Modal from 'react-native-modal';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import DriverEarnIngModal from '../components/modal/DriverEarnIngModal';

// const {width: SCREEN_WIDTH} = Dimensions.get('window');
// const tripData = [
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '25 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '5 Hours',
//     mode: 'Cash',
//     amount: 1000,
//     date: '28 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '17 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '15 Hours',
//     mode: 'Cash',
//     amount: 800,
//     date: '14 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '10 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '1 Hours',
//     mode: 'Cash',
//     amount: 700,
//     date: '71 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '14 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '6 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '17 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '66 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '44 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '25 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '25 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '25 Jun,2024',
//   },
//   {
//     type: 'Incity Roundtrip',
//     duration: '10 Hours',
//     mode: 'Cash',
//     amount: 985,
//     date: '26 Jun,2024',
//     settlementType: 'Cash With Driver',
//     settlementDate: '25 Jun,2024',
//   },
// ];

// const DriverEarning = ({}) => {
//   const [packageDetailsDriverEarning, setPackageDetailsDriverEarning] =
//     useState(false);

//   const renderTripItem = ({item}) => (
//     <View style={styles.tripItem}>
//       <View style={styles.tripHeader}>
//         <TouchableOpacity onPress={() => setPackageDetailsDriverEarning(true)}>
//           <Icon
//             name="eye"
//             size={20}
//             color={AppColors.mainColor}
//             style={styles.eyeIcon}
//           />
//         </TouchableOpacity>
//         <Modal
//           backdropOpacity={0}
//           onBackdropPress={() => setPackageDetailsDriverEarning(false)}
//           animationIn={'fadeInDown'}
//           animationOut={'fadeOutUp'}
//           isVisible={packageDetailsDriverEarning}>
//           <DriverEarnIngModal
//             setPackageDetailsDriverEarning={setPackageDetailsDriverEarning}
//           />
//         </Modal>

//         <View style={styles.contentContainer}>
//           <View style={styles.tripInfo}>
//             <Text style={styles.tripType}>
//               {item.type} - {item.duration} - {item.mode}
//             </Text>
//             <Text style={styles.tripDate}>
//               {item.date} -{' '}
//               <Text style={styles.settlementType}>{item.settlementType}</Text>{' '}
//               {item.settlementDate}
//             </Text>
//           </View>
//           <Text style={styles.tripAmount}>₹{item.amount}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header backButton={true} />
//       <View style={styles.earningHeader}>
//         <Text style={styles.earningHeaderText}>My tatd Earning ₹215147</Text>
//         <View style={styles.underLineView}></View>
//       </View>

//       {/* headline Content */}
//       <View style={styles.headlineContainer}>
//         <View style={styles.headlineContent}>
//           <Text style={styles.headlineAmount}>
//             <Icon name="rupee" /> 0
//           </Text>
//           <Text style={styles.headlineDays}>7 days</Text>
//         </View>

//         <View style={styles.headlineContent}>
//           <Text style={styles.headlineAmount}>
//             <Icon name="rupee" /> 0
//           </Text>
//           <Text style={styles.headlineDays}>7 days</Text>
//         </View>
//         <View style={styles.headlineContent}>
//           <Text style={styles.headlineAmount}>
//             <Icon name="rupee" /> 0
//           </Text>
//           <Text style={styles.headlineDays}>7 days</Text>
//         </View>
//       </View>

//       {/* all Trip details */}
//       <FlatList
//         data={tripData}
//         renderItem={renderTripItem}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.tripList}
//       />
//     </SafeAreaView>
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
//     // borderBottomWidth: 1,
//     // borderBottomColor: AppColors.black,
//   },
//   headlineContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
//   headlineContent: {
//     backgroundColor: 'red',
//     display: 'flex',
//     flexDirection: 'column',
//     borderRadius: 10,
//     paddingVertical: 6,
//     paddingHorizontal: 40,
//     textAlign: 'center',
//     justifyContent: 'center',
//     margin: 5,
//   },

//   headlineAmount: {
//     fontWeight: '600',
//     textAlign: 'center',
//     color: 'white',
//     fontSize: 13,
//   },
//   headlineDays: {
//     textAlign: 'center',
//     fontWeight: '600',
//     color: 'white',
//     fontSize: 10,
//   },

//   earningHeaderText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: AppColors.black,
//   },
//   underLineView: {
//     borderBottomWidth: 1,
//     borderBottomColor: AppColors.black,
//     height: 1,
//     width: 120,
//     marginTop: 5,
//     marginRight: 20,
//   },

//   earningList: {
//     paddingVertical: 10,
//   },
//   earningItem: {
//     backgroundColor: 'red',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     width: SCREEN_WIDTH * 0.2,
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
//   tripList: {
//     flex: 1,
//     marginTop: 50,
//   },
//   tripItem: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     // marginTop: 10
//     // borderBottomWidth: 1,
//     // borderBottomColor: AppColors.black,
//   },
//   tripHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   eyeIcon: {
//     marginRight: 10,
//   },
//   contentContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//   },
//   tripInfo: {
//     flex: 1,
//   },
//   tripType: {
//     fontSize: 16,
//     // fontWeight: 'bold',
//     paddingBottom: 5,
//     color: '#000',
//   },
//   tripDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   settlementType: {
//     fontWeight: 'bold',
//   },
//   tripAmount: {
//     fontSize: 16,
//     // fontWeight: 'bold',
//     color: '#000',
//   },
// });

// export default DriverEarning;
