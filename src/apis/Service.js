import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constant/path';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // console.log('Request headers:', config.headers);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log('Error response:', error.response);

    if (error.response.status === 401 || error.response.status === 400 || error.response.data.message === "Token has expired" && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      console.log('Refresh token:', refreshToken);

      if (refreshToken) {
        try {
          const res = await axios.post(
            'https://www.tatd.in/app-api/driver/login/refresh_token.php',
            { refresh_token: refreshToken },
          );

          if (res.data.jwt) {
            console.log('New JWT:', res.data.jwt);
            await AsyncStorage.setItem('jwt', res.data.jwt);
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${res.data.jwt}`;

            return axiosClient(originalRequest);
          } else {
            console.error('Failed to refresh token:', res.data);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

const _Fetch = (method, path, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: { ...axiosClient.defaults.headers.common, ...headers },
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













// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../constant/path';

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
//       config.headers['Authorization'] = `Bearer ${token}`;
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

//     // Check if the error is due to token expiration
//     if (error.response.status === 400 && error.response.data.message === "Token has expired" && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = await AsyncStorage.getItem('refresh_token');
//       console.log(refreshToken, "yyyyyyyyyyyyyyyyyyyyyyy");

//       if (refreshToken) {
//         try {
//           const res = await axiosClient.post(
//             'https://www.tatd.in/app-api/driver/login/refresh_token.php',
//             { refresh_token: refreshToken },
//           );

//           if (res.data.jwt) {
//             await AsyncStorage.setItem('jwt', res.data.jwt);
//             axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;

//             originalRequest.headers['Authorization'] = 'Bearer ' + res.data.jwt;

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
//       headers: { ...axiosClient.defaults.headers, ...headers },
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













// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {API_BASE_URL} from '../constant/path';

// // const axiosClient = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     Accept: 'application/json',
// //     'Content-Type': 'application/json',
// //   },
// // });

// // axiosClient.interceptors.request.use(
// //   async config => {
// //     const token = await AsyncStorage.getItem('jwt');
// //     if (token) {
// //       config.headers['Authorization'] = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   error => {
// //     return Promise.reject(error);
// //   },
// // );

// // axiosClient.interceptors.response.use(
// //   response => response,

// //   async error => {
// //     const originalRequest = error.config;
// //     if (error.response.status === 400 && !originalRequest._retry) {
// //       originalRequest._retry = true;
// //       const refreshToken = await AsyncStorage.getItem('refresh_token');

// //       console.log('====================================');
// //       console.log(refreshToken, '===========');
// //       console.log('====================================');
// //       if (refreshToken) {
// //         try {
// //           const res = await axiosClient.get(
// //             'https://www.tatd.in/app-api/driver/login/refresh_token.php',
// //             // `${API_BASE_URL}login/refresh_token.php`,
// //             {refresh_token: refreshToken},
// //           );

// //           if (res.data.jwt) {
// //             console.log('====================================');
// //             console.log(res.data.jwt, '===========');
// //             console.log('====================================');
// //             await AsyncStorage.setItem('jwt', res.data.jwt);
// //             axiosClient.defaults.headers.common['Authorization'] =
// //               'Bearer ' + res.data.jwt;
// //             return axiosClient(originalRequest);
// //           }
// //         } catch (refreshError) {
// //           console.error('Error refreshing token:', refreshError);
// //         }
// //       }
// //     }
// //     return Promise.reject(error);
// //   },
// // );

// // const _Fetch = (method, path, body, headers = {}) => {
// //   return new Promise((resolve, reject) => {
// //     axiosClient({
// //       method,
// //       url: path,
// //       data: method !== 'GET' ? body : undefined,
// //       params: method === 'GET' ? body : undefined,
// //       headers: {...axiosClient.defaults.headers, ...headers},
// //     })
// //       .then(response => {
// //         if (response.data.status_code == 200) {
// //           resolve(response.data);
// //         } else {
// //           reject(response.data.message);
// //         }
// //       })
// //       .catch(err => {
// //         reject(err.response ? err.response.data : err.message);
// //       });
// //   });
// // };

// // export default _Fetch;

// // ////////////////////

// // import axios from 'axios';
// // import {API_BASE_URL} from '../constant/path';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const axiosClient = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     Accept: 'application/json',
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Request interceptor
// // // Request interceptor
// // axiosClient.interceptors.request.use(
// //   async (config) => {
// //     const token = await AsyncStorage.getItem('jwt');
// //     console.log('Current token:', token);
// //     if (token) {
// //       config.headers['Authorization'] = `Bearer ${token}`;
// //     } else {
// //       console.log('No token found in AsyncStorage');
// //     }
// //     console.log('Request headers:', config.headers);
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor
// // axiosClient.interceptors.response.use(
// //   response => {
// //     console.log(
// //       'token ===============>',
// //       AsyncStorage.getItem('refresh_token'),
// //     );
// //     return response;
// //   },
// //   async error => {
// //     console.log('=========>' + error);
// //     let res = error.response;
// //     if (res && res.status === 401) {
// //       await AsyncStorage.removeItem('jwt');
// //     }
// //     console.error(
// //       'Looks like there was a problem. Status code: ' +
// //         (res ? res.status : 'unknown'),
// //     );
// //     return Promise.reject(error);
// //   },
// // );

// // const _Fetch = (method, path, body, headers = {}) => {
// //   return new Promise((resolve, reject) => {
// //     axiosClient({
// //       method,
// //       url: path,
// //       data: method !== 'GET' ? body : undefined,
// //       params: method === 'GET' ? body : undefined,
// //       headers: { ...axiosClient.defaults.headers, ...headers },
// //     })
// //       .then(response => {
// //         console.log(response.status, 'API CALL SUCCESSFUL');
// //         if (response.data.status_code === 200) {
// //           resolve(response.data);
// //         } else {
// //           console.error('API returned non-200 status:', response.data);
// //           reject(response.data.message);
// //         }
// //       })
// //       .catch(async (err) => {
// //         console.error('API CALL FAILED', err);
// //         console.error('Error response:', err.response ? err.response.data : 'No response data');
// //         console.error('Error request:', err.config ? {
// //           method: err.config.method,
// //           url: err.config.url,
// //           headers: err.config.headers
// //         } : 'No request data');
// //         console.log('Current token in storage:', await AsyncStorage.getItem('jwt'));
// //         reject(err.response ? err.response.data : err.message);
// //       });
// //   });
// // };
// // export default _Fetch;

// // // old  //

// // // import axios from 'axios';
// // // import {API_BASE_URL} from '../constant/path';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const getToken = async () => {
// // //   return await AsyncStorage.getItem('jwt');
// // // };

// // // const _Fetch = async (method, path, body, header) => {
// // //   try {
// // //     const response = await _handleMethod(method, path, body, header);
// // //     console.log(response.status, 'APICALL SUCCESSFUL');
// // //     if (response.data.status_code == 200) {
// // //       return response.data;
// // //     } else {
// // //       throw new Error(response.data.message);
// // //     }
// // //   } catch (error) {
// // //     throw error;
// // //   }
// // // };

// // // async function _handleMethod(method, path, body, header) {
// // //   console.log(method, path, body, header, 'fetchHandle Data');
// // //   const url = `${API_BASE_URL}${path}`;
// // //   const headers =
// // //     method === 'GET'
// // //       ? {...header, 'Content-Type': 'text/plain'}
// // //       : await changeHeaders(header);

// // //   return axios({
// // //     method,
// // //     url,
// // //     data: method !== 'GET' ? body : undefined,
// // //     headers,
// // //   });
// // // }

// // // async function changeHeaders(header) {
// // //   const token = await getToken();
// // //   return {
// // //     ...header,
// // //     'Content-Type': 'text/plain',
// // //     Authorization: `Bearer ${token}`,
// // //   };
// // // }

// // // export default _Fetch;
