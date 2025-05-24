import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {
  ACCEPT_PERMANENT_BOOKING,
  APPLY_PERMANENT_BOOKING,
} from '../../apis/Apis';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setRefreshKey,
  setTriggerFunction,
} from '../../redux/slices/globalSlice';
import {requestLocationPermission} from '../../utils/permissions';
import Geolocation from '@react-native-community/geolocation';
import IntentLauncher from '@yz1311/react-native-intent-launcher';

const PermanentBookingAcceptModal = ({setOpenModal, data}) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const {
    condition_1,
    condition_2,
    condition_3,
    condition_4,
    condition_5,
    warning,
  } = data?.conditions;

  const {cancel, apply_or_accept, P_ID} = data?.actions;

  const handleAccept = (id, name) => {
    setLoader(true);
    if (name == 'Accept') {
      handleAcceptPermanentBooking(id);
    } else if (name == 'Apply') {
      handleApplyPermanentBooking(id);
    }
  };

  const handleApplyPermanentBooking = async id => {
    try {
      const payload = {
        action: 'send_permanent_application',
        P_ID: id,
      };
      const response = await APPLY_PERMANENT_BOOKING(payload);
      if (response?.status_code == 200) {
        Alert.alert('', response?.message, [{text: 'OK'}]);
        dispatch(setTriggerFunction(true));
        setOpenModal(false);
      }
    } catch (error) {
      setOpenModal(false);
    } finally {
      setOpenModal(false);
      setLoader(false);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          error => {
            if (error.code === 1) {
              requestLocationPermission();
            } else if (error.code === 2) {
              Alert.alert(
                'Location Service Disabled',
                'Please enable location services to proceed.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Open Setting',
                    onPress: () => {
                      IntentLauncher.startActivity({
                        action: 'android.settings.LOCATION_SOURCE_SETTINGS',
                      });
                    },
                  },
                ],
              );
            } else {
              reject(new Error('Error fetching location: ' + error.message));
            }
          },
          {
            maximumAge: 0,
          },
        );
      });
    } else {
    }
  };

  const handleAcceptPermanentBooking = async id => {
    const location = await getLocation();
    if (location) {
      setLoader(true);
      try {
        const response = await ACCEPT_PERMANENT_BOOKING({
          action: 'permanent_instant_driver_assignment_to_customer',
          P_ID: id,
          latitude: location?.latitude || '',
          longitude: location?.longitude || '',
        });
        if (
          response?.status_code == 200 &&
          response?.message == 'Booking is accepted'
        ) {
          const bookingNumber = response?.booking_id;
          navigation.navigate('DutyReportUpdate', {
            bookingNumber: bookingNumber,
            isFirstTime: true,
            isType: 'Ondemand',
          });
          setOpenModal(false);
          dispatch(setRefreshKey());
        } else {
          Alert.alert(
            '',
            languageSwitch === 'english'
              ? 'This booking already accepted by another driver.'
              : 'यह बुकिंग पहले ही किसी अन्य ड्राइवर द्वारा स्वीकार की जा चुकी है।',
            [
              {
                text: 'OK',
                onPress: () => {
                  setOpenModal(false);
                  dispatch(setRefreshKey());
                  setLoader(false);
                },
              },
            ],
          );
          setOpenModal(false);
          dispatch(setRefreshKey());
        }
      } catch (error) {
        if (error == 'Booking is not in pending status') {
          Alert.alert(
            '',
            languageSwitch === 'english'
              ? 'This booking already accepted by another driver..'
              : 'यह बुकिंग पहले ही किसी अन्य ड्राइवर द्वारा स्वीकार की जा चुकी है।',
            [
              {
                text: 'OK',
                onPress: () => {
                  setOpenModal(false);
                  dispatch(setTriggerFunction(true));
                  setLoader(false);
                },
              },
            ],
          );
        }
        setOpenModal(false);
        dispatch(setTriggerFunction(true));
      } finally {
        setLoader(false);
      }
    } else {
      Alert.alert(
        'Location Error',
        'Unable to retrieve location. Please try again.',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.card}>
        <Text style={styles.header}>{data?.instructions}</Text>

        <Text style={styles.subHeader}>
          यह एक Private नौकरी है, {data?.job_content}
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>1. {condition_1}</Text>
          <Text style={styles.listItem}>2. {condition_2}</Text>
          <Text style={styles.listItem}>3. {condition_3}</Text>
          <Text style={styles.listItem}>4. {condition_4}</Text>
          <Text style={styles.listItem}>5. {condition_5}</Text>
          <Text style={styles.warning}>6. {warning}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setOpenModal(false)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{cancel}</Text>
          </Pressable>
          <Pressable
            disabled={loader}
            onPress={() => {
              handleAccept(P_ID, apply_or_accept);
            }}
            style={[
              styles.applyButton,
              {
                backgroundColor: loader
                  ? AppColors.greyColor
                  : AppColors.mainColor,
              },
            ]}>
            <Text style={styles.applyButtonText}>
              {apply_or_accept}
              {loader ? <ActivityIndicator size={'small'} /> : null}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: AppColors.black,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: AppColors.black,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    fontSize: 18,
    color: AppColors.black,
  },
  warning: {
    color: AppColors.red,
    fontWeight: '600',
    marginBottom: 15,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '35%',
    alignItems: 'center',
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // width: '35%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelButtonText: {
    color: AppColors.black,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: AppFont.regularFont,
  },
  applyButtonText: {
    color: AppColors.white,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: AppFont.regularFont,
  },
});

export default PermanentBookingAcceptModal;
