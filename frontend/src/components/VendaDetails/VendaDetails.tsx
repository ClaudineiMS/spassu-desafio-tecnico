import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

import type { Venda } from "../../types/venda";
import {
    calcularComissaoItem,
    calcularQuantidadeTotal,
    calcularTotalComissao,
    obterDescricaoProduto,
} from "../../utils/vendasCalculations";
import {
    formatarMoeda,
    formatarPercentual,
} from "../../utils/vendasFormatters";

interface VendaDetailsProps {
    venda: Venda;
}

const detailsGridSx = {
    display: "grid",
    gridTemplateColumns: {
        xs: "1fr",
        md: "2fr 1fr 1fr 1fr 1fr 1fr",
    },
    gap: {
        xs: 1,
        md: 2,
    },
    alignItems: "center",
};

export function VendaDetails({ venda }: VendaDetailsProps): JSX.Element {
    const quantidadeTotal = calcularQuantidadeTotal(venda);
    const totalComissao = calcularTotalComissao(venda);

    return (
        <Box
            sx={{
                px: 1,
                py: 3,
            }}
        >
            <Box
                sx={{
                    ...detailsGridSx,
                    gap: {
                        xs: 1.5,
                        md: 2,
                    },
                    mb: 2,
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
                    Total do Produto
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    % de Comissão
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    Comissão
                </Typography>
            </Box>

            {venda.itens.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        ...detailsGridSx,
                        py: 1,
                    }}
                >
                    <Typography>
                        {obterDescricaoProduto(item)}
                    </Typography>

                    <Typography align="center">
                        {item.quantidade}
                    </Typography>

                    <Typography align="center">
                        {formatarMoeda(item.valor_unitario)}
                    </Typography>

                    <Typography align="center">
                        {formatarMoeda(item.valor_total)}
                    </Typography>

                    <Typography align="center">
                        {formatarPercentual(item.percentual_comissao_aplicado)}
                    </Typography>

                    <Typography align="center">
                        {formatarMoeda(calcularComissaoItem(item))}
                    </Typography>
                </Box>
            ))}

            <Box
                sx={{
                    ...detailsGridSx,
                    pt: 2,
                    mt: 1,
                    color: "#003F43",
                }}
            >
                <Typography sx={{ fontWeight: 700 }}>
                    Total da Venda
                </Typography>

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    {quantidadeTotal}
                </Typography>

                <Box />

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    {formatarMoeda(venda.valor_total)}
                </Typography>

                <Box />

                <Typography align="center" sx={{ fontWeight: 700 }}>
                    {formatarMoeda(totalComissao)}
                </Typography>
            </Box>
        </Box>
    );
}