import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import {AppColors} from '../assets/Colors';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  changeStaticLanguage,
  changeDynamicLanguage,
} from '../utils/permissions';

const {width} = Dimensions.get('window');

const LocalseAwarenessAgentRegistration = ({navigation, route}) => {
  const {localseData, data} = route?.params || {};
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [language, setLanguage] = useState('en');

  if (!localseData || !data) return null;

  const handleRegister = () => {
    Linking.openURL(
      localseData?.applink ||
        'https://play.google.com/store/apps/details?id=com.localse',
    );
  };

  const handleLanguageChange = selectedLanguage => {
    setIsDropdownVisible(false);
    setLanguage(selectedLanguage.value);
  };

  const languageOptions = [
    {value: 'en', label: 'English', letter: 'a'},
    {value: 'hi', label: 'हिंदी', letter: 'अ'},
    {value: 'te', label: 'తెలుగు', letter: 'తే'},
    {value: 'bn', label: 'বাংলা', letter: 'অ'},
    {value: 'ta', label: 'தமிழ்', letter: 'அ'},
    {value: 'ml', label: 'മലയാളം', letter: 'മ'},
    {value: 'mr', label: 'मराठी', letter: 'अ'},
    {value: 'ur', label: 'اردو', letter: 'ا'},
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrustedDriver')}
          style={styles.logoRow}>
          <Text style={styles.logoText}>LocalSe</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsDropdownVisible(true)}>
            <Icon name="language" size={25} color={AppColors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              margin: 5,
              // marginRight: 17,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              borderColor: 'rgb(204,204,204)',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: AppColors.black, margin: 5, opacity: 0.8}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={[styles.bold, {color: 'red'}]}>LocalSe -</Text>
            {changeDynamicLanguage(data?.heading, 'heading', language)}
          </Text>
          {data?.content?.map((item, key) => {
            return (
              <Text style={styles.subtitle}>
                {changeDynamicLanguage(item, 'content', language)}
              </Text>
            );
          })}

          {Array.isArray(data?.videoData) && data?.videoData?.length > 0 && (
            <View style={{marginVertical: 20}}>
              {data?.videoData?.map((id, index) =>
                id ? (
                  <YoutubePlayer
                    key={index}
                    height={200}
                    videoId={changeDynamicLanguage(id, 'url', language)}
                  />
                ) : null,
              )}
            </View>
          )}

          <View style={styles.cta}>
            <TouchableOpacity style={styles.ctaButton} onPress={handleRegister}>
              <Text style={styles.ctaButtonText}>
                {changeDynamicLanguage(data?.bottomBtn, 'btn', language)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent
          visible={isDropdownVisible}
          onRequestClose={() => setIsDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <Pressable
              style={styles.dismissArea}
              onPress={() => setIsDropdownVisible(false)}
            />
            <View style={styles.bottomSheet}>
              <View style={styles.indicator} />
              <Text style={styles.bottomSheetTitle}>
                {changeStaticLanguage(
                  {
                    en: 'Select your language',
                    hi: 'अपनी भाषा चुनें',
                    bn: 'আপনার ভাষা নির্বাচন করুন',
                    ta: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
                    te: 'మీ భాషను ఎంచుకోండి',
                    mr: 'आपली भाषा निवडा',
                    ml: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
                    ur: 'اپنی زبان منتخب کریں',
                  },
                  language,
                )}
              </Text>

              <View style={styles.languageGrid}>
                {languageOptions.map(lang => (
                  <TouchableOpacity
                    key={lang.value}
                    style={[
                      styles.languageItem,
                      language === lang.value && styles.selectedLanguage,
                    ]}
                    onPress={() => handleLanguageChange(lang)}>
                    <Text
                      style={[
                        styles.languageLetter,
                        language === lang.value &&
                          styles.selectedLanguageLetter,
                      ]}>
                      {lang.letter}
                    </Text>
                    <Text
                      style={[
                        styles.languageText,
                        language === lang.value && styles.selectedLanguageText,
                      ]}>
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logoRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  backButton: {
    margin: 5,
    marginRight: 17,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: 'rgb(204,204,204)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: AppColors.black,
    margin: 5,
    opacity: 0.8,
  },
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    // textAlign: 'center',
    color: AppColors.black,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
    fontWeight: 'bold',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: 'rgb(121, 94, 99)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginVertical: 10,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    color: 'white',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  languageItem: {
    width: width * 0.22,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedLanguage: {
    backgroundColor: '#ff0066',
  },
  languageLetter: {
    fontSize: 36,
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  selectedLanguageLetter: {
    color: '#ffffff',
  },
  languageText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
});

export default LocalseAwarenessAgentRegistration;
