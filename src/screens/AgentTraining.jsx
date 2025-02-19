import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {DRIVER_TRAINING_VIDEOS_CLICK_STORE, GET_AGENT_TRAINING_VIDEOS} from '../apis/Apis';

const {width, height} = Dimensions.get('window');
const designWidth = width;
const designHeight = height;
const item = [
  {
    eligibility: '0',
    icon: 'open_envlop.png',
    id: '9',
    subject: 'Video देखें,  Login और अपनी reference verification पूरी करें। ',
    videoId: 'uuCULpkpKrA',
  },
  {
    eligibility: '0',
    icon: 'open_envlop.png',
    id: '2',
    subject: 'Login करने के बाद आपको अपनी मर्जी की बुकिंग उठानी होगी।',
    videoId: '4HDKAi75-Vo',
  },
  {
    eligibility: '0',
    icon: 'open_envlop.png',
    id: '3',
    subject: 'बुकिंग उठाने के बाद आपको उस बुकिंग को पूरा करना होगा।',
    videoId: 'u892FTsKLKk',
  },
];

const scale = size => (width / designWidth) * size;
const verticalScale = size => (height / designHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const AgentTraining = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const[trainingVideos,settrainingVideos]=useState([])
  const getAgentTrainingVideos = async () => {
    try { 
      const res =await GET_AGENT_TRAINING_VIDEOS();
    //   console.log(res,"traing videos");
      settrainingVideos(res?.videos)
    } catch {
      console.log(err);
    }
  };

  useEffect(() => {
    getAgentTrainingVideos();
  }, []);
  const toggleItem = (index, id) => {
    storeClickVideo(id);
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const storeClickVideo = async id => {
      try {
        // const response = await DRIVER_TRAINING_VIDEOS_CLICK_STORE({
        //   action: 'store_training_videos_clicks',
        //   training_id: id,
        //   training_type: 'Driver Training',
        // });
  
        setTimeout(() => {
          getAgentTrainingVideos();
        }, 2000);
      } catch (error) {}
    };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.mainView}>
              <View style={styles.mainTopView}>
                <View style={styles.mainTopContent}>
                  <View style={styles.headingView}>
                    <Text style={styles.headingText}>
                      Trusted & Trained Driver
                    </Text>
                  </View>
                  <View style={styles.triangleMainView}>
                    <View style={styles.triangleView}></View>
                    <View
                      style={[
                        styles.triangleView,
                        styles.rotatedTriangle,
                      ]}></View>
                  </View>
                </View>
                <Text style={styles.mainHeading}>Training Videos</Text>
              </View>

              <View style={{marginTop: 30}}>
                <View style={styles.container}>
                  {trainingVideos &&
                    trainingVideos.map((item, index) => (
                      <AccordionItem
                        key={index}
                        title={item.video_subject}
                        videoId={item.video_id}
                        id={item.id}
                        icon={item.icon}
                        eligibility={item.eligibility}
                        isOpen={openIndex === index}
                        onToggle={() => toggleItem(index, item.id)}
                        index={index + 1}
                      />
                    ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    padding: moderateScale(15),
  },
  mainView: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderRadius: moderateScale(10),
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  mainTopContent: {
    flexDirection: 'row',
    paddingRight: moderateScale(6),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  headingView: {
    backgroundColor: AppColors.white,
    width: '80%',
  },
  headingText: {
    color: AppColors.mainColor,
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(4),
  },
  triangleMainView: {
    flexDirection: 'column',
  },
  triangleView: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(12),
    borderTopWidth: moderateScale(12),
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
  },
  rotatedTriangle: {
    transform: [{rotate: '270deg'}],
  },
  mainHeading: {
    fontSize: moderateScale(22),
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: AppColors.white,
    fontFamily: 'Roboto-Black',
  },
  mainMiddleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: verticalScale(50),
  },
  iconView: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    padding: moderateScale(10),
  },
  inputView: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: AppColors.greyColor,
    height: verticalScale(36),
    flex: 1,
  },
  inputText: {
    height: verticalScale(36),
    fontSize: moderateScale(14),
    color: AppColors.black,
    textAlign: 'left',
  },
  btnView: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(40),
    width: '40%',
  },
  btnText: {
    fontSize: moderateScale(14),
    color: AppColors.white,
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },

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

export default AgentTraining;
