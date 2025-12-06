import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: 12, borderBottom: '1px solid #ddd', display:'flex', justifyContent:'space-between' }}>
      <div>
        <Link to="/">BookStore</Link>
      </div>
      <div>
        <Link to="/">Home</Link> {' | '}
        <Link to="/cart">Cart</Link> {' | '}
        {user?.role === 'seller' && <><Link to="/seller/add">Add Book</Link> {' | '}<Link to="/seller/myproducts">My Products</Link> {' | '}</>}
        {user?.role === 'admin' && <><Link to="/admin">Admin</Link> {' | '}</>}
        {user ? (
          <>
            <span>Hi, {user.name}</span> {' '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> {' | '}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}
