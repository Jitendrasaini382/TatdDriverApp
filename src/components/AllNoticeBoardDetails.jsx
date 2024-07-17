import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {DRIVER_NOTICE} from '../apis/Apis';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const AllNoticeBoardComponent = () => {
  const navigation = useNavigation();
  const [noticeBoardData, setNotificationData] = useState([]);

  const getAllDriverNotice = async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_all_notice',
      });
      // console.log(response.awareness_data, 'Driver Notice Data');
      setNotificationData(response.awareness_data);
    } catch (error) {
      console.log(error, 'Driver Notice error');
    }
  };

  useEffect(() => {
    getAllDriverNotice();
  }, []);

  const handleNoticePress = noticeBoard => {
    navigation.navigate('NoticeBoardDetail', {
      noticeId: noticeBoard.id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {noticeBoardData &&
        noticeBoardData.map(noticeBoard => (
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

export const NoticeBoardDetailScreen = ({route, navigation}) => {
  const {noticeId} = route.params;
  const [notice, setNotice] = useState({});
  const [footerInput, setFooterInput] = useState({
    action: 'view_one_awareness_footer_links',
    id: noticeId,
    bucket: 'Awareness',
  });

  const [recordClick, setRecordClick] = useState({
    action: 'record_view_one_awareness_click',
    id: noticeId,
    subject: '',
  });

  const [awarenessUpdate, setAwarenessUpdate] = useState({
    action: 'view_one_awareness_update_sort_order',
    id: noticeId,
  });

  const [footerData, setFooterData] = useState([]);

  console.log(noticeId, 'nnnnnnnnnnnnnn');
  // console.log(notice, 'noooooooTTice');
  // console.log(footerData, 'footerdatataaaaa');

  const viewOneAwarness = async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_one_awareness',
        id: noticeId,
      });
      console.log(response.awareness.subject, 'viewOneAwarness DATA');
      setNotice(response.awareness);
      setFooterInput(e => ({
        ...e,
        bucket: response.awareness.bucket,
      }));
      setRecordClick(e => ({
        ...e,
        subject: response.awareness.subject,
      }));
    } catch (err) {
      console.log(err, 'viewOneAwarness err');
    }
  };

  const recordViewOneClick = async () => {
    try {
      const response = await DRIVER_NOTICE(recordClick);
      console.log(response.message, 'recordViewOneClick data');
      Alert.alert(response.message);
    } catch (error) {
      // Alert.alert("q")
      console.log(err, ' recordViewOneClick err');
    }
  };

  const viewOneAwarnessUpdate = async () => {
    try {
      const response = await DRIVER_NOTICE(awarenessUpdate);
      console.log(response.message, 'viewOneAwarnessUpdate data');
      Alert.alert(response.message);
    } catch (error) {
      console.log(err, ' viewOneAwarnessUpdate err');
    }
  };

  const viewFooterLinks = async data => {
    try {
      const response = await DRIVER_NOTICE(footerInput);
      // console.log(response.viewed, 'view_one_awareness_footer_links DATA');
      setFooterData(response.viewed);
    } catch (err) {
      console.log(err, 'view_one_awareness_footer_links err');
    }
  };
  useEffect(() => {
    console.log('Notice ID:', noticeId);

    viewOneAwarness();
    viewFooterLinks(noticeId);
  }, [noticeId]);

  const formatDate = dateString => {
    const [datePart, timePart] = dateString.split(' ');

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

    const monthName = months[parseInt(month) - 1];

    return `${parseInt(day)} ${monthName} ${year}`;
  };

  const handleNoticeFooterPress = footerNotice => {
    navigation.navigate('NoticeBoardDetail', {
      noticeId: footerNotice.id,
    });
    recordViewOneClick();
    viewOneAwarnessUpdate();
  };

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

        {footerData &&
          footerData.map(footerNotice => (
            <View
              style={{
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                key={footerNotice.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                }}
                onPress={() => handleNoticeFooterPress(footerNotice)}>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    resizeMode="contain"
                    // source={
                    //   footerNotice.status_image === 'open_envlop.png'
                    //     ? OpenEnvelop
                    //     : CloseEnvelop
                    // }
                    source={OpenEnvelop}
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

export default AllNoticeBoardComponent;

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
