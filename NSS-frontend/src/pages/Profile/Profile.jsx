import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { toast } from "react-toastify";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [activeSection, setActiveSection] = useState("programs");
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editableProgram, setEditableProgram] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  



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


  const handleDeleteProgram = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.post(`http://localhost:4000/api/programs/delete/${id}`);
        toast.success("Program deleted successfully!");
        fetchPrograms(); // Refresh list
      } catch (error) {
        console.error("Error deleting program:", error);
        toast.error("Failed to delete program.");
      }
    }
  };
  const updateProgramData = async (programDataId) => {
    try {
      const formData = new FormData();
      formData.append("programName", programData.programName);
      formData.append("programDate", programData.programDate);
      formData.append("programDescription", programData.programDescription);
      formData.append("status", programData.status);
      formData.append("category", programData.category);

      // ✅ Convert FileList to array and append
      Array.from(programData.images).forEach((img) => {
        formData.append("images", img);
      });
      // ✅ Add imagesToDelete to the request (if any)
imagesToDelete.forEach((img) => {
  formData.append("imagesToDelete", img);
});


      const { data } = await axios.post(
        `http://localhost:4000/api/programs/edit/${programDataId}`,
        formData,
      );

      toast.success(data.message);
      fetchPrograms();
      setShowModal(false);

    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Failed to update program");
    }
  };
  const handleRemoveImage = (imgPath) => {
    setImagesToDelete((prev) => [...prev, imgPath]);
    setEditableProgram((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imgPath),
    }));
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
      toast.success("Program added successfully!");
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
      toast.error("Failed to add program.");
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
      ("Member added successfully!");
      setMemberData({ name: "", email: "", unit: "", position: "volunteer", profilePic: null });
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member.");
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
            <h3>Uploaded Programs</h3>

            <div className="program-table-section">
              <table className="program-table">
                <thead>
                  <tr>
                    <th>Program Name</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, idx) => (
                    <tr key={idx}>
                      <td>{program.programName}</td>
                      <td>{program.programDate ? program.programDate.slice(0, 10) : "N/A"}</td>
                      <td>{program.category}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditableProgram(program);
                            setProgramData({
                              programName: program.programName,
                              programDate: program.programDate.slice(0, 10),
                              programDescription: program.programDescription,
                              category: program.category,
                              status: program.status,
                              images: [], // Fresh file input
                            });
                            setShowModal(true);
                          }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="delete-btn"
                          color="red"
                          onClick={() => handleDeleteProgram(program._id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


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
          <h2>Welcome, Admin</h2>
          <nav>
            <button onClick={() => setActiveSection("programs")}>📌 Manage Programs</button>
            <button onClick={() => setActiveSection("members")}>👥 View Members</button>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
        <div className="main-content">{renderContent()}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Edit Program</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProgramData(editableProgram._id);
                    setShowModal(false);
                  }}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    name="programName"
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
                  </select>
                  {/* Show existing images with delete buttons */}
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
{editableProgram.images.map((img, index) => (
  <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
    <img
      src={`http://localhost:4000/${img.startsWith('uploads/') ? img : 'uploads/' + img}`}
      alt={`Preview ${index}`}
      style={{ width: '150px', border: '1px solid #ccc' }}
    />
    <button
      type="button"
      onClick={() => handleRemoveImage(img)}
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        background: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '2px 5px'
      }}
    >
      ✖
    </button>
  </div>
))}


</div>

                  <label htmlFor="images">Update Images (optional):</label>

                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleProgramChange}
                  />
                  <div className="modal-buttons">
                    <button type="submit">✅ Save</button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditableProgram(null);
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  ) : <h2>Redirecting to login...</h2>;
};



export default Profile;
