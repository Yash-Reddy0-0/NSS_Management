import React from 'react';
import './Profile.css';

const Profile = () => {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="profile-page">
      <h2>Welcome, {userEmail}</h2>
      <h3>Admin Panel</h3>
      <button onClick={() => alert("Manage NSS Programs")}>📌 Manage Programs</button>
      <button onClick={() => alert("View NSS Members")}>👥 View Members</button>
      <button onClick={() => alert("Upload Gallery Images")}>🖼 Upload Images</button>
      <button className="logout-btn" onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = "/";
      }}>🚪 Logout</button>
    </div>
  );
};

export default Profile;