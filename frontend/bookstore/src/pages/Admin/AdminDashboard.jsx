import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  const [stats, setStats] = useState({ users:0, sellers:0, books:0 });

  useEffect(() => {
    API.get('/admin/stats').then(res => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h3>Admin Dashboard</h3>
      <div>Users: {stats.users}</div>
      <div>Sellers: {stats.sellers}</div>
      <div>Books: {stats.books}</div>
      <div><Link to="/admin/users">Manage Users</Link></div>
    </div>
  );
}
