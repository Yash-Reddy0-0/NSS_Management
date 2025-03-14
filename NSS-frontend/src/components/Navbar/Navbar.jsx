import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'

import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
        <div className="navbar-left">
                <img src={assets.rguktlogo} alt="rguktlogo" className="navbar-logo"/>
                <h2 className="logo-text">RGUKT-NSS</h2>
        </div>
        <ul className="navbar-menu">
          <li onClick={()=>navigate("/")}>Home</li>
          <li onClick={()=>navigate("/programs")}>Programs</li>
          <li onClick={()=>navigate("/gallery")}>Gallery</li>
          <li onClick={()=>navigate("/members")}>Members</li>
          <li onClick={()=>navigate("/aboutus")}>About Us</li>
          </ul>

        <div className="navbar-right">
          <button className='signin'>Sign in</button></div>  
        
      
    </div>
  )
}

export default Navbar
