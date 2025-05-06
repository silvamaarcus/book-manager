import { BookPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { toast, Toaster } from "sonner";
import { Button } from "./ui/button";
import { z } from "zod";
import { Book } from "@/types/Book";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

// Schema de validação com Zod
const formSchema = z.object({
  title: z.string().min(2, { message: "Enter book title" }),
  author: z.string().min(2, { message: "Enter author name" }),
  gender: z.string().min(2, { message: "Enter book gender" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Enter a valid year (ex: 2023)" }),
  price: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, { message: "Enter a valid price (ex: 5.90)" }),
});

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book;
  isEditing?: boolean;
}

export const BookForm = ({
  onSubmit,
  initialData,
  isEditing,
}: BookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      author: "",
      gender: "",
      year: "",
      price: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit({ ...data, id: initialData?.id || "" });

      toast("This book has been successfully saved!", {
        duration: 6000,
        icon: "👏",
        closeButton: true,
        style: {
          background: "var(--background)",
          color: "var(--sucess)",
          border: "1px solid var(--sucess)",
        },
      });

      reset(); // limpa o formulário
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="w-full glass-card animate-fade-up p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookPlus className="h-5 w-5 text-primary" />
            Add New Book
          </CardTitle>
          <CardDescription>
            Register a new book to your library collection
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-8 px-6"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter book title"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter genre"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter year"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 5.90"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditing ? "Save" : "Add Book"}
            </Button>

            <Toaster />
          </form>
        </Form>
      </Card>
    </>
  );
};
