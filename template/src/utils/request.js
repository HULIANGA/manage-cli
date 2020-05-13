/*
 * @Description: 文件说明
 * @Date: 2019-10-07 11:58:51
 * @LastEditors: lijiayou
 * @LastEditTime: 2019-11-25 18:42:25
 */
import axios from 'axios';
import { Message, Spin } from 'view-design';
// const md5 = require('md5');
// Set baseURL when debugging production url in dev mode
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

if (window.location.href.indexOf('cn-zzm') > -1) {
  axios.defaults.baseURL = '//cn-zzm-api.zhizh.com/gateway';
}
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Spin.hide();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = error.response.data.data.redirect;
          break;
      }
      if (error.response.data && error.response.data.msg) {
        Message.error(error.response.data.msg);
      }
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data);
    }
  }
);

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 */
export async function request(options, isFetch) {
  try {
    const token = localStorage.getItem('token') || '';
    options.headers = options.headers || {};

    if (token) {
      options.headers.Authorization = token;
    }

    const isGetMethod =
      options.method && options.method.toLowerCase() === 'get';
    // const cacheKey = md5(JSON.stringify(options));

    /**
     * 写操作增加全局loading，防止重复写数据
     */
    !isGetMethod && Spin.show();

    /**
     * 返回缓存数据
     */
    // if (isGetMethod && !isFetch) {
    //     let cacheData = localStorage.getItem(cacheKey);
    //     if (cacheData) {
    //         cacheData = JSON.parse(cacheData);
    //         request(options, true);
    //         const cacheResponse = {
    //             data: cacheData
    //         };
    //         return {
    //             response: cacheResponse,
    //             data: cacheResponse.data
    //         };
    //     }
    // }

    /**
     * 返回远程请求数据
     */
    const response = await axios(options);
    const { data } = handleResponse(response);
    // if (isGetMethod) {
    //   if (data.code === 0) {
    //     try {
    //       localStorage.setItem(cacheKey, JSON.stringify(data));
    //     } catch (e) {
    //       localStorage.clear();
    //       localStorage.setItem(cacheKey, JSON.stringify(data));
    //     }
    //   }
    // }
    Spin.hide();
    return { response, data };
  } catch (error) {
    const response = {
      data: error
    };
    return { response, data: response.data };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (data.code === 0) {
    return { data };
  } else if (data.code === 10403) {
    location.href = '/login';
  } else {
    // const error = new Error(data.msg || '接口异常')
    // 不存在$notMsg时页面报错
    if (!response.config.$notMsg) {
      Message.error(data.msg);
    }
    return { data };
  }
}
