import { api } from "./api/api";
import type { PaginatedResponse, Venda } from "../types/venda";

type VendasApiResponse = Venda[] | PaginatedResponse<Venda>;

export interface CriarItemVendaPayload {
    produto: number;
    quantidade: number;
}

export interface CriarVendaPayload {
    numero_nota_fiscal: string;
    data_hora: string;
    cliente: number;
    vendedor: number;
    itens: CriarItemVendaPayload[];
}

function isPaginatedResponse(
    data: VendasApiResponse,
): data is PaginatedResponse<Venda> {
    return !Array.isArray(data) && Array.isArray(data.results);
}

function normalizarUrl(url: string): string {
    if (!url.startsWith("http")) {
        return url;
    }

    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname.replace(/^\/api/, "");

    return `${pathname}${parsedUrl.search}`;
}

export async function listarVendas(
    url = "/vendas/",
): Promise<PaginatedResponse<Venda>> {
    const response = await api.get<VendasApiResponse>(normalizarUrl(url));

    if (isPaginatedResponse(response.data)) {
        return response.data;
    }

    return {
        count: response.data.length,
        next: null,
        previous: null,
        results: response.data,
    };
}

export async function criarVenda(
    payload: CriarVendaPayload,
): Promise<Venda> {
    const response = await api.post<Venda>("/vendas/", payload);

    return response.data;
}


export async function removerVenda(id: number): Promise<void> {
    await api.delete(`/vendas/${id}/`);
}

export async function atualizarVenda(
    id: number,
    payload: CriarVendaPayload,
): Promise<Venda> {
    const response = await api.put<Venda>(`/vendas/${id}/`, payload);

    return response.data;
}