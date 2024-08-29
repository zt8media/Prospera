import React from 'react'
import '../styles/about.css'
import expectations from '../media/expect.jpeg'
import Accordion from '../components/Accordian';


export default function About() {
  const accordianData =  [
    {
      title: 'How often do you introduce new collections?',
      content: `We aim to release new collections seasonally, aligning with the changing seasons and customer preferences. As we continue to grow and gather valuable insights from our customers, we may explore more frequent releases to keep our offerings fresh and exciting.`
    },
    {
      title: 'Do you offer international shipping?',
      content: `Yes, we are pleased to offer international shipping to a wide range of countries. Our goal is to make shopping with us accessible worldwide. `
    },
    {
      title: 'Do gift cards expire?',
      content: `Our gift cards do not expire and can be used at any time until the balance is depleted. However, we encourage you to use them soon after receiving them to enjoy the full benefit.`
    }
  ];


  return (
    <>
    <div>
      <h1 className='about-us'>About Us</h1>
      <p>sjhfjfhsjfh</p>
    </div>
    <div className='expectations'>
      <h1 className='about-us'>What you can expect</h1>
      <div className='expect-descript'>
      <div>
        <p>Welcome to Prospera, where learning about money is both fun and exciting! Our lessons are designed to be engaging and easy to follow. From understanding how to save your allowance to learning how to make smart spending choices, we make financial education enjoyable! Join our community of fellow middle schoolers who are also learning about money. Share your experiences, ask questions, and get support from others who are on the same journey as you. Here’s what you can look forward to as you explore our site:
          <ul>
            <li>Fun and Interactive Lessions</li>
            <li>Friendly Advice and Tips</li>
            <li>A Supportive Community</li>
          </ul>

        ... and more!
        </p>
      </div>
        <img src={expectations} className='expect-img'></img>
        </div>
        <p></p>
    </div>
    <div>
      <h1 className='about-us'>FAQs</h1>
      <div id='freq-asked'>
      <div className="accordion">
        {accordianData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
    </div>
    </div>
   
    </>
  )
}
