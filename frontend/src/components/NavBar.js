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
  const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavBar;