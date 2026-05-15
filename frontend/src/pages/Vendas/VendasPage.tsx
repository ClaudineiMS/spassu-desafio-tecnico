import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import type { JSX } from "react";

import editarIcon from "../../assets/editar.png";
import { ActionButton } from "../../components/Buttons/ActionButton";
import { VirtualizedTable } from "../../components/DataTable/VirtualizedTable";
import type { VirtualizedTableColumn } from "../../components/DataTable/VirtualizedTable";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { listarVendas } from "../../services/vendasService";
import type { Venda } from "../../types/venda";

function formatarDataHora(dataHora: string): string {
    const data = new Date(dataHora);

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
    }).format(data);

    const horaFormatada = new Intl.DateTimeFormat("pt-BR", {
        timeStyle: "short",
    }).format(data);

    return `${dataFormatada} - ${horaFormatada}`;
}

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

const actionButtonSx = {
    color: "#00585E",
    fontWeight: 700,
    textTransform: "none",
    minWidth: "auto",
    p: 0,
    "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "underline",
    },
};

export function VendasPage(): JSX.Element {
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

    const columns = useMemo<VirtualizedTableColumn<Venda>[]>(
        () => [
            {
                key: "numero_nota_fiscal",
                label: "Nota Fiscal",
                width: "14%",
                render: (venda) => venda.numero_nota_fiscal,
            },
            {
                key: "cliente",
                label: "Cliente",
                width: "18%",
                render: (venda) => venda.cliente_nome,
            },
            {
                key: "vendedor",
                label: "Vendedor",
                width: "18%",
                render: (venda) => venda.vendedor_nome,
            },
            {
                key: "data_hora",
                label: "Data da Venda",
                align: "center",
                width: "18%",
                render: (venda) => formatarDataHora(venda.data_hora),
            },
            {
                key: "valor_total",
                label: "Valor Total",
                align: "center",
                width: "14%",
                render: (venda) => (
                    <Typography>
                        R$ {venda.valor_total}
                    </Typography>
                ),
            },
            {
                key: "opcoes",
                label: "Opções",
                align: "center",
                width: "18%",
                render: () => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: {
                                xs: 0.5,
                                sm: 1,
                                md: 1.5,
                            },
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Button
                            variant="text"
                            size="large"
                            sx={actionButtonSx}
                        >
                            Ver itens
                        </Button>

                        <Tooltip title="Editar venda">
                            <IconButton
                                aria-label="Editar venda"
                                size="small"
                                sx={{
                                    p: 0.5,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={editarIcon}
                                    alt="Editar venda"
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        display: "block",
                                        objectFit: "contain",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Excluir venda">
                            <IconButton
                                aria-label="Excluir venda"
                                size="small"
                                sx={{ color: "#C40000" }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        carregarPrimeiraPagina();
    }, [carregarPrimeiraPagina]);

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
                    rows={vendas}
                    columns={columns}
                    getRowKey={(venda) => venda.id}
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
                        mt: 3,
                    }}
                >
                    Nenhuma venda encontrada.
                </Alert>
            )}
        </Box>
    );
}