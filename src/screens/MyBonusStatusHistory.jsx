import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {MY_BONUS_HISTORY} from '../apis/Apis';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RefreshControl} from 'react-native';
import LottieView from 'lottie-react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const MyBonusStatusHistory = () => {
  const insets = useSafeAreaInsets();
  const [bonusData, setBonusData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showButton, setshowButton] = useState(false);
  const [offset, setOffset] = useState(0);
  const [allDataCount, setAllDataCount] = useState(null);

  const getAllBonusData = async (newOffset = 0, isRefresh = false) => {
    if (loader) return; // Prevent multiple simultaneous calls
    // setLoader(true);

    try {
      const response = await MY_BONUS_HISTORY({
        action: 'get_bonus_history',
        offset: newOffset,
        limit: 10,
      });
      setAllDataCount(response?.count_booking);
      setBonusData(
        isRefresh ? response.bonuses : [...bonusData, ...response.bonuses],
      );
      setOffset(newOffset + 10); // Update offset for next batch
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setBonusData([]); // Clear existing data
    setOffset(0); // Reset offset to fetch fresh data
    await getAllBonusData(0, true); // Fetch fresh data with offset 0
  };

  useEffect(() => {
    getAllBonusData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: AppColors.white}}>
      <View
        style={{height: insets.top, backgroundColor: AppColors.mainColor}}
      />
      <SafeAreaView style={{flex: 1}}>
        <Header backButton={true} />

        <View style={styles.content}>
          <View style={styles.container}>
            <Text style={styles.title}>My Bonus</Text>
            {bonusData?.length !== 0 ? (
              <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                  <Text style={[styles.headerCell, styles.createDateCell]}>
                    Create Date
                  </Text>
                  <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
                  <Text style={[styles.headerCell, styles.bonusTypeCell]}>
                    Bonus Type
                  </Text>
                  <Text style={[styles.headerCell, styles.paymentStatusCell]}>
                    Payment Status
                  </Text>
                  <Text style={[styles.headerCell, styles.amountCell]}>
                    Amount
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.noDataCard}>
                <LottieView
                  source={require('../assets/images/emptyScreen.json')}
                  style={{width: 100, height: 100}}
                  autoPlay
                  loop
                />
                <Text style={styles.noDataText}>No Data Found</Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            flex: 1,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            data={bonusData}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              if (bonusData.length < allDataCount) {
                getAllBonusData(offset);
              }
            }}
            onEndReachedThreshold={0.5} // Adjust threshold for better loading behavior
            ListFooterComponent={
              loader ? (
                <ActivityIndicator
                  size="large"
                  color={'red'}
                  style={{alignSelf: 'center'}}
                />
              ) : null
            }
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.dataRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}>
                <Text style={[styles.dataCell, styles.createDateCell]}>
                  {item.create_date}
                </Text>
                <Text style={[styles.dataCell, styles.nameCell]}>
                  {item.name}
                </Text>
                <Text style={[styles.dataCell, styles.bonusTypeCell]}>
                  {item.bonus_type}
                </Text>
                <Text style={[styles.dataCell, styles.paymentStatusCell]}>
                  {item.payment_status}
                </Text>
                <Text style={[styles.dataCell, styles.amountCell]}>
                  {item.amount}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppColors.white,
  },
  container: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 5,
    // shadowColor: AppColors.black,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: AppColors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: AppColors.black,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: AppColors.mainColor,
  },
  headerCell: {
    padding: 10,
    color: AppColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: AppColors.white,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // borderLeftWidth: 1,
    // borderLefttColor: 'red',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: AppColors.white,
  },
  dataCell: {
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    color: AppColors.black,
  },
  createDateCell: {
    flex: 1.2,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  nameCell: {
    flex: 1,
  },
  bonusTypeCell: {
    flex: 1.5,
  },
  paymentStatusCell: {
    flex: 1.2,
  },
  amountCell: {
    flex: 0.8,
  },

  noDataCard: {
    // width: '85%',
    margin: 10,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginTop: 30,
  },
  noDataText: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#4a6ea9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  exploreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: SCREEN_WIDTH * 0.04,
  },
});

export default MyBonusStatusHistory;
