import { Grid, Paper } from '@mui/material';
import React from 'react';

export default function ListItem({ product, index, isHeader = false }) {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 1,
        borderRadius: 2,
        ...(isHeader && { bgcolor: 'grey.300', fontWeight: 600 }),
      }}
    >
      <Grid container>
        <Grid item xs={1} sx={{ p: 1 }}>
          {isHeader ? '№' : index}
        </Grid>
        <Grid item xs={4} sx={{ p: 1 }}>
          {isHeader ? 'ID' : product.id}
        </Grid>
        <Grid item xs={4} sx={{ p: 1 }}>
          {isHeader ? 'Название' : product.product}
        </Grid>
        <Grid item xs={2} sx={{ p: 1 }}>
          {isHeader ? 'Бренд' : product.brand ? product.brand : '—'}
        </Grid>
        <Grid item xs={1} sx={{ p: 1 }}>
          {isHeader ? 'Цена' : product.price}
        </Grid>
      </Grid>
    </Paper>
  );
}
