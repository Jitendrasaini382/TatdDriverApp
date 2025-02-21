import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import {VERIFY_PAYMENT_INFO} from '../apis/Apis';

const RazorPayPaymentScreen = ({navigation}) => {
  const route = useRoute();
  const {data} = route?.params;

  const [verifyData, setVerifyData] = useState({});

  const driverMobileNumber = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_mobile_number,
  );
  const driverName = useSelector(
    e => e?.userAuth?.userProfile?.data?.driver_name,
  );

  console.log(data?.amount, ' : amount');
  console.log(data?.orderId, ' : orderId');
  console.log(driverMobileNumber, 'driverMobileNumber');
  console.log(driverName, 'driverName');

  useEffect(() => {
    console.log('previous data', data?.amount && data?.orderId);

    if (data?.amount && data?.orderId && driverMobileNumber && driverName) {
      handlePayment();
    } else {
      console.log('ClearMyDuePayment back to screen');

      navigation.navigate('ClearMyDuePayment');
    }
  }, [data]);

  const verifyPayment = async id => {
    try {
      console.log('verifyPayment function called with payment Id:', id);
      const response = await VERIFY_PAYMENT_INFO(id);
      console.log('Response received:', response);

      if (response?.status_code == 200) {
        navigation.navigate('ThankYouDriverDue', {
          data: response?.payment_details?.message,
        });
      }

      setVerifyData(response);
    } catch (error) {
      console.error('Error in verifyPayment:', error);
    } finally {
      console.log('verifyPayment function execution completed.');
    }
  };

  const handlePayment = () => {
    console.log(options, 'sending handle payment ');

    var options = {
      page_type: 'clear_my_due_test',
      description: 'Clear My Due Test',
      image: 'https://www.tatd.in/img/logo/bluelogo.png',
      currency: 'INR',
      key: 'rzp_live_0wecjqTARWJWu3',
      order_id: data?.orderId,
      amount: data?.amount,
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
