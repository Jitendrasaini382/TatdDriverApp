import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import {VERIFY_PAYMENT_INFO, VERIFY_PPREMIUM_PAYMENT_INFO} from '../apis/Apis';

const RazorPayPaymentScreen = ({navigation}) => {
  const route = useRoute();
  const pageType = route?.params?.pageType || '';
  const description = route?.params?.description || '';
  const amount = route?.params?.amount || '';
  const orderId = route?.params?.orderId || '';
  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );
  const driverName = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_name,
  );

  console.log(amount, ' : amount========');
  console.log(orderId, ' : orderId=======');
  console.log(pageType, ': pageType======');
  console.log(description, ' : description======');
  console.log(driverName, 'driverName====');
  console.log(driverMobileNumber, 'driverMobileNumber=====');

  const [verifyData, setVerifyData] = useState({});

  useEffect(() => {
    if (
      !amount &&
      !orderId &&
      !driverMobileNumber &&
      !driverName &&
      !pageType &&
      !description
    ) {
      return false;
    } else if (
      amount &&
      orderId &&
      driverMobileNumber &&
      driverName &&
      pageType &&
      description
    ) {
      handlePayment();
    } else {
      console.log(' back to screen');
      navigation.goBack();
    }
  }, [amount, orderId, driverMobileNumber, driverName, pageType, description]);

  const verifyPayment = async id => {
    if (!id) {
      navigation.goBack();
      return false;
    }

    try {
      let response;

      if (pageType === 'chauffeur_uniform') {
        response = await VERIFY_PPREMIUM_PAYMENT_INFO({
          action: 'premium-driver-payment-verify',
          razorpay_payment_id: id,
        });
        console.log(response, 'response VERIFY_PPREMIUM_PAYMENT_INFO');

        if (response?.status_code == 200 && response?.message == 'success') {
          navigation.navigate('PremiumDriverRegistrationProcess');
          return;
        } else {
          navigation.navigate('PremiumDriverRegistration');
        }
        setVerifyData(response);
      } else {
        response = await VERIFY_PAYMENT_INFO(id);
        console.log(response, 'response VERIFY_PAYMENT_INFO');

        if (response?.status_code == 200) {
          navigation.navigate('ThankYouDriverDue', {
            data: response?.payment_details?.message,
          });
          return;
        }

        setVerifyData(response);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handlePayment = () => {
    var options = {
      page_type: pageType,
      description: description,
      image: 'https://www.tatd.in/img/logo/bluelogo.png',
      currency: 'INR',
      key: 'rzp_live_0wecjqTARWJWu3',
      order_id: orderId,
      amount: amount,
      name: 'Tat D',
      prefill: {
        email: '',
        contact: driverMobileNumber,
        name: driverName,
      },
      theme: {color: '#16588e'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log(data, 'razorpay data getting razorpay data getting====');
        verifyPayment(data?.razorpay_payment_id);
      })
      .catch(error => {
        navigation.goBack();
      });
  };
};

export default RazorPayPaymentScreen;
