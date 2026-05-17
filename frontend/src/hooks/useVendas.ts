import { useCallback, useEffect, useState } from "react";

import {
    listarVendas,
    removerVenda,
} from "../services/vendasService";
import type { Venda } from "../types/sales";

interface UseVendasResult {
    vendas: Venda[];
    isLoading: boolean;
    isLoadingMore: boolean;
    isDeleting: boolean;
    errorMessage: string | null;
    deleteErrorMessage: string | null;
    selectedVendaIdToDelete: number | null;
    carregarProximaPagina: () => Promise<void>;
    openDeleteDialog: (vendaId: number) => void;
    closeDeleteDialog: () => void;
    handleDeleteSale: () => Promise<boolean>;
}

export function useVendas(): UseVendasResult {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
        null,
    );
    const [selectedVendaIdToDelete, setSelectedVendaIdToDelete] = useState<
        number | null
    >(null);

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

    function openDeleteDialog(vendaId: number): void {
        setSelectedVendaIdToDelete(vendaId);
        setDeleteErrorMessage(null);
    }

    function closeDeleteDialog(): void {
        if (isDeleting) {
            return;
        }

        setSelectedVendaIdToDelete(null);
    }

    async function handleDeleteSale(): Promise<boolean> {
        if (!selectedVendaIdToDelete) {
            return false;
        }

        try {
            setIsDeleting(true);
            setDeleteErrorMessage(null);

            await removerVenda(selectedVendaIdToDelete);

            setVendas((currentVendas) => (
                currentVendas.filter(
                    (venda) => venda.id !== selectedVendaIdToDelete,
                )
            ));

            setSelectedVendaIdToDelete(null);

            return true;
        } catch {
            setDeleteErrorMessage("Não foi possível remover a venda.");
            return false;
        } finally {
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        carregarPrimeiraPagina();
    }, [carregarPrimeiraPagina]);

    return {
        vendas,
        isLoading,
        isLoadingMore,
        isDeleting,
        errorMessage,
        deleteErrorMessage,
        selectedVendaIdToDelete,
        carregarProximaPagina,
        openDeleteDialog,
        closeDeleteDialog,
        handleDeleteSale,
    };
}