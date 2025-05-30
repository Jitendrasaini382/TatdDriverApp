import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import store from '../redux/store';
import {
  resetUserAuthState,
  setUserAuthStates,
} from '../redux/slices/userAuthSlice';
import DeviceInfo from 'react-native-device-info';
import {jwtDecode} from 'jwt-decode';

// Axios axiosClient configure
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptors
axiosClient.interceptors.request.use(
  async config => {
    const token = store.getState().userAuth.jwt;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptors
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status == 401 ||
      error.response?.status == 400 ||
      (error.response?.data?.message === 'Token has expired' &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      const refreshToken = store.getState().userAuth.refreshToken;
      const isRegistered = store.getState().userAuth.isRegistered;

      if (refreshToken) {
        const appVersion = DeviceInfo.getVersion();

        if (isRegistered) {
          try {
            const res = await axios.post(
              `${API_BASE_URL}login/refresh_token.php`,
              {refresh_token: refreshToken, app_version: appVersion},
            );

            if (res.data?.jwt) {
              store.dispatch(
                setUserAuthStates({
                  key: 'jwt',
                  value: res.data.jwt,
                }),
              );

              store.dispatch(
                setUserAuthStates({
                  key: 'userProfile',
                  value: jwtDecode(res.data.jwt),
                }),
              );

              // add new jwt in header
              axiosClient.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${res.data.jwt}`;
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${res.data.jwt}`;
              return axiosClient(originalRequest);
            } else {
              store.dispatch(resetUserAuthState());
            }
          } catch (refreshError) {
            store.dispatch(resetUserAuthState());
            return Promise.reject(refreshError);
          }
        } else {
          try {
            const res = await axios.post(
              `${API_BASE_URL}driver-job/refresh_token.php`,
              {refresh_token: refreshToken, app_version: appVersion},
            );

            if (res?.data?.jwt) {
              store.dispatch(
                setUserAuthStates({
                  key: 'jwt',
                  value: res.data.jwt,
                }),
              );

              // add new jwt in header
              axiosClient.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${res.data.jwt}`;
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${res.data.jwt}`;
              return axiosClient(originalRequest);
            } else {
              store.dispatch(resetUserAuthState());
            }
          } catch (refreshError) {
            store.dispatch(resetUserAuthState());
            return Promise.reject(refreshError);
          }
        }
      } else {
        store.dispatch(resetUserAuthState());
      }
    }
    return Promise.reject(error);
  },
);

const _Fetch = (method, path, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    // Merge headers: If headers are passed, merge with default headers
    const finalHeaders = {
      ...axiosClient.defaults.headers.common,
      ...headers, // Custom headers override default headers if any conflict
    };

    // return false
    axiosClient({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: finalHeaders, // Pass merged headers
    })
      .then(response => {
        // if (path !== 'driver-job/driver-interface-text-video-content.php') {
        // console.log(`Response data: ${path}`, response.data);
        // }
        if (response.data.status_code == 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(err => {
        console.log(`Request error: ${path}`, err);
        reject(err.response ? err.response.data : err.message);
      });
  });
};

export default _Fetch;
