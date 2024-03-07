import { Box, Grid, Paper, Stack } from '@mui/material';
import React from 'react';

export default function ProductsList({ products }) {
  return (
    <Stack sx={{ width: '100%', gap: '12px' }}>
      <Grid
        container
        sx={{
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '16px',
          borderRadius: 2,
          fontWeight: 600,
        }}
      >
        <Grid item xs={4} sx={{ p: 1 }}>
          ID
        </Grid>
        <Grid item xs={5} sx={{ p: 1 }}>
          Название
        </Grid>
        <Grid item xs={2} sx={{ p: 1 }}>
          Бренд
        </Grid>
        <Grid item xs={1} sx={{ p: 1 }}>
          Цена
        </Grid>
      </Grid>
      {products?.map((product) => (
        <Grid
          container
          key={product.id}
          sx={{
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '16px',
            borderRadius: 2,
          }}
        >
          <Grid item xs={4} sx={{ p: 1 }}>
            {product.id}
          </Grid>
          <Grid item xs={5} sx={{ p: 1 }}>
            {product.product}
          </Grid>
          <Grid item xs={2} sx={{ p: 1 }}>
            {product.brand ? product.brand : 'Без бренда'}
          </Grid>
          <Grid item xs={1} sx={{ p: 1 }}>
            {product.price}
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}
