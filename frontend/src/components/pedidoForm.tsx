  import { useState } from "react";
  import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaBuilding } from "react-icons/fa";  // Ícones do Font Awesome
  import { usePedidoStore } from "../store/usePedido";
  import "../styles/pedidoForm.css";

  type SaborPizza = "Calabresa" | "Frango" | "Mussarela" | "Pepperoni" | "Portuguesa";

  const PedidoForm = () => {
    const [cliente, setCliente] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [bairro, setBairro] = useState("");
    const [sabor, setSabor] = useState<SaborPizza>("Calabresa");
    const [tamanho, setTamanho] = useState<"Média" | "Grande" | "Gigante">("Média");
    const [quantidade, setQuantidade] = useState(1);
    const [itensPedido, setItensPedido] = useState<any[]>([]);

    const adicionarPedido = usePedidoStore((state) => state.adicionarPedido);

    const precoPorTamanho = {
      Média: 20,
      Grande: 30,
      Gigante: 40,
    };

    const calcularPreco = () => {
      return precoPorTamanho[tamanho] || 0;
    };

    const handleAddPizza = () => {
      const novoPreco = calcularPreco();
      const precoTotalPizza = novoPreco * quantidade;

      setItensPedido([...itensPedido, { sabor, tamanho, quantidade, precoTotal: precoTotalPizza }]);

      setSabor("Calabresa");
      setTamanho("Média");
      setQuantidade(1);
    };

    const handleSubmitPedido = (e: React.FormEvent) => {
      e.preventDefault();
      if (!cliente || !endereco || !telefone || !bairro || itensPedido.length === 0) {
        alert("Preencha todos os dados do pedido e adicione pelo menos uma pizza!");
        return;
      }

      const precoTotalPedido = itensPedido.reduce((total, item) => total + item.precoTotal, 0);

      adicionarPedido({
        id: Date.now(),
        cliente,
        endereco,
        telefone,
        bairro,
        itens: itensPedido,
        precoTotal: precoTotalPedido,
      });

      setCliente("");
      setEndereco("");
      setTelefone("");
      setBairro("");
      setItensPedido([]);
    };

    return (
      <div className="p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">Cadastro do Pedido</h2>

        {/* Seção Cliente */}
        <form onSubmit={handleSubmitPedido} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Dados do Cliente</h3>

          {/* Ícone de Usuário antes do campo de Nome */}
          <div className="flex items-center border p-2 mb-2 rounded">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Nome do Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border-none focus:outline-none"
            />
          </div>

          <div className="flex items-center border p-2 mb-2 rounded">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border-none focus:outline-none"
            />
          </div>

          <div className="flex items-center border p-2 mb-2 rounded">
            <FaPhoneAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border-none focus:outline-none"
            />
          </div>

          <div className="flex items-center border p-2 mb-2 rounded">
            <FaBuilding className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full border-none focus:outline-none"
            />
          </div>
        </form>

        {/* Seção Pizza */}
        <form onSubmit={(e) => e.preventDefault()} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Escolha sua Pizza</h3>

          <select
            value={sabor}
            onChange={(e) => setSabor(e.target.value as SaborPizza)}
            className="block border p-2 w-full mb-2"
          >
            {["Calabresa", "Frango", "Mussarela", "Pepperoni", "Portuguesa"].map((saborOption) => (
              <option key={saborOption} value={saborOption}>
                {saborOption}
              </option>
            ))}
          </select>

          <select
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value as any)}
            className="block border p-2 w-full mb-2"
          >
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
            <option value="Gigante">Gigante</option>
          </select>

          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="block border p-2 w-full mb-2"
          />
          
          <button type="button" onClick={handleAddPizza} className="bg-green-500 text-white p-2 w-full mb-4">
            Adicionar Pizza
          </button>
        </form>

        {/* Resumo do Pedido */}
        <h3 className="text-lg font-semibold mb-2">Resumo do Pedido</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          {itensPedido.length > 0 ? (
            itensPedido.map((item, index) => (
              <li key={index} className="border p-2 rounded bg-gray-100">
                <p><strong>Pizza:</strong> {item.sabor} - {item.tamanho}</p>
                <p><strong>Quantidade:</strong> {item.quantidade}</p>
                <p><strong>Valor:</strong> R$ {item.precoTotal.toFixed(2)}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma pizza adicionada.</p>
          )}
        </ul>

        <div className="mb-4">
          <strong>Total do Pedido:</strong> R$ {itensPedido.reduce((total, item) => total + item.precoTotal, 0).toFixed(2)}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            onClick={handleSubmitPedido}
            className="bg-blue-500 text-white p-2 w-full"
          >
            Finalizar Pedido
          </button>
          <button
            type="button"
            onClick={() => {
              setCliente("");
              setEndereco("");
              setTelefone("");
              setBairro("");
              setItensPedido([]);
            }}
            className="bg-red-500 text-white p-2 w-full"
          >
            Limpar Dados
          </button>
        </div>
      </div>
    );
  };

  export default PedidoForm;
