import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {RightArrow} from '../assets/images';
import {AppColors} from '../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setMyBookingModal} from '../redux/slices/trustedDriverSlice';
import {MY_BOOKING_TOP_NAVBAR} from '../apis/Apis';
import {useNavigation} from '@react-navigation/native';
import {Skeleton} from '@rneui/themed';

const MyBookingModal = ({}) => {
  const navigation = useNavigation();
  const [myBookingStyle, setMyBookingStyle] = useState(true);
  const dispatch = useDispatch();
  const [myBookingData, setMyBookingData] = useState({});

  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  useEffect(() => {
    getMyAllBookings();
  }, [languageSwitch]);

  const openMyUrl = url => {
    console.log(url, 'open url');

    Linking.openURL(url);
  };

  const [loader, setLoader] = useState(false);
  const getMyAllBookings = () => {
    setLoader(true);
    MY_BOOKING_TOP_NAVBAR({
      action: 'my_booking',
      current_language: languageSwitch,
    })
      .then(e => {
        console.log(e.bookings, 'MY_BOOKING_TOP_NAVBAR data');
        setMyBookingData(e);
      })
      .catch(err => {
        console.log(err, 'MY_BOOKING_TOP_NAVBAR erroraaaaaaaaa');
      })
      .finally(e => {
        setLoader(false);
      });
  };

  const myBookingModal = useSelector(
    state => state.trustedDriverSlice.myBookingModal,
  );

  const handleSubmit = booking => {
    console.log(booking, 'handleSubmit Booking');
    dispatch(setMyBookingModal(false));
    if (booking?.bg === 'red') {
      navigation.navigate('DutyReportUpdate', {
        bookingNumber: booking?.booking_id,
        state: 'cancel',
        // tripStatus: '',
      });
    } else {
      // navigation.navigate("DueAmount",{bookingNumber:booking?.booking_id})
      // return false
      navigation.navigate('DutyReportUpdate', {
        bookingNumber: booking?.booking_id,
        state: '',
        // tripStatus: '0',
      });
    }
  };

  return (
    <Modal transparent visible={myBookingModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => dispatch(setMyBookingModal(false))}
        style={{flex: 1, position: 'relative'}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => dispatch(setMyBookingModal(false))}>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>x</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setMyBookingStyle(true)}>
              <View
                style={[styles.tabItem, myBookingStyle && styles.activeTab]}>
                <Text
                  style={[
                    styles.tabText,
                    myBookingStyle && styles.activeTabText,
                  ]}>
                  {myBookingData.mybooking_txt}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMyBookingStyle(false)}>
              <View
                style={[styles.tabItem, !myBookingStyle && styles.activeTab]}>
                <Text
                  style={[
                    styles.tabText,
                    !myBookingStyle && styles.activeTabText,
                  ]}>
                  {myBookingData.due_txt}
                  {myBookingData.total}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {loader && (
            <FlatList
              data={[{}, {}, {}]}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Skeleton
                      width={220}
                      height={40}
                      style={{
                        borderRadius: 10,
                        // backgroundColor: AppColors.white,
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        padding: 10,
                        marginVertical: 5,
                        marginHorizontal: 5,
                        // justifyContent: 'space-between',
                      }}
                      animation={'wave'}
                    />
                  </>
                );
              }}
            />
          )}

          {myBookingStyle && !loader ? (
            <>
              <View style={styles.bookingContainer}>
                {
                  myBookingData.bookings && myBookingData.bookings.length > 0
                    ? myBookingData.bookings.map((booking, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleSubmit(booking)}
                          // onPress={() => navigation.navigate('DutyReportUpdateScreen')}

                          // onPress={() => openMyUrl(booking.url)}
                        >
                          <View
                            style={[
                              styles.bookingCard,
                              {backgroundColor: booking.bg},
                            ]}>
                            <Text
                              style={[
                                styles.bookingText,
                                {color: booking.color},
                              ]}>
                              {booking.booking_id} - {booking.booking_date}
                              {/* 999 */}
                            </Text>
                            <Image
                              resizeMode="center"
                              style={styles.arrowIcon}
                              source={RightArrow}
                            />
                          </View>
                        </TouchableOpacity>
                      ))
                    : null
                  // <Text>No bookings available</Text>
                }
              </View>
            </>
          ) : (
            !loader && (
              <>
                <View style={styles.bookingContainer}>
                  {
                    myBookingData.clear_my_due_bookings &&
                    myBookingData.clear_my_due_bookings.length > 0
                      ? myBookingData.clear_my_due_bookings.map(
                          (booking, index) => (
                            <Pressable
                              key={index}
                              onPress={() =>
                                navigation.navigate('DutyReportUpdate', {
                                  bookingNumber: booking.booking_id,
                                  state: '',
                                })
                              }>
                              <View
                                style={[
                                  styles.bookingCard,
                                  styles.activeBookingCard,
                                ]}>
                                <Text
                                  style={[
                                    styles.bookingText,
                                    styles.activeBookingText,
                                    {fontWeight: '700'},
                                  ]}>
                                  {booking.booking_id}
                                </Text>
                                <Text
                                  style={[
                                    styles.bookingText,
                                    styles.activeBookingText,
                                    {fontWeight: '700'},
                                  ]}>
                                  {'        '}+ {booking.amount}
                                </Text>
                                <Image
                                  resizeMode="center"
                                  style={styles.arrowIcon}
                                  source={RightArrow}
                                />
                              </View>
                            </Pressable>
                          ),
                        )
                      : null
                    // <Text>No bookings available</Text>
                  }

                  <Pressable
                    // onPress={() =>
                    //   openMyUrl(
                    // `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                    //   )
                    // }

                    onPress={() =>
                      navigation.navigate('CommanWebview', {
                        url: `https://www.tatd.in/clear-my-due-payment.php?mobile_number=${decodedToken?.driver_mobile_number}&action_from=trusted-driver&msg=from_trusted`,
                      })
                    }>
                    <View
                      style={[styles.bookingCard, styles.activeBookingCard]}>
                      <Text
                        style={[styles.bookingText, styles.activeBookingText]}>
                        {myBookingData.clear_my_due_txt}
                      </Text>
                      <Image
                        resizeMode="center"
                        style={styles.arrowIcon}
                        source={RightArrow}
                      />
                    </View>
                  </Pressable>
                </View>
              </>
            )
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    // zIndex: 1000,
    backgroundColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
    width: 250,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    backgroundColor: AppColors.mainColor,
    alignSelf: 'flex-end',
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabItem: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: AppColors.mainColor,
  },
  tabText: {
    color: AppColors.black,
    paddingBottom: 3,
  },
  activeTabText: {
    color: AppColors.mainColor,
  },
  closeButtonText: {
    color: AppColors.white,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    color: AppColors.black,
    marginRight: 15,
    alignSelf: 'center',
    fontSize: 16,
    paddingBottom: 3,
  },
  dueAmountText: {
    color: AppColors.black,
    fontSize: 16,
  },
  bookingContainer: {
    padding: 5,
  },
  bookingCard: {
    borderRadius: 10,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  activeBookingCard: {
    backgroundColor: AppColors.white,
  },
  bookingText: {
    color: AppColors.mainColor,
  },
  activeBookingText: {
    color: AppColors.mainColor,
    fontSize: 15,
    fontWeight: '600',
  },
  arrowIcon: {
    height: 20,
    width: 20,
  },
});

export default MyBookingModal;
