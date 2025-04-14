import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json()); // Para lidar com dados JSON no corpo das requisições

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Mini-API de Livros está rodando!");
});

// POST /livros - Adicionar um novo livro
app.post("/books", async (req, res) => {
  try {
    const { title, author, gender, year, price } = req.body;
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        gender,
        year: year ? parseInt(year) : undefined,
        price: price ? parseFloat(price) : undefined,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao adicionar o livro." });
  }
});

// GET /livros - Listar todos os livros
app.get("/books", async (req, res) => {
  try {
    const { author, gender } = req.query; // Captura os parâmetros de consulta
    const where = {}; // Objeto de filtro

    // Adiciona filtros dinâmicos com base nos parâmetros de consulta
    if (author) {
      where.autor = { contains: author, mode: "insensitive" }; // Filtragem por autor
    }
    if (gender) {
      where.genero = { equals: gender, mode: "insensitive" }; // Filtragem por gênero
    }

    // Busca os livros com base nos filtros
    const books = await prisma.book.findMany({
      where,
    });

    // Retorna os livros encontrados
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar os livros." });
  }
});

// GET /livros/:id - Buscar um livro específico pelo ID
app.get("/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id); // Captura o ID do livro da URL
    // Busca o livro pelo ID
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    // Verifica se o livro foi encontrado
    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }
    // Retorna o livro encontrado
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar o livro." });
  }
});

// PUT /livros/:id - Atualizar um livro específico pelo ID
app.put("/books/:id", async (req, res) => {
  const { id } = req.params; // Captura o ID do livro da URL
  const { title, author, gender, year, price, createdAt, updatedAt } = req.body; // Captura os dados do livro do corpo da requisição
  try {
    // Atualiza o livro no banco de dados
    const bookUpdated = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        gender,
        year: year ? parseInt(year) : undefined,
        price: price ? parseFloat(price) : undefined,
        createdAt,
        updatedAt,
      },
    });
    // Retorna o livro atualizado
    res.json(bookUpdated);
  } catch (error) {
    console.log("Erro ao atualizar livro", error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "Livro não encontrado." });
    } else {
      res.status(500).json({ error: "Erro ao atualizar o livro." });
    }
  }
});

// DELETE /livros/:id - Remover um livro
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params; // Captura o ID do livro da URL
  // Remove o livro do banco de dados
  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // 204 No Content para indicar sucesso na exclusão
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "Livro não encontrado." });
    } else {
      res.status(500).json({ error: "Erro ao remover o livro." });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
