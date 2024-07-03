import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubePlayer from 'react-native-youtube-iframe';
import {OpenEnvelop} from '../assets/images';
import {AppColors} from '../assets/Colors';

const accordionItems = [
  {
    title: "1. कस्टमर ड्राइवर और एजेंट को कैसे जोड़ें ?",
    videoId: "MGdKBPlGpg4",
  },
  {
    title: "2. कमाए हुए कमीशन के बारे में कैसे पता चलेगा ?",
    videoId: "Rp_zZTXTi-E",
  },
 
];



const AgentTrainingVideo = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          videoId={item.videoId}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
          index={index + 1}
        />
      ))}
    </View>
  );
};

export default AgentTrainingVideo;

const AccordionItem = ({title, videoId, isOpen, onToggle, index}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onToggle}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={OpenEnvelop}
          />
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.indexText}>{index}. </Text> */}
          <Text style={styles.title}>
            {title}
            </Text>

            <Text
              style={{
                color: AppColors.mainColor,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: AppColors.mainColor,
              }}>
              Video देखें
            {/* </Text> */}
          </Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={!isOpen}>
        <YoutubePlayer height={200} videoId={videoId} />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  itemContainer: {
    marginBottom: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  title: {
    fontSize: 20,
    color: AppColors.black,
    // fontWeight:'bold',
    flex: 1,
  },
  videoLink: {
    color: AppColors.mainColor,
    border: 1,
    borderBottomColor: AppColors.mainColor,
  },
});

