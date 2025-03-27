import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import {useSelector} from 'react-redux';

const LocalseAwarenessPartnerRegistration = ({navigation, route}) => {
  const {localseData} = route?.params || {};
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const handleRegister = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.localsepartner',
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={[styles.bold, {color: 'red'}]}>
              {localseData?.heading_1} -
            </Text>
            {localseData?.heading}
          </Text>
          <Text style={styles.subtitle}>{localseData?.sub_heading}</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_1}{" "}</Text>
            {localseData?.line_1}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_2} –</Text>
            {localseData?.line_2}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_3} –</Text>
            {localseData?.line_3}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_4} –</Text>
            {localseData?.line_4}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_5} –</Text>
            {localseData?.line_5}
          </Text>

          <View style={styles.cta}>
            <TouchableOpacity style={styles.ctaButton} onPress={handleRegister}>
              <Text style={styles.ctaButtonText}>
                {languageSwitch == 'hindi'
                  ? 'अभी रजिस्टर करें'
                  : 'Register Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  cta: {
    alignItems: 'center',
    marginTop: 20,
  },
  ctaButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LocalseAwarenessPartnerRegistration;
