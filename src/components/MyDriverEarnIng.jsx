import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import Modal from 'react-native-modal';


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

// const [packageDetailsDriverEarning, setPackageDetailsDriverEarning] =  useState(false);

const MyDriverEarning = ({}) => {
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
        //  onPress={() => setPackageDetailsDriverEarning(true)}
        >
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
    <>
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
    </>
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

export default MyDriverEarning;
