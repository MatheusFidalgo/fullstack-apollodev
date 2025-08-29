# [Desafio Fullstack Apollo Dev]


[![Assista ao vídeo de demonstração](https://i.imgur.com/MWd1SFP.png)](https://youtu.be/XhL4nG5Lg1w)

## Descrição do Projeto
Este é um aplicativo web full-stack desenvolvido com **Python Django** no backend e **React** no frontend. O sistema permite o gerenciamento de produtos, com funcionalidades completas de CRUD (Criar, Ler, Atualizar, Deletar).

## Funcionalidades
- **CRUD**: Completo na página Table e um (GET) na página Log.

## Tecnologias Utilizadas
### Backend
- Python 3
- Django
- Django REST Framework

### Frontend
- React
- Ant Design
- Axios
- React Router DOM

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu computador:
- [Python 3](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/) (inclui o npm)

## Instalação e Execução

Siga os passos abaixo para configurar e rodar a aplicação.

### 1. Configuração do Backend
1.  **Vá para a pasta do backend:**
    ```bash
    cd backend/
    ```
2.  **Crie e ative o ambiente virtual:**
    ```bash
    python -m venv venv
    source venv/Scripts/activate # No Windows (Git Bash)
    ```
3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt # Se você tiver o arquivo
    # Ou instale manualmente
    pip install django djangorestframework django-cors-headers
    ```
4.  **Rode as migrações do banco de dados:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
5.  **Crie um usuário administrador ou use o admin padrao:**
    ```bash
    python manage.py createsuperuser
    ```
    ```usuario admin
    admin
    1234
    ```
6.  **Inicie o servidor do Django:**
    ```bash
    python manage.py runserver
    ```
    O backend estará rodando em `http://localhost:8000`.

### 2. Configuração do Frontend
1.  **Abra um novo terminal e vá para a pasta do frontend:**
    ```bash
    cd frontend/
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor do React:**
    ```bash
    npm start
    ```
    O frontend estará rodando em `http://localhost:3000`.

---
## Uso da Aplicação
- Acesse o aplicativo em seu navegador em `http://localhost:3000`.
- Use a **página de tabela** para adicionar novos produtos e ver as informações em tempo real.
- Visite o **painel de administração do Django** em `http://localhost:8000/admin/` para gerenciar todos os registros do banco de dados.
