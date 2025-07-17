import React, { useEffect, useState } from 'react';
import { Button, Form, message, Card, Divider, Radio, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentPage.css';
import { handleError } from '../utils'; // Ensure handleError is correctly defined

// ✅ Replace this with your real Stripe publishable key
const stripePromise = loadStripe('pk_test_51RKwXl07hPIP3dafjtZGSwSFGTD8DxA7sTZNIVDprPyKpPswmhG1p3sJEXQHP8MPQxEtxpgaJpP7O0fwOecsIG5p00ovkpogIc');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const normalizeAppointmentData = (data) => ({
  name: data?.name || '',
  phone: data?.phone || '',
  service: data?.service || '',
  date: data?.date || '',
  time: data?.time || '',
  price: data?.price || 0,
  address: data?.address || '',
  technician: data?.technician || '', // ✅ FIXED LINE
  specialty: data?.specialty || '', // Optional fallback
  type: data?.type || 'onlineappointment',
});

const PaymentForm = ({ appointmentData }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [qrCodeData, setQrCodeData] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointmentData) {
      const normalized = normalizeAppointmentData(appointmentData);
      setQrCodeData(JSON.stringify(normalized)); // Generate QR code data
    }
  }, [appointmentData]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    if (submitted) return;
    setSubmitted(true);
    setLoading(true);

    try {
      if (paymentMethod === 'qrCode') {
        toast.info('QR Code flow not implemented yet.');
        return;
      }

      if (!stripe || !elements) {
        toast.error('Stripe has not loaded.');
        return;
      }

      const normalizedData = normalizeAppointmentData(appointmentData);

      // Validate required fields
      if (!normalizedData.name || !normalizedData.price || !normalizedData.type) {
        toast.error('Missing appointment information.');
        return;
      }

      // Step 1: Create PaymentIntent
      const res = await axios.post('http://localhost:8080/auth/services/online-appointment', {
        amount: normalizedData.price * 100,
      });

      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        handleError(result.error.message || 'Payment failed.');
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');

        // Step 3: Verify and save appointment
        const verifyPaymentRes = await axios.post(
          'http://localhost:8080/auth/payment/verify',
          {
            paymentIntentId: result.paymentIntent.id,
            appointmentData: normalizedData,
          }
        );

        if (verifyPaymentRes.data.success) {
          navigate('/confirmation', {
            state: {
              appointmentData: normalizedData,
              paymentDetails: {
                method: 'Credit Card',
                transactionId: result.paymentIntent.id,
                status: 'succeeded',
              },
            },
          });
        } else {
          handleError('Payment verification failed.');
        }
      }
    } catch (err) {
      handleError(err.message || 'Payment failed.');
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };

  const normalizedData = normalizeAppointmentData(appointmentData);

  return (
    <Card className="payment-card">
      <Spin spinning={loading}>
        <div>
          <h3>Appointment Details</h3>
          <p><strong>Name:</strong> {normalizedData.name}</p>
          <p><strong>Service:</strong> {normalizedData.service}</p>
          <p><strong>Date:</strong> {normalizedData.date}</p>
          <p><strong>Time:</strong> {normalizedData.time}</p>
          <p><strong>Amount:</strong> ₹{normalizedData.price}</p>
        </div>
        <Divider />
        <Form layout="vertical" onFinish={handlePayment}>
          <h3>Select Payment Method</h3>
          <Form.Item>
            <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
              <Radio value="creditCard">Credit Card</Radio>
              <Radio value="qrCode" disabled>QR Code (Coming Soon)</Radio>
            </Radio.Group>
          </Form.Item>

          {paymentMethod === 'creditCard' && (
            <div className="card-input-wrapper">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
              <p>Enter your card details</p>
            </div>
          )}

          {paymentMethod === 'qrCode' && (
            <div className="qr-code-wrapper">
              <QRCode value={qrCodeData} size={256} />
              <p>Scan this QR code to complete your payment</p>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="payment-button"
              loading={loading || submitted}
              disabled={loading || submitted}
            >
              Confirm Payment
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentData = location.state?.appointmentData;

  useEffect(() => {
    if (!appointmentData) {
      message.error('No appointment data found!');
      navigate('/');
    }
  }, [appointmentData, navigate]);

  if (!appointmentData) return null;

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment</h2>
      <PaymentForm appointmentData={appointmentData} />
      <ToastContainer />
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentWrapper;
