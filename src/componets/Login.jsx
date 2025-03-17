import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';

const onFinish = (values) => {
  console.log('Success:', values);

  // Make an API call using Axios
  axios.post('https://your-api-endpoint.com/login', values)
    .then(response => {
      console.log('Response:', response);
      // Handle success response
    })
    .catch(error => {
      console.log('Error:', error);
      // Handle error response
    });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (
  <div className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Login</h2>
      <Form
        name="login-form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: '100%' }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Username Field */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="mb-6"
        >
          <Input
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your username"
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="mb-6"
        >
          <Input.Password
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your password"
          />
        </Form.Item>

        {/* Remember Me Checkbox */}
        <Form.Item name="remember" valuePropName="checked" className="mb-6">
          <Checkbox className="text-sm text-gray-700">Remember me</Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
          >
            Login
          </Button>
        </Form.Item>

        {/* Additional Links */}
        <div className="flex justify-between text-sm text-gray-600">
          <a href="/forgot-password" className="hover:text-blue-600 transition duration-200">Forgot Password?</a>
          <a href="/register" className="hover:text-blue-600 transition duration-200">Create an Account</a>
        </div>
      </Form>
    </div>
  </div>
);

export default Login;
