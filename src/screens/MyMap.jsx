import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import {SAVE_LIVE_DRIVER_LATLONG} from '../apis/Apis';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
const screenHeight = Dimensions.get('window').height;


const MyMap = ({navigation, route}) => {
  const {googleMapsWebURL, timing, bookingNumber} = route?.params;
  const [location, setLocation] = useState({latitude: null, longitude: null});
  const webViewRef = useRef(null);

  const clickedOnceRef = useRef(false); // 👉 added this line

  console.log(screenHeight,"screenHeightscreenHeightscreenHeight");
  

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          console.log('Current location:', latitude, longitude);

          try {
            // await SAVE_LIVE_DRIVER_LATLONG({
            //   latitude,
            //   longitude,
            //   booking_number: bookingNumber,
            // });

            const response = await SAVE_LIVE_DRIVER_LATLONG({
              latitude,
              longitude,
              booking_number: bookingNumber,
            });

            console.log('API response:', response);

            if (isMounted) {
              setLocation({latitude, longitude});
            }
          } catch (error) {
            console.error('Error saving live location:', error);
          }
        },
        error => {
          console.warn('Error getting location:', error);
        },
        {maximumAge: 0},
      );
    };

    getLocation();
    const locationInterval = setInterval(getLocation, timing || 10000);

    return () => {
      isMounted = false;
      clearInterval(locationInterval);
    };
  }, []);

  // ✅ Function to remove HTML elements via JS
  const removeHtml = () => {
    if (clickedOnceRef.current) return; // ❗️Already clicked, don't run again

    const jsCode = `
    setTimeout(function() {
    var locationButton = document.querySelector('button[aria-label="Re-center map to your location"]');
    if (locationButton) {
      locationButton.click();
    }
      ['.EHxcof','.PNiBVc','.BOQozb','.Galx4b', '.LCTIRd','button[aria-label="Start"]'].forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(el) {
          el.style.display = 'none';
        });
      });
    }, 2000);
    true;
  `;
    webViewRef.current?.injectJavaScript(jsCode);
    clickedOnceRef.current = true; // ✅ mark as clicked
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          height: '13.8%',
          width: '100%',
          backgroundColor: 'white',
        }}>
        <Header backButton={true} />
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: googleMapsWebURL}}
        style={{flex: 1}}
        javaScriptEnabled={true}
        scrollEnabled={false}
        onLoadEnd={removeHtml}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          bottom: 0,
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: AppColors.white,
            height: 55,
            width: '100%',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyMap;
