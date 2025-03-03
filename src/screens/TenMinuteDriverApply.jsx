import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Triangle_Icon} from '../assets/images';
import Header from '../components/Header';
import {APPLY_DRIVER_AVAILABLE_TEN_MINUTES} from '../apis/Apis';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AppColors} from '../assets/Colors';

const TenMinuteDriverApply = ({route, navigation}) => {
  const {data} = route?.params || null;
  const [playing, setPlaying] = useState(true);
  const [loader, setLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const applyForTenMinute = async () => {
    setLoader(true);
    try {
      const response = await APPLY_DRIVER_AVAILABLE_TEN_MINUTES({
        action: 'insert_applications',
        current_language: languageSwitch,
      });
      if (response?.status_code == 200) {
        Alert.alert('Success', response?.message);
        navigation.navigate('TrustedDriver');
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.mainView}>
              <View style={styles.mainTopView}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.mainTopContent}>
                    <Text style={styles.trustedText}>
                      Trusted & Trained Driver
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Image
                      source={Triangle_Icon}
                      resizeMode={'cover'}
                      style={styles.icon}
                    />
                  </View>
                </View>
                <Text style={styles.mainHeading}>Drivers in 10 Minutes</Text>
              </View>
            </View>
          </View>

          {/* Toggle Button */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedLanguage === 'Hindi' && styles.selectedButton,
              ]}
              onPress={() => setSelectedLanguage('Hindi')}>
              <Text
                style={[
                  styles.text,
                  selectedLanguage === 'Hindi' && styles.selectedText,
                ]}>
                Hindi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                selectedLanguage === 'English' && styles.selectedButton,
              ]}
              onPress={() => setSelectedLanguage('English')}>
              <Text
                style={[
                  styles.text,
                  selectedLanguage === 'English' && styles.selectedText,
                ]}>
                English
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{margin: 10}}>
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={
                selectedLanguage === 'English'
                  ? data?.english_video_code
                  : data?.hindi_video_code
              }
              onChangeState={state => {
                if (state === 'ended') {
                  setPlaying(false);
                }
              }}
            />
          </View>

          {/* Display Content Based on Selection */}
          <View style={{marginBottom: 50, height: '100%'}}>
            <View style={styles.contentContainer}>
              {selectedLanguage === 'Hindi' ? (
                <Text style={styles.contentText}>
                  {data?.ten_minute_apply_content_hindi}
                </Text>
              ) : (
                <Text style={styles.contentText}>
                  {data?.ten_minute_apply_content_english}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flex: 1,
                  backgroundColor: AppColors.black,
                  paddingVertical: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginHorizontal: '5%',
                }}>
                <Text style={{color: AppColors.white, fontSize: 16}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => applyForTenMinute()}
                disabled={loader}
                // onPress={() => Alert.alert('apply for 10 minute')}
                style={{
                  flex: 1,
                  backgroundColor: AppColors.mainColor,
                  paddingVertical: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginHorizontal: 5,
                }}>
                <Text style={{color: AppColors.white, fontSize: 16}}>
                  {loader ? 'Please Wait...' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenMinuteDriverApply;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    marginHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedButton: {
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  contentText: {
    fontSize: 16,
  },
  //////
  trustedText: {
    position: 'absolute',
    color: '#16588e',
    marginLeft: 15,
    fontFamily: 'Roboto',
  },
  iconContainer: {
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },

  scrollViewContent: {
    backgroundColor: 'white',
  },
  mainContainer: {
    backgroundColor: 'white',
    marginVertical: 1,
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  mainView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#16588e',
    width: '100%',
  },
  mainTopView: {
    backgroundColor: '#16588e',
    borderRadius: 8,
    //marginBottom: 12,
  },
  mainTopContent: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    backgroundColor: 'white',
  },
  mainHeading: {
    fontSize: 28,
    marginTop: 30,
    paddingBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: 'white',
    fontFamily: 'Roboto-Black',
  },
});
