import React from 'react';

const Home = () => {
  return (
    <div className="p-5 max-w-4xl mx-auto text-left">
      <h1 className="text-4xl font-bold mb-4">Desafio Fullstack Apollo Dev</h1>
      <p className="text-lg leading-relaxed mb-8">
        Este aplicativo demonstra uma comunicação entre o front-end (React) e o back-end (Django).
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Página Table</h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>Um formulário com botão de <strong>POST</strong>.</li>
          <li>Um filtro para trazer as categorias dos produtos por <strong>id(registro) e name</strong>.</li>
          <li>Uma tabela <strong>GET</strong> e com as colunas <strong>id, name, category_id e price</strong>.</li>
          <li>Actions de <strong>UPDATE</strong> e <strong>DELETE</strong>.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-5 mb-2">Página Log</h2>
        <p className="text-base leading-relaxed">
          Histórico de vendas mostrando o <strong>id_produto, mês registado, a quantidade <u>padrão 1</u> e preço_total</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-5 mb-2">Acesso ao banco de dados</h2>
        <p>Para acessar o banco de dados utilize o link abaixo:</p>
        <p><a href="http://127.0.0.1:8000/admin" className="text-blue-600 hover:text-blue-800">Banco de Dados Django</a></p>
        <p><b>Usuário:</b> admin</p>
        <p><b>Senha:</b> 1234</p>
      </div>
    </div>
  );
};

export default Home;