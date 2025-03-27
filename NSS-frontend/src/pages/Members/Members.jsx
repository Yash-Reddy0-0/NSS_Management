import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Members.css";
import LeaderCard from "../../components/LeaderCard/LeaderCard";
const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="members-container">
      <h2>👥 NSS Members</h2>
      <div className="leaders-container">
          <LeaderCard 
            image="director.jpg" 
            name="Director" 
            description="Our director leads the institution with a vision for academic excellence and community service." 
            moreInfo=" Under their leadership, RGUKT has flourished, fostering a culture of research, innovation, and student success."
          />

          <LeaderCard 
            image="nsshead.jpg" 
            name="NSS Head" 
            description="The NSS Head is responsible for organizing and overseeing all National Service Scheme activities at RGUKT." 
            moreInfo=" They ensure students actively engage in social service, community development, and leadership initiatives."
          />
        </div>
      <div className="members-grid">
        {members.map((member) => (
          <div key={member._id} className="member-card">
            <img
              src={
                member.profilePic
                  ? `http://localhost:4000/${member.profilePic}`
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="member-image"
            />
            <h3>{member.name}</h3>
            <p>{member.email}</p>
            <p>Unit: {member.unit}</p>
            <span className={`position ${member.position}`}>
              {member.position.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
