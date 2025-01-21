import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView, Platform} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../components/Header';

const CommanWebview = () => {
  const route = useRoute();
  const webviewRef = useRef(null);

  // Extract URL and authentication flag from route parameters
  const url = route?.params?.url;
  const isAuthenticated = route?.params?.isAuthenticated ?? true;

  // Script to remove specific classes and eliminate spacing
  const removeClassesScript = `
    const elementsToHide = [
      '.header_area',
      '.header_white',
      '.navbar-header',
      '.btn.btn-default'
    ];
    
    elementsToHide.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = 'none';
        element.style.margin = '0';
        element.style.padding = '0';
      }
    });

    true; // Required for Android
  `;

  // Inject JavaScript after the page loads
  const removeHeader = () => {
    if (webviewRef?.current) {
      webviewRef.current.injectJavaScript(removeClassesScript);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={true}
        isAuthenticated={isAuthenticated}
        customeNavigation={{
          name: 'TrustedDriver',
        }}
      />
      <WebView
        ref={webviewRef}
        style={{flex: 1}}
        source={{uri: url}}
        startInLoadingState={true}
        javaScriptEnabled={true} // Ensure JS is enabled
        domStorageEnabled={true} // Required for modern web apps
        onLoadEnd={() => removeHeader()} // Call to remove elements after load
        // Platform-specific considerations
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'} // iOS gesture support
        setSupportMultipleWindows={Platform.OS === 'android'} // Handle multiple windows on Android
      />
    </SafeAreaView>
  );
};

export default CommanWebview;
