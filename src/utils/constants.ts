let host = 'https://indigo.timvel.com';

if (process.env.NODE_ENV === 'development') {
  host = 'http://localhost:7000';
}
const API_ENDPOINT = host + '/api/v1';

const GRAPHQL_ENDPOINT = host + '/graphql';

export { API_ENDPOINT, GRAPHQL_ENDPOINT };
