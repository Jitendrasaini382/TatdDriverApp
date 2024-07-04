// import { View, Text } from 'react-native'
// import React from 'react'

// const MyLeadsDataList = () => {
//   return (
//     <View>
//       <Text>MyLeadsDataList</Text>
//     </View>
//   )
// }

// export default 



import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Linking} from 'react-native';
import {AppColors} from '../assets/Colors';

const DATA = [
 
  {phone: '900000000', date: '02 Jan 2024 09:06 AM', amount: '28 Rs'},
  {phone: '901966369', date: '03 Oct 2023 14:52 PM', amount: '67 Rs'},
  {phone: '968992293', date: '17 Jun 2024 17:34 PM', amount: '143 Rs'},
  {phone: '9717253684', date: '04 Aug 2023 15:51 PM', amount: '255 Rs'},
];

const ListItem = ({phone, date, amount}) => (
  <View style={styles.itemContainer}>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.phoneText}>{phone}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.amountText}>{amount}</Text>
      <TouchableOpacity onPress={openWhatsApp}>
        <Icon color={'#34a728'} name="whatsapp" />
      </TouchableOpacity>
    </View>
  </View>
);

('whatsapp://send?phone=+123456789&text=Hello');

const openWhatsApp = () => {
  // let url = 'whatsapp://send?text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
  let url = 'whatsapp://send?phone=+919810360792&text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
  Linking.openURL(url)
    .then(data => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      console.log('Make sure WhatsApp is installed on your device');
    });
};

const MyLeadsDataList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <ListItem {...item} />}
        keyExtractor={item => item.phone}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
    padding: 10,

    borderWidth: 2,
    marginTop: 30,
    borderColor: AppColors.mainColor,
    borderRadius: 8,
    // margin: 2,
  },
  listContent: {
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 15,
    color: '#878787',
    fontWeight: 'bold',
    marginHorizontal: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#a5a5a5',
    marginHorizontal: 8,
  },
  amountText: {
    fontSize: 14,
    color: '#a5a5a5',
    marginRight: 15,
  },
});

export default MyLeadsDataList;
