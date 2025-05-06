import { BookForm } from "@/components/BookForm";
import { BookList } from "@/components/BookList";
import { BookStats } from "@/components/BookStats";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "@/types/Book";
import { BookPlus, Library } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://book-manager-production-637b.up.railway.app/books";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
      console.log(books);
      fetchBooks();
    } catch (error) {
      console.error("Erro ao criar/atualizar livro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative py-12 md:py-16 bg-background border-b border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format')] bg-cover opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Book Manager Library
          </h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A modern platform to catalog, organize, and manage your personal
            book collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setActiveTab("add")}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <BookPlus className="mr-2 h-5 w-5" />
              Register New Book
            </Button>
            <Link to="/books" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Library className="mr-2 h-5 w-5" />
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="cursor-pointer">
              Overview
            </TabsTrigger>
            <TabsTrigger value="add" className="cursor-pointer">
              Add Book
            </TabsTrigger>
            <TabsTrigger value="collection" className="cursor-pointer">
              Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <BookStats />

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  Recent Additions
                </h2>
                <Link to="/books">
                  <Button variant="link" className="cursor-pointer">
                    View all
                  </Button>
                </Link>
              </div>
              <BookList limit={3} />
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="mx-auto">
              <BookForm
                onSubmit={handleCreateOrUpdate}
              />
            </div>
          </TabsContent>

          <TabsContent value="collection">
            <BookList />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Book Manager</p>
      </footer>
    </div>
  );
};
