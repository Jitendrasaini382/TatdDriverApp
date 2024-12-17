  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {createContext, useCallback, useEffect, useState} from 'react';
  import jwtDecode from 'jwt-decode';

  export const TokenConstextApi = createContext(null);

  export const GlobalContextApi = ({children}) => {
    const [languageSwitch, setLanguageSwitch] = useState('hindi');
    const [jwtToken, setJwtToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [ticketsData, setTicketData] = useState([]);
    // const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [faqData, setFaqData] = useState([]);
    const [rating, setRating] = useState(0);
    const [buttonShow, setButtonShow] = useState(false);
    const [showButtonText, setShowButtonText] = useState('');
    const [storedRating, setStoredRating] = useState(null);
    const [notificationData, setNotificationData] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);
    const [refreshData, setRefreshData] = useState(true);


    const getTokens = useCallback(async () => {
      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const jwtToken = await AsyncStorage.getItem('jwt');

        console.log(jwtToken, 'jwt_token ');

        setJwtToken(jwtToken);
        // decodeData(jwtToken); // Assuming you have this function elsewhere
        setRefreshToken(refreshToken);

        return {refreshToken, jwtToken};
      } catch (error) {
        console.error('Error retrieving tokens:', error);
        return null;
      }
    }, []); // If you have dependencies, pass them in the array

    useEffect(() => {
      // Wrap your async call in another function to avoid returning a promise
      const fetchTokens = async () => {
        await getTokens();
      };

      fetchTokens(); // Call the async function
    }, [getTokens]);

    console.log("refreshDatarefreshDatarefreshDatarefreshData",refreshData);
    
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
      // selectedTicketId,
      // setSelectedTicketId,
      refreshToken,
      setRefreshToken,
      refreshData,
      setRefreshData,
    };

    return (
      <TokenConstextApi.Provider value={values}>
        {children}
      </TokenConstextApi.Provider>
    );
  };
