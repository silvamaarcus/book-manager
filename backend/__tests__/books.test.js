import request from "supertest"; // Importa lib para fazer requisições HTTP simuladas.
import app from "../src/server.js"; // Importe a instância do seu app Express

// Teste para a rota principal
describe("Testes da Rota Principal", () => {
  it('Deve retornar a mensagem "Mini-API de Livros está rodando!" na rota GET /', async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Mini-API de Livros está rodando!");
  });
});

// Testes para a rota /books
describe("Testes da Rota /books", () => {
  it("Deve adicionar um novo Livro (POST /books)", async () => {
    const novoLivro = {
      title: "Novo Livro Teste",
      author: "Autor Teste",
      gender: "Ficção",
      year: 2023,
      price: 25.0,
    };

    const response = await request(app)
      .post("/books")
      .send(novoLivro)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(novoLivro.title);
    expect(response.body.author).toBe(novoLivro.author);
    expect(response.body.gender).toBe(novoLivro.gender);
    expect(response.body.year).toBe(novoLivro.year);
    expect(response.body.price).toBe(novoLivro.price);
  });

  it("Deve listar todos os livros (GET /books)", async () => {
    const response = await request(app).get("/books").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    // Podemos adicionar mais asserts aqui para verificar se a lista não está vazia, etc.
  });

  it("Deve buscar um book específico por ID (GET /books/:id)", async () => {
    // Primeiro, precisamos adicionar um book para ter um ID para buscar
    const novoLivro = {
      title: "book de Busca",
      author: "Autor Busca",
      gender: "Mistério",
    };
    const postResponse = await request(app)
      .post("/books")
      .send(novoLivro)
      .expect(201);

    const livroId = postResponse.body.id;

    const getResponse = await request(app).get(`/books/${livroId}`).expect(200);

    expect(getResponse.body).toHaveProperty("id");
    expect(getResponse.body.title).toBe(novoLivro.title);
    expect(getResponse.body.author).toBe(novoLivro.author);
    expect(getResponse.body.gender).toBe(novoLivro.gender);
  });

  it("Deve retornar 404 para um ID de book inexistente (GET /livros/:id)", async () => {
    const nonExistentId = 9999;
    await request(app).get(`/livros/${nonExistentId}`).expect(404);
  });
});

// Testes para a rota /books/:id
describe('Testes das rotas PUT e DELETE (/books/:id)', () => {
  let livroIdParaTeste;

  // Adiciona um livro antes de executar os testes de PUT e DELETE
  beforeAll(async () => {
    const novoLivro = {
      title: 'Livro Inicial para Teste',
      author: 'Autor Teste',
      gender: 'Drama',
    };
    const postResponse = await request(app)
      .post('/books')
      .send(novoLivro)
      .expect(201);
    livroIdParaTeste = postResponse.body.id;
  });

  it('Deve atualizar um livro existente (PUT /books/:id)', async () => {
    const livroAtualizado = {
      title: 'Título Atualizado',
      author: 'Autor Atualizado',
      gender: 'Suspense',
      year: 2024,
      price: 30.00,
    };

    const response = await request(app)
      .put(`/books/${livroIdParaTeste}`)
      .send(livroAtualizado)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(livroAtualizado.title);
    expect(response.body.author).toBe(livroAtualizado.author);
    expect(response.body.gender).toBe(livroAtualizado.gender);
    expect(response.body.year).toBe(livroAtualizado.year);
    expect(response.body.price).toBe(livroAtualizado.price);
  });

  it('Deve retornar 404 ao tentar atualizar um livro inexistente (PUT /books/:id)', async () => {
    const nonExistentId = 9999;
    const livroAtualizado = {
      title: 'Título Atualizado',
    };
    await request(app)
      .put(`/books/${nonExistentId}`)
      .send(livroAtualizado)
      .expect(404);
  });

  it('Deve remover um livro existente (DELETE /books/:id)', async () => {
    await request(app)
      .delete(`/books/${livroIdParaTeste}`)
      .expect(204);

    // Tenta buscar o livro removido para garantir que ele não existe mais
    await request(app)
      .get(`/books/${livroIdParaTeste}`)
      .expect(404);
  });

  it('Deve retornar 404 ao tentar remover um livro inexistente (DELETE /books/:id)', async () => {
    const nonExistentId = 9999;
    await request(app)
      .delete(`/books/${nonExistentId}`)
      .expect(404);
  });
});