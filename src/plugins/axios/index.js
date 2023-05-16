"use strict";
import { Message } from "element-ui";
import axios from "axios";
import loginStore from "@/store/modules/login";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = "http://172.18.69.21:8085";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 取消请求
export let cancelTokenArray = [];

_axios.interceptors.request.use(
  config => {
    // 发送请求设置 cancelToken
    config.cancelToken = new axios.CancelToken(cancel => {
      cancelTokenArray.push({ cancel });
    });
    config.headers.common["Authorization"] = loginStore.state.token;
    // config.headers.common["Accept-Language"] = "en-US,en;q=0.9";

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    let res = response;

    // 处理文件流
    if (res.config?.responseType === "blob") {
      if (res.headers["content-type"].includes("application/json")) {
        const reader = new FileReader();
        reader.onload = () => {
          const { result } = reader;
          const errorInfos = JSON.parse(result);
          const { success, errMessage } = errorInfos;
          if (!success) {
            Message({
              message: `* ${errMessage} *`,
              type: "error",
              duration: 5 * 1000
            });
          }
        };
        reader.onerror = err => {
          console.log(err);
        };
        reader.readAsText(res?.data);
        return Promise.reject();
      } else {
        return res;
      }
    }
    // 处理json
    if (!res?.data?.success) {
      res?.data?.errMessage &&
        Message({
          message: `* ${res.data.errMessage} *`,
          type: "error",
          duration: 5 * 1000
        });
      return Promise.reject(res?.data?.errMessage || "");
    }
    return res;
  },
  error => {
    // Do something with response error
    return axios.isCancel(error)
      ? console.log("cancel request")
      : Promise.reject(error);
  }
);

export const http = _axios;
