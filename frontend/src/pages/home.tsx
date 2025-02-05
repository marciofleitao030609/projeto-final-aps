import PedidoForm from "../components/pedidoForm";
import PedidoLista from "../components/pedidoLista";

const HomePage = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">Sistema da Pizzaria</h1>
       <PedidoForm /> 
      <PedidoLista />
    </div>
  );
};

export default HomePage;
