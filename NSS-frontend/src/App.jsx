import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Aboutus from './pages/AboutUs/Aboutus'
import { Routes,Route } from 'react-router-dom'
import Members from './pages/Members/Members'
import Gallery from './pages/Gallery/Gallery'
import Programs from './pages/Programs/Programs'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile/Profile'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/programs" element={<Programs/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/profile" element={<Profile/>}/>



      </Routes>
      <Footer/>
    </div>
  )
}

export default App
