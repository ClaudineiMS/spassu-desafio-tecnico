import { Autocomplete, Box, Button, MenuItem, TextField, Typography } from "@mui/material";
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
    productSearchTerm: string;
    quantity: number;
    selectedProduct: ProdutoResumo | null;
    products: ProdutoResumo[];
    saleItems: SaleItem[];
    onProductSearchChange: (value: string) => void;
    onQuantityChange: (value: number) => void;
    onProductChange: (value: ProdutoResumo | null) => void;
    onAddItem: () => void;
    onRemoveItem: (productId: number) => void;
}

export function SaleProductSection({
    productSearchTerm,
    quantity,
    selectedProduct,
    products,
    saleItems,
    onProductSearchChange,
    onQuantityChange,
    onProductChange,
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

                    <Autocomplete
                        options={products}
                        value={selectedProduct}
                        inputValue={productSearchTerm}
                        getOptionLabel={(product) => (
                            `${product.codigo} - ${product.descricao}`
                        )}
                        isOptionEqualToValue={(option, value) => (
                            option.id === value.id
                        )}
                        onInputChange={(_, value, reason) => {
                            if (reason === "input") {
                                onProductSearchChange(value);
                            }

                            if (reason === "clear") {
                                onProductChange(null);
                            }
                        }}
                        onChange={(_, value) => {
                            onProductChange(value);
                        }}
                        noOptionsText="Nenhum produto encontrado"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Digite o código ou nome do produto"
                                sx={inputSx}
                            />
                        )}
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