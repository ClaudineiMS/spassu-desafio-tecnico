import type { Dayjs } from "dayjs";
import { useState } from "react";

import { listarComissoes } from "../services/comissoesService";
import type { ComissaoVendedor } from "../types/sales";

interface UseCommissionsReportResult {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    sellers: ComissaoVendedor[];
    totalGeneral: string;
    hasSearched: boolean;
    isLoading: boolean;
    errorMessage: string | null;
    canSearch: boolean;
    setStartDate: (value: Dayjs | null) => void;
    setEndDate: (value: Dayjs | null) => void;
    handleSearch: () => Promise<void>;
}

export function useCommissionsReport(): UseCommissionsReportResult {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [sellers, setSellers] = useState<ComissaoVendedor[]>([]);
    const [totalGeneral, setTotalGeneral] = useState("0.00");
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const canSearch = Boolean(startDate && endDate);

    async function handleSearch(): Promise<void> {
        if (!startDate || !endDate) {
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage(null);
            setHasSearched(true);

            const data = await listarComissoes({
                dataInicio: startDate.format("YYYY-MM-DD"),
                dataFim: endDate.format("YYYY-MM-DD"),
            });

            setSellers(data.results);
            setTotalGeneral(data.total_geral);
        } catch {
            setErrorMessage("Não foi possível carregar as comissões.");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        startDate,
        endDate,
        sellers,
        totalGeneral,
        hasSearched,
        isLoading,
        errorMessage,
        canSearch,
        setStartDate,
        setEndDate,
        handleSearch,
    };
}