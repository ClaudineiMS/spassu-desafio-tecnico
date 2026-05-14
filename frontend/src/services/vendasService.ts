import { api } from "./api/api";
import type { PaginatedResponse, Venda } from "../types/venda";

type VendasApiResponse = Venda[] | PaginatedResponse<Venda>;

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