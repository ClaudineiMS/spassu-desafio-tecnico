import { useState } from "react";

import { Box, CssBaseline } from "@mui/material";
import type { JSX } from "react";

import { AppHeader } from "./components/AppHeader/AppHeader";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { SaleFormPage } from "./hooks/SaleFormPage";
import { VendasPage } from "./pages/Vendas/VendasPage";
import type { Venda } from "./types/sales";
import { CommissionsPage } from "./pages/Comissoes/CommissionsPage";

function App(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Vendas");
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [saleToEdit, setSaleToEdit] = useState<Venda | null>(null);

    function handleOpenMenu(): void {
        setIsMenuOpen(true);
    }

    function handleCloseMenu(): void {
        setIsMenuOpen(false);
    }

    function handleNavigate(title: string): void {
        setPageTitle(title);
        setIsMenuOpen(false);

        if (title === "Vendas" || title === "Comissões") {
            setSaleToEdit(null);
        }
    }

    function handleCreateSale(): void {
        setPageTitle("Nova Venda");
    }

    function handleCancelSale(): void {
        setSaleToEdit(null);
        setPageTitle("Vendas");
    }

    function handleSaleCreated(): void {
        setPageTitle("Vendas");
        setFeedbackMessage("VENDA REALIZADA COM SUCESSO!");
    }

    function handleClearFeedback(): void {
        setFeedbackMessage(null);
    }

    function handleShowFeedback(message: string): void {
        setFeedbackMessage(message);
    }

    function handleEditSale(venda: Venda): void {
        setSaleToEdit(venda);
        setPageTitle(`Alterar Venda - Nº ${venda.numero_nota_fiscal}`);
    }

    function handleSaleUpdated(): void {
        setSaleToEdit(null);
        setPageTitle("Vendas");
        setFeedbackMessage("VENDA ALTERADA COM SUCESSO!");
    }
    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f7f7f7",
                    overflow: "hidden",
                }}
            >
                <AppHeader title={pageTitle} onMenuClick={handleOpenMenu} />

                <SideMenu
                    open={isMenuOpen}
                    onClose={handleCloseMenu}
                    onNavigate={handleNavigate}
                />

                <Box
                    component="main"
                    sx={{
                        width: "100%",
                        flex: 1,
                        minHeight: 0,
                        boxSizing: "border-box",
                        overflow: "hidden",
                        p: {
                            xs: 2,
                            sm: 4,
                            md: 5,
                        },
                    }}
                >
                    {pageTitle === "Vendas" && (
                        <VendasPage
                            onCreateSale={handleCreateSale}
                            onEditSale={handleEditSale}
                            feedbackMessage={feedbackMessage}
                            onClearFeedback={handleClearFeedback}
                            onShowFeedback={handleShowFeedback}
                        />
                    )}

                    {(pageTitle === "Nova Venda" || saleToEdit) && (
                        <SaleFormPage
                            initialSale={saleToEdit}
                            onCancel={handleCancelSale}
                            onSaleCreated={handleSaleCreated}
                            onSaleUpdated={handleSaleUpdated}
                        />
                    )}

                    {pageTitle === "Comissões" && <CommissionsPage />}
                </Box>
            </Box>
        </>
    );
}

export default App;