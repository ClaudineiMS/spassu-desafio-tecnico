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

import {
    cancelButtonSx,
    closeButtonSx,
    closeIconSx,
    confirmButtonSx,
    dialogActionsSx,
    dialogContentSx,
    dialogMessageSx,
    dialogPaperSx,
    dialogTitleSx,
    dialogTitleTextSx,
} from "../../styles/deleteSaleDialogStyles";

interface DeleteSaleDialogProps {
    open: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

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
                    sx: dialogPaperSx,
                },
            }}
        >
            <DialogTitle sx={dialogTitleSx}>
                <Typography component="h2" sx={dialogTitleTextSx}>
                    Remover Venda
                </Typography>

                <IconButton
                    aria-label="Fechar modal"
                    onClick={onClose}
                    disabled={isDeleting}
                    size="small"
                    sx={closeButtonSx}
                >
                    <CloseIcon sx={closeIconSx} />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={dialogContentSx}>
                <Typography sx={dialogMessageSx}>
                    Deseja remover esta venda?
                </Typography>
            </DialogContent>

            <Divider />

            <DialogActions sx={dialogActionsSx}>
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