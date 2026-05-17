export interface ComissaoVendedor {
    id: number;
    nome: string;
    total_comissao: string;
    total_vendas?: number;
}

export interface ComissoesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ComissaoVendedor[];
    data_inicio: string;
    data_fim: string;
    total_geral: string;
}