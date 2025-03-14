import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogin, setShowLogin]=useState(false);


  return (
    <>
    {showLogin && <Login onClose={()=>setShowLogin(false)}/>}
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
          <button className='signin' onClick={()=> setShowLogin(true)}>Sign in</button></div>  
        
      
    </div>
    </>
  )
}

export default Navbar;