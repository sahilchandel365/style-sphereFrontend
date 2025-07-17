import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-header">About Us</h1>
      <p className="contact-text">
        Welcome to <span className="contact-highlight">Style Sphere</span>, your go-to destination for all things beauty and style! Our platform offers a seamless experience for booking bridal services, wedding photographers, and top-tier salon artists.
      </p>
      <p className="contact-text">
        Whether you're preparing for a special day or simply want to refresh your look, we connect you with the best professionals to make sure you look and feel amazing.
      </p>

      <h2 className="contact-subheader">Our Services</h2>
      <ul className="contact-service-list">
        <li className="contact-list-item">
          <span className="contact-highlight">Bridal Services:</span> Comprehensive makeup and styling services for brides and bridal parties.
        </li>
        <li className="contact-list-item">
          <span className="contact-highlight">Wedding Photography:</span> Capture your most beautiful moments with our professional photographers.
        </li>
        <li className="contact-list-item">
          <span className="contact-highlight">Salon Artists:</span> Book talented makeup artists and hairstylists for your event.
        </li>
      </ul>

      <h1 className="contact-header">Contact Us</h1>
      <p className="contact-text">Email: <span className="contact-highlight">support@stylesphere.com</span></p>
      <p className="contact-text">Phone: <span className="contact-highlight">+1 234 567 8900</span></p>
      <p className="contact-text">Address: <span className="contact-highlight">123 Style Street, Glam City, Fashionland</span></p>
    </div>
  );
};

export default Contact;
