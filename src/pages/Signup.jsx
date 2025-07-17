import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

import { message } from 'antd';
import {ToastContainer} from "react-toastify"
import './Signup.css'; // Import the CSS
import { handleError, handleSuccess } from '../utils';


const Signup = () => {
  const navigate=useNavigate();
  const onFinish = async (values) => {
  
    try {
      const response = await axios.post('http://localhost:8080/auth/signup',
        {
          name: values.name,
          email: values.username, // you're calling it "username" in the form
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

    if (response.data.success) {
        message.success('Signup successful!');
        handleSuccess("signup successfully");
      
        setTimeout(()=>{
          navigate("/login");
        },1000)
       
      } else {
        message.error(response.data.message || 'Signup failed');
      }
      

    } catch (error) {
      const serverMessage = error.response?.data?.message || 'An error occurred during signup';
      message.error(serverMessage);
      console.error("Signup error:", error.response?.data || error.message);
      handleError(serverMessage);
      
     
    }
    
  }    

    

  return (
    <div>
    <div className="signup-container">
      <div className="card-container">
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="signup-form"
        >
          <h2 className="signup-title">Create an Account</h2>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
              { min: 3, message: 'Name must be at least 3 characters.' },
            ]}
          >
            <Input placeholder="Full Name" className="input-field" />
          </Form.Item>

          <Form.Item
  name="username"
  rules={[
    { required: true, message: 'Please input your username!' },
    { min: 4, message: 'Username must be at least 4 characters.' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Username must be a valid email address.',
    },
  ]}
>
  <Input
    prefix={<UserOutlined />}
    placeholder="Username"
    className="input-field"
  />
</Form.Item>


          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters.' },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message: 'Password must include letters and numbers.',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="input-field"
            />
          </Form.Item>
          <Form.Item
                    name="confirm"
                    dependencies={['password']}
                   hasFeedback
                   rules={[
                {
                 required: true,
                 message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
               validator(_, value) {
             if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
         }
             return Promise.reject(new Error('Passwords do not match!'));
         },
    }),
  ]}
>
  <Input.Password
    prefix={<LockOutlined />}
    placeholder="Confirm Password"
    className="input-field"/>       
</Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center" className="checkbox-section">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  Remember me
                  </Checkbox>
              </Form.Item>
             
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="signup-button"
            >
              Sign Up
            </Button>
            <div className="register-text">
              Already have an account?{' '}
              <Link to="/login" className="link">Login here</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    <ToastContainer/>
  </div>
  );
};

export default Signup;
