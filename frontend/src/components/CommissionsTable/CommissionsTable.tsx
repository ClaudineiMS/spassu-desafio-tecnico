import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

import { VirtualizedTable } from "../DataTable/VirtualizedTable";
import type { VirtualizedTableColumn } from "../DataTable/VirtualizedTable";
import type { ComissaoVendedor } from "../../types/sales";
import { formatCurrency } from "../../utils/commissionFormatters";
import {
    commissionBodyCellSx,
    commissionFooterSx,
    commissionHeaderCellSx,
    commissionHeaderTextSx,
} from "../../styles/commissionsPageStyles";

interface CommissionsTableProps {
    sellers: ComissaoVendedor[];
    totalGeneral: string;
}

export function CommissionsTable({
    sellers,
    totalGeneral,
}: CommissionsTableProps): JSX.Element {
    const columns: VirtualizedTableColumn<ComissaoVendedor>[] = [
        {
            key: "id",
            label: "Cód.",
            width: "12%",
            render: (seller) => seller.id,
        },
        {
            key: "nome",
            label: "Vendedor",
            width: "38%",
            render: (seller) => seller.nome,
        },
        {
            key: "total_vendas",
            label: "Total de Vendas",
            align: "center",
            width: "25%",
            render: (seller) => seller.total_vendas ?? "-",
        },
        {
            key: "total_comissao",
            label: "Total de Comissões",
            align: "right",
            width: "25%",
            render: (seller) => formatCurrency(seller.total_comissao),
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "none",
            }}
        >
            <Box
                sx={{
                    height: Math.min(56 + sellers.length * 52, 320),
                    width: "100%",
                }}
            >
                <VirtualizedTable
                    rows={sellers}
                    columns={columns}
                    getRowKey={(seller) => seller.id}
                    ariaLabel="Tabela de comissões"
                    minWidth={720}
                    headerCellSx={commissionHeaderCellSx}
                    bodyCellSx={commissionBodyCellSx}
                    headerTextSx={commissionHeaderTextSx}
                />
            </Box>

            <Box sx={commissionFooterSx}>
                <Typography
                    sx={{
                        gridColumn: {
                            xs: "1 / 2",
                            md: "1 / 4",
                        },
                        fontSize: "18px",
                        fontWeight: 700,
                    }}
                >
                    Total de Comissões do Período
                </Typography>

                <Typography
                    align="right"
                    sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                    }}
                >
                    {formatCurrency(totalGeneral)}
                </Typography>
            </Box>
        </Box>
    );
}