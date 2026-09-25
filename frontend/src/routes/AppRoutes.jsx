import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
       {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />

      {/* Login required */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
