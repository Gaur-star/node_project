import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Home from '../pages/Home';
import Cart from '../pages/Cart';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AppRoutes;
