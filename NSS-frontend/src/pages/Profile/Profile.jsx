import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("programs");
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    unit: "",
    position: "volunteer",
    profilePic: null,
  });
  const [programs, setPrograms] = useState([]);
  const [programData, setProgramData] = useState({
    programName: "",
    programDate: "",
    programDescription: "",
    status: "Govt.",
    category: "Environment",
    images: [],
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsAuthenticated(true);
      fetchMembers();
      fetchPrograms();
    } else {
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleProgramChange = (e) => {
    if (e.target.name === "images") {
      setProgramData({ ...programData, images: e.target.files });
    } else {
      setProgramData({ ...programData, [e.target.name]: e.target.value });
    }
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(programData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          formData.append("images", value[i]);
        }
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:4000/api/programs/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Program added successfully!");
      setProgramData({
        programName: "",
        programDate: "",
        programDescription: "",
        category: "Environment",
        status: "Govt.",
        images: [],
      });
      fetchPrograms();
    } catch (error) {
      console.error("Error adding program:", error);
      alert("Failed to add program.");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setMemberData({ ...memberData, profilePic: e.target.files[0] });
    } else {
      setMemberData({ ...memberData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberDataToSend = new FormData();
    memberDataToSend.append("name", memberData.name);
    memberDataToSend.append("email", memberData.email);
    memberDataToSend.append("unit", memberData.unit);
    memberDataToSend.append("position", memberData.position);
    memberDataToSend.append("profilePic", memberData.profilePic);

    try {
      await axios.post("http://localhost:4000/api/members/add", memberDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Member added successfully!");
      setMemberData({ name: "", email: "", unit: "", position: "volunteer", profilePic: null });
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "programs":
        return (
          <div className="content">
            <h2>📌 Manage NSS Programs</h2>
            <p>Here you can add, edit, or remove NSS programs.</p>
            <form onSubmit={handleProgramSubmit} encType="multipart/form-data">
              <div className="multi-fields">
                <input
                  type="text"
                  name="programName"
                  placeholder="Enter program name"
                  value={programData.programName}
                  onChange={handleProgramChange}
                  required
                />
                <input
                  type="date"
                  name="programDate"
                  value={programData.programDate}
                  onChange={handleProgramChange}
                  required
                />
                <textarea
                  name="programDescription"
                  placeholder="Enter program description"
                  value={programData.programDescription}
                  onChange={handleProgramChange}
                  required
                />
                <select
                  name="category"
                  value={programData.category}
                  onChange={handleProgramChange}
                >
                  <option value="Environment">Environment</option>
                  <option value="Health">Health</option>
                  <option value="Charity">Charity</option>
                  <option value="Social Awareness">Social Awareness</option>
                </select>
                <select
                  name="status"
                  value={programData.status}
                  onChange={handleProgramChange}
                >
                  <option value="Govt.">Issued by Central Govt. or State Govt.</option>
                  <option value="Done">Program Done by RGUKT Ongole</option>
                  <option value="upcoming">Upcoming programs in RGUKT Ongole</option>
                  {/* <option value="Social Awareness">Social Awareness</option> */}
                </select>
                <label htmlFor="images">Upload Images:</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleProgramChange}
                />
                <button type="submit">➕ Add Program</button>
              </div>
            </form>
          </div>
        );
      case "members":
        return (
          <div className="content">
            <h2>👥 NSS Members</h2>
            <p>View and manage all registered NSS members.</p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="multi-fields">
                <input type="text" name="name" placeholder="Enter member name" value={memberData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Enter member email" value={memberData.email} onChange={handleChange} required />
                <input type="text" name="unit" placeholder="Enter member unit" value={memberData.unit} onChange={handleChange} required />
                <select name="position" value={memberData.position} onChange={handleChange}>
                  <option value="head">Head</option>
                  <option value="volunteer">Volunteer</option>
                </select>
                <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
                <button type="submit">➕ Add Member</button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return isAuthenticated ? (
    <div className="profile-container">
      <header className="navbar">NSS Management System</header>
      <div className="content-wrapper">
        <div className="sidebar">
          <h2>Welcome, {userEmail}</h2>
          <nav>
            <button onClick={() => setActiveSection("programs")}>📌 Manage Programs</button>
            <button onClick={() => setActiveSection("members")}>👥 View Members</button>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  ) : <h2>Redirecting to login...</h2>;
};

export default Profile;
