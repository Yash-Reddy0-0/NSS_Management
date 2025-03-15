import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogin, setShowLogin]=useState(false);
  const [isLoggedin, setIsLoggedin]=useState(false);
  const [userEmail, setUserEmail]=useState('');


  useEffect(()=>{
    const updateAuthState=()=>{
    const token=localStorage.getItem('token');
    const email=localStorage.getItem('userEmail');
    if(token && email){
      setIsLoggedin(true);
      setUserEmail(email);
    }
    updateAuthState();
    window.addEventListener('storage',updateAuthState);
    return ()=>{
      window.removeEventListener('storage',updateAuthState);
    }
  }},[]);

  const handleLoginSuccess=(email)=>{
    setIsLoggedin(true);
    setUserEmail(email);
    setShowLogin(false);
  };

  const handleLogout=()=>{
    setIsLoggedin(false);
    setUserEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('storage'));

    navigate('/')
  }


  return (
    <>
    {showLogin && <Login onClose={()=>setShowLogin(false)} onLoginSuccess={handleLoginSuccess}/>}
    <div className={`navbar ${showLogin ? "blurred" : ""}`}>
        <div className="navbar-left">
                <img src={assets.rguktlogo} alt="rguktlogo" className="navbar-logo"/>
                <h2 className="logo-text">RGUKT-NSS</h2>
        </div>
        <ul className="navbar-menu">
          <li className={location.pathname==='/'        ?"active":""}onClick={()=>navigate("/")}>Home</li>
          <li className={location.pathname==='/programs'?"active":""}onClick={()=>navigate("/programs")}>Programs</li>
          <li className={location.pathname==='/gallery' ?"active":""}onClick={()=>navigate("/gallery")}>Gallery</li>
          <li className={location.pathname==='/members' ?"active":""}onClick={()=>navigate("/members")}>Members</li>
          <li className={location.pathname==='/aboutus' ?"active":""}onClick={()=>navigate("/aboutus")}>About Us</li>
          </ul>

          <div className="navbar-right">
          {isLoggedin ? (
            <div className="profile-section">
              <button className="profile-btn" onClick={() => navigate('/profile')}>👤 Profile</button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="signin" onClick={() => setShowLogin(true)}>Sign In</button>
          )}
        </div>
      
    </div>
    </>
  )
}

export default Navbar;