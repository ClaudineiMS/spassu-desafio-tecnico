import { Box, CircularProgress, Typography } from "@mui/material";
import type { JSX } from "react";

interface LoadingStateProps {
    message?: string;
}

export function LoadingState({
    message = "Carregando dados...",
}: LoadingStateProps): JSX.Element {
    return (
        <Box
            sx={{
                minHeight: "320px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <CircularProgress
                sx={{
                    color: "#00585E",
                }}
            />

            <Typography
                component="p"
                sx={{
                    color: "#00585E",
                    fontWeight: 600,
                }}
            >
                {message}
            </Typography>
        </Box>
    );
}