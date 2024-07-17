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

import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('jwt');
};

const _Fetch = async (method, path, body, header) => {
  try {
    const response = await _handleMethod(method, path, body, header);
    console.log(response.status, 'APICALL SUCCESSFUL');
    if (response.data.status_code == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

async function _handleMethod(method, path, body, header) {
  console.log(method, path, body, header, 'fetchHandle Data');
  const url = `${API_BASE_URL}${path}`;
  const headers =
    method === 'GET'
      ? {...header, 'Content-Type': 'text/plain'}
      : await changeHeaders(header);

  return axios({
    method,
    url,
    data: method !== 'GET' ? body : undefined,
    headers,
  });
}

async function changeHeaders(header) {
  const token = await getToken();
  return {
    ...header,
    'Content-Type': 'text/plain',
    Authorization: `Bearer ${token}`,
  };
}

export default _Fetch;
