import DeleteIcon from "@mui/icons-material/Delete";

import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from "@mui/material";
import type { JSX } from "react";

import editarIcon from "../../../assets/editar.png";
import type { Venda } from "../../../types/venda";

interface VendaRowActionsProps {
    venda: Venda;
    isExpanded: boolean;
    onToggleDetails: (vendaId: number) => void;
}

const actionButtonSx = {
    color: "#00585E",
    fontWeight: 700,
    textTransform: "none",
    minWidth: "auto",
    p: 0,
    "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "underline",
    },
};

export function VendaRowActions({
    venda,
    isExpanded,
    onToggleDetails,
}: VendaRowActionsProps): JSX.Element {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: {
                    xs: 0.5,
                    sm: 1,
                    md: 1.5,
                },
                whiteSpace: "nowrap",
            }}
        >
            <Button
                variant="text"
                size="large"
                onClick={() => onToggleDetails(venda.id)}
                sx={actionButtonSx}
            >
                {isExpanded ? "Fechar" : "Ver itens"}
            </Button>

            <Tooltip title="Editar venda">
                <IconButton
                    aria-label="Editar venda"
                    size="small"
                    sx={{
                        p: 0.5,
                    }}
                >
                    <Box
                        component="img"
                        src={editarIcon}
                        alt="Editar venda"
                        sx={{
                            width: 20,
                            height: 20,
                            display: "block",
                            objectFit: "contain",
                        }}
                    />
                </IconButton>
            </Tooltip>

            <Tooltip title="Excluir venda">
                <IconButton
                    aria-label="Excluir venda"
                    size="small"
                    sx={{ color: "#C40000" }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}