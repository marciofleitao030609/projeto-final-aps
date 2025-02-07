export interface Cliente {
    id: number;
    nome: string;
    telefone: string;
    endereco: string;
  }
  
  export interface Pizza {
    id: number;
    nome: string;
    ingredientes: string;
    tamanho: "média" | "grande" | "gigante";
    preco: number;
  }
  
  export interface Pedido {
    id: number;
    cliente: string;
    pizza: string;
    quantidade: number;
    status: string;
  }
  