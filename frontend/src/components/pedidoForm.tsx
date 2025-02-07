  import { useState } from "react";
  import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaBuilding } from "react-icons/fa"; // Ícones do Font Awesome
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

    // Preços unitários por sabor
    const precoPorSabor = {
      Calabresa: 1,
      Frango: 1.1,
      Mussarela: 1.2,
      Pepperoni: 1.3,
      Portuguesa: 1.4,
    };

    const calcularPrecoUnitario = () => {
      return precoPorSabor[sabor] * precoPorTamanho[tamanho];
    };

    const calcularPrecoTotalPizza = () => {
      return calcularPrecoUnitario() * quantidade;
    };

    const handleAddPizza = () => {
      const precoUnitario = calcularPrecoUnitario();
      const precoTotalPizza = calcularPrecoTotalPizza();

      setItensPedido([
        ...itensPedido,
        { sabor, tamanho, quantidade, precoUnitario, precoTotal: precoTotalPizza },
      ]);

      // Resetando os valores para o próximo item
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

      // Limpar os dados após o envio
      setCliente("");
      setEndereco("");
      setTelefone("");
      setBairro("");
      setItensPedido([]);
    };

    return (
      <div className="pedido-container">
        <h2 className="pedido-title">Cadastro do Pedido</h2>

        {/* Seção Cliente */}
        <form onSubmit={handleSubmitPedido} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Dados do Cliente</h3>

          {/* Nome */}
          <div className="flex items-center border p-2 mb-2 rounded">
            <FaUser className="pedido-icon" />
            <input
              type="text"
              placeholder="Nome do Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="pedido-input"
            />
          </div>

          {/* Endereço */}
          <div className="flex items-center border p-2 mb-2 rounded">
            <FaMapMarkerAlt className="pedido-icon" />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="pedido-input"
            />
          </div>

          {/* Telefone */}
          <div className="flex items-center border p-2 mb-2 rounded">
            <FaPhoneAlt className="pedido-icon" />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="pedido-input"
            />
          </div>

          {/* Bairro */}
          <div className="flex items-center border p-2 mb-2 rounded">
            <FaBuilding className="pedido-icon" />
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="pedido-input"
            />
          </div>
        </form>

        {/* Seção Pizza */}
        <form onSubmit={(e) => e.preventDefault()} className="pizza-section">
          <h3 className="text-lg font-semibold mb-2">Escolha sua Pizza</h3>

          <select
            value={sabor}
            onChange={(e) => setSabor(e.target.value as SaborPizza)}
            className="pedido-input"
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
            className="pedido-input"
          >
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
            <option value="Gigante">Gigante</option>
          </select>

          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="pedido-input"
          />
          
          <button
            type="button"
            onClick={handleAddPizza}
            className="pedido-button"
          >
            Adicionar Pizza
          </button>
        </form>

        {/* Resumo do Pedido */}
        <h3 className="pedido-summary-title">Resumo do Pedido</h3>
        <ul>
    {itensPedido.length > 0 ? (
      itensPedido.map((item, index) => (
        <li key={index} className="pizza-item">
          <p><strong>Pizza:</strong> {item.sabor} - {item.tamanho}</p>
          <p><strong>Quantidade:</strong> {item.quantidade}</p>
          <p><strong>Valor Unitário:</strong> R$ {item.precoTotal / item.quantidade.toFixed(2)}</p> {/* Valor unitário */}
          <p><strong>Valor Total:</strong> R$ {item.precoTotal.toFixed(2)}</p> {/* Valor total */}
        </li>
      ))
    ) : (
      <p className="text-gray-500">Nenhuma pizza adicionada.</p>
    )}
  </ul>


        <div>
          <strong>Total do Pedido:</strong> R$ {itensPedido.reduce((total, item) => total + item.precoTotal, 0).toFixed(2)}
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <button
            type="submit"
            onClick={handleSubmitPedido}
            className="pedido-add-button"
          >
            Adicionar Pedido
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
            className="pedido-clear-button"
          >
            Limpar Dados
          </button>
        </div>
      </div>
    );
  };

  export default PedidoForm;
