// import React, { useState } from 'react';
// import {
//   Text,
//   SafeAreaView,
//   LayoutAnimation,
//   StyleSheet,
//   View,
//   Pressable,
// } from 'react-native';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import { AppColors } from '../assets/Colors';

// const AccordionItem = ({ title, content, onPress, expanded }) => {
//   return (
//     <View style={styles.accordionItem}>
//       <Pressable onPress={onPress}>
//         <View style={styles.itemHeader}>
//           <Text style={styles.headerText}>{title}</Text>
//           <AntDesignIcon name={expanded ? 'minus' : 'plus'} size={20} color="white" />
//         </View>
//       </Pressable>
//       {expanded && <View style={styles.itemContent}>{content}</View>}
//     </View>
//   );
// };

// const Accordion = ({ titles, children, expandedIndexes, toggleIndex }) => {
//   return (
//     <View>
//       {titles.map((title, index) => (
//         <AccordionItem
//           key={title}
//           title={title}
//           content={children(index)}
//           expanded={expandedIndexes.includes(index)}
//           onPress={() => toggleIndex(index)}
//         />
//       ))}
//     </View>
//   );
// };

// const AppAccordion = () => {
//   const [expandedIndexes, setExpandedIndexes] = useState([]);
//   const [parentExpanded, setParentExpanded] = useState(false);
//   const titles = ["How to Make it Easier for me to Get Work in the Future?", "How can I reduce the company commission on my earnings?", "What benefit will I get from the Agent Panel?", "What benefit will I get from the booking agency?", "Do I have to pay panel fees every month?", "The company doesn't take a commission on overtime or night charges", "When will I get an outstation booking?", "How are night charges calculated?"];

//   const areas = [
//     'First - Only accept bookings that you can complete on time.Second - After accepting a booking, completing it will improve your booking score and you will start getting more work. If you cancel too many bookings, you will get less work.Third - The better the customers rate you, the more work you will receive.',
//     "More work, less commission. If you work above Rs 3600 in the last 7 days, you will get only 17% commission. If you work above Rs 8,000 in the last 15 days, you will get only 14% commission. If you work above Rs 18,000 in the last 30 days, you will get only 14% commission. If you work, you will have to pay only 10% commission. Commission will be charged on the remaining bill after removing GST",
//     "You will get Rs 250 at your driver joining. plus a 1% agent commission on their bookings for lifetime. Payments are made every Wednesday",
//     "If you make a booking for any customer, a 10% commission will be directly credited to your account after the booking is completed, and the payment will be made to your bank account on Wednesday. Whether the customer is old or new, and whether you go for the booking or someone else does, you will still receive a 10% commission.",
//     "You do not have to pay panel fees every month to get bookings.",
//     "On the tat d platform, no commission is deducted from your earnings for overtime trips, night charges",
//     "If you have completed 5 out of your last 10 bookings as local, you will start receiving outstation bookings on the panel.",
//     "if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible. Night Time 10:00 PM to 06:00 AM",
//   ];

//   const toggleIndex = (index) => {
//     animateLayout();
//     setExpandedIndexes(prevIndexes => {
//       if (prevIndexes.includes(index)) {
//         return prevIndexes.filter(i => i !== index);
//       } else {
//         return [...prevIndexes, index];
//       }
//     });
//   };

//   const toggleParentAccordion = () => {
//     animateLayout();
//     setParentExpanded(prev => !prev);
//   };

//   const animateLayout = () => {
//     LayoutAnimation.configureNext({
//       duration: 300,
//       create: {
//         type: LayoutAnimation.Types.easeInEaseOut,
//         property: LayoutAnimation.Properties.opacity,
//       },
//       update: {
//         type: LayoutAnimation.Types.easeInEaseOut,
//       },
//     });
//   };

//   const getContent = (index) => {
//     return (
//       <Text style={{color: AppColors.black}} >
//         {areas[index]}
//       </Text>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <AccordionItem
//         title="Information Related to Work"
//         expanded={parentExpanded}
//         onPress={toggleParentAccordion}
//         content={
//           <Accordion
//             titles={titles}
//             toggleIndex={toggleIndex}
//             expandedIndexes={expandedIndexes}
//           >
//             {(index) => (
//               <View style={styles.content}>{getContent(index)}</View>
//             )}
//           </Accordion>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default AppAccordion;

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   content: {
//     minHeight: 100,
//   },
//   accordionItem: {
//     borderWidth: 1,
//     // marginBottom: 4,
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'red',
//     padding: 10,
//   },
//   headerText: {
//     color: 'white',
//     flex: 1,
//   },
//   itemContent: {
//     // padding: 10,
//   },
// });













// // import React, { useState } from 'react';
// // import {
// //   Text,
// //   SafeAreaView,
// //   UIManager,
// //   LayoutAnimation,
// //   StyleSheet,
// //   View,
// //   Pressable,
// // } from 'react-native';
// // import AntDesignIcon from 'react-native-vector-icons/AntDesign';

// // const AccordionItem = ({ title, content, onPress, expanded }) => {
// //   return (
// //     <View style={styles.accordionItem}>
// //       <Pressable onPress={onPress}>
// //         <View style={styles.itemHeader}>
// //           <Text>{title}</Text>
// //           <AntDesignIcon name={expanded ? 'minus' : 'plus'} size={20} />
// //         </View>
// //       </Pressable>
// //       {expanded && <View style={styles.itemContent}>{content}</View>}
// //     </View>
// //   );
// // };

// // const Accordion = ({ titles, children, expandedIndexes, toggleIndex }) => {
// //   return (
// //     <View>
// //       {titles.map((title, index) => (
// //         <AccordionItem
// //           key={title}
// //           title={title}
// //           content={children(index)}
// //           expanded={expandedIndexes.includes(index)}
// //           onPress={() => toggleIndex(index)}
// //         />
// //       ))}
// //     </View>
// //   );
// // };

// // UIManager.setLayoutAnimationEnabledExperimental &&
// //   UIManager.setLayoutAnimationEnabledExperimental(true);

// // const AppAccordion = () => {
// //   const [expandedIndexes, setExpandedIndexes] = useState([]);
// //   const [parentExpanded, setParentExpanded] = useState(false);
// //   const titles = ['New York', 'Bangalore', 'New Delhi', 'Kolkata'];
// //   const areas = [100, 70, 80, 50];

// //   const toggleIndex = (index) => {
// //     animateLayout();
// //     setExpandedIndexes(prevIndexes => {
// //       if (prevIndexes.includes(index)) {
// //         return prevIndexes.filter(i => i !== index);
// //       } else {
// //         return [...prevIndexes, index];
// //       }
// //     });
// //   };

// //   const toggleParentAccordion = () => {
// //     animateLayout();
// //     setParentExpanded(prev => !prev);
// //   };

// //   const animateLayout = () => {
// //     LayoutAnimation.configureNext({
// //       duration: 300,
// //       create: {
// //         type: LayoutAnimation.Types.easeInEaseOut,
// //         property: LayoutAnimation.Properties.opacity,
// //       },
// //       update: {
// //         type: LayoutAnimation.Types.easeInEaseOut,
// //       },
// //     });
// //   };

// //   const getContent = (index) => {
// //     return (
// //       <Text>
// //         {titles[index]} has an area of {areas[index]} square km
// //       </Text>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <AccordionItem
// //         title="City Information"
// //         expanded={parentExpanded}
// //         onPress={toggleParentAccordion}
// //         content={
// //           <Accordion
// //             titles={titles}
// //             toggleIndex={toggleIndex}
// //             expandedIndexes={expandedIndexes}
// //           >
// //             {(index) => (
// //               <View style={styles.content}>{getContent(index)}</View>
// //             )}
// //           </Accordion>
// //         }
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // export default AppAccordion;

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 10,
// //   },
// //   content: {
// //     minHeight: 100,
// //   },
// //   accordionItem: {
// //     borderWidth: 1,
// //     marginBottom: 4,
// //   },
// //   itemHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: 'lightgrey',
// //     padding: 10,
// //   },
// //   itemContent: {
// //     padding: 10,
// //   },
// // });









// // import React, { useState } from 'react';
// // import {
// //   Text,
// //   SafeAreaView,
// //   UIManager,
// //   LayoutAnimation,
// //   StyleSheet,
// //   View,
// //   Pressable,
// // } from 'react-native';
// // import AntDesignIcon from 'react-native-vector-icons/AntDesign';

// // const AccordionItem = ({ title, content, onPress, expanded }) => {
// //   return (
// //     <View style={styles.accordionItem}>
// //       <Pressable onPress={onPress}>
// //         <View style={styles.itemHeader}>
// //           <Text>{title}</Text>
// //           <AntDesignIcon name={expanded ? 'minus' : 'plus'} size={20} />
// //         </View>
// //       </Pressable>
// //       {expanded && <View style={styles.itemContent}>{content}</View>}
// //     </View>
// //   );
// // };

// // const Accordion = ({ titles, children, expandedIndexes, toggleIndex }) => {
// //   return (
// //     <View>
// //       {titles.map((title, index) => (
// //         <AccordionItem
// //           key={title}
// //           title={title}
// //           content={children(index)}
// //           expanded={expandedIndexes.includes(index)}
// //           onPress={() => toggleIndex(index)}
// //         />
// //       ))}
// //     </View>
// //   );
// // };

// // // UIManager.setLayoutAnimationEnabledExperimental &&
// // //   UIManager.setLayoutAnimationEnabledExperimental(true);

// // const AppAccordion = () => {
// //   const [expandedIndexes, setExpandedIndexes] = useState([]);
// //   const titles = ["How to Make it Easier for me to Get Work in the Future?", "How can I reduce the company commission on my earnings?", "What benefit will I get from the Agent Panel?", "What benefit will I get from the booking agency?" , "Do I have to pay panel fees every month?", "The company doesn't take a commission on overtime or night charges", "When will I get an outstation booking?", "How are night charges calculated?"];

// //   const areas = [
// //     'First - Only accept bookings that you can complete on time.Second - After accepting a booking, completing it will improve your booking score and you will start getting more work. If you cancel too many bookings, you will get less work.Third - The better the customers rate you, the more work you will receive.',
// //     "More work, less commission. If you work above Rs 3600 in the last 7 days, you will get only 17% commission. If you work above Rs 8,000 in the last 15 days, you will get only 14% commission. If you work above Rs 18,000 in the last 30 days, you will get only 14% commission. If you work, you will have to pay only 10% commission. Commission will be charged on the remaining bill after removing GST",
// //     "You will get Rs 250 at your driver joining. plus a 1% agent commission on their bookings for lifetime. Payments are made every Wednesday",
// //     "If you make a booking for any customer, a 10% commission will be directly credited to your account after the booking is completed, and the payment will be made to your bank account on Wednesday. Whether the customer is old or new, and whether you go for the booking or someone else does, you will still receive a 10% commission.",
// //     "You do not have to pay panel fees every month to get bookings.",
// //     "On the tat d platform, no commission is deducted from your earnings for overtime trips, night charges",
// //     "If you have completed 5 out of your last 10 bookings as local, you will start receiving outstation bookings on the panel.",
// //     "if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible. Night Time 10:00 PM to 06:00 AM",

// //   ];
// //   const toggleIndex = (index) => {
// //     LayoutAnimation.configureNext({
// //       duration: 300,
// //       create: {
// //         type: LayoutAnimation.Types.easeInEaseOut,
// //         property: LayoutAnimation.Properties.opacity,
// //       },
// //       update: {
// //         type: LayoutAnimation.Types.easeInEaseOut,
// //       },
// //     });
// //     setExpandedIndexes(prevIndexes => {
// //       if (prevIndexes.includes(index)) {
// //         return prevIndexes.filter(i => i !== index);
// //       } else {
// //         return [...prevIndexes, index];
// //       }
// //     });
// //   };

// //   const getContent = (index) => {
// //     return (
// //       <Text style={{color: AppColors.black}} >
// //         {areas[index]}
// //       </Text>
// //     );
// //   };

// //   return (
// //     <SafeAreaView>
// //       <Accordion
// //         titles={titles}
// //         toggleIndex={toggleIndex}
// //         expandedIndexes={expandedIndexes}
// //       >
// //         {(index) => (
// //           <View style={styles.content}>{getContent(index)}</View>
// //         )}
// //       </Accordion>
// //     </SafeAreaView>
// //   );
// // };

// // export default AppAccordion;

// // const styles = StyleSheet.create({
// //   content: {
// //     minHeight: 100,
// //   },
// //   accordionItem: {
// //     borderWidth: 1,
// //     marginBottom: 4,
// //   },
// //   itemHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: 'red',
// //     padding: 10,
// //   },
// //   itemContent: {
// //     padding: 10,
// //   },
// // });









// // // import React, { useState } from 'react';
// // // import {
// // //   Text,
// // //   SafeAreaView,
// // //   UIManager,
// // //   LayoutAnimation,
// // //   StyleSheet,
// // //   View,
// // //   Pressable,
// // // } from 'react-native';
// // // import AntDesignIcon from 'react-native-vector-icons/AntDesign';

// // // const AccordionItem = ({ title, content, onPress, expanded }) => {
// // //   return (
// // //     <View style={styles.accordionItem}>
// // //       <Pressable onPress={onPress}>
// // //         <View style={styles.itemHeader}>
// // //           <Text>{title}</Text>
// // //           <AntDesignIcon name={expanded ? 'minus' : 'plus'} size={20} />
// // //         </View>
// // //       </Pressable>
// // //       {expanded && <View style={styles.itemContent}>{content}</View>}
// // //     </View>
// // //   );
// // // };

// // // const Accordion = ({ titles, children, expandedIndexes, toggleIndex }) => {
// // //   return (
// // //     <View>
// // //       {titles.map((title, index) => (
// // //         <AccordionItem
// // //           key={title}
// // //           title={title}
// // //           content={children(index)}
// // //           expanded={expandedIndexes.includes(index)}
// // //           onPress={() => toggleIndex(index)}
// // //         />
// // //       ))}
// // //     </View>
// // //   );
// // // };

// // // UIManager.setLayoutAnimationEnabledExperimental &&
// // //   UIManager.setLayoutAnimationEnabledExperimental(true);

// // // const AppAccordion = () => {
// // //   const [expandedIndexes, setExpandedIndexes] = useState([]);
// // //   const titles = ['New York', 'Bangalore', 'New Delhi', 'Kolkata'];
// // //   const areas = [100, 70, 80, 50];

// // //   const toggleIndex = (index) => {
// // //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
// // //     setExpandedIndexes(prevIndexes => {
// // //       if (prevIndexes.includes(index)) {
// // //         return prevIndexes.filter(i => i !== index);
// // //       } else {
// // //         return [...prevIndexes, index];
// // //       }
// // //     });
// // //   };

// // //   const getContent = (index) => {
// // //     return (
// // //       <Text>
// // //         {titles[index]} has an area of {areas[index]} square km
// // //       </Text>
// // //     );
// // //   };

// // //   return (
// // //     <SafeAreaView>
// // //       <Accordion
// // //         titles={titles}
// // //         toggleIndex={toggleIndex}
// // //         expandedIndexes={expandedIndexes}
// // //       >
// // //         {(index) => (
// // //           <View style={styles.content}>{getContent(index)}</View>
// // //         )}
// // //       </Accordion>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default AppAccordion;


// // // const styles = StyleSheet.create({
// // //   content: {
// // //     minHeight: 100,
// // //   },
// // //   accordionItem: {
// // //     borderWidth: 1,
// // //     marginBottom: 4,
// // //   },
// // //   itemHeader: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     backgroundColor: 'lightgrey',
// // //     padding: 10,
// // //   },
// // //   itemContent: {
// // //     padding: 10,
// // //   },
// // // });
