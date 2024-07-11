import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {SHOW_SINGLE_TICKET_DATA} from '../../apis/Apis';

const TicketDetailsModal = ({setTicketDetailsModal, ticketId}) => {
  const [ticketDetails, setTicketDetails] = useState({});

  const [field, setField] = useState({
    action: 'show_single_ticket_data',
    ticket_id: '128159',
  });


  useEffect(() => {
    setField(field => ({
      ...field,
      ticket_id: ticketId,
    }));
    getSingleTicketData();
  }, [ticketId]);

  const getSingleTicketData = () => {
    SHOW_SINGLE_TICKET_DATA(field)
      .then(e => {
        if (e.status_code == 200) {
        //   console.log(e.ticket_data, 'SHOW_SINGLE_TICKET_DATA');
          setTicketDetails(e.ticket_data);
        } else if(e.status_code == 500) {
          Alert.alert(e.message)
        }
      })
      .catch(err => {
        console.log(err, 'Error SHOW_SINGLE_TICKET_DATA');
      });
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setTicketDetailsModal(false)}
        style={styles.closeButton}>
        <Icon name="close" size={12} />
      </TouchableOpacity>
      <Text style={styles.title}>Ticket Details</Text>

      <View style={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsInnerContainer}>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Ticket ID : </Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.id }
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Created Date</Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.timestamp }
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Booking Number :</Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.booking_id }
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Status</Text>
              <Text style={styles.rightSectionText}>Close</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Description:</Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.support_require_for ||
                  'No description available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Closure Remark:</Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.closure_remarks || 'No closure remark available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.leftSectionText}>Closure Date</Text>
              <Text style={styles.rightSectionText}>
                {ticketDetails.closure_timestamp }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TicketDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
  },
  closeButton: {
    backgroundColor: AppColors.silverGrey,
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: AppColors.black,
    marginLeft: 20,
    fontFamily: AppFont.regularFont,
  },
  contentContainer: {
    margin: 20,
    flexDirection: 'row',
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    elevation: 1,
  },
  detailsInnerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: 'white',
    backgroundColor: '#f7f7f7',
  },
  contentView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  leftSectionText: {
    color: 'black',
    justifyContent: 'center',
    marginLeft: 7,
    alignContent: 'flex-start',
    fontSize: 17,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    flex: 1,
    paddingVertical: 10,
    fontFamily: AppFont.regularFont,
  },
  rightSectionText: {
    flex: 2,
    color: 'black',
    justifyContent: 'center',
    marginLeft: 7,
    fontSize: 15,
    fontFamily: AppFont.regularFont,
    letterSpacing: 0.4,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    alignContent: 'flex-start',
    padding: 5,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

// import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
// import React, {useContext} from 'react';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {AppColors} from '../../assets/Colors';
// import {AppFont} from '../../assets/FontsFamily';
// import {TokenConstextApi} from '../../context/GlobalContext';

// const TicketDetailsModal = ({setTicketDetailsModal}) => {
//   const {ticketsData} = useContext(TokenConstextApi);

//   // Ensure ticketsData is an array and has at least one item
//   const ticketDetails = Array.isArray(ticketsData) && ticketsData.length > 0 ? ticketsData[0] : {};

//   console.log(ticketDetails, 'ticketDetails');

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => setTicketDetailsModal(false)}
//         style={styles.closeButton}>
//         <Icon name="close" size={12} />
//       </TouchableOpacity>
//       <Text style={styles.title}>Ticket Details</Text>

//       <ScrollView style={styles.contentContainer}>
//         <View style={styles.detailsContainer}>
//           <View style={styles.detailsInnerContainer}>
//             <DetailRow label="Ticket ID" value={ticketDetails.id} />
//             <DetailRow label="Created Date" value={ticketDetails.timestamp} />
//             <DetailRow label="Booking Number" value={ticketDetails.booking_id} />
//             <DetailRow label="Status" value={ticketDetails.ticket_status} />
//             <DetailRow label="Description" value={ticketDetails.problem_statement} />
//             <DetailRow label="Closure Remark" value={ticketDetails.closure_remarks} />
//             <DetailRow label="Closure Date" value={ticketDetails.closure_timestamp} />
//             <DetailRow label="Created By" value={ticketDetails.created_by} />
//             <DetailRow label="Created For" value={ticketDetails.created_for} />
//             <DetailRow label="Category" value={ticketDetails.category} />
//             <DetailRow label="Support Owner" value={ticketDetails.support_owner} />
//             <DetailRow label="Ticket Type" value={ticketDetails.ticket_type} />
//             <DetailRow label="Name" value={ticketDetails.name} />
//             <DetailRow label="Mobile Number" value={ticketDetails.mobile_number} />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const DetailRow = ({label, value}) => (
//   <View style={styles.contentView}>
//     <Text style={styles.leftSectionText}>{label}:</Text>
//     <Text style={styles.rightSectionText}>{value || 'N/A'}</Text>
//   </View>
// );

// export default TicketDetailsModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     elevation: 3,
//   },
//   closeButton: {
//     backgroundColor: AppColors.silverGrey,
//     height: 20,
//     width: 20,
//     marginRight: 10,
//     marginTop: 10,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: AppColors.black,
//     marginLeft: 20,
//     fontFamily: AppFont.regularFont,
//   },
//   contentContainer: {
//     margin: 20,
//     flex: 1,
//   },
//   detailsContainer: {
//     flex: 1,
//     elevation: 1,
//   },
//   detailsInnerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     elevation: 3,
//     shadowColor: 'white',
//     backgroundColor: '#f7f7f7',
//   },
//   contentView: {
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     flexDirection: 'row',
//   },
//   leftSectionText: {
//     color: 'black',
//     fontSize: 17,
//     padding: 10,
//     flex: 1,
//     fontFamily: AppFont.regularFont,
//   },
//   rightSectionText: {
//     flex: 2,
//     color: 'black',
//     fontSize: 15,
//     fontFamily: AppFont.regularFont,
//     letterSpacing: 0.4,
//     borderLeftWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: 'white',
//     padding: 10,
//   },
// });

// // // import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// // // import React, {useContext} from 'react';
// // // import Icon from 'react-native-vector-icons/dist/FontAwesome';
// // // import {AppColors} from '../../assets/Colors';
// // // import {AppFont} from '../../assets/FontsFamily';
// // // import {TokenConstextApi} from '../../context/GlobalContext';

// // // const TicketDetailsModal = ({setTicketDetailsModal}) => {
// // //   const {ticketsData} = useContext(TokenConstextApi);

// // //   const ticketDetails = ticketsData || {};

// // //   console.log(ticketDetails, 'ticketDetails');

// // //   return (
// // //     <View
// // //       style={{
// // //         flex: 1,
// // //         backgroundColor: 'white',
// // //         borderRadius: 5,
// // //         elevation: 3,
// // //       }}>
// // //       <TouchableOpacity
// // //         onPress={() => setTicketDetailsModal(false)}
// // //         style={{
// // //           backgroundColor: AppColors.silverGrey,
// // //           height: 20,
// // //           width: 20,
// // //           marginRight: 10,
// // //           marginTop: 10,
// // //           borderRadius: 10,
// // //           justifyContent: 'center',
// // //           alignItems: 'center',
// // //           alignSelf: 'flex-end',
// // //         }}>
// // //         <Icon name="close" size={12} />
// // //       </TouchableOpacity>
// // //       <Text
// // //         style={{
// // //           fontWeight: 'bold',
// // //           fontSize: 30,
// // //           color: AppColors.black,
// // //           marginLeft: 20,
// // //           fontFamily: AppFont.regularFont,
// // //         }}>
// // //         Ticket Details
// // //       </Text>

// // //       <View
// // //         style={{
// // //           margin: 20,
// // //           //   borderWidth: 1,
// // //           //   borderColor: 'black',
// // //           flexDirection: 'row',
// // //           flex: 1,
// // //         }}>
// // //         <View style={{flex: 1, elevation: 1}}>
// // //           <View
// // //             style={{
// // //               borderWidth: 1,
// // //               borderColor: '#ccc',
// // //               elevation: 3,
// // //               shadowColor: 'white',
// // //               backgroundColor: '#f7f7f7',
// // //             }}>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Ticket ID : </Text>
// // //               <Text style={styles.rightSectionText}>{ticketsData.id}</Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Created Date</Text>
// // //               <Text style={styles.rightSectionText}>
// // //                 {ticketsData.timestamp}
// // //               </Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Booking Number :</Text>
// // //               <Text style={styles.rightSectionText}>
// // //                 {ticketsData.booking_id}
// // //               </Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>STatus</Text>
// // //               <Text style={styles.rightSectionText}>Close</Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Description:</Text>
// // //               <Text style={styles.rightSectionText}>
// // //                 Is booking par customer ne na to Extra KM ka pay kiya or nahi
// // //                 Overtime ka Pay kiya Maine total 7:5 HRS duty ki thi jabki ye
// // //                 one way drop tha kripya customer se baat kare or mere paise
// // //                 delwaye
// // //               </Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Closure Remark:</Text>
// // //               <Text style={styles.rightSectionText}>
// // //                 Is booking par customer ne na to Extra KM ka pay kiya or nahi
// // //                 Overtime ka Pay kiya Maine total 7:5 HRS duty ki thi jabki ye
// // //                 one way drop tha kripya customer se baat kare or mere paise
// // //                 delwaye
// // //               </Text>
// // //             </View>
// // //             <View style={styles.contentView}>
// // //               <Text style={styles.leftSectionText}>Closure Date</Text>
// // //               <Text style={styles.rightSectionText}>2024-06-22 11:08:06</Text>
// // //             </View>
// // //           </View>
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // export default TicketDetailsModal;

// // // const styles = StyleSheet.create({
// // //   contentView: {
// // //     borderBottomWidth: 1,

// // //     borderColor: '#ccc',
// // //     flexDirection: 'row',
// // //   },

// // //   leftSectionText: {
// // //     color: 'black',
// // //     justifyContent: 'center',
// // //     marginLeft: 7,
// // //     alignContent: 'flex-start',
// // //     fontSize: 17,
// // //     padding: 5,
// // //     alignItems: 'center',
// // //     alignSelf: 'center',
// // //     paddingLeft: 10,
// // //     flex: 1,
// // //     paddingVertical: 10,

// // //     fontFamily: AppFont.regularFont,
// // //     // borderBottomWidth: 1,
// // //   },
// // //   rightSectionText: {
// // //     flex: 2,
// // //     color: 'black',
// // //     justifyContent: 'center',
// // //     marginLeft: 7,
// // //     fontSize: 15,
// // //     fontFamily: AppFont.regularFont,
// // //     letterSpacing: 0.4,
// // //     borderLeftWidth: 1,
// // //     borderColor: '#ccc',
// // //     backgroundColor: 'white',
// // //     alignContent: 'flex-start',
// // //     padding: 5,
// // //     paddingVertical: 10,
// // //     paddingLeft: 10,
// // //   },
// // // });
