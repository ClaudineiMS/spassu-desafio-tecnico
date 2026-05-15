import { useState } from "react";

import { Box, CssBaseline } from "@mui/material";
import type { JSX } from "react";

import { AppHeader } from "./components/AppHeader/AppHeader";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { SaleFormPage } from "./pages/Vendas/SaleFormPage";
import { VendasPage } from "./pages/Vendas/VendasPage";

function App(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Vendas");

    function handleOpenMenu(): void {
        setIsMenuOpen(true);
    }

    function handleCloseMenu(): void {
        setIsMenuOpen(false);
    }

    function handleNavigate(title: string): void {
        setPageTitle(title);
        setIsMenuOpen(false);
    }

    function handleCreateSale(): void {
        setPageTitle("Nova Venda");
    }

    function handleCancelSale(): void {
        setPageTitle("Vendas");
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
                        <VendasPage onCreateSale={handleCreateSale} />
                    )}

                    {pageTitle === "Nova Venda" && (
                        <SaleFormPage onCancel={handleCancelSale} />
                    )}

                    {pageTitle === "Comissões" && (
                        <Box
                            sx={{
                                color: "#00585E",
                                fontWeight: 700,
                            }}
                        >
                            Página de comissões será implementada na próxima etapa.
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default App;