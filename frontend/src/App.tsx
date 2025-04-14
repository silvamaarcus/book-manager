import { useEffect, useState } from "react";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";
import { Book } from "./types/Book";

const API_URL = "https://book-manager-production-637b.up.railway.app/books";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleCreateOrUpdate = async (book: Book) => {
    try {
      if (editingBook) {
        // Atualizar livro existente
        await fetch(`${API_URL}/${editingBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        });
        setEditingBook(null);
      } else {
        // Criar novo livro
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        });
      }
      fetchBooks();
    } catch (error) {
      console.error("Erro ao criar/atualizar livro:", error);
    }
  };

  // Função para editar um livro
  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  // Função para excluir um livro
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchBooks();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="max-2-4xl mx-auto my-10 flex px-8 gap-8">
        <div className="w-full rounded-lg p-4 border">
          <h1 className="text-2xl mb-8">Adicionar um livro</h1>
          <BookForm
            onSubmit={handleCreateOrUpdate}
            initialData={editingBook ?? undefined}
            isEditing={!!editingBook}
          />
        </div>
        <div className="w-full rounded-lg p-4 border">
          <h1 className="text-2xl mb-8">Livros</h1>
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
