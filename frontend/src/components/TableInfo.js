import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Form, Button, message, InputNumber, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;

const TableInfo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleUpdate = (record) => {
    navigate(`/edit/${record.id}`);
  };

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
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID Categoria',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Alterar</a>
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            onConfirm={() => handleDelete(record)}
            okText="Sim"
            cancelText="Não"
          >
            <a>Deletar</a>
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
      console.error("Error ao adicionar o produto ou histórico:", error);
    }
  };

  const handleSearch = (value) => {
    fetchProducts(value);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1px' }}>
        <h2>Registro de venda</h2>
        <Form
          form={form}
          name="basic"
          layout="inline"
          onFinish={onFinish}
          style={{ marginBottom: '1px' }}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
        <h2>Filtro de vendas</h2>
        <Search
          placeholder="Buscar por ID ou Nome"
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300, marginBottom: 1 }}
        />
      </div>
      <h2>Vendas</h2>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="id" 
      />
    </>
  );
};

export default TableInfo;