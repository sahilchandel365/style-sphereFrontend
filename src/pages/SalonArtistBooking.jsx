import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Button, Row, Col, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './SalonArtistBooking.css';
import img from '../assets/pics/artist.webp';
import img1 from '../assets/pics/artist3.avif';
import img2 from '../assets/pics/artist2.webp';

const { TextArea } = Input;

const artists = [
  {
    id: 1,
    name: 'sapna bhavnani',
    specialty: 'Bridal Makeup',
    image: img,
    description: 'Specialized in HD bridal makeup with 5+ years of experience.',
    price: 2500,
  },
  {
    id: 2,
    name: 'stlvie rodgers',
    specialty: 'Party Makeup',
    image: img1,
    description: 'Trendy and modern looks for any occasion.',
    price: 1800,
  },
  {
    id: 3,
    name: 'jawed habib',
    specialty: 'Hair Styling',
    image: img2,
    description: 'Elegant hairdos, curls, and braids to enhance your style.',
    price: 1500,
  },
];

const SalonArtistBooking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = (artist) => {
    setSelectedArtist(artist);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const appointmentData = {
      name: values.name,
      phone: values.phone,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      address: values.address,
      artist: selectedArtist.name,
      specialty: selectedArtist.specialty,
      price: selectedArtist.price,
      type: "artist",
      service:"artist-booking",
    };

    message.success(`Successfully booked: ${selectedArtist.name}`);
    setIsModalVisible(false);
    form.resetFields();
    navigate('/payment', { state: { appointmentData } });;
  };

  return (
    <div className="booking-container">
      <h1 className="title">Book a Salon Artist</h1>
      <Row gutter={[16, 16]}>
        {artists.map((artist) => (
          <Col xs={24} sm={12} md={8} key={artist.id}>
            <Card
              hoverable
              cover={<img alt={artist.name} src={artist.image} className="service-img" />}
            >
              <Card.Meta title={artist.name} description={artist.description} />
              <Button type="primary" onClick={() => showModal(artist)} block style={{ marginTop: 10 }}>
                Book Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={`Book: ${selectedArtist?.name}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please enter your mobile number' },
              { pattern: /^\d{10}$/, message: 'Mobile number must be 10 digits' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
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

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
            Selected Service Price: ₹{selectedArtist?.price}
          </div>

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

export default SalonArtistBooking;
