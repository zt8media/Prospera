import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

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

  const handleAddUser = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const user = await response.json();
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '' });
    } else {
      console.error('Error adding user:', response.statusText);
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      console.error('Error deleting user:', response.statusText);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add New User</h3>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h3>User Management</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Analytics</h3>
      <button onClick={fetchAnalytics}>View Analytics</button>
      <ul>
        {analytics.map(item => (
          <li key={item.name}>{item.name}: {item.completion}% completed</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
