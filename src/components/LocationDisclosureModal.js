import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal as ReactNativeModal,
  StyleSheet,
} from 'react-native';
import {AppColors} from '../assets/Colors';

const LocationDisclosureModal = ({visible, onAllow, onCancel}) => {
  return (
    <ReactNativeModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Location Access</Text>

          {/* Description */}
          <Text style={styles.description}>
            Tatd uses your location to track your position and assign rides
            accurately while you are actively using the app.
          </Text>

          <Text style={styles.subDescription}>
            Your location is accessed only when the app is in use and is not
            collected or tracked when the app is closed or running in the
            background.
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Skip for now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.allowButton} onPress={onAllow}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: AppColors.white,
    padding: 25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: AppColors.black,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  subDescription: {
    fontSize: 13,
    color: AppColors.black,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: AppColors.gray,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.black,
  },
  allowButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    elevation: 5,
  },
  allowText: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.white,
  },
});

export default LocationDisclosureModal;
