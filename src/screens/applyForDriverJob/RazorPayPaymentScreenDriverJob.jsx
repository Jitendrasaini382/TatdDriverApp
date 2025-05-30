import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import {VERIFY_PAYMENT_INFO_APPLY_FOR_DRIVER_JOB} from '../../apis/Apis';
import {resetUserAuthState} from '../../redux/slices/userAuthSlice';

const RazorPayPaymentScreenDriverJob = ({navigation}) => {
  const route = useRoute();

  console.log(route, '-=-=-=-=-=routeee razorpay');

  const description = route?.params?.response?.description || '';
  const pageType = route?.params?.response?.page_type || '';
  const amount = route?.params?.response?.amount || '';
  const orderId = route?.params?.response?.orderId || '';
  const driverMobileNumber = route?.params?.response?.mobile_number;
  const driverName = route?.params?.response?.driver_name;
  const dispatch = useDispatch();

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
      const response = await VERIFY_PAYMENT_INFO_APPLY_FOR_DRIVER_JOB({
        action: 'apply_for_driver_jobs',
        razorpay_payment_id: id,
        order_id: orderId,
        amount,
      });
      console.log(
        response,
        'response VERIFY_PAYMENT_INFO_APPLY_FOR_DRIVER_JOB',
      );

      if (response?.status_code == 200 && response?.message == 'success') {
        // navigation.navigate('RegistrationSuccess', {response: response});
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'RegistrationSuccess',
              params: {response: response},
            },
          ],
        });

        return;
      } else {
        navigation.navigate('ApplyForDriverJobs');
      }
      setVerifyData(response);
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

export default RazorPayPaymentScreenDriverJob;
