import '../styles/carousel.css';
import "react-multi-carousel/lib/styles.css";
import React from 'react';
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import BudgetSlider from '../media/Budgeting-slider.png';
import SavingSlider from '../media/Saving-slider.jpeg';
import InvestSlider from '../media/Investing-slider.jpeg';
import SpendingSlider from '../media/Spending-Slider.png';

export default function Carouselslider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
          itemClass="carousel-item-padding-40-px slider-item" // Add this class for custom styling
        >
          <div className='slider-box'>
            <img src={BudgetSlider} alt="Budgeting Game" className='sliderimg'/>
            <Link to="/game/budgeting" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
            <img src={SavingSlider} alt="Saving Money Game" className='sliderimg'/>
            <Link to="/game/saving" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
            <img src={SpendingSlider} alt="Spending Wisely Game" className='sliderimg'/>
            <Link to="/game/spending-wisley" className='hoverbutton'>Play Now</Link>
          </div>
          <div className='slider-box'>
            <img src={InvestSlider} alt="Investing Game" className='sliderimg'/>
            <Link to="/game/investing" className='hoverbutton'>Play Now</Link>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
