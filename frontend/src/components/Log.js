import React, { useState, useEffect } from 'react';
import { Table, message, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
    },
];

const Log = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

      const fetchHistory = async (query = '') => {
      setLoading(true);
      try {
          const timestamp = new Date().getTime();
          const url = `http://127.0.0.1:8000/api/v1/history/?search=${query}&_t=${timestamp}`;
          const response = await axios.get(url);
          setData(response.data);
      } catch (error) {
          message.error('Falha ao carregar o histórico.');
          console.error("Error fetching history:", error);
      } finally {
          setLoading(false);
      }
    };

    useEffect(() => {
        fetchHistory();
    }, [location]);

    const handleSearch = (value) => {
        fetchHistory(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Histórico</h1>
            {/* <Search
                placeholder="Buscar"
                allowClear
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 300, marginBottom: 16 }}
            /> */}
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
            />
        </div>
    );
};

export default Log;