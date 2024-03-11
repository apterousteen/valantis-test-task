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

export const handleError = (e, retry = false) => {
  const status = e.response ? e.response.status : '';
  const data = e.response ? e.response.data : '';

  if (status) {
    console.error(
      `${
        retry ? 'Retry attempt' : ''
      } Error: \nid: ${data} \nstatus: ${status} \nmessage: ${e.message}`
    );
  }

  if (!retry && e.name !== 'CanceledError') {
    throw e;
  }
};
