import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../assets/Colors';

const AccordionItem = ({title, content, onPress, expanded}) => (
  <View style={styles.accordionItem}>
    <Pressable onPress={onPress}>
      <View style={styles.itemHeader}>
        <Text style={styles.headerText}>{title}</Text>
        <Icon
          name={expanded ? 'minus' : 'plus'}
          size={10}
          color={AppColors.mainColor}
        />
      </View>
    </Pressable>
    {expanded && <View style={styles.itemContent}>{content}</View>}
  </View>
);

const Accordion = ({data, expandedIndexes, toggleIndex}) => (
  <View>
    {data.map((item, index) => (
      <AccordionItem
        key={item.title}
        title={item.title}
        content={<Text style={styles.contentText}>{item.content}</Text>}
        expanded={expandedIndexes.includes(index)}
        onPress={() => toggleIndex(index)}
      />
    ))}
  </View>
);

const AccordionData = () => {
  const [expandedParentIndexes, setExpandedParentIndexes] = useState([]);
  const [expandedChildIndexes, setExpandedChildIndexes] = useState({});

  const data = [
    {
      title: 'Information Related to Work',
      content: [
        {
          title: 'How to Make it Easier for me to Get Work in the Future?',
          content:
            'First - Only accept bookings that you can complete on time. Second - After accepting a booking, completing it will improve your booking score and you will start getting more work. If you cancel too many bookings, you will get less work. Third - The better the customers rate you, the more work you will receive.',
        },
        {
          title: 'How can I reduce the company commission on my earnings?',
          content:
            'More work, less commission. If you work above Rs 3600 in the last 7 days, you will get only 17% commission. If you work above Rs 8,000 in the last 15 days, you will get only 14% commission. If you work above Rs 18,000 in the last 30 days, you will get only 14% commission. If you work, you will have to pay only 10% commission. Commission will be charged on the remaining bill after removing GST',
        },
        {
          title: 'What benefit will I get from the Agent Panel?',
          content:
            'You will get Rs 250 at your driver joining. plus a 1% agent commission on their bookings for lifetime. Payments are made every Wednesday',
        },
        {
          title: 'What benefit will I get from the booking agency?',
          content:
            'If you make a booking for any customer, a 10% commission will be directly credited to your account after the booking is completed, and the payment will be made to your bank account on Wednesday. Whether the customer is old or new, and whether you go for the booking or someone else does, you will still receive a 10% commission.',
        },
        {
          title: 'Do I have to pay panel fees every month?',
          content:
            'You do not have to pay panel fees every month to get bookings.',
        },
        {
          title:
            "The company doesn't take a commission on overtime or night charges",
          content:
            'On the tat d platform, no commission is deducted from your earnings for overtime trips, night charges',
        },
        {
          title: 'When will I get an outstation booking?',
          content:
            'If you have completed 5 out of your last 10 bookings as local, you will start receiving outstation bookings on the panel.',
        },
        {
          title: 'How are night charges calculated?',
          content:
            'If you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible. Night Time 10:00 PM to 06:00 AM',
        },
      ],
    },
    {
      title: 'What should not be done?',
      content: [
        {
          title:
            "I accepted the booking by mistake, and I won't be able to go for this booking.",
          content:
            "Our job is to solve the customer's problems, not to increase them. Changing drivers reduces the customer's trust in the company, which can make it difficult for you to find work in the future. If such a situation arises again, we will not be able to help you. Please accept only those bookings that you can actually attend. If this happens, and you create the ticket on time, we can change the driver. If the booking is not canceled after changing the driver, your account will be reopened by the next day. If the booking is canceled, your account will be closed for 5 to 21 days or permanently.",
        },
        {
          title: 'Can I send a friend to complete my booking?',
          content:
            'No, you cannot send someone else to complete your booking. Each driver must fulfill their own bookings to maintain trust and service quality. Otherwise, your account will be permanently blacklisted.',
        },
        {
          title: 'Can I go to the customer wearing slippers?',
          content:
            'No, you should not go to the customer wearing slippers. Proper attire is important to maintain professionalism and create a good impression on the customer. Please wear appropriate shoes and clothes when meeting customers.',
        },
        {
          title: "I won't be able to reach the customer on time.",
          content:
            "If you won't be able to reach the customer on time, please inform them immediately. Timeliness is crucial for a positive customer experience. Consistent delays can affect your booking score and future opportunities.",
        },
        {
          title: 'Can I talk on the phone using hands-free while driving?',
          content:
            "No, it is not appropriate to talk on the phone even using hands-free while driving. It is important for your and the customer's safety that you fully concentrate on driving. Please do not use the phone while driving. Otherwise, your account will be permanently blacklisted.",
        },
        {
          title:
            'Can I talk to the customer while driving? Or give any kind of suggestion to the customer?',
          content:
            'No, you should not talk to the customer while driving, nor give any unsolicited suggestions. This can be a privacy concern. For example, commenting on their personal preferences or discussing unrelated topics can make the customer uncomfortable. Please focus on driving and maintain professionalism.',
        },
        {
          title:
            "I have the customer's car, and my phone mistakenly went silent.",
          content:
            'Please keep your phone active at all times. If the customer cannot reach you, it will be considered unprofessional, and your account will become inactive for 21 days. Professional drivers are always ready for their customers.',
        },
        {
          title:
            'Can I tell the customer to take my number and call me directly next time?',
          content:
            'No, doing so will result in your account being permanently blacklisted. And you will not receive any work opportunities from the company. Customers often inform the company about such drivers.',
        },
        {
          title: "Can I relax by using the AC in the customer's car?",
          content:
            "Certainly not. As professional drivers on our on-demand platform, it's important to adhere to professionalism at all times. Your account will be blacklisted for 21 days or permanently if you do so.",
        },
        {
          title:
            'Can I ask the customer for extra money at the end of the booking apart from the bill?',
          content:
            'No, asking for extra money at the end of the booking is against our policy and can result in permanent account suspension or suspension for 21 days.',
        },
      ],
    },
  ];

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
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  content: {
    padding: 15,
    minHeight: 100,
    backgroundColor: 'white',
  },
  accordionItem: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
  },
  headerText: {
    color: AppColors.black,
    flex: 1,
  },
  itemContent: {
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contentText: {
    color: 'black',
    padding: 10,
  },
});

export default AccordionData;

// import React, {useState} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   LayoutAnimation,
//   StyleSheet,
//   View,
//   Pressable,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {AppColors} from '../assets/Colors';

// const AccordionItem = ({title, content, onPress, expanded}) => (
//   <View style={styles.accordionItem}>
//     <Pressable onPress={onPress}>
//       <View style={styles.itemHeader}>
//         <Text style={styles.headerText}>{title}</Text>
//         <Icon
//           name={expanded ? 'minus' : 'plus'}
//           size={10}
//           color={AppColors.mainColor}
//         />
//       </View>
//     </Pressable>
//     {expanded && <View style={styles.itemContent}>{content}</View>}
//   </View>
// );

// const Accordion = ({data, expandedIndexes, toggleIndex}) => (
//   <View>
//     {data.map((item, index) => (
//       <AccordionItem
//         key={item.title}
//         title={item.title}
//         content={<Text style={styles.contentText}>{item.content}</Text>}
//         expanded={expandedIndexes.includes(index)}
//         onPress={() => toggleIndex(index)}
//       />
//     ))}
//   </View>
// );

// const AccordionData = () => {
//   const [expandedIndexes, setExpandedIndexes] = useState([]);
//   const [parentExpanded, setParentExpanded] = useState([false, false]);

//   const data = [
//     {
//       title: 'Information Related to Work',
//       content: [
//         {
//           title: 'How to Make it Easier for me to Get Work in the Future?',
//           content:
//             'Accept and complete bookings on time. Maintain a good booking score and customer ratings to receive more work.',
//         },
//         {
//           title: 'How can I reduce the company commission on my earnings?',
//           content:
//             'You will get Rs 250 at your driver joining. plus a 1% agent commission on their bookings for lifetime. Payments are made every Wednesday',
//         },
//         {
//           title: 'What benefit will I get from the Agent Panel?',
//           content:
//             'Accept and complete bookings on time. Maintain a good booking score and customer ratings to receive more work.',
//         },
//         {
//           title: 'What benefit will I get from the booking agency?',
//           content:
//             'If you make a booking for any customer, a 10% commission will be directly credited to your account after the booking is completed, and the payment will be made to your bank account on Wednesday. Whether the customer is old or new, and whether you go for the booking or someone else does, you will still receive a 10% commission.',
//         },
//         {
//           title: 'Do I have to pay panel fees every month?',
//           content:
//             'You do not have to pay panel fees every month to get bookings.',
//         },
//         {
//           title:
//             "The company doesn't take a commission on overtime or night charges",
//           content:
//             'On the tat d platform, no commission is deducted from your earnings for overtime trips, night charges',
//         },
//         {
//           title: 'When will I get an outstation booking?',
//           content:
//             'If you have completed 5 out of your last 10 bookings as local, you will start receiving outstation bookings on the panel.',
//         },
//         {
//           title: 'How are night charges calculated?',
//           content:
//             'if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible. Night Time 10:00 PM to 06:00 AM',
//         },
//       ],
//     },
//     {
//       title: 'What should not be done?',
//       content: [
//         {
//           title:
//             "I accepted the booking by mistake, and I won't be able to go for this booking.",
//           content:
//             'Only accept bookings you can attend. Changing drivers reduces customer trust. Create a ticket on time if unavoidable.',
//         },
//         {
//           title: 'Can I send a friend to complete my booking?',
//           content:
//             'No, you must fulfill your own bookings. Sending someone else will result in permanent blacklisting.',
//         },
//         // ... add other items here
//       ],
//     },
//   ];

//   const toggleIndex = (parentIndex, childIndex) => {
//     animateLayout();
//     setExpandedIndexes(prev => {
//       const key = `${parentIndex}-${childIndex}`;
//       return prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key];
//     });
//     setParentExpanded(prev =>
//       prev.map((_, index) => (index === parentIndex ? true : prev[index])),
//     );
//   };

//   const toggleParentAccordion = index => {
//     animateLayout();
//     setParentExpanded(prev => prev.map((v, i) => (i === index ? !v : v)));
//   };

//   const animateLayout = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {data.map((parentItem, parentIndex) => (
//         <AccordionItem
//           key={parentItem.title}
//           title={parentItem.title}
//           expanded={parentExpanded[parentIndex]}
//           onPress={() => toggleParentAccordion(parentIndex)}
//           content={
//             <Accordion
//               data={parentItem.content}
//               toggleIndex={childIndex => toggleIndex(parentIndex, childIndex)}
//               expandedIndexes={expandedIndexes.filter(i =>
//                 i.startsWith(`${parentIndex}-`),
//               )}
//             />
//           }
//         />
//       ))}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   accordionItem: {
//     marginBottom: 10,
//     borderRadius: 8,
//     overflow: 'hidden',
//     elevation: 2,
//     backgroundColor: 'white',
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f7f7f7',
//     padding: 15,
//   },
//   headerText: {
//     color: AppColors.black,
//     flex: 1,
//     fontWeight: 'bold',
//   },
//   itemContent: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//   },
//   contentText: {
//     color: AppColors.black,
//     lineHeight: 20,
//   },
// });

// export default AccordionData;

// // import React, {useState} from 'react';
// // import {
// //   Text,
// //   SafeAreaView,
// //   LayoutAnimation,
// //   StyleSheet,
// //   View,
// //   Pressable,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/dist/FontAwesome';
// // import {AppColors} from '../assets/Colors';

// // const AccordionItem = ({title, content, onPress, expanded}) => {
// //   return (
// //     <View style={styles.accordionItem}>
// //       <Pressable onPress={onPress}>
// //         <View style={styles.itemHeader}>
// //           <Text style={styles.headerText}>{title}</Text>
// //           <Icon
// //             name={expanded ? 'minus' : 'plus'}
// //             size={10}
// //             color={AppColors.mainColor}
// //           />
// //         </View>
// //       </Pressable>
// //       {expanded && <View style={styles.itemContent}>{content}</View>}
// //     </View>
// //   );
// // };

// // const Accordion = ({titles, children, expandedIndexes, toggleIndex}) => {
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

// // const AccordionData = () => {
// //   const [expandedIndexes, setExpandedIndexes] = useState([]);
// //   const [parentExpanded, setParentExpanded] = useState(false);
const titles1 = [
  'How to Make it Easier for me to Get Work in the Future?',
  'How can I reduce the company commission on my earnings?',
  'What benefit will I get from the Agent Panel?',
  'What benefit will I get from the booking agency?',
  'Do I have to pay panel fees every month?',
  "The company doesn't take a commission on overtime or night charges",
  'When will I get an outstation booking?',
  'How are night charges calculated?',
];

const areas1 = [
  'First - Only accept bookings that you can complete on time.Second - After accepting a booking, completing it will improve your booking score and you will start getting more work. If you cancel too many bookings, you will get less work.Third - The better the customers rate you, the more work you will receive.',
  'More work, less commission. If you work above Rs 3600 in the last 7 days, you will get only 17% commission. If you work above Rs 8,000 in the last 15 days, you will get only 14% commission. If you work above Rs 18,000 in the last 30 days, you will get only 14% commission. If you work, you will have to pay only 10% commission. Commission will be charged on the remaining bill after removing GST',
  'You will get Rs 250 at your driver joining. plus a 1% agent commission on their bookings for lifetime. Payments are made every Wednesday',
  'If you make a booking for any customer, a 10% commission will be directly credited to your account after the booking is completed, and the payment will be made to your bank account on Wednesday. Whether the customer is old or new, and whether you go for the booking or someone else does, you will still receive a 10% commission.',
  'You do not have to pay panel fees every month to get bookings.',
  'On the tat d platform, no commission is deducted from your earnings for overtime trips, night charges',
  'If you have completed 5 out of your last 10 bookings as local, you will start receiving outstation bookings on the panel.',
  'if you drive for 50 minutes or more at night, you will receive a night charge of Rs 150. If you drive for less than 50 minutes, you will receive a night charge of Rs 3 per minute. This change has been made because sometimes a night charge of Rs 150 was applied for just 2 minutes of driving, causing dispute in between customers & drivers. Our goal is to minimize inconvenience for customers & drivers and ensure you get as much work as possible. Night Time 10:00 PM to 06:00 AM',
];

const titles2 = [
  "I accepted the booking by mistake, and I won't be able to go for this booking.",
  'Can I send a friend to complete my booking?',
  'Can I go to the customer wearing slippers?',
  "I won't be able to reach the customer on time.",
  'Can I talk on the phone using hands-free while driving?',
  'Can I talk to the customer while driving? Or give any kind of suggestion to the customer?',
  "I have the customer's car, and my phone mistakenly went silent.",
  'Can I tell the customer to take my number and call me directly next time?',
  "Can I relax by using the AC in the customer's car?",
  'Can I ask the customer for extra money at the end of the booking apart from the bill?',
];

const areas2 = [
  "Our job is to solve the customer's problems, not to increase them. Changing drivers reduces the customer's trust in the company, which can make it difficult for you to find work in the future. If such a situation arises again, we will not be able to help you. Please accept only those bookings that you can actually attend. If this happens, and you create the ticket on time, we can change the driver. If the booking is not canceled after changing the driver, your account will be reopened by the next day. If the booking is canceled, your account will be closed for 5 to 21 days or permanently.",
  'No, you cannot send someone else to complete your booking. Each driver must fulfill their own bookings to maintain trust and service quality. Otherwise, your account will be permanently blacklisted.',
  'No, you should not go to the customer wearing slippers. Proper attire is important to maintain professionalism and create a good impression on the customer. Please wear appropriate shoes and clothes when meeting customers.',
  "If you won't be able to reach the customer on time, please inform them immediately. Timeliness is crucial for a positive customer experience. Consistent delays can affect your booking score and future opportunities.",
  "No, it is not appropriate to talk on the phone even using hands-free while driving. It is important for your and the customer's safety that you fully concentrate on driving. Please do not use the phone while driving. Otherwise, your account will be permanently blacklisted.",
  'No, you should not talk to the customer while driving, nor give any unsolicited suggestions. This can be a privacy concern. For example, commenting on their personal preferences or discussing unrelated topics can make the customer uncomfortable. Please focus on driving and maintain professionalism.',
  'Please keep your phone active at all times. If the customer cannot reach you, it will be considered unprofessional, and your account will become inactive for 21 days. Professional drivers are always ready for their customers.',
  'No, doing so will result in your account being permanently blacklisted. And you will not receive any work opportunities from the company. Customers often inform the company about such drivers.',
  "Certainly not. As professional drivers on our on-demand platform, it's important to adhere to professionalism at all times. Your account will be blacklisted for 21 days or permanently if you do so.",
  'No, asking for extra money at the end of the booking is against our policy and can result in permanent account suspension or suspension for 21 days.',
];

// //   const toggleIndex = index => {
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

// //   const getContent = index => {
// //     return (
// //       <>
// //         <Text style={{color: AppColors.black}}>{areas1[index]}</Text>
// //         <Text style={{color: AppColors.black}}>{areas2[index]}</Text>
// //       </>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <AccordionItem
// //         title="Information Related to Work"
// //         expanded={parentExpanded}
// //         onPress={toggleParentAccordion}
// //         content={
// //           <Accordion
// //             titles={titles1}
// //             toggleIndex={toggleIndex}
// //             expandedIndexes={expandedIndexes}>
// //             {index => <View style={styles.content}>{getContent(index)}</View>}
// //           </Accordion>
// //         }
// //       />
// //       <AccordionItem
// //         title="What should not be done?"
// //         expanded={parentExpanded}
// //         onPress={toggleParentAccordion}
// //         content={
// //           <Accordion
// //             titles={titles2}
// //             toggleIndex={toggleIndex}
// //             expandedIndexes={expandedIndexes}>
// //             {index => <View style={styles.content}>{getContent(index)}</View>}
// //           </Accordion>
// //         }
// //       />
// //     </SafeAreaView>
// //   );
// // };

// const styles = StyleSheet.create({
//   content: {
//     padding: 15,
//     minHeight: 100,
//     borderColor: '#ccc',
//     backgroundColor: "white",
//   },
//   accordionItem: {
//     elevation: 2,
//     backgroundColor: 'white',
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f7f7f7',
//     padding: 10,
//   },
//   headerText: {
//     color: AppColors.black,
//     flex: 1,
//   },
//   itemContent: {
//     backgroundColor: '#f7f7f7',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default AccordionData;
