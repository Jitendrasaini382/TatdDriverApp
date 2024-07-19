import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {LANGUAGE_SWITCH} from '../../apis/Apis';
import { TokenConstextApi } from '../../context/GlobalContext';

const ToggleButton = ({button1Label, button2Label, onToggle}) => {
  const [currentState, setCurrentState] = useState(button1Label);

  // const [languageSwitch , setLanguageSwitch] = useState(null)

  
  const{languageSwitch, setLanguageSwitch} = useContext(TokenConstextApi)
  // console.log(languageSwitch,"llllllllllllllllsw");

  const handlePress = async label => {
    setCurrentState(label);
    onToggle(label);

    const language = label.toLowerCase();
    // await switchLanguage(language);
  };

  const switchLanguage = async language => {
    try {
      const response = await LANGUAGE_SWITCH({
        action: 'update_language',
        current_language: language,
      });
      setLanguageSwitch(response.current_language)
      console.log(response, ' language response DATA');
    } catch (error) {
      console.log(error, 'Language Switch Error');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          currentState === button1Label
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => handlePress(button1Label)}>
        <Text
          style={[
            styles.buttonText,
            currentState === button1Label
              ? styles.activeButtonText
              : styles.inactiveButtonText,
          ]}>
          {button1Label}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          currentState === button2Label
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => handlePress(button2Label)}>
        <Text
          style={[
            styles.buttonText,
            currentState === button2Label
              ? styles.activeButtonText
              : styles.inactiveButtonText,
          ]}>
          {button2Label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#edecf1',
    flexDirection: 'row',
    marginTop: 20,
    margin: 15,
    borderRadius: 5,
    padding: 8,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: AppColors.white,
  },
  inactiveButton: {},
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeButtonText: {
    color: AppColors.black,
  },
  inactiveButtonText: {
    color: AppColors.black,
  },
});

export default ToggleButton;

// import React, {useState} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import {AppColors} from '../../assets/Colors';
// import {LANGUAGE_SWITCH} from '../../apis/Apis';

// const ToggleButton = ({button1Label, button2Label, onToggle}) => {
//   const [currentState, setCurrentState] = useState(button1Label);

//   const handlePress = label => {
//     setCurrentState(label);
//     onToggle(label);
//   };

//   const switchLanguage = async () => {
//     try {
//       const response = await LANGUAGE_SWITCH({
//         action: 'update_language',
//         current_language: 'hindi',
//       });
//       console.log(response, ' language response DATA');
//     } catch (error) {
//       console.log(error, 'Language Switch Error');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[
//           styles.toggleButton,
//           currentState === button1Label
//             ? styles.activeButton
//             : styles.inactiveButton,
//         ]}
//         onPress={() => handlePress(button1Label)}>
//         <Text
//           style={[
//             styles.buttonText,
//             currentState === button1Label
//               ? styles.activeButtonText
//               : styles.inactiveButtonText,
//           ]}>
//           {button1Label}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.toggleButton,
//           currentState === button2Label
//             ? styles.activeButton
//             : styles.inactiveButton,
//         ]}
//         onPress={() => handlePress(button2Label)}>
//         <Text
//           style={[
//             styles.buttonText,
//             currentState === button2Label
//               ? styles.activeButtonText
//               : styles.inactiveButtonText,
//           ]}>
//           {button2Label}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#edecf1',
//     flexDirection: 'row',
//     marginTop: 20,
//     margin: 15,
//     borderRadius: 5,
//     padding: 8,
//   },
//   toggleButton: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   activeButton: {
//     backgroundColor: AppColors.white,
//   },
//   inactiveButton: {},
//   buttonText: {
//     fontSize: 12,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   activeButtonText: {
//     color: AppColors.black,
//   },
//   inactiveButtonText: {
//     color: AppColors.black,
//   },
// });

// export default ToggleButton;

// import React, {useState} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import {AppColors} from '../../assets/Colors';

// const ToggleButton = ({HINDI, ENGLISH, onToggle}) => {
//   const [currentState, setCurrentState] = useState(HINDI);

//   const handlePress = label => {
//     setCurrentState(label);
//     onToggle(label);
//   };

//   return (
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity
//         style={[
//           styles.toggleButton,
//           currentState === HINDI ? styles.activeButton : styles.inactiveButton,
//         ]}
//         onPress={() => handlePress(HINDI)}>
//         <Text
//           style={[
//             styles.buttonText,
//             currentState === HINDI
//               ? styles.activeButtonText
//               : styles.inactiveButtonText,
//           ]}>
//           HINDI
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.toggleButton,
//           currentState === ENGLISH
//             ? styles.activeButton
//             : styles.inactiveButton,
//         ]}
//         onPress={() => handlePress(ENGLISH)}>
//         <Text
//           style={[
//             styles.buttonText,
//             currentState === ENGLISH
//               ? styles.activeButtonText
//               : styles.inactiveButtonText,
//           ]}>
//           ENGLISH
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     buttonContainer: {
//     backgroundColor: '#edecf1',
//     flexDirection: 'row',
//     marginTop: 20,
//     margin: 15,
//     borderRadius: 5,
//     padding: 8,
//   },
//   toggleButton: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   activeButton: {
//     backgroundColor: AppColors.white,
//   },
//   inactiveButton: {},
//   buttonText: {
//     fontSize: 12,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   activeButtonText: {
//     color: AppColors.black,
//   },
//   inactiveButtonText: {
//     color: AppColors.black,
//   },
// });

// export default ToggleButton;
