import React, { useState } from 'react';
import './Faq.css'; // Import the CSS file for styling

const FAQ = () => {
  // State to toggle answer visibility for each question
  const [activeIndex, setActiveIndex] = useState(null);

  // Sample FAQ data
  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a variety of services including bridal makeup, party makeup, and professional makeup for photoshoots, etc.',
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment directly through our website or by calling us at the provided contact number.',
    },
    {
      question: 'What is the pricing for your services?',
      answer: 'Pricing varies depending on the service and location. Please contact us for a custom quote.',
    },
    {
      question: 'Do you offer trial makeup before the wedding?',
      answer: 'Yes, we offer a trial makeup session to ensure you are satisfied with your look before your big day.',
    },
    {
      question: 'Do you travel to the wedding location?',
      answer: 'Yes, we offer travel to your wedding location for an additional fee depending on distance.',
    },
  ];

  // Function to toggle answer visibility
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
              <span className="toggle-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
