import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './PhotoshootBooking.css';
import img from './pics/Photographer.webp';

const { TextArea } = Input;
const { Option } = Select;

// Define package prices
const servicePrices = {
  basic: 5000,
  standard: 10000,
  premium: 20000,
};

const serviceTitles = {
  basic: 'Basic - 2 Hours',
  standard: 'Standard - 4 Hours + Edited Album',
  premium: 'Premium - Full Day + Video Coverage',
};

const PhotoshootBooking = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedServiceKey, setSelectedServiceKey] = useState('');
  const [price, setPrice] = useState(null);

  const handleServiceChange = (value) => {
    setSelectedServiceKey(value);
    setPrice(servicePrices[value]);
  };

  const onFinish = (values) => {
    if (!selectedServiceKey) {
      message.error('Please select a photography package');
      return;
    }

    const appointmentData = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      date: values.date.format('YYYY-MM-DD'),
      time: values.date.format('HH:mm'), // You may need a separate time picker if needed
      service: serviceTitles[selectedServiceKey],
      price: price,
      type:"photoshoot",
    };

    try {
      message.success(`Successfully booked: ${serviceTitles[selectedServiceKey]}`);
      form.resetFields();
      navigate('/payment', { state: { appointmentData } });
    } catch (error) {
      console.error('Error:', error);
      message.error('Booking/payment failed.');
    }
  };

  return (
    <>
      <h1 className="booking-main-heading">Wedding Photoshoot Booking</h1>
      <div className="photoshoot-container">
        <div className="booking-left">
          <img src={img} alt="Wedding photoshoot" className="booking-image" />
          <h2>Your Perfect Wedding Memories</h2>
          <p>
            Book a professional photographer to capture every magical moment on your special day. Choose your package,
            set your date, and relax — we’ll take care of the rest.
          </p>
        </div>

        <div className="booking-right">
          <h2>Book a Photographer</h2>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: 'Enter a valid phone number',
                },
              ]}
            >
              <Input placeholder="9876543210" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <TextArea rows={2} placeholder="Street, City, ZIP code" />
            </Form.Item>

            <Form.Item
              label="Event Date"
              name="date"
              rules={[{ required: true, message: 'Please choose your event date' }]}
            >
              <DatePicker style={{ width: '100%' }} showTime />
            </Form.Item>

            <Form.Item
              label="Photography Package"
              name="package"
              rules={[{ required: true, message: 'Please select a package' }]}
            >
              <Select placeholder="Select a package" onChange={handleServiceChange}>
                <Option value="basic">{serviceTitles.basic}</Option>
                <Option value="standard">{serviceTitles.standard}</Option>
                <Option value="premium">{serviceTitles.premium}</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Additional Notes" name="notes">
              <TextArea rows={4} placeholder="Any special requests..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Book Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PhotoshootBooking;
