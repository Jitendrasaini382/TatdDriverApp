import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from './Header';
import {DRIVER_NOTIFICATION} from '../apis/Apis';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNotificationData,
  setStoredRating,
} from '../redux/slices/globalSlice';
import {RefreshControl} from 'react-native';

const AllNotificationComponent = () => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notificationData = useSelector(e => e?.globalSlice?.notificationData);
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleNotificationPress = useCallback(
    notification => {
      navigation.navigate('NotificationDetail', {
        notificationId: notification.id,
      });
    },
    [navigation],
  );

  const getAllNotification = useCallback(
    async data => {
      setIsLoading(true);
      try {
        const response = await DRIVER_NOTIFICATION(data);
        console.log(
          response.notifications[0],
          'response.notificationsresponse.',
        );

        dispatch(setNotificationData(response.notifications));
      } catch (error) {
        console.error('DRIVER NOTIFICATION error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [notificationData],
  );

  useEffect(() => {
    getAllNotification({
      action: 'view_all_notifications',
    });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // dispatch(setRefreshKey());
      await getAllNotification({
        action: 'view_all_notifications',
      });
    } catch (error) {
      console.log('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="small" color={AppColors.mainColor} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {notificationData &&
        notificationData.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={styles.touchable}
            onPress={() => handleNotificationPress(notification)}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={
                  notification.status === 'unread' ? CloseEnvelop : OpenEnvelop
                }
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={styles.previewText}
                //  numberOfLines={1}
              >
                {notification.message_preview ||
                  notification.message.substring(0, 50) + '...'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export const NotificationDetailScreen = ({route}) => {
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {notificationId} = route.params;
  const [notification, setNotification] = useState({});
  const [loader, setLoader] = useState(false);
  const [bottamButtonText, setBottamButtonText] = useState({});

  const storeRating = useSelector(e => e?.globalSlice?.storeRating);

  const [feedback, setFeedback] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const shouldShowRating = useCallback(() => {
    return (
      notification.headline_type === 'Driver Ticket' &&
      notification.support_id > 0 &&
      currentDateTime < notification.end_date
    );
  }, [notification, currentDateTime]);

  const viewHeadline = useCallback(async () => {
    setLoader(true);
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline',
        id: notificationId,
        current_language: languageSwitch,
      });
      setNotification(response.headline);
      setBottamButtonText(response);
      dispatch(setStoredRating(response.headline.rate));
    } catch (err) {
      console.error('VIEW_HEADLINE error:', err);
    } finally {
      setLoader(false);
    }
  }, [notificationId, storeRating]);

  const saveBookingExperience = useCallback(
    async newRating => {
      try {
        const response = await DRIVER_NOTIFICATION({
          action: 'save_booking_experience',
          headline_id: notificationId,
          rate: newRating,
        });
        Alert.alert('Success', response.message);
        dispatch(setStoredRating(response.rate));
      } catch (error) {
        console.error('saveBookingExperience Error:', error);
        Alert.alert(
          'Error',
          'Failed to save booking experience. Please try again.',
        );
      }
    },
    [notificationId, storeRating],
  );

  useEffect(() => {
    viewHeadline();
  }, [viewHeadline]);

  const handleStarPress = useCallback(
    selectedRating => {
      dispatch(setStoredRating(selectedRating));
      saveBookingExperience(selectedRating);
    },
    [saveBookingExperience, storeRating],
  );

  const saveBookingRemarks = useCallback(async () => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'save_booking_experience_remarks',
        headline_id: notificationId,
        remarks: feedback,
      });
      Alert.alert(response.message);
      setFeedback('');
    } catch (error) {
      console.error('save_booking_experience_remarks Error:', error);
      Alert.alert('Error', 'Failed to save booking remarks. Please try again.');
    }
  }, [notificationId, feedback]);

  const clickStoreHomeNotification = async id => {
    console.log(id, 'clickStoreHomeNotification clickStoreHomeNotification');
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline',
        id: id,
      });
      console.log(response, 'click store');
    } catch (err) {
      console.error('VIEW_HEADLINE error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      {loader ? (
        <ActivityIndicator
          size={'small'}
          style={{
            marginTop: '50%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        !loader &&
        notification && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#0056b3',
                  padding: 16,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {notification?.headline_type}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: 20,
                  width: '100%',
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#e9f6ff',
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 16,
                    borderLeftColor: '#0056b3',
                    borderLeftWidth: 5,
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 18,
                      marginBottom: 20,
                    }}>
                    {notification.message}
                  </Text>
                  {bottamButtonText?.back_btn == '1' ? (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: '#0056b3',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {bottamButtonText?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        clickStoreHomeNotification(
                          bottamButtonText?.headline?.id,
                        )
                      }
                      style={{
                        backgroundColor: '#0056b3',
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {bottamButtonText?.btn_text}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {shouldShowRating() && (
              <>
                <Text style={styles.rateResponseText}>Rate Our Response ?</Text>

                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleStarPress(star)}
                      style={styles.starButton}>
                      <Icon
                        name={star <= storeRating ? 'star' : 'star-o'}
                        size={30}
                        color={AppColors.mainColor}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.extraView}>
                  <View>
                    <View style={styles.feedbackInputContainer}>
                      <TextInput
                        style={styles.inputType}
                        placeholder="Type your feedback here..."
                        value={feedback}
                        onChangeText={setFeedback}
                        placeholderTextColor={AppColors.black}
                        multiline
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.btnView}
                      onPress={saveBookingRemarks}>
                      <Icon
                        size={20}
                        color={AppColors.mainColor}
                        name="paper-plane"
                        style={styles.IconType}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  touchable: {
    flexDirection: 'row',
    // marginHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: AppColors.white,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'flex-start',
  },
  icon: {
    width: 15,
    height: 15,
  },
  textContainer: {
    // flex: 1,
  },
  previewText: {
    fontSize: 15,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // padding: 20,
    margin: 20,
    justifyContent: 'center',
  },

  detailText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  extraView: {
    padding: 20,
    marginVertical: 50,
    marginHorizontal: 5,
    borderRadius: 15,
    paddingBottom: 15,
    backgroundColor: AppColors.gray,
  },
  feedbackInput: {
    padding: 10,
    paddingTop: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputType: {
    fontFamily: AppFont.regularFont,
    alignSelf: 'flex-start',
    color: AppColors.black,
  },
  btnView: {
    alignSelf: 'flex-end',
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  IconType: {
    alignSelf: 'center',
  },
});

export default AllNotificationComponent;
