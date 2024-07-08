import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RightArrow_White} from '../assets/images';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';

const SelectYourState = ({navigation}) => {
  const states = [
    'Delhi',
    'Haryana',
    'Karnataka',
    'Maharashtra',
    'Telangana',
    'Uttar Pradesh',
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Your State</Text>
        </View>
        <View style={styles.buttonContainer}>
          {states.map((state, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectYourCity', {state})}
              key={index}
              style={styles.button}>
              <Text style={styles.buttonText}>{state}</Text>
              <Image
                style={styles.arrowImage}
                resizeMode="center"
                source={RightArrow_White}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    padding: 25,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    borderRadius: 15,
    margin: 25,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    color: '#16588e',
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#005a8c',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: AppFont.regularFont,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  arrowImage: {width: 18, height: 18},
});

export default SelectYourState;

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import {RightArrow_White} from '../assets/images';
// import Header from '../components/Header';
// import {AppColors} from '../assets/Colors';
// import {AppFont} from '../assets/FontsFamily';

// const SelectYourState = () => {
//   const states = [
//     'Delhi',
//     'Haryana',
//     'Karnataka',
//     'Maharashtra',
//     'Telangana',
//     'Uttar Pradesh',
//   ];

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       <Header backButton={true} />

//       <View style={styles.container}>
//         <View
//           style={{
//             borderBottomWidth: 2,
//             borderBottomColor: '#16588e',
//             alignSelf: 'flex-start',
//           }}>
//           <Text style={styles.title}>Select Your State</Text>
//         </View>
//         <View style={{marginTop: 25}}>
//           {states.map((state, index) => (
//             <TouchableOpacity
//             onPress={()=>{}}
//             key={index} style={styles.button}>
//               <Text style={styles.buttonText}>{state}</Text>
//               <Image
//                 style={styles.arrowImage}
//                 resizeMode="center"
//                 source={RightArrow_White}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SelectYourState;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   container: {
//     padding: 25,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     borderRadius: 15,
//     margin: 25,
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 20,
//     paddingBottom: 10,
//     color: '#16588e',
//     fontFamily: AppFont.regularFont,
//     fontWeight: '500',
//   },
//   button: {
//     backgroundColor: '#005a8c',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: AppFont.regularFont,
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'white',
//   },
//   arrowImage: {width: 18, height: 18},
// });
