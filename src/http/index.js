import axios from "axios";
import { Alert } from "rsuite";
import Cookies from 'js-cookie'
import { TOKENID, domanUrl } from "@config";

const instance = axios.create();

const toLogin = () => {
  Cookies.remove(TOKENID, { domain: domanUrl });
  Alert.closeAll();
  Alert.error("Join the TurboX to have full features");
  setTimeout(() => {
    window.location.href = "/account/signin";
  }, 500);
};

instance.interceptors.request.use(
  (config) => {
    //  config.headers.Authorization = window.localStorage.getItem(TOKENID);
    config.headers.Authorization = Cookies.get(TOKENID, { domain: domanUrl })
      
    return config;
  },
  (error) => {
    Alert.error("http err!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.code === "SUCCESS") {
        return Promise.resolve(response.data.data);
      } else if (response.data.code === "401") {
        toLogin();
        return Promise.reject(response);
      }
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error.response.status === 403) {
      toLogin();
      return Promise.reject();
    }

    return Promise.reject({
      data: {
        msg: "response err!",
      },
    });
  }
);

export default instance;
