import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../constant/path';
import store from '../redux/store';

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
      (error.response?.data?.message === 'Token has expired' && !originalRequest._retry)
    ) {
      originalRequest._retry = true; 
      
      const refreshToken = store.getState().userAuth.refreshToken;

      if (refreshToken) {
        try {
          const res = await axios.post(
            'https://www.tatd.in/app-api/driver/login/refresh_token.php',
            { refresh_token: refreshToken }
          );

          if (res.data?.jwt) {
            // store new Jwt 
            store.dispatch({
              type: 'jwt',
              payload: res.data.jwt,
            });

            // add new jwt in header
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${res.data.jwt}`;

            // run retry
            return axiosClient(originalRequest);
          } else {
            console.error('Failed to refresh token:', res.data);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          // logout user
          store.dispatch({ type: 'LOGOUT' });
          return Promise.reject(refreshError);
        }
      } else {
        console.error('Refresh token not available.');
        store.dispatch({ type: 'LOGOUT' });
      }
    }

    return Promise.reject(error);
  }
);








// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../constant/path';
// import store from '../redux/store';


// // console.log(jwt);
// const axiosClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// axiosClient.interceptors.request.use(
//   async config => {
//     // const token = await AsyncStorage.getItem('jwt');
//     const token = store.getState().userAuth.jwt;  
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     // console.log('Request headers Service:', config.headers);
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// axiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     console.log('Error response:', error.response);

//     if (
//       error.response.status === 401 ||
//       error.response.status === 400 ||
//       (error.response.data.message === 'Token has expired' &&
//         !originalRequest._retry)
//     ) {
//       originalRequest._retry = true;
//       // const refreshToken = await AsyncStorage.getItem('refresh_token');
//       // console.log('Refresh token:', refreshToken);
//       const refreshToken = store.getState().userAuth.refreshToken;

//       if (refreshToken) {
//         try {
//           const res = await axios.post(
//             'https://www.tatd.in/app-api/driver/login/refresh_token.php',
//             {refresh_token: refreshToken},
//           );

//           if (res.data.jwt) {
//             console.log('New JWT:', res.data.jwt);
//             // await AsyncStorage.setItem('jwt', res.data.jwt);
//             store.dispatch({
//               type: 'jwt',
//               payload: res?.data?.jwt,
//             });
//             axiosClient.defaults.headers.common[
//               'Authorization'
//             ] = `Bearer ${res.data.jwt}`;
//             originalRequest.headers['Authorization'] = `Bearer ${res.data.jwt}`;

//             return axiosClient(originalRequest);
//           } else {
//             console.error('Failed to refresh token:', res.data);
//           }
//         } catch (refreshError) {
//           console.error('Error refreshing token:', refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   },
// );


const _Fetch = (method, path, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    // Merge headers: If headers are passed, merge with default headers
    const finalHeaders = {
      ...axiosClient.defaults.headers.common,
      ...headers, // Custom headers override default headers if any conflict
    };

    axiosClient({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: finalHeaders, // Pass merged headers
    })
      .then(response => {
        console.log('Response data:', response.data);
        if (response.data.status_code == 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(err => {
        console.error('Request error:', err);
        reject(err.response ? err.response.data : err.message);
      });
  });
};




export default _Fetch;

// /////
// kk

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../constant/path';

// const axiosClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// axiosClient.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('jwt');
//     if (token) {
//       config.headers['Authorization'] = "Bearer " +token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// axiosClient.interceptors.response.use(
//   response => response,

//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 400 || error.response.status === 401) {
//       originalRequest._retry = true;
//       const refreshToken = await AsyncStorage.getItem('refresh_token');

//       console.log('====================================');
//       console.log(refreshToken, '===========');
//       console.log('====================================');
//       if (refreshToken) {
//         try {
//           await AsyncStorage.setItem('jwt', "");
//           const res = await axiosClient.get(
//             'login/refresh_token.php',
//             // ${API_BASE_URL}login/refresh_token.php,
//             {refresh_token: refreshToken},
//           );

//           if (res.data.jwt) {
//             console.log('====================================');
//             console.log(res.data.jwt, '===========');
//             console.log('====================================');
//             await AsyncStorage.setItem('jwt', res.data.jwt);
//             axiosClient.defaults.headers.common['Authorization'] =
//               'Bearer ' + res.data.jwt;
//             return axiosClient(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error('Error refreshing token:', refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// const _Fetch = (method, path, body, headers = {}) => {
//   return new Promise((resolve, reject) => {
//     axiosClient({
//       method,
//       url: path,
//       data: method !== 'GET' ? body : undefined,
//       params: method === 'GET' ? body : undefined,
//       headers: {...axiosClient.defaults.headers, ...headers},
//     })
//       .then(response => {
//         if (response.data.status_code == 200) {
//           resolve(response.data);
//         } else {
//           reject(response.data.message);
//         }
//       })
//       .catch(err => {
//         reject(err.response ? err.response.data : err.message);
//       });
//   });
// };

// export default _Fetch;

// ////
// old

// // import axios from 'axios';
// // import {API_BASE_URL} from '../constant/path';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const getToken = async () => {
// //   return await AsyncStorage.getItem('jwt');
// // };

// // const _Fetch = async (method, path, body, header) => {
// //   try {
// //     const response = await _handleMethod(method, path, body, header);
// //     console.log(response.status, 'APICALL SUCCESSFUL');
// //     if (response.data.status_code == 200) {
// //       return response.data;
// //     } else {
// //       throw new Error(response.data.message);
// //     }
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// // async function _handleMethod(method, path, body, header) {
// //   console.log(method, path, body, header, 'fetchHandle Data');
// //   const url = `${API_BASE_URL}${path}`;
// //   const headers =
// //     method === 'GET'
// //       ? {...header, 'Content-Type': 'text/plain'}
// //       : await changeHeaders(header);

// //   return axios({
// //     method,
// //     url,
// //     data: method !== 'GET' ? body : undefined,
// //     headers,
// //   });
// // }

// // async function changeHeaders(header) {
// //   const token = await getToken();
// //   return {
// //     ...header,
// //     'Content-Type': 'text/plain',
// //     Authorization: `Bearer ${token}`,
// //   };
// // }

// // export default _Fetch;
