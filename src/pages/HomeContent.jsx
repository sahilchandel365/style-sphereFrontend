import React from 'react';
import './Homecontent.css'; // New CSS file
import img from "../assets/pics/artist3.jpg";
import img1 from "../assets/pics/salon.jpg";
import img2 from "../assets/pics/kit.jpg";
import img3 from "../assets/pics/model2.jpg";
import img4 from "../assets/pics/facial.jpg";


const HomePageContent = () => {
  return (
    <>
      <section className="homepage-content">
        <div className="intro-section">
          <div className="intro-text">
            <h2>Your Beauty, Our Passion</h2>
            <p>
              At <strong>Style Sphere</strong>, we believe everyone deserves to look and feel their best.
              Whether it’s a big day, a special event, or self-care time, our professionals bring salon
              expertise to your screen or doorstep.
            </p>
            <a href="/services/online-appointment" className="cta-button">Book Your Appointment</a>
          </div>
          <div className="intro-image">
            <img src= {img} alt="Beauty intro" />
          </div>
        </div>
         <div className="cta-banner">
          <h2>Ready to Transform Your Style?</h2>
          <p>Join Style Sphere and experience the future of personalized beauty.</p>
          <a href="/services/online-appointment" className="cta-button large">Get Started</a>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <img src={img1} alt="Online Appointments" />
            <h3>Online Appointments</h3>
            <p>Book expert stylists and makeup artists online at your convenience.</p>
          </div>
          <div className="feature-card">
            <img src={img3} alt="Bridal Services" />
            <h3>Bridal Services</h3>
            <p>From engagement to wedding day, get the perfect look with tailored bridal packages.</p>
          </div>
          <div className="feature-card">
            <img src={img4} alt="Skincare and Haircare" />
            <h3>Skincare & Haircare</h3>
            <p>Discover routines and consultations approved by professionals—at home!</p>
          </div>
          
          <div className="feature-card">
            <img src={img2} alt="Beauty Store" />
            <h3>Beauty Store</h3>
            <p>Shop from a curated selection of premium beauty and haircare products.</p>
          </div>
        </div>

       
      </section>
    
    </>
  );
};

export default HomePageContent;
