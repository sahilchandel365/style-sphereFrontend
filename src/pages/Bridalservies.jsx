import React, { useState } from 'react';
import { Modal, Button, Form, Input, Card, Row, Col, message, DatePicker, TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import './BridalBooking.css';

import img from "./pics/bride3.webp";
import img1 from "./pics/mahndi2.webp";
import img2 from "./pics/haircut.jpg";
const { TextArea } = Input;
const servicePrices = {
  'Bridal Makeup': 5000,
  'Mehndi Design': 3000,
  'Bridal Hairstyling': 4000
};

const services = [
  {
    id: 1,
    title: 'Bridal Makeup',
    description: 'Flawless bridal makeup by professionals.',
    image: img
  },
  {
    id: 2,
    title: 'Mehndi Design',
    description: 'Intricate mehndi designs for your special day.',
    image: img1,
  },
  {
    id: 3,
    title: 'Bridal Hairstyling',
    description: 'Elegant bridal hairstyles for every culture.',
    image: img2,
  },
];

const BridalBooking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [price, setPrice] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = (service) => {
    setSelectedService(service);
    setPrice(servicePrices[service.title]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const appointmentData = {
      name: values.name,
      phone: values.phone,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      service: selectedService.title,
      price: price,
      address:values.address,
      type:"bridal",
    };
    

    try {
      message.success(`Successfully booked: ${selectedService.title}`);
      setIsModalVisible(false);
      form.resetFields();
      navigate('/payment', { state: { appointmentData } });
    } catch (error) {
      console.error('Error:', error);
      message.error('Booking/payment failed.');
    }
  };

  return (
    <div className="bridal-container">
      <h1 className="title">Book Bridal Services</h1>
      <Row gutter={[16, 16]}>
        {services.map((service) => (
          <Col xs={24} sm={12} md={8} key={service.id}>
            <Card
              hoverable
              cover={<img alt={service.title} src={service.image} className="service-img" />}
            >
              <Card.Meta title={service.title} description={service.description} />
              <Button type="primary" onClick={() => showModal(service)} block style={{ marginTop: 10 }}>
                Book Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={`Book: ${selectedService?.title}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
      <Form
  form={form}
  layout="vertical"
  name="bookingForm"
  onFinish={onFinish}
>
  <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
    <Input />
  </Form.Item>

  <Form.Item
    name="phone"
    label="Mobile Number"
    rules={[
      { required: true, message: 'Please enter your mobile number' },
      {
        pattern: /^\d{10}$/,
        message: 'Mobile number must be 10 digits',
      },
    ]}
  >
    <Input />
  </Form.Item>
    <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <TextArea rows={2} placeholder="Street, City, ZIP code" />
            </Form.Item>
  
  <Form.Item name="date" label="Preferred Date" rules={[{ required: true }]}>
    <DatePicker style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item name="time" label="Preferred Time" rules={[{ required: true }]}>
    <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
  </Form.Item>

  {price && (
    <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
      Selected Service Price: ₹{price}
    </div>
  )}

  <Form.Item>
    <Button type="primary" htmlType="submit" block>
      Confirm Booking
    </Button>
  </Form.Item>
</Form>

      </Modal>
    </div>
  );
};

export default BridalBooking;
