import React from 'react'
import '../styles/about.css'
import expectations from '../media/expect.jpeg'
import Accordion from '../components/Accordian';


export default function About() {
  const accordianData =  [
    {
      title: 'How can I support my child’s learning on this website?',
      content: `Encourage your child to explore the website regularly and discuss what they learn with you. You can also use the resources provided on the site, such as family budgeting tools or savings challenges, to reinforce their learning at home.`
    },
    {
      title: 'Is there a cost associated with using the website?',
      content: `Our website offers a range of free resources. However, some advanced features or premium content may require a subscription or one-time fee. We aim to provide valuable content accessible to all users.`
    },
    {
      title: 'How can I help my child apply what they learn in real life?',
      content: `Discuss financial concepts with your child regularly and involve them in real-life financial decisions, such as budgeting for family expenses or planning savings goals. Practical experience reinforces what they learn online.`
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
