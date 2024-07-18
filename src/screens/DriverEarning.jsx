import React, {useCallback, useEffect, useState} from 'react';
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
import {DRIVER_EARNING} from '../apis/Apis';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const DriverEarning = () => {
  const [packageDetailsDriverEarning, setPackageDetailsDriverEarning] =
    useState(false);
  const [lifeTimeEarn, setLifeTimeEarn] = useState('');
  const [earnData, setEarnData] = useState({});
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBookingNumber, setSelectedBookingNumber] = useState(null);

  const getEarningData = async () => {
    try {
      const response = await DRIVER_EARNING({
        action: 'fetch_life_time_earning',
      });
      setLifeTimeEarn(response.lifetime_earning);
      setEarnData(response.commission_data);
    } catch (err) {
      console.log(err, 'Earning err');
    }
  };

  const viewAllEarning = async () => {
    try {
      const response = await DRIVER_EARNING({
        action: 'view_all_earnings',
      });
      // setBookingsData(response.bookings);
    } catch (error) {
      console.log(error, ' View All Earning error');
    }
  };

  useEffect(() => {
    getEarningData();
    viewAllEarning();
  }, []);

  const handleEyeIconPress = useCallback(booking_number => {
    setSelectedBookingNumber(booking_number);
    setPackageDetailsDriverEarning(true);
  }, []);

  const renderTripItem = ({item}) => (
    <TouchableOpacity
      style={styles.tripItem}
      onPress={() => handleEyeIconPress(item.booking_number)}>
      <View style={styles.tripHeader}>
        <Icon
          name="eye"
          size={20}
          color={AppColors.mainColor}
          style={styles.eyeIcon}
        />
  
        <View style={styles.contentContainer}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripType}>
              {item.package_detail} - {item.payment_mode}
            </Text>
            <Text style={styles.tripDate}>
              {item.booking_date} -{' '}
              <Text style={styles.settlementType}>{item.payment_status}</Text>{' '}
              {item.settle_date}
            </Text>
          </View>
          <Text style={styles.tripAmount}>₹{item.revised_supply_cost}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
          bookingNumber={selectedBookingNumber}
        />
      </Modal>
      <View style={styles.earningHeader}>
        <View style={styles.EarnMAinView}>
          <Text style={styles.earningHeaderText}>
            My tatd Earning ₹ {lifeTimeEarn}
          </Text>
        </View>
      </View>

      <View style={styles.headlineContainer}>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> {earnData.earning_7days}
          </Text>
          <Text style={styles.headlineDays}>7 days</Text>
        </View>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> {earnData.earning_15days}
          </Text>
          <Text style={styles.headlineDays}>15 days</Text>
        </View>
        <View style={styles.headlineContent}>
          <Text style={styles.headlineAmount}>
            <Icon name="rupee" /> {earnData.earning_30days}
          </Text>
          <Text style={styles.headlineDays}>30 days</Text>
        </View>
      </View>

      <FlatList
        data={bookingsData}
        renderItem={renderTripItem}
        keyExtractor={item => item.booking_number}
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
  EarnMAinView: {
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
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
    color: AppColors.white,
    fontSize: SCREEN_WIDTH * 0.035,
  },
  headlineDays: {
    fontWeight: '600',
    color: AppColors.white,
    fontSize: SCREEN_WIDTH * 0.025,
  },
  earningHeaderText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: 'bold',
    color: AppColors.black,
    paddingBottom: 5,
  },
  underLineView: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.black,
    height: 1,
    width: SCREEN_WIDTH * 0.35,
    marginTop: 5,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
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
