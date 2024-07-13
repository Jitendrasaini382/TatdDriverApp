import axios from 'axios';
import {API_BASE_URL} from '../constant/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const token = await AsyncStorage.getItem('jwt');
  return token;
};


const _Fetch = (method, path, body, header) => {
  return new Promise((resolve, reject) => {
    _handleMethod(method, path, body, header)
      .then(e => {
        console.log(e.data.status_code, 'APICALL SUCCESFUL');
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

async function _handleMethod(method, path, body, header) {
  console.log(method, path, body, header, 'fetchHandle Data');
  const token = await getToken();
  // console.log(token,"llllllllllllll");
  
  if (method == 'GET') {
    return axios({
      method: 'GET',
      url: `${API_BASE_URL}${path}`,
      headers: {
        ...header,
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios({
      method: method,
      url: `${API_BASE_URL}${path}`,
      data: body,
      headers: await changeHeaders(header),
    });
  }
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










// import axios from 'axios';
// import {API_BASE_URL} from '../constant/path';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getToken = async () => {
//   const token = await AsyncStorage.getItem('jwt');
//   console.log(token,'kllllllllllllllll');
// };

// getToken();
// const _Fetch = (method, path, body, header) => {
//   // console.log(method, path, body, header, 'fetch All Data');
//   return new Promise((resolve, reject) => {
//     return _handleMethod(method, path, body, header)
//       .then(e => {
//         console.log(e.data.status_code, 'APICALL SUCCESFUL');
//         if (e.status == 200) {
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

// function _handleMethod(method, path, body, header) {
//   console.log(method, path, body, header, 'fetchHandle Data');
//   if (method == 'GET') {
//     return axios({
//       method: 'GET',
//       url: `${API_BASE_URL}${path}`,
//       // data:body,
//       headers: header,
//       // redirect: 'follow'
//     });
//   } else {
//     return axios({
//       method: method,
//       url: `${API_BASE_URL}${path}`,
//       data: body,
//       headers: changeHeaders(header),
//     });
//   }
// }

// function changeHeaders(header) {
//   return {
//     ...header,

//     'Content-Type': 'text/plain',
//     Authorization:
//       'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy50YXRkLmluIiwiYXVkIjoiaHR0cHM6Ly93d3cudGF0ZC5pbiIsImlhdCI6MTcyMDY4NTE0OCwibmJmIjoxNzIwNjg1MTQ4LCJleHAiOjE3MjA2ODg3NDgsImRhdGEiOnsiVHJ1c3RlZERyaXZlckRhdGEiOnsiaWQiOjE5OTM1LCJ0aW1lc3RhbXAiOiIyMDI0LTA2LTE4IDEyOjQwOjI5IiwiY2F0ZWdvcnkiOiJQcml2YXRlIERyaXZlciIsImRyaXZlcl9uYW1lIjoiTU9ISVQgREhBTkFXQVQiLCJkcml2ZXJfbW9iaWxlX251bWJlciI6IjgxMTg4MTMxNDgiLCJwYXNzd29yZCI6IjM5NDUiLCJjaXR5IjoiRGVsaGkiLCJ6b25lIjoiU291dGggRGVsaGkiLCJsYW5ndWFnZV9wcmVmZXJlbmNlIjoiZW5nbGlzaCIsInBtc19vcHRpb24iOjEsImRyaXZlcl9ib29raW5nIjowLCJvdHIiOiIwIiwiY3JyX2VsaWdpYmlsaXR5IjoxLCJyZWNlbnRfZGNyIjowLCJkY3IiOiIwIiwidHJ1c3Rfc2NvcmUiOjEsImxvY2FsX2Jvb2tpbmciOjAsIm91dHN0YXRpb25fYm9va2luZyI6MCwib3V0c3RhdGlvbl9lbGlnaWJpbGl0eSI6MCwicmF0aW5nIjoiNSIsInJmZCI6MSwiYmxhY2tsaXN0IjowLCJzdGF0dXMiOjEsImFjdGl2ZV9kYXRlIjoiMjAyNC0wNy0xMSAwNjoyNTowOSIsInN2X3N0YXJ0X2RhdGUiOiIyMDI0LTA2LTI2IDEwOjUzOjUyIiwic3ZfZW5kX2RhdGUiOiIyMDI0LTA2LTI2IDExOjUzOjUyIiwibmVlZF9oZWxwIjoxLCJhZ2VudF9wYW5lbF9hY2Nlc3MiOjEsImJvb2tpbmdfc3RhdHVzX3RvZGF5IjoiTm8gQm9va2luZyBUb2RheSIsImluY2lkZW50X2VuZF9kYXRlIjoiMDAwMC0wMC0wMCAwMDowMDowMCIsImxhc3RfaW5jZW50aXZlX2RhdGUiOiIwMDAwLTAwLTAwIDAwOjAwOjAwIiwiZWxpZ2libGVfZm9yX3RyYWluaW5nIjowLCJjaGF1ZmZldXJfc2VydmljZSI6MCwid2FzaGluZ19zZXJ2aWNlIjowLCJlbGlnaWJsZV9mb3JfcGVybWFuZW50X3JlZmVycmFsIjowLCJyZWZlcmVuY2VfdmVyaWZpY2F0aW9uIjoiMSIsImJpa2UiOiIxIiwiYXV0b21hdGljX2V4cGVyaWVuY2UiOiIxIiwiYWNjZXB0X3JhdGUiOiIiLCJvdmVyYWxsc2NvcmUiOjIsInVuaWZvcm1fY29tcGxpYW5jZV9zY29yZSI6IiIsInNhbml0aXplcl9jb21wbGlhbmNlX3Njb3JlIjoiIiwicmF0aW5nX2NvbXBsaWFuY2Vfc2NvcmUiOiIiLCJhc3NpZ25tZW50X2NyaXRlcmlhIjoyLCJjcnIiOiIwIiwiZHJpdmVyX2xvY2siOjAsInZhY2NpbmF0aW9uIjowLCJ2YWNjaW5hdGlvbjIiOjAsInN1cHBseV92aXNpYWJpbGl0eSI6MSwidmVyaWZpY2F0aW9uIjoiIiwidHNoaXJ0IjoiIiwibWFzayI6IiIsInNhbml0aXplciI6IiIsImNvbnZlcnNpb24iOiIiLCJncmFjZV9jcnIiOjAsImNoYXVmZmV1cl9ib29raW5nIjowLCJjaGF1ZmZldXJfcmF0aW5nIjowLCJnZXRfcmVmZXJlbmNlcyI6MSwidmlld19mbGV4aWJsZV9ib29raW5nIjoiMSIsInZpZXdfcGVybWFuZW50X2Jvb2tpbmciOiIxIiwidmlld19pbmNpdHlfYm9va2luZyI6IjEiLCJ2aWV3X291dHN0YXRpb25fYm9va2luZyI6IjEiLCJ2aWV3X2RvdWJsZV9ib29raW5nIjoiMCJ9LCJEcml2ZXJSZWdpc3RyYXRpb25EYXRhIjp7ImlkIjoiMjA0MTQiLCJhZGRfZGF0ZSI6IjIwMjQtMDYtMTggMTI6NDA6MjgiLCJhcHBsaWNhdGlvbl9pZCI6IjEzNjY5OCIsImRyaXZlcl9pZCI6IjIwOTE0IiwiZXhwZXJ0X2luIjoiUHJpdmF0ZSBEcml2ZXIiLCJkcml2aW5nX2V4cGVyaWVuY2UiOiJBdXRvbWF0aWMgQ2FyIiwiYXBwbHlfZm9yIjoiUGFydCBUaW1lIiwibGljZW5zZV90eXBlIjoiTE1WIiwiZWR1Y2F0aW9uIjoiR3JhZHVhdGUiLCJjaXR5IjoiRGVsaGkiLCJ6b25lIjoiU291dGggRGVsaGkiLCJhZ2UiOiIyNS0zMCBZZWFycyIsInBpbl9jb2RlIjoiMTEwMDU5IiwiY2F0ZWdvcnkiOiJQcml2YXRlIERyaXZlciIsImRyaXZlcl9uYW1lIjoiTU9ISVQgREhBTkFXQVQiLCJkcml2ZXJfbW9iaWxlX251bWJlciI6IjgxMTg4MTMxNDgiLCJkcml2ZXJfcGhvdG8iOiI4MTE4ODEzMTQ4LTIwOTE0LWRyaXZlci1waG90by5qcGVnIiwib25ib2FyZGluZ19zdGF0dXMiOiJUcmFpbmluZyBDb21wbGV0ZSIsIm9uYm9hcmRpbmdfc3RhdHVzX2lkIjoiMzAiLCJvc19zdGF0dXNfZGF0ZSI6IjIwMjQtMDYtMjIgMTQ6NTA6MjEiLCJucmNfc3RhdHVzIjoiIiwibnJjX3N0YXR1c19kYXRlIjoiMDAwMC0wMC0wMCAwMDowMDowMCIsIm5yY19ieSI6IiIsInRyYWluaW5nX3NjaGVkdWxlIjoiMDAwMC0wMC0wMCAwMDowMDowMCIsImFkZHJlc3MiOiJCLTEvNDIsIEdhbGkgTnVtYmVyIDIwLCBLaXJhbiBHYXJkZW4sIFV0dGFtIE5hZ2FyLCBEZWxoaSwgMTEwMDU5IiwiYWRkcmVzc19mb3JfY291cmllciI6IjAiLCJzaXplIjoiIiwidmVyaWZpY2F0aW9uIjoiMSIsInBheW1lbnRfaWQiOiJwYXlfT084VTZad2pTaWxaQk8iLCJyYXpvcl9vcmRlcl9pZCI6Im9yZGVyX09POFRkRVNhcFJkVHhVIiwicGF5bWVudF9zb3VyY2UiOiJXZWIiLCJwYXltZW50X3N0YXR1cyI6IkNvbXBsZXRlZCIsInBheW1lbnRfYW1vdW50IjoiNzUwIiwiaGlyaW5nX3RyYWluZXJfbmFtZSI6IiIsImhpcmluZ190cmFpbmVyX251bWJlciI6IiIsImF3Yl9udW1iZXIiOiIiLCJ1cGRhdGVkX2J5IjoiQnkgV2ViaG9vayIsInJlZmVycmVkX2J5X25hbWUiOiIiLCJyZWZlcnJlZF9ieV9udW1iZXIiOiIiLCJyZWZlcnJlZF9hbW91bnQiOiIwIiwicnlkX3BheW1lbnRfc3RhdHVzIjoiIiwicnlkX3BheW1lbnRfZGF0ZSI6IjAwMDAtMDAtMDAgMDA6MDA6MDAiLCJhZGRfZG9jdW1lbnRhdGlvbl9kYXRlIjoiMjAyNC0wNi0xOCAxMzo0ODo1MiIsImFhZGhhcl9udW1iZXIiOiI2NDA4MzMxNDgzNjciLCJhYWRoYXJfbnVtYmVyX2ZpbGVfZnJvbnQiOiI4MTE4ODEzMTQ4LTIwOTE0LWFhZGhhci1mcm9udC5QTkciLCJhYWRoYXJfbnVtYmVyX2ZpbGVfYmFjayI6IjgxMTg4MTMxNDgtMjA5MTQtYWFkaGFyLWJhY2suUE5HIiwidmVyaWZpY2F0aW9uX3JlcG9ydCI6IjgxMTg4MTMxNDgtZHJpdmVyLXN1bW1hcnkucGRmIiwicGRmX3VwZGF0ZSI6IjEiLCJwZXJtYW5lbnRfYWRkcmVzcyI6IlMvTyBNQUhFU0ggQ0hBTkQgREhBTkFXQVQsIDI0LUEsIEFKQUQgTkFHQVIgNjAgRkVFVCBST0FELCBCRUhJTkQgR1VSVURXQVJBLCBWVEM6IEFMV0FSLCBQTzogQUxXQVIsIFNVQiBESVNUUklDVDogQUxXQVIsIERJU1RSSUNUOiBBTFdBUiwgU1RBVEU6IFJBSkFTVEhBTiwgUElOIENPREU6IDMwMTAwMSIsImRvYiI6IjE5OTgtMDktMTkiLCJmYXRoZXJfbmFtZSI6Ik1BSEVTSCBDSEFORCBESEFOQVdBVCIsImxpY2Vuc2VfbnVtYmVyIjoiIFJKMDIgMjAxNjAwMzUyMTgiLCJsaWNlbnNlX251bWJlcl9vbGQiOiIiLCJsaWNlbnNlX251bWJlcl9maWxlX2Zyb250IjoiODExODgxMzE0OC0yMDkxNC1saWNlbnNlLWZyb250LlBORyIsImxpY2Vuc2VfbnVtYmVyX2ZpbGVfYmFjayI6IiIsImFjY291bnRfaG9sZGVyX25hbWUiOiJYWVoiLCJhY2NvdW50X251bWJlciI6IidYWVoiLCJpZnNjX2NvZGUiOiJYWVoiLCJiYW5rX25hbWUiOiJYWVoiLCJkb2N1bWVudGF0aW9uX3ZhbGlkYXRpb24iOiJWZXJpZmllZCIsImRvY192ZXJpZmllZF9ieSI6IlNoYWRhYiBBaG1lZCIsImRvY3VtZW50c191cGxvYWRfc3RhdHVzIjoiQXZhaWxhYmxlIiwiZG9jdW1lbnRzX3VwbG9hZF9zdGF0dXNfZGF0ZSI6IjAwMDAtMDAtMDAgMDA6MDA6MDAiLCJlbWFpbF9pZCI6IiIsImJpa2UiOiIwIiwiYm9va2luZ19saWZlY3ljbGUiOiIiLCJ0cmFpbmVyX25hbWUiOiIiLCJ0cmFpbmVyX251bWJlciI6IiIsImFzc2lnbl9kYXRlIjoiMDAwMC0wMC0wMCAwMDowMDowMCIsImRvY3VtZW50cyI6IlNlbnQiLCJkb2N1bWVudHNfZGF0ZSI6IjIwMjQtMDYtMTggMTI6NTk6MzMiLCJhZ2VudF9jYWxsX3N0YXR1cyI6IiIsImFnZW50X2NhbGxfYnkiOiIiLCJhZ2VudF9jYWxsX2RhdGUiOiIwMDAwLTAwLTAwIDAwOjAwOjAwIiwib25ib2FyZGluZ19sYXN0X3N0YXR1cyI6IiIsIm9uYm9hcmRpbmdfbGFzdF9zdGF0dXNfaWQiOiIwIiwicmVmdW5kX2Ftb3VudCI6IjAiLCJ0cmFpbmluZ19tb2R1bGUiOiIxIiwidHJhaW5pbmdfbW9kdWxlX2RhdGUiOiIyMDI0LTA2LTIyIDE0OjUwOjIxIiwidHJhaW5pbmdfbW9kdWxlX2RhdGUyIjoiMDAwMC0wMC0wMCAwMDowMDowMCIsInBzX3JhdGluZyI6IjEiLCJwc19yYXRpbmdfYnkiOiJNdWt1bC5TaGFybWFAdGF0ZC5pbiIsInBzX3JhdGluZ19kYXRlIjoiMjAyNC0wNi0yMyAxMDoyODo0NyIsImV4cGVydF9jb25zdWx0YW50IjoiTXVrdWwuU2hhcm1hQHRhdGQuaW4ifSwiRFJJVkVSX0NMRUFSX01ZX0RVRSI6MCwiQ0FTSF9XSVRIX0RSSVZFUl8xMF9EQVlTIjowLCJkcml2ZXJfbW9iaWxlX251bWJlciI6IjgxMTg4MTMxNDgiLCJJbmNlbnRpdmVpbmxhc3QxNWRheXNEYXRhIjpudWxsLCJkcml2ZXJfbmFtZSI6Ik1PSElUIERIQU5BV0FUIiwiRHluYW1pY1JldGVudGlvbkRyaXZlckRhdGEiOnsiaWQiOiIxOTkwMyIsImluY2VudGl2ZV9lbGlnaWJpbGl0eSI6IjAiLCJsYXN0X2dhcF9kYXkiOiItMSJ9LCJEcml2ZXJDb21taXNvbkRhdGEiOnsiaWQiOiI3MTIzNTk5IiwiZHJpdmVyX21vYmlsZV9udW1iZXIiOiI4MTE4ODEzMTQ4IiwiZHJpdmVyX25hbWUiOiJNT0hJVCBESEFOQVdBVCIsInpvbmUiOiIiLCJkcml2ZXJfcGluIjoiMzk0NSIsImZpcnN0X2Jvb2tpbmdfZGF0ZSI6IjIwMjQtMDYtMjYgMTA6MDA6MDAiLCJib29raW5nX2NvbXBsZXRlZCI6IjAiLCJlYXJuaW5nXzdkYXlzIjoiMCIsImVhcm5pbmdfMTVkYXlzIjoiMCIsImVhcm5pbmdfMzBkYXlzIjoiMCIsImVhcm5pbmdzIjoiMCIsImNvbW1pc3Npb24iOiIyMCIsImFkZF9kYXRlIjoiMjAyNC0wNy0xMCAyMzo0NTozMyJ9fX0.43OS9SoA22RpHHbkSGRLvSN1vNNtfVX64wJ3SbVZFtE',
//   };
// }
// export default _Fetch;
