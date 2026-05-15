import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import type { JSX } from "react";

import cashregister from "../../assets/cashregister.svg"
import calculator from "../../assets/calculator.svg"
interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    onNavigate: (pageTitle: string) => void;
}

interface MenuItem {
    label: string;
    icon: JSX.Element;
}

const drawerWidth = 320;

const menuItems: MenuItem[] = [
    {
        label: "Vendas",
        icon: <IconButton
            aria-label="Editar venda"
            size="small"
            sx={{
                p: 0.5,
            }}
        >
            <Box
                component="img"
                src={cashregister}
                sx={{
                    width: 20,
                    height: 20,
                    display: "block",
                    objectFit: "contain",
                }}
            />
        </IconButton>
    },
    {
        label: "Comissões",
        icon: <IconButton
            aria-label="Editar venda"
            size="small"
            sx={{
                p: 0.5,
            }}
        >
            <Box
                component="img"
                src={calculator}
                sx={{
                    width: 20,
                    height: 20,
                    display: "block",
                    objectFit: "contain",
                }}
            />
        </IconButton>
    },
];

export function SideMenu({
    open,
    onClose,
    onNavigate,
}: SideMenuProps): JSX.Element {
    function handleNavigate(pageTitle: string): void {
        onNavigate(pageTitle);
        onClose();
    }

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            variant="temporary"
            ModalProps={{
                keepMounted: true,
            }}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: "82vw",
                            sm: drawerWidth,
                        },
                        maxWidth: drawerWidth,
                        backgroundColor: "#f5f5f5",
                        boxShadow: 4,
                    },
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
                role="presentation"
            >

                <List
                    sx={{
                        py: 2,
                    }}
                >
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.label}
                            onClick={() => handleNavigate(item.label)}
                            sx={{
                                mx: 2,
                                mb: 1,
                                borderRadius: 2,
                                minHeight: 56,
                                color: "#263238",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 115, 122, 0.08)",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 42,
                                    color: "#00737a",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                slotProps={{
                                    primary: {
                                        sx: {
                                            fontSize: "16px",
                                            fontWeight: 600,
                                        },
                                    },
                                }}
                            />

                            <ChevronRightIcon
                                sx={{
                                    color: "#00737a",
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}