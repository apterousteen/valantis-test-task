import CryptoJS from 'crypto-js';
import { PASSWORD } from './config';

export const generateAuthorizationString = () => {
  const timestamp = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const hash = CryptoJS.MD5(`${PASSWORD}_${timestamp}`).toString();
  return hash;
};

export const deleteDublicateItems = (rawItems) => {
  const uniqueItems = rawItems.filter(
    (value, index, itemsArr) =>
      index === itemsArr.findIndex((t) => t.id === value.id)
  );

  return uniqueItems;
};
