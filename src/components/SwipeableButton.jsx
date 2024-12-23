import React, {useRef} from 'react';
import {View, Text, StyleSheet, Animated, Alert} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {AppColors} from '../assets/Colors';
import RightArrowIcon from 'react-native-vector-icons/AntDesign';

const SwipeableButton = ({onSwipe}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationX} = event.nativeEvent;
      console.log(translateX);
      if (translationX > 100) {
        // Swiped far enough to trigger action
        onSwipe();
      }
      // Reset position to starting point
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
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.circle, {transform: [{translateX}]}]}>
          {/* <Text style={styles.arrow}></Text> */}
          <RightArrowIcon color={'white'} size={25} name="arrowright" />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Please accept the booking</Text>
        {/* <Text style={{

    fontSize: 16,
    color: AppColors.black,
    fontWeight:"bold"
        }}>Swipe when leaving home</Text> */}
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
    // position:"absolute",
    // height: 80,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: AppColors.white,
    fontSize: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    height: 80,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: AppColors.black,
  },
});

export default SwipeableButton;
