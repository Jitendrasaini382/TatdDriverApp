// import axios from 'axios';
// import { API_BASE_URL } from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Request interceptor
// api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('jwt');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       console.warn('No JWT token found');
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// // Response interceptor
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem('refresh_token');

//         if (!refreshToken) {
//           throw new Error('No refresh token found');
//         }

//         console.log(refreshToken, "Refresh Token");

//         const response = await axios.get(
//           `${API_BASE_URL}/login/refresh_token.php`,
//           {
//             params: { refresh_token: refreshToken },
//           },
//         );

//         if (response.data && response.data.jwt) {
//           const jwt_token = response.data.jwt;

//           await AsyncStorage.setItem('jwt', jwt_token);

//           api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
//           originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

//           return api(originalRequest);
//         } else {
//           throw new Error('Failed to refresh token');
//         }
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);
//         await AsyncStorage.multiRemove(['jwt', 'refresh_token']);
//         // Here, you might want to redirect to login or dispatch a logout action
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const _Fetch = (method, path, body, header) => {
//   return new Promise((resolve, reject) => {
//     api({
//       method,
//       url: path,
//       data: method !== 'GET' ? body : undefined,
//       params: method === 'GET' ? body : undefined,
//       headers: header,
//     })
//       .then(response => {
//         console.log(response.status, 'APICALL SUCCESSFUL');
//         if (response.data.status_code == 200) {
//           resolve(response.data);
//         } else {
//           console.error('API call failed with status:', response.data.status_code);
//           reject(response.data.message);
//         }
//       })
//       .catch(err => {
//         console.error('API CALL FAILED', err.response ? err.response.data : err.message);
//         reject(err.response ? err.response.data : err.message);
//       });
//   });
// };

// export default _Fetch;


// ////////////////////
 
// updated

import axios from 'axios';
import { API_BASE_URL } from '../constant/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  async config => {
    console.log('Request Interceptor: Starting');
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      console.log('Request Interceptor: JWT token found');
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Request Interceptor: No JWT token found');
    }
    config.headers['Content-Type'] = 'application/json';
    console.log('Request Interceptor: Headers set', config.headers);
    return config;
  },
  error => {
    console.error('Request Interceptor: Error', error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log('Response Interceptor: Successful response', response.status);
    return response;
  },
  async error => {
    console.log('Response Interceptor: Error occurred', error.response?.status);
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('Response Interceptor: 401 error, attempting token refresh');
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        console.log('Response Interceptor: Refresh token retrieved');

        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        console.log('Response Interceptor: Calling refresh token API');
        const response = await axios.get(
          `${API_BASE_URL}/login/refresh_token.php`,
          {
            params: { refresh_token:refreshToken },
          },
        );

        if (response.data && response.data.jwt) {
          const jwt_token = response.data.jwt;
          console.log('Response Interceptor: New JWT token received');

          await AsyncStorage.setItem('jwt', jwt_token);
          console.log('Response Interceptor: New JWT token stored');

          api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

          console.log('Response Interceptor: Retrying original request');
          return api(originalRequest);
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        console.error('Response Interceptor: Token refresh failed', refreshError);
        await AsyncStorage.multiRemove(['jwt', 'refresh_token']);
        console.log('Response Interceptor: Tokens removed from storage');
        // Here, you might want to redirect to login or dispatch a logout action
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const _Fetch = (method, path, body, header) => {
  return new Promise((resolve, reject) => {
    console.log(`_Fetch: Starting ${method} request to ${path}`);
    api({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: header,
    })
      .then(response => {
        console.log(`_Fetch: ${method} request to ${path} successful`, response.status);
        if (response.data.status_code == 200) {
          resolve(response.data);
        } else {
          console.error(`_Fetch: API call failed with status:`, response.data.status_code);
          reject(response.data.message);
        }
      })
      .catch(err => {
        console.error(`_Fetch: ${method} request to ${path} failed`, err.response ? err.response.data : err.message);
        reject(err.response ? err.response.data : err.message);
      });
  });
};

export default _Fetch;








/////////////////////////////////////////////////////





// old  // 




// import axios from 'axios';
// import {API_BASE_URL} from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Request interceptor
// api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('jwt');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// // Response interceptor
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry && error.response.status === 400) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem('refresh_token');

//         console.log(refreshToken,"jjjjjjjjj");

//         const response = await axios.get(
//           `${API_BASE_URL}/login/refresh_token.php`,
//           {
//             params: {refresh_token: refreshToken},
//           },
//         );

//         const {jwt_token} = response.jwt;

//         await AsyncStorage.setItem('jwt', jwt_token);

//         api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
//         originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         await AsyncStorage.multiRemove(['jwt', 'refresh_token']);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const _Fetch = (method, path, body, header) => {
//   return new Promise((resolve, reject) => {
//     api({
//       method,
//       url: path,
//       data: method !== 'GET' ? body : undefined,
//       params: method === 'GET' ? body : undefined,
//       headers: header,
//     })
//       .then(response => {
//         console.log(response.status, 'APICALL SUCCESSFUL');
//         if (response.data.status_code == 200) {
//           resolve(response.data);
//         } else {
//           reject(response.data.message);
//         }
//       })
//       .catch(err => {
//         console.error('API CALL FAILED', err);
//         reject(err.response ? err.response.data : err.message);
//       });
//   });
// };

// export default _Fetch;


///////////////////////////////////////////// 


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

