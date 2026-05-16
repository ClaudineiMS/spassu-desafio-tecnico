import { Alert, Box, Typography } from "@mui/material";
import type { AlertColor } from "@mui/material";
import type { JSX } from "react";

interface PageMessageProps {
    message: string;
    severity?: AlertColor;
    variant?: "alert" | "text";
    centerVertical?: boolean;
}

export function PageMessage({
    message,
    severity = "info",
    variant = "alert",
    centerVertical = false,
}: PageMessageProps): JSX.Element {
    return (
        <Box
            sx={{
                width: "100%",
                flex: centerVertical ? 1 : "initial",
                display: "flex",
                alignItems: centerVertical ? "center" : "flex-start",
                justifyContent: "center",
                textAlign: "center",
                mt: centerVertical ? 0 : 4,
            }}
        >
            {variant === "text" ? (
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: {
                            xs: "16px",
                            md: "18px",
                        },
                    }}
                >
                    {message}
                </Typography>
            ) : (
                <Alert
                    severity={severity}
                    sx={{
                        width: "100%",
                        maxWidth: 700,
                        justifyContent: "center",
                        "& .MuiAlert-message": {
                            width: "100%",
                            textAlign: "center",
                        },
                    }}
                >
                    {message}
                </Alert>
            )}
        </Box>
    );
}