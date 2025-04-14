import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";

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

export const BookForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      gender: "",
      year: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok && response.status === 201) {
        console.log("Livro adicionado com sucesso!");
        form.reset();
        setSubmitSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Erro ao adicionar livro:", errorData);
        setSubmitError(
          errorData?.error || "Erro desconhecido ao adicionar o livro."
        );
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setSubmitError("Erro ao comunicar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          {isSubmitting ? "Adicionando..." : "Adicionar"}
        </Button>

        {submitSuccess && (
          <div className="text-green-500">Livro adicionado com sucesso!</div>
        )}

        {submitError && <div className="text-red-500">Erro: {submitError}</div>}
      </form>
    </Form>
  );
};
