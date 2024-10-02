import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import CheckBox from '@react-native-community/checkbox';
import {ON_DEMAND_BOOKING} from '../../apis/Apis';
import {TokenConstextApi} from '../../context/GlobalContext';

const RoundTripBookingAceeptModal = ({setOpenModal}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [driverConsent, setDriverConsent] = useState({});
  const {languageSwitch} = useContext(TokenConstextApi);

  useEffect(() => {
    driverConsentPopupView();
  }, []);

  const driverConsentPopupView = async () => {
    try {
      const response = await ON_DEMAND_BOOKING({
        action: 'ondemand_driver_consent_popup_view',
        current_language: languageSwitch,
      });

      console.log(
        response?.ondemand_driver_consent_popup_data,
        'ondemand_driver_consent_popup_view response',
      );
      setDriverConsent(response?.ondemand_driver_consent_popup_data);
    } catch (error) {
      console.log(error, 'ondemand_driver_consent_popup_view Error');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: AppColors.mainColor,
          // flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <View
          style={{
            // backgroundColor: AppColors.silverGrey,
            backgroundColor: '#F7F7F7',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            // alignContent: 'center',
            // alignSelf: 'center',
          }}>
          <View
            style={{
              // paddingHorizontal: 10,
              // paddingTop: 40,
              // paddingBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColors.black,
                fontSize: 25,
                fontFamily: 'Roboto',
                fontWeight: '500',
              }}>
              {driverConsent?.accept_heading}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setOpenModal(false)}>
            <Text
              style={{
                padding: 10,
                textAlign: 'right',
                fontSize: 25,
                fontFamily: 'Roboto',
                color: AppColors.gray,
                fontWeight: 'bold',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text style={{color: 'black', fontSize: 20, padding: 10}}>
            {driverConsent?.accept_paragraph1}
          </Text>
          <Text style={{color: 'black', fontSize: 20, padding: 10}}>
            {driverConsent?.accept_paragraph2}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {/* First Checkbox */}
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => setChecked1(!checked1)}
              style={{
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: checked1 ? AppColors.mainColor : 'white',
                marginRight: 10,
              }}>
              {checked1 && (
                <Text style={{color: 'white', fontWeight: 'bold'}}>✔</Text>
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                // flex: 1,
                color: AppColors.black,
              }}>
              {driverConsent?.checkboxLabel1}
            </Text>
          </View>

          {/* Second Checkbox */}
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => setChecked2(!checked2)}
              style={{
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: checked2 ? AppColors.mainColor : 'white',
                marginRight: 10,
              }}>
              {checked2 && (
                <Text style={{color: 'white', fontWeight: 'bold'}}>✔</Text>
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                color: AppColors.black,
              }}>
              {driverConsent?.checkboxLabel2}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Are You Confirm');
          }}
          disabled={!checked1 && !checked2}
          style={{
            backgroundColor:
              checked1 && checked2 ? AppColors.mainColor : '#CCCCCC',
            padding: 10,
            borderWidth: 0.5,
            borderColor: AppColors.black,
            // paddingHorizontal: 20,
            marginBottom: 20,
            width: '50%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              color: AppColors.white,
              fontFamily: 'Roboto-Medium',
              alignSelf: 'center',
            }}>
            Accept
          </Text>
        </TouchableOpacity>

        {/* <View style={{backgroundColor: '#e5e5e5'}}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'right',
                  fontSize: 20,
                  fontFamily: 'Roboto',
                  color: AppColors.black,
                }}>
                X
              </Text>
            </TouchableOpacity>
          <View
            style={{
              backgroundColor: AppColors.mainColor,
              paddingHorizontal: 10,
              paddingTop: 40,
              paddingBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: 40,
                fontFamily: 'Roboto-Medium',
              }}>
              The guest is God
            </Text>
          </View>
          </View>
          <View
            style={{
              backgroundColor: '#e5e5e5',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: AppColors.mainColor,
                fontFamily: 'Roboto-Medium',
              }}>
              {'\n'}
              {'\n'}I accept this duty{'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AppColors.black,
                fontFamily: 'Roboto-Medium',
              }}>
              I will reach the coustomer on time{'\n'}
              {'\n'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Are You Confirm');
              }}
              style={{
                backgroundColor: AppColors.mainColor,
                padding: 10,
                borderWidth: 1,
                borderColor: AppColors.black,
                paddingHorizontal: 20,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: AppColors.white,
                  fontFamily: 'Roboto-Medium',
                }}>
                Accept
              </Text>
            </TouchableOpacity>
          </View> */}
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    width: 300,
  },
  header: {
    backgroundColor: '#337ab7',
    padding: 15,
  },
  headerText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    padding: 15,
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#337ab7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoundTripBookingAceeptModal;

// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import { AppColors } from '../../assets/Colors';

// const RoundTripBookingAceeptModal = ({setOpenModal}) => {

//   useEffect(()=>{
//     console.log("runnnnnbooking accept modal");

//   })

//   return (
//     <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
//       <SafeAreaView style={{flex: 1}}>
//         <View
//           style={{
//             borderWidth: 1,
//             borderColor: AppColors.mainColor,
//             // flex: 1,
//             // backgroundColor: AppColors.white,
//           }}>
//           <View style={{backgroundColor: '#e5e5e5'}}>
//             <TouchableOpacity onPress={() => setOpenModal(false)}>
//               <Text
//                 style={{
//                   padding: 10,
//                   textAlign: 'right',
//                   fontSize: 20,
//                   fontFamily: 'Roboto',
//                   color: AppColors.black,
//                 }}>
//                 X
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               backgroundColor: AppColors.mainColor,
//               paddingHorizontal: 10,
//               paddingTop: 40,
//               paddingBottom: 20,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 color: AppColors.white,
//                 fontSize: 40,
//                 fontFamily: 'Roboto-Medium',
//               }}>
//               The guest is God
//             </Text>
//           </View>
//           <View
//             style={{
//               backgroundColor: '#e5e5e5',
//               paddingHorizontal: 20,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontSize: 25,
//                 color: AppColors.mainColor,
//                 fontFamily: 'Roboto-Medium',
//               }}>
//               {'\n'}
//               {'\n'}I accept this duty{'\n'}
//               {'\n'}
//               {'\n'}
//               {'\n'}
//               {'\n'}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 15,
//                 color: AppColors.black,
//                 fontFamily: 'Roboto-Medium',
//               }}>
//               I will reach the coustomer on time{'\n'}
//               {'\n'}
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 Alert.alert('Are You Confirm');
//               }}
//               style={{
//                 backgroundColor: AppColors.mainColor,
//                 padding: 10,
//                 borderWidth: 1,
//                 borderColor: AppColors.black,
//                 paddingHorizontal: 20,
//                 marginBottom: 20,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   color: AppColors.white,
//                   fontFamily: 'Roboto-Medium',
//                 }}>
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: AppColors.white,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     overflow: 'hidden',
//     width: 300,
//   },
//   header: {
//     backgroundColor: '#337ab7',
//     padding: 15,
//   },
//   headerText: {
//     color: AppColors.white,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   body: {
//     padding: 15,
//     alignItems: 'center',
//   },
//   bodyText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   smallText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#337ab7',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: AppColors.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default RoundTripBookingAceeptModal;
