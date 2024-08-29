import React from 'react'
import Video from '../components/Hero'
import '../styles/home.css'
import {Link} from "react-router-dom"
import money from '../media/2.png'
import growth from '../media/3.png'

export default function Home() {
  return (
    <div>
      <Video/>
      <div className='main-container'>
      <img src={money} className='money'></img>
        <div className='main-paragraph'>
        <h1 style={{fontSize: '50px', fontFamily: 'Didact Gothic'}}>Who are we?</h1>
        <p style={{fontSize: '23px', fontFamily: 'Didact Gothic'}}>Prospera is designed to equip young learners with essential money management skills and knowledge. We offer interactive lessons and activities tailored to pre-teens' learning styles and developmental needs. Prospera cover topics such as budgeting, saving, responsible spending, and basic investing concepts in an engaging and accessible manner. By incorporating real-life scenarios and relatable examples, these resources help bridge the gap between classroom learning and practical financial decision-making. </p>
        <div><Link to="/About"><button className="learn-more">LEARN MORE</button></Link></div>
        </div>
        <img src={growth} className='money'></img>
      </div>
      <div className='activities-cont'>
       <h1 className='activities'>Activities</h1>
      </div>

    </div>
  )
}
