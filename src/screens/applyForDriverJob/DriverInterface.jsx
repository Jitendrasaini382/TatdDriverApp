import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  StatusBar,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../../components/Header';
import { AppColors } from '../../assets/Colors';

// App colors
const appColors = {
  secondaryColor: '#f58220',
  backgroundColor: '#ffffff',
  lightGrayBackground: '#f5f5f5',
  textDark: '#333333',
  textLight: '#ffffff',
  borderColor: '#dddddd',
  errorColor: '#d32f2f',
};

const DriverInterface = ({navigation, route}) => {
  const {mobile} = "1234567890";
  const [mobileNumber, setMobileNumber] = useState(mobile);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const hindiVideoIds = [
    'gOUGGl-l39E',
    'zJIxK33h5Ng',
    'OtaAd5aUHJw',
    'z7fbMTl2scU',
  ];
  const englishVideoIds = [
    'zJIxK33h5Ng',
    'OtaAd5aUHJw',
    'z7fbMTl2scU',
    'gOUGGl-l39E',
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Refresh logic here
    } catch (error) {
      // Error handling
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleApplyJob = () => {
    if (!mobileNumber) {
      setError('Please Enter Mobile Number');
      return;
    } else if (mobileNumber?.length !== 10) {
      setError('Please Enter 10 digit Mobile Number');
      return;
    }
    setError(null);
    navigation.navigate('SelectYourStatePartnerInterface');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.mainColor} barStyle="light-content" />
      <Header backButton={true} isAuthenticated={false} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[AppColors.mainColor]} 
          />
        }
      >
        <View style={styles.formContainer}>
          {/* <Text style={styles.title}>Driver Registration</Text> */}
          
          <Text style={styles.label}>Enter Your Mobile Number</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Eg. 9810338108"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            maxLength={10}
            placeholderTextColor="#999"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={handleApplyJob}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>APPLY FOR DRIVER JOB</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.videoSection}>
          {/* <Text style={styles.videoSectionTitle}>Learn About the Job</Text> */}
          
          <View style={styles.languageContainer}>
            {['Hindi', 'English'].map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang && styles.selectedLanguage,
                ]}
                onPress={() => setSelectedLanguage(lang)}>
                <Text
                  style={
                    selectedLanguage === lang
                      ? styles.selectedText
                      : styles.languageText
                  }>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.videoContainer}>
            {(selectedLanguage === 'English'
              ? englishVideoIds
              : hindiVideoIds
            ).map((videoId, index) => (
              <View key={videoId} style={styles.videoWrapper}>
                <YoutubePlayer 
                  height={200} 
                  videoId={videoId} 
                  webViewProps={{
                    renderToHardwareTextureAndroid: true,
                  }}
                />
                {/* <Text style={styles.videoCaption}>
                  Video {index + 1}: {selectedLanguage === 'English' ? 'Information' : 'जानकारी'} {index + 1}
                </Text> */}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backgroundColor,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: appColors.backgroundColor,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColors.mainColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: appColors.textDark,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: appColors.borderColor,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: appColors.lightGrayBackground,
  },
  inputError: {
    borderColor: appColors.errorColor,
  },
  errorText: {
    color: appColors.errorColor,
    fontSize: 14,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  applyButton: {
    backgroundColor: AppColors.mainColor,
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  applyButtonText: {
    color: appColors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  videoSection: {
    paddingTop: 20,
    backgroundColor: appColors.lightGrayBackground,
    width: '100%',
    paddingHorizontal: 20,
  },
  videoSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.mainColor,
    marginBottom: 15,
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: appColors.backgroundColor,
    borderRadius: 10,
    width: '100%',
    padding: 5,
    marginBottom: 20,
    elevation: 2,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: AppColors.mainColor,
  },
  languageText: {
    fontSize: 16,
    color: appColors.textDark,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.textLight,
  },
  videoContainer: {
    width: '100%',
  },
  videoWrapper: {
    marginBottom: 25,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: appColors.backgroundColor,
    elevation: 3,
    padding: 10,
  },
  videoCaption: {
    marginTop: 8,
    fontSize: 14,
    color: appColors.textDark,
    textAlign: 'center',
  },
});

export default DriverInterface;




// import React, {useCallback, useState} from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   RefreshControl,
// } from 'react-native';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import Header from '../components/Header';

// const DriverInterface = ({navigation, route}) => {
//   const {mobile} = route?.params;
//   const [mobileNumber, setMobileNumber] = useState(mobile);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('English');

//   const hindiVideoIds = [
//     'gOUGGl-l39E',
//     'zJIxK33h5Ng',
//     'OtaAd5aUHJw',
//     'z7fbMTl2scU',
//   ];
//   const englishVideoIds = [
//     'zJIxK33h5Ng',
//     'OtaAd5aUHJw',
//     'z7fbMTl2scU',
//     'gOUGGl-l39E',
//   ];

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//     } catch (error) {
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const handleApplyJob = () => {
//     if (!mobileNumber) {
//       setError('Please Enter Mobile Number');
//       return;
//     } else if (mobileNumber?.length !== 10) {
//       setError('Please Enter 10 digit Mobile Number');
//       return;
//     }
//     setError(null);
//     navigation.navigate('SelectYourStatePartnerInterface');
//   };

//   return (
//     <View style={styles.container}>
//       <Header backButton={true} isAuthenticated={false} />
//       <ScrollView contentContainerStyle={styles.scrollContainer}
//        refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }>
//         <Text style={styles.label}>Enter Your Mobile Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Eg. 9810338108"
//           keyboardType="numeric"
//           value={mobileNumber}
//           onChangeText={setMobileNumber}
//           maxLength={10}
//         />
//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <TouchableOpacity style={styles.applyButton} onPress={handleApplyJob}>
//           <Text style={styles.applyButtonText}>APPLY FOR DRIVER JOB</Text>
//         </TouchableOpacity>

//         <View style={styles.languageContainer}>
//           {['Hindi', 'English'].map(lang => (
//             <TouchableOpacity
//               key={lang}
//               style={[
//                 styles.languageButton,
//                 selectedLanguage === lang && styles.selectedLanguage,
//               ]}
//               onPress={() => setSelectedLanguage(lang)}>
//               <Text
//                 style={
//                   selectedLanguage === lang
//                     ? styles.selectedText
//                     : styles.languageText
//                 }>
//                 {lang}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.videoContainer}>
//           {(selectedLanguage === 'English'
//             ? englishVideoIds
//             : hindiVideoIds
//           ).map(videoId => (
//             <YoutubePlayer key={videoId} height={200} videoId={videoId} />
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const {width} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//     color: '#333',
//     alignSelf: 'flex-start',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   applyButton: {
//     backgroundColor: '#f58220',
//     width: '100%',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   applyButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   languageContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#eee',
//     borderRadius: 10,
//     width: '100%',
//     padding: 5,
//     marginBottom: 20,
//   },
//   languageButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   selectedLanguage: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   languageText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   selectedText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   videoContainer: {
//     width: '100%',
//   },
// });

// export default DriverInterface;

// // import React, {useState} from 'react';
// // import {
// //   ScrollView,
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Dimensions,
// // } from 'react-native';
// // import YoutubePlayer from 'react-native-youtube-iframe';
// // import Header from '../components/Header';

// // const DriverInterface = () => {
// //   const [mobileNumber, setMobileNumber] = useState('');
// //   const [selectedLanguage, setSelectedLanguage] = useState('English');
// //   const hindiVideoIds = [
// //     'gOUGGl-l39E',
// //     'zJIxK33h5Ng',
// //     'OtaAd5aUHJw',
// //     'z7fbMTl2scU',
// //   ];
// //   const englishVideoIds = [
// //     'zJIxK33h5Ng',
// //     'OtaAd5aUHJw',
// //     'z7fbMTl2scU',
// //     'gOUGGl-l39E',
// //   ];

// //   return (
// //     <View style={styles.container}>
// //       <Header backButton={true} />
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         <Text style={styles.label}>Enter Your Mobile Number</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Eg. 9810338108"
// //           keyboardType="numeric"
// //           value={mobileNumber}
// //           onChangeText={setMobileNumber}
// //         />

// //         <TouchableOpacity style={styles.applyButton}>
// //           <Text style={styles.applyButtonText}>APPLY FOR DRIVER JOB</Text>
// //         </TouchableOpacity>

// //         <View style={styles.languageContainer}>
// //           {['Hindi', 'English'].map(lang => (
// //             <TouchableOpacity
// //               key={lang}
// //               style={[
// //                 styles.languageButton,
// //                 selectedLanguage === lang && styles.selectedLanguage,
// //               ]}
// //               onPress={() => setSelectedLanguage(lang)}>
// //               <Text
// //                 style={
// //                   selectedLanguage === lang
// //                     ? styles.selectedText
// //                     : styles.languageText
// //                 }>
// //                 {lang}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         <View style={styles.videoContainer}>
// //           {selectedLanguage == 'English'
// //             ? englishVideoIds?.map(videoId => (
// //                 <YoutubePlayer key={videoId} height={200} videoId={videoId} />
// //               ))
// //             : hindiVideoIds?.map(videoId => (
// //                 <YoutubePlayer key={videoId} height={200} videoId={videoId} />
// //               ))}
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const {width} = Dimensions.get('window');

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   scrollContainer: {
// //     flexGrow: 1,
// //     padding: 20,
// //     alignItems: 'center',
// //   },
// //   label: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     marginBottom: 5,
// //     color: '#333',
// //     alignSelf: 'flex-start',
// //   },
// //   input: {
// //     width: '100%',
// //     borderWidth: 1,
// //     borderColor: '#aaa',
// //     borderRadius: 8,
// //     padding: 12,
// //     fontSize: 16,
// //     marginBottom: 15,
// //   },
// //   applyButton: {
// //     backgroundColor: '#f58220',
// //     width: '100%',
// //     padding: 15,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginBottom: 15,
// //   },
// //   applyButtonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   languageContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     backgroundColor: '#eee',
// //     borderRadius: 10,
// //     width: '100%',
// //     padding: 5,
// //     marginBottom: 20,
// //   },
// //   languageButton: {
// //     flex: 1,
// //     paddingVertical: 12,
// //     alignItems: 'center',
// //     borderRadius: 8,
// //   },
// //   selectedLanguage: {
// //     backgroundColor: '#fff',
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   languageText: {
// //     fontSize: 16,
// //     color: '#666',
// //   },
// //   selectedText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#000',
// //   },
// //   videoContainer: {
// //     width: '100%',
// //   },
// // });

// // export default DriverInterface;
