import MapboxNavigation from '@pawan-pk/react-native-mapbox-navigation';
import axios from 'axios';
import {Platform, StyleSheet} from 'react-native';
import {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ANALYISIS_MAPBOX_USAGE,
  UPDATE_DRIVER_LATLONGS_VIA_LIVE_TRACK,
} from '../apis/Apis';

export default function Drivertrack({route, navigation}) {
  const {
    bookingNumber,
    drivernumber,
    clatlong,
    currentLocation,
    customerNumber,
  } = route.params ?? {};
  const lastSentRef = useRef(0);
  const prevLocationRef = useRef({lat: null, lng: null});
  const socketRef = useRef(null);
  const latestLocationRef = useRef(null); // 👈 latest location store
  useEffect(() => {
    // do heavy map init
    if (route.params?.onReady) {
      route.params.onReady(); // tell parent to hide loader
    }
  }, []);
  const customerLocation = clatlong
    ? {
        latitude: parseFloat(clatlong.split(' ')[0]),
        longitude: parseFloat(clatlong.split(' ')[1]),
      }
    : {latitude: null, longitude: null};

  const sendanalysisForMapBox = async () => {
    try {
      const res = await ANALYISIS_MAPBOX_USAGE({
        // mobile_number: customerNumber,
        booking_number: bookingNumber,
      });
      // if (__DEV__) {
      console.log(res);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // WebSocket setup
    sendanalysisForMapBox();
    const socket = new WebSocket('ws://13.127.217.133:8080');
    socketRef.current = socket;

    socket.onopen = () => console.log('Socket connected ✅');
    socket.onmessage = e => console.log('Message from server:', e.data);
    socket.onerror = e => console.log('WebSocket error:', e.message);
    socket.onclose = () => console.log('Socket closed ❌');

    // 🔄 Interval for API call every 30 sec
    const interval = setInterval(async () => {
      if (latestLocationRef.current) {
        const {latitude, longitude, heading} = latestLocationRef.current;
        try {
          const res = await UPDATE_DRIVER_LATLONGS_VIA_LIVE_TRACK({
            booking_number: bookingNumber,
            driver_mobile: drivernumber,
            latitude: latitude,
            longitude: longitude,
            action: 'driver-track-latlong-socket',
          });
          console.log(res);
        } catch (error) {
          console.log('poiuytr');
          console.log(error);
        }
      }
    }, 30000);

    return () => {
      if (socketRef.current) socketRef.current.close();
      clearInterval(interval); // cleanup interval
    };
  }, [drivernumber, bookingNumber]);

  const locationsAreSame = (lat1, lng1, lat2, lng2) => {
    return Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapboxNavigation
        startOrigin={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        destination={{
          latitude: customerLocation?.latitude,
          longitude: customerLocation?.longitude,
        }}
        logoEnabled={true}
        attributionEnabled={true}
        style={styles.container}
        // shouldSimulateRoute={Platform.OS=="android"?true:false}
        shouldSimulateRoute={false}
        showCancelButton={true}
        hideStatusView={true}
        hideNavBar={true}
        language="hi"
        onLocationChange={e => {
          const now = Date.now();

          // save latest location for API interval
          latestLocationRef.current = e;

          if (socketRef.current && socketRef.current.readyState === 1) {
            if (now - lastSentRef.current > 2000) {
              const prev = prevLocationRef.current;
              if (
                !locationsAreSame(prev.lat, prev.lng, e?.latitude, e?.longitude)
              ) {
                lastSentRef.current = now;
                prevLocationRef.current = {
                  lat: e?.latitude,
                  lng: e?.longitude,
                };

                socketRef.current.send(
                  JSON.stringify({
                    action: 'publish',
                    topic: 'bookingLatlong',
                    data: {
                      driverLatitude: e?.latitude,
                      driverLongitude: e?.longitude,
                      driverMobile: drivernumber,
                      bookingNumber: bookingNumber,
                      heading: e?.heading,
                    },
                  }),
                );
                // console.log('Sent via socket ✅', e.latitude, e.longitude);
              } else {
                // console.log('Skipped duplicate location ❌');
              }
            }
          }
        }}
        onCancelNavigation={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
