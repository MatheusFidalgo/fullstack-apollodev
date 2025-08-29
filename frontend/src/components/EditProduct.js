import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}/`);
        form.setFieldsValue(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Falha ao carregar o produto.');
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, form]);

  // Função para lidar com o envio do formulário de atualização
  const onFinish = async (values) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/products/${id}/`, values);
      message.success('Produto atualizado com sucesso!');
      navigate('/table');
    } catch (error) {
      message.error('Falha ao atualizar o produto.');
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Editar Produto</h1>
      <Form
        form={form}
        name="edit_product"
        onFinish={onFinish}
        style={{ width: 400 }}
      >
        <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, digite o nome!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category_id" label="ID da Categoria" rules={[{ required: true, message: 'Por favor, digite a categoria!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="price" label="Preço" rules={[{ required: true, message: 'Por favor, digite o preço!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;