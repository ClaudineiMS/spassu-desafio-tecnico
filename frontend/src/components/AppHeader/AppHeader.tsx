import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import type { JSX } from "react";
import logo from "../../assets/logo.svg";

interface AppHeaderProps {
    title: string;
    onMenuClick: () => void;
}

export function AppHeader({ title, onMenuClick }: AppHeaderProps): JSX.Element {
    return (
        <AppBar
            position="static"
            elevation={2}
            sx={{
                backgroundColor: "#f5f5f5",
                color: "#005c63",
                width: "100%",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: {
                        xs: "64px",
                        sm: "72px",
                        md: "88px",
                    },
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "auto 1fr auto",
                        sm: "1fr auto 1fr",
                    },
                    alignItems: "center",
                    px: {
                        xs: 1.5,
                        sm: 3,
                        md: 4,
                    },
                    gap: {
                        xs: 1,
                        sm: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 1,
                            sm: 2,
                            md: 3,
                        },
                        minWidth: 0,
                    }}
                >
                    <IconButton
                        edge="start"
                        aria-label="Abrir menu lateral"
                        onClick={onMenuClick}
                        sx={{
                            color: "#00737a",
                        }}
                    >
                        <MenuIcon
                            sx={{
                                fontSize: {
                                    xs: 28,
                                    sm: 32,
                                    md: 36,
                                },
                            }}
                        />
                    </IconButton>

                    <Box
                        component="img"
                        src={logo}
                        alt="Logo da aplicação"
                        sx={{
                            width: {
                                xs: 112,
                                sm: 144,
                                md: 176,
                            },
                            height: "auto",
                            display: "block",
                        }}
                    />
                </Box>

                <Typography
                    component="h1"
                    noWrap
                    sx={{
                        fontSize: {
                            xs: "20px",
                            sm: "26px",
                            md: "32px",
                        },
                        fontWeight: 700,
                        color: "#00585E",
                        textAlign: {
                            xs: "right",
                            sm: "center",
                        },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },
                    }}
                />
            </Toolbar>
        </AppBar>
    );
}