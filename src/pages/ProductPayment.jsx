import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  message,
  Card,
  Divider,
  Radio,
  Spin,
} from 'antd';
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
import { handleError } from '../utils';

// ✅ Replace this with your real Stripe publishable key
const stripePromise = loadStripe('pk_test_51RKwXl07hPIP3dafjtZGSwSFGTD8DxA7sTZNIVDprPyKpPswmhG1p3sJEXQHP8MPQxEtxpgaJpP7O0fwOecsIG5p00ovkpogIc');

// Card element styling
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

// 🔧 Normalize appointment data for both product and service
const normalizeAppointmentData = (data) => {
  if (!data) return {};

  if (data.type === 'product') {
    return {
      items: data.items || [],
      user: data.user || {},
      totalAmount: data.totalAmount || 0,
      type: 'product',
      date: data.date || '',
    };
  }

  return {
    name: data?.name || '',
    phone: data?.phone || '',
    service: data?.service || '',
    date: data?.date || '',
    time: data?.time || '',
    price: data?.price || 0,
    address: data?.address || '',
    quantity: data?.quantity || '',
    type: data?.type || '',
  };
};

// PaymentForm Component
const PaymentForm = ({ appointmentData }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [qrCodeData, setQrCodeData] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const normalizedData = normalizeAppointmentData(appointmentData);

  useEffect(() => {
    if (appointmentData) {
      setQrCodeData(JSON.stringify(normalizedData));
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
      if (!stripe || !elements) {
        toast.error('Stripe has not loaded.');
        return;
      }

      let amount = 0;

      if (normalizedData.type === 'product') {
        amount = parseFloat(normalizedData.totalAmount);
      } else {
        amount = parseFloat(normalizedData.price);
      }

      if (!amount || isNaN(amount)) {
        toast.error('Invalid payment amount.');
        return;
      }

      // Step 1: Create PaymentIntent
      const res = await axios.post(
        'http://localhost:8080/auth/services/online-appointment',
        {
          amount: amount * 100, // in paise
        }
      );

      const clientSecret = res.data.clientSecret;
const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // Step 2: Confirm card payment
     

      if (result.error) {
        handleError(result.error.message || 'Payment failed.');
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');

        // Step 3: Verify and save appointment or order
        const verifyRes = await axios.post(
          'http://localhost:8080/auth/payment/verify',
          {
            paymentIntentId: result.paymentIntent.id,
            appointmentData: normalizedData,
          }
        );

        if (verifyRes.data.success) {
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

  return (
    <Card className="payment-card">
      <Spin spinning={loading}>
        <div>
          <h3>
            {normalizedData.type === 'product'
              ? 'Order Summary'
              : 'Appointment Details'}
          </h3>

          {normalizedData.type === 'product' ? (
            <>
              <p><strong>Name:</strong> {normalizedData.user.name}</p>
              <p><strong>Address:</strong> {normalizedData.user.address}</p>
              <p><strong>Contact:</strong> {normalizedData.user.contact}</p>
              <ul>
                {normalizedData.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} = ₹{item.total}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{normalizedData.totalAmount}</p>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {normalizedData.name}</p>
              <p><strong>Service:</strong> {normalizedData.service}</p>
              <p><strong>Date:</strong> {normalizedData.date}</p>
              <p><strong>Time:</strong> {normalizedData.time}</p>
              <p><strong>Amount:</strong> ₹{normalizedData.price}</p>
              <p><strong>Quantity:</strong> {normalizedData.quantity}</p>
            </>
          )}
        </div>

        <Divider />
        <Form layout="vertical" onFinish={handlePayment}>
          <h3>Select Payment Method</h3>
          <Form.Item>
            <Radio.Group
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
            >
              <Radio value="creditCard">Credit Card</Radio>
              <Radio value="qrCode" disabled>
                QR Code (Coming Soon)
              </Radio>
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

// Main PaymentPage Component
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

// Stripe Wrapper
const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentWrapper;
