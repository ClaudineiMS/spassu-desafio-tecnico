import { api } from "./api/api";

import type { PaginatedResponse, ProdutoResumo } from "../types/venda";

type ProdutosApiResponse = ProdutoResumo[] | PaginatedResponse<ProdutoResumo>;

function isPaginatedResponse(
    data: ProdutosApiResponse,
): data is PaginatedResponse<ProdutoResumo> {
    return !Array.isArray(data) && Array.isArray(data.results);
}

export async function listarProdutos(
    search?: string,
): Promise<PaginatedResponse<ProdutoResumo>> {
    const response = await api.get<ProdutosApiResponse>("/produtos/", {
        params: search ? { search } : undefined,
    });

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