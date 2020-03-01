import Axios from 'axios';
import Taro from '@tarojs/taro';
import ApolloClient from 'apollo-boost';
import { API_ENDPOINT, GRAPHQL_ENDPOINT } from './constants';

const errorHanlder = (err: any) => {
  Taro.showToast({
    title: err.message,
    icon: 'none',
  });
  return Promise.reject(err);
};
Axios.interceptors.response.use(undefined, errorHanlder);
const headers = {
  'timvel-project': 'indigo',
  'timvel-app': 'indigo-dashboard',
  'timvel-platform': 'web',
};
const apiClient = Axios.create({
  baseURL: API_ENDPOINT,
  timeout: 20000,
  headers,
});

[apiClient].forEach(instance => {
  instance.interceptors.response.use(undefined, errorHanlder);
});

// data -> queryApartmentsWithoutLabel:Data

// loading: false

// networkStatus: 7

// stale: false
const gqlClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
});
export { apiClient, gqlClient };
