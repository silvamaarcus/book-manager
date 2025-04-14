import { UseForm } from "./components/UseForm";

function App() {
  return (
    <>
      <div className="max-2-4xl mx-auto my-10 flex px-8 gap-8">
        <div className="w-full rounded-lg p-4 border">
          <h1 className="text-2xl mb-8">Adicionar um livro</h1>
          <UseForm />
        </div>
        <div className="w-full rounded-lg p-4 border">
          <h1 className="text-2xl mb-8">Livros</h1>
          <UseForm />
        </div>
      </div>
    </>
  );
}

export default App;
