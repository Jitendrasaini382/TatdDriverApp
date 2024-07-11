// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// import React, {useEffect, useState} from 'react';
// import Header from '../components/Header';
// import Modal from 'react-native-modal';
// import {AppFont} from '../assets/FontsFamily';
// import {AppColors} from '../assets/Colors';

// import {SHOW_DRIVER_TICKET} from '../apis/Apis';
// import CreateTicketModal from '../components/modal/CreateTicketModal';
// import AccordionData from '../components/AccordianData';
// import TicketDetailsModal from '../components/modal/TicketDetailsModal';

// // {/* Show Ticket data component start*/}

// const TicketList = () => {
//   const [ticketsData, setTicketData] = useState([]);
//   const [ticketDetailsModal, setTicketDetailsModal] = useState(false);

//   const showDriverTicket = () => {
//     SHOW_DRIVER_TICKET()
//       .then(e => {
//         if (e.message == 'Success') {
//           setTicketData(e.tickets);

//           console.log(e.tickets, 'show Driver Tcket');
//         }
//       })
//       .catch(err => {
//         console.log(err, 'show Driver Ticket Error');
//       });
//   };

//   useEffect(() => {
//     showDriverTicket();
//   }, []);

//   const renderItem = (item, index) => (
//     <View key={item.id} style={[styles.row, index === 0 && styles.firstRow]}>
//       <TouchableOpacity
//         onPress={()=>setTicketDetailsModal(true)}
//         style={styles.cell}>
//         <Text style={styles.cellText}>{item.id}</Text>
//       </TouchableOpacity>
//       <View style={[styles.cell, styles.middleCell]}>
//         <Text style={styles.cellText}>{item.timestamp}</Text>
//       </View>
//       <View style={styles.cell}>
//         <View
//           style={[
//             styles.statusButton,
//             index === 0 && styles.firstStatusButton,
//           ]}>
//           <Text
//             style={[styles.statusText, index === 0 && styles.firstStatusText]}>
//             {item.ticket_status}
//           </Text>
//         </View>
//       </View>
//       <Modal
//           backdropOpacity={0}
//           onBackdropPress={() => setTicketDetailsModal(false)}
//           animationIn={'fadeInDown'}
//           animationOut={'fadeOutUp'}
//           isVisible={ticketDetailsModal}>
//           <TicketDetailsModal setTicketDetailsModal={setTicketDetailsModal} ticketsData={ticketsData} />
//         </Modal>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerCell}>
//           <Text style={styles.headerText}>Ticket ID</Text>
//         </View>
//         <View style={[styles.headerCell, styles.middleHeaderCell]}>
//           <Text style={styles.headerText}>Created Date</Text>
//         </View>
//         <View style={styles.headerCell}>
//           <Text style={styles.headerText}>Status</Text>
//         </View>
//       </View>
//       {/* {dummyData.map((item, index) => renderItem(item, index))} */}
//       {ticketsData && ticketsData.map((item, index) => renderItem(item, index))}
//     </View>
//   );
// };

// // {/* Show Ticket data component end */}

// //  {/* faqdata component start */}

// // const AccordionItem = ({title, content, onPress, expanded, isInner}) => (
// //   <View
// //     style={
// //       isInner
// //         ? accordianStyles.innerAccordionItem
// //         : accordianStyles.accordionItem
// //     }>
// //     <Pressable onPress={onPress}>
// //       <View style={accordianStyles.itemHeader}>
// //         <Text style={accordianStyles.headerText}>{title}</Text>
// //         <Icon name={expanded ? 'minus' : 'plus'} size={12} color={'#007bff'} />
// //       </View>
// //     </Pressable>
// //     {expanded && <View style={accordianStyles.itemContent}>{content}</View>}
// //   </View>
// // );

// // const Accordion = ({data, expandedIndexes, toggleIndex}) => (
// //   <View style={accordianStyles.innerAccordion}>
// //     {data.map((item, index) => (
// //       <AccordionItem
// //         key={item.faq_question}
// //         title={item.faq_question}
// //         content={
// //           <Text style={accordianStyles.contentText}>{item.faq_answer}</Text>
// //         }
// //         expanded={expandedIndexes.includes(index)}
// //         onPress={() => toggleIndex(index)}
// //         isInner={true}
// //       />
// //     ))}
// //   </View>
// // );

// // const AccordionData = () => {
// //   const [expandedParentIndexes, setExpandedParentIndexes] = useState([]);
// //   const [expandedChildIndexes, setExpandedChildIndexes] = useState({});

// //   const [faqData, setFaqData] = useState([]);

// //   const getFaqData = () => {
// //     DRIVER_FAQ()
// //       .then(e => {
// //         if (e.status_code == '200') {
// //           setFaqData(e.faq_data);
// //         } else {
// //           console.log('Loading Faq Data');
// //         }

// //         // console.log(e, "faq data");
// //       })
// //       .catch(err => {
// //         console.log(err, 'faq errrtrtr');
// //       });
// //   };

// //   useEffect(() => {
// //     getFaqData();
// //   }, []);

// //   // Group the faq_data by faq_header
// //   const groupedData =
// //     faqData &&
// //     faqData.reduce((acc, item) => {
// //       if (!acc[item.faq_header]) {
// //         acc[item.faq_header] = [];
// //       }
// //       acc[item.faq_header].push(item);
// //       return acc;
// //     }, {});

// //   const data = Object.entries(groupedData).map(([header, questions]) => ({
// //     title: header,
// //     content: questions,
// //   }));

// //   const toggleParentAccordion = index => {
// //     animateLayout();
// //     setExpandedParentIndexes(prev =>
// //       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
// //     );
// //   };

// //   const toggleChildAccordion = (parentIndex, childIndex) => {
// //     animateLayout();
// //     setExpandedChildIndexes(prev => ({
// //       ...prev,
// //       [parentIndex]: prev[parentIndex]?.includes(childIndex)
// //         ? prev[parentIndex].filter(i => i !== childIndex)
// //         : [...(prev[parentIndex] || []), childIndex],
// //     }));
// //     if (!expandedParentIndexes.includes(parentIndex)) {
// //       setExpandedParentIndexes(prev => [...prev, parentIndex]);
// //     }
// //   };

// //   const animateLayout = () => {
// //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
// //   };

// //   return (
// //     <SafeAreaView style={accordianStyles.content}>
// //       {data.map((parentItem, parentIndex) => (
// //         <AccordionItem
// //           key={parentItem.title}
// //           title={parentItem.title}
// //           expanded={expandedParentIndexes.includes(parentIndex)}
// //           onPress={() => toggleParentAccordion(parentIndex)}
// //           content={
// //             <Accordion
// //               data={parentItem.content}
// //               toggleIndex={childIndex =>
// //                 toggleChildAccordion(parentIndex, childIndex)
// //               }
// //               expandedIndexes={expandedChildIndexes[parentIndex] || []}
// //             />
// //           }
// //         />
// //       ))}
// //     </SafeAreaView>
// //   );
// // };
// // const accordianStyles = StyleSheet.create({
// //   content: {
// //     backgroundColor: AppColors.white,
// //     // padding: 10,
// //   },
// //   accordionItem: {
// //     marginBottom: 10,
// //     borderRadius: 5,
// //     overflow: 'hidden',
// //     borderWidth: 1,
// //     borderColor: '#e0e0e0',
// //   },
// //   innerAccordion: {
// //     // borderTopWidth: 1,
// //     borderTopColor: '#e0e0e0',
// //   },
// //   innerAccordionItem: {
// //     // borderBottomWidth: 1,
// //     borderBottomColor: '#e0e0e0',
// //   },
// //   itemHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: '#f0f0f0',
// //     paddingHorizontal: 15,
// //     paddingVertical: 8,
// //   },
// //   headerText: {
// //     color: AppColors.black,
// //     flex: 1,
// //     fontSize: 13,
// //     fontWeight: 'bold',
// //   },
// //   itemContent: {
// //     backgroundColor: '#f0f0f0',
// //   },
// //   contentText: {
// //     color: AppColors.black,
// //     paddingHorizontal: 15,
// //     fontSize: 13,
// //   },
// // });

// // {/* faqdata component end */}

// // {/* create Ticket Modal Start */}

// // const CreateTicketModal = ({setCreateTicketModal}) => {
// //   const [field, setField] = useState({
// //     action: 'create_driver_ticket',
// //     remarks: '',
// //     tbooking_id: '',
// //   });
// //   const [checkField, setCheckField] = useState({
// //     action: 'check_booking_number',
// //     tbooking_id: '',
// //   });

// //   const handleChange = (name, value) => {
// //     setField({...field, [name]: value});
// //     setCheckField({...checkField, [name]: value});
// //   };

// //   const checkBookingNumber = () => {
// //     CHECK_BOOKING_NUMBER(checkField)
// //       .then(e => {
// //         if (e.status_code == 200) {
// //           console.log(e, 'booking Number');
// //           Alert.alert(e.message);
// //           createDriverTicket();
// //         } else {
// //          Alert.alert(e.message)

// //           console.log(e.message, 'else message');
// //         }
// //       })
// //       .catch(err => {
// //         console.log(err, 'booking number errrr');
// //       });
// //   };

// //   const createDriverTicket = () => {
// //     CREATE_TICKRT_DRIVER(field)
// //       .then(response => {
// //         Alert.alert(response.message);
// //       })
// //       .then(() => {
// //         setCreateTicketModal(false);
// //       })
// //       .then()
// //       .catch(error => {
// //         console.log(error);
// //         console.log(error, 'errrrrrrrrrrrrrrrrr');
// //         Alert.alert(error);
// //       });
// //   };

// //   const submitTicketCreate = () => {
// //     checkBookingNumber();
// //     SHOW_DRIVER_TICKET()
// //   };

// //   return (
// //     <ScrollView>
// //       <View style={ticketModalStyles.container}>
// //         <View style={{flex: 1, padding: 10, elevation: 5}}>
// //           <View style={ticketModalStyles.modal}>
// //             <TouchableOpacity
// //               onPress={() => setCreateTicketModal(false)}
// //               style={ticketModalStyles.closeButton}>
// //               <Text style={ticketModalStyles.closeButtonText}>×</Text>
// //             </TouchableOpacity>
// //             <Text style={ticketModalStyles.title}>Create Ticket</Text>

// //             <Text style={ticketModalStyles.label}>Booking Number:</Text>

// //             <TextInput
// //               style={ticketModalStyles.input}
// //               placeholder="Share Your Booking Number"
// //               onChangeText={value => handleChange('tbooking_id', value)}
// //               placeholderTextColor="#6c757d"
// //               value={field.tbooking_id}
// //             />

// //             <Text style={ticketModalStyles.label}>Description:</Text>

// //             <TextInput
// //               style={[ticketModalStyles.input, ticketModalStyles.textArea]}
// //               placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
// //               placeholderTextColor={AppColors.silverGrey}
// //               multiline
// //               value={field.remarks}
// //               onChangeText={value => handleChange('remarks', value)}
// //               numberOfLines={4}
// //             />

// //             <TouchableOpacity
// //               onPress={submitTicketCreate}
// //               style={ticketModalStyles.button}>
// //               <Text style={ticketModalStyles.buttonText}>Create</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const ticketModalStyles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: AppColors.white,
// //     borderWidth: 2,
// //     borderRadius: 10,
// //     borderColor: '#e7e7e7',
// //   },
// //   modal: {
// //     // flex:1,
// //     margin: 10,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: '#e7e7e7',
// //     padding: 20,
// //     position: 'relative', // Add this to position the close button
// //   },
// //   closeButton: {
// //     position: 'absolute',
// //     top: 5,
// //     right: 5,
// //     width: 20,
// //     height: 20,
// //     borderRadius: 10,
// //     backgroundColor: '#e0e0e0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   closeButtonText: {
// //     fontSize: 15,
// //     color: '#333',
// //     fontWeight: 'bold',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     color: '#333',
// //     fontFamily: 'Roboto-Medium',
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 5,
// //     color: '#666',
// //   },
// //   input: {
// //     // backgroundColor: "#e7e7e7",
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 15,
// //     color: AppColors.black,
// //     borderWidth: 1,
// //     fontSize: 18,
// //     borderColor: '#e7e7e7',
// //   },
// //   textArea: {
// //     height: 100,
// //     textAlignVertical: 'top',
// //     color: AppColors.black,
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     borderRadius: 5,
// //     padding: 15,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: AppColors.white,
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // {/* create Ticket Modal end */}

// // {/* Main Component Start */}

// const TicketsDriver = () => {
//   const [createTicketModal, setCreateTicketModal] = useState(false);
//   return (
//     <SafeAreaView style={styles.safeAreaView}>
//       <Header backButton={true} />

//       <ScrollView style={{margin: 15}}>
//         <AccordionData />

//         <TouchableOpacity
//           onPress={() => setCreateTicketModal(true)}
//           style={styles.button}>
//           <Text style={styles.buttonText}>Create Ticket</Text>
//         </TouchableOpacity>

//         <Modal
//           backdropOpacity={0}
//           onBackdropPress={() => setCreateTicketModal(false)}
//           animationIn={'fadeInDown'}
//           animationOut={'fadeOutUp'}
//           isVisible={createTicketModal}>
//           <CreateTicketModal setCreateTicketModal={setCreateTicketModal} />
//         </Modal>

//         {/* TicketDetails modal */}

//         <TicketList  />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaView: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: 1,
//     backgroundColor: AppColors.white,
//   },
//   container: {
//     borderWidth: 1,
//     borderColor: AppColors.borderColor,
//     backgroundColor: AppColors.white,
//   },
//   header: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: AppColors.borderColor,

//     backgroundColor: '#f8f8f8',
//   },
//   headerCell: {
//     flex: 1,
//     padding: 10,
//   },
//   middleHeaderCell: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: AppColors.borderColor,
//   },
//   headerText: {
//     color: '#888',
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: AppColors.borderColor,
//   },
//   firstRow: {
//     backgroundColor: '#f0f8ff',
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//   },
//   middleCell: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: AppColors.borderColor,
//   },
//   cellText: {
//     color: '#333',
//   },
//   statusButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   firstStatusButton: {
//     backgroundColor: '#1e90ff',
//   },
//   statusText: {
//     color: '#333',
//   },
//   firstStatusText: {
//     color: AppColors.white,
//   },

//   bottamView: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderWidth: 1,
//     backgroundColor: '#f7f7f7',
//     borderColor: AppColors.borderColor,
//   },
//   bottamText: {
//     color: 'rgb(65, 84, 98)',
//     fontFamily: AppFont.regularFont,
//     padding: 5,
//   },
//   button: {
//     backgroundColor: '#00A1E0',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 5,
//     marginTop: 15,
//   },
//   buttonText: {
//     color: AppColors.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// // {/* Main Component end */}

// export default TicketsDriver;

/////////////////////////////////////////////////////////////////////////////////

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {AppFont} from '../assets/FontsFamily';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../assets/Colors';

import {
  DRIVER_FAQ,
  CHECK_BOOKING_NUMBER,
  CREATE_TICKRT_DRIVER,
  SHOW_DRIVER_TICKET,
} from '../apis/Apis';
import TicketDetails from '../components/modal/TicketDetailsModal';
import {TokenConstextApi} from '../context/GlobalContext';

// {/* Show Ticket data component start*/}

const TicketList = ({setTicketDetailsModal}) => {
  // const [ticketsData, setTicketData] = useState([]);
  const {ticketsData} = useContext(TokenConstextApi);
  const {setTicketData} = useContext(TokenConstextApi);
  const {selectedTicketId} = useContext(TokenConstextApi);

  const {setSelectedTicketId} = useContext(TokenConstextApi);

  const showDriverTicket = () => {
    SHOW_DRIVER_TICKET()
      .then(e => {
        if (e.message == 'Success') {
          setTicketData(e.tickets);

          // console.log(e.tickets, 'show Driver Tcket');
        }
      })
      .catch(err => {
        console.log(err, 'show Driver Ticket Error');
      });
  };

  useEffect(() => {
    showDriverTicket();
  }, []);

  const renderItem = (item, index) => (
    <View key={item.id} style={[styles.row, index === 0 && styles.firstRow]}>
      <TouchableOpacity
        onPress={() => {
          setTicketDetailsModal(true), setSelectedTicketId(item.id);
        }}
        style={styles.cell}>
        <Text style={styles.cellText}>{item.id}</Text>
      </TouchableOpacity>
      <View style={[styles.cell, styles.middleCell]}>
        <Text style={styles.cellText}>{item.timestamp}</Text>
      </View>
      <View style={styles.cell}>
        <View
          style={[
            styles.statusButton,
            index === 0 && styles.firstStatusButton,
          ]}>
          <Text
            style={[styles.statusText, index === 0 && styles.firstStatusText]}>
            {item.ticket_status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Ticket ID</Text>
        </View>
        <View style={[styles.headerCell, styles.middleHeaderCell]}>
          <Text style={styles.headerText}>Created Date</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Status</Text>
        </View>
      </View>
      {/* {dummyData.map((item, index) => renderItem(item, index))} */}
      {ticketsData && ticketsData.map((item, index) => renderItem(item, index))}
    </View>
  );
};

// {/* Show Ticket data component end */}

//  {/* faqdata component start */}

const AccordionItem = ({title, content, onPress, expanded, isInner}) => (
  <View
    style={
      isInner
        ? accordianStyles.innerAccordionItem
        : accordianStyles.accordionItem
    }>
    <Pressable onPress={onPress}>
      <View style={accordianStyles.itemHeader}>
        <Text style={accordianStyles.headerText}>{title}</Text>
        <Icon name={expanded ? 'minus' : 'plus'} size={12} color={'#007bff'} />
      </View>
    </Pressable>
    {expanded && <View style={accordianStyles.itemContent}>{content}</View>}
  </View>
);

const Accordion = ({data, expandedIndexes, toggleIndex}) => (
  <View style={accordianStyles.innerAccordion}>
    {data.map((item, index) => (
      <AccordionItem
        key={item.faq_question}
        title={item.faq_question}
        content={
          <Text style={accordianStyles.contentText}>{item.faq_answer}</Text>
        }
        expanded={expandedIndexes.includes(index)}
        onPress={() => toggleIndex(index)}
        isInner={true}
      />
    ))}
  </View>
);

const AccordionData = () => {
  const [expandedParentIndexes, setExpandedParentIndexes] = useState([]);
  const [expandedChildIndexes, setExpandedChildIndexes] = useState({});

  const [faqData, setFaqData] = useState([]);

  const getFaqData = () => {
    DRIVER_FAQ()
      .then(e => {
        if (e.status_code == '200') {
          setFaqData(e.faq_data);
        } else {
          console.log('Loading Faq Data');
        }

        // console.log(e, "faq data");
      })
      .catch(err => {
        console.log(err, 'faq errrtrtr');
      });
  };

  useEffect(() => {
    getFaqData();
  }, []);

  // Group the faq_data by faq_header
  const groupedData =
    faqData &&
    faqData.reduce((acc, item) => {
      if (!acc[item.faq_header]) {
        acc[item.faq_header] = [];
      }
      acc[item.faq_header].push(item);
      return acc;
    }, {});

  const data = Object.entries(groupedData).map(([header, questions]) => ({
    title: header,
    content: questions,
  }));

  const toggleParentAccordion = index => {
    animateLayout();
    setExpandedParentIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const toggleChildAccordion = (parentIndex, childIndex) => {
    animateLayout();
    setExpandedChildIndexes(prev => ({
      ...prev,
      [parentIndex]: prev[parentIndex]?.includes(childIndex)
        ? prev[parentIndex].filter(i => i !== childIndex)
        : [...(prev[parentIndex] || []), childIndex],
    }));
    if (!expandedParentIndexes.includes(parentIndex)) {
      setExpandedParentIndexes(prev => [...prev, parentIndex]);
    }
  };

  const animateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <SafeAreaView style={accordianStyles.content}>
      {data.map((parentItem, parentIndex) => (
        <AccordionItem
          key={parentItem.title}
          title={parentItem.title}
          expanded={expandedParentIndexes.includes(parentIndex)}
          onPress={() => toggleParentAccordion(parentIndex)}
          content={
            <Accordion
              data={parentItem.content}
              toggleIndex={childIndex =>
                toggleChildAccordion(parentIndex, childIndex)
              }
              expandedIndexes={expandedChildIndexes[parentIndex] || []}
            />
          }
        />
      ))}
    </SafeAreaView>
  );
};
const accordianStyles = StyleSheet.create({
  content: {
    backgroundColor: AppColors.white,
    // padding: 10,
  },
  accordionItem: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  innerAccordion: {
    // borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  innerAccordionItem: {
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  headerText: {
    color: AppColors.black,
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemContent: {
    backgroundColor: '#f0f0f0',
  },
  contentText: {
    color: AppColors.black,
    paddingHorizontal: 15,
    fontSize: 13,
  },
});

// {/* faqdata component end */}

// {/* create Ticket Modal Start */}

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

  const handleChange = (name, value) => {
    setField({...field, [name]: value});
    setCheckField({...checkField, [name]: value});
  };

  const checkBookingNumber = () => {
    CHECK_BOOKING_NUMBER(checkField)
      .then(e => {
        if (e.status_code == 200) {
          console.log(e, 'booking Number');
          Alert.alert(e.message);
          // console.log(e.status, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
          createDriverTicket();
        } else {
          Alert.alert(e.message);
          //
          console.log(e.message, 'else message');
        }
      })
      .catch(err => {
        console.log(err, 'booking number errrr');
      });
  };

  const createDriverTicket = () => {
    CREATE_TICKRT_DRIVER(field)
      .then(response => {
        Alert.alert(response.message);
      })
      .then(() => {
        setCreateTicketModal(false);
      })
      .then()
      .catch(error => {
        console.log(error);
        console.log(error, 'errrrrrrrrrrrrrrrrr');
        Alert.alert(error);
      });
  };

  const submitTicketCreate = () => {
    checkBookingNumber();
    // SHOW_DRIVER_TICKET()
  };

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
              onPress={submitTicketCreate}
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

// {/* create Ticket Modal end */}

// {/* Main Component Start */}

const TicketsDriver = () => {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [ticketDetailsModal, setTicketDetailsModal] = useState(false);
  const {selectedTicketId} = useContext(TokenConstextApi);

  console.log(selectedTicketId, 'llllllllllllllllllllllllllllllll');

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backButton={true} />

      <ScrollView style={{margin: 15}}>
        <AccordionData />

        <TouchableOpacity
          onPress={() => setCreateTicketModal(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>Create Ticket</Text>
        </TouchableOpacity>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setCreateTicketModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={createTicketModal}>
          <CreateTicketModal setCreateTicketModal={setCreateTicketModal} />
        </Modal>

        {/* TicketDetails modal */}

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setTicketDetailsModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={ticketDetailsModal}>
          <TicketDetails
            setTicketDetailsModal={setTicketDetailsModal}
            ticketId={selectedTicketId}
          />
        </Modal>

        <TicketList setTicketDetailsModal={setTicketDetailsModal} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,

    backgroundColor: '#f8f8f8',
  },
  headerCell: {
    flex: 1,
    padding: 10,
  },
  middleHeaderCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.borderColor,
  },
  headerText: {
    color: '#888',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,
  },
  firstRow: {
    backgroundColor: '#f0f8ff',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  middleCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.borderColor,
  },
  cellText: {
    color: '#333',
  },
  statusButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  firstStatusButton: {
    backgroundColor: '#1e90ff',
  },
  statusText: {
    color: '#333',
  },
  firstStatusText: {
    color: AppColors.white,
  },

  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: AppColors.borderColor,
  },
  bottamText: {
    color: 'rgb(65, 84, 98)',
    fontFamily: AppFont.regularFont,
    padding: 5,
  },
  button: {
    backgroundColor: '#00A1E0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// {/* Main Component end */}

export default TicketsDriver;
