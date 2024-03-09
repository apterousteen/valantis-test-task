import ProductsPage from './pages/ProductsPage';
import { CssBaseline } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';

export default function App() {
  return (
    // GitHub pages work with HashRouter
    <HashRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HashRouter>
  );
}
