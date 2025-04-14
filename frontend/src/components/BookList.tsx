import { Book } from "../types/Book";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Trash } from "lucide-react";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookList = ({ books, onEdit, onDelete }: BookListProps) => {
  return (
    <>
      <Table>
        <TableCaption>Lista atualizada.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell>{book.gender}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(book.id!)}
                    className="cursor-pointer hover:text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
