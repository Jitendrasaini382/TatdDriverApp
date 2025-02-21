import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import {Wallet_Icon} from '../assets/images';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {GET_AGENT_NETWORK_CLICK_DETAILS, GET_AGENT_WALLET} from '../apis/Apis';
import {useRoute} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const data = [
  {
    type: 'Agent Commission',
    amount: 880,
    date: '23 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Surendar Yadav',
    invoiceValue: 8800,
  },
  {
    type: 'Agent Commission',
    amount: 110,
    date: '03 Apr, 2024',
    paidDate: '10 Apr, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 1000,
  },
];

const AgentWallet = ({navigation}) => {
  const route = useRoute();
  console.log(route)
  console.log(route);
  const isFromMyNetwork = route?.params?.from == 'myNetwork';
  const [agentWalletData, setagentWalletData] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (isFromMyNetwork) {
      myNetworkAgentsData();
    } else {
      getAgentWallet();
    }
    setLoader(true);
  }, [navigation]);
  const getAgentWallet = async () => {
    try {
      const res = await GET_AGENT_WALLET();
      console.log(res);

      setagentWalletData({
        ...res,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const myNetworkAgentsData = async () => {
    try {
      const res = await GET_AGENT_NETWORK_CLICK_DETAILS({
        customer_number: route?.params?.customer_number,
      });
      setLoader(false);
      console.log(res);
      setagentWalletData({
        ...res,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const formatDateTime = e => {
    const time = e.split(' ');
    return `${time[0]} ${time[1]} ${time[2]}`;
  };
  const renderTripItem = ({item}) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="plus"
            size={15}
            color={AppColors.mainColor}
            style={styles.PlusIcon}
          />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripType}>
              {item?.commission_layer} {item?.heading}
            </Text>
            <Text style={styles.tripDate}>
              {formatDateTime(item?.datetime)}{' '}
              <Text
                style={{
                  color: AppColors.black,
                  fontWeight: '500',
                }}>
                {item?.payment_status}
              </Text>
              <Text style={styles.settlementType}></Text> {item?.settle_date}
            </Text>
          </View>
          <Text style={styles.tripAmount}>₹{item?.agent_commission}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
      backButton={true}
      />
      <ScrollView>
        <View style={styles.topContent}>
          <Text style={styles.mainHeadingText}>
            My Lifetime Earning ₹{agentWalletData?.my_earning}
          </Text>
          <View style={styles.underlineView}></View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.middleContent}>
            <Image
              source={Wallet_Icon}
              resizeMethod="resize"
              resizeMode="contain"
              style={styles.walletIcon}
            />
            <Text style={styles.balanceHeadingText}>tat d balance</Text>
          </View>
          <Text style={styles.totalBalance}>
            ₹{agentWalletData?.my_balance_earning}
          </Text>
        </View>
        {isFromMyNetwork && (
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: '500',
              marginHorizontal: 10,
              marginVertical:5
            }}>
            {agentWalletData?.heading}
          </Text>
        )}

        {loader ? (
          <ActivityIndicator size={'large'} color={AppColors.mainColor} />
        ) : (
          agentWalletData?.response?.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AgentCommisionAdded', item)}
              key={index.toString()}>
              {renderTripItem({item})}
            </TouchableOpacity>
          ))
        )}

        {/* {console.log(
          agentWalletData,
          'agentWalletDataagentWalletDataagentWalletDataagentWalletData',
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },

  tripItem: {
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  tripHeader: {
    flexDirection: 'row',
  },
  PlusIcon: {
    marginRight: SCREEN_WIDTH * 0.02,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#b1b1b1',
    marginLeft: 10,
    marginTop: 5,
  },
  tripInfo: {
    flex: 1,
  },
  tripType: {
    fontSize: SCREEN_WIDTH * 0.042,
    paddingBottom: 5,
    color: '#000',
    fontFamily: AppFont.regularFont,
  },
  tripDate: {
    fontSize: SCREEN_WIDTH * 0.03,
    color: '#888',
    marginBottom: 5,
  },
  settlementType: {
    fontWeight: 'bold',
  },
  tripAmount: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#000',
  },
  topContent: {
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingTop: '5%',
    paddingBottom: '2%',
  },
  mainHeadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  underlineView: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.black,
    height: 1,
    backgroundColor: AppColors.red,
    width: 160,
    marginTop: 5,
    // marginRight: 20,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  middleContent: {flexDirection: 'row'},
  walletIcon: {width: 32, height: 32, marginRight: 8},
  balanceHeadingText: {
    alignItems: 'flex-start',

    fontSize: 16,

    color: '#333',
  },
  totalBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AgentWallet;
