import { Button } from '@mui/material';

export default function FilterButton({ filter, filterValue }) {
  return (
    <Button
      disableElevation
      variant="contained"
      color="primary"
      sx={{ mt: 1 }}
      disabled={filter === 'none' || filterValue === ''}
      type="submit"
    >
      Найти
    </Button>
  );
}
