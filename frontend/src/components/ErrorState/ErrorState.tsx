import { Alert, Box } from "@mui/material";
import type { JSX } from "react";

interface ErrorStateProps {
    message: string;
}

export function ErrorState({ message }: ErrorStateProps): JSX.Element {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Alert
                severity="error"
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    justifyContent: "center",
                }}
            >
                {message}
            </Alert>
        </Box>
    );
}