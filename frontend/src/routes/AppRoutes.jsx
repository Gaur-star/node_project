import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ProtectedRoute from './ProtectedRoute';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Shop from '../pages/Shop';
import Shop_details from '../pages/Shopdetails';
import error_page from '../pages/404';

function AppRoutes() {
  return (
    <Routes>
       {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop-details" element={<Shop_details />} />
      <Route path="/error_page" element={<error_page />} />
      

      {/* Login required */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
