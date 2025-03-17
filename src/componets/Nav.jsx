
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router';
 const Nav = () => {
         
const items = [
    {
      label:(<Link to="/">HOME</Link>),
      key: 'home',
      icon: <MailOutlined />,
    },
    {
      label: (<Link to="/login">Login</Link>),
      key: 'login',
      icon: <AppstoreOutlined />,
    
    },
    {
      label: 'COVERS',
      key: 'COVERS',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'GLASS',
          children: [
            {
              label: 'HARD CASE',
              key: 'setting:1',
            },
            {
              label: 'SOFT CASE',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      key: 'alipay',
      label: (
        <a href="" target="_blank" rel="noopener noreferrer">
          CONTACT US
        </a>
      ),
    },
  ];
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div>


 
  <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />


    </div>
  )
}  ; export default Nav
