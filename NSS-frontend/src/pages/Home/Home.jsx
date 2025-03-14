import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
const Home = () => {
  return (
    <div className='home'>
      <Header />

      <div className="home-info">
      <div className="campus" style={{padding:"20px"}}>
        <h1>Our Campus:RGUKT</h1>
        <p style={{lineHeight:"1.5"}}>RGUKT was established in 2008 by the Government of Andhra Pradesh. The campus is located in the town of Ongole, Praksam District, Andhra Pradesh. The campus has a well-equipped library, labs, and classrooms.The campus fosters talent in various areas. In addition to academics, the campus also encourages students to participate in extracurricular activities. These activities include sports, cultural events, and technical events along with these <strong style={{fontSize:"16pt",textDecoration:"underline dotted blue"}}>National Service Scheme</strong> is a part of it. This program encourages students to indulge the feeling <i style={{color:"red",fontSize:"18px"}}>"Not ME But YOU"</i> which helps in the process of building better society
        </p>
      </div>
      <div className="nss-info">
        <h1>About NSS</h1>
        <p style={{lineHeight:"1.5"}}>National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides an opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level of India to take part in various government led community service activities & programs.The sole aim of the
        NSS is to provide hands-on experience to young students in delivering community service. Since inception of the NSS in the year 1969, the number of students strength increased from 40,000 to over 3.8 million up to the end of March 2018 students in various universities, colleges and Institutions of higher learning have volunteered to take part in various community service programs.
        </p>
      </div>
      </div>
    </div>
  )
}

export default Home
