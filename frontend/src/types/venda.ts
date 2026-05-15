export interface ClienteResumo {
    id: number;
    nome: string;
    email?: string;
    telefone?: string
}

export interface VendedorResumo {
    id: number;
    nome: string;
    email?: string;
    telefone?: string
}

export interface ProdutoResumo {
    id: number;
    codigo: string;
    descricao: string;
    valor_unitario: string;
    percentual_comissao: string
}

export interface ItemVenda {
    id: number;
    produto: number;
    produto_descricao: string;
    quantidade: number;
    valor_unitario: string;
    percentual_comissao: string;
    valor_total: number;
}

export interface Venda {
    id: number;
    numero_nota_fiscal: string;
    data_hora: string;
    cliente: number;
    cliente_nome: string;
    vendedor: number;
    vendedor_nome: string;
    itens: ItemVenda[];
    valor_total: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}