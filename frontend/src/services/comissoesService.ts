import { api } from "./api/api";

import type { ComissoesResponse } from "../types/venda";

interface ListarComissoesParams {
    dataInicio: string;
    dataFim: string;
    page?: number;
}

export async function listarComissoes({
    dataInicio,
    dataFim,
    page = 1,
}: ListarComissoesParams): Promise<ComissoesResponse> {
    const response = await api.get<ComissoesResponse>("/comissoes/", {
        params: {
            data_inicio: dataInicio,
            data_fim: dataFim,
            page,
        },
    });

    return response.data;
}