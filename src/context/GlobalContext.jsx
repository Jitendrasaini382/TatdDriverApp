import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {createContext} from 'react';
import {Alert} from 'react-native';
// import { Link, useNavigate } from "react-router-dom";

export const TokenConstextApi = createContext(null);

export const GlobalContextApi = ({children}) => {

  const [languageSwitch, setLanguageSwitch] = useState(null);
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

  // console.log(jwtToken, 'jjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkk');

  const getTokens = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const jwtToken = await AsyncStorage.getItem('jwt');

      console.log(refreshToken, 'refresh_token context');
      // console.log(jwtToken, 'jwt_token context');
      setJwtToken(jwtToken);
      setRefreshToken(refreshToken);

      return {refreshToken, jwtToken};
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  };

  // const generateNewJwt = async () => {
  //   console.log(refreshToken,"hhhhhhhhhhhhhh");
  //   try {
  //     const response = await REFRESH_TOKEN({
  //       refresh_token: refreshToken,
  //     });
  //     console.log(response);
  //     Alert.alert('p');
  //     console.log(response.jwt, 'refresh JWT');
  //     setJwtToken(response.jwt);
  //     AsyncStorage.setItem('jwt', response.jwt);
  //   } catch (err) {
  //     Alert.alert('qq');

  //     console.log(err, 'err geneterate');
  //   }
  // };

  useEffect(() => {
    getTokens();
  }, []);

  const values = {
    jwtToken,
    ticketsData,
    buttonShow,
    setButtonShow,
    showButtonText,
    storedRating,
    setStoredRating,
    setShowButtonText,
    rating,
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
