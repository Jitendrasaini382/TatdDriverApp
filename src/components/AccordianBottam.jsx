import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AppColors } from '../assets/Colors';

const AccordionItem = ({title, content, onPress, expanded}) => {
    return (
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
  };
  
  const Accordion = ({titles, children, expandedIndexes, toggleIndex}) => {
    return (
      <View>
        {titles.map((title, index) => (
          <AccordionItem
            key={title}
            title={title}
            content={children(index)}
            expanded={expandedIndexes.includes(index)}
            onPress={() => toggleIndex(index)}
          />
        ))}
      </View>
    );
  };
  
const AccordionBottam = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [parentExpanded, setParentExpanded] = useState(false);
  const titles = [
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

  const areas = [
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


  const toggleIndex = index => {
    animateLayout();
    setExpandedIndexes(prevIndexes => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter(i => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  const toggleParentAccordion = () => {
    animateLayout();
    setParentExpanded(prev => !prev);
  };

  const animateLayout = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };

  const getContent = index => {
    return <Text style={{color: 'black'}}>{areas[index]}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccordionItem
        title="Information Related to Work"
        expanded={parentExpanded}
        onPress={toggleParentAccordion}
        content={
          <Accordion
            titles={titles}
            toggleIndex={toggleIndex}
            expandedIndexes={expandedIndexes}>
            {index => <View style={styles.content}>{getContent(index)}</View>}
          </Accordion>
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    content: {
        padding: 15,
        minHeight: 100,
        // borderWidth: 1,
        borderColor: '#ccc',
    },
    accordionItem: {
        elevation: 5,
        backgroundColor: '#ccc'
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    // backgroundColor: 'red',
    padding: 10,
},
  headerText: {
    color: 'black',
    flex: 1,
  },
  itemContent: {
      // padding: 10,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AccordionBottam;