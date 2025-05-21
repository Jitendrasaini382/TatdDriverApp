import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {AppColors} from '../assets/Colors';
import RightArrowIcon from 'react-native-vector-icons/AntDesign';

const SwipeableButton = ({onSwipe, data}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {
      useNativeDriver: true,
    },
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationX: gestureX} = event.nativeEvent;

      if (gestureX > 100 && typeof onSwipe === 'function') {
        onSwipe(); // Trigger swipe callback
      }

      // Safely reset to starting position
      if (isMounted.current && translateX) {
        try {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } catch (error) {
          console.log('Animation error:', error);
        }
      }
    }
  };

  if (!data) return null; 

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.circle, {transform: [{translateX}]}]}>
          <RightArrowIcon color={'white'} size={25} name="arrowright" />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{data?.next_booking_status_text}</Text>
        <Text style={[styles.text, {fontSize: 18}]}>
          {data?.next_booking_status_name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: AppColors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 20,
    flex: 1,
  },
  circle: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    height: 80,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: AppColors.black,
  },
});

export default SwipeableButton;
