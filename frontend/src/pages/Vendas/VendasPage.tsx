import DeleteIcon from "@mui/icons-material/Delete";
import { forwardRef, useCallback, useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import type { JSX } from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { TableComponents } from "react-virtuoso";

import editarIcon from "../../assets/editar.png";
import { ActionButton } from "../../components/Buttons/ActionButton";
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

const tableComponents: TableComponents<Venda> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer
            component={Paper}
            elevation={0}
            {...props}
            ref={ref}
            sx={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                borderRadius: 0,
                boxShadow: "none",
                backgroundColor: "transparent",
            }}
        />
    )),
    Table: (props) => (
        <Table
            {...props}
            stickyHeader
            sx={{
                minWidth: 800,
                borderCollapse: "separate",
                tableLayout: "fixed",
            }}
            aria-label="Tabela de vendas"
        />
    ),
    TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function renderHeader(): JSX.Element {
    return (
        <TableRow>
            <TableCell align="left" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Nota Fiscal</Typography>
            </TableCell>

            <TableCell align="left" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Cliente</Typography>
            </TableCell>

            <TableCell align="left" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Vendedor</Typography>
            </TableCell>

            <TableCell align="center" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Data da Venda</Typography>
            </TableCell>

            <TableCell align="center" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Valor Total</Typography>
            </TableCell>

            <TableCell align="center" sx={headerCellSx}>
                <Typography sx={headerFontSx}>Opções</Typography>
            </TableCell>
        </TableRow>
    );
}

function renderVenda(_index: number, venda: Venda): JSX.Element {
    return (
        <>
            <TableCell align="left" sx={bodyCellSx}>
                {venda.numero_nota_fiscal}
            </TableCell>

            <TableCell align="left" sx={bodyCellSx}>
                {venda.cliente_nome}
            </TableCell>

            <TableCell align="left" sx={bodyCellSx}>
                {venda.vendedor_nome}
            </TableCell>

            <TableCell align="center" sx={bodyCellSx}>
                {formatarDataHora(venda.data_hora)}
            </TableCell>

            <TableCell align="center" sx={bodyCellSx}>
                <Typography>R$ {venda.valor_total}</Typography>
            </TableCell>

            <TableCell align="center" sx={bodyCellSx}>
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
            </TableCell>
        </>
    );
}

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
                <TableVirtuoso
                    data={vendas}
                    components={tableComponents}
                    fixedHeaderContent={renderHeader}
                    itemContent={renderVenda}
                    endReached={carregarProximaPagina}
                    increaseViewportBy={300}
                    style={{
                        height: "100%",
                    }}
                />
            </Box>

            {isLoadingMore && (
                <Box
                    sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress
                        size={24}
                        sx={{
                            color: "#00585E",
                        }}
                    />
                </Box>
            )}

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