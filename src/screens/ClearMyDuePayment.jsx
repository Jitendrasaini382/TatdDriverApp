import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import ClearMyDuePaymentModal from '../components/modal/ClearMyDuePaymentModal';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AppFont} from '../assets/FontsFamily';
import {
  CLEAR_MY_DUE_VIEW,
  GET_CMD_PACKAGE_DETAIL,
  PAY_CMD_CREATE_ORDER_ID,
} from '../apis/Apis';
import {useSelector} from 'react-redux';

const ClearMyDuePayment = ({navigation}) => {
  const [myDuePaymentModal, setMyDuePaymentModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [allData, setAllData] = useState({});

  useEffect(() => {
    setLoader(true);
    getClearMyDueData();
  }, []);

  const getClearMyDueData = async () => {
    try {
      const response = await CLEAR_MY_DUE_VIEW(languageSwitch);
      console.log('Response received from CLEAR_MY_DUE_VIEW:', response);
      setAllData(response);
    } catch (error) {
      console.error('Error in getClearMyDueData:', error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const getPackageDetails = async id => {
    console.log('getPackageDetails called with id:', id);
    setLoader(true);
  
    try {
      console.log('Fetching package details...');
      const response = await GET_CMD_PACKAGE_DETAIL(id, languageSwitch);
      
      console.log('Response received:', response);
      setMyDuePaymentModal(true);
      setSelectedTrip(response);
    } catch (error) {
      console.error('Error fetching package details:', error);
    } finally {
      console.log('Stopping loader...');
      setLoader(false);
    }
};


  const handlePayment = async amount => {
    try {
      console.log('Function handlePayment started');
      const response = await PAY_CMD_CREATE_ORDER_ID({
        action: 'clear_my_due',
        payment_amount: amount,
      });
      if (response?.status_code == 200) {
        navigation.navigate('RazorPayPaymentScreen', {
          data: response?.razor_order_id_data,
        });
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />

      {loader ? (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1, alignContent: 'center'}}
          color={AppColors.mainColor}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getClearMyDueData();
              }}
            />
          }
          style={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.mainInnerView}>
              <Text style={styles.title}>Clear My Due</Text>
            </View>
            {allData?.all_bookings?.length !== 0 && (
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <View style={[styles.headerCell, styles.borderLeft]}>
                    <Text style={styles.headerText}>Booking Id</Text>
                  </View>
                  <View style={[styles.headerCell, styles.borderLeft]}>
                    <Text style={styles.headerText}>Schedule Date</Text>
                  </View>
                  <View style={[styles.headerCell, styles.borderLeft]}>
                    <Text style={[styles.headerText]}>Status</Text>
                  </View>
                  <View style={[styles.headerCell4, styles.borderLeft]}>
                    <Text style={[styles.headerText]}>Amount</Text>
                  </View>
                </View>

                <View>
                  {allData?.all_bookings &&
                    allData?.all_bookings.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => getPackageDetails(item?.booking_id)}
                        key={index}
                        style={styles.tableRow}>
                        <View style={styles.bookingIdCell}>
                          <Text style={[styles.cellText]}>
                            {item?.booking_id}
                          </Text>
                          <TouchableOpacity
                            onPress={() => getPackageDetails(item?.booking_id)}>
                            <Icon
                              name="eye"
                              size={18}
                              color={AppColors.mainColor}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.bookingIdCell, styles.borderLeft]}>
                          <Text style={[styles.cellText]}>
                            {item?.schedule_date}
                          </Text>
                        </View>
                        <View style={[styles.bookingIdCell, styles.borderLeft]}>
                          <Text style={[styles.cellText]}>{item?.status}</Text>
                        </View>
                        <View
                          style={[styles.bookingIdCell4, styles.borderLeft]}>
                          <Text style={[styles.cellText]}>{item?.amount}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
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
            )}

            {allData?.payment?.message && (
              <TouchableOpacity
                onPress={() => handlePayment(allData?.payment?.payable_amount)}
                style={styles.payButton}>
                <Text style={styles.payButtonText}>
                  {allData?.payment?.message}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.youtubeView}>
            <YoutubePlayer
              height={500}
              videoId={allData?.training_video || ''}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
    padding: 10,
    shadowColor: '#ccc',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainInnerView: {
    alignItems: 'flex-start',
    marginBottom: 15,
    // alignSelf: 'center',
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
  headerCell: {
    flex: 1,
    padding: 8,
  },
  headerCell4: {
    flex: 0.7,
    padding: 8,
  },
  headerText: {
    color: AppColors.white,
    fontWeight: 'bold',
    // flex: 1,
    textAlign: 'center',
    // padding: 8,
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
    padding: 8,
  },
  bookingIdCell4: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
    padding: 8,
  },
  cellText: {
    flex: 1,
    color: AppColors.black,
    textAlign: 'center',
    // padding: 8,
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
