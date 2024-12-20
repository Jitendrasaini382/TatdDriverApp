import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from 'react-native';

import React, {useContext, useEffect, useState, useCallback} from 'react';
import {AppColors} from '../assets/Colors';
import {DRIVER_FAQ} from '../apis/Apis';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch,useSelector} from 'react-redux';
import {setFaqData} from '../redux/slices/globalSlice';

const AccordionItem = React.memo(
  ({title, content, onPress, expanded, isInner}) => (
    <View
      style={
        isInner
          ? accordianStyles.innerAccordionItem
          : accordianStyles.accordionItem
      }>
      <Pressable onPress={onPress}>
        <View style={accordianStyles.itemHeader}>
          <Text style={accordianStyles.headerText}>{title}</Text>
          <Icon
            name={expanded ? 'minus' : 'plus'}
            size={12}
            color={'#007bff'}
          />
        </View>
      </Pressable>
      {expanded && <View style={accordianStyles.itemContent}>{content}</View>}
    </View>
  ),
);

const Accordion = React.memo(({data, expandedIndexes, toggleIndex}) => (
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
));

const AccordionData = () => {
  const dispatch = useDispatch();
  const [expandedParentIndexes, setExpandedParentIndexes] = useState([]);
  const [expandedChildIndexes, setExpandedChildIndexes] = useState({});

  const faqData = useSelector(e => e?.globalSlice?.faqData);

  const getFaqData = useCallback(() => {
    DRIVER_FAQ({
      action: 'driver_faq',
    })
      .then(e => {
        if (e.status_code === '200') {
          dispatch(setFaqData(e.faq_data));
        } else {
          console.log('Loading Faq Data');
        }
      })
      .catch(err => {
        console.error('FAQ Error:', err);
      });
  }, [faqData]);

  useEffect(() => {
    getFaqData();
  }, []);

  const groupedData = React.useMemo(() => {
    return (
      faqData &&
      faqData.reduce((acc, item) => {
        if (!acc[item.faq_header]) {
          acc[item.faq_header] = [];
        }
        acc[item.faq_header].push(item);
        return acc;
      }, {})
    );
  }, [faqData]);

  const data = React.useMemo(() => {
    return Object.entries(groupedData || {}).map(([header, questions]) => ({
      title: header,
      content: questions,
    }));
  }, [groupedData]);

  const toggleParentAccordion = useCallback(index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedParentIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  }, []);

  const toggleChildAccordion = useCallback((parentIndex, childIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedChildIndexes(prev => ({
      ...prev,
      [parentIndex]: prev[parentIndex]?.includes(childIndex)
        ? prev[parentIndex].filter(i => i !== childIndex)
        : [...(prev[parentIndex] || []), childIndex],
    }));
    setExpandedParentIndexes(prev =>
      prev.includes(parentIndex) ? prev : [...prev, parentIndex],
    );
  }, []);

  return (
    <SafeAreaView style={accordianStyles.content}>
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const accordianStyles = StyleSheet.create({
  content: {
    backgroundColor: AppColors.white,
  },
  accordionItem: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  innerAccordion: {
    borderTopColor: '#e0e0e0',
  },
  innerAccordionItem: {
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

export default AccordionData;
