  import {createContext,  useState} from 'react';

  export const TokenConstextApi = createContext(null);

  export const GlobalContextApi = ({children}) => {
    const [languageSwitch, setLanguageSwitch] = useState('hindi');
    const [ticketsData, setTicketData] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [rating, setRating] = useState(0);
    const [buttonShow, setButtonShow] = useState(false);
    const [showButtonText, setShowButtonText] = useState('');
    const [storedRating, setStoredRating] = useState(null);
    const [notificationData, setNotificationData] = useState([]);


    const values = {
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
    };

    return (
      <TokenConstextApi.Provider value={values}>
        {children}
      </TokenConstextApi.Provider>
    );
  };
