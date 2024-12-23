// // const CancelBooking = () => {
// //     return (
// //       <View
// //         style={{
// //           marginTop: 30,
// //           padding: 10,
// //         }}>
// //         <View
// //           style={{
// //             borderColor: 'rgb(128,128,128)',
// //             backgroundColor: AppColors.white,
// //             borderWidth: 1,
// //             borderStyle: 'solid',
// //             borderRadius: 8,
// //             lineHeight: 20,
// //             shadowColor: 'rgb(128,128,128)',
// //             shadowOffset: {width: 5, height: 4},
// //             shadowOpacity: 5,
// //             elevation: 5,
// //             shadowRadius: 5,
// //             marginBottom: 20,
// //             padding: 10,
// //           }}>
// //           <View style={{padding: 14, alignItems: 'flex-start'}}>
// //             <Text
// //               style={{
// //                 textAlign: 'auto',
// //                 color: AppColors.black,
// //                 fontWeight: '700',
// //                 fontSize: 21,
// //                 fontFamily: 'Poppins',
// //               }}>
// //               Booking is Already Cancelled{' '}
// //             </Text>
// //           </View>
// //         </View>
// //       </View>
// //     );
// //   };



// const AcceptBooking = ({modalShow, booking}) => {
//     const [packageDetailsDutyReportUpdate, setPackageDetailsDutyReportUpdate] =
//       useState(false);
  
//     const handleSwipe = () => {
//       modalShow();
//     };
  
//     const openPhoneDialer = () => {
//       const phoneNumber = '9810360792';
//       let url = `tel:${phoneNumber}`;
  
//       Linking.openURL(url)
//         .then(() => console.log('Phone dialer opened successfully'))
//         .catch(err => {
//           console.error('Error opening phone dialer:', err);
//         });
//     };
  
//     return (
//       <ScrollView style={{flex: 1}}>
//         <View style={styles.mainView}>
//           {/* top */}
//           <View style={styles.topSection}>
//             <Text style={styles.interviewTimeText}>
//               Interview Time- {booking.booking_date}
//             </Text>
//           </View>
//           <View style={styles.bookingSection}>
//             <View>
//               <Text style={styles.bookingNoText}>Booking No : #431062</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => setPackageDetailsDutyReportUpdate(true)}
//               style={styles.packageDetailsButton}>
//               <Text style={styles.packageDetailsText}>Package Details</Text>
//             </TouchableOpacity>
//           </View>
//           <Modal
//             transparent={true}
//             animationType="slide"
//             visible={packageDetailsDutyReportUpdate}
//             onRequestClose={() => setPackageDetailsDutyReportUpdate(false)}>
//             <PackageDetailsDutyReportUpdate
//               setPackageDetailsDutyReportUpdate={
//                 setPackageDetailsDutyReportUpdate
//               }
//               // tripDetails={selectedTrip}
//             />
//           </Modal>
//           {/* middle */}
//           <View style={styles.middleSection}>
//             <View style={styles.nameTypeContainer}>
//               <Text style={styles.nameText}>Sagar Saxena</Text>
//               <Text style={styles.typeText}>Permanent</Text>
//             </View>
//             <View style={styles.addressCallContainer}>
//               <View>
//                 <View style={styles.addressContainer}>
//                   <Image
//                     source={Address}
//                     resizeMode="contain"
//                     style={styles.addressIcon}
//                   />
//                   <Text style={styles.addressText}>D-51 A 2nd Floor</Text>
//                 </View>
//                 <View style={styles.addressContainer}>
//                   <Image
//                     source={Address}
//                     resizeMode="contain"
//                     style={styles.addressIcon}
//                   />
//                   <Text style={styles.addressText}>Noida Floor</Text>
//                 </View>
//               </View>
  
//               <TouchableOpacity
//                 style={styles.callingGif}
//                 onPress={openPhoneDialer}>
//                 {/* <View style={styles.callingGif}> */}
//                 <Image
//                   style={{width: '100%', height: '100%'}}
//                   source={CallingGif}
//                   resizeMode="cover"
//                 />
//                 {/* </View> */}
//               </TouchableOpacity>
//             </View>
//           </View>
  
//           {/* bottom */}
//           <View
//             style={{
//               elevation: 1,
//               borderRadius: 5,
//               borderWidth: 1,
//               backgroundColor: '#f7f7f7',
//               borderColor: '#ccc',
//               padding: 15,
//             }}>
//             <RadioButtonWithTitle booking={booking} />
//             <SwipeableButton onSwipe={handleSwipe} />
  
//             <View style={{marginTop: 20}}>
//               <YoutubePlayer
//                 height={200}
//                 // autoPlay={false}
//                 videoId={'SsG_qwb0zLs'}
//               />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     );
//   };