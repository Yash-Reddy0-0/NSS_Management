import React from 'react'
import './Aboutus.css'


const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <section className="hero-section">
        <h1>About NSS at SSN Engineering College</h1>
        <div className="mission-statement">
          <h2>"Not Me But You"</h2>
          <p>The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports that aims to develop student's personality through community service.</p>
        </div>
      </section>

      <section className="motive-section">
        <h2>Our Motives</h2>
        <div className="motives-grid">
          <div className="motive-card">
            <h3>Community Service</h3>
            <p>Engaging students in meaningful community service that meets local needs while developing their academic skills and civic responsibility.</p>
          </div>
          <div className="motive-card">
            <h3>Personality Development</h3>
            <p>Building character, leadership qualities, and social consciousness among students through direct community participation.</p>
          </div>
          <div className="motive-card">
            <h3>Social Awareness</h3>
            <p>Creating awareness about various social issues and working towards sustainable solutions through student involvement.</p>
          </div>
        </div>
      </section>

      <section className="units-section">
        <h2>Our Units</h2>
        <div className="units-grid">
          <div className="unit-card">
            <h3>Unit 1: Environmental Conservation</h3>
            <p>Focuses on environmental protection, plantation drives, and waste management initiatives.</p>
          </div>
          <div className="unit-card">
            <h3>Unit 2: Health & Hygiene</h3>
            <p>Conducts health camps, awareness programs, and promotes cleanliness in surrounding areas.</p>
          </div>
          <div className="unit-card">
            <h3>Unit 3: Social Development</h3>
            <p>Works on literacy programs, skill development, and community outreach activities.</p>
          </div>
        </div>
      </section>

      <section className="location-section">
        <h2>Find Us Here</h2>
        <div className="map-container">
          <iframe 
            title="SSN Engineering College Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.4033999368163!2d79.96639347451787!3d15.538188289182442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4b026eef1be0c1%3A0xf89c82c5cc0ea968!2sSsn%20Engineering%20College!5e0!3m2!1sen!2sin!4v1703830058149!5m2!1sen!2sin"
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>📍 RGUKT-Ongole, Ongole, Prakasam District, Andhra Pradesh - 523001</p>
          <p>📧 nss@ssnengg.ac.in</p>
        </div>
      </section>
    </div>
  )
}

export default Aboutus
