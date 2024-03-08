import * as React from 'react';
import { MenuItem, TextField } from '@mui/material';

export default function FilterSelect({ filter, setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <TextField
      select
      label="Фильтр"
      id="filter-select"
      value={filter}
      onChange={handleChange}
    >
      <MenuItem value={'none'}>Без фильтра</MenuItem>
      <MenuItem value={'product'}>По названию</MenuItem>
      <MenuItem value={'price'}>По цене</MenuItem>
      <MenuItem value={'brand'}>По бренду</MenuItem>
    </TextField>
  );
}
