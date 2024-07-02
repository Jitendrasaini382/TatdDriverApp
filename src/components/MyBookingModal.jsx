import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {RightArrow} from '../assets/images';
import {AppColors} from '../assets/Colors';

const MyBookingModal = ({setMyBookingModal}) => {
  const [myBookingStyle, setMyBookingStyle] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=> setMyBookingModal(false)}
      >
        <View style={styles.closeButtonContainer}>
          <Text style={styles.closeButtonText}>x</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setMyBookingStyle(true)}>
          <View style={[styles.tabItem, myBookingStyle && styles.activeTab]}>
            <Text
              style={[styles.tabText, myBookingStyle && styles.activeTabText]}>
              My Booking
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMyBookingStyle(false)}>
          <View style={[styles.tabItem, !myBookingStyle && styles.activeTab]}>
            <Text
              style={[styles.tabText, !myBookingStyle && styles.activeTabText]}>
              My Due{' '}
              <Icon
                name="rupee"
                color={myBookingStyle ? AppColors.black : AppColors.mainColor}
              />{' '}
              0
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {myBookingStyle ? (
        <>
          <View style={styles.bookingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DutyReportUpdateProcess')}>
              <View style={styles.bookingCard}>
                <Text style={styles.bookingText}>
                  432791 - 08 Jul, 17:45 PM
                </Text>
                <Image
                  resizeMode="center"
                  style={styles.arrowIcon}
                  source={RightArrow}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bookingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DutyReportUpdateCancel')}>
              <View style={[styles.bookingCard, styles.activeBookingCard]}>
                <Text style={[styles.bookingText, styles.activeBookingText]}>
                  430664 - 26 Jun, 10:30 AM
                </Text>
                <Image
                  resizeMode="center"
                  style={styles.arrowIcon}
                  source={RightArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.bookingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ClearMyDuePayment')}>
              <View style={[styles.bookingCard, styles.activeBookingCard]}>
                <Text style={[styles.bookingText, styles.activeBookingText]}>
                  clear My Due
                </Text>
                <Image
                  resizeMode="center"
                  style={styles.arrowIcon}
                  source={RightArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: '#f0f0f0',
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
    zIndex: 1000,
    backgroundColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
    width: 250,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#16588e',
    alignSelf: 'flex-end',
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#16588e',
  },
  tabText: {
    color: 'black',
    paddingBottom: 3,
  },
  activeTabText: {
    color: '#16588e',
  },
  closeButtonText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    color: 'black',
    marginRight: 15,
    alignSelf: 'center',
    fontSize: 16,
    paddingBottom: 3,
  },
  dueAmountText: {
    color: 'black',
    fontSize: 16,
  },
  bookingContainer: {
    padding: 5,
  },
  bookingCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  activeBookingCard: {
    backgroundColor: '#16588e',
  },
  bookingText: {
    color: '#16588e',
  },
  activeBookingText: {
    color: 'white',
  },
  arrowIcon: {
    height: 20,
    width: 20,
  },
});


export default MyBookingModal;

