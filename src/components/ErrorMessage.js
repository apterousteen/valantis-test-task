import React from 'react';
import { Alert, Box } from '@mui/material';

export default function ErrorMessage({ message }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
