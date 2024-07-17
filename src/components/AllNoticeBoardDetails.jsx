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
      await DRIVER_NOTICE({
        action: 'view_all_notice',
      })
        .then(e => {
          console.log(e.awareness_data, 'Driver Notice Data');
          setNotificationData(e.awareness_data);
        })
        .catch(err => {
          console.log(err, 'Driver Notice err');
        });
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
        noticeBoardData.map((noticeBoard, index) => (
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
              <Text style={styles.subjectText} numberOfLines={2}>
                {noticeBoard.subject}
              </Text>
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

  console.log(noticeId, 'nnnnnnnnnnnnnn');
  console.log(notice, 'noooooooTTice');

  const viewOneAwarness = async () => {
    try {
      const response = await DRIVER_NOTICE({
        action: 'view_one_awareness',
        id: noticeId,
      });
      // console.log(response.awareness, 'viewOneAwarness DATA');
      setNotice(response.awareness);
    } catch (err) {
      console.log(err, 'viewOneAwarness err');
    }
  };
  useEffect(() => {
    console.log('Notice ID:', noticeId);

    viewOneAwarness();
  }, [noticeId]);

  const handleNoticeBoardPress = () => {};

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
    marginTop: 15,
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

// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {OpenEnvelop} from '../assets/images';
// import {useNavigation} from '@react-navigation/native';
// import Header from './Header';
// import {AppColors} from '../assets/Colors';
// import {AppFont} from '../assets/FontsFamily';

// const {width, height} = Dimensions.get('window');
// const designWidth = width;
// const designHeight = height;

// const scale = size => (width / designWidth) * size;
// const verticalScale = size => (height / designHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// const noticeBoardData = [
//   'Necessary changes in night charges....................',
//   'Commission on Overtime and Night Charge',
//   'Important Update: On Daily Incentive...................',
//   'Mohitt Update: On Daily Incentive...................',
// ];
// const showNoticeBoardData = [
//   {
//     texts: [
//       'Necessary changes in night charges. From now on, if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible.',
//       'Night Time 10:00 PM to 06:00 AM',
//     ],
//   },
//   {
//     texts: [
//       'Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.',
//       'You previously earned (without commission):',
//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹150 per ride',
//       'You will now earn (with commission):',
//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹152',
//       'If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.',
//       'Night time: 10:00 PM to 06:00 AM',
//     ],
//   },
//   {
//     texts: [
//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹150 per ride',
//       'You will now earn (with commission):',
//       'Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.',
//       'You previously earned (without commission):',

//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹152',
//       'If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.',
//       'Night time: 10:00 PM to 06:00 AM',
//     ],
//   },
//   {
//     texts: [
//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹150 per ride',
//       'You will now earn (with commission):',
//       '* Earnings from overtime: ₹1.5 per minute',
//       '* Earnings from night driving: ₹152',
//       'If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.',
//       'Night time: 10:00 PM to 06:00 AM',
//       'Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.',
//       'You previously earned (without commission):',
//     ],
//   },
// ];

// const NoticeBoardList = ({onNoticeBoardPress, excludeIndex}) => {
//   return (
//     <ScrollView style={styles.container}>
//       {noticeBoardData.map((noticeBoard, index) => {
//         if (index === excludeIndex) return null;
//         return (
//           <TouchableOpacity
//             key={index}
//             style={styles.touchable}
//             onPress={() => onNoticeBoardPress(index)}>
//             <View style={styles.iconContainer}>
//               <Image
//                 style={styles.icon}
//                 resizeMode="contain"
//                 source={OpenEnvelop}
//               />
//             </View>
//             <View style={styles.textContainer}>
//               <Text style={styles.indexText} numberOfLines={2}>
//                 {noticeBoard}
//               </Text>
//             </View>
//             <View>
//               <Text style={{color: AppColors.black}}>06 Jun 2024</Text>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </ScrollView>
//   );
// };

// const NoticeBoardDetail = ({index}) => {
//   return (
//     <View style={styles.detailContainer}>
//       {showNoticeBoardData[index].texts.map((text, i) => (
//         <Text key={i} style={styles.detailText}>
//           {text}
//         </Text>
//       ))}
//     </View>
//   );
// };

// const AllNoticeBoardComponent = () => {
//   const navigation = useNavigation();

//   const handleNoticeBoardPress = index => {
//     navigation.navigate('NoticeBoardDetail', {index});
//   };

//   return <NoticeBoardList onNoticeBoardPress={handleNoticeBoardPress} />;
// };

// export const NoticeBoardDetailScreen = ({route}) => {
//   const {index: initialIndex} = route.params;
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   const navigation = useNavigation();

//   const handleNoticeBoardPress = index => {
//     setCurrentIndex(index);
//   };

//   return (
//     <SafeAreaView style={styles.fullScreenContainer}>
//       <Header backButton={true} />
//       <ScrollView style={styles.scrollView}>
//         <NoticeBoardDetail index={currentIndex} />
//         <NoticeBoardList
//           onNoticeBoardPress={handleNoticeBoardPress}
//           excludeIndex={currentIndex}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AllNoticeBoardComponent;

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 20,
//     alignItems: 'flex-start',
//   },
//   detailContainer: {
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   detailText: {
//     fontSize: 16,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//     marginBottom: 10,
//   },
//   container: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: AppColors.white,
//   },
//   touchable: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginBottom: 5,
//   },
//   selectedTouchable: {
//     backgroundColor: '#f0f0f0',
//   },
//   iconContainer: {
//     marginRight: 10,
//     paddingTop: 2,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   indexText: {
//     fontSize: 15,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//   },
//   fullScreenContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   detailContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   largeIcon: {
//     width: 60,
//     height: 60,
//     marginBottom: 20,
//   },
//   detailText: {
//     fontSize: 20,
//     fontFamily: AppFont.regularFont,
//     color: AppColors.black,
//     textAlign: 'center',
//     padding: 20,
//   },
// });
