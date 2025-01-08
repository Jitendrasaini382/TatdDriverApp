import _Fetch from './Service';

// export const API_BASE_URL = "https://www.tatd.in/app-api/driver/"

export const DRIVER_LOGIN = body => {
  console.log(body, 'DRIVER_LOGIN body action');
  return _Fetch('POST', 'login/driver-login.php', body, {});
};

export const VERIFY_OTP_LOGIN = body => {
  console.log(body, 'VERIFY_OTP_LOGIN Otp Body');
  return _Fetch('POST', 'login/verify-otp-login.php', {...body}, {});
};

export const GET_FCM_TOKEN = body => {
  console.log(body, 'Get FCM Token body');
  return _Fetch('POST', 'login/save-fcm-token-api.php', {...body}, {});
};

export const SAVE_DEVICE_INFO = body => {
  console.log(body, 'login/save-user-device-info Body');
  return _Fetch('POST', 'login/save-user-device-info.php', {...body}, {});
};

export const UPDATE_POPUP = body => {
  console.log(body, 'UPDATE_POPUP Body');
  return _Fetch(
    'POST',
    'authentication/get-app-version-info.php',
    {...body},
    {},
  );
};

export const DRIVER_FAQ = body => {
  console.log(body, 'DRIVER_FAQ Body');
  return _Fetch('POST', 'faq/driver-faq-api.php', {...body}, {});
};

export const TICKETS_DRIVER = body => {
  console.log(body, 'TICKETS_DRIVER Body');
  return _Fetch('POST', 'tickets/tickets-driver-api.php', {...body}, {});
};

export const DRIVER_HEADLINE = body => {
  console.log(body, 'DRIVER_HEADLINE Body');
  return _Fetch(
    'POST',
    'trusted-driver/headline_message_api.php?action=headline_message',
    {...body},
    {},
  );
};

export const LOGIN_BUTTON = body => {
  console.log(body, 'LOGIN_BUTTON Body');
  return _Fetch(
    'POST',
    'trusted-driver/login-button-trusted.php',
    {...body},
    {},
  );
};

export const MY_BONUS_HISTORY = body => {
  console.log(body, 'MY_BONUS_HISTORY Body');
  return _Fetch(
    'POST',
    'trusted-driver/my-bonus-history-api.php',
    {...body},
    {},
  );
};

export const DRIVER_NOTIFICATION = body => {
  console.log(body, 'DRIVER_NOTIFICATION Body');
  return _Fetch(
    'POST',
    'trusted-driver/driver-notification-api.php',
    {...body},
    {},
  );
};

export const MY_BOOKING_TOP_NAVBAR = body => {
  console.log(body, 'MY_BOOKING_TOP_NAVBAR Body');
  return _Fetch(
    'POST',
    'trusted-driver/my-booking-top-navbar-api.php',
    {...body},
    {},
  );
};

export const DRIVER_TRAINING_VIDEOS = body => {
  console.log(body, 'DRIVER_TRAINING_VIDEOS  body');
  return _Fetch(
    'GET',
    `trusted-driver/training_vidoes_api.php?action=training_videos&current_language=${body}`,
  );
};

export const DRIVER_NOTICE = body => {
  console.log(body, 'DRIVER NOTICE Body');
  return _Fetch('POST', 'trusted-driver/driver-notice-api.php', {...body}, {});
};

export const DRIVER_EARNING = body => {
  console.log(body, 'DRIVER_EARNING body');
  return _Fetch('POST', 'trusted-driver/driver-earning-api.php', {...body}, {});
};

export const LANGUAGE_SWITCH = body => {
  console.log(body, 'LANGUAGE_SWITCH body');
  return _Fetch(
    'POST',
    'trusted-driver/switch-language-api.php',
    {...body},
    {},
  );
};

export const HOME_AWARENESS = body => {
  console.log(body, 'HOME_AWARENESS body');
  return _Fetch(
    'POST',
    'trusted-driver/trusted-home-awareness-api.php',
    {...body},
    {},
  );
};

export const EXPRESS_BOOKING_UPDATE = body => {
  console.log(body, 'EXPRESS_BOOKING_UPDATE body');
  return _Fetch(
    'POST',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

export const ON_DEMAND_BOOKING = body => {
  console.log(body, 'ON_DEMAND_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-bookings-view.php',
    {...body},
    {},
  );
};

export const EXPRESS_BOOKING_POPUP = body => {
  console.log(body, 'EXPRESS_BOOKING_POPUP body');
  return _Fetch(
    'GET',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

export const PERMANENT_BOOKING = body => {
  console.log(body, 'PERMANENT_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-view.php',
    {...body},
    {},
  );
};

export const WEEKLY_BOOKING = body => {
  console.log(body, 'WEEKLY_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/weekly-booking-view-api.php',
    {...body},
    {},
  );
};

export const WEEKLY_BOOKING_ACCEPT = body => {
  console.log(body, 'WEEKLY_BOOKING_ACCEPT body');
  return _Fetch(
    'POST',
    'trusted-driver/weekly-accept-booking-show-popup-api.php',
    {...body},
    {},
  );
};

export const PERMANENT_REFER_POPUP = body => {
  console.log(body, 'PERMANENT_REFER_POPUP body');
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_view&current_language=${body}`,
  );
};

export const PERMANENT_REFER_ACCEPT_POPUP = (lang, id) => {
  console.log(lang, id, 'PERMANENT_REFER_ACCEPT_POPUP acceptttt');
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_accept_view&current_language=${lang}&P_ID=${id}`,
    {},
    {},
  );
};

export const SAVE_REFER_PERMANENT = body => {
  console.log(body, 'SAVE_REFER_PERMANENT body');
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-refer-accept.php',
    {...body},
    {},
  );
};

export const ACCEPT_PERMANENT_BOOKING = body => {
  console.log(body, 'ACCEPT_PERMANENT_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-accept.php',
    {...body},
    {},
  );
};

export const APPLY_PERMANENT_BOOKING = body => {
  console.log(body, 'APPLY_PERMANENT_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-apply.php',
    {...body},
    {},
  );
};

export const GET_BOOKING_INFO = body => {
  console.log(body, 'GET_BOOKING_INFO body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_info_api.php',
    {...body},
    {},
  );
};

export const TALK_TO_CUSTOMER = body => {
  console.log(body, 'TALK_TO_CUSTOMER body');
  return _Fetch(
    'POST',
    'duty-report/have_your_talk_to_customer_api.php',
    {...body},
    {},
  );
};

export const CUSTOMER_NOT_PICKUP_PHONE = body => {
  console.log(body, 'CUSTOMER_NOT_PICKUP_PHONE body');
  return _Fetch(
    'POST',
    'duty-report/customer_not_picking_phone_api.php',
    {...body},
    {},
  );
};

export const CUSTOMER_WANT_TO_CANCEL = body => {
  console.log(body, 'CUSTOMER_WANT_TO_CANCEL body');
  return _Fetch(
    'POST',
    'duty-report/customer_want_to_cancel_api.php',
    {...body},
    {},
  );
};

export const WAITING_MINUTE_INSERT = body => {
  console.log(body, 'WAITING_MINUTE_INSERT body');
  return _Fetch('GET', 'duty-report/waiting_minute_insert_api.php');
};

export const DUE_AMOUNT = body => {
  console.log(body, 'DUE_AMOUNT body');
  return _Fetch('POST', 'duty-report/due_amount_api.php', {...body}, {});
};

export const DRIVER_BOOKING_INVOICE = body => {
  console.log(body, 'DRIVER_BOOKING_INVOICE body');
  return _Fetch(
    'POST',
    'duty-report/driver_booking_invoice_api.php',
    {...body},
    {},
  );
};

export const TRIP_STATUS_POPUP = body => {
  console.log(body, 'TRIP_STATUS_POPUP body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

export const CHECK_UPCOMING_BOOKING = body => {
  console.log(body, 'CHECK_UPCOMING_BOOKING body');
  return _Fetch(
    'POST',
    'duty-report/check-booking-is-upcoming.php',
    {...body},
    {},
  );
};

export const RATE_US_SOCIAL_MEDIA_VIEW_DATA = body => {
  console.log(body, 'RATE_US_SOCIAL_MEDIA_VIEW_DATA body');
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_view_api.php',
    {...body},
    {},
  );
};

export const RATE_US_SOCIAL_MEDIA = body => {
  console.log(body, 'RATE_US_SOCIAL_MEDIA body');
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_api.php',
    {...body},
    {},
  );
};

export const PACKAGE_DETAILS_DUTY_REPORT = body => {
  console.log(body, 'PACKAGE_DETAILS_DUTY_REPORT body');
  return _Fetch('POST', 'duty-report/package-detail-api.php', {...body}, {});
};

export const DUTY_REPORT_BOOKING_ACCEPT = body => {
  console.log(body, 'DUTY_REPORT_BOOKING_ACCEPT body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_accept.php',
    {...body},
    {},
  );
};

export const DUTY_REPORT_TRIP_STATUS_POPUP_VIEW = body => {
  console.log(body, 'DUTY_REPORT_TRIP_STATUS_POPUP_VIEW body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

export const RATE_YOUR_CUSTOMER = body => {
  console.log(body, 'RATE_YOUR_CUSTOMER body');
  return _Fetch(
    'POST',
    'duty-report/rate_your_customer_insert_api.php',
    {...body},
    {},
  );
};

export const DRIVER_ON_THE_WAY = body => {
  console.log(body, 'DRIVER_ON_THE_WAY body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_ontheway.php',
    {...body},
    {},
  );
};

export const DRIVER_BOOKING_REACH = body => {
  console.log(body, 'DRIVER_BOOKING_REACH body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_reach.php',
    {...body},
    {},
  );
};

export const CHECK_IS_BOOKING_IS_UPCOMMING = body => {
  console.log(body, 'CHECK_IS_BOOKING_IS_UPCOMMING body');
  return _Fetch(
    'POST',
    'duty-report/check-booking-is-upcoming.php',
    {...body},
    {},
  );
};

export const DRIVER_REACH = body => {
  console.log(body, 'DRIVER_REACH body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_reach.php',
    {...body},
    {},
  );
};

export const DRIVE_START = body => {
  console.log(body, 'DRIVE_START body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_start.php',
    {...body},
    {},
  );
};
export const DRIVE_END = body => {
  console.log(body, 'DRIVE_END body');
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_end.php',
    {...body},
    {},
  );
};
export const FINAL_ACCEPT_BOOKING = body => {
  console.log(body, 'FINAL_ACCEPT_BOOKING body');
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-accept-booking-api.php',
    {...body},
    {},
  );
};

// befor start drive
export const DUTY_REPORT_RESEND_OTP = body => {
  console.log(body, 'DUTY_REPORT_RESEND_OTP body');
  return _Fetch('POST', 'duty-report/resend_otp_api.php', {...body}, {});
};
