import _Fetch from './Service';

// // const API_URL = 'https://www.tatd.in/app-api/driver/driver-login.php';

export const DRIVER_LOGIN = data => {
  return _Fetch('POST', 'driver-login.php', data, {});
};

export const VERIFY_OTP_LOGIN = data => {
  return _Fetch('POST', 'verify-otp-login.php', data, {});
};

export const DRIVER_FAQ = () => {
  return _Fetch(
    'POST',
    'driver-faq-api.php',
    {
      action: 'driver_faq',
    },
    {},
  );
};

export const CREATE_TICKET_DRIVER = data => {
  return _Fetch('POST', 'tickets-driver-api.php', data, {});
};

export const CHECK_BOOKING_NUMBER = data => {
  // console.log(data, "dataaaaaaaaaaaaaaaaaaaaaaaaa");
  return _Fetch('POST', 'tickets-driver-api.php', data, {});
};

export const SHOW_DRIVER_TICKET = data => {
  return _Fetch(
    'POST',
    'tickets-driver-api.php',
    {
      action: 'show_driver_ticket',
    },
    {},
  );
};

export const SHOW_SINGLE_TICKET_DATA = data => {
  return _Fetch('POST', 'tickets-driver-api.php', data, {});
};

export const CHECK_OPEN_TICKET = () => {
  return _Fetch(
    'POST',
    'tickets-driver-api.php',
    {
      action: 'open_ticket',
    },
    {},
  );
};


