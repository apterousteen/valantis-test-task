import CryptoJS from 'crypto-js';
import { PASSWORD } from './config';

export const getMoscowDate = () => {
  // around midnight API returns 401 when using app in different time zone, so we need to use UTC+3 date
  return new Date()
    .toLocaleString('en-CA', { timeZone: 'Europe/Moscow' })
    .slice(0, 10)
    .replaceAll('-', '');
};

export const generateAuthorizationString = () => {
  const timestamp = getMoscowDate();
  const hash = CryptoJS.MD5(`${PASSWORD}_${timestamp}`).toString();
  return hash;
};
