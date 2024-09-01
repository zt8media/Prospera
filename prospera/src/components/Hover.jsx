import React, { useState } from 'react'
import '../styles/hover.css'
import vission from '../media/mission2.jpeg'
import values from '../media/vision.jpeg'
import mission from '../media/mission.png'


export default function Hover() {
    const images = [
        { id: 1, name: 'Our Mission', src: mission,  description: 'At Prospera, our mission is to empower middle school students with the knowledge and skills needed to navigate the world of personal finance confidently. Our goal is to equip young learners with the tools to make informed decisions about money, develop healthy financial habits, and understand the importance of saving, budgeting, and investing. By fostering a foundation of financial understanding early on, we aim to inspire a future generation of financially savvy individuals who are prepared to achieve their dreams and contribute positively to their communities.' },
        { id: 2, name: 'Our Vision', src: vission, description: `Our vision at Prospera is to be the leading platform where middle school students discover the excitement of financial literacy and cultivate lifelong skills for financial success. By fostering curiosity and providing engaging educational experiences, we aspire to inspire a generation of financially savvy individuals who are empowered to achieve their goals and contribute positively to their communities.` },
        { id: 3, name: 'Our Values', src: values, description: `We are committed to upholding the following core values to guide our mission of fostering financial literacy among middle school students:

        Empowerment: We believe in empowering young learners with the knowledge and tools to make informed financial decisions. Our educational resources are designed to build confidence and independence in managing personal finances.

        Engagement: We strive to make financial education engaging and enjoyable through interactive content, games, and relatable scenarios. We aim to spark curiosity and make learning about money an exciting journey.

        Growth: We are dedicated to continuous improvement and innovation in our educational approach. We listen to feedback, adapt our content, and embrace new methods to enhance the learning experience and meet the evolving needs of our users.` },
    ];

    const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div>
        <div className="image-hover-container">
            <div className='about-container'>
                {images.map(image => (
                    <div
                        key={image.id}
                        className="image-item"
                        onMouseEnter={() => setHoveredImage(image)}
                        onMouseLeave={() => setHoveredImage(null)}
                    >
                        <img src={image.src} alt={`${image.name}`} className='about-images'/>
                    </div>
                ))}
            </div>
                {hoveredImage && (
                    <div className="description">
                        {hoveredImage.description}
            </div>
            )}
        </div>
    </div>
  )
}
