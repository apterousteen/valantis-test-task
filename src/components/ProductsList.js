import React from 'react';
import { Pagination, Stack } from '@mui/material';
import ListItem from './ListItem';

export default function ProductsList({ products }) {
  // TODO: implement pagination

  return (
    <Stack sx={{ width: '100%', gap: '12px' }}>
      <ListItem isHeader={true} />
      {products?.map((product, i) => (
        <ListItem product={product} i={i} />
      ))}
      <Pagination
        shape="rounded"
        count={Math.ceil(products.length / 10)}
        sx={{ alignSelf: 'center', mt: 2, mb: 2 }}
      />
    </Stack>
  );
}
