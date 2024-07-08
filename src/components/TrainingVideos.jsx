import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubePlayer from 'react-native-youtube-iframe';
import {OpenEnvelop} from '../assets/images';
import {AppColors} from '../assets/Colors';





const AccordionTrainingVideo = ({data}) => {
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
      {data.map((item, index) => (
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

export default AccordionTrainingVideo;

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
          <Text style={styles.indexText}>{index}. </Text>
          <Text style={styles.title}>
            {title}
            <Text
              style={{
                color: AppColors.mainColor,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: AppColors.mainColor,
              }}>
              Video देखें
            </Text>
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
    // padding:15,
    backgroundColor: AppColors.white,
  },
  itemContainer: {
    marginBottom: 10,
    padding:10
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5
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
    flexDirection: 'row',
  },
  indexText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  title: {
    fontSize: 14,
    color: AppColors.black,
    fontWeight:'bold',
    flex: 1,
  },
  videoLink: {
    color: AppColors.mainColor,
    border: 1,
    borderBottomColor: AppColors.mainColor,
  },
});

// import React, {useState} from 'react';
// import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import {OpenEnvelop} from '../assets/images';
// import { AppColors } from '../assets/Colors';

// const AccordionTrainingVideo = ({items}) => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleItem = index => {
//     if (openIndex === index) {
//       setOpenIndex(null);
//     } else {
//       setOpenIndex(index);
//     }
//   };

//   return (
//     <View>
//       {items.map((item, index) => (
//         <AccordionItem
//           key={index}
//           title={item.title}
//           videoId={item.videoId}
//           isOpen={openIndex === index}
//           onToggle={() => toggleItem(index)}
//         />
//       ))}
//     </View>
//   );
// };

// export default AccordionTrainingVideo;

// const AccordionItem = ({title, videoId, isOpen, onToggle}) => {
//   return (
//     <View style={{}}>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           borderColor: '#ccc',
//           borderBottomWidth: 1,
//           // height: 30,
//         }}
//         onPress={onToggle}>

//         <Image style={{position: 'relative'}} resizeMode='center' source={OpenEnvelop} />
//         <Text style={styles.title}>{title}</Text>
//         <Text style={{color:AppColors.mainColor, borderBottomWidth: 1, borderBottomColor: AppColors.mainColor}}>Video देखें</Text>
//       </TouchableOpacity>
//       <Collapsible collapsed={!isOpen}>
//         <YoutubePlayer height={200} videoId={videoId} />
//       </Collapsible>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {

//     paddingTop: 10,
//     backgroundColor: AppColors.white,
//   },
//   title: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: AppColors.black,
//   },
// });
