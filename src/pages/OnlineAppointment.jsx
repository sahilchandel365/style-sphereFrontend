import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  message,
} from 'antd';
import axios from 'axios';
import './OnlineAppointment.css';
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import img from "../assets/pics/salonbg.avif";
const { Option } = Select;

const servicePrices = {
  makeup: 800,
  hair: 150,
  bridal: 5000,
  facial: 1000,
  mehendi: 500,
};

const OnlineAppointment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [price, setPrice] = useState(null);

  const onFinish = async (values) => {
    const appointmentData = {
      name: values.name,
      phone: values.phone,
      service: values.service,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      price: servicePrices[values.service],
      type: 'onlineappointment',
    };

    try {
      if (values) {
        navigate('/payment', { state: { appointmentData } });
      } else {
        message.error('Booking failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      handleError('Booking/payment failed.');
    }
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
    setPrice(servicePrices[value]);
  };

  return (
    <div
      className="appointment-background"
      style={{
        
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px 16px',
        }}
        
      
    >
      <div className="appointment-container">
        <h2 className="appointment-title">Book an Appointment</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="appointment-form"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your Name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {
                pattern: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            ]}
          >
            <Input placeholder="e.g. 9876543210" />
          </Form.Item>

          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: 'Please select a service' }]}
          >
            <Select
              placeholder="Select a service"
              onChange={handleServiceChange}
            >
              {Object.entries(servicePrices).map(([key, value]) => (
                <Option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} — ₹{value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {price && (
            <div className="price-display">
              Selected Service Price: ₹{price}
            </div>
          )}

          <Form.Item
            label="Preferred Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Preferred Time"
            name="time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="appointment-button"
            >
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OnlineAppointment;
