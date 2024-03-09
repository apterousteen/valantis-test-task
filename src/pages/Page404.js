import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <Container
      sx={{
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        height: '100dvh',
      }}
    >
      <Typography variant="h5">
        <b>404</b> | Такой страницы нет (
      </Typography>
      <Link to={'/'}>
        <Button>Вернуться на главную</Button>
      </Link>
    </Container>
  );
}
