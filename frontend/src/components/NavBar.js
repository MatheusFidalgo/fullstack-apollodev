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
  const [current, setCurrent] = useState('/'); 
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  
  return (
    <div className="flex items-center justify-between px-5 bg-white shadow-md">
      <div className="py-2">
        <img src="/smartmart.png" alt="Logo" className="h-10" />
      </div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="flex-1 justify-start border-b-0" />
    </div>
  );
};

export default NavBar;