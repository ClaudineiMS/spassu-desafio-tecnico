import { Button } from "@mui/material";
import type { JSX } from "react";

interface ActionButtonProps {
    title: string;
    backgroundColor: string;
    onClick?: () => void;
    hoverColor?: string;
}

export function ActionButton({
    title,
    backgroundColor,
    onClick,
    hoverColor,
}: ActionButtonProps): JSX.Element {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                alignSelf: {
                    xs: "stretch",
                    sm: "center",
                },
                minWidth: {
                    xs: "100%",
                    sm: 180,
                },
                minHeight: 44,
                px: 3,
                backgroundColor,
                borderRadius: "4px",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                    backgroundColor: hoverColor ?? backgroundColor,
                },
            }}
        >
            {title}
        </Button>
    );
}