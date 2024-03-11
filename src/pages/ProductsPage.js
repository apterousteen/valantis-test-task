import React, { useEffect, useRef, useState } from 'react';
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

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [productsTotalCount, setProductsTotalCount] = useState(0);
  const offset = (page - 1) * API_LIMIT_PER_PAGE;

  const [filterKey, setFilterKey] = useState('none');
  const [filterValue, setFilterValue] = useState('');
  const [filterParams, setFilterParams] = useState({});

  const [productsOnPage, setProductsOnPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const initialRender = useRef(false);

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
        setLoading(true);
        setErrorMsg('');

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

        if (ids?.length) {
          setProductsTotalCount(ids.length);
        }

        const items = await ProductAPI.getItems(signal, ids, offset);

        setProductsOnPage(items);
        setErrorMsg('');
      } catch (e) {
        if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
          setErrorMsg(e.message);
          setProductsOnPage([]);
          setProductsTotalCount(0);
        }
      } finally {
        setLoading(false);
      }
    };

    if (initialRender.current) {
      fetchProductsList();
    } else {
      initialRender.current = true;
    }

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
