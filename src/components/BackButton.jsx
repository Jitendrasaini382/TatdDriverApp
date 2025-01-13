import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/Colors';

const BackButton = ({customeNavigation = null}) => {
  const navigation = useNavigation();

  // const handlePress = useCallback(() => {
  //   navigation.goBack();

  // }, [navigation]);

  const handlePress = useCallback(() => {
    if (customeNavigation && customeNavigation.name) {
      navigation.navigate(
        customeNavigation.name,
        customeNavigation.params || {},
      );
    } else {
      navigation.goBack();
    }
  }, [navigation, customeNavigation]);

  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={handlePress} style={styles.buttonView}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(BackButton);

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonView: {
    margin: 5,
    marginRight: 17,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: 'rgb(204,204,204)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.black,
    margin: 5,
    opacity: 0.8,
  },
  icon: {
    marginLeft: 5,
  },
});

// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {AppColors} from '../assets/Colors';

// const BackButton = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.mainView}>
//       <View style={styles.buttonView}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Back</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BackButton;

// const styles = StyleSheet.create({
//   mainView: {
//     alignItems: 'center',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   buttonView: {
//     margin: 5,
//     marginRight: 17,
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 5,
//     borderColor: 'rgb(204,204,204)',
//   },
//   buttonText: {
//     color: AppColors.black,
//     margin: 5,
//     opacity: 0.8,
//   },
// });
