import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {SAVE_CRASH_ERROR} from '../apis/Apis';
const appVersion = DeviceInfo.getVersion();

const ErrorBoundary = ({Component, ...props}) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(true);
  const [key, setKey] = useState(0);

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

  return (
    <CrashErrorWrapper
      Component={Component}
      key={key}
      {...props}
      navigation={navigation}
      onRetry={() => setKey(prev => prev + 1)}
    />
  );
};

class CrashErrorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      selectedLanguage: 'Hindi',
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error};
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ CrashErrorWrapper caught an error:', error, errorInfo);
    const routeName = this.props.route?.name ?? 'UnknownRoute';
    this.logErrorToServer(error, errorInfo, routeName);
  }

  async logErrorToServer(error, errorInfo, route) {
    const logPayload = {
      action: 'crash_reporting',
      message: error?.message || 'No message',
      stack: error?.stack || 'No stack',
      component_stack: errorInfo?.componentStack || 'No componentStack',
      component: route,
      version: appVersion,
    };

    try {
      const res = await SAVE_CRASH_ERROR(logPayload);
      console.log('📤 Error log sent:', res);
    } catch (logError) {
      console.warn('⚠️ Failed to send error log:', logError.message);
    }
  }

  handleRetry = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {Component, ...rest} = this.props;
    const {selectedLanguage} = this.state;

    const messages = {
      Hindi: {
        title: '😕 ओह! कुछ गलत हो गया',
        subtitle:
          'कुछ परेशानी हुई है। चिंता न करें — हम इसे ठीक कर रहे हैं। कृपया पुनः प्रयास करें।',
        retry: 'Try Again',
      },
      English: {
        title: '😕 Oops! Something went wrong',
        subtitle:
          'There was a small problem. Don’t worry — we’re fixing it. Please try again.',
        retry: 'Try Again',
      },
    };

    const {title, subtitle, retry} = messages[selectedLanguage];

    if (this.state.hasError) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Header backButton={true} />
          <View
            style={{
              flex: 1,
              padding: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedLanguage === 'Hindi' && styles.selectedButton,
                ]}
                onPress={() => this.setState({selectedLanguage: 'Hindi'})}>
                <Text
                  style={[
                    styles.text,
                    selectedLanguage === 'Hindi' && styles.selectedText,
                  ]}>
                  Hindi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  selectedLanguage === 'English' && styles.selectedButton,
                ]}
                onPress={() => this.setState({selectedLanguage: 'English'})}>
                <Text
                  style={[
                    styles.text,
                    selectedLanguage === 'English' && styles.selectedText,
                  ]}>
                  English
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              {/* <Text style={styles.emoji}>😕</Text> */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={this.handleRetry}>
                <Text style={styles.retryText}>{retry}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return <Component {...rest} />;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  noInternetOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  noInternetText: {
    color: AppColors.white,
    fontSize: 18,
    marginTop: 10,
  },
  noInternetSubText: {
    color: AppColors.white,
    fontSize: 14,
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.black,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedButton: {
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: AppColors.mainColor,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
  },
  retryText: {
    color: AppColors.white,
    fontSize: 18,
  },
});
