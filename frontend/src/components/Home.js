import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h1>Desafio Fullstack Apollo Dev</h1>
      <p style={{ lineHeight: '1.6' }}>
        Este aplicativo demonstra uma comunicação entre o front-end (React) e o back-end (Django).<p></p>
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2>Página Table</h2>
        <p>
         <p>Formulário com botão de <strong>POST</strong>.</p> 
         <p>Filtro para trazer as categorias dos produtos por <strong>id(registro) e name</strong>.</p>
         <p>Uma tabela <strong>GET</strong> e com as colunas <strong>id, name, category_id e price</strong>.</p>
         <p>Actions de <strong>UPDATE</strong> e <strong>DELETE</strong>.</p>
        </p>

        <h2 style={{ marginTop: '20px' }}>Página Log</h2>
        <p>
        Histórico de vendas mostrando o <strong>id_produto, mês registado, a quantidade <u>padrão 1</u> e preço_total</strong>.
        </p>

        <h2>Acesso ao banco de dados</h2>
        <p>Para acessar o banco de dados utilize o link abaixo:</p>
        <p><a href="http://127.0.0.1:8000/admin">Banco de Dados Django</a></p>
        <p><b>Usuario:</b> admin</p>
        <p><b>Senha:</b> 1234</p>
      </div>
    </div>
  );
};

export default Home;