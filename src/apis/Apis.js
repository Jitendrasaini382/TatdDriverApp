import _Fetch from './Service';

// const API_URL = 'https://www.tatd.in/app-api/driver/driver-login.php';

export const DRIVER_LOGIN = body => {
  console.log(body, 'Driver Login Body');
  return _Fetch('POST', 'driver-login.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/verify-otp-login.php

export const VERIFY_OTP_LOGIN = body => {
  console.log(body, 'Driver Otp Body');
  return _Fetch('POST', 'verify-otp-login.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/refresh_token.php

// export const REFRESH_TOKEN = body => {
//   console.log(body, 'REFRESH_TOKEN Body');
//   return _Fetch('GET', 'refresh_token.php', {...body}, {});
// };

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const DRIVER_FAQ = body => {
  // console.log(body, 'DRIVER_FAQ Body');
  return _Fetch('POST', 'driver-faq-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const CREATE_TICKET_DRIVER = body => {
  console.log(body, 'CREATE_TICKET_DRIVER Body');
  return _Fetch('POST', 'tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const CHECK_BOOKING_NUMBER = body => {
  console.log(body, 'CHECK_BOOKING_NUMBER Body');
  return _Fetch('POST', 'tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const SHOW_DRIVER_TICKET = body => {
  console.log(body, 'SHOW_DRIVER_TICKET Body');
  return _Fetch('POST', 'tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const SHOW_SINGLE_TICKET_DATA = body => {
  console.log(body, 'SHOW_SINGLE_TICKET_DATA Body');
  return _Fetch('POST', 'tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets-driver-api.php

export const CHECK_OPEN_TICKET = body => {
  console.log(body, 'CHECK_OPEN_TICKET Body');
  return _Fetch('POST', 'tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/login-button-trusted.php

export const LOGIN_BUTTON = body => {
  console.log(body, 'LOGIN_BUTTON Body');
  return _Fetch('POST', 'login-button-trusted.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/my-bonus-history-api.php

export const MY_BONUS_HISTORY = body => {
  console.log(body, 'MY_BONUS_HISTORY Body');
  return _Fetch('POST', 'my-bonus-history-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/driver-notification-api.php

export const DRIVER_NOTIFICATION = body => {
  console.log(body, 'DRIVER_NOTIFICATION Body');
  return _Fetch('POST', 'driver-notification-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/my-booking-top-navbar-api.php

export const MY_BOOKING_TOP_NAVBAR = body => {
  console.log(body, 'MY BOOKING TOP NAV BAR Body');
  return _Fetch('POST', 'my-booking-top-navbar-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/driver-notification-api.php

export const CLEAR_ALL_NOTIFICATION = body => {
  console.log(body, 'CLEAR_ALL_NOTIFICATION Body');
  return _Fetch('POST', 'driver-notification-api.php', {...body}, {});
};

export const SAVE_BOOKING_EXPERIENCE = body => {
  console.log(body, 'SAVE_BOOKING_EXPERIENCE Body');
  return _Fetch('POST', 'driver-notification-api.php', {...body}, {});
};

export const SAVE_BOOKING_REMARKS = body => {
  console.log(body, 'SAVE_BOOKING_REMARKS Body');
  return _Fetch('POST', 'driver-notification-api.php', {...body}, {});
};

export const VIEW_HEADLINE = body => {
  console.log(body, 'VIEW_HEADLINE Body');
  return _Fetch('POST', 'driver-notification-api.php', {...body}, {});
};