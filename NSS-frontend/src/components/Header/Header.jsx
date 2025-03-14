import React, { useEffect, useState } from 'react';
import { assets } from "../../assets/assets";
import './Header.css';
import { useNavigate } from 'react-router-dom';
// setting an array of images with details for animation
const headers = [
    {
      image: assets.nss,
      title: "Welcome to NSS RGUKT-Ongole",
      description: "Serving our community with dedication. Join us in making a difference through social service and volunteering.",
      position: { bottom: '20%', left: '5vw' },
      font:{
       titleFontSize:'3vw',
       titleFontWeight:'700',
       titleColor:'black',
       descriptionFontSize:'1.5vw',
       descriptionFontWeight:'500',
      }
    },
    {
      image: assets.rguktlogo,
      title: "Community Service",
      description: "Engaging in various community service activities to help those in need and create positive change in our society.",
      position: { bottom: '20%', left: '2vw' },
      font: {
        titleFontSize:'3vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      },
      style:{
        align:'right'

      }
    },
    {
      image: assets.nss,
      title: "Blood Donation Camps",
      description: "Organizing regular blood donation camps to support healthcare initiatives and save lives in our community.",
      position: { bottom: '12%', left: '7vw' },
      font: {
        titleFontSize:'4vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      }
    },
    {
      image: assets.rguktlogo,
      title: "Environmental Awareness",
      description: "Leading initiatives for environmental protection through plantation drives and awareness campaigns.",
      position: { bottom: '20%', left: '14vw' },
      font: {
        titleFontSize:'3vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      }
    },
    {
      image: assets.nss,
      title: "Health Camps",
      description: "Conducting health awareness camps and medical checkups for the benefit of our local community.",
      position: { bottom: '18%', left: '6vw' },
      font: {
        titleFontSize:'3vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      }
    },
    {
      image: assets.rguktlogo,
      title: "Educational Outreach",
      description: "Supporting educational initiatives and conducting workshops for underprivileged students.",
      position: { bottom: '14%', left: '6vw' },
      font: {
        titleFontSize:'3vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      }
    },
    {
      image: "/t8.jpg",
      title: "Special Camps",
      description: "Organizing special camps focusing on rural development and community welfare programs.",
      position: { bottom: '20%', left: '8vw' },
      font: {
        titleFontSize:'3vw',
        titleFontWeight:'700',
        titleColor:'black',
        descriptionFontSize:'1.5vw',
        descriptionFontWeight:'500',
      }
    }
  ];

const Header = () => {
    const navigate=useNavigate();
  const [currImageIndex, setCurrImageIndex] = useState(0);  //setting the index for the header images to changes for every predifined intervel
  const [fadeIn, setFadeIn] = useState(true);   //image transition effect
 //transition between images with fadein 
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Start fading out
      setTimeout(() => {
        setCurrImageIndex((prevIndex) => (prevIndex + 1) % headers.length);
        setFadeIn(true); // Start fading in
      }, 500); // Match this duration with CSS transition time
    }, 10000); // Time between image changes

    return () => clearInterval(interval);
  }, []);

  const { image, title, description, position, font } = headers[currImageIndex];

  return (
    <div className='header'>
      <div className={`transition-background ${fadeIn ? 'fade-in' : 'fade-out'}`} style={{ backgroundImage: `url('/back.png')` }}></div>
      <div className={`header-background ${fadeIn ? 'fade-in' : 'fade-out'}`} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={`header-contents ${fadeIn ? 'fade-in' : 'fade-out'}`} style={position}>
        <h2 style={{ fontSize: font.titleFontSize, color: font.titleColor, fontWeight: font.titleFontWeight }}>{title}</h2>
        <p style={{ fontSize: font.descriptionFontSize, fontWeight: font.descriptionFontWeight }}>{description}</p>
        <button onClick={()=>navigate('/programs')}>View Progams</button>
      </div>
    </div>
  );
}

export default Header;
