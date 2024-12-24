import _Fetch from './Service';

// export const API_BASE_URL = "https://www.tatd.in/app-api/driver/"

// https://www.tatd.in/app-api/driver/login/driver-login.php?

export const DRIVER_LOGIN = body => {
  console.log(body, 'send action');

  return _Fetch('POST', 'login/driver-login.php', body, {});
};

// https://www.tatd.in/app-api/driver/login/verify-otp-login.php

export const VERIFY_OTP_LOGIN = body => {
  console.log(body, 'Driver Otp Body');
  return _Fetch('POST', 'login/verify-otp-login.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/login/save-fcm-token-api.php

export const GET_FCM_TOKEN = body => {
  console.log(body, 'Get FCM Token');
  return _Fetch('POST', 'login/save-fcm-token-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/faq/driver-faq-api.php

export const DRIVER_FAQ = body => {
  console.log(body, 'DRIVER_FAQ Body');
  return _Fetch('POST', 'faq/driver-faq-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/tickets/tickets-driver-api.php

export const TICKETS_DRIVER = body => {
  console.log(body, 'CREATE_TICKET_DRIVER Body');
  return _Fetch('POST', 'tickets/tickets-driver-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/trusted-driver/login-button-trusted.php

export const LOGIN_BUTTON = body => {
  console.log(body, 'LOGIN_BUTTON Body');
  return _Fetch(
    'POST',
    'trusted-driver/login-button-trusted.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/my-bonus-history-api.php

export const MY_BONUS_HISTORY = body => {
  console.log(body, 'MY_BONUS_HISTORY Body');
  return _Fetch(
    'POST',
    'trusted-driver/my-bonus-history-api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/driver-notification-api.php

export const DRIVER_NOTIFICATION = body => {
  // console.log(body, 'DRIVER_NOTIFICATION Body');
  return _Fetch(
    'POST',
    'trusted-driver/driver-notification-api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/my-booking-top-navbar-api.php

export const MY_BOOKING_TOP_NAVBAR = body => {
  // console.log(body, 'MY BOOKING TOP NAV BAR Body');
  return _Fetch(
    'POST',
    'trusted-driver/my-booking-top-navbar-api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/driver-notice-api.php

export const DRIVER_NOTICE = body => {
  // console.log(body, 'DRIVER NOTICE Body');
  return _Fetch('POST', 'trusted-driver/driver-notice-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/trusted-driver/driver-earning-api.php

export const DRIVER_EARNING = body => {
  return _Fetch('POST', 'trusted-driver/driver-earning-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/trusted-driver/switch-language-api.php

export const LANGUAGE_SWITCH = body => {
  return _Fetch(
    'POST',
    'trusted-driver/switch-language-api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/trusted-home-awareness-api.php

export const HOME_AWARENESS = body => {
  return _Fetch(
    'POST',
    'trusted-driver/trusted-home-awareness-api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/express-booking-popup.php

export const EXPRESS_BOOKING_UPDATE = body => {
  return _Fetch(
    'POST',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/ondemand-bookings-view.php

export const ON_DEMAND_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-bookings-view.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/express-booking-popup.php?action=check_popup

export const EXPRESS_BOOKING_POPUP = body => {
  return _Fetch(
    'GET',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-view.php

export const PERMANENT_BOOKING = body => {
  console.log(body, 'aaaaa');

  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-view.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_view&current_language=hindi

export const PERMANENT_REFER_POPUP = body => {
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_view&current_language=${body}`,
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_accept_view&current_language=hindi&P_ID=PD-11947

export const PERMANENT_REFER_ACCEPT_POPUP = (lang, id) => {
  console.log(lang, id, 'bodyyyyyyyy acceptttt');
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_accept_view&current_language=${lang}&P_ID=${id}`,
    {},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-refer-accept.php

export const SAVE_REFER_PERMANENT = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-refer-accept.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-accept.php

export const ACCEPT_PERMANENT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-accept.php',
    {...body},
    {},
  );
};

//  	https://www.tatd.in/app-api/driver/trusted-driver/permanent-booking-apply.php

export const APPLY_PERMANENT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-apply.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/duty_report_booking_info_api.php

export const GET_BOOKING_INFO = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_info_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/have_your_talk_to_customer_api.php

export const TALK_TO_CUSTOMER = body => {
  return _Fetch(
    'POST',
    'duty-report/have_your_talk_to_customer_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/customer_not_picking_phone_api.php

export const CUSTOMER_NOT_PICKUP_PHONE = body => {
  return _Fetch(
    'POST',
    'duty-report/customer_not_picking_phone_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/customer_want_to_cancel_api.php

export const CUSTOMER_WANT_TO_CANCEL = body => {
  return _Fetch(
    'POST',
    'duty-report/customer_want_to_cancel_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/waiting_minute_insert_api.php

export const WAITING_MINUTE_INSERT = body => {
  return _Fetch('GET', 'duty-report/waiting_minute_insert_api.php');
};

//  https://www.tatd.in/app-api/driver/duty-report/due_amount_api.php

export const DUE_AMOUNT = body => {
  return _Fetch('POST', 'duty-report/due_amount_api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/duty-report/driver_booking_invoice_api.php

export const DRIVER_BOOKING_INVOICE = body => {
  return _Fetch(
    'POST',
    'duty-report/driver_booking_invoice_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/duty_report_trip_status_popup_view.php

export const TRIP_STATUS_POPUP = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

// 	https://www.tatd.in/app-api/driver/duty-report/check-booking-is-upcoming.php

export const CHECK_UPCOMING_BOOKING = body => {
  return _Fetch(
    'POST',
    'duty-report/check-booking-is-upcoming.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/rate_us_at_social_media_view_api.php

export const RATE_US_SOCIAL_MEDIA_VIEW_DATA = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_view_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/rate_us_at_social_media_api.php

export const RATE_US_SOCIAL_MEDIA = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_api.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/duty_report_booking_info_api.php

export const PACKAGE_DETAILS_DUTY_REPORT = body => {
  return _Fetch('POST', 'duty-report/package-detail-api.php', {...body}, {});
};

// https://www.tatd.in/app-api/driver/duty-report/duty_report_booking_accept.php

export const DUTY_REPORT_BOOKING_ACCEPT = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_accept.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/duty_report_trip_status_popup_view.php

export const DUTY_REPORT_TRIP_STATUS_POPUP_VIEW = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

// https://www.tatd.in/app-api/driver/duty-report/rate_your_customer_insert_api.php

export const RATE_YOUR_CUSTOMER = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_your_customer_insert_api.php',
    {...body},
    {},
  );
};
