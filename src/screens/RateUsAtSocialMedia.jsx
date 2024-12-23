// import React from 'react';
// import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';

// const RateUsAtSocialMedia = ({route, navigation}) => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.mainContainer}>
//         <Header backButton={true} />
//         <View style={styles.container}>
//           <Text style={styles.feedbackText}>
//             Your feedback is invaluable to us, and we'd love for you to share
//             your positive experience with others on Google
//           </Text>
//         </View>
//         <View style={styles.reviewContainer}>
//           <Text style={styles.inspirationText}>
//             "Your Voice, Our Insipiration: Share Your"
//           </Text>
//           <Text
//             style={{marginHorizontal: 15, alignSelf: 'center', fontSize: 14}}>
//             "Review and Shape Our Success!"
//           </Text>
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>Review as at Google</Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default RateUsAtSocialMedia;

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//     backgroundColor: 'white',
//   },
//   container: {
//     backgroundColor: AppColors.mainColor,
//     margin: 20,
//     padding: 20,
//     borderRadius: 10,
//   },
//   feedbackText: {
//     color: 'white',
//     fontSize: 20,
//     paddingVertical: 5,
//   },
//   inspirationText: {
//     color: 'black',
//     fontSize: 13,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: 'orange',
//     padding: 10,
//     width: '90%',
//     marginHorizontal: '5%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//     borderRadius: 5,
//   },
//   reviewContainer: {
//     padding: 50,
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
// });

// with api

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {
  RATE_US_SOCIAL_MEDIA,
  RATE_US_SOCIAL_MEDIA_VIEW_DATA,
} from '../apis/Apis';
import {useSelector} from 'react-redux';

const RateUsAtSocialMedia = ({route, navigation}) => {
  const booking = '642668';

  const [viewData, setViewData] = useState({});
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  console.log(
    languageSwitch,
    'languageSwitchlanguageSwitch rate us social media',
  );

  useEffect(() => {
    // GetAllSocialMediaData(booking);
  }, []);

  const GetAllSocialMediaData = async number => {
    
    try {
      const response = await RATE_US_SOCIAL_MEDIA_VIEW_DATA({
        booking_id: number,
        utype: 'Driver',
      });
      setViewData(response);
      console.log(response, 'GetAllSocialMediaData Api response');
    } catch (error) {
      console.log(error, 'GetAllSocialMediaData Api error - Error');
    }
  };

  const rateusSocialMedia = async number => {
    try {
      const response = await RATE_US_SOCIAL_MEDIA({
        action: 'rate_us',
        booking_id: number,
        plateform: 'google',
        utype: 'Driver',
        current_language: languageSwitch,
      });

      console.log(response, 'rateusSocialMedia Api response');
    } catch (error) {
      console.log(error, 'rateusSocialMedia Api error - Error');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Header backButton={true} />
        <View style={styles.container}>
          <Text style={styles.feedbackText}>
            {viewData?.content1 ||
              "Your feedback is invaluable to us, and we'd love for you to share your positive experience with others on Google"}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.inspirationText}>
            {viewData?.content2 ||
              " 'Your Voice, Our Insipiration: Share Your'  "}
          </Text>
          <Text
            style={{marginHorizontal: 15, alignSelf: 'center', fontSize: 14}}>
            {viewData?.content3 || " 'Review and Shape Our Success!' "}
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Review as at Google</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RateUsAtSocialMedia;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: AppColors.mainColor,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  feedbackText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
  },
  inspirationText: {
    color: 'black',
    fontSize: 13,
    // alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  reviewContainer: {
    padding: 50,
  },
});
