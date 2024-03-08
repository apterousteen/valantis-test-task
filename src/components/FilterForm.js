import React from 'react';
import { Box, FormControl, Typography } from '@mui/material';

export default function FilterForm({ children, onFilter }) {
  return (
    <Box
      sx={{
        minWidth: '20%',
        height: '100vh',
        position: 'sticky',
        top: 0,
        bgcolor: 'grey.300',
      }}
    >
      <Box sx={{ p: 2 }} component="form" onSubmit={onFilter}>
        <Typography variant="h6" сomponent="h2" sx={{ mb: 3 }}>
          Поиск
        </Typography>
        <FormControl fullWidth sx={{ gap: 2 }}>
          {children}
        </FormControl>
      </Box>
    </Box>
  );
}
