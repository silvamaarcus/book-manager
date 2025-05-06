// import { BookList } from "@/components/BookList";
import { BookList } from "@/components/BookList";
import { Navbar } from "@/components/Navbar";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search} from "lucide-react";

export const BooksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Book Collection</h1>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search books by title, author..."
                className="pl-10 bg-background/50"
              />
            </div>

            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-[160px] bg-background/50">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                  <SelectItem value="science-fiction">
                    Science Fiction
                  </SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <BookList />
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Book Manager</p>
      </footer>
    </div>
  );
};
