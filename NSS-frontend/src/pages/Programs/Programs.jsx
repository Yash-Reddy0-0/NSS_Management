import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Programs.css";

const Programs = () => {
  const [viewMode, setViewMode] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState({
    govt: [],
    done: [],
    upcoming: [],
  });

  useEffect(() => {
    fetchProgramsByStatus();
  }, []);

  const fetchProgramsByStatus = async () => {
    try {
      const [govtRes, doneRes, upcomingRes] = await Promise.all([
        axios.get("http://localhost:4000/api/programs/status/Govt."),
        axios.get("http://localhost:4000/api/programs/status/Done"),
        axios.get("http://localhost:4000/api/programs/status/upcoming"),
      ]);

      setPrograms({
        govt: govtRes.data,
        done: doneRes.data,
        upcoming: upcomingRes.data,
      });
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleViewMode = (category) => {
    setSelectedCategory(category);
    setViewMode("cards");
  };

  const renderProgramCards = (programsList) => {
    return programsList.map((program) => (
      <div key={program._id} className="program-card">
        {program.images && program.images.length > 0 && (
          <img
            src={`http://localhost:4000/${program.images[0]}`}
            alt={program.programName}
            className="program-image"
          />
        )}
        <h3 className="program-title">{program.programName}</h3>
        <p className="program-date">
          {new Date(program.programDate).toLocaleDateString()}
        </p>
        <p className="program-description">
          {program.programDescription.slice(0, 100)}...
        </p>
        <p className="program-category">Category: {program.category}</p>
        <button
          className="view-more-btn"
          onClick={() => {
            setSelectedProgram(program);
            setViewMode("programDetails");
          }}
        >
          View More
        </button>
      </div>
    ));
  };

  return (
    <div className="programs-container">
      {viewMode === "hero" ? (
        <div className="hero-section" color="transparent">
          <h1 className="hero-title" color="white">NSS Programs at RGUKT Ongole</h1>
          <div className="sections-container">
            <div className="section" onClick={() => handleViewMode("govt")}>
              <h2>Government Programs</h2>
              <p>View programs issued by Central and State Government</p>
              <span className="program-count">{programs.govt.length} Programs</span>
            </div>
            <div className="section" onClick={() => handleViewMode("activities")}>
              <h2>Our Activities</h2>
              <p>Explore programs conducted by RGUKT Ongole NSS</p>
              <span className="program-count">
                {programs.done.length + programs.upcoming.length} Programs
              </span>
            </div>
          </div>
        </div>
      ) : viewMode === "cards" ? (
        <div className="programs-view">
          

          {selectedCategory === "govt" && (
            <section className="program-section">
              <h2>Government Programs</h2>
              <div className="programs-grid">
                {renderProgramCards(programs.govt)}
              </div>
            </section>
          )}

          {selectedCategory === "activities" && (
            <>
              <section className="program-section">
                <h2>Completed Programs</h2>
                <div className="programs-grid">
                  {renderProgramCards(programs.done)}
                </div>
              </section>

              <section className="program-section">
                <h2>Upcoming Programs</h2>
                <div className="programs-grid">
                  {renderProgramCards(programs.upcoming)}
                </div>
              </section>
            </>
          )}
          <button className="back-btn" onClick={() => setViewMode("hero")}>
            ← Back to Overview
          </button>
        </div>
      ) : (
        selectedProgram && (
          <div className="program-details">
            <button className="back-btn" onClick={() => setViewMode("cards")}>
              ← Back to Programs
            </button>
            <h2>{selectedProgram.programName}</h2>
            <p className="program-date">
              Date: {new Date(selectedProgram.programDate).toLocaleDateString()}
            </p>
            <p className="program-description">{selectedProgram.programDescription}</p>
            <p className="program-category">Category: {selectedProgram.category}</p>
            <div className="program-images">
              {selectedProgram.images?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/${img}`}
                  alt={`${selectedProgram.programName} - Image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Programs;
