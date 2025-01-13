import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Modal from 'react-native-modal';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import DriverEarningModal from '../components/modal/DriverEarnIngModal';
import {DRIVER_EARNING} from '../apis/Apis';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DriverEarning = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lifeTimeEarn, setLifeTimeEarn] = useState('');
  const [earnData, setEarnData] = useState({});
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBookingNumber, setSelectedBookingNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEarningData = useCallback(async () => {
    try {
      const response = await DRIVER_EARNING({
        action: 'fetch_life_time_earning',
      });
      setLifeTimeEarn(response.lifetime_earning);
      setEarnData(response.commission_data);
    } catch (err) {
      console.error('Error fetching earning data:', err);
    }
  }, []);

  const fetchAllEarnings = useCallback(async () => {
    try {
      const response = await DRIVER_EARNING({
        action: 'view_all_earnings',
      });
      console.log(response.bookings, ' : fetching all earnings ');
      setBookingsData(response.bookings);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching all earnings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchEarningData();
  //   fetchAllEarnings();
  // }, [fetchEarningData, fetchAllEarnings]);

  useEffect(() => {
    setIsLoading(true);
    fetchEarningData();
    fetchAllEarnings();
  }, []);

  const handleEyeIconPress = useCallback(bookingNumber => {
    setSelectedBookingNumber(bookingNumber);
    setIsModalVisible(true);
  }, []);

  const renderTripItem = useCallback(
    ({item}) => (
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
                {item.package_detail} - {item.booking_number} -{' '}
                {item.payment_mode}
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
    ),
    [handleEyeIconPress],
  );

  const renderEarningHeadline = useCallback(
    ({amount, days}) => (
      <View style={styles.headlineContent}>
        <Text style={styles.headlineAmount}>
          <Icon name="rupee" /> {amount}
        </Text>
        <Text style={styles.headlineDays}>{days} days</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      {/* <Modal
        backdropOpacity={0}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={isModalVisible}>
        <DriverEarningModal
          setIsModalVisible={setIsModalVisible}
          bookingNumber={selectedBookingNumber}
        />
      </Modal> */}

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
        visible={isModalVisible}>
        <DriverEarningModal
          setIsModalVisible={setIsModalVisible}
          bookingNumber={selectedBookingNumber}
        />
      </Modal>

      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, alignContent: 'center'}}
          size={'small'}
          color={AppColors.mainColor}
        />
      ) : (
        <>
          <View style={styles.earningHeader}>
            <View style={styles.EarnMAinView}>
              <Text style={styles.earningHeaderText}>
                My Total Earning ₹ {lifeTimeEarn}
              </Text>
            </View>
          </View>

          <View style={styles.headlineContainer}>
            {renderEarningHeadline({amount: earnData.earning_7days, days: 7})}
            {renderEarningHeadline({amount: earnData.earning_15days, days: 15})}
            {renderEarningHeadline({amount: earnData.earning_30days, days: 30})}
          </View>

          <FlatList
            data={bookingsData}
            renderItem={renderTripItem}
            keyExtractor={item => item.booking_number}
            style={styles.tripList}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default DriverEarning;

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
    backgroundColor: AppColors.red,
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
    fontSize: SCREEN_WIDTH * 0.038,
    paddingBottom: 5,
    color: '#000',
  },
  tripDate: {
    fontSize: SCREEN_WIDTH * 0.035,
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
