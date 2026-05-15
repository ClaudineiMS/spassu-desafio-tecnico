import { Box, Button, TextField, Typography } from "@mui/material";
import type { JSX } from "react";

import {
    inputSx,
    primaryButtonSx,
    sectionTitleSx,
} from "../styles/saleFormStyles";
import { SaleItemsTable } from "./SaleItemsTable";

export function SaleProductSection(): JSX.Element {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                pr: {
                    xs: 0,
                    md: 4,
                },
                borderRight: {
                    xs: "none",
                    md: "1px solid #c7c7c7",
                },
            }}
        >
            <Typography component="h2" sx={sectionTitleSx}>
                Produtos
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 170px 110px",
                    },
                    gap: 2,
                    alignItems: "end",
                    mb: {
                        xs: 6,
                        md: 7,
                    },
                }}
            >
                <Box>
                    <Typography
                        component="label"
                        sx={{
                            display: "block",
                            mb: 1,
                            fontSize: "14px",
                        }}
                    >
                        Buscar pelo código de barras ou descrição
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Digite o código ou nome do produto"
                        sx={inputSx}
                    />
                </Box>

                <Box>
                    <Typography
                        component="label"
                        sx={{
                            display: "block",
                            mb: 1,
                            fontSize: "14px",
                        }}
                    >
                        Quantidade de itens
                    </Typography>

                    <TextField
                        fullWidth
                        type="number"
                        defaultValue={0}
                        sx={inputSx}
                    />
                </Box>

                <Button variant="contained" sx={primaryButtonSx}>
                    Adicionar
                </Button>
            </Box>

            <SaleItemsTable />
        </Box>
    );
}