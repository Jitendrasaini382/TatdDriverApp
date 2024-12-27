import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const CommanWebview = () => {
  const route = useRoute();
  const webviewRef = useRef(null);

  // Extract URL from the route parameters
  const url = route?.params?.url;

  // JavaScript to remove specific classes
  const removeClassesScript = `
  document.querySelector('.header_area')?.classList.remove('header_area');
  document.querySelector('.header_white')?.classList.remove('header_white');
  true; // Required for Android
`;


  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={webviewRef}
        style={{flex: 1}}
        source={{uri: url}}
        startInLoadingState={true}
        injectedJavaScript={removeClassesScript}
        onNavigationStateChange={navState => {
          console.log('Navigating to:', navState.url);
        }}
      />
    </SafeAreaView>
  );
};

export default CommanWebview;
