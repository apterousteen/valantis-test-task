import React from 'react';
import { Box, Pagination, Stack } from '@mui/material';

export default function Main({
  page,
  productsTotalCount,
  onPageChange,
  children,
}) {
  return (
    <Box
      sx={{
        p: 2,
        minHeight: '100dvh',
        bgcolor: 'grey.100',
        flexGrow: 1,
      }}
    >
      <Stack sx={{ width: '100%', minHeight: '100%', gap: '12px' }}>
        {children}

        <Pagination
          shape="rounded"
          sx={{ alignSelf: 'center', mt: 2, mb: 2 }}
          page={page}
          count={Math.ceil(productsTotalCount / 50)}
          onChange={onPageChange}
        />
      </Stack>
    </Box>
  );
}
