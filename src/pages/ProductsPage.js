import React, { useEffect, useReducer, useState } from 'react';
import { Box } from '@mui/material';
import { ProductAPI } from '../apis/ProductAPI';
import { API_LIMIT_PER_PAGE } from '../apis/config';
import ProductsList from '../components/ProductsList';
import FilterForm from '../components/FilterForm';
import FilterSelect from '../components/FilterSelect';
import FilterInput from '../components/FilterInput';
import FilterButton from '../components/FilterButton';
import Loader from '../components/Loader';
import Main from '../components/Main';
import ErrorMessage from '../components/ErrorMessage';

const initialFetchState = {
  productsOnPage: [],
  productsTotalCount: 0,
  loading: true,
  errorMsg: '',
};

const fetchStateReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_start':
      return {
        ...state,
        loading: true,
        errorMsg: '',
      };

    case 'fetch_success':
      return {
        ...state,
        loading: false,
        errorMsg: '',
        productsOnPage: action.payload.items,
        productsTotalCount:
          action.payload.ids?.length >= 0 ? action.payload.ids.length : 0,
      };

    case 'fetch_error':
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.error,
        productsOnPage: [],
        productsTotalCount: 0,
      };

    default:
      return { ...state };
  }
};

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * API_LIMIT_PER_PAGE;

  const [filterKey, setFilterKey] = useState('none');
  const [filterValue, setFilterValue] = useState('');
  const [filterParams, setFilterParams] = useState({});

  const [state, dispatch] = useReducer(fetchStateReducer, initialFetchState);
  const { productsOnPage, productsTotalCount, loading, errorMsg } = state;

  const handleFilter = async (event) => {
    event.preventDefault();

    setPage(1);
    setFilterParams(() => {
      if (filterKey === 'none') {
        return {};
      } else {
        return {
          key: filterKey,
          value: filterValue,
        };
      }
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProductsList = async () => {
      try {
        dispatch({ type: 'fetch_start' });
        let ids;
        if (
          Object.keys(filterParams).length === 0 &&
          filterParams.constructor === Object
        ) {
          ids = await ProductAPI.getIds(signal);
        } else {
          ids = await ProductAPI.filter(signal, filterParams);
        }

        if (ids?.length === 0) {
          throw new Error('No products found');
        }

        const items = await ProductAPI.getItems(signal, ids, offset);

        dispatch({
          type: 'fetch_success',
          payload: {
            items,
            ids,
          },
        });
      } catch (e) {
        if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
          dispatch({
            type: 'fetch_error',
            payload: {
              error: e.message,
            },
          });
        }
      }
    };

    fetchProductsList();

    return () => {
      abortController.abort();
    };
  }, [page, filterParams]);

  return (
    <Box className="products-page">
      <FilterForm onFilter={handleFilter}>
        <FilterSelect filter={filterKey} setFilter={setFilterKey} />
        <FilterInput
          filterKey={filterKey}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        <FilterButton filter={filterKey} filterValue={filterValue} />
      </FilterForm>

      <Main
        page={page}
        productsTotalCount={productsTotalCount}
        onPageChange={handlePageChange}
      >
        {!errorMsg && (
          <>
            {loading && <Loader />}
            {!loading && (
              <ProductsList
                productsOnPage={productsOnPage}
                offset={offset}
              ></ProductsList>
            )}
          </>
        )}
        {errorMsg && <ErrorMessage message={errorMsg} />}
      </Main>
    </Box>
  );
}
