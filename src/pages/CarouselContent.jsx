import React from 'react';
import { Carousel, Button, message } from 'antd';
import './CarouselContent.css';
import { useNavigate } from 'react-router-dom';

import img from '../assets/pics/img.jpg';
import img1 from '../assets/pics/img1.avif';
import img2 from '../assets/pics/bride.webp';
import img3 from '../assets/pics/mask.avif';
import img4 from '../assets/pics/model3.jpg';
import { handleError } from '../utils';

const slides = [
  {
    title: 'Book Your Style Anytime',
    description: 'Our expert stylists are just a click away. Book your appointment online with ease!',
    image: img,
    buttonLink: '/services/online-appointment',
  },
  {
    title: 'Bridal Makeup',
    description: 'Custom makeup tailored to your style for your big day.',
    image: img2,
    buttonLink: '/services/bridal',
  },
  {
    title: 'Skin Care at Home',
    description: 'Dermatologist-approved skin care routines at home.',
    image: img3,
    buttonLink: '/skincare',
  },
  {
    title: 'Exclusive Hair Treatments',
    description: 'Revitalize your hair with our signature online treatments.',
    image: img1,
    buttonLink: '/services/online-appointment',
  },
  {
    title: 'Flawless Beauty on Your Big Day',
    description: 'Book makeup artists for your wedding, shoot, or special events.',
    image: img4,
    buttonLink: '/services/bridal',
  },
];

const CarouselContent = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleButtonClick = (link) => {
    if (isAuthenticated) {
      navigate(link);
    } else {
      handleError('please Login to access services');
      message.warning('Please login to access this service.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="carousel-main-container">
      <div className="carousel-left">
        <h2>Welcome to Style Sphere</h2>
        <p>
          Style Sphere is your all-in-one beauty destination where professional
          salon services meet digital convenience. We bring expert makeup
          artists, hair stylists, and skin care consultants to your screen.
        </p>
        <ul>
          <li>💄 Online Salon Appointments</li>
          <li>👰 Bridal & Special Occasion Styling</li>
          <li>🧴 Personalized Skin & Hair Care</li>
          <li>🛍️ Premium Product Store</li>
        </ul>
        <p>
          Whether you're prepping for your big day or just treating yourself,
          we're here to help you look and feel your best — anytime, anywhere.
        </p>
      </div>

      <div className="carousel-right">
        <Carousel autoplay>
          {slides.map((slide, index) => (
            <div key={index}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="carousel-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <Button
                    type="primary"
                    onClick={() => handleButtonClick(slide.buttonLink)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselContent;
