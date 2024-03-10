import React from 'react';
import { Box, FormControl, Typography } from '@mui/material';

export default function FilterForm({ children, onFilter }) {
  return (
    <Box className="sidebar">
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
