import CloseIcon from "@mui/icons-material/Close";

import {
    Box,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import type { JSX } from "react";

interface FeedbackToastProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

export function FeedbackToast({
    open,
    message,
    onClose,
}: FeedbackToastProps): JSX.Element {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            sx={{
                top: {
                    xs: 96,
                    sm: 112,
                    md: 104,
                },
                right: {
                    xs: 16,
                    sm: 24,
                    md: 32,
                },
                left: {
                    xs: 16,
                    sm: "auto",
                },
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: 430,
                        md: 480,
                    },
                    minHeight: 82,
                    px: 3,
                    py: 2,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#BFEAD9",
                    borderRadius: "4px",
                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.16)",
                }}
            >
                <Typography
                    sx={{
                        color: "#3F464A",
                        fontSize: {
                            xs: "18px",
                            md: "20px",
                        },
                        fontWeight: 700,
                        textAlign: "center",
                        pr: 4,
                    }}
                >
                    {message}
                </Typography>

                <IconButton
                    aria-label="Fechar notificação"
                    onClick={onClose}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 24,
                        height: 24,
                        backgroundColor: "#000000",
                        color: "#BFEAD9",
                        "&:hover": {
                            backgroundColor: "#000000",
                        },
                    }}
                >
                    <CloseIcon
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                        }}
                    />
                </IconButton>
            </Box>
        </Snackbar>
    );
}