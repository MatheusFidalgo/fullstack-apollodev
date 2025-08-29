import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h1>Desafio Fullstack Apollo Dev</h1>
      <p style={{ lineHeight: '1.6' }}>
        Este aplicativo demonstra uma comunicação entre o front-end (React) e o back-end (Django).<p></p>
        Vou procurar saber como posso fazer a inserção através de arquivos.csv futuramente.<p></p>
        Navegação consiste em:
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2>Página Table</h2>
        <p>
         CRUD - Formulário com botão de (POST), um filtro, uma tabela (GET) e com as actions de (UPDATE) e (DELETE).
        </p>

        <h2 style={{ marginTop: '20px' }}>Página Log</h2>
        <p>
          (GET) Histórico mostrando o id_produto, mês registado, a quantidade(default 1) e preço_total.
        </p>
      </div>
    </div>
  );
};

export default Home;