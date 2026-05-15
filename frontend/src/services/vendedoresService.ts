import { api } from "./api/api";

import type { PaginatedResponse, VendedorResumo } from "../types/venda";

type VendedoresApiResponse = VendedorResumo[] | PaginatedResponse<VendedorResumo>;

function isPaginatedResponse(
    data: VendedoresApiResponse,
): data is PaginatedResponse<VendedorResumo> {
    return !Array.isArray(data) && Array.isArray(data.results);
}

export async function listarVendedores(): Promise<PaginatedResponse<VendedorResumo>> {
    const response = await api.get<VendedoresApiResponse>("/vendedores/");

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