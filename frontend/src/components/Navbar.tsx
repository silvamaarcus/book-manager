import { BookOpen, BookPlus, LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <>
      <section className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-75">
            <LibraryBig className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BookManager</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Books
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <BookOpen className="h-5 w-5 mr-1" />
                  <span>View Books</span>
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  <BookPlus className="h-5 w-5 mr-1" />
                  <span>Add Book</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
