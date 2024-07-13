import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import {AppColors} from '../../assets/Colors';
import {
  CHECK_BOOKING_NUMBER,
  CHECK_OPEN_TICKET,
  CREATE_TICKET_DRIVER,
  SHOW_DRIVER_TICKET,
} from '../../apis/Apis';
import {TokenConstextApi} from '../../context/GlobalContext';

const CreateTicketModal = ({setCreateTicketModal}) => {
  const [field, setField] = useState({
    action: 'create_driver_ticket',
    remarks: '',
    tbooking_id: '',
  });
  const [checkField, setCheckField] = useState({
    action: 'check_booking_number',
    tbooking_id: '',
  });

  const {setTicketData} = useContext(TokenConstextApi);
  const {setButtonShow} = useContext(TokenConstextApi);
  const {setShowButtonText} = useContext(TokenConstextApi);

  const handleChange = (name, value) => {
    setField({...field, [name]: value});
    setCheckField({...checkField, [name]: value});
  };

  const checkOpenTicket = () => {
    CHECK_OPEN_TICKET()
      .then(response => {
        if (
          response.status_code == 200 &&
          response.message == 'no_open_ticket_found'
        ) {
          setButtonShow(true);
          setShowButtonText('');
        } else {
          setButtonShow(false);
          setShowButtonText(response.message);
        }
      })
      .catch(err => {
        console.log(err, ' Network Error');
      });
  };

  const showDriverTicket = () => {
    SHOW_DRIVER_TICKET()
      .then(e => {
        if (e.message == 'Success') {
          console.log(e.tickets, 'aaaaaaaaaaaaaaaaaaaaa');
          setTicketData(e.tickets);
        }
      })
      .catch(err => {
        console.log(err, 'show Driver Ticket Error');
      });
  };

  // const checkBookingNumber = () => {
  //   CHECK_BOOKING_NUMBER(checkField)
  //     .then(async e => {
  //       console.log(e, 'runnnnnnnnnnnnnnn');

  //       if (e.status_code == 200) {
  //         await CREATE_TICKET_DRIVER(field)
  //           .then(e => {
  //             if (e.status_code == 200) {
  //               console.log('runnnnnnnnnnnnnnnnn1');
  //               setCreateTicketModal(false);
  //               checkOpenTicket(), showDriverTicket();
  //               Alert.alert(e.message);
  //               console.log('runnnnnnnnnnnnnnnnn2');
  //             } else {
  //               Alert.alert('Network Error');
  //             }
  //           })
  //           .catch(err => {
  //             console.log(err, 'Create Ticket Catch');
  //           });
  //       } else if (e.status_code == 400) {
  //         Alert.alert(e.message);
  //       }
  //     })
  //     .catch(err => {
  //       Alert.alert('Please Check the Ticket Booking No.');
  //     });
  // };

  const checkBookingNumber = () => {
    CHECK_BOOKING_NUMBER(checkField)
      .then(async e => {
        console.log(e, 'runnnnnnnnnnnnnnn');

        if (e.status_code == 200) {
          try {
            const result = await CREATE_TICKET_DRIVER(field);
            if (result.status_code == 200) {
              console.log('runnnnnnnnnnnnnnnnn1');
              setCreateTicketModal(false);
              Alert.alert('Success', result.message, [
                {
                  text: 'OK',
                  onPress: async () => {
                    await checkOpenTicket();
                    await showDriverTicket();
                    console.log('runnnnnnnnnnnnnnnnn2');
                  },
                },
              ]);
            } else {
              Alert.alert('Network Error');
            }
          } catch (err) {
            console.log(err, 'Create Ticket Catch');
            Alert.alert(
              'Error',
              'An error occurred while creating the ticket.',
            );
          }
        } else if (e.status_code == 400) {
          Alert.alert(e.message);
        }
      })
      .catch(err => {
        Alert.alert('Please Check the Ticket Booking No.');
      });
  };

  const handleCreateTicket = () => {
    if (!field.remarks || !field.tbooking_id) {
      Alert.alert('Please enter all required values');
      return;
    }
    checkBookingNumber();
  };

  // const handleCreateTicket = () => {};

  // const checkBookingNumber = () => {
  //   console.log(checkField, 'checkField Data');
  //   return new Promise((resolve, reject) => {
  //     CHECK_BOOKING_NUMBER(checkField)
  //       .then(response => {
  //         console.log(response, 'Booking Number Response');
  //         if (response.status_code === 200) {
  //           resolve(response); // Booking number check is successful
  //         } else {
  //           reject(response.message);
  //         }
  //       })
  //       .catch(err => {
  //         console.error('Booking number error:', err);
  //         reject('Network Error Booking No. Error');
  //       });
  //   });
  // };

  // const createDriverTicket = () => {
  //   console.log(field, 'field Data');
  //   return new Promise((resolve, reject) => {
  //     CREATE_TICKET_DRIVER(field)
  //       .then(response => {
  //         console.log(response, 'Create Ticket Response');
  //         if (response.status_code === 200) {
  //           resolve(response);
  //           Alert.alert(
  //             'Success',
  //             typeof response.message === 'string'
  //               ? response.message
  //               : 'Driver ticket created successfully',
  //           );
  //         } else {
  //           reject(response.message);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Create ticket error:', error);
  //         reject('Network Error');
  //       });
  //   });
  // };

  // const handleCreateTicket = () => {
  //   if (!field.remarks || !field.tbooking_id) {
  //     Alert.alert('Please enter all required values');
  //     return;
  //   }

  //   checkBookingNumber()
  //     .then(response => {
  //       // console.log(,"ttttttttttttttttttttt");
  //       // Booking check successful, proceed to create driver ticket
  //       if (response.status_code == 200) {
  //         createDriverTicket();
  //       } else {
  //         Alert.alert('Please Check Booking No.');
  //       }
  //     })
  //     .then(response => {
  //       // Driver ticket creation successful
  //       Alert.alert(
  //         'Success',
  //         typeof response.message === 'string'
  //           ? response.message
  //           : 'Driver ticket created successfully',
  //       );
  //     })
  //     .catch(error => {
  //       // Handle errors from both APIs
  //       if (
  //         error === 'Network Error Booking No. Error' ||
  //         error === 'Network Error'
  //       ) {
  //         Alert.alert('Error', 'Network error occurred. Please try again.');
  //       } else {
  //         Alert.alert(
  //           'Error',
  //           typeof error === 'string'
  //             ? error
  //             : 'Failed to create driver ticket',
  //         );
  //       }
  //     });
  // };

  return (
    <ScrollView>
      <View style={ticketModalStyles.container}>
        <View style={{flex: 1, padding: 10, elevation: 5}}>
          <View style={ticketModalStyles.modal}>
            <TouchableOpacity
              onPress={() => setCreateTicketModal(false)}
              style={ticketModalStyles.closeButton}>
              <Text style={ticketModalStyles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={ticketModalStyles.title}>Create Ticket</Text>

            <Text style={ticketModalStyles.label}>Booking Number:</Text>

            <TextInput
              style={ticketModalStyles.input}
              placeholder="Share Your Booking Number"
              onChangeText={value => handleChange('tbooking_id', value)}
              placeholderTextColor="#6c757d"
              value={field.tbooking_id}
            />

            <Text style={ticketModalStyles.label}>Description:</Text>

            <TextInput
              style={[ticketModalStyles.input, ticketModalStyles.textArea]}
              placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
              placeholderTextColor={AppColors.silverGrey}
              multiline
              value={field.remarks}
              onChangeText={value => handleChange('remarks', value)}
              numberOfLines={4}
            />

            <TouchableOpacity
              onPress={handleCreateTicket}
              style={ticketModalStyles.button}>
              <Text style={ticketModalStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ticketModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#e7e7e7',
  },
  modal: {
    // flex:1,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    padding: 20,
    position: 'relative', // Add this to position the close button
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Roboto-Medium',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    // backgroundColor: "#e7e7e7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: AppColors.black,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#e7e7e7',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: AppColors.black,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTicketModal;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import {AppColors} from '../../assets/Colors';
// import {CHECK_BOOKING_NUMBER, CREATE_TICKET_DRIVER} from '../../apis/Apis';

// const CreateTicketModal = ({setCreateTicketModal}) => {
//   const [field, setField] = useState({
//     action: 'create_driver_ticket',
//     remarks: '',
//     tbooking_id: '',
//   });

//   const handleChange = (name, value) => {
//     setField({...field, [name]: value});
//   };

//   const checkBookingNumber = () => {
//     // CHECK_BOOKING_NUMBER()
//   };

//   const createDriverTicket = () => {

//     CHECK_BOOKING_NUMBER()
//     .then((e)=>{
//       if(e.status_code === 200){

//         console.log(e, "booking Number");
//         Alert.alert(e.message)
//       }
//       else{
//         console.log(e.message,"else message");
//       }
//     })
//     .catch((err)=>{
//       console.log(err , "booking number errrr");
//     })

//     // CREATE_TICKET_DRIVER(field)
//     //   .then(response => {
//     //     Alert.alert(response.message);
//     //   })
//     //   .then(() => {
//     //     setCreateTicketModal(false);
//     //   })
//     //   .then()
//     //   .catch(error => {
//     //     console.log(error);
//     //     console.log(error, 'errrrrrrrrrrrrrrrrr');
//     //     Alert.alert(error);
//     //   });
//   };

//   return (
//     <ScrollView>
//       <View style={ticketModalStyles.container}>
//         <View style={{flex: 1, padding: 10, elevation: 5}}>
//           <View style={ticketModalStyles.modal}>
//             <TouchableOpacity
//               onPress={() => setCreateTicketModal(false)}
//               style={ticketModalStyles.closeButton}>
//               <Text style={ticketModalStyles.closeButtonText}>×</Text>
//             </TouchableOpacity>
//             <Text style={ticketModalStyles.title}>Create Ticket</Text>

//             <Text style={ticketModalStyles.label}>Booking Number:</Text>

//             <TextInput
//               style={ticketModalStyles.input}
//               placeholder="Share Your Booking Number"
//               onChangeText={value => handleChange('tbooking_id', value)}
//               placeholderTextColor="#6c757d"
//               value={field.tbooking_id}
//             />

//             <Text style={ticketModalStyles.label}>Description:</Text>

//             <TextInput
//               style={[ticketModalStyles.input, ticketModalStyles.textArea]}
//               placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
//               placeholderTextColor={AppColors.silverGrey}
//               multiline
//               value={field.remarks}
//               onChangeText={value => handleChange('remarks', value)}
//               numberOfLines={4}
//             />

//             <TouchableOpacity
//               onPress={createDriverTicket}
//               style={ticketModalStyles.button}>
//               <Text style={ticketModalStyles.buttonText}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const ticketModalStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.white,
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#e7e7e7',
//   },
//   modal: {
//     // flex:1,
//     margin: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#e7e7e7',
//     padding: 20,
//     position: 'relative', // Add this to position the close button
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     fontSize: 15,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//     fontFamily: 'Roboto-Medium',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#666',
//   },
//   input: {
//     // backgroundColor: "#e7e7e7",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     color: AppColors.black,
//     borderWidth: 1,
//     fontSize: 18,
//     borderColor: '#e7e7e7',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//     color: AppColors.black,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: AppColors.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CreateTicketModal;
