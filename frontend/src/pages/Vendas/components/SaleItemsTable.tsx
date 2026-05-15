import DeleteIcon from "@mui/icons-material/Delete";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { JSX } from "react";

import type { SaleItem } from "../hooks/useSaleForm";

interface SaleItemsTableProps {
    items: SaleItem[];
    onRemoveItem: (productId: number) => void;
}

function formatCurrency(value: number | string): string {
    const numericValue = Number(String(value).replace(",", "."));

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(numericValue);
}

function calculateItemTotal(item: SaleItem): number {
    return Number(item.produto.valor_unitario) * item.quantidade;
}

export function SaleItemsTable({
    items,
    onRemoveItem,
}: SaleItemsTableProps): JSX.Element {
    return (
        <Box
            sx={{
                overflowX: {
                    xs: "auto",
                    md: "visible",
                },
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1.5fr 1fr 1fr 1fr 48px",
                        md: "2fr 1fr 1fr 1fr 48px",
                    },
                    gap: 2,
                    minWidth: {
                        xs: 760,
                        md: "auto",
                    },
                }}
            >
                <Typography sx={{ fontWeight: 700 }}>
                    Produtos/Serviço
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    Quantidade
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    Preço unitário
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    Total
                </Typography>

                <Box />

                {items.map((item) => (
                    <Box
                        key={item.produto.id}
                        sx={{
                            display: "contents",
                        }}
                    >
                        <Typography>
                            {item.produto.codigo} - {item.produto.descricao}
                        </Typography>

                        <Typography align="center">
                            {item.quantidade}
                        </Typography>

                        <Typography align="center">
                            {formatCurrency(item.produto.valor_unitario)}
                        </Typography>

                        <Typography align="center">
                            {formatCurrency(calculateItemTotal(item))}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Tooltip title="Remover item">
                                <IconButton
                                    aria-label="Remover item"
                                    size="small"
                                    onClick={() => onRemoveItem(item.produto.id)}
                                    sx={{
                                        color: "#C40000",
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}