import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
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
        <Text style={styles.earningHeaderText}>My tatd Earning ₹15147</Text>
        <View style={styles.underLineView}></View>
      </View>

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
          <Text style={styles.headlineDays}>30 days</Text>
        </View>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> 0
          </Text>
          <Text style={styles.headlineDays}>90 days</Text>
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
