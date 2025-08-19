import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {DRIVER_NOTIFICATION} from '../apis/Apis';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {useDispatch, useSelector} from 'react-redux';
import {setStoredRating} from '../redux/slices/globalSlice';

const AllNotificationComponent = ({data}) => {
  const navigation = useNavigation();
  const [notificationData, setNotificationData] = useState([]);
  const storeRating = useSelector(e => e?.globalSlice?.rating);
  const dispatch = useDispatch();
  const [showButton, setshowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const handleNotificationPress = useCallback(
    notification => {
      navigation.navigate('NotificationDetail', {
        notificationId: notification.id,
      });
    },
    [navigation],
  );

  const getAllNotification = async data => {
    setIsLoading(true);
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_all_notifications',
        offset: offset + data,
        limit: 10,
      });

      if (response?.load_more_flag == '1') {
        setshowButton(true);
      } else {
        setshowButton(false);
      }
      setOffset(prevOffset => prevOffset + data);
      setNotificationData(prevNotifications => [
        ...prevNotifications,
        ...response.notifications,
      ]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNotification(storeRating);
    dispatch(setStoredRating(10));
  }, [storeRating]);

  if (isLoading) {
    return (
      <View style={{alignContent: 'flex-end', justifyContent: 'flex-end'}}>
        <ActivityIndicator size="small" color={AppColors.mainColor} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={notificationData}
        keyExtractor={item => item?.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleNotificationPress(item)}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={item?.status === 'unread' ? CloseEnvelop : OpenEnvelop}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.previewText}>
                {item?.message_preview ||
                  item?.message.substring(0, 50) + '...'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {showButton ? (
        <View style={{marginVertical: 10, alignSelf: 'center'}}>
          <Button title="Load More " onPress={() => getAllNotification(10)} />
        </View>
      ) : null}
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
    } catch (err) {
    } finally {
      setLoader(false);
    }
  }, [notificationId]);

  useEffect(() => {
    viewHeadline();
  }, [viewHeadline]);

  const clickStoreHomeNotification = async id => {
    try {
      const response = await DRIVER_NOTIFICATION({
        action: 'view_headline',
        id: id,
      });
    } catch (err) {}
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
                    {notification?.message}
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
                        {bottamButtonText?.btn_text || 'Back'}
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
  textContainer: {},
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
