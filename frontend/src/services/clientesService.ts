import { api } from "./api/api";

import type { ClienteResumo, PaginatedResponse } from "../types/venda";

type ClientesApiResponse = ClienteResumo[] | PaginatedResponse<ClienteResumo>;

function isPaginatedResponse(
    data: ClientesApiResponse,
): data is PaginatedResponse<ClienteResumo> {
    return !Array.isArray(data) && Array.isArray(data.results);
}

export async function listarClientes(): Promise<PaginatedResponse<ClienteResumo>> {
    const response = await api.get<ClientesApiResponse>("/clientes/");

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