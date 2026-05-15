import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import type { JSX } from "react";

import type { ClienteResumo, VendedorResumo } from "../../../types/venda";
import {
    inputSx,
    primaryButtonSx,
    sectionTitleSx,
    submitButtonSx
} from "../styles/saleFormStyles";

interface SaleDataSectionProps {
    saleDate: string;
    selectedClientId: number | "";
    selectedSellerId: number | "";
    clients: ClienteResumo[];
    sellers: VendedorResumo[];
    totalValue: number;
    canSubmit: boolean;
    isSubmitting: boolean;
    onSaleDateChange: (value: string) => void;
    onClientChange: (value: number | "") => void;
    onSellerChange: (value: number | "") => void;
    onCancel: () => void;
    onSubmit: () => void;
    isEditing: boolean;
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function SaleDataSection({
    saleDate,
    selectedClientId,
    selectedSellerId,
    clients,
    sellers,
    totalValue,
    canSubmit,
    isSubmitting,
    onSaleDateChange,
    onClientChange,
    onSellerChange,
    onCancel,
    onSubmit,
    isEditing,
}: SaleDataSectionProps): JSX.Element {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
            }}
        >
            <Typography component="h2" sx={sectionTitleSx}>
                Dados da venda
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
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
                        Data e Hora da Venda
                    </Typography>

                    <TextField
                        fullWidth
                        type="datetime-local"
                        value={saleDate}
                        onChange={(event) => {
                            onSaleDateChange(event.target.value);
                        }}
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
                        Escolha um vendedor
                    </Typography>

                    <TextField
                        select
                        fullWidth
                        value={selectedSellerId}
                        onChange={(event) => {
                            onSellerChange(Number(event.target.value));
                        }}
                        sx={inputSx}
                    >
                        <MenuItem value="" disabled>
                            Selecione o nome
                        </MenuItem>

                        {sellers.map((seller) => (
                            <MenuItem
                                key={seller.id}
                                value={seller.id}
                            >
                                {seller.id} - {seller.nome}
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
                        Escolha um cliente
                    </Typography>

                    <TextField
                        select
                        fullWidth
                        value={selectedClientId}
                        onChange={(event) => {
                            onClientChange(Number(event.target.value));
                        }}
                        sx={inputSx}
                    >
                        <MenuItem value="" disabled>
                            Selecione o nome
                        </MenuItem>

                        {clients.map((client) => (
                            <MenuItem
                                key={client.id}
                                value={client.id}
                            >
                                {client.id} - {client.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: "auto",
                    pt: {
                        xs: 6,
                        md: 0,
                    },
                }}
            >
                <Box
                    sx={{
                        mb: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 700,
                        }}
                    >
                        Valor total da venda:
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "26px",
                                md: "30px",
                            },
                            fontWeight: 700,
                        }}
                    >
                        {formatCurrency(totalValue)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={onCancel}
                        sx={primaryButtonSx}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        disabled={!canSubmit || isSubmitting}
                        onClick={onSubmit}
                        sx={submitButtonSx}
                    >
                        {isSubmitting
                            ? "Finalizando..."
                            : isEditing
                                ? "Atualizar"
                                : "Finalizar"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}