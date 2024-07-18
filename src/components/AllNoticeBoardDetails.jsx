import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Header from './Header';
import {AppColors} from '../assets/Colors';
import {DRIVER_NOTICE} from '../apis/Apis';
import {AppFont} from '../assets/FontsFamily';

const AllNoticeBoardComponent = () => {
  const navigation = useNavigation();
  const [noticeBoardData, setNoticeBoardData] = useState([]);

  const getAllDriverNotice = useCallback(async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_all_notice',
      });
      setNoticeBoardData(response.awareness_data);
    } catch (error) {
      console.error('Driver Notice error:', error);
      Alert.alert('Error', 'Failed to fetch notices. Please try again.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllDriverNotice();
    }, [getAllDriverNotice]),
  );

  const handleNoticePress = useCallback(
    noticeBoard => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: noticeBoard.id,
      });
    },
    [navigation],
  );

  return (
    <ScrollView style={styles.container}>
      {noticeBoardData.map(noticeBoard => (
        <TouchableOpacity
          key={noticeBoard.id}
          style={styles.touchable}
          onPress={() => handleNoticePress(noticeBoard)}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={
                noticeBoard.status_image === 'open_envlop.png'
                  ? OpenEnvelop
                  : CloseEnvelop
              }
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subjectText}>{noticeBoard.subject}</Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={{color: AppColors.black}}>
              {noticeBoard.timestamp}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const NoticeBoardDetailScreen = ({route}) => {
  const {noticeId} = route.params;
  const [notice, setNotice] = useState({});
  const [footerData, setFooterData] = useState([]);
  const navigation = useNavigation();

  const fetchNoticeData = useCallback(async () => {
    try {
      const [noticeResponse, footerResponse] = await Promise.all([
        DRIVER_NOTICE({action: 'view_one_awareness', id: noticeId}),
        DRIVER_NOTICE({
          action: 'view_one_awareness_footer_links',
          id: noticeId,
          bucket: 'Awareness',
        }),
      ]);

      setNotice(noticeResponse.awareness);
      setFooterData(footerResponse.viewed);

      await Promise.all([
        DRIVER_NOTICE({
          action: 'record_view_one_awareness_click',
          id: noticeId,
          subject: noticeResponse.awareness.subject,
        }),
        DRIVER_NOTICE({
          action: 'view_one_awareness_update_sort_order',
          id: noticeId,
        }),
      ]);
    } catch (error) {
      console.error('Error fetching notice data:', error);
      Alert.alert('Error', 'Failed to load notice details. Please try again.');
    }
  }, [noticeId]);

  useFocusEffect(
    useCallback(() => {
      fetchNoticeData();
    }, [fetchNoticeData]),
  );

  const formatDate = useCallback(dateString => {
    const [datePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }, []);

  const handleNoticeFooterPress = useCallback(
    footerNotice => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: footerNotice.id,
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView style={styles.scrollView}>
        {notice && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailSubject}>{notice.subject}</Text>
            <Text style={styles.detailDescription}>{notice.description}</Text>
          </View>
        )}
        {footerData.map(footerNotice => (
          <View key={footerNotice.id} style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              style={styles.footerNoticeItem}
              onPress={() => handleNoticeFooterPress(footerNotice)}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={CloseEnvelop}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.subjectText}>{footerNotice.subject}</Text>
              </View>
              <View style={{alignSelf: 'flex-end'}}>
                <Text style={{color: AppColors.black}}>
                  {formatDate(footerNotice.timestamp)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flex: 1,
  },

  detailContainer: {
    marginBottom: 15,
    padding: 20,
  },
  detailSubject: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailDescription: {
    color: AppColors.black,
    fontSize: 15,
    paddingTop: 15,
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },
  detailText: {
    fontSize: 16,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
    marginBottom: 10,
  },
  container: {
    padding: 10,
    // margin: 10,
    backgroundColor: AppColors.white,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
  },
  selectedTouchable: {
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    marginRight: 10,
    paddingTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  footerNoticeItem: {
    flexDirection: 'row',
    margin: 5,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  subjectText: {
    color: AppColors.black,
    fontSize: 15,
  },
  indexText: {
    fontSize: 15,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
  },

  largeIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    fontFamily: AppFont.regularFont,
    color: AppColors.black,
    textAlign: 'center',
    padding: 20,
  },
});

export default AllNoticeBoardComponent;
