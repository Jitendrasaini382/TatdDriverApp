import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../components/Header';

const CommanWebview = () => {
  const route = useRoute();
  const webviewRef = useRef(null);

  // Extract URL from the route parameters
  const url = route?.params?.url;
  const isAuthenticated = route?.params?.isAuthenticated ?? true;

  const removeClassesScript = `
  document.querySelector('.header_area').style.display = 'none';
  document.querySelector('.header_white').style.display = 'none';
  true; // Required for Android
`;

  const removeHeader = () => {
    setTimeout(() => {
      if (webviewRef?.current) {
        webviewRef.current.injectJavaScript(removeClassesScript);
      }
    }, 0);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} isAuthenticated={isAuthenticated} />
      <WebView
        ref={webviewRef}
        style={{flex: 1}}
        source={{uri: url}}
        startInLoadingState={true}
        onLoadEnd={() => removeHeader()}
        onNavigationStateChange={navState => {
          console.log('Navigating to:', navState.url);
        }}
      />
    </SafeAreaView>
  );
};

export default CommanWebview;
