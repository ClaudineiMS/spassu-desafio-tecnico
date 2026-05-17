import { Box } from "@mui/material";
import type { JSX } from "react";

import { ErrorState } from "../components/ErrorState/ErrorState";
import { LoadingState } from "../components/LoadingState/LoadingState";
import { SaleDataSection } from "../components/SaleDataSection/SaleDataSection";
import { SaleProductSection } from "../components/SaleProductSection/SaleProductSection";
import { useSaleForm } from "./useSaleForm";
import type { Venda } from "../types/sales";

interface SaleFormPageProps {
    onCancel: () => void;
    onSaleCreated: () => void;
    initialSale?: Venda | null;
    onSaleUpdated: () => void;
}

export function SaleFormPage({
    onCancel,
    onSaleCreated,
    initialSale = null,
    onSaleUpdated,
}: SaleFormPageProps): JSX.Element {
    const {
        quantity,
        saleDate,
        products,
        clients,
        sellers,
        saleItems,
        totalValue,
        canSubmit,
        isLoadingInitialData,
        isSubmitting,
        errorMessage,
        clientSearchTerm,
        setQuantity,
        setSaleDate,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
        isEditing,
        selectedClient,
        handleClientChange,
        handleClientSearchChange,
        selectedSeller,
        sellerSearchTerm,
        handleSellerChange,
        handleSellerSearchChange,
        productSearchTerm,
        selectedProduct,
        handleProductChange,
        handleProductSearchChange,
    } = useSaleForm({ initialSale });

    async function handleFinalizeSale(): Promise<void> {
        const wasSaved = await handleSubmit();

        if (!wasSaved) {
            return;
        }

        if (isEditing) {
            onSaleUpdated();
            return;
        }

        onSaleCreated();
    }

    if (isLoadingInitialData) {
        return <LoadingState message="Carregando dados da venda..." />;
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
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "2fr 1.15fr",
                },
                gap: {
                    xs: 4,
                    md: 5,
                },
                color: "#111111",
            }}
        >
            <SaleProductSection
                productSearchTerm={productSearchTerm}
                quantity={quantity}
                selectedProduct={selectedProduct}
                products={products}
                saleItems={saleItems}
                onProductSearchChange={handleProductSearchChange}
                onQuantityChange={setQuantity}
                onProductChange={handleProductChange}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
            />

            <SaleDataSection
                saleDate={saleDate}
                selectedClient={selectedClient}
                selectedSeller={selectedSeller}
                clients={clients}
                sellers={sellers}
                totalValue={totalValue}
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
                clientSearchTerm={clientSearchTerm}
                sellerSearchTerm={sellerSearchTerm}
                onSaleDateChange={setSaleDate}
                onClientChange={handleClientChange}
                onClientSearchChange={handleClientSearchChange}
                onSellerChange={handleSellerChange}
                onSellerSearchChange={handleSellerSearchChange}
                onCancel={onCancel}
                onSubmit={handleFinalizeSale}
            />
        </Box>
    );
}