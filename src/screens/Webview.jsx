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
        onNavigationStateChange={navState => {
          console.log('Navigating to:', navState.url);
        }}
        // Platform-specific considerations
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'} // iOS gesture support
        setSupportMultipleWindows={Platform.OS === 'android'} // Handle multiple windows on Android
      />
    </SafeAreaView>
  );
};

export default CommanWebview;










// import React, {useRef} from 'react';
// import {useRoute} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native';
// import WebView from 'react-native-webview';
// import Header from '../components/Header';

// const CommanWebview = () => {
//   const route = useRoute();
//   const webviewRef = useRef(null);

//   // Extract URL from the route parameters
//   const url = route?.params?.url;
//   const isAuthenticated = route?.params?.isAuthenticated ?? true;

//   // Script to remove specific classes from the webpage with console logs
//   const removeClassesScript = `
//     const headerArea = document.querySelector('.header_area');
//     const headerWhite = document.querySelector('.header_white');
//     const navbarHeader = document.querySelector('.navbar-header');
//     const btnDefault = document.querySelector('.btn.btn-default'); // Corrected class syntax
    
//    if (headerArea) headerArea.style.display = 'none';
//     if (headerWhite) headerWhite.style.display = 'none';
//     if (navbarHeader) navbarHeader.style.display = 'none';
//     if (btnDefault) btnDefault.style.display = 'none';
    
//     true; // Required for Android
//   `;

//   // Function to inject JavaScript into WebView
//   const removeHeader = () => {
//     setTimeout(() => {
//       if (webviewRef?.current) {
//         webviewRef.current.injectJavaScript(removeClassesScript);
//       }
//     }, 0);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Header
//         backButton={true}
//         isAuthenticated={isAuthenticated}
//         customeNavigation={{
//           name: 'TrustedDriver',
//         }}
//       />
//       <WebView
//         ref={webviewRef}
//         style={{flex: 1}}
//         source={{uri: url}}
//         startInLoadingState={true}
//         onLoadEnd={() => removeHeader()}
//         onNavigationStateChange={navState => {
//           console.log('Navigating to:', navState.url);
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default CommanWebview;

// // import React, {useRef} from 'react';
// // import {useRoute} from '@react-navigation/native';
// // import {SafeAreaView} from 'react-native';
// // import WebView from 'react-native-webview';
// // import Header from '../components/Header';

// // const CommanWebview = () => {
// //   const route = useRoute();
// //   const webviewRef = useRef(null);

// //   // Extract URL from the route parameters
// //   const url = route?.params?.url;
// //   const isAuthenticated = route?.params?.isAuthenticated ?? true;

// //   const removeClassesScript = `
// //   document.querySelector('.header_area').style.display = 'none';
// //   document.querySelector('.header_white').style.display = 'none';
// //   true; // Required for Android
// // `;

// //   const removeHeader = () => {
// //     setTimeout(() => {
// //       if (webviewRef?.current) {
// //         webviewRef.current.injectJavaScript(removeClassesScript);
// //       }
// //     }, 0);
// //   };

// //   return (
// //     <SafeAreaView style={{flex: 1}}>
// //       <Header backButton={true} isAuthenticated={isAuthenticated} />
// //       <WebView
// //         ref={webviewRef}
// //         style={{flex: 1}}
// //         source={{uri: url}}
// //         startInLoadingState={true}
// //         onLoadEnd={() => removeHeader()}
// //         onNavigationStateChange={navState => {
// //           console.log('Navigating to:', navState.url);
// //         }}
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // export default CommanWebview;
