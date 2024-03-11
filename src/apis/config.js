import axios from 'axios';
import axiosRetry from 'axios-retry';
import { generateAuthorizationString, handleError } from './helpers';

export const API_URL = 'https://api.valantis.store:41000/';
export const PASSWORD = 'Valantis';
export const API_LIMIT_PER_PAGE = 50;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'X-Auth': generateAuthorizationString(),
  },
});

axiosRetry(api, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error?.response?.status >= 500
    );
  },
  onRetry: (retryCount, e) => {
    handleError(e, true);
  },
});
