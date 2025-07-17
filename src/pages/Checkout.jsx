import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
  });

  // Calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0).toFixed(2);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const orderData = { ...values, cartItems, total: calculateTotal() };

    try {
      const response = await fetch('http://localhost:8080/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        message.success('Order placed successfully!');
      } else {
        message.error('Error placing order. Please try again.');
      }
    } catch (error) {
      message.error('Error placing order. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <Form onFinish={handleSubmit} className="checkout-form">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address!' }]}
        >
          <Input
            value={formData.address}
            onChange={handleInputChange}
            name="address"
            placeholder="Enter your address"
          />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact"
          rules={[{ required: true, message: 'Please enter your contact number!' }]}
        >
          <Input
            value={formData.contact}
            onChange={handleInputChange}
            name="contact"
            placeholder="Enter your contact number"
          />
        </Form.Item>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} x{item.selectedQuantity} - ${(item.price * item.selectedQuantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total: ${calculateTotal()}</strong></p>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="checkout-btn">
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Checkout;
