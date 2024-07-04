import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {Copy_Icon, WhatsApp_Icon,} from '../assets/images';
import { AppFont } from '../assets/FontsFamily';

const AddDriverComponent = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>ADD YOUR DRIVER</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Driver का नंबर ?"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginVertical: 50, flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth:1,
            borderColor:"black",
            marginRight: 10
          }}>
          <Text style={{color: 'black',fontFamily: AppFont.regularFont}}>OR</Text>
        </View>
        <View>
        {/* <Icon name="copy" size={35} color={'blue'} /> */}
        <Image style={{width: 35, height: 35}} source={Copy_Icon} />

          <Text  style={{paddingTop:5  ,color:"black", fontFamily: AppFont.regularFont}}>Copy</Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 10,
          padding: 20,
          width: '90%',
          alignSelf: 'center',
          borderWidth: 1,
          paddingVertical: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    paddingVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Roboto-Bold",
    marginBottom: 35,
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddDriverComponent;

// import React from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const AddDriverComponent = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>ADD YOUR DRIVER</Text>
//      <View style={{flexDirection: "row", }} >
//      <TextInput
//         style={styles.input}
//         placeholder="Driver का नंबर ?"
//         placeholderTextColor="#888"
//       />
//       <Button title="Send" color="#FFA500" onPress={() => {}} />
//      </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     // height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     // width: '100%',
//   },
// });

// export default AddDriverComponent;

// // import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// // import React from 'react'

// // const AddDriver = () => {
// //   return (
// //     <View style={{flex: 1, margin:10}} >
// //       <View style={{borderWidth : 1, padding: 10,}} >
// //       <Text style={{margin: 20,marginBottom: 40, color: "black", alignSelf:"center"}}>ADD YOUR DRIVER</Text>
// //       <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
// //       <TextInput
// //       placeholder="Driver का नंबर ?"
// //       style={{
// //         borderWidth:1,
// //         // flex:

// //       }}
// //       />
// //       <TouchableOpacity  style={{backgroundColor: "orange"}} >
// //         <Text style={{padding: 10}} >Send</Text>
// //       </TouchableOpacity>
// //       </View>
// //       </View>
// //       <View style={{borderWidth : 1, padding: 10,}} >

// //       </View>
// //       <View style={{borderWidth : 1, padding: 10,}} >

// //       </View>
// //     </View>
// //   )
// // }

// // export default AddDriver

// // const styles = StyleSheet.create({})

// // // import Icon from 'react-native-vector-icons/FontAwesome'; // You'll need to install this package
// // // import React, {useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Image,
// // // } from 'react-native';

// // // const AddDriver = () => {
// // //   const [driverNumber, setDriverNumber] = useState('');

// // //   const handleSend = () => {
// // //     // Handle sending the driver number
// // //     console.log('Driver Number:', driverNumber);
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>ADD YOUR DRIVER</Text>

// // //       <View style={styles.inputContainer}>
// // //         <TextInput
// // //           style={styles.input}
// // //           placeholder="Driver का नंबर ?"
// // //           value={driverNumber}
// // //           onChangeText={setDriverNumber}
// // //         />
// // //         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
// // //           <Text style={styles.sendButtonText}>Send</Text>
// // //         </TouchableOpacity>
// // //       </View>

// // //       <View style={styles.orContainer}>
// // //         <Text style={styles.orText}>OR</Text>
// // //         <TouchableOpacity style={styles.copyButton}>
// // //         <Icon name="copy" size={24} color="blue" />

// // //           {/* <Image source={require('./copy-icon.png')} style={styles.icon} /> */}
// // //           <Text style={styles.copyButtonText}>Copy</Text>
// // //         </TouchableOpacity>
// // //       </View>

// // //       <View style={styles.socialContainer}>
// // //         <TouchableOpacity style={styles.socialButton}>
// // //         <Icon name="copy" size={24} color="blue" />

// // //           {/* <Image source={require('./whatsapp-icon.png')} style={styles.icon} /> */}
// // //           <Text style={styles.socialButtonText}>WhatsApp</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.socialButton}>
// // //         <Icon name="copy" size={24} color="blue" />

// // //           {/* <Image source={require('./facebook-icon.png')} style={styles.icon} /> */}
// // //           <Text style={styles.socialButtonText}>Facebook</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.socialButton}>
// // //         <Icon name="copy" size={24} color="blue" />

// // //           {/* <Image source={require('./linkedin-icon.png')} style={styles.icon} /> */}
// // //           <Text style={styles.socialButtonText}>LinkedIn</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.socialButton}>
// // //         <Icon name="copy" size={24} color="blue" />

// // //           {/* <Image source={require('./twitter-icon.png')} style={styles.icon} /> */}
// // //           <Text style={styles.socialButtonText}>Twitter</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 20,
// // //   },
// // //   title: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 20,
// // //   },
// // //   inputContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginBottom: 20,
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     borderWidth: 1,
// // //     borderColor: '#ccc',
// // //     padding: 10,
// // //     borderRadius: 5,
// // //   },
// // //   sendButton: {
// // //     backgroundColor: 'orange',
// // //     padding: 10,
// // //     marginLeft: 10,
// // //     borderRadius: 5,
// // //   },
// // //   sendButtonText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //   },
// // //   orContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginBottom: 20,
// // //   },
// // //   orText: {
// // //     fontSize: 16,
// // //     marginRight: 10,
// // //   },
// // //   copyButton: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   icon: {
// // //     width: 20,
// // //     height: 20,
// // //     marginRight: 5,
// // //   },
// // //   copyButtonText: {
// // //     fontSize: 16,
// // //   },
// // //   socialContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //   },
// // //   socialButton: {
// // //     alignItems: 'center',
// // //   },
// // //   socialButtonText: {
// // //     fontSize: 14,
// // //     marginTop: 5,
// // //   },
// // // });

// // // export default AddDriver;

// // // // import React from 'react';
// // // // import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Share } from 'react-native';
// // // // import Icon from 'react-native-vector-icons/FontAwesome'; // You'll need to install this package

// // // // export default function App() {
// // // //   const handleShare = async (platform) => {
// // // //     try {
// // // //       const result = await Share.share({
// // // //         message: 'Driver का नंबर ?',
// // // //       });

// // // //       if (result.action === Share.sharedAction) {
// // // //         if (result.activityType) {
// // // //           console.log(`Shared with activity type of: ${result.activityType}`);
// // // //         } else {
// // // //           console.log('Shared');
// // // //         }
// // // //       } else if (result.action === Share.dismissedAction) {
// // // //         console.log('Dismissed');
// // // //       }
// // // //     } catch (error) {
// // // //       alert(error.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.header}>ADD YOUR DRIVER</Text>
// // // //       <View style={styles.inputContainer}>
// // // //         <TextInput style={styles.input} placeholder="Driver का नंबर ?" />
// // // //         <Button title="Send" onPress={() => {}} color="#FF9100" />
// // // //       </View>
// // // //       <Text style={styles.orText}>OR</Text>
// // // //       <TouchableOpacity style={styles.copyButton} onPress={() => {}}>
// // //         // <Icon name="copy" size={24} color="blue" />
// // // //         <Text style={styles.copyText}>Copy</Text>
// // // //       </TouchableOpacity>
// // // //       <View style={styles.socialContainer}>
// // // //         <TouchableOpacity onPress={() => handleShare('whatsapp')}>
// // // //           <Icon name="whatsapp" size={40} color="#25D366" />
// // // //         </TouchableOpacity>
// // // //         <TouchableOpacity onPress={() => handleShare('facebook')}>
// // // //           <Icon name="facebook" size={40} color="#3b5998" />
// // // //         </TouchableOpacity>
// // // //         <TouchableOpacity onPress={() => handleShare('linkedin')}>
// // // //           <Icon name="linkedin" size={40} color="#0077B5" />
// // // //         </TouchableOpacity>
// // // //         <TouchableOpacity onPress={() => handleShare('twitter')}>
// // // //           <Icon name="twitter" size={40} color="#1DA1F2" />
// // // //         </TouchableOpacity>
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //     padding: 20,
// // // //   },
// // // //   header: {
// // // //     fontSize: 24,
// // // //     marginBottom: 20,
// // // //   },
// // // //   inputContainer: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     marginBottom: 20,
// // // //   },
// // // //   input: {
// // // //     height: 40,
// // // //     borderColor: 'gray',
// // // //     borderWidth: 1,
// // // //     flex: 1,
// // // //     marginRight: 10,
// // // //     paddingLeft: 10,
// // // //   },
// // // //   orText: {
// // // //     fontSize: 18,
// // // //     marginBottom: 20,
// // // //   },
// // // //   copyButton: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     marginBottom: 20,
// // // //   },
// // // //   copyText: {
// // // //     fontSize: 18,
// // // //     color: 'blue',
// // // //     marginLeft: 5,
// // // //   },
// // // //   socialContainer: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-around',
// // // //     width: '80%',
// // // //   },
// // // // });

// // // // // import React from 'react';
// // // // // import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// // // // // import Icon from 'react-native-vector-icons/FontAwesome'; // You'll need to install this package

// // // // // const AddDriverComponent = () => {
// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <View style={styles.inputContainer}>
// // // // //         <TextInput
// // // // //           style={styles.input}
// // // // //           placeholder="Driver का नंबर ?"
// // // // //           placeholderTextColor="#999"
// // // // //         />
// // // // //         <TouchableOpacity style={styles.sendButton}>
// // // // //           <Text style={styles.sendButtonText}>Send</Text>
// // // // //         </TouchableOpacity>
// // // // //       </View>

// // // // //       <View style={styles.orContainer}>
// // // // //         <View style={styles.line} />
// // // // //         <Text style={styles.orText}>OR</Text>
// // // // //         <View style={styles.line} />
// // // // //       </View>

// // // // //       <View style={styles.copyContainer}>
// // // // //         <Icon name="copy" size={20} color="#000" />
// // // // //         <Text style={styles.copyText}>Copy</Text>
// // // // //       </View>

// // // // //       <View style={styles.socialContainer}>
// // // // //         <TouchableOpacity style={styles.socialButton}>
// // // // //           <Icon name="whatsapp" size={30} color="#25D366" />
// // // // //         </TouchableOpacity>
// // // // //         <TouchableOpacity style={styles.socialButton}>
// // // // //           <Icon name="facebook" size={30} color="#3b5998" />
// // // // //         </TouchableOpacity>
// // // // //         <TouchableOpacity style={styles.socialButton}>
// // // // //           <Icon name="linkedin" size={30} color="#0077B5" />
// // // // //         </TouchableOpacity>
// // // // //         <TouchableOpacity style={styles.socialButton}>
// // // // //           <Icon name="twitter" size={30} color="#1DA1F2" />
// // // // //         </TouchableOpacity>
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     padding: 20,
// // // // //     backgroundColor: '#fff',
// // // // //     borderRadius: 10,
// // // // //     shadowColor: '#000',
// // // // //     shadowOffset: { width: 0, height: 2 },
// // // // //     shadowOpacity: 0.1,
// // // // //     shadowRadius: 4,
// // // // //     elevation: 3,
// // // // //   },
// // // // //   inputContainer: {
// // // // //     flexDirection: 'row',
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   input: {
// // // // //     flex: 1,
// // // // //     height: 40,
// // // // //     borderWidth: 1,
// // // // //     borderColor: '#ddd',
// // // // //     borderRadius: 5,
// // // // //     paddingHorizontal: 10,
// // // // //     marginRight: 10,
// // // // //   },
// // // // //   sendButton: {
// // // // //     backgroundColor: '#FF9800',
// // // // //     paddingHorizontal: 20,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     borderRadius: 5,
// // // // //   },
// // // // //   sendButtonText: {
// // // // //     color: '#fff',
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // //   orContainer: {
// // // // //     flexDirection: 'row',
// // // // //     alignItems: 'center',
// // // // //     marginVertical: 20,
// // // // //   },
// // // // //   line: {
// // // // //     flex: 1,
// // // // //     height: 1,
// // // // //     backgroundColor: '#ddd',
// // // // //   },
// // // // //   orText: {
// // // // //     marginHorizontal: 10,
// // // // //     color: '#999',
// // // // //   },
// // // // //   copyContainer: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   copyText: {
// // // // //     marginLeft: 5,
// // // // //     color: '#000',
// // // // //   },
// // // // //   socialContainer: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'space-around',
// // // // //   },
// // // // //   socialButton: {
// // // // //     padding: 10,
// // // // //   },
// // // // // });

// // // // // export default AddDriverComponent;

// // // // // // import React from 'react';
// // // // // // import { View, TouchableOpacity, StyleSheet } from 'react-native';
// // // // // // import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library you prefer
// // // // // // import { Linking } from 'react-native';

// // // // // // const openWhatsApp = () => {
// // // // // //   let url = 'whatsapp://send?text=Hello'; // You can customize the text or add a phone number like: 'whatsapp://send?phone=+123456789&text=Hello'
// // // // // //   Linking.openURL(url)
// // // // // //     .then((data) => {
// // // // // //       console.log('WhatsApp Opened');
// // // // // //     })
// // // // // //     .catch(() => {
// // // // // //       console.log('Make sure WhatsApp is installed on your device');
// // // // // //     });
// // // // // // };

// // // // // // const App = () => {
// // // // // //   return (
// // // // // //     <View style={styles.container}>
// // // // // //       <TouchableOpacity onPress={openWhatsApp}>
// // // // // //         <Icon name="whatsapp" size={50} color="#25D366" />
// // // // // //       </TouchableOpacity>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     justifyContent: 'center',
// // // // // //     alignItems: 'center',
// // // // // //   },
// // // // // // });

// // // // // // export default App;
