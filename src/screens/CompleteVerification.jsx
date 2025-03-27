import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {LeftArrow, Triangle_Icon} from '../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useCallback, useEffect, useState} from 'react';
import {DRIVER_REFRENCE_LIST, DRIVER_REFRENCE_VERIFIED_OTP} from '../apis/Apis';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;
const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const CompleteVerification = ({navigation}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [otpList, setOtpList] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);

  const [refrenceList, setRefrenceList] = useState([]);
  const [allData, setAllData] = useState({});

  useFocusEffect(
    useCallback(() => {
      if (languageSwitch == 'hindi') {
        setSelectedLanguage('Hindi');
      } else {
        setSelectedLanguage('English');
      }
      setLoader(true);
      getDriverRefrenceList();
    }, []),
  );

  const getDriverRefrenceList = async () => {
    try {
      const response = await DRIVER_REFRENCE_LIST({
        action: 'reference-verification-list',
      });
      if (response?.status_code == 200) {
        setAllData(response);
        setRefrenceList(response?.driver_data);
      }
    } catch (error) {
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  const handleOtpSubmit = async item => {
    const otp = otpList[item.id];
    console.log(item, otp, 'item & otp');
    Keyboard.dismiss();

    if (!otp) {
      Alert.alert('', 'Please Enter OTP');
      return;
    } else if (otp.length !== 4) {
      Alert.alert('', 'Please enter a 4-digit OTP');
      return;
    }
    Keyboard.dismiss();
    try {
      const response = await DRIVER_REFRENCE_VERIFIED_OTP({
        action: 'reference-verification-otp-verified',
        id: item?.id,
        otp: otp,
      });

      if (
        response?.status_code == 200 &&
        response?.message_success == 'success'
      ) {
        if (response?.redirect == 'trusted_driver') {
          navigation.navigate('TrustedDriver');
        } else {
          getDriverRefrenceList();
        }
      } else {
        Alert.alert('', response?.alert_message);
        getDriverRefrenceList();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      {loader ? (
        <ActivityIndicator
          size={20}
          color={AppColors.mainColor}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await getDriverRefrenceList();
                setRefreshing(false);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 12}}>
          <View style={styles.mainTopView}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.mainTopContent}>
                <Text style={styles.trustedText}>Trusted & Trained Driver</Text>
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={Triangle_Icon}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </View>
            </View>
            <Text style={styles.mainHeading}>
              Driver Refrence Verification List
            </Text>
          </View>

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
          {/* Address */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{allData?.address} </Text>
          </View>

          {/* Add Verifier Button */}
          <View style={styles.connectContainer}>
            <Pressable
              onPress={() => navigation.navigate('AddNewVerifier')}
              style={styles.connectButton}>
              <Icon
                color={AppColors.white}
                size={18}
                name="plus"
                style={styles.buttonIcon}
              />
              <Image style={styles.rightArrow} source={LeftArrow} />
            </Pressable>
            <Text style={styles.instructionText}>
              {selectedLanguage == 'Hindi'
                ? allData?.alert_message_hindi
                : allData?.alert_message_english}
            </Text>
          </View>

          {/* YouTube Video */}
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={250}
              videoId={
                selectedLanguage == 'Hindi'
                  ? allData?.hindi_vedio
                  : allData?.english_vedio
              }
            />
          </View>

          {/* FlatList for Contact Cards */}

          <FlatList
            keyboardShouldPersistTaps="always"
            data={refrenceList}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item, index}) => {
              const status = item?.status === 'Verified';
              const bgColor = status
                ? AppColors.mainColor
                : AppColors.greyColor;
              const textColor = status ? AppColors.white : AppColors.black;

              return (
                <View
                  style={{
                    backgroundColor: bgColor,
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 14,
                        marginVertical: 2,
                        fontWeight: '500',
                      }}>
                      Name - {item?.verifier_name}
                    </Text>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 14,
                        marginVertical: 2,
                        fontWeight: '500',
                      }}>
                      Number - {item?.verifier_number}
                    </Text>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 14,
                        marginVertical: 2,
                        fontWeight: '500',
                      }}>
                      Relation - {item?.relationship_with_verifier}
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    {status ? (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 6,
                            borderWidth: 2,
                            paddingHorizontal: 20,
                            borderColor: '#FFFFFF',
                            borderRadius: 10,
                            backgroundColor: '#25568D',
                          }}>
                          <Icon name="check" size={24} color="#FFFFFF" />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            marginTop: 8,
                          }}>
                          <Text
                            style={{
                              color: textColor,
                              marginRight: 6,
                              fontSize: 14,
                              fontWeight: '500',
                            }}>
                            Verified
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8,
                          }}>
                          <TextInput
                            placeholder={
                              selectedLanguage === 'Hindi'
                                ? 'OTP भरें'
                                : 'Enter Otp'
                            }
                            keyboardType="number-pad"
                            placeholderTextColor="#555"
                            value={otpList[item.id] || ''}
                            onChangeText={text =>
                              setOtpList(prev => ({
                                ...prev,
                                [item.id]: text,
                              }))
                            }
                            style={{
                              borderWidth: 1,
                              borderColor: '#aaa',
                              paddingVertical: 3,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                              fontSize: 13,
                              minWidth: 80,
                              marginRight: 6,
                              backgroundColor: '#f9f9f9',
                              color: '#333',
                            }}
                          />

                          <Pressable
                            style={{
                              backgroundColor: AppColors.mainColor,
                              paddingVertical: 6,
                              paddingHorizontal: 12,
                              borderRadius: 5,
                            }}
                            onPress={() => handleOtpSubmit(item)}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 13,
                                fontWeight: '600',
                              }}>
                              {selectedLanguage == 'English'
                                ? 'Submit'
                                : 'जमा करें'}
                            </Text>
                          </Pressable>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              );
            }}
            ListFooterComponent={<View style={{height: 20}} />}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trustedText: {
    position: 'absolute',
    color: AppColors.mainColor,
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
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    marginTop: 20,
  },
  mainTopContent: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    backgroundColor: AppColors.white,
  },
  mainHeading: {
    fontSize: 26,
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    //marginHorizontal: 20,
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
  addressContainer: {
    backgroundColor: '#d9e9f6',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: AppColors.black,
  },
  connectContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: AppColors.mainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: width * 0.2,
  },
  rightArrow: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  instructionText: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 13,
    color: AppColors.black,
    fontWeight: '600',
  },
  videoContainer: {
    marginTop: 15,
  },
});

export default CompleteVerification;
