import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Book } from "../types/Book";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BookForm } from "./BookForm";

const API_URL = "https://book-manager-production-637b.up.railway.app/books";

interface BookListProps {
  limit?: number;
}

export const BookList = ({ limit }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Função para buscar livros
  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      let fetchUrl = API_URL;

      if (limit) {
        fetchUrl += `?_sort=id&_order=desc&_limit=${limit}`;
      }

      if (limit) {
        // Ordenar os dados localmente para garantir que temos os mais recentes
        const sortedData = [...data].sort((a, b) => b.id.localeCompare(a.id));
        setBooks(sortedData.slice(0, limit));
      } else {
        setBooks(data);
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Função para editar um livro
  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsSheetOpen(true);
  };

  // Função para atualizar um livro
  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const response = await fetch(`${API_URL}/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      setIsSheetOpen(false);
      fetchBooks();
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating book:", error);
      return Promise.reject(error);
    }
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

  if (books.length === 0) {
    return (
      <Card className="glass-card mt-6 animate-fade-up">
        <CardContent className="pt-6 pb-6 text-center">
          <p className="text-muted-foreground">
            No books in your library yet. Add your first book!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
        {books.map((book) => (
          <Card key={book.id} className="glass-card h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {book.author}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-2 flex-grow">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="capitalize">
                  {book.gender || "Unspecified"}
                </Badge>
                {book.year && <Badge variant="outline">{book.year}</Badge>}
              </div>
            </CardContent>

            <CardFooter className="pt-2 flex justify-between">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(book)}
                >
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(book.id)}
                  className="text-destructive hover:text-destructive/80 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto" side="bottom">
          <SheetHeader>
            <SheetTitle>Edit Book</SheetTitle>
            <SheetDescription>
              Make changes to your book here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          {editingBook && (
            <div className="py-4">
              <BookForm
                onSubmit={handleUpdateBook}
                initialData={editingBook}
                isEditing={true}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
