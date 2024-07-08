import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {OpenEnvelop} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {AppColors} from '../assets/Colors';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const notificationData = [
  'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्र...',
  "Important Job Interview Alert! Dear MOHIT DHANAWAT, Please Reach The Customer's House On Time And Upon Meet...",
  'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
];

const showNotificationData = [
  {
    texts: [
      'Dear MOHIT DHANAWAT, आप 207 मिनट लेट पहुंचे है। इसका दुष्प्रभाव सीधा आपकी रेटिंग्स पर पड़ा है, जिसकी वजह से आगे चलकर आपको कंपनी से काम मिलने मैं परेशानी हो सकती है ।',
      'समय का पालन करें और अपने रेटिंग बरक़रार रखते हुए ज्यादा से ज्यादा कमाए ।',
      'कृप्या अपनी और कस्टमर की सेफ्टी के लिए मास्क ज़रुर लगाए और गाड़ी को सैनिटीज़ करे।',
      'www.tatd.in',
    ],
  },
  {
    texts: [
      'Important Job Interview Alert!',
      "Dear MOHIT DHANAWAT, please reach the customer's house on time and upon meeting the customer, take the OTP and press the start button. Doing so will increase the customer's trust in you and will increase the chances of you getting the job.",
      'Remember, it is mandatory to take the OTP and press the start button as soon as you meet the customer. Failing to do this will result in the company rejecting you, and you will not be sent for any job henceforth.',
      'Do not forget to press the End button after the interview is over.',
      'Interview Time - 10:00 AM ,26 Jun 2024',
      'Have a good day. Thank you.',
      'www.tatd.in',
    ],
  },
  {
    texts: [
      'MOHIT DHANAWAT जी, हमे सभी सवालों का जवाब मिल गया है कृपया नीचे दी गयी जानकारी को सही से पढ़ें। ।',
      '1- बुकिंग उठाने के बाद उस बुकिंग पर न जाने पर Service पार्टनर का अकाउंट 5 से 21 दिन तक के लिए Inactive हो जाता है और इस बीच Service पार्टनर को किसी भी प्रकार का काम कंपनी नहीं दे पाती।',
      '2- बुकिंग पूरी होने पर कस्टमर से फीडबैक लिया जाता है, फीडबैक ख़राब मिलने पर Service पार्टनर की ID कुछ दिनों के लिए बंद कर दी जाती है। कृपया कस्टमर को बेहतर services प्रदान करें।',
      '3- यदि बुकिंग के बाद आपकी ज्यादातर बुकिंग्स कैंसल होती है या फिर आपका बुकिंग स्कोर 70 % से नीचे गया तो आपको 15 मिनट देरी से बुकिंग दिखेगी ।',
      'हमारा यह मानना है की Service पार्टनर का काम चुनौतियों से भरा है, सर्विस देते वक़्त Service पार्टनर्स को कई तरीके की असाधारण चुनौतियों का सामना करना पड़ता है,',
      'हमारा यह भी मानना है की कस्टमर्स, Service पार्टनर्स को तभी बुक करते हैं, जब उन्हें Service पार्टनर की बेहद जरूरत होती है। यह सुनिश्चित करना हमारा फ़र्ज़ है, की हम समय से कस्टमर के पास पहुंचे और भरोसे पर खरा उतरें ।',
      'हमे उम्मीद है आप बेहतर काम करेंगे। ध्यान रहे हमारा काम कस्टमर की परेशानी कम करने का है , परेशानी बढ़ाने का नहीं।',
      'कंपनी की शुरुआत Nov 2019 से हुई थी। कंपनी का उद्देश्य है भरोसेमंद Service पार्टनर्स द्वारा कस्टमर्स को बेहतर services प्रदान करना और Service पार्टनर्स को ज्यादा से ज्यादा रोजगार प्रदान करना।',
      'हम तीन तरह की services कस्टमर को देते हैं।',
      'हम तीन तरह की services कस्टमर को देते हैं। , दूसरी - आउटस्टेशन बुकिंग्स , तीसरी- मंथली बुकिंग्स',
      'लोकल बुकिंग्स में कस्टमर 1 घंटे से 12 घंटे तक की Round trip बुकिंग करते हैं या फिर 1 से 60 KM की OneWay बुकिंग्स करते हैं',
      'ऑउटस्टेऑन बुकिंग्स में कस्टमर लम्बी दूरी की बुकिंग्स Round Trip या One Way बुकिंग्स करते हैं',
      'मंथली बुकिंग्स में कस्टमर्स Service पार्टनर को तनख्वाह पर रखते हैं।',
      'MOHIT DHANAWAT जी, लोकल बुकिंग्स और आउटस्टेशन बुकिंग्स पर कम्पनी का कमीशन 20 % से 10% होता है। कमीशन GST हटा के बचे हुए बिल पर लगता है।, ओवरटाइम 1.5 Rs पर मिनट के हिसाब से दिया जाता है और रात में गाड़ी चलाने पर 150 Rs नाईट चार्ज दिया जाता है। ओवरटाइम और नाईट चार्ज पूरा Service पार्टनर को दिया जाता है, इसमें कम्पनी का कोई कमीशन नहीं होता है।',
      'यदि आप कम्पनी के साथ लगातार काम करते हैं तो लोकल और आउटस्टेशन बुकिंग्स पर आपका कमीशन कुछ इस प्रकार से कम होता है।',
    ],
  },
];

const NotificationList = ({onNotificationPress}) => {
  return (
    <ScrollView style={styles.container}>
      {notificationData.map((notification, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchable}
          onPress={() => onNotificationPress(index)}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={OpenEnvelop}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.indexText} numberOfLines={2}>
              {notification}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const NotificationDetail = ({index}) => {
  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <Header backButton={true} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {showNotificationData[index].texts.map((text, i) => (
          <Text key={i} style={styles.detailText}>
            {text}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const AllNotificationComponent = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigation = useNavigation();

  const handleNotificationPress = index => {
    setSelectedNotification(index);
    navigation.navigate('NotificationDetail', {index});
  };

  return <NotificationList onNotificationPress={handleNotificationPress} />;
};

export const NotificationDetailScreen = ({route}) => {
  const {index} = route.params;
  return <NotificationDetail index={index} />;
};

export default AllNotificationComponent;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: moderateScale(20),
    alignItems: 'flex-start',
  },
  detailText: {
    fontSize: moderateScale(16),
    fontFamily: 'Roboto-Regular',
    color: AppColors.black,
    marginBottom: verticalScale(10),
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    marginRight: moderateScale(10),
    paddingTop: verticalScale(2),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  textContainer: {
    flex: 1,
    width: scale(designWidth - 70),
  },
  indexText: {
    fontSize: moderateScale(15),
    fontFamily: 'Roboto-Regular',
    color: AppColors.black,
  },
  largeIcon: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginBottom: verticalScale(20),
  },
});
