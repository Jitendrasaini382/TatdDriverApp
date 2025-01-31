import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubePlayer from 'react-native-youtube-iframe';
import {OpenEnvelop, CloseEnvelop} from '../assets/images';
import {AppColors} from '../assets/Colors';
import {
  DRIVER_TRAINING_VIDEOS,
  DRIVER_TRAINING_VIDEOS_CLICK_STORE,
} from '../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setTrainingVideoData} from '../redux/slices/trustedDriverSlice';

const TrainingVideo = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [trainingVideoData, setTrainingVideoData] = useState([]);
  // const trainingVideoData = useSelector(
  //   e => e?.trustedDriverSlice?.trainingVideoData,
  // );

  useEffect(() => {
    getTrainingVideo();
  }, []);

  const getTrainingVideo = async () => {
    try {
      const response = await DRIVER_TRAINING_VIDEOS(languageSwitch);
      // dispatch(setTrainingVideoData(response?.response?.training_data));
      setTrainingVideoData(response?.response?.training_data);
    } catch (error) {}
  };

  const storeClickVideo = async id => {
    try {
      const response = await DRIVER_TRAINING_VIDEOS_CLICK_STORE({
        action: 'store_training_videos_clicks',
        training_id: id,
        training_type: 'Driver Training',
      });

      setTimeout(() => {
        getTrainingVideo();
      }, 2000);
    } catch (error) {}
  };

  const toggleItem = (index, id) => {
    storeClickVideo(id);
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {trainingVideoData &&
        trainingVideoData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.subject}
            videoId={item.videoId}
            id={item.id}
            icon={item.icon}
            eligibility={item.eligibility}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index, item.id)}
            index={index + 1}
          />
        ))}
    </View>
  );
};

export default TrainingVideo;

const AccordionItem = ({
  title,
  videoId,
  isOpen,
  onToggle,
  index,
  icon,
  id,
  eligibility,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onToggle}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            // source={
            //   isOpen
            //     ? OpenEnvelop
            //     : icon === 'open_envlop.png'
            //     ? OpenEnvelop
            //     : CloseEnvelop
            // }
            source={icon == 'open_envlop.png' ? OpenEnvelop : CloseEnvelop}
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
    backgroundColor: AppColors.white,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
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
    fontWeight: 'bold',
    flex: 1,
  },
  videoLink: {
    color: AppColors.mainColor,
    border: 1,
    borderBottomColor: AppColors.mainColor,
  },
});
