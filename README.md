#  Book Manager — Full Stack App

Projeto full stack com CRUD completo de livros, feito com **Node.js, PostgreSQL, Prisma e React**. Desenvolvido para demonstrar habilidades completas em desenvolvimento web — desde o backend com API REST até a interface moderna no frontend.

## 🧰 Tecnologias Utilizadas

### Backend:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](https://neon.tech/) (banco de dados em nuvem)

### Frontend:

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Deploy:

- [Railway](https://book-manager-production-637b.up.railway.app/) (Backend)
- [Netlify](https://book-manager-marcus.netlify.app/) (Frontend)

## 🚀 Funcionalidades

- Cadastro de livros com:
  - Título (`title`)
  - Autor (`author`)
  - Gênero (`gender`)
  - Ano (`year`)
  - Preço (`price`)
- API RESTful completa:
  - `POST /books` — Cria um novo livro
  - `GET /books/:id` — Busca livro por ID
  - `PUT /books/:id` — Atualiza um livro
  - `DELETE /books/:id` — Deleta um livro
- Validações básicas e tratamento de erros
- Integração com banco relacional PostgreSQL
- Testes via Thunder Client / Insomnia

## 📂 Estrutura do Projeto

1. É necessário ter o Node.js e o PostgreSQL instalados.
2. Precisa criar um arquivo `.env` na raiz do projeto com as variáveis de ambiente.

```bash
📦 backend/
 ┣ 📦 node_modules/       # Dependências do Node.js
 ┣ 📦 prisma/
 ┃ ┣ 📜 schema.prisma     # Modelo do banco via Prisma
 ┣ 📦 src/
  ┣ 📜 index.js           # API Express com rotas CRUD
 ┣ 📜 package.json        # Dependências e scripts
 ┣ 📜 package-lock.json   #  Gerenciador de dependências

📦 frontend/
```

## ▶️ Como rodar localmente

### 1. Clone o repositório

```bash
https://github.com/silvamaarcus/book-manager
```

### 2. Acesse o backend

```bash
cd backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o .env com sua DATABASE_URL do Neon

### 5. Rode as migrações

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm run dev
```

## ▶️ Como rodar localmente (Frontend)

### 1. Acesse o frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Teste com Thunder Client / Insomnia

Você pode testar as rotas da API com ferramentas como:

- Thunder Client (VS Code)
- Insomnia
- Postman

## 📫 Contato

Desenvolvido por [Marcus Silva](https://github.com/silvamaarcus)
