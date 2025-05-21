import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {
  ACCEPT_PERMANENT_SUBSCRIPTION_BOOKING,
  PERMANENT_SUBSCRIPTION_POPUP_DATA_VIEW,
} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  setRefreshKey,
  setTriggerFunction,
} from '../../redux/slices/globalSlice';

const PermanentSubscrptionBookingAcceptPopup = ({setOpenModal, PS_ID}) => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const dispatch = useDispatch();
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [popUpData, setPopUpData] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPopupData(PS_ID);
  }, []);

  const getPopupData = async data => {
    setLoading(true);

    try {
      const response = await PERMANENT_SUBSCRIPTION_POPUP_DATA_VIEW(data);

      setPopUpData(response);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const acceptBooking = async () => {
    setLoader(true);

    try {
      const response = await ACCEPT_PERMANENT_SUBSCRIPTION_BOOKING({
        action: 'accept_booking',
        PS_ID: PS_ID,
        current_language: languageSwitch,
      });

      if (response?.status_code == '200' && response?.status == 'success') {
        Alert.alert('', response?.message, [
          {
            text: 'OK',
            onPress: () => {
              setOpenModal(false);
              dispatch(setTriggerFunction(true));
              dispatch(setRefreshKey());
            },
          },
        ]);
      } else {
        Alert.alert('', response?.message, [
          {
            text: 'OK',
            onPress: () => {
              setOpenModal(false);
              dispatch(setTriggerFunction(true));
              dispatch(setRefreshKey());
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('', error?.message, [
        {
          text: 'OK',
          onPress: () => {
            setOpenModal(false);
            dispatch(setTriggerFunction(true));
            dispatch(setRefreshKey());
          },
        },
      ]);
    } finally {
      setOpenModal(false);
      setLoader(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={AppColors.mainColor} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: AppColors.white,
            borderWidth: 2,
            borderColor: AppColors.mainColor,
            elevation: 2,
            minHeight: 200,
          }}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F1EFF4',
                borderRadius: 10,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedLanguage('Hindi')}
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedLanguage === 'Hindi' ? '#FFFFFF' : 'transparent',
                  paddingVertical: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: AppColors.black,
                  }}>
                  Hindi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedLanguage('English')}
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedLanguage === 'English' ? '#FFFFFF' : 'transparent',
                  paddingVertical: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: AppColors.black,
                  }}>
                  English
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={{color: AppColors.black}}>
              {selectedLanguage === 'English'
                ? popUpData?.content_english
                : popUpData?.content_hindi}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setOpenModal(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => acceptBooking()}
              disabled={loader}
              style={styles.acceptButton}>
              {loader ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.acceptButtonText}>Please Wait...</Text>
                </View>
              ) : (
                <Text style={styles.acceptButtonText}>Accept</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: AppColors.white,
    margin: 5,
    flexGrow: 1,
  },
  header: {
    // backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 15,
    // paddingHorizontal: 20,
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: AppColors.black,
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  closeButton: {
    padding: 10,
    textAlign: 'right',
    fontSize: 25,
    fontFamily: 'Roboto',
    color: AppColors.gray,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: AppColors.black,
    borderRadius: 5,
    marginRight: 10,
    // backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 16,
    color: AppColors.black,
  },
  acceptButton: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    paddingHorizontal: 20,
    backgroundColor: AppColors.mainColor,
    borderRadius: 5,
  },
  acceptButtonText: {
    fontSize: 16,
    color: AppColors.white,
  },
});

export default PermanentSubscrptionBookingAcceptPopup;
