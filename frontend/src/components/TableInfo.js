import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Form, Button, message, InputNumber, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;

const TableInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/products/${record.id}/`);
      message.success('Produto deletado com sucesso!');
      fetchProducts();
    } catch (error) {
      message.error('Falha ao deletar o produto.');
      console.error("Error deleting product:", error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {}
          <Link to={`/edit/${record.id}`}>Alterar</Link>
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            onConfirm={() => handleDelete(record)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>Deletar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/?search=${query}`);
      setData(response.data);
    } catch (error) {
      message.error('Falha ao carregar os dados.');
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = async (values) => {
    try {
      const productResponse = await axios.post('http://127.0.0.1:8000/api/v1/products/', values);
      message.success('Produto adicionado com sucesso!');

      const today = new Date();
      const month = today.toLocaleString('default', { month: 'long' });
      const historyData = {
          product: productResponse.data.id,
          month: month,
          quantity: 1,
      };
      
      await axios.post('http://127.0.0.1:8000/api/v1/history/', historyData);
      message.success('Histórico registrado com sucesso!');

      fetchProducts();
      form.resetFields();
    } catch (error) {
      message.error('Falha ao adicionar o produto ou registrar histórico.');
      console.error("Error adding product or history:", error);
    }
  };

  const handleSearch = (value) => {
    fetchProducts(value);
  };

  return (
      <div className="p-5 max-w-7xl mx-auto">
      <div className="flex flex-col items-center p-5">
              <h1 className="text-3xl font-bold mb-4 text-center">Registro de venda</h1>
        <Form
          form={form}
          name="basic"
          layout="inline"
          onFinish={onFinish}
          style={{ marginBottom: '16px' }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Por favor, digite o nome!' }]}
          >
            <Input placeholder="Nome do Produto" />
          </Form.Item>
          <Form.Item
            name="category_id"
            rules={[{ required: true, message: 'Por favor, digite a categoria!' }]}
          >
            <Input placeholder="ID da Categoria" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Por favor, digite o preço!' }]}
          >
            <InputNumber placeholder="Preço" />
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[{ required: true, message: 'Por favor, digite a quantidade!' }]}
          >
            <InputNumber placeholder="Quantidade" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
        <Search
          placeholder="Buscar por ID ou Nome"
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300, marginBottom: 16 }}
        />
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="id" 
      />
    </div>
  );
};

export default TableInfo;