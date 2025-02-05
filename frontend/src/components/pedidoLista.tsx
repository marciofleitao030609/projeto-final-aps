import { usePedidoStore } from "../store/usePedido";

const PedidoLista = () => {
  const pedidos = usePedidoStore((state) => state.pedidos);

  return (
    <div className="pedido-container">
      <h2 className="pedido-title">Pedidos</h2>
      <ul className="list-disc pl-5 space-y-2">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <li key={pedido.id} className="pedido-item">
              <p><strong>Cliente:</strong> {pedido.cliente}</p>
              <p><strong>Endereço:</strong> {pedido.endereco}, {pedido.bairro}</p>
              <p><strong>Telefone:</strong> {pedido.telefone}</p>

              {/* Quantidade de Pizzas e Valores */}
              <div>
                <h3 className="text-lg font-semibold">Pizzas Pedidas:</h3>
                <ul className="list-disc pl-5">
                  {pedido.itens.map((item, index) => (
                    <li key={index}>
                      <p><strong>Sabor:</strong> {item.sabor}</p>
                      <p><strong>Tamanho:</strong> {item.tamanho}</p>
                      <p><strong>Quantidade:</strong> {item.quantidade}</p>
                      <p><strong>Preço de Cada Pizza:</strong> R$ {item.precoTotal.toFixed(2)}</p>

                      {/* Divisória entre pizzas */}
                      {index < pedido.itens.length - 1 && <hr className="divider" />}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exibindo a quantidade total de pizzas e o valor total do pedido */}
              <div className="pedido-summary">
                <h3 className="pedido-summary-title">Resumo do Pedido:</h3>
                <p><strong>Total de Pizzas:</strong> {pedido.itens.reduce((acc, item) => acc + item.quantidade, 0)}</p>

                {/* Divisória entre o total de pizzas e o valor total */}
                <hr className="divider" />

                <p className="text-xl font-bold text-green-600"><strong>Valor Total do Pedido:</strong> R$ {pedido.precoTotal.toFixed(2)}</p>
              </div>

              {/* Botões de Finalizar e Limpar */}
              <div className="pedido-buttons">
                <button className="pedido-button pedido-button-finalizar">Finalizar Pedido</button>
                <button className="pedido-button pedido-button-limpar">Limpar Pedido</button>
              </div>

            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhum pedido cadastrado.</p>
        )}
      </ul>
    </div>
  );
};

export default PedidoLista;







