import axios from "axios";
import router from "../../src/router/index";

if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://127.0.0.1:3000";
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "http://127.0.0.1:3000/";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "http://47.97.119.229/api";
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = false;

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    // Message.error("网络错误");
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/"
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          // 清除token
          localStorage.removeItem("token");
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login"
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          break;
        // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .get(url, {
              params: params
              // headers: { Authorization: store.state.token }
          })
          .then(res => {
              switch (res.data.code) {
                  case 200:
                      resolve(res);
                      break;
                  case 401:
                      // 
                      break;
                  default:
                      resolve(res);
                      
                      break;
              }
          })
          .catch(err => {
              reject(err.data);
          });
  });
}

/**
* delete方法，对应delete请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function del(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .delete(url, {
              data: params
              // headers: { Authorization: store.state.token }
          })
          .then(res => {
              switch (res.data.code) {
                  case 200:
                      resolve(res);
                      break;
                  case 401:
                      // 
                      break;
                  default:
                      
                      break;
              }
          })
          .catch(err => {
              reject(err.data);
          });
  });
}

/**
* put方法，对应put请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function put(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .put(url, params)
          .then(res => {
              switch (res.data.code) {
                  case 200:
                      resolve(res);
                      break;
                  case 401:
                      // 
                      break;
                  default:
                      resolve(res);
                      
                      break;
              }
          })
          .catch(err => {
              reject(err.data);
          });
  });
}

/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .post(url, params)
          .then(res => {
              switch (res.data.code) {
                  case 200:
                      resolve(res);
                      break;
                  case 401:
                      
                      break;
                  default:
                      resolve(res);
                      
                      break;
              }
          })
          .catch(err => {
              reject(err.data);
          });
  });
}

/**
* get图片，对应get请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function getImage(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .get(url, {
              params: params,
              responseType: 'blob'
          })
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err.data);
          });
  });
}
