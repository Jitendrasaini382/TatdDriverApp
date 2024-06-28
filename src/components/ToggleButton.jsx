import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToggleButton = ({ button1Label, button2Label, onToggle }) => {
  const [currentState, setCurrentState] = useState(button1Label);

  const handlePress = (label) => {
    setCurrentState(label);
    onToggle(label);
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
    backgroundColor: 'white',
  },
  inactiveButton: {},
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeButtonText: {
    color: 'black',
  },
  inactiveButtonText: {
    color: 'black',
  },
});

export default ToggleButton;










// import React, {useState} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

// const ToggleButton = ({ button1Label, button2Label }) => {
//   const [currentState, setCurrentState] = useState(button1Label);

//   return (
//     <View
//       style={{
//         backgroundColor: '#edecf1',
//         display: 'flex',
//         flexDirection: 'row',
//         marginTop: 20,
//         paddingLeft: 10,
//         paddingRight: 10,
//         margin: 15,
//         borderRadius: 5,
//         // padding: 8,
//       }}>
//       <View style={styles.toggleButton}>
//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             currentState == button1Label
//               ? styles.activeButton
//               : styles.inactiveButton,
//           ]}
//           onPress={() => setCurrentState(button1Label)}>
//           <Text
//             style={[
//               styles.buttonText,
//               currentState == button1Label
//                 ? styles.activeButton_text
//                 : styles.inactiveButton_text,
//             ]}>
//             {button1Label}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             currentState == button2Label
//               ? styles.activeButton
//               : styles.inactiveButton,
//           ]}
//           onPress={() => setCurrentState(button2Label)}>
//           <Text
//             style={[
//               styles.buttonText,
//               currentState == button2Label
//                 ? styles.activeButton_text
//                 : styles.inactiveButton_text,
//             ]}>
//             {button2Label}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   toggleButton: {
//     flex: 1,
//     padding: 8,
//     paddingHorizontal: 2,
//     display: 'flex',
//     flexDirection: 'row',
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   activeButton: {
//     backgroundColor: 'white',
//   },
//   inactiveButton: {
//     // backgroundColor: 'white',
//   },
//   buttonText: {
//     // fontWeight: 'bold',
//     fontSize: 12,
//     color: 'black',
//     fontWeight : '500',
//     textAlign: 'center',
//     // justifyContent : 'space-evenly'
//     // color: 'rgb(51,51,51)',
//     // textAlign: 'center',
//     padding: 5
//   },
//   activeButton_text: {
//     color: 'black',
//   },
//   inactiveButton_text: {
//     color: 'black',
//   },
// });

// export default ToggleButton;
