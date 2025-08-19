import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AppColors} from '../assets/Colors';
import YoutubePlayer from 'react-native-youtube-iframe';

const LocalseAwarenessPartnerRegistration = ({navigation, route}) => {
  const {localseData} = route?.params || {};
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  if (!localseData) {
    return null;
  }

  const handleRegister = () => {
    Linking.openURL(
      localseData?.applink ||
        'https://play.google.com/store/apps/details?id=com.localse',
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrustedDriver')}
          style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'red',
            }}>
            LocalSe
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              margin: 5,
              marginRight: 17,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              borderColor: 'rgb(204,204,204)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Text style={{color: AppColors.black, margin: 5, opacity: 0.8}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={[styles.bold, {color: 'red'}]}>
              {localseData?.heading_1} -
            </Text>
            {localseData?.heading}
          </Text>
          <Text style={styles.subtitle}>{localseData?.sub_heading}</Text>
          {localseData?.videoData && localseData?.videoData?.length > 0 && (
            <View style={{marginVertical: 1}}>
              {localseData?.videoData?.map((videoId, index) => (
                <View key={index} style={{marginVertical: 5}}>
                  <YoutubePlayer height={200} videoId={videoId} />
                </View>
              ))}
            </View>
          )}

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>{localseData?.heading_1} </Text>
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
    color: AppColors.silverGrey,
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
