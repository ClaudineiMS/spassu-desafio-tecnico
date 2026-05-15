import { useCallback, useEffect, useState } from "react";

import { listarVendas } from "../../../services/vendasService";
import type { Venda } from "../../../types/venda";

interface UseVendasResult {
    vendas: Venda[];
    isLoading: boolean;
    isLoadingMore: boolean;
    errorMessage: string | null;
    carregarProximaPagina: () => Promise<void>;
}

export function useVendas(): UseVendasResult {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const carregarPrimeiraPagina = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            setErrorMessage(null);

            const data = await listarVendas();

            setVendas(data.results);
            setNextPageUrl(data.next);
        } catch {
            setErrorMessage("Não foi possível carregar as vendas.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const carregarProximaPagina = useCallback(async (): Promise<void> => {
        if (!nextPageUrl || isLoadingMore) {
            return;
        }

        try {
            setIsLoadingMore(true);

            const data = await listarVendas(nextPageUrl);

            setVendas((currentVendas) => [
                ...currentVendas,
                ...data.results,
            ]);
            setNextPageUrl(data.next);
        } catch {
            setErrorMessage("Não foi possível carregar mais vendas.");
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, nextPageUrl]);

    useEffect(() => {
        carregarPrimeiraPagina();
    }, [carregarPrimeiraPagina]);

    return {
        vendas,
        isLoading,
        isLoadingMore,
        errorMessage,
        carregarProximaPagina,
    };
}