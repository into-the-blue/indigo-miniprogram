import axios, { AxiosRequestConfig, AxiosInstance } from 'taro-axios';
import Taro from '@tarojs/taro';
import { createHttpLink } from 'apollo-link-http';
import WXApolloFetcher from 'wx-apollo-fetcher';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_ENDPOINT, GRAPHQL_ENDPOINT } from './constants';
import { Cache } from './Cache';
import { THttpResponse } from '@/types';

const link = createHttpLink({
  fetch: WXApolloFetcher,
  uri: GRAPHQL_ENDPOINT,
});

const getNewToken = async (
  refreshToken: string,
): Promise<THttpResponse<{ accessToken: string; refreshToken: string }>> => {
  const { data } = await apiClient.post('/auth/refresh', {
    refreshToken,
  });
  return data;
};

const errorHanlder = (instance: AxiosInstance) => async (err: any) => {
  const config = err.config;
  console.log('errorHanlder', err.response.status);
  if (err.response.status === 401) {
    // not authorized
    const authData = await Cache.get('authData').catch(error => {
      console.log('httpClient -> errorHanlder', error);
      return null;
    });
    console.log({ authData });
    if (authData && authData.refreshToken) {
      const { success, message, data } = await getNewToken(authData.refreshToken);
      const { accessToken, refreshToken } = data!;
      if (!success) {
        console.log('refresh token failed');
        return Promise.reject(new Error(message));
      }
      await Cache.set('authData', {
        accessToken,
        refreshToken,
      });
      return instance(config);
    }
  }
  // Taro.showToast({
  //   title: 'Network error',
  //   icon: 'none',
  // });
  return Promise.reject(err);
};

const beforeRequest = async (value: AxiosRequestConfig) => {
  const authData = await Cache.get('authData').catch(err => {
    return null;
  });
  if (authData && authData.accessToken) {
    value.headers['Authorization'] = 'Bearer ' + authData.accessToken;
  }
  return value;
};
// axios.interceptors.response.use(undefined, errorHanlder);

const headers = {
  'timvel-project': 'indigo',
  'timvel-app': 'indigo-mp',
  'timvel-platform': 'miniprogram',
};
const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers,
});

[apiClient].forEach(instance => {
  instance.interceptors.request.use(beforeRequest);
  instance.interceptors.response.use(undefined, errorHanlder(instance));
});

const gqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export { apiClient, gqlClient };
