import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  CalendarOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../../utils';
import './Nav.css';
import logo from "../pics/logo.png";

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const [loggedINUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setLoggedInUser(name || '');
  }, [location]);

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      setLoggedInUser('');
      handleSuccess('Logout successful');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  const servicesMenu = {
    key: 'services',
    icon: <AppstoreOutlined />,
    label: 'Services',
    children: [
      {
        key: 'online-appointment',
        icon: <CalendarOutlined />,
        label: <Link to="/services/online-appointment">Online Appointment</Link>,
      },
      {
        key: 'bridal-services',
        icon: <SkinOutlined />,
        label: <Link to="/services/bridal">Bridal Services</Link>,
      },
      {
        key: 'wedding-photoshoots',
        icon: <CameraOutlined />,
        label: <Link to="/services/photoshoot">Wedding Photoshoots</Link>,
      },
      {
        key: 'book-artist',
        icon: <TeamOutlined />,
        label: <Link to="/services/book-artist">Book Salon Artist</Link>,
      },
    ],
  };

  const menuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/contact">Contact Us</Link>,
      key: 'contact',
      icon: <MailOutlined />,
    },
    ...(loggedINUser
      ? [
          servicesMenu,
          {
            label: `Welcome ${loggedINUser}`,
            key: 'user',
            icon: <UserOutlined />,
          },
          {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
          },
        ]
      : [
          {
            label: <Link to="/login">Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
          },
          {
            label: <Link to="/signup">Signup</Link>,
            key: 'signup',
            icon: <UserAddOutlined />,
          },
        ]),
  ];

  return (
    <div className="nav-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="text-container">
          <h1 className="website-title">STYLE SPHERE</h1>
          <p className="tagline">A Global Destination for Style and Beauty</p>
        </div>
      </div>

      <div className="nav-container">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
          id="nav"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Navbar;
