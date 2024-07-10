import axios from 'axios';
import {API_BASE_URL} from '../constant/path';

const _Fetch = (method, path, body, header) => {
  console.log(method, path, body,header , "fetch All Data" )
  return new Promise((resolve, reject) => {
    return _handleMethod(method, path, body, header)
    .then(e => {
        console.log(e.data.message, 'APICALL');
        if (e.status == 200) {
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

function _handleMethod(method, path, body, header) {
  console.log(method, path, body,header , "fetchHandle Data" )
  if (method == 'GET') {
    return axios({
      method: 'GET',
      url: `${API_BASE_URL}${path}`,
      // data:body,
      headers: header,
      // redirect: 'follow'
    });
  } else {
    return axios({
      method: method,
      url: `${API_BASE_URL}${path}`,
      data: body,
      headers: header,
    });
  }
}

// function changeHeaders(header) {
//   return {
//     ...header,
//   };
// }
export default _Fetch;
