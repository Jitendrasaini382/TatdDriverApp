// ApiService.js

import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');

        const response = await axios.get(
          `${API_BASE_URL}/login/refresh_token.php`,
          {
            params: {refresh_token: refreshToken},
          },
        );

        const {jwt_token} = response.jwt;

        await AsyncStorage.setItem('jwt', jwt_token);

        api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['jwt', 'refresh_token']);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const _Fetch = (method, path, body, header) => {
  return new Promise((resolve, reject) => {
    api({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: header,
    })
      .then(response => {
        console.log(response.status, 'APICALL SUCCESSFUL');
        if (response.data.status_code == 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(err => {
        console.error('API CALL FAILED', err);
        reject(err.response ? err.response.data : err.message);
      });
  });
};

export default _Fetch;

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

// // ///////////////////////////////////////////////////////

// import axios from 'axios';
// import {API_BASE_URL} from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status == 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem('refresh_token');

//         const response = await axios.get(
//           `${API_BASE_URL}/login/refresh_token.php`,
//           {
//             refresh_token: refreshToken,
//           },
//         );

//         const {jwt_token} = response.jwt;

//         await AsyncStorage.setItem('jwt', jwt_token);

//         api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
//         originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const getToken = async () => {
//   return await AsyncStorage.getItem('jwt');
// };

// const _Fetch = (method, path, body, header) => {
//   return new Promise((resolve, reject) => {
//     _handleMethod(method, path, body, header)
//       .then(e => {
//         console.log(e.status, 'APICALL SUCCESSFUL');
//         if (e.data.status_code == 200) {
//           resolve(e.data);
//         } else {
//           reject(e.data.message);
//         }
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

// const _handleMethod = async (method, path, body, header) => {
//   console.log(method, path, body, header, 'fetchHandle Data');
//   const headers =
//     method === 'GET'
//       ? {...header, 'Content-Type': 'text/plain'}
//       : await changeHeaders(header);

//   return api({
//     method,
//     url: path,
//     data: method !== 'GET' ? body : undefined,
//     headers,
//   });
// };

// const changeHeaders = async header => {
//   const token = await getToken();
//   return {
//     ...header,
//     'Content-Type': 'text/plain',
//     Authorization: `Bearer ${token}`,
//   };
// };

// export default _Fetch;
