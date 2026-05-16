import {
    Box,
    Typography,
} from "@mui/material";
import type { JSX } from "react";

import { CommissionFilters } from "../../components/CommissionFilters/CommissionFilters";
import { PageMessage } from "../../components/PageMessage/PageMessage";
import { CommissionsTable } from "../../components/CommissionsTable/CommissionsTable";
import { useCommissionsReport } from "../../hooks/useCommissionsReport";
import {
    pageContainerSx,
    pageHeaderSx,
    pageTitleSx,
} from "../../styles/commissionsPageStyles";

export function CommissionsPage(): JSX.Element {
    const {
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
    } = useCommissionsReport();

    return (
        <Box sx={pageContainerSx}>
            <Box sx={pageHeaderSx}>
                <Typography component="h2" sx={pageTitleSx}>
                    Relatório de Comissões
                </Typography>

                <CommissionFilters
                    startDate={startDate}
                    endDate={endDate}
                    canSearch={canSearch}
                    isLoading={isLoading}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onSearch={handleSearch}
                />
            </Box>

            {errorMessage && (
                <PageMessage
                    message={errorMessage}
                    severity="error"
                />
            )}

            {!hasSearched && (
                <PageMessage
                    message="Para visualizar o relatório, selecione um período nos campos acima."
                    variant="text"
                    centerVertical
                />
            )}

            {hasSearched && !isLoading && !sellers.length && (
                <PageMessage
                    message="Nenhuma comissão encontrada para o período selecionado."
                    severity="info"
                />
            )}

            {hasSearched && sellers.length > 0 && (
                <CommissionsTable
                    sellers={sellers}
                    totalGeneral={totalGeneral}
                />
            )}
        </Box>
    );
}