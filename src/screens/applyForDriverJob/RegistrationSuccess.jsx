import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetUserAuthState} from '../../redux/slices/userAuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const isSmallDevice = height < 700;

const RegistrationSuccess = ({navigation}) => {
  const route = useRoute();
  const {response} = route?.params;
  const [language, setLanguage] = useState('hi'); // Language state
  const dispatch = useDispatch();

  const content = {
    hi: {
      regId: 'पंजीकरण आईडी',
      driverName: 'चालक का नाम',
      date: 'तारीख',
      payment: 'भुगतान स्थिति',
      paymentStatus: 'Completed',
      dashboard: '🚗 Go to Login',
    },
    en: {
      regId: 'Registration ID',
      driverName: 'Driver Name',
      date: 'Date',
      payment: 'Payment Status',
      paymentStatus: 'Completed',
      dashboard: '🚗 Go to Login',
    },
  };

  function formatDate(inputTime) {
    const date = new Date(inputTime);

    const day = String(date.getDate()).padStart(2, '0'); // '28'
    const month = String(date.getMonth() + 1).padStart(2, '0'); // '05'
    const year = date.getFullYear(); // '2025'

    return `${day}-${month}-${year}`;
  }

  const [particleAnimations] = useState(() =>
    Array(8)
      .fill(0)
      .map(() => new Animated.Value(0)),
  );

  const cardAnimation = useRef(new Animated.Value(0)).current;
  const checkmarkAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(1)).current;
  const starsAnimations = useRef(
    Array(5)
      .fill(0)
      .map(() => new Animated.Value(0)),
  ).current;
  const detailsAnimation = useRef(new Animated.Value(0)).current;
  const headerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startEntranceAnimations();
    startParticleAnimations();
  }, []);

  const startEntranceAnimations = () => {
    Animated.spring(headerAnimation, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.spring(cardAnimation, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 200);

    setTimeout(() => {
      Animated.spring(checkmarkAnimation, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 600);

    setTimeout(() => {
      Animated.spring(detailsAnimation, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 800);

    starsAnimations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }, 1000 + index * 100);
    });
  };

  const startParticleAnimations = () => {
    particleAnimations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 2000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          {iterations: -1},
        ).start();
      }, index * 200);
    });
  };

  const Particle = ({index}) => (
    <Animated.View
      style={[
        styles.particle,
        {
          left: Math.random() * width,
          top: Math.random() * height,
          opacity: particleAnimations[index].interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              scale: particleAnimations[index].interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
            },
          ],
        },
      ]}
    />
  );

  useEffect(() => {
    const backAction = () => {
      dispatch(resetUserAuthState());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#16588e" />

      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']}
        style={styles.backgroundGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />

      <View style={styles.particlesContainer}>
        {particleAnimations.map((_, index) => (
          <Particle key={index} index={index} />
        ))}
      </View>

      {/* Language Toggle Button */}
      <TouchableOpacity
        onPress={() => setLanguage(prev => (prev === 'hi' ? 'en' : 'hi'))}
        style={{
          alignSelf: 'flex-end',
          marginTop: 20,
          marginRight: 20,
          backgroundColor: '#ffffffbb',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 12,
          elevation: 4,
        }}>
        <Text style={{fontSize: 12, fontWeight: '600'}}>
          {language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
        </Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.mainCard,
          {
            transform: [
              {
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
              {
                scale: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
            opacity: cardAnimation,
          },
        ]}>
        <View style={styles.cardContent}>
          <View style={styles.successMessage}>
            <Text style={styles.successText}>
              {language === 'en'
                ? response?.english_title
                : response?.hindi_title}
            </Text>
            <Text style={styles.successSubtext}>
              {language === 'en'
                ? response?.english_subtitle
                : response?.hindi_subtitle}
            </Text>
          </View>

          <Animated.View
            style={[
              styles.detailsSection,
              {
                transform: [
                  {
                    translateY: detailsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
                opacity: detailsAnimation,
              },
            ]}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <LinearGradient
                  colors={['#16588e', '#2172b8']}
                  style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>#</Text>
                </LinearGradient>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>
                    {content[language].regId}
                  </Text>
                  <Text style={styles.detailValue}>
                    {response?.application_id}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <LinearGradient
                  colors={['#16588e', '#2172b8']}
                  style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>👤</Text>
                </LinearGradient>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>
                    {content[language].driverName}
                  </Text>
                  <Text style={styles.detailValue}>
                    {response?.driver_name}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <LinearGradient
                  colors={['#16588e', '#2172b8']}
                  style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>📅</Text>
                </LinearGradient>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>
                    {content[language].date}
                  </Text>
                  <Text style={styles.detailValue}>
                    {formatDate(response?.registration_date)}
                  </Text>
                </View>
              </View>

              <View style={[styles.detailRow, styles.lastDetailRow]}>
                <LinearGradient
                  colors={['#10b981', '#6ee7b7']}
                  style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>✓</Text>
                </LinearGradient>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>
                    {content[language].payment}
                  </Text>
                  <Text style={[styles.detailValue, {color: '#10b981'}]}>
                    {content[language].paymentStatus}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.loginButtonContainer,
              {
                transform: [{scale: buttonAnimation}],
              },
            ]}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => dispatch(resetUserAuthState())}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#16588e', '#2172b8']}
                style={styles.loginButtonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <Text style={styles.loginButtonText}>
                  {content[language].dashboard}
                </Text>
                <Icon name="arrow-forward" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 1.5,
  },
  mainCard: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    elevation: 20,
    shadowColor: '#16588e',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardContent: {
    flex: 1,
    padding: isSmallDevice ? 20 : 24,
    justifyContent: 'flex-start',
  },
  successMessage: {
    alignItems: 'center',
    paddingVertical: isSmallDevice ? 16 : 20,
    paddingHorizontal: isSmallDevice ? 16 : 20,
    backgroundColor: 'rgba(236, 253, 245, 0.8)',
    borderRadius: 16,
    marginBottom: isSmallDevice ? 24 : 28,
    borderWidth: 2,
    borderColor: 'rgba(110, 231, 183, 0.5)',
  },
  successText: {
    color: '#065f46',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: isSmallDevice ? 20 : 22,
  },
  successSubtext: {
    color: '#10b981',
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: isSmallDevice ? 16 : 18,
  },
  detailsSection: {
    marginBottom: isSmallDevice ? 28 : 32,
  },
  detailsContainer: {
    backgroundColor: 'rgba(248, 250, 252, 0.6)',
    borderRadius: 16,
    padding: isSmallDevice ? 16 : 20,
    borderWidth: 1,
    borderColor: 'rgba(22, 88, 142, 0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isSmallDevice ? 12 : 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 88, 142, 0.08)',
  },
  lastDetailRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  detailIcon: {
    width: isSmallDevice ? 32 : 36,
    height: isSmallDevice ? 32 : 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    elevation: 3,
    shadowColor: '#16588e',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailIconText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: 'white',
    fontWeight: 'bold',
  },
  detailInfo: {
    flex: 1,
  },
  detailTitle: {
    fontSize: isSmallDevice ? 11 : 12,
    color: '#6b7280',
    marginBottom: 3,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#111827',
    fontWeight: '700',
    lineHeight: isSmallDevice ? 18 : 20,
  },
  loginButtonContainer: {
    marginBottom: isSmallDevice ? 16 : 20,
  },
  loginButton: {
    borderRadius: 16,
    elevation: 12,
    shadowColor: '#16588e',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isSmallDevice ? 16 : 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '700',
    marginRight: 8,
  },
  loginButtonArrow: {
    color: 'white',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '700',
  },
  footerNote: {
    alignItems: 'center',
    backgroundColor: 'rgba(22, 88, 142, 0.08)',
    borderRadius: 12,
    paddingVertical: isSmallDevice ? 10 : 12,
    paddingHorizontal: isSmallDevice ? 12 : 16,
    borderWidth: 1,
    borderColor: 'rgba(22, 88, 142, 0.15)',
  },
  footerText: {
    color: '#0d3d62',
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: isSmallDevice ? 15 : 16,
  },
  star: {
    fontSize: isSmallDevice ? 16 : 18,
    marginHorizontal: 2,
  },
});

export default RegistrationSuccess;
