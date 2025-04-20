import axios from 'axios';
import { PATH } from '../configs';


/* make a request api
axios interceptor
- inject access_token
- show loading

success
- hide loading

error
- 400 -> ?
- 500 -> ?
- 501 -> ?
- 503 -> ?

FE -> call api -> access token expired -> call api refresh token -> auto call api again

FE -> request api -> axios interceptor request -> BE response -> axios interceptor response

*/

const requestConfig = {
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  showLoading: true
}

export const httpRequest = axios.create(requestConfig);

export function initRequest() {

  // Add a request interceptor
  httpRequest.interceptors.request.use(function (config) {
    console.log('interceptor request success: ', config)
    const access_token = window.localStorage.getItem('access_token');

    // inject access token
    if (access_token) {
      config.headers['x-auth-token'] = window.localStorage.getItem('access_token');
    }

    // show loading
    if (config.showLoading) {
      // code logic here
    }

    return config;
  }, function (error) {
    console.log('interceptor request error: ', error)

    return Promise.reject(error);
  });

  httpRequest.interceptors.response.use(function (response) {
    console.log('interceptor response success: ', response)

    // hide loading
    if (response.config.showLoading) {
      // code logic here
    }


    return response.data;
  }, async function (error) {
    console.log('interceptor response error: ', error)
    const { config, code, status } = error;

    // timeout
    if (code === "ECONNABORTED") { 
      // code logic here
    }

    // FE -> call api -> access token expired -> call api refresh token -> auto call api again
    if (status === 401) {
      const refresh_token = window.localStorage.getItem('refresh_token');
      try {
        const response = await httpRequest('/api/user/refresh-token', {
          method: 'POST',
          data: {
            data: {
              refresh_token
            }
          }
        })
        const access_token = response.data.access_token;
        if (access_token) {
          window.localStorage.setItem('access_token', access_token);
          httpRequest.defaults.headers['x-auth-token'] = access_token;
          return httpRequest(config)
        }
      } catch (err) {
        return Promise.reject(error);
      }
    }

    // handle error
    switch (status) {
      case 403: {
        window.location.href = PATH.ACCESS_DENIED;
        break;
      }
      case 504:
      case 503: {
        window.location.href = PATH.SERVICE_UNAVAILABLE;
        break;
      }
      default:
        break
    }


    return Promise.reject(error);
  });
}