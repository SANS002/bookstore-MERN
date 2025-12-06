import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SellerAdd from '../pages/Seller/AddBook';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/Users';
import MyOrders from '../pages/MyOrders';
import CartPage from '../pages/CartPage';
import SellerMyProducts from '../pages/Seller/MyProducts';
import BookDetails from '../pages/BookDetails';
import PrivateRoute from './PrivateRoute'; // import it

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/book/:id" 
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/myorders" 
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/seller/add" 
          element={
            <PrivateRoute>
              <SellerAdd />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/seller/myproducts" 
          element={
            <PrivateRoute>
              <SellerMyProducts />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <PrivateRoute>
              <AdminUsers />
            </PrivateRoute>
          } 
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
