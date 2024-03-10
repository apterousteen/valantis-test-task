import React from 'react';
import { Box, Pagination } from '@mui/material';

export default function ProductsPagination({
  page,
  productsTotalCount,
  onPageChange,
}) {
  return (
    <Box className="pagination-wrapper">
      <Pagination
        shape="rounded"
        sx={{ mt: 2, mb: 2 }}
        page={page}
        count={Math.ceil(productsTotalCount / 50)}
        onChange={onPageChange}
      />
    </Box>
  );
}
