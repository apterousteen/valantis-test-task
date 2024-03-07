import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { generateAuthorizationString } from '../helpers';
import { Grid, Paper } from '@mui/material';

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
    <>
      <Grid container spacing={2} justify="center">
        {products?.map((product) => (
          <Grid item key={product.id}>
            <Paper
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '1px solid black',
                padding: '16px',
                width: '160px',
                height: '200px',
              }}
            >
              <span>{product.id}</span>
              <span>{product.product}</span>
              <span>{product.brand}</span>
              <span>{product.price}</span>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
