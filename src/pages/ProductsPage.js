import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { generateAuthorizationString } from '../helpers';
import { Box } from '@mui/material';
import ProductsList from '../components/ProductsList';
import FilterForm from '../components/FilterForm';
import FilterSelect from '../components/FilterSelect';
import FilterInput from '../components/FilterInput';
import FilterButton from '../components/FilterButton';

export default function ProductsPage() {
  const [filter, setFilter] = useState('none');
  const [filterValue, setFilterValue] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFilter = (event) => {
    event.preventDefault();
    console.log(filter, filterValue);
  };

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const xAuthHeaderValue = generateAuthorizationString();

        const responseIds = await axios.post(
          API_URL,
          {
            action: 'get_ids',
            params: { offset: 0, limit: 10 },
          },
          {
            headers: {
              'X-Auth': xAuthHeaderValue,
            },
          }
        );

        const responseItems = await axios.post(
          API_URL,
          {
            action: 'get_items',
            params: { ids: responseIds.data.result },
          },
          {
            headers: {
              'X-Auth': xAuthHeaderValue,
            },
          }
        );

        console.log(responseItems.data.result);

        setProducts(responseItems.data.result);
        setErrorMsg('');
      } catch (e) {
        setProducts([]);
        setErrorMsg(e.message);
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    // fetchProductsList();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <FilterForm onFilter={handleFilter}>
        <FilterSelect filter={filter} setFilter={setFilter} />
        <FilterInput
          filter={filter}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        <FilterButton filter={filter} filterValue={filterValue} />
      </FilterForm>
      <Box
        sx={{
          p: 2,
          minHeight: '150vh',
          bgcolor: 'grey.100',
          flexGrow: 1,
        }}
      >
        <ProductsList products={products}></ProductsList>
      </Box>
    </Box>
  );
}
