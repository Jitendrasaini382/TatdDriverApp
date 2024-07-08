import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {Check_Offer} from '../assets/images';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppFont} from '../assets/FontsFamily';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';

const AgentCommisionAdded = ({route}) => {
  const {amount, date, agentName, invoiceValue} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header backButton={true} />
      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amountValue}>
              <Icon name="rupee" size={40} color={AppColors.black} />
              {amount}
            </Text>
            <Image source={Check_Offer} style={styles.checkImage} />
          </View>
          <Text style={styles.commissionText}>
            Automatic 10% Commission Earned
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Your Agent</Text>
          <Text style={styles.detailText}>{date}</Text>
        </View>

        <View>
          <Text style={styles.agentName}>{agentName}</Text>
          <Text style={styles.invoiceValue}>
            Invoice Value {''}
            <Text>
              <Icon name="rupee" size={15} color={AppColors.black} />
              {invoiceValue}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 30,
    backgroundColor: '#ecf0f3',
    padding: 30,
  },
  amountContainer: {
    borderBottomWidth: 1,
  },
  amountLabel: {
    color: '#4f4f4f',
    fontSize: 32,
    fontFamily: AppFont.regularFont,
    marginVertical: 10,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountValue: {
    fontWeight: 'bold',
    fontSize: 42,
    color: AppColors.black,
  },
  checkImage: {
    width: 45,
    height: 45,
    marginLeft: 5,
  },
  commissionText: {
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: '400',
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  detailText: {
    color: AppColors.black,
    fontSize: 20,
    fontFamily: AppFont.regularFont,
  },
  agentName: {
    marginBottom: 20,
    color: AppColors.black,
    fontSize: 30,
    fontFamily: AppFont.regularFont,
  },
  invoiceValue: {
    marginBottom: 20,
    fontSize: 18,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
  },
});

export default AgentCommisionAdded;
