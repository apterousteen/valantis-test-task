import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { generateAuthorizationString } from '../helpers';
import { Box, Container, Grid, Paper } from '@mui/material';
import ProductsList from '../components/ProductsList';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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

    fetchProductsList();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          minWidth: '20%',
          height: '100vh',
          position: 'sticky',
          top: 0,
          bgcolor: 'grey.300',
        }}
      >
        <Box sx={{ p: 2 }}>Left Column Content</Box>
      </Box>
      <Box
        sx={{
          p: 2,
          minHeight: '150vh',
          bgcolor: 'secondary.light',
          flexGrow: 1,
        }}
      >
        {/* Content of the right column */}

        <ProductsList products={products}></ProductsList>
      </Box>
    </Box>
  );
}
