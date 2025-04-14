import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Book } from "@/types/Book";

// Schema de validação com Zod
const formSchema = z.object({
  title: z.string().min(2, { message: "Insira o nome do livro!" }),
  author: z.string().min(2, { message: "Insira o nome do autor!" }),
  gender: z.string().min(2, { message: "Insira o gênero!" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Insira um ano válido (ex: 2023)" }),
  price: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, { message: "Insira um preço válido (ex: 5.90)" }),
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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
      setSubmitSuccess(true);
      setSubmitError("");
      reset(); // limpa o formulário
    } catch (error) {
      setSubmitError(error as string);
      setSubmitSuccess(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Livro</FormLabel>
              <FormControl>
                <Input placeholder="Nome do livro..." {...field} />
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
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do autor..." {...field} />
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
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Input placeholder="Defina o gênero..." {...field} />
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
              <FormLabel>Ano</FormLabel>
              <FormControl>
                <Input placeholder="Ano de publicação..." {...field} />
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
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 5.90" {...field} />
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
          {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Adicionar"}
        </Button>

        {submitSuccess && (
          <div className="text-green-500">Livro salvo com sucesso!</div>
        )}
        {submitError && <div className="text-red-500">Erro: {submitError}</div>}
      </form>
    </Form>
  );
};
