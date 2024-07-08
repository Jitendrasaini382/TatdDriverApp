import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { AppColors } from '../assets/Colors';

const SwipeableButton = ({ onSwipe }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50) {
        // Swiped far enough to trigger action
        onSwipe();
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.button, { transform: [{ translateX }] }]}>
          <View style={styles.circle}>
            <Text style={styles.arrow}>→</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Please accept the booking</Text>
            <Text style={styles.acceptText}>Accept</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: AppColors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,marginVertical:20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: AppColors.white,
    fontSize: 20,

  },
  textContainer: {
    marginLeft: 15,

  },
  text: {
    fontSize: 16,
    color: AppColors.black
  },
  acceptText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: AppColors.black
  },
});

export default SwipeableButton;
