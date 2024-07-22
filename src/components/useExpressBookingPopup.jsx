import {useEffect, useState} from 'react';
import {EXPRESS_BOOKING_POPUP} from '../apis/Apis';

export const useExpressBookingPopup = () => {
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        setLoading(true);
        const response = await EXPRESS_BOOKING_POPUP({
          action: 'check_popup',
        });
        setPopupData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopupData();
  }, []);

  return {popupData, loading, error};
};
