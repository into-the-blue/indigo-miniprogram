import Taro from '@tarojs/taro';
import qs from 'query-string';

class Request {
  constructor(public baseUrl: string, public headers?: any) {}

  request = (
    method:
      | 'GET'
      | 'OPTIONS'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'TRACE'
      | 'CONNECT'
      | undefined,
    url: string,
    data?: any,
  ):Promise<{data:any,statusCode:number}> => {
    const params = data ? data.params : undefined;
    if (data) delete data['params'];
    const queryString = params ? '?' + qs.stringify(params) : '';
    return new Promise((resolve, reject) => {
      Taro.request({
        url: this.baseUrl + url + queryString,
        data: {
          ...data,
        },
        method,
        header: {
          ...this.headers,
        },
        success: res => {
          resolve({
            data: res.data,
            statusCode: res.statusCode,
          });
        },
        fail: err => {
          reject(err);
        },
      });
    });
  };
  get = (url: string, params?: any) => {
    return this.request('GET', url, { params });
  };

  post = (url: string, body?: any) => {
    return this.request('POST', url, body);
  };
}

export default Request;
