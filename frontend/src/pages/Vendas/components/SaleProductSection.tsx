import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProdutoResumo } from "../../../types/venda";
import type { SaleItem } from "../hooks/useSaleForm";
import {
    inputSx,
    primaryButtonSx,
    sectionTitleSx,
} from "../styles/saleFormStyles";
import { SaleItemsTable } from "./SaleItemsTable";

interface SaleProductSectionProps {
    searchTerm: string;
    quantity: number;
    selectedProductId: number | "";
    products: ProdutoResumo[];
    saleItems: SaleItem[];
    onSearchTermChange: (value: string) => void;
    onQuantityChange: (value: number) => void;
    onProductSelect: (value: number | "") => void;
    onAddItem: () => void;
    onRemoveItem: (productId: number) => void;
}

export function SaleProductSection({
    searchTerm,
    quantity,
    selectedProductId,
    products,
    saleItems,
    onSearchTermChange,
    onQuantityChange,
    onProductSelect,
    onAddItem,
    onRemoveItem,
}: SaleProductSectionProps): JSX.Element {
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
                        select
                        fullWidth
                        value={selectedProductId}
                        placeholder="Digite o código ou nome do produto"
                        onChange={(event) => {
                            onProductSelect(Number(event.target.value));
                        }}
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;

                            onSearchTermChange(target.value);
                        }}
                        sx={inputSx}
                    >
                        <MenuItem value="" disabled>
                            {searchTerm || "Digite o código ou nome do produto"}
                        </MenuItem>

                        {products.map((product) => (
                            <MenuItem
                                key={product.id}
                                value={product.id}
                            >
                                {product.codigo} - {product.descricao}
                            </MenuItem>
                        ))}
                    </TextField>
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
                        value={quantity}
                        onChange={(event) => {
                            onQuantityChange(Number(event.target.value));
                        }}
                        sx={inputSx}
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={onAddItem}
                    sx={primaryButtonSx}
                >
                    Adicionar
                </Button>
            </Box>

            <SaleItemsTable
                items={saleItems}
                onRemoveItem={onRemoveItem}
            />
        </Box>
    );
}