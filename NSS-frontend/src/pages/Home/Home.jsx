import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import LeaderCard from '../../components/LeaderCard/LeaderCard'







const Home = () => {
  return (
    <div className='home'>
      <Header />

      <div className="home-info" style={{padding:"20px",backgroundColor:"#F0E6D2"}}>
      <div className="campus" style={{padding:"20px"}} >
        <h1 style={{textAlign:'center',color:'maroon',textDecoration:"underline  2px #FFD700",textShadow:"2px 2px 2px rgba(191, 66, 66, 0.5)"}}>Our Campus:RGUKT</h1>
        <p style={{lineHeight:"1.5"}}>RGUKT was established in 2008 by the Government of Andhra Pradesh. The campus is located in the town of Ongole, Praksam District, Andhra Pradesh. The campus has a well-equipped library, labs, and classrooms.The campus fosters talent in various areas. In addition to academics, the campus also encourages students to participate in extracurricular activities. These activities include sports, cultural events, and technical events along with these <strong style={{fontSize:"16pt",textDecoration:"underline dotted blue"}}>National Service Scheme</strong> is a part of it. This program encourages students to indulge the feeling <i style={{color:"red",fontSize:"18px"}}>"Not ME But YOU"</i> which helps in the process of building better society. visit <a href="https://www.rguktong.ac.in/" target="_blank" rel="noopener noreferrer"> 
  Visit RGUKT
</a> to know more about the campus.

        </p>
      </div>
      <div className="nss-info">
        <h1 style={{textAlign:"center"}}>About NSS</h1>
        <p style={{lineHeight:"1.5"}}><strong>National Service Scheme </strong>(NSS) is a Central Sector Scheme of Government of India, <b>Ministry of Youth Affairs & Sports</b>. It provides an opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level of India to take part in various government led community service activities & programs.The sole aim of the
        NSS is to provide hands-on experience to young students in delivering community service. Since inception of the NSS in the year 1969, the number of students strength increased from 40,000 to over 3.8 million up to the end of March 2018 students in various universities, colleges and Institutions of higher learning have volunteered to take part in various community service programs.
        visit <a href='https://www.nss.gov.in' target="_blank" rel="noopener noreferrer">NSS</a> to know more about NSS.
        </p>
      </div>
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

      </div>
    </div>
  )
}

export default Home
