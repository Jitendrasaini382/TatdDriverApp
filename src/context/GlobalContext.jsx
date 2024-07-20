import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {createContext} from 'react';
import {Alert} from 'react-native';
import {jwtDecode} from 'jwt-decode';

export const TokenConstextApi = createContext(null);

export const GlobalContextApi = ({children}) => {
  const [languageSwitch, setLanguageSwitch] = useState('hindi');
  // const [tokenData, setTokenData] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [ticketsData, setTicketData] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [rating, setRating] = useState(0);
  const [buttonShow, setButtonShow] = useState(false);
  const [showButtonText, setShowButtonText] = useState('');
  const [storedRating, setStoredRating] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);

  // Copyconst [tokens, setTokens] = useState({ jwtToken: null, refreshToken: null });

  const decodeData = useCallback((token) => {
    if (!token) {
      return null;
    } else {
      const decoded = jwtDecode(token);
      console.log(decoded.data, '>>>>>>>>>>>>>>>>');
      setDecodedToken(decoded.data);
    }
  }, []);
  
  const getTokens = useCallback(async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const jwtToken = await AsyncStorage.getItem('jwt');
  
      console.log(refreshToken, 'refresh_token context');
  
      setJwtToken(jwtToken);
      decodeData(jwtToken);
      setRefreshToken(refreshToken);
      return {refreshToken, jwtToken};
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  }, [decodeData]);
  
  useEffect(() => {
    getTokens();
  }, []);

  // console.log(decodedToken, 'jjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkk');

  // const getTokens = async () => {
  //   try {
  //     const refreshToken = await AsyncStorage.getItem('refresh_token');
  //     const jwtToken = await AsyncStorage.getItem('jwt');

  //     console.log(refreshToken, 'refresh_token context');
  //     // console.log(jwtToken, 'jwt_token context');
  //     setJwtToken(jwtToken);
  //     setRefreshToken(refreshToken);

  //     return {refreshToken, jwtToken};
  //   } catch (error) {
  //     console.error('Error retrieving tokens:', error);
  //     return null;
  //   }
  // };

  // console.log(
  //   decodedToken,
  //   ' decode context ====================================',
  // );

  // const decodeJwtToken = token => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     return decoded;
  //   } catch (error) {
  //     console.error('Error decoding JWT:', error);
  //     return null;
  //   }
  // };

  // /////////////

  // const getTokens = async () => {
  //   try {
  //     const refreshToken = await AsyncStorage.getItem('refresh_token');
  //     const jwtToken = await AsyncStorage.getItem('jwt');

  //     console.log(refreshToken, 'refresh_token context');
  //     setJwtToken(jwtToken);
  //     setRefreshToken(refreshToken);

  //     return {refreshToken, jwtToken};
  //   } catch (error) {
  //     console.error('Error retrieving tokens:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getTokens();
  // }, []);

  // ///////

  const values = {
    jwtToken,
    ticketsData,
    // tokenData,
    // setTokenData,
    buttonShow,
    setButtonShow,
    showButtonText,
    storedRating,
    setStoredRating,
    setShowButtonText,
    rating,
    decodedToken,
    setDecodedToken,
    setRating,
    setTicketData,
    languageSwitch,
    setLanguageSwitch,
    notificationData,
    setNotificationData,
    faqData,
    setFaqData,
    setJwtToken,
    selectedTicketId,
    setSelectedTicketId,
    refreshToken,
    setRefreshToken,
  };

  return (
    <TokenConstextApi.Provider value={values}>
      {children}
    </TokenConstextApi.Provider>
  );
};
