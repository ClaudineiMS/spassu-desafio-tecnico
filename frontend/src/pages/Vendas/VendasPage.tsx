import { useMemo, useState } from "react";

import { Alert, Box, Typography } from "@mui/material";
import type { JSX } from "react";

import { ActionButton } from "../../components/Buttons/ActionButton";
import { VirtualizedTable } from "../../components/DataTable/VirtualizedTable";
import type { VirtualizedTableColumn } from "../../components/DataTable/VirtualizedTable";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import type { Venda } from "../../types/venda";
import { VendaDetails } from "./components/VendaDetails";
import { VendaRowActions } from "./components/VendaRowActions";
import { useVendas } from "./hooks/useVendas";
import {
    formatarDataHora,
    formatarMoeda,
} from "./utils/vendasFormatters";
import { FeedbackToast } from "../../components/FeedbackToast/FeedbackToast";
import { DeleteSaleDialog } from "./components/DeleteSaleDialog";


interface VendasPageProps {
    onCreateSale: () => void;
    onEditSale: (venda: Venda) => void;
    feedbackMessage?: string | null;
    onClearFeedback?: () => void;
    onShowFeedback?: (message: string) => void;
}

type VendaTableRow =
    | {
        type: "venda";
        venda: Venda;
    }
    | {
        type: "detalhes";
        venda: Venda;
    };

const bodyCellSx = {
    borderBottom: "1px solid #8A8A8A",
};

const headerCellSx = {
    ...bodyCellSx,
    backgroundColor: "#f7f7f7",
};

const headerFontSx = {
    fontWeight: "bold",
};

export function VendasPage({
    onCreateSale,
    onEditSale,
    feedbackMessage,
    onClearFeedback,
    onShowFeedback,
}: VendasPageProps): JSX.Element {
    const [expandedVendaId, setExpandedVendaId] = useState<number | null>(null);

    const {
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
    } = useVendas();

    function handleToggleDetails(vendaId: number): void {
        setExpandedVendaId((currentId) => (
            currentId === vendaId ? null : vendaId
        ));
    }

    const tableRows = useMemo<VendaTableRow[]>(() => {
        return vendas.flatMap((venda) => {
            const rows: VendaTableRow[] = [
                {
                    type: "venda",
                    venda,
                },
            ];

            if (expandedVendaId === venda.id) {
                rows.push({
                    type: "detalhes",
                    venda,
                });
            }

            return rows;
        });
    }, [vendas, expandedVendaId]);

    async function handleConfirmDeleteSale(): Promise<void> {
        const wasDeleted = await handleDeleteSale();

        if (wasDeleted) {
            onShowFeedback?.("VENDA REMOVIDA COM SUCESSO!");
        }
    }

    const columns = useMemo<VirtualizedTableColumn<VendaTableRow>[]>(
        () => [
            {
                key: "numero_nota_fiscal",
                label: "Nota Fiscal",
                width: "14%",
                colSpan: (row) => row.type === "detalhes" ? 6 : 1,
                render: (row) => {
                    if (row.type === "detalhes") {
                        return <VendaDetails venda={row.venda} />;
                    }

                    return row.venda.numero_nota_fiscal;
                },
            },
            {
                key: "cliente",
                label: "Cliente",
                width: "18%",
                hidden: (row) => row.type === "detalhes",
                render: (row) => row.venda.cliente_nome,
            },
            {
                key: "vendedor",
                label: "Vendedor",
                width: "18%",
                hidden: (row) => row.type === "detalhes",
                render: (row) => row.venda.vendedor_nome,
            },
            {
                key: "data_hora",
                label: "Data da Venda",
                align: "center",
                width: "18%",
                hidden: (row) => row.type === "detalhes",
                render: (row) => formatarDataHora(row.venda.data_hora),
            },
            {
                key: "valor_total",
                label: "Valor Total",
                align: "center",
                width: "14%",
                hidden: (row) => row.type === "detalhes",
                render: (row) => (
                    <Typography>
                        {formatarMoeda(row.venda.valor_total)}
                    </Typography>
                ),
            },
            {
                key: "opcoes",
                label: "Opções",
                align: "center",
                width: "18%",
                hidden: (row) => row.type === "detalhes",
                render: (row) => (
                    <VendaRowActions
                        venda={row.venda}
                        isExpanded={expandedVendaId === row.venda.id}
                        onToggleDetails={handleToggleDetails}
                        onDeleteSale={openDeleteDialog}
                        onEditSale={onEditSale}
                    />
                ),
            },
        ],
        [expandedVendaId],
    );

    if (isLoading) {
        return <LoadingState message="Carregando vendas..." />;
    }

    if (errorMessage) {
        return <ErrorState message={errorMessage} />;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: {
                        xs: "stretch",
                        sm: "center",
                    },
                    justifyContent: "space-between",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    gap: 2,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        fontSize: {
                            xs: "22px",
                            sm: "26px",
                            md: "30px",
                        },
                        fontWeight: 700,
                        color: "#00585E",
                    }}
                >
                    Vendas Realizadas
                </Typography>

                <ActionButton
                    title="Inserir nova Venda"
                    backgroundColor="#00585E"
                    hoverColor="#004A50"
                    onClick={onCreateSale}
                />
            </Box>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    width: "100%",
                }}
            >
                <VirtualizedTable
                    rows={tableRows}
                    columns={columns}
                    getRowKey={(row) => `${row.type}-${row.venda.id}`}
                    ariaLabel="Tabela de vendas"
                    minWidth={800}
                    isLoadingMore={isLoadingMore}
                    onEndReached={carregarProximaPagina}
                    headerCellSx={headerCellSx}
                    bodyCellSx={bodyCellSx}
                    headerTextSx={headerFontSx}
                />
            </Box>

            {!vendas.length && (
                <Alert
                    severity="info"
                    sx={{
                        position: "absolute",
                        top: {
                            sm: 300,
                        },
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: {
                            xs: "calc(100% - 32px)",
                            sm: 500,
                        },
                        justifyContent: "center",
                    }}
                >
                    Nenhuma venda encontrada.
                </Alert>
            )}

            <FeedbackToast
                open={Boolean(feedbackMessage)}
                message={feedbackMessage ?? ""}
                onClose={() => {
                    onClearFeedback?.();
                }}
            />

            <DeleteSaleDialog
                open={selectedVendaIdToDelete !== null}
                isDeleting={isDeleting}
                onClose={closeDeleteDialog}
                onConfirm={handleConfirmDeleteSale}
            />

            {deleteErrorMessage && (
                <Alert
                    severity="error"
                    sx={{
                        mt: 2,
                    }}
                >
                    {deleteErrorMessage}
                </Alert>
            )}
        </Box>
    );
}