import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Autocomplete
} from "@mui/material";
import type { JSX } from "react";

import type { ClienteResumo, VendedorResumo, } from "../../../types/venda";
import {
    inputSx,
    primaryButtonSx,
    sectionTitleSx,
    submitButtonSx
} from "../styles/saleFormStyles";

interface SaleDataSectionProps {
    saleDate: string;
    selectedClient: ClienteResumo | null;
    selectedSeller: VendedorResumo | null;
    clients: ClienteResumo[];
    sellers: VendedorResumo[];
    totalValue: number;
    canSubmit: boolean;
    isSubmitting: boolean;
    isEditing: boolean;
    clientSearchTerm: string;
    sellerSearchTerm: string;
    onSaleDateChange: (value: string) => void;
    onClientChange: (value: ClienteResumo | null) => void;
    onClientSearchChange: (value: string) => void;
    onSellerChange: (value: VendedorResumo | null) => void;
    onSellerSearchChange: (value: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function SaleDataSection({
    saleDate,
    selectedClient,
    selectedSeller,
    clients,
    sellers,
    totalValue,
    canSubmit,
    isSubmitting,
    isEditing,
    clientSearchTerm,
    sellerSearchTerm,
    onSaleDateChange,
    onClientChange,
    onClientSearchChange,
    onSellerChange,
    onSellerSearchChange,
    onCancel,
    onSubmit,
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

                    <Autocomplete
                        options={sellers}
                        value={selectedSeller}
                        inputValue={sellerSearchTerm}
                        getOptionLabel={(seller) => `${seller.id} - ${seller.nome}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onInputChange={(_, value, reason) => {
                            if (reason === "input") {
                                onSellerSearchChange(value);
                            }

                            if (reason === "clear") {
                                onSellerChange(null);
                            }
                        }}
                        onChange={(_, value) => {
                            onSellerChange(value);
                        }}
                        noOptionsText="Nenhum vendedor encontrado"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Selecione o nome"
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
                        Escolha um cliente
                    </Typography>

                    <Autocomplete
                        options={clients}
                        value={selectedClient}
                        inputValue={clientSearchTerm}
                        getOptionLabel={(client) => `${client.id} - ${client.nome}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onInputChange={(_, value, reason) => {
                            if (reason === "input") {
                                onClientSearchChange(value);
                            }

                            if (reason === "clear") {
                                onClientChange(null);
                            }
                        }}
                        onChange={(_, value) => {
                            onClientChange(value);
                        }}
                        noOptionsText="Nenhum cliente encontrado"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Selecione o nome"
                                sx={inputSx}
                            />
                        )}
                    />
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