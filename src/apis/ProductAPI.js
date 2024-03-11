import { api, API_LIMIT_PER_PAGE } from './config';
import { deleteDublicateItems, handleError } from './helpers';

export const ProductAPI = {
  getIds: async (signal) => {
    try {
      const response = await api.post('/', { action: 'get_ids' }, { signal });

      return [...new Set(response.data.result)];
    } catch (e) {
      handleError(e);
    }
  },

  getItems: async (signal, ids, offset = 0, limit = API_LIMIT_PER_PAGE) => {
    try {
      const response = await api.post(
        '/',
        {
          action: 'get_items',
          params: { ids: ids?.slice(offset, limit + offset) },
        },
        { signal }
      );

      return deleteDublicateItems(response.data.result);
    } catch (e) {
      handleError(e);
    }
  },

  filter: async (signal, filterParams) => {
    try {
      const response = await api.post(
        '/',
        {
          action: 'filter',
          params: {
            [filterParams.key]:
              filterParams.key === 'price'
                ? +filterParams.value
                : filterParams.value,
          },
        },
        { signal }
      );

      return [...new Set(response.data.result)];
    } catch (e) {
      handleError(e);
    }
  },
};
