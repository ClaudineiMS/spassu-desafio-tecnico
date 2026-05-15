import CloseIcon from "@mui/icons-material/Close";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import type { JSX } from "react";

interface DeleteSaleDialogProps {
    open: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const confirmButtonSx = {
    minWidth: 96,
    height: 37,
    backgroundColor: "#2A858A",
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#006B70",
    },
};

const cancelButtonSx = {
    minWidth: 96,
    height: 37,
    backgroundColor: "#ffffff",
    color: "#006B70",
    border: "1px solid #006B70",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#F2F7F7",
        border: "1px solid #006B70",
    },
};

export function DeleteSaleDialog({
    open,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteSaleDialogProps): JSX.Element {
    return (
        <Dialog
            open={open}
            onClose={isDeleting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: "calc(100% - 32px)",
                            sm: 486,
                        },
                        maxWidth: "486px",
                        borderRadius: "4px",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)",
                        backgroundColor: "#ffffff",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        color: "#444444",
                        fontSize: "18px",
                        fontWeight: 700,
                    }}
                >
                    Remover Venda
                </Typography>

                <IconButton
                    aria-label="Fechar modal"
                    onClick={onClose}
                    disabled={isDeleting}
                    size="small"
                    sx={{
                        color: "#444444",
                        p: 0.5,
                    }}
                >
                    <CloseIcon
                        sx={{
                            fontSize: 22,
                            fontWeight: 700,
                        }}
                    />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent
                sx={{
                    px: 4,
                    py: 5,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#444444",
                    }}
                >
                    Deseja remover esta venda?
                </Typography>
            </DialogContent>

            <Divider />

            <DialogActions
                sx={{
                    px: 2.5,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1.5,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isDeleting}
                    sx={cancelButtonSx}
                >
                    Não
                </Button>

                <Button
                    variant="contained"
                    onClick={onConfirm}
                    disabled={isDeleting}
                    sx={confirmButtonSx}
                >
                    {isDeleting ? "Removendo..." : "Sim"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}