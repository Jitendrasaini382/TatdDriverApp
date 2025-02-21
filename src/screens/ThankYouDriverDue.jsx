import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {ThankuLogo} from '../assets/images';
import Header from '../components/Header';
import {useRoute} from '@react-navigation/native';

const ThankYouDriverDue = ({navigation}) => {
  const route = useRoute();

  const {data} = route?.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TrustedDriver');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={true}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={ThankuLogo} style={styles.logo} />
          </View>
          <Text style={styles.title}>TAT D</Text>
          <Text style={styles.subtitle}>Trusted and Trained Driver</Text>
          <Text style={styles.heading}>Payment Confirmation</Text>
          <Text style={styles.text}>
            {data}
            {/* We received the amount of Rs 43. Payment ID is{' '}
            <Text style={styles.paymentId}>pay_PxulleOHQxf3iG</Text>. {'\n'}
            Booking ID marked as{' '}
            <Text style={styles.status}>SETTLED BY DRIVER.</Text> {'\n'}
            www.tatd.in */}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
  },
  logoContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 40, // To adjust spacing due to absolute positioned logo
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginTop: 5,
  },
  paymentId: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  status: {
    fontWeight: 'bold',
    color: 'green',
  },
});

export default ThankYouDriverDue;
