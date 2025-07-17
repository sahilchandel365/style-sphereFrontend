import React from 'react';
import './Footer.css';
import { FacebookFilled, InstagramFilled, PhoneFilled, MailFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h3>Glow & Go Salon</h3>
          <p>Your beauty destination for hair, nails, skincare & more. Book online, look fabulous.</p>
        </div>

        <div className="footer-links">
          <Link to="/contact">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/services/online-appointment">Book Appointment</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <p><PhoneFilled /> +1 (800) 123-4567</p>
          <p><MailFilled /> support@glowgosalon.com</p>
        </div>

        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookFilled /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramFilled /></a>
        </div>
        
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Glow & Go Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
