import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useForm } from 'antd/es/form/Form';

const App = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [checkingEmail, setCheckingEmail] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: values.username.trim().toLowerCase(),
        password: values.password,
      });

      if (response.data.success) {
        message.success('Login successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);

        handleSuccess('Login successfully');
        setTimeout(() => navigate('/'), 1000);
      } else {
        message.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      message.error('An error occurred during login');
      handleError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getFieldValue('username')?.trim().toLowerCase();

    if (!email) {
      handleError('please enter your email');
      message.error('Please enter your email before clicking Forgot Password');
      return;
    }

    setCheckingEmail(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/check-email', { email });

      if (response.data.exists) {
        navigate('/forgetpassword', { state: { email } });
      } else {
        message.error('This email is not registered in our system');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error checking email');
      handleError("enter vaild email");
    } finally {
      setCheckingEmail(false);
    }
  };

  return (
    <>
      <div id="container">
        <div className="Login">
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <h2>Login Here</h2>

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
              <Input prefix={<UserOutlined />} placeholder="Username" className="input-field" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                { min: 6, message: 'Password must be at least 6 characters' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password must include letters and numbers',
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

               <span
                  className="forgot-password-link"
                  style={{
                    color: checkingEmail ? '#999' : '#1677ff',
                    cursor: checkingEmail ? 'not-allowed' : 'pointer',
                  }}
                  onClick={!checkingEmail ? handleForgotPassword : undefined}
                >
                  Forgot password?
                </span>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="/signup">Register now!</Link>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
