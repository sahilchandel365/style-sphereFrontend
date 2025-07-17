// src/pages/Confirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import './Confirmation.css'; // Optional: For styling

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointmentData = location.state?.appointmentData;
  const paymentDetails = location.state?.paymentDetails;

  if (!appointmentData || !paymentDetails) {
    message.error('Missing confirmation data!');
    navigate('/');
    return null;
  }

  return (
    <div className="confirmation-container">
      <Card className="confirmation-card">
        <h2>✅ Payment Successful</h2>
        <p><strong>Name:</strong> {appointmentData.name || appointmentData.user?.name}</p>
        <p><strong>Service:</strong> {appointmentData.service || 'Product Purchase'}</p>
        <p><strong>Date:</strong> {appointmentData.date}</p>
        <p><strong>Amount Paid:</strong> ₹{appointmentData.price || appointmentData.totalAmount}</p>
        <p><strong>Payment Method:</strong> {paymentDetails.method}</p>
        <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
        <p><strong>Status:</strong> {paymentDetails.status}</p>
        <Button type="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

export default Confirmation;
