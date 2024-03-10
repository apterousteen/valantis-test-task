import axios from 'axios';
import { API_URL, API_LIMIT_PER_PAGE } from './config';
import { deleteDublicateItems, generateAuthorizationString } from './helpers';

export const ProductAPI = {
  getIds: async () => {
    try {
      const response = await axios.post(
        API_URL,
        {
          action: 'get_ids',
        },
        {
          headers: {
            'X-Auth': generateAuthorizationString(),
          },
        }
      );

      return [...new Set(response.data.result)];
    } catch (e) {
      console.error('Error getting ids:', e.message);
      throw e;
    }
  },

  getItems: async (ids, offset = 0, limit = API_LIMIT_PER_PAGE) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          action: 'get_items',
          params: { ids: ids.slice(offset, limit + offset) },
        },
        {
          headers: {
            'X-Auth': generateAuthorizationString(),
          },
        }
      );

      return deleteDublicateItems(response.data.result);
    } catch (e) {
      console.error('Error getting items:', e.message);
      throw e;
    }
  },

  filter: async (filterParams) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          action: 'filter',
          params: {
            [filterParams.key]:
              filterParams.key === 'price'
                ? +filterParams.value
                : filterParams.value,
          },
        },
        {
          headers: {
            'X-Auth': generateAuthorizationString(),
          },
        }
      );

      return [...new Set(response.data.result)];
    } catch (e) {
      console.error('Error filtering items:', e.message);
      throw e;
    }
  },
};
