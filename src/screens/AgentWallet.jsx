import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Wallet_Icon} from '../assets/images';
import CommissionList from '../components/modal/Eeeeeeeeee';

const AgentWallet = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />

      <View>
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
            width: 110,
            marginTop: 5,
            marginRight: 20,
          }}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftContent}>
         
          <Image
            source={Wallet_Icon}
            style={{width: 20, height: 20, marginRight: 8}}
          />
          <Text style={styles.balanceText}>tat d balance</Text>
        </View>
        <Text style={styles.amountText}>₹0</Text>
      </View>

          <CommissionList/>

      </View>
    </SafeAreaView>
  );
};

export default AgentWallet;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: 'white',
    // borderRadius: 8,
    // marginHorizontal: 16,
    // marginVertical: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  leftContent: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  balanceText: {
    // marginLeft: 8,
    alignItems: "flex-start",
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
