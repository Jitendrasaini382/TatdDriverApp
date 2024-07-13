import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {createContext} from 'react';
// import { Link, useNavigate } from "react-router-dom";

export const TokenConstextApi = createContext(null);

export const GlobalContextApi = ({children}) => {
  //   const navigate = useNavigate()

  const [data, setData] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [ticketsData, setTicketData] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [buttonShow, setButtonShow] = useState(false);
  const [showButtonText, setShowButtonText] = useState('');

  const getTokens = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const jwtToken = await AsyncStorage.getItem('jwt');

      console.log(refreshToken, 'refresh_token context');
      //   console.log(jwtToken, 'jwt_token context');
      setJwtToken(jwtToken);
      setRefreshToken(refreshToken);

      return {refreshToken, jwtToken};
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  };

  useEffect(() => {
    getTokens();
  }, []);

  const values = {
    data,
    setData,
    jwtToken,
    ticketsData,
    buttonShow,
    setButtonShow,
    showButtonText,
    setShowButtonText,
    setTicketData,
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
