import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import {Wallet_Icon} from '../assets/images';
import {AppColors} from '../assets/Colors';

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
    type: 'Customer Commission',
    amount: 600,
    date: '28 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul Yadav',
    invoiceValue: 7800,
  },
  {
    type: 'Agent Commission',
    amount: 100,
    date: '29 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Customer Commission',
    amount: 500,
    date: '29 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul ',
    invoiceValue: 4000,
  },
  {
    type: 'Agent Commission',
    amount: 900,
    date: '29 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Customer Commission',
    amount: 880,
    date: '29 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Agent Commission',
    amount: 880,
    date: '29 Jun, 2024',
    paidDate: '26 Jun, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Customer Commission',
    amount: 53,
    date: '17 Jun, 2024',
    paidDate: '19 Jun, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Customer Commission',
    amount: 35,
    date: '23 Apr, 2024',
    paidDate: '25 Apr, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 6000,
  },
  {
    type: 'Agent Commission',
    amount: 110,
    date: '03 Apr, 2024',
    paidDate: '10 Apr, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 1000,
  },
  {
    type: 'Agent Commission',
    amount: 36,
    date: '10 Jan, 2024',
    paidDate: '17 Jan, 2024',
    agentName: 'Rahul Sharma',
    invoiceValue: 3000,
  },
];

const AgentWallet = ({navigation}) => {
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
              {item.type} Added to tat d wallet
            </Text>
            <Text style={styles.tripDate}>
              {item.date} <Text style={styles.paidByText}>Paid ByTatd</Text>
              <Text style={styles.settlementType}></Text> {item.paidDate}
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

      <ScrollView>
        <View
          style={{
            alignItems: 'flex-end',
            paddingRight: '4%',
            paddingTop: '5%',
            paddingBottom: '2%',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: AppColors.black,
            }}>
            My Lifetime Earning ₹0
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: AppColors.black,
              height: 1,
              backgroundColor: 'red',
              width: 110,
              marginTop: 5,
              marginRight: 20,
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Wallet_Icon}
              style={{width: 30, height: 30, marginRight: 8}}
            />
            <Text
              style={{
                alignItems: 'flex-start',

                fontSize: 16,

                color: '#333',
              }}>
              tat d balance
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333',
            }}>
            ₹0
          </Text>
        </View>

        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AgentCommisionAdded', item)}
            key={index.toString()}>
            {renderTripItem({item})}
          </TouchableOpacity>
        ))}
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
    fontFamily: 'Roboto-Regular',
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
});

export default AgentWallet;
