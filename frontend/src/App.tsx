import { useState } from "react";

import { Box, CssBaseline } from "@mui/material";
import type { JSX } from "react";

import { AppHeader } from "./components/AppHeader/AppHeader";
import { SideMenu } from "./components/SideMenu/SideMenu";

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
    }

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                    backgroundColor: "#f7f7f7",
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
                        p: {
                            xs: 2,
                            sm: 4,
                            md: 6,
                        },
                    }}
                >
                    Conteúdo da página {pageTitle}
                </Box>
            </Box>
        </>
    );
}

export default App;