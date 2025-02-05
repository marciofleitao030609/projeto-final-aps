//import { ReactNode } from "react";
import { create } from "zustand";



interface Pedido {
  id: number;
  cliente: string;
  endereco: string;
  telefone: string;
  bairro: string;
  itens: {
    sabor: string;
    tamanho: string;
    quantidade: number;
    precoTotal: number;
  }[]; // Agora o pedido contém um array de itens
  precoTotal: number;
}


interface PedidoState {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Pedido) => void;
  editarPedido: (id: number, novoPedido: Pedido) => void;
  removerPedido: (id: number) => void; // Função de deletar
}

export const usePedidoStore = create<PedidoState>((set) => ({
  pedidos: [],
  adicionarPedido: (pedido) => set((state) => ({ pedidos: [...state.pedidos, pedido] })),
  editarPedido: (id, novoPedido) =>
    set((state) => ({
      pedidos: state.pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, ...novoPedido } : pedido
      ),
    })),
  removerPedido: (id) =>
    set((state) => ({
      pedidos: state.pedidos.filter((pedido) => pedido.id !== id), // Remove o pedido com o id correspondente
    })),
}));
