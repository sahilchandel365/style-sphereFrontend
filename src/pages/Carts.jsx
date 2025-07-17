import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { ToastContainer } from 'react-toastify';
import './Cart.css';
import { handleError } from '../utils';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart items from location state
  const cartItems = location?.state?.cartItems || [];

  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',  // Added email here
  });

  const isAuthenticated = !!localStorage.getItem('token');

  const calculateTotal = () =>
    cartItems
      .reduce(
        (total, item) => total + item.price * item.selectedQuantity,
        0
      )
      .toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToCheckout = () => {
    const { name, address, contact, email } = userInfo;

    // Validate required fields
    if (!name || !address || !contact || !email) {
      message.error('Please fill in all the fields');
      return;
    }

    // Validate contact number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      message.error('Please enter a valid contact number');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    if (!isAuthenticated) {
      handleError('Please login to access services');
      message.warning('Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const appointmentData = {
      user: userInfo,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.selectedQuantity,
        price: item.price,
        total: (item.price * item.selectedQuantity).toFixed(2),
      })),
      totalAmount: calculateTotal(),
      date: new Date().toISOString(),
      type: 'product',
    };

    message.success('Proceeding to payment...');
    navigate('/product/payment', { state: { appointmentData } });
  };

  if (!cartItems.length) {
    return (
      <p className="empty-cart-msg">
        Your cart is empty. Add some items to your cart!
      </p>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🛍️ Style Sphere Cart</h1>
      <p className="cart-subheading">
        Buy premium salon essentials &{' '}
        <span className="highlight">pay always less</span> — because beauty
        should be affordable.
      </p>

      <ul className="cart-item-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <p className="item-name">{item.name}</p>
              <p>Quantity: {item.selectedQuantity}</p>
              <p>Total: ₹{(item.price * item.selectedQuantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-form">
        <h3 className="form-title">Enter your delivery details:</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userInfo.name}
          onChange={handleInputChange}
          className="cart-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={userInfo.address}
          onChange={handleInputChange}
          className="cart-input"
        />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={userInfo.contact}
          onChange={handleInputChange}
          className="cart-input"
        />
        {/* New Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleInputChange}
          className="cart-input"
        />
      </div>

      <div className="cart-total">
        <p>
          <strong>Total Amount: ₹{calculateTotal()}</strong>
        </p>
      </div>

      <button className="checkout-btn" onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </button>

      <ToastContainer />
    </div>
  );
};

export default Cart;
