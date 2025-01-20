import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {AppColors} from '../assets/Colors';
import {CloseEnvelop, OpenEnvelop} from '../assets/images';
import {HOME_AWARENESS} from '../apis/Apis';

const {width} = Dimensions.get('window');

const responsiveSize = size => (width / 411.42857142857144) * size;

const ViewAwarenessData = () => {
  const navigation = useNavigation();

  const [awarenessData, setAwareness] = useState([]);

  const getAllAwareness = useCallback(async () => {
    try {
      const response = await HOME_AWARENESS({
        action: 'view_all_awareness',
      });
      setAwareness(response.awareness_data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAllAwareness();
  }, []);

  const handleAwarenessPress = useCallback(
    awareness => {
      navigation.navigate('NoticeBoardDetail', {
        noticeId: awareness.id,
      });
    },
    [navigation],
  );

  return (
    <>
      {awarenessData &&
        awarenessData.map(awareness => (
          <View key={awareness.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => handleAwarenessPress(awareness)}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={
                    awareness.status_image === 'open_envlop.png'
                      ? OpenEnvelop
                      : CloseEnvelop
                  }
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.subjectText}>{awareness.subject}</Text>
              </View>
              <View style={styles.timestampContainer}>
                <Text style={styles.timestampText}>{awareness.timestamp}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 15,
    padding: 8,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  },
  subjectText: {
    color: AppColors.black,
    fontSize: responsiveSize(15),
    fontWeight: '500',
  },
  timestampContainer: {
    marginLeft: 10,
  },
  timestampText: {
    color: AppColors.black,
    fontSize: responsiveSize(12),
  },
});

export default ViewAwarenessData;
