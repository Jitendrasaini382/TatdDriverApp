import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
// import {Colors} from '../Assets/Colors';
import {PRAMOTIONAL_VIDEO_ACTIONS} from '../apis/Apis';

export default function HomePramotionalBanner() {
  const videoRef = useRef(null);
  const langBtnRef = useRef(null);

  // 🔹 Redux data
  const globalVideos =
    useSelector(state => state?.globalSlice?.pramotnalBannersData?.videos) ||
    [];

  const globalLanguages =
    useSelector(state => state?.globalSlice?.pramotnalBannersData?.languages) ||
    {};

  // 🔹 Local state
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState('hindi');
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [langPosition, setLangPosition] = useState(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    if (globalVideos.length) {
      setVideos(globalVideos);
      setIndex(0);
    }
  }, [globalVideos]);

  useEffect(() => {
    setPaused(true);
    setLoading(true);
  }, [language, index]);

  if (!videos.length) return null;

  const currentVideo = videos[index];

  // 🔥 Dynamic video resolver
  const getVideoByLanguage = () => {
    const key = `${language}_video_url`;
    return currentVideo?.[key] || currentVideo?.hindi_video_url;
  };

  const videoUri = getVideoByLanguage();

  // 👁 View count
  const updateView = async () => {
    try {
      await PRAMOTIONAL_VIDEO_ACTIONS({
        action: 'promotional-video-view',
        video_id: currentVideo?.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // ❤️ Like
  const updateLikeVideo = async () => {
    try {
      await PRAMOTIONAL_VIDEO_ACTIONS({
        action: 'promotional-video-like',
        video_id: currentVideo?.id,
        like_status: currentVideo?.is_liked == 0 ? 1 : 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const togglePlay = () => {
    if (paused) {
      setMuted(false);
      updateView();
    }
    setPaused(p => !p);
  };

  const changeVideo = dir => {
    setPaused(true);
    setLoading(true);
    setIndex(prev => (prev + dir + videos.length) % videos.length);
  };

  const openLanguageModal = () => {
    langBtnRef.current?.measureInWindow((x, y, width, height) => {
      setLangPosition({x, y, width, height});
      setLangModalVisible(true);
    });
  };

  return (
    <View style={styles.media}>
      {/* 🎬 Video */}
      <Video
        key={`${currentVideo?.id}-${language}`}
        ref={videoRef}
        source={{uri: videoUri}}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        controls={false}
        muted={muted}
        repeat
        onLoadStart={() => setLoading(true)}
        onLoad={() => {
          setLoading(false);
          if (Platform.OS === 'android') {
            videoRef.current?.seek(2);
          }
        }}
        onBuffer={({isBuffering}) => setBuffering(isBuffering)}
        onError={() => {
          setLoading(false);
          setBuffering(false);
        }}
      />

      {/* ❤️ Like */}
      <View style={styles.likeWrap}>
        <TouchableOpacity
          style={styles.likeBtn}
          onPress={() => {
            updateLikeVideo();
            setVideos(prev =>
              prev.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      is_liked: item.is_liked ? 0 : 1,
                      likeCount: item.is_liked
                        ? parseInt(item.likeCount || 1) - 1
                        : parseInt(item.likeCount || 0) + 1,
                    }
                  : item,
              ),
            );
          }}>
          <FontAwesome
            name={currentVideo.is_liked ? 'heart' : 'heart-o'}
            size={22}
            color={currentVideo.is_liked ? '#ff375f' : '#fff'}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{currentVideo?.likeCount || 0}</Text>
      </View>

      {/* 👁 Views */}
      <View style={styles.viewsWrap}>
        <Text style={styles.viewText}>
          {currentVideo?.viewCount || 0} Views
        </Text>
      </View>

      {/* ◀ ▶ */}
      <TouchableOpacity
        style={[styles.control, styles.prev]}
        onPress={() => changeVideo(-1)}>
        <Text style={styles.controlText}>‹</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.control, styles.next]}
        onPress={() => changeVideo(1)}>
        <Text style={styles.controlText}>›</Text>
      </TouchableOpacity>

      {/* ▶ Play */}
      <TouchableOpacity style={styles.playToggle} onPress={togglePlay}>
        {loading && buffering ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.playText}>{paused ? '▶' : '❚❚'}</Text>
        )}
      </TouchableOpacity>

      {/* 🔇 Mute */}
      <TouchableOpacity
        style={styles.muteToggle}
        onPress={() => setMuted(m => !m)}>
        <Text style={styles.playText}>{muted ? '🔇' : '🔊'}</Text>
      </TouchableOpacity>

      {/* 🌐 Language Button */}
      <TouchableOpacity
        ref={langBtnRef}
        style={styles.langToggle}
        onPress={openLanguageModal}>
        <Text style={styles.langText}>
          {globalLanguages?.[language] || 'हिंदी'}
        </Text>
      </TouchableOpacity>

      {/* 🌐 Anchored Language Modal */}
      <Modal visible={langModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.fullOverlay}
          activeOpacity={1}
          onPress={() => setLangModalVisible(false)}>
          {langPosition && (
            <View
              style={[
                styles.anchorModal,
                {
                  top: langPosition.y - 10,
                  left: langPosition.x + langPosition.width / 2 - 80,
                },
              ]}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(globalLanguages).map(key => {
                  const available = !!currentVideo?.[`${key}_video_url`];
                  return (
                    <TouchableOpacity
                      key={key}
                      style={styles.langItem}
                      onPress={() => {
                        setLanguage(key);
                        setPaused(true);
                        setLoading(true);
                        setLangModalVisible(false);
                      }}>
                      <Text
                        style={[
                          styles.langItemText,
                          !available && {opacity: 0.4},
                          language === key && styles.langActive,
                        ]}>
                        {globalLanguages[key]}
                        {!available && ' (NA)'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  media: {
    height: 220,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#00000071',
    overflow: 'hidden',
  },
  video: {width: '100%', height: '100%'},
  control: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -15}],
    paddingHorizontal: 10,
  },
  prev: {left: 6},
  next: {right: 6},
  controlText: {fontSize: 32, color: '#fff'},

  playToggle: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteToggle: {
    position: 'absolute',
    bottom: 8,
    right: 48,
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langToggle: {
    position: 'absolute',
    bottom: 8,
    right: 86,
    backgroundColor: 'rgba(0,0,0,0.55)',
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  playText: {color: '#fff', fontSize: 14},
  langText: {color: '#fff', fontSize: 11},

  likeWrap: {
    position: 'absolute',
    top: 8,
    right: 10,
    alignItems: 'center',
  },
  likeBtn: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 6,
    borderRadius: 20,
  },
  likeCount: {color: '#fff', fontSize: 12},

  viewsWrap: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  viewText: {color: '#fff', fontSize: 12},

  fullOverlay: {
    flex: 1,
  },

  anchorModal: {
    position: 'absolute',
    width: 160,
    maxHeight: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
  },

  langItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  langItemText: {
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
  },
  langActive: {
    color: '#16588e',
    fontWeight: '600',
  },
});
