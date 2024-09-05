import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8080/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users:", response.statusText);
      }
    };

    fetchUsers();
  }, []);

  const fetchAnalytics = async () => {
    const response = await fetch("http://localhost:8080/admin/analytics");
    if (response.ok) {
      const data = await response.json();
      setAnalytics(data);
    } else {
      console.error("Error fetching analytics:", response.statusText);
    }
  };

  const handleAddUser = async () => {
    const response = await fetch("http://localhost:8080/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ name: "", email: "", password: "" });
    } else {
      console.error("Error adding user:", response.statusText);
    }
  };

  const handleDeleteUser = async (userId) => {
    const response = await fetch(`http://localhost:8080/admin/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      console.error("Error deleting user:", response.statusText);
    }
  };

  const renderPieChart = () => {
    if (!analytics) return null;

    const data = {
      labels: ["Saving Money", "Investing", "Budgeting", "Spending Wisely"],
      datasets: [
        {
          data: [
            analytics.savingMoney,
            analytics.investing,
            analytics.budgeting,
            analytics.spendingWisely,
          ],
          backgroundColor: ["#76b07f", "#ffcd56", "#ff6384", "#36a2eb"],
          hoverOffset: 4,
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <DashboardContainer>
      <DashboardTitle>Admin Dashboard</DashboardTitle>

      <SectionTitle>Add New User</SectionTitle>
      <AddUserForm>
        <Input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <AddButton onClick={handleAddUser}>Add User</AddButton>
      </AddUserForm>

      <SectionTitle>User Management</SectionTitle>
      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            {user.name} - {user.email}
            <DeleteButton onClick={() => handleDeleteUser(user.id)}>Delete</DeleteButton>
          </UserItem>
        ))}
      </UserList>

      <SectionTitle>Analytics</SectionTitle>
      <AnalyticsButton onClick={fetchAnalytics}>View Analytics</AnalyticsButton>
      {analytics && renderPieChart()}
    </DashboardContainer>
  );
};

export default AdminDashboard;

// Styled Components
const DashboardContainer = styled.div`
  padding: 40px;
  background-color: #f9f9f9;
  font-family: "Fredoka", sans-serif;
`;

const DashboardTitle = styled.h2`
  font-size: 36px;
  color: #76b07f;
  text-align: center;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const AddUserForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: "Fredoka", sans-serif;

  &:focus {
    border-color: #76b07f;
    outline: none;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #76b07f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-family: "Fredoka", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5b9365;
  }
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #b71c1c;
  }
`;

const AnalyticsButton = styled.button`
  padding: 12px 20px;
  background-color: #76b07f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-family: "Fredoka", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5b9365;
  }
`;

const AnalyticsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnalyticsItem = styled.li`
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PieContainer = styled.div`
  width: 60%;
  margin: 20px auto;
`;
