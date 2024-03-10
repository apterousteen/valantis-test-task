import React from 'react';
import { Box, Stack } from '@mui/material';
import ProductsPagination from './ProductsPagination';

export default function Main({
  page,
  productsTotalCount,
  onPageChange,
  children,
}) {
  return (
    <Box className="main">
      <Stack sx={{ width: '100%', minHeight: '100%', gap: '12px' }}>
        {children}
        <ProductsPagination
          page={page}
          productsTotalCount={productsTotalCount}
          onPageChange={onPageChange}
        />
      </Stack>
    </Box>
  );
}
