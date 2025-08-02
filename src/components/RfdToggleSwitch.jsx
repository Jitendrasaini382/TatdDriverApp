import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet, Text} from 'react-native';

const RfdToggleSwitch = ({
  isOn,
  onToggle,
  size = 'medium',
  activeColor = '#4CAF50',
  inactiveColor = '#E0E0E0',
  thumbColor = '#FFFFFF',
  disabled = false,
  showText = true, // New prop to control text visibility
  textStyle = {}, // New prop for custom text styling
}) => {
  const [isEnabled, setIsEnabled] = useState(isOn);
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  // Size configurations
  const sizeConfig = {
    small: {width: 40, height: 24, thumbSize: 20, padding: 2},
    medium: {width: 50, height: 25, thumbSize: 20, padding: 2},
    large: {width: 60, height: 36, thumbSize: 32, padding: 2},
  };

  const config = sizeConfig[size];

  useEffect(() => {
    setIsEnabled(isOn);
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const trackColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      config.padding,
      config.width - config.thumbSize - config.padding,
    ],
  });

  const thumbScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  // Text opacity animation for smooth fade
  const textOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.3, 1],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      // disabled={disabled}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: config.width,
            height: config.height,
            backgroundColor: trackColor,
            opacity: disabled ? 0.5 : 1,
          },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: config.thumbSize,
              height: config.thumbSize,
              backgroundColor: thumbColor,
              transform: [{translateX: thumbPosition}, {scale: thumbScale}],
            },
          ]}
        />
        {showText && (
          <Animated.Text
            style={[
              styles.switchText,
              {
                opacity: textOpacity,
                fontSize: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
                color: isEnabled ? '#FFFFFF' : '#666666',
                left: !isEnabled ? 25 : 5,
              },
              textStyle,
            ]}>
            {isEnabled ? 'ON' : 'OFF'}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RfdToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    gap: 30,
  },
  switchContainer: {
    alignItems: 'center',
  },
  track: {
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  thumb: {
    borderRadius: 50,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  switchText: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
  },
});
