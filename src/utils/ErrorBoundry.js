import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {AppColors} from '../assets/Colors';

// Replace this with your actual AppColors

const ErrorBoundry = ({Component, ...props}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.noInternetOverlay}>
        <ActivityIndicator size="large" color={AppColors.red} />
        <Text style={styles.noInternetText}>No Internet Connection</Text>
        <Text style={styles.noInternetSubText}>
          Please check your internet connection
        </Text>
      </View>
    );
  }

  return <Component {...props} />;
};

export default ErrorBoundry;

const styles = StyleSheet.create({
  noInternetOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    color: AppColors.white,
    fontSize: 18,
    marginTop: 10,
    marginTop: 10,
  },
  noInternetSubText: {
    color: AppColors.white,
    fontSize: 14,
    marginTop: 5,
    marginTop: 5,
  },
});
