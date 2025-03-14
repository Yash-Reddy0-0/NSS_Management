import React from 'react'
import './Login.css'
import { useState } from 'react'    
const Login = ({onClose}) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const handleSubmit = async() => {
        console.log("Email:",email);
        console.log("Password:",password);

    }

  return (
    <div className='overlay'>
        <div className="modal">
            <h2>Sign In</h2> 
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
           
            <div className="modalbuttons">
            <button onClick={onClose}>Close</button>
            <button onClick={handleSubmit}>Sign In</button>
            </div>
         </div>
      
    </div>
  )
}

export default Login
