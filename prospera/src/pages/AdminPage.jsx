import React, { useState, useEffect } from 'react';
import AdminMenu from '../components/AdminMenu';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    };

    fetchUsers();
  }, []);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setAnalytics(data);
    }
  };

  const resetAllUsers = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8080/admin/reset', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('All users reset');
    // Refresh users list
    const response = await fetch('http://localhost:8080/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div>
      <AdminMenu />
      <h3>User Management</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
      <h3>Analytics</h3>
      <button onClick={fetchAnalytics}>View Analytics</button>
      <ul>
        {analytics.map(item => (
          <li key={item.name}>{item.name}: {item.completion}% completed</li>
        ))}
      </ul>
      <button onClick={resetAllUsers}>Reset All Users</button>
    </div>
  );
};

export default AdminPage;
