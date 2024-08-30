import '../styles/carousel.css'
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom"
import money from '../media/2.png'
import growth from '../media/3.png'

export default function Carouselslider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div className='slider'>
      <div className='slider-container'>
        <Carousel
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
          <div className='slider-box'>
            <img src={money} alt="crochet rapunzel" className='sliderimg'/>
            <Link to="/shop" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
          <img src={growth} alt="crochet jasmine" className='sliderimg'/>
          <Link to="/" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
            <img src={money} alt="crochet rapunzel" className='sliderimg'/>
            <Link to="/shop" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
          <img src={growth} alt="crochet jasmine" className='sliderimg'/>
          <Link to="/" className='hoverbutton'>Play Now</Link>
          </div>
          
        </Carousel>
      </div>
    </div>
  )
}