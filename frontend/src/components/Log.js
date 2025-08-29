import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
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

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/history/');
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
    }, []);


    return (
        <div style={{ padding: '20px' }}>
            <h1>Histórico</h1>
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