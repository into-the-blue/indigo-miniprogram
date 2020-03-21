import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';
import Taro from '@tarojs/taro';
import { createHttpLink } from 'apollo-link-http';
import WXApolloFetcher from 'wx-apollo-fetcher';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_ENDPOINT, GRAPHQL_ENDPOINT } from './constants';
import { Cache } from './Cache';

const link = createHttpLink({
  fetch: WXApolloFetcher,
  uri: GRAPHQL_ENDPOINT,
});

Axios.defaults.adapter = mpAdapter;

const getNewToken = async (refreshToken: string) => {
  const { data } = await apiClient.post('/auth/refresh', {
    refreshToken,
  });
  return data;
};

const errorHanlder = (instance: AxiosInstance) => async (err: any) => {
  const config = err.config;

  if (err.response.status === 401) {
    // not authorized
    const authData = await Cache.get('authData').catch(error => {
      console.warn('httpClient -> errorHanlder', error);
      return null;
    });
    if (authData && authData.refreshToken) {
      const { success, message, accessToken, refreshToken } = await getNewToken(
        authData.refreshToken,
      );
      if (!success) {
        return Promise.reject(new Error(message));
      }
      Cache.set('authData', {
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
    console.warn('httpClient -> beforeRequest', err);
    return null;
  });
  if (authData && authData.accessToken) {
    value.headers['Authorization'] = 'Bearer ' + authData.accessToken;
  }
  return value;
};
Axios.interceptors.response.use(undefined, errorHanlder);

const headers = {
  'timvel-project': 'indigo',
  'timvel-app': 'indigo-mp',
  'timvel-platform': 'miniprogram',
};
const apiClient = Axios.create({
  baseURL: API_ENDPOINT,
  headers,
});

[apiClient].forEach(instance => {
  instance.interceptors.request.use(beforeRequest);
  instance.interceptors.response.use(undefined, errorHanlder);
});

const gqlClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export { apiClient, gqlClient };
