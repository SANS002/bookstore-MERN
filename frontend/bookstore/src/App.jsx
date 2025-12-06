import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SellerAdd from './pages/Seller/AddBook';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/Users';
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
import SellerMyProducts from './pages/Seller/MyProducts';
import BookDetails from './pages/BookDetails';
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrders />} />

        {/* Seller */}
        <Route path="/seller/add" element={<SellerAdd />} />
        <Route path="/seller/myproducts" element={<SellerMyProducts />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
