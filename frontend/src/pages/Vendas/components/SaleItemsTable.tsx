import { Box, Typography } from "@mui/material";
import type { JSX } from "react";

export function SaleItemsTable(): JSX.Element {
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
                        xs: "1.5fr 1fr 1fr 1fr",
                        md: "2fr 1fr 1fr 1fr",
                    },
                    gap: 2,
                    minWidth: {
                        xs: 720,
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
            </Box>
        </Box>
    );
}