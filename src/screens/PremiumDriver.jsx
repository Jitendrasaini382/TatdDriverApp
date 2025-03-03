import React, {useEffect, useState} from 'react';
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
import {
  APPLY_DRIVER_AVAILABLE_TEN_MINUTES,
  PREMIUM_DRIVER_APPLY,
} from '../apis/Apis';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AppColors} from '../assets/Colors';

const PremiumDriver = ({route, navigation}) => {
  //   const {data} = route?.params || null;
  const [playing, setPlaying] = useState(true);
  const [data, setData] = useState({});

  const [loader, setLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    setLoader(true);

    getAllPremiumData();
  }, []);

  const applyForPremiumDriver = async () => {
    if (!data) {
      return false;
    } else {
      navigation.navigate('PremiumDriverRegistration', {data: data});
    }
  };

  const getAllPremiumData = async () => {
    console.log('Function getAllPremiumData called');
    setLoader(true);
    console.log('Loader set to true');

    try {
      console.log('Calling PREMIUM_DRIVER_APPLY API...');
      const response = await PREMIUM_DRIVER_APPLY({
        action: 'premium-diver-apply',
        current_language: languageSwitch,
      });

      console.log('API Response:', response);
      setData(response);

      if (response?.status_code == 200) {
        // console.log('Response status is 200');
        // console.log('Success message:', response?.message);
        // Alert.alert('Success', response?.message);
        // navigation.navigate('TrustedDriver');
      } else {
        console.log(
          'API call was not successful, status_code:',
          response?.status_code,
        );
      }
    } catch (error) {
      console.error('Error in getAllPremiumData:', error);
    } finally {
      console.log('Setting loader to false');
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
                <Text style={styles.mainHeading}>Premium Drivers</Text>
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
              // videoId={
              //   selectedLanguage === 'English'
              //     ? data?.english_video_code
              //     : data?.hindi_video_code
              // }
              videoId={data?.video_src}
              onChangeState={state => {
                if (state === 'ended') {
                  setPlaying(false);
                }
              }}
            />
          </View>

          {/* Display Content Based on Selection */}
          <View style={{marginBottom: 10}}>
            <View style={styles.contentContainer}>
              {selectedLanguage === 'Hindi' ? (
                <>
                  <Text style={styles.contentText}>{data?.line_hindi_1}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_2}</Text>
                  <View
                    style={{
                      borderWidth: 0.5,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderColor: AppColors.greyColor,
                      marginVertical: 5,
                    }}
                  />
                  <Text style={styles.contentText}>{data?.line_hindi_3}</Text>
                  <Text
                    style={[
                      styles.contentText,
                      {fontWeight: 'bold', marginVertical: 10},
                    ]}>
                    {data?.line_hindi_4}
                  </Text>
                  <Text style={styles.contentText}>{data?.line_hindi_5}</Text>
                  <View
                    style={{
                      borderWidth: 0.5,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderColor: AppColors.greyColor,
                      marginVertical: 5,
                    }}
                  />
                  <Text style={styles.contentText}>{data?.line_hindi_6}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_7}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_8}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_9}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_10}</Text>
                  <Text
                    style={[
                      styles.contentText,
                      {fontWeight: 'bold', marginVertical: 10},
                    ]}>
                    {data?.line_hindi_11}
                  </Text>
                  <Text style={styles.contentText}>{data?.line_hindi_12}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_13}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_14}</Text>
                  <Text style={styles.contentText}>{data?.line_hindi_15}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.contentText}>{data?.line_english_1}</Text>
                  <Text style={styles.contentText}>{data?.line_english_2}</Text>
                  <View
                    style={{
                      borderWidth: 0.5,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderColor: AppColors.greyColor,
                      marginVertical: 5,
                    }}
                  />
                  <Text style={styles.contentText}>{data?.line_english_3}</Text>
                  <Text
                    style={[
                      styles.contentText,
                      {fontWeight: 'bold', marginVertical: 10},
                    ]}>
                    {data?.line_english_4}
                  </Text>
                  <Text style={styles.contentText}>{data?.line_english_5}</Text>
                  <View
                    style={{
                      borderWidth: 0.5,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderColor: AppColors.greyColor,
                      marginVertical: 5,
                    }}
                  />
                  <Text style={styles.contentText}>{data?.line_english_6}</Text>
                  <Text style={styles.contentText}>{data?.line_english_7}</Text>
                  <Text style={styles.contentText}>{data?.line_english_8}</Text>
                  <Text style={styles.contentText}>{data?.line_english_9}</Text>
                  <Text style={styles.contentText}>
                    {data?.line_english_10}
                  </Text>
                  <Text
                    style={[
                      styles.contentText,
                      {fontWeight: 'bold', marginVertical: 10},
                    ]}>
                    {data?.line_english_11}
                  </Text>
                  <Text style={styles.contentText}>
                    {data?.line_english_12}
                  </Text>
                  <Text style={styles.contentText}>
                    {data?.line_english_13}
                  </Text>
                  <Text style={styles.contentText}>
                    {data?.line_english_14}
                  </Text>
                  <Text style={styles.contentText}>
                    {data?.line_english_15}
                  </Text>
                </>
              )}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                paddingHorizontal: '10%',
              }}>
              <TouchableOpacity
                onPress={() => applyForPremiumDriver()}
                disabled={loader}
                style={{
                  flex: 1,
                  backgroundColor: AppColors.mainColor,
                  paddingVertical: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginHorizontal: 5,
                }}>
                <Text style={{color: AppColors.white, fontSize: 18}}>
                  {data?.premium_registration_text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PremiumDriver;

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
    color: AppColors.black,
    alignSelf: 'flex-start',
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
