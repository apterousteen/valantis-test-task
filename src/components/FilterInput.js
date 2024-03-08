import * as React from 'react';
import TextField from '@mui/material/TextField';
import { filterNames } from '../config';

export default function FilterInput({ filter, filterValue, setFilterValue }) {
  return (
    <TextField
      id="filter-input"
      disabled={filter === 'none'}
      label={
        filter === 'none' ? 'Выберите фильтр' : `Введите ${filterNames[filter]}`
      }
      value={filterValue}
      type={filter === 'price' ? 'number' : 'text'}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
}
