import FetchApi from "./Service";

export const LOGIN_API = (data) => {
    return FetchApi("POST", "logincheck", data, {});
  };