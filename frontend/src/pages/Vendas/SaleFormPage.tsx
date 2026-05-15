import { Box } from "@mui/material";
import type { JSX } from "react";

import { ErrorState } from "../../components/ErrorState/ErrorState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { SaleDataSection } from "./components/SaleDataSection";
import { SaleProductSection } from "./components/SaleProductSection";
import { useSaleForm } from "./hooks/useSaleForm";

interface SaleFormPageProps {
    onCancel: () => void;
    onSaleCreated: () => void;
}

export function SaleFormPage({
    onCancel,
    onSaleCreated,
}: SaleFormPageProps): JSX.Element {
    const {
        searchTerm,
        quantity,
        selectedProductId,
        selectedClientId,
        selectedSellerId,
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
        setSearchTerm,
        setQuantity,
        setSelectedProductId,
        setSelectedClientId,
        setSelectedSellerId,
        setSaleDate,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
    } = useSaleForm();

    async function handleFinalizeSale(): Promise<void> {
        const wasCreated = await handleSubmit();

        if (wasCreated) {
            onSaleCreated();
        }
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
                searchTerm={searchTerm}
                quantity={quantity}
                selectedProductId={selectedProductId}
                products={products}
                saleItems={saleItems}
                onSearchTermChange={setSearchTerm}
                onQuantityChange={setQuantity}
                onProductSelect={setSelectedProductId}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
            />

            <SaleDataSection
                saleDate={saleDate}
                selectedClientId={selectedClientId}
                selectedSellerId={selectedSellerId}
                clients={clients}
                sellers={sellers}
                totalValue={totalValue}
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
                onSaleDateChange={setSaleDate}
                onClientChange={setSelectedClientId}
                onSellerChange={setSelectedSellerId}
                onCancel={onCancel}
                onSubmit={handleFinalizeSale}
            />
        </Box>
    );
}