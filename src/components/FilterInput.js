import * as React from 'react';
import TextField from '@mui/material/TextField';
import { filterNames } from '../config';

export default function FilterInput({
  filterKey,
  filterValue,
  setFilterValue,
}) {
  return (
    <TextField
      id="filter-input"
      disabled={filterKey === 'none'}
      label={
        filterKey === 'none'
          ? 'Выберите фильтр'
          : `Введите ${filterNames[filterKey]}`
      }
      value={filterKey === 'none' ? '' : filterValue}
      type={filterKey === 'price' ? 'number' : 'text'}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
}
