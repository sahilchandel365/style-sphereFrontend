import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initially try to get email from navigation state, else empty string
  const initialEmail = location.state?.email || '';
  const [email, setEmail] = useState(initialEmail);

  const [step, setStep] = useState('request'); // 'request', 'otp', 'reset'
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear OTP input when step changes (optional but clean UX)
  useEffect(() => {
    setOtp('');
  }, [step]);

  // Step 1: Request OTP
  const handleRequestOtp = async () => {
    if (!email.trim()) {
      message.error('Email is required to request OTP');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/auth/request-otp', { email });
      if (response.data.success) {
        message.success('OTP sent to your email');
        setStep('otp');
      } else {
        message.error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Server error while requesting OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      message.error('Please enter the OTP');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/auth/verify-otp', { email, otp });
      if (response.data.success) {
        message.success('OTP verified successfully!');
        setStep('reset');
      } else {
        message.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Server error during OTP verification');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handlePasswordReset = async (values) => {
    const { newPassword } = values;
    try {
      setLoading(true);
      const response = await axios.post('/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      if (response.data.success) {
        message.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        message.error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Server error during password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <h2 className="forget-password-title">Reset Password</h2>

      <div style={{ maxWidth: 400, margin: 'auto', padding: 24, marginTop: 60 }}>
        {step === 'request' && (
          <>
            <Form layout="vertical" onFinish={handleRequestOtp}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
                initialValue={email}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Request OTP
              </Button>
            </Form>
          </>
        )}

        {step === 'otp' && (
          <>
            <p>
              OTP sent to <strong>{email}</strong>. Please enter it below.
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginBottom: 16 }}
              disabled={loading}
            />
            <Button
              type="primary"
              onClick={handleOtpSubmit}
              loading={loading}
              block
              disabled={!otp.trim()}
            >
              Verify OTP
            </Button>
            <Button
              type="link"
              onClick={() => setStep('request')}
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              Change Email
            </Button>
          </>
        )}

        {step === 'reset' && (
          <Form onFinish={handlePasswordReset} layout="vertical">
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter a new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password must include letters and numbers',
                },
              ]}
              hasFeedback
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Change Password
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
