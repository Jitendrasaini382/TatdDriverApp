import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';
import {AppFont} from '../assets/FontsFamily';
import {
  CMD_OVERTIME_COMMISSION_VIEW,
  CMD_OVERTIME_COMMISSION_PACKAGE_DETAIL,
  CMD_OVERTIME_COMMISSION_CREATE_ORDER_ID,
} from '../apis/Apis';
import {useSelector} from 'react-redux';
import ClearMyDuePaymentOvertimeModal from '../components/modal/ClearMyDuePaymentOvertimeModal';
import {useFocusEffect} from '@react-navigation/native';

const ClearMyDuePaymentOvertime = ({navigation}) => {
  const [myDuePaymentModal, setMyDuePaymentModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [allData, setAllData] = useState({});

  useFocusEffect(
    useCallback(() => {
      setLoader(true);
      getClearMyDueData();
    }, []),
  );

  const getClearMyDueData = async () => {
    try {
      const response = await CMD_OVERTIME_COMMISSION_VIEW({
        action: 'clear_my_due_commission_api',
      });
      setAllData(response);
    } catch (error) {
      console.error('Error in getClearMyDueData:', error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const getPackageDetails = async id => {
    setLoader(true);
    try {
      const response = await CMD_OVERTIME_COMMISSION_PACKAGE_DETAIL(
        id,
        languageSwitch,
      );

      setMyDuePaymentModal(true);
      setSelectedTrip(response);
    } catch (error) {
      console.error('Error fetching package details:', error);
    } finally {
      setLoader(false);
    }
  };

  const handlePayment = async amount => {
    try {
      const response = await CMD_OVERTIME_COMMISSION_CREATE_ORDER_ID({
        action: 'commission_create_order_id',
        pay_price: amount,
      });

      if (response?.status_code == 200 && response?.razorpay_order_id) {
        navigation.navigate('RazorPayPaymentScreen', {
          pageType: response?.page_type,
          description: response?.description,
          amount: response?.amount,
          orderId: response?.razorpay_order_id,
        });
      }
    } catch (error) {
      // console.error('Error in handlePayment:', error);
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
            <Text
              style={{
                color: AppColors.red,
                fontSize: 10,
                marginBottom: 20,
              }}>
              {allData?.warning_line}
            </Text>

            <View style={styles.mainInnerView}>
              <Text style={styles.title}>Clear My Due Commission</Text>
            </View>
            {allData?.all_commission_data?.length >= 0 && (
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Booking</Text>
                  <Text style={styles.headerCell}>Date</Text>
                  <Text style={styles.headerCell}>Due</Text>
                  <Text style={styles.headerCell}>Paid</Text>
                  <Text style={styles.headerCell}>Balance</Text>
                </View>

                {allData?.all_commission_data?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => getPackageDetails(item?.booking_number)}
                    style={styles.tableRow}>
                    {/* Booking ID + Eye icon in a column */}
                    <View style={styles.cellColumn}>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 4,
                          color: AppColors.black,
                          fontSize: 13,
                        }}>
                        {item?.booking_number}
                      </Text>
                      <TouchableOpacity
                        onPress={() => getPackageDetails(item?.booking_number)}>
                        <Icon
                          name="eye"
                          size={18}
                          color={AppColors.mainColor}
                          style={styles.eyeIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Other columns */}
                    <Text style={styles.cell}>
                      {new Date(item?.booking_date).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text style={styles.cell}>{item?.final_commission}</Text>
                    <Text style={styles.cell}>{item?.payment_amount}</Text>
                    <Text
                      style={[
                        styles.cell,
                        index == 4 && {borderRightWidth: 0},
                      ]}>
                      {item?.new_payment_amount}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Modal
                  backdropOpacity={0.5}
                  onBackdropPress={() => setMyDuePaymentModal(false)}
                  animationIn={'fadeInDown'}
                  animationOut={'fadeOutUp'}
                  isVisible={myDuePaymentModal}>
                  <ClearMyDuePaymentOvertimeModal
                    setMyDuePaymentModal={setMyDuePaymentModal}
                    tripDetails={selectedTrip}
                  />
                </Modal>
              </View>
            )}

            {allData?.pay_now && (
              <TouchableOpacity
                onPress={() => handlePayment(allData?.total)}
                style={styles.payButton}>
                <Text style={styles.payButtonText}>{allData?.pay_now}</Text>
              </TouchableOpacity>
            )}

            {allData?.content_data && (
              <Text style={styles.contentDataText}>
                {allData?.content_data}
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contentContainer: {
    marginTop: 20,
    padding: 10,
  },
  container: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainInnerView: {
    marginBottom: 15,
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
    marginTop: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: AppColors.mainColor,
  },

  headerCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: 13,
    borderRightWidth: 1,
    borderColor: AppColors.gray,
  },

  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  cellColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: AppColors.gray,
  },

  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: AppColors.gray,
    color: AppColors.black,
    fontSize: 13,
  },

  eyeIcon: {
    marginTop: 4,
  },

  payButton: {
    backgroundColor: AppColors.mainColor,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  payButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentDataText: {
    fontSize: 14,
    color: AppColors.black,
    marginTop: 15,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
});

export default ClearMyDuePaymentOvertime;
