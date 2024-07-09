import _Fetch from './Service';

// // const API_URL = 'https://www.tatd.in/app-api/driver/driver-login.php';

export const DRIVER_LOGIN = data => {
  //For ragistration
  return _Fetch('POST', 'driver-login.php', data, {});
};

export const VERIFY_OTP_LOGIN = data => {
  return _Fetch('POST', 'verify-otp-login.php', data, {});
};
