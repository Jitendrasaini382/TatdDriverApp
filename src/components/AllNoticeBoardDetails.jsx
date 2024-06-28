import {
  
    View,
    Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import { OpenEnvelop } from '../assets/images';
import Header from './Header';

// const AllNoticeBoardDetails = () => {
//   return (
//     <View style={{
//         padding: 10,
//         margin: 10,
//         backgroundColor: 'white',
//     }} >
    //   <View>
    //     <Text style={{ fontSize: 20, color: AppColors.black}}>जरूरी जानकारी।</Text>
    //   </View>
//       <View>

//       </View>
//     </View>
//   );
// };

// export default AllNoticeBoardDetails;

// const styles = StyleSheet.create({});

const noticeBoardData = [
  "Necessary changes in night charges....................", "Commission on Overtime and Night Charge","Important Update: On Daily Incentive...................", "Mohitt Update: On Daily Incentive..................."
  ];

const showNoticeBoardData = [
  {
    texts: [
      "Necessary changes in night charges. From now on, if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible.",
      "Night Time 10:00 PM to 06:00 AM"
    ],
  },
  {
    texts: [
      "Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.","You previously earned (without commission):","* Earnings from overtime: ₹1.5 per minute",
      "* Earnings from night driving: ₹150 per ride",
      "You will now earn (with commission):","* Earnings from overtime: ₹1.5 per minute","* Earnings from night driving: ₹152", "If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.","Night time: 10:00 PM to 06:00 AM"
    ],
  },
  {
    texts: [
      "Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.","You previously earned (without commission):","* Earnings from overtime: ₹1.5 per minute",
      "* Earnings from night driving: ₹150 per ride",
      "You will now earn (with commission):","* Earnings from overtime: ₹1.5 per minute","* Earnings from night driving: ₹152", "If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.","Night time: 10:00 PM to 06:00 AM"
    ],
  },
  {
    texts: [
      "Please note that starting from June 26, 2024, a commission will be applied to night charges and overtime. You will not incur any losses due to this change, as customers will be charged Rs 2 per minute for overtime instead of Rs 1.5 and Rs 200 for night charges instead of Rs 150.","You previously earned (without commission):","* Earnings from overtime: ₹1.5 per minute",
      "* Earnings from night driving: ₹150 per ride",
      "You will now earn (with commission):","* Earnings from overtime: ₹1.5 per minute","* Earnings from night driving: ₹152", "If you drive for 50 minutes or more at night, a Rs 200 night charge will be added to the bill. If the driving time is less than 50 minutes, a night charge of Rs 4 per minute will be added to the bill.","Night time: 10:00 PM to 06:00 AM"
    ],
  },
];

const NoticeBoardList = ({onNoticeBoardPress}) => {
  return (
    <View style={styles.container}>
         <View style={{marginBottom:15}} >
        <Text style={{ fontSize: 20, color: AppColors.black}}>जरूरी जानकारी।</Text>
      </View>
      {noticeBoardData.map((noticeBoard, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchable}
          onPress={() => onNoticeBoardPress(index)}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={OpenEnvelop}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.indexText} numberOfLines={2}>
              {noticeBoard}
            </Text>
          </View>
          <View>
            <Text style={{color: "black"}} >06 Jun 2024 </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const NoticeBoardDetail = ({index}) => {
  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {showNoticeBoardData[index].texts.map((text, i) => (
          <Text key={i} style={styles.detailText}>
            {text}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const AllNoticeBoardDetails = () => {
  const [selectedNoticeBoard, setSelectedNoticeBoard] = useState(null);
  const navigation = useNavigation();

  const handleNoticeBoardPress = index => {
    setSelectedNoticeBoard(index);
    navigation.navigate('NoticeBoardDetail', {index});
  };

  return <NoticeBoardList onNoticeBoardPress={handleNoticeBoardPress} />;
};

export const NoticeBoardDetailScreen = ({route}) => {
  const {index} = route.params;
  return <NoticeBoardDetail index={index} />;
};

export default AllNoticeBoardDetails;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'flex-start', 
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    marginBottom: 10,
  },

  container: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
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
  indexText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailContainer: {
    padding: 20,
    alignItems: 'center',
  },
  largeIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    textAlign: 'center',
    padding: 20,
  },
});
