// ReusableModal.js
import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SlideupModal = ({
  visible,
  onClose,
  loading = false,
  children,
  minHeight = 200,
  backgroundColor = AppColors.white,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // paddingTop: insets.top,
          //   paddingBottom: insets.bottom,
          // marginBottom:100,
        }}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>

        {/* <View> */}
        <View
          style={{
            backgroundColor: backgroundColor,
            minHeight: minHeight,
            maxHeight: SCREEN_HEIGHT * 0.9,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            //   padding: 24,
            paddingHorizontal: 12,
            paddingTop: 24,
            paddingBottom: Platform.OS == 'ios' ? insets.bottom : 0,

            shadowColor: '#000',
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}>
          {/* Close Button */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              position: 'relative',
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                position: 'absolute',
                right: -8,
                top: -8,
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#F7FAFC',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: AppColors.mainColor,
                  fontWeight: '800',
                }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={{}}>
            {loading ? (
              <ActivityIndicator size="large" color={AppColors.mainColor} />
            ) : (
              children
            )}
          </View>
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default SlideupModal;
