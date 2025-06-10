import _Fetch from './Service';

function generateSessionToken() {
  return Math.random().toString(10).substr(2, 10);
}

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
    `trusted-driver/headline_message_api.php?action=headline_message&${generateSessionToken()}`,
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
  return _Fetch(
    'POST',
    'duty-report/waiting_minute_insert_api.php',
    {...body},
    {},
  );
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

// export const TRIP_STATUS_POPUP = body => {
//   return _Fetch(
//     'POST',
//     'duty-report/duty_report_trip_status_popup_view.php',
//     {...body},
//     {},
//   );
// };

// export const CHECK_UPCOMING_BOOKING = body => {
//   return _Fetch(
//     'POST',
//     'duty-report/check-booking-is-upcoming.php',
//     {...body},
//     {},
//   );
// };

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

// export const DRIVE_START = body => {
//   return _Fetch(
//     'POST',
//     'duty-report/duty_report_booking_start.php',
//     {...body},
//     {},
//   );
// };

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

export const DRIVER_AVAILABLE_TEN_MINUTES = body => {
  return _Fetch(
    'POST',
    'trusted-driver/driver-available-in-ten-minutes.php',
    {...body},
    {},
  );
};

export const GET_ALL_AVAILABILITY = body => {
  return _Fetch(
    'GET',
    `trusted-driver/driver-available-in-ten-minutes.php?action=get_all_availability&current_language=${body}&${generateSessionToken()}`,
    {},
  );
};

export const APPLY_DRIVER_AVAILABLE_TEN_MINUTES = body => {
  return _Fetch(
    'POST',
    'trusted-driver/driver-available-in-ten-minutes.php',
    {...body},
    {},
  );
};

export const SEND_NOTIFICATION_DETAILS = body => {
  return _Fetch(
    'POST',
    'login/update-firebase-notification-status.php',
    {...body},
    {},
  );
};

export const PERMANENT_SUBSCRIPTION_VIEW = () => {
  return _Fetch(
    'GET',
    `trusted-driver/permanent-subscription-view-api.php?action=show_booking&${generateSessionToken()}`,
    {},
  );
};

export const PERMANENT_SUBSCRIPTION_POPUP_DATA_VIEW = body => {
  return _Fetch(
    'GET',
    `trusted-driver/permanent-subscription-view-api.php?action=booking_popup&PS_ID=${body}`,
    {},
  );
};

export const ACCEPT_PERMANENT_SUBSCRIPTION_BOOKING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/permanent-subscription-accept-api.php',
    {...body},
    {},
  );
};

export const TEN_MINUTE_AVAILABLE_CLICK_POPUP = body => {
  return _Fetch(
    'GET',
    `trusted-driver/driver-available-in-ten-minutes.php?action=view_popup&product_type=${body?.product_type}&way=${body?.way}`,
    {},
  );
};

export const TEN_MINUTE_STATUS_OFF = body => {
  return _Fetch(
    'POST',
    'trusted-driver/driver-available-in-ten-minutes.php',
    {...body},
    {},
  );
};

export const ALL_TEN_MINUTE_STATUS_UPDATE = body => {
  return _Fetch(
    'POST',
    'trusted-driver/driver-available-in-ten-minutes.php',
    {...body},
    {},
  );
};

export const CLEAR_MY_DUE_VIEW = body => {
  return _Fetch(
    'GET',
    `clear-my-due/clear-my-due-view-api.php?action=view_clear_my_due&current_language=${body}`,
    {},
  );
};

export const GET_CMD_PACKAGE_DETAIL = (id, lang) => {
  return _Fetch(
    'GET',
    `clear-my-due/view-package-detail-api.php?action=view_package&booking_number=${id}&current_language=${lang}`,
    {},
    {},
  );
};

export const PAY_CMD_CREATE_ORDER_ID = body => {
  return _Fetch('POST', 'payment/create-order-id.php', {...body}, {});
};

export const VERIFY_PAYMENT_INFO = body => {
  return _Fetch(
    'GET',
    `payment/verify-payment.php?action=clear_my_due_thanks&razorpay_payment_id=${body}`,
    {...body},
    {},
  );
};
export const CMD_OVERTIME_COMMISSION_VIEW = body => {
  return _Fetch(
    'POST',
    'clear-my-due/clear-my-due-overtime-view-api.php',
    {...body},
    {},
  );
};

export const CMD_OVERTIME_COMMISSION_PACKAGE_DETAIL = (id, lang) => {
  return _Fetch(
    'GET',
    `clear-my-due/get-overtime-package-information-api.php
?action=view_package&booking_number=${id}&current_language=${lang}`,
    {},
    {},
  );
};
export const CMD_OVERTIME_COMMISSION_CREATE_ORDER_ID = body => {
  return _Fetch(
    'POST',
    'clear-my-due/overtime-ceate-order-id-api.php',
    {...body},
    {},
  );
};

export const VERIFY_CMD_OVERTIME_PAYMENT_INFO = body => {
  return _Fetch(
    'GET',
    `clear-my-due/clear-my-due-overtime-verify-api.php?action=clear_my_due_overtime&razorpay_payment_id=${body}`,
    {...body},
    {},
  );
};

export const GET_ALL_AGENT_PANEL_INFO = body => {
  return _Fetch('GET', `agent/agent-panel-info-api.php`, {...body}, {});
};

export const GET_AGENT_TRAINING_VIDEOS = () => {
  return _Fetch('GET', 'agent/agent-training-video-api.php', {});
};
export const STORE_AGENT_TRAINING_VIDEOS_CLICK = body => {
  return _Fetch('POST', 'agent/agent-store-training-videos-clicks-api.php', {
    ...body,
  });
};

export const GET_AGENT_WALLET = () => {
  return _Fetch('GET', 'agent/agent-wallet-api.php', {});
};

export const GET_AGENT_NERTWORK_AND_LEADS = () => {
  return _Fetch('GET', 'agent/agent-network-and-lead-info-api.php', {});
};

export const AGENT_WALLET_DETAILS = body => {
  return _Fetch('POST', 'agent/agent-commission-added-api.php', {...body});
};

export const GET_AGENT_KYC_INFO = body => {
  return _Fetch('POST', 'agent/get-agent-kyc-info-api.php', {...body}, {});
};

export const GET_AGENT_KYC_SEND_OTP = () => {
  return _Fetch('GET', 'agent/agent-kyc-otp-api.php', {});
};

export const GET_AGENT_KYC_UPDATE_DETAILS = body => {
  return _Fetch('POST', 'agent/agent-kyc-update-api.php', {...body}, {});
};
export const GET_AGENT_SELECT_STATE = () => {
  return _Fetch('GET', 'agent/agent-select-your-state-api.php', {}, {});
};

export const GET_AGENT_SELECT_CITY = body => {
  return _Fetch('POST', 'agent/agent-select-your-zone-api.php', {...body}, {});
};

export const GET_AGENT_NETWORK_CLICK_DETAILS = body => {
  return _Fetch(
    'POST',
    'agent/agent-commission-added-wallet-api.php',
    {...body},
    {},
  );
};

export const AGENT_REFERAL_URL = body => {
  return _Fetch('POST', 'agent/agent-referral-url-api.php', {...body}, {});
};

export const AGENT_REFERAL_ICON_CLICK = body => {
  return _Fetch('POST', 'agent/referral-sent-clicks-api.php', {...body}, {});
};

export const AGENT_ADD_CUSTOMER = body => {
  return _Fetch('POST', 'agent/agent-add-customer-api.php', {...body}, {});
};

//

export const CHECK_PREMIUM_DRIVER_ELIGIBLE = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-eligible-api.php',
    {...body},
    {},
  );
};

export const PREMIUM_DRIVER_APPLY = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-apply-api.php',
    {...body},
    {},
  );
};

export const UPLOAD_PIC_PREMIUM_DRIVER = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-photo-upload-api.php',
    body,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

export const PREMIUM_DRIVER_PAYMENT_CREATE_ORDER_ID = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-create-orderid-api.php',
    {...body},
    {},
  );
};

export const VERIFY_PPREMIUM_PAYMENT_INFO = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-payment-verify.php',
    {...body},
    {},
  );
};

export const GET_ALL_PREMIUM_REGISTRATION_DATA = body => {
  return _Fetch(
    'POST',
    'registration/premium-driver-registration-process-api.php',
    {...body},
    {},
  );
};

export const GET_ALL_TRAINING_MODULE_DATA = body => {
  return _Fetch(
    'POST',
    'registration/driver-training-module-view.php',
    {...body},
    {},
  );
};

export const SUBMIT_ALL_TRAINING_MODULE_DATA = body => {
  return _Fetch(
    'POST',
    'registration/driver-training-module-api.php',
    {...body},
    {},
  );
};

export const START_BOOKING = body => {
  return _Fetch('POST', 'duty-report/duty_report_booking_start.php', body, {
    'Content-Type': 'multipart/form-data',
  });
};

export const GET_BOOKING_STATUS_ID = body => {
  return _Fetch(
    'POST',
    'duty-report/get-booking-status-id-api.php',
    {...body},
    {},
  );
};

export const PARTNER_ONBOOKING_CALL_SUPPORT = body => {
  return _Fetch(
    'POST',
    'duty-report/partner-onbooking-call-support-api.php',
    {...body},
    {},
  );
};

export const VIEW_AADHAR_NUMBER = body => {
  return _Fetch(
    'POST',
    'verification/view-aadhaar-number-api.php',
    {...body},
    {},
  );
};

export const SEND_AADHAR_OTP = body => {
  return _Fetch(
    'POST',
    'verification/submit-aadhaar-otp-api.php',
    {...body},
    {},
  );
};

export const VERIFY_AADHAR_OTP = body => {
  return _Fetch(
    'POST',
    'verification/verify-aadhaar-otp-api.php',
    {...body},
    {},
  );
};

export const SEND_REQUEST_AADHAR_EXEMPTION = body => {
  return _Fetch(
    'POST',
    'verification/send-request-aadhaar-exemption-api.php',
    {...body},
    {},
  );
};

export const DRIVER_DOCUMENT_UPLOADED_STATUS = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/document-upload-status-api.php',
    {...body},
    {},
  );
};

export const DRIVER_DOCUMENTS_UPLOAD = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/document-upload-submit-api.php',
    body,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

export const GET_DRIVER_UPLOADED_DATA = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/document-status-rejected-api.php',
    {...body},
    {},
  );
};

export const DRIVER_REFRENCE_SEND_OTP = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/reference-verification-add-reference-api.php',
    {...body},
    {},
  );
};

export const DRIVER_REFRENCE_LIST = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/reference-verification-list-api.php',
    {...body},
    {},
  );
};

export const DRIVER_REFRENCE_VERIFIED_OTP = body => {
  return _Fetch(
    'POST',
    'driver-onboarding/reference-verification-otp-verified-api.php',
    {...body},
    {},
  );
};

export const GET_LOCALSE_BUTTON_SHOWING = body => {
  return _Fetch(
    'POST',
    'trusted-driver/localse-awareness-partner-registration-api.php',
    {...body},
    {},
  );
};

export const LOCALSE_ON_CALL_SUPPORT = body => {
  return _Fetch(
    'POST',
    'trusted-driver/localse-partner-enquiry-support_api.php',
    {...body},
    {},
  );
};

export const PARTNER_AGENT_ONBOOKING_CALL_SUPPORT = body => {
  return _Fetch('POST', 'agent/agent-call-support-api.php', {...body}, {});
};

export const SAVE_LIVE_DRIVER_LATLONG = body => {
  // return false
  return _Fetch(
    'POST',
    'login/capture_driver_live_latlong_location_api.php',
    {...body},
    {},
  );
};

export const SAVE_CRASH_ERROR = body => {
  // return false;
  return _Fetch(
    'POST',
    'trusted-driver/crash-reporting-api.php',
    {...body},
    {},
  );
};

// // apply for Driver Job

export const VERIFY_OTP_LOGIN_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch('POST', 'driver-job/verify-otp-login.php', {...body}, {});
};

export const GET_CITY_ZONE_BY_PINCODE = body => {
  return _Fetch(
    'POST',
    'driver-job/get-pincode-state-city-api.php',
    {...body},
    {},
  );
};

export const APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch(
    'POST',
    'driver-job/insert-apply-for-driver-jobs-api.php',
    {...body},
    {},
  );
};

export const GET_ALL_DATA_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch(
    'GET',
    'driver-job/driver-interface-text-video-content.php',
    {...body},
    {},
  );
};

export const CREATE_ORDER_ID_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch(
    'POST',
    'driver-job/create-order-id-for-driver-job-api.php',
    {...body},
    {},
  );
};

export const VERIFY_PAYMENT_INFO_APPLY_FOR_DRIVER_JOB = body => {
  return _Fetch(
    'POST',
    'driver-job/driver-registration-payment-verify-api.php',
    {...body},
    {},
  );
};

export const UPDATE_POPUP_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch('POST', 'driver-job/get-app-version-info.php', {...body}, {});
};

export const SAVE_DEVICE_INFO_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch('POST', 'driver-job/save-user-device-info.php', {...body}, {});
};

export const GET_FCM_TOKEN_APPLY_FOR_DRIVER_JOBS = body => {
  return _Fetch('POST', 'driver-job/save-fcm-token-api.php', {...body}, {});
};
