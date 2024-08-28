import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        console.error('Error fetching profile:', data.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Completion: {profile.completion}%</p>
    </div>
  );
};

export default UserProfile;
