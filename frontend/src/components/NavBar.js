import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, TableOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Table',
    key: '/table',
    icon: <TableOutlined />,
  },
  {
    label: 'Log',
    key: '/log',
    icon: <InfoCircleOutlined />,
  },
];


const NavBar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/');
    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };
   return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
      <div style={{ padding: '10px' }}>
        <img src="/smartmart.png" alt="Logo" style={{ height: '40px' }} />
      </div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ flex: 1, justifyContent: 'flex-start', borderBottom: 'none' }} />
    </div>
  );
};
export default NavBar;