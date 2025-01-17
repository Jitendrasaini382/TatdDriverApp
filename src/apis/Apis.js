import _Fetch from './Service';

// export const API_BASE_URL = "https://www.tatd.in/app-api/driver/"

export const DRIVER_LOGIN = body => {
  return _Fetch('POST', 'login/driver-login.php', body, {});
};

export const VERIFY_OTP_LOGIN = body => {
  return _Fetch('POST', 'login/verify-otp-login.php', {...body}, {});
};

export const GET_FCM_TOKEN = body => {
  return _Fetch('POST', 'login/save-fcm-token-api.php', {...body}, {});
};

export const SAVE_DEVICE_INFO = body => {
  return _Fetch('POST', 'login/save-user-device-info.php', {...body}, {});
};

export const UPDATE_POPUP = body => {
  return _Fetch(
    'POST',
    'authentication/get-app-version-info.php',
    {...body},
    {},
  );
};

export const DRIVER_FAQ = body => {
  return _Fetch('POST', 'faq/driver-faq-api.php', {...body}, {});
};

export const TICKETS_DRIVER = body => {
  return _Fetch('POST', 'tickets/tickets-driver-api.php', {...body}, {});
};

export const DRIVER_HEADLINE = body => {
  return _Fetch(
    'POST',
    'trusted-driver/headline_message_api.php?action=headline_message',
    {...body},
    {},
  );
};

export const LOGIN_BUTTON = body => {
  return _Fetch(
    'POST',
    'trusted-driver/login-button-trusted.php',
    {...body},
    {},
  );
};

export const MY_BONUS_HISTORY = body => {
  return _Fetch(
    'POST',
    'trusted-driver/my-bonus-history-api.php',
    {...body},
    {},
  );
};

export const DRIVER_NOTIFICATION = body => {
  return _Fetch(
    'POST',
    'trusted-driver/driver-notification-api.php',
    {...body},
    {},
  );
};

export const MY_BOOKING_TOP_NAVBAR = body => {
  return _Fetch(
    'POST',
    'trusted-driver/my-booking-top-navbar-api.php',
    {...body},
    {},
  );
};

export const DRIVER_TRAINING_VIDEOS = body => {
  return _Fetch(
    'GET',
    `trusted-driver/training_videos_api.php?action=training_videos&current_language=${body}`,
  );
};

export const DRIVER_TRAINING_VIDEOS_CLICK_STORE = body => {
  return _Fetch(
    'POST',
    'trusted-driver/store-training-clicks-api.php',
    {...body},
    {},
  );
};

export const DRIVER_NOTICE = body => {
  return _Fetch('POST', 'trusted-driver/driver-notice-api.php', {...body}, {});
};

export const DRIVER_EARNING = body => {
  return _Fetch('POST', 'trusted-driver/driver-earning-api.php', {...body}, {});
};

export const LANGUAGE_SWITCH = body => {
  return _Fetch(
    'POST',
    'trusted-driver/switch-language-api.php',
    {...body},
    {},
  );
};

export const GET_TRUSTED_POPUP_DATA = body => {
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-bookings-view.php',
    {...body},
    {},
  );
};

export const HOME_AWARENESS = body => {
  return _Fetch(
    'POST',
    'trusted-driver/trusted-home-awareness-api.php',
    {...body},
    {},
  );
};

export const EXPRESS_BOOKING_UPDATE = body => {
  return _Fetch(
    'POST',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

export const ON_DEMAND_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-bookings-view.php',
    {...body},
    {},
  );
};

export const EXPRESS_BOOKING_POPUP = body => {
  return _Fetch(
    'GET',
    'trusted-driver/express-booking-popup.php',
    {...body},
    {},
  );
};

export const PERMANENT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-view.php',
    {...body},
    {},
  );
};

export const WEEKLY_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/weekly-booking-view-api.php',
    {...body},
    {},
  );
};

export const WEEKLY_BOOKING_ACCEPT = body => {
  return _Fetch(
    'POST',
    'trusted-driver/weekly-accept-booking-show-popup-api.php',
    {...body},
    {},
  );
};

export const PERMANENT_REFER_POPUP = body => {
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_view&current_language=${body}`,
  );
};

export const PERMANENT_REFER_ACCEPT_POPUP = (lang, id) => {
  return _Fetch(
    'GET',
    `trusted-driver/permanent-booking-refer-view.php?action=permanent_booking_refer_accept_view&current_language=${lang}&P_ID=${id}`,
    {},
    {},
  );
};

export const SAVE_REFER_PERMANENT = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-refer-accept.php',
    {...body},
    {},
  );
};

export const ACCEPT_PERMANENT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-accept.php',
    {...body},
    {},
  );
};

export const APPLY_PERMANENT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-booking-apply.php',
    {...body},
    {},
  );
};

export const GET_BOOKING_INFO = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_info_api.php',
    {...body},
    {},
  );
};

export const TALK_TO_CUSTOMER = body => {
  return _Fetch(
    'POST',
    'duty-report/have_your_talk_to_customer_api.php',
    {...body},
    {},
  );
};

export const CUSTOMER_NOT_PICKUP_PHONE = body => {
  return _Fetch(
    'POST',
    'duty-report/customer_not_picking_phone_api.php',
    {...body},
    {},
  );
};

export const CUSTOMER_WANT_TO_CANCEL = body => {
  return _Fetch(
    'POST',
    'duty-report/customer_want_to_cancel_api.php',
    {...body},
    {},
  );
};

export const WAITING_MINUTE_INSERT = body => {
  return _Fetch('GET', 'duty-report/waiting_minute_insert_api.php');
};

export const DUE_AMOUNT = body => {
  return _Fetch('POST', 'duty-report/due_amount_api.php', {...body}, {});
};

export const DRIVER_BOOKING_INVOICE = body => {
  return _Fetch(
    'POST',
    'duty-report/driver_booking_invoice_api.php',
    {...body},
    {},
  );
};

export const TRIP_STATUS_POPUP = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

export const CHECK_UPCOMING_BOOKING = body => {
  return _Fetch(
    'POST',
    'duty-report/check-booking-is-upcoming.php',
    {...body},
    {},
  );
};

export const RATE_US_SOCIAL_MEDIA_VIEW_DATA = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_view_api.php',
    {...body},
    {},
  );
};

export const RATE_US_SOCIAL_MEDIA = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_us_at_social_media_api.php',
    {...body},
    {},
  );
};

export const PACKAGE_DETAILS_DUTY_REPORT = body => {
  return _Fetch('POST', 'duty-report/package-detail-api.php', {...body}, {});
};

export const DUTY_REPORT_BOOKING_ACCEPT = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_accept.php',
    {...body},
    {},
  );
};

export const DUTY_REPORT_TRIP_STATUS_POPUP_VIEW = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_trip_status_popup_view.php',
    {...body},
    {},
  );
};

export const RATE_YOUR_CUSTOMER = body => {
  return _Fetch(
    'POST',
    'duty-report/rate_your_customer_insert_api.php',
    {...body},
    {},
  );
};

export const DRIVER_ON_THE_WAY = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_ontheway.php',
    {...body},
    {},
  );
};

export const DRIVER_BOOKING_REACH = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_reach.php',
    {...body},
    {},
  );
};

export const CHECK_IS_BOOKING_IS_UPCOMMING = body => {
  return _Fetch(
    'POST',
    'duty-report/check-booking-is-upcoming.php',
    {...body},
    {},
  );
};

export const DRIVE_START = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_start.php',
    {...body},
    {},
  );
};

export const GET_FIRST_POPUP_DATA = body => {
  return _Fetch(
    'POST',
    'duty-report/booking_accepted_duty_report_popup.php',
    {...body},
    {},
  );
};

export const DRIVE_END = body => {
  return _Fetch(
    'POST',
    'duty-report/duty_report_booking_end.php',
    {...body},
    {},
  );
};
export const FINAL_ACCEPT_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/ondemand-accept-booking-api.php',
    {...body},
    {},
  );
};

export const FINAL_ACCEPT_WEEKLY_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/weekly-accept-booking-api.php',
    {...body},
    {},
  );
};

// befor start drive
export const DUTY_REPORT_RESEND_OTP = body => {
  return _Fetch('POST', 'duty-report/resend_otp_api.php', {...body}, {});
};
