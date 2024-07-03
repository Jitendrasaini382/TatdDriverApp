import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library you prefer
import { Linking } from 'react-native';

const openWhatsApp = () => {
  let url = 'whatsapp://send?text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
  Linking.openURL(url)
    .then((data) => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      console.log('Make sure WhatsApp is installed on your device');
    });
};

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openWhatsApp}>
        <Icon name="whatsapp" size={50} color="#25D366" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
