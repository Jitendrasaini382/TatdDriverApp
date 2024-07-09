import axios from "axios";
import { API_PATH } from "../constant/Path";

const handleMethod = (method, url, body, header) => {


  if (method === "GET") {
    return axios({
      method: "GET",
      url: `${API_PATH}${url}`,
      headers: handleHeaders(header),
    });
  } else {
    return axios({
      method: method,
      url: `${API_PATH}${url}`,
      data: body,
      headers: handleHeaders(header),
    });
  }
};

function handleHeaders(e) {
  return {
    ...e,
  };
}
const FetchApi = (method, url, body, header) => {
  return new Promise((resolve, reject) => {
    handleMethod(method, url, body, header)
      .then((e) => {
        // console.log(e.data,"APIDATA")
        if (e.data.status == 200) {
          // console.log((e.data.data[0].msg).split('.')[1]);
          resolve(e.data.data);
        } else if (e.data.status === 400) {
          reject(e.data.message);
        } else {
          reject(e.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default FetchApi