import { Book } from "@/types/Book";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, Users, BookMarked, Library } from "lucide-react";

const API_URL = "https://book-manager-production-637b.up.railway.app/books";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card className="glass-card">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

export const BookStats = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Buscar os livros
  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Calcular estatísticas
  const totalBooks = books.length; // Total de livros

  const uniqueAuthors = new Set(books.map((book) => book.author)).size; // Número de autores únicos

  // Calcular gêneros
  const genres = books.reduce((acc, book) => {
    const genre = book.gender || "Unspecified";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Encontrar o gênero mais popular
  let popularGenre = "None";
  let maxCount = 0;

  for (const [genre, count] of Object.entries(genres)) {
    if (count > maxCount) {
      maxCount = count;
      popularGenre = genre;
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Books"
        value={totalBooks}
        description="In your library"
        icon={<BookOpen className="h-4 w-4" />}
      />
      <StatCard
        title="Authors"
        value={uniqueAuthors}
        description="Unique writers"
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Popular Genre"
        value={popularGenre === "None" ? "N/A" : popularGenre}
        description={maxCount > 0 ? `${maxCount} books` : "Add books to see"}
        icon={<BookMarked className="h-4 w-4" />}
      />
      <StatCard
        title="Reading Goal"
        value="0/10"
        description="Books read this month"
        icon={<Library className="h-4 w-4" />}
      />
    </div>
  );
};
