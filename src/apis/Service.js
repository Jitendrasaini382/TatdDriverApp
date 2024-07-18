// import axios from 'axios';
// import {API_BASE_URL} from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getToken = async () => {
//   const token = await AsyncStorage.getItem('jwt');
//   return token;
// };

// const _Fetch = (method, path, body, header) => {
//   return new Promise((resolve, reject) => {
//     _handleMethod(method, path, body, header)
//       .then(e => {
//         console.log(e.status, 'APICALL SUCCESFUL');
//         // if (e.status == 200) {
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

// async function _handleMethod(method, path, body, header) {
//   console.log(method, path, body, header, 'fetchHandle Data');

//   if (method == 'GET') {
//     return axios({
//       method: 'GET',
//       url: `${API_BASE_URL}${path}`,
//       headers: {
//         ...header,
//         'Content-Type': 'text/plain',
//       },
//     });
//   } else {
//     return axios({
//       method: method,
//       url: `${API_BASE_URL}${path}`,
//       data: body,
//       headers: await changeHeaders(header),
//     });
//   }
// }

// async function changeHeaders(header) {
//   const token = await getToken();
//   // console.log(token, "ppppppppppppppppppppppppppppppppp");
//   return {
//     ...header,
//     'Content-Type': 'text/plain',
//     Authorization: `Bearer ${token}`,
//   };
// }

// export default _Fetch;

// //////////////////////////////////////////////

// import axios from 'axios';
// import {API_BASE_URL} from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getToken = async () => {
//   return await AsyncStorage.getItem('jwt');
// };

// const _Fetch = async (method, path, body, header) => {
//   try {
//     const response = await _handleMethod(method, path, body, header);
//     console.log(response.status, 'APICALL SUCCESSFUL');
//     if (response.data.status_code == 200) {
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// async function _handleMethod(method, path, body, header) {
//   console.log(method, path, body, header, 'fetchHandle Data');
//   const url = `${API_BASE_URL}${path}`;
//   const headers =
//     method === 'GET'
//       ? {...header, 'Content-Type': 'text/plain'}
//       : await changeHeaders(header);

//   return axios({
//     method,
//     url,
//     data: method !== 'GET' ? body : undefined,
//     headers,
//   });
// }

// async function changeHeaders(header) {
//   const token = await getToken();
//   return {
//     ...header,
//     'Content-Type': 'text/plain',
//     Authorization: `Bearer ${token}`,
//   };
// }

// export default _Fetch;

// ///////////////////////////////////////////////////////

import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');

        // रिफ्रेश टोकन API कॉल (आपके बैकएंड के अनुसार URL और पैरामीटर्स अपडेट करें)
        const response = await axios.get(`${API_BASE_URL}/login/refresh_token.php`, {
          refresh_token: refreshToken
        });

        const {jwt_token} = response.jwt;

        await AsyncStorage.setItem('jwt', jwt_token);

        api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${jwt_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        // रिफ्रेश टोकन भी इनवैलिड है, यहाँ लॉगआउट लॉजिक डालें
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const getToken = async () => {
  return await AsyncStorage.getItem('jwt');
};

// const _Fetch = (method, path, body, header) => {
//   return new Promise((resolve, reject) => {
//     _handleMethod(method, path, body, header)
//       .then(e => {
//         console.log(e.status, 'APICALL SUCCESFUL');
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

// ///////////////

// const _Fetch = async (method, path, body, header) => {
//   try {
//     const response = await _handleMethod(method, path, body, header);
//     console.log(response.status, 'APICALL SUCCESSFUL');
//     if (response.data.status_code == 200) {
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     throw error;
//   }
// };

const _Fetch = (method, path, body, header) => {
  return new Promise((resolve, reject) => {
    _handleMethod(method, path, body, header)
      .then(e => {
        console.log(e.status, 'APICALL SUCCESSFUL');
        if (e.data.status_code == 200) {
          resolve(e.data);
        } else {
          reject(e.data.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const _handleMethod = async (method, path, body, header) => {
  console.log(method, path, body, header, 'fetchHandle Data');
  const headers =
    method === 'GET'
      ? {...header, 'Content-Type': 'text/plain'}
      : await changeHeaders(header);

  return api({
    method,
    url: path,
    data: method !== 'GET' ? body : undefined,
    headers,
  });
};

const changeHeaders = async header => {
  const token = await getToken();
  return {
    ...header,
    'Content-Type': 'text/plain',
    Authorization: `Bearer ${token}`,
  };
};

export default _Fetch;
