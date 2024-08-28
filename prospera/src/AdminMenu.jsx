import React from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div>
      <h2>Admin Menu</h2>
      <ul>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/analytics">View Analytics</Link></li>
        <li><Link to="/admin/reset">Reset User Data</Link></li>
      </ul>
    </div>
  );
};

export default AdminMenu;
