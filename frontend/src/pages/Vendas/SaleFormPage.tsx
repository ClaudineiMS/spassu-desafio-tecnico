import { Box } from "@mui/material";
import type { JSX } from "react";

import { SaleDataSection } from "./components/SaleDataSection";
import { SaleProductSection } from "./components/SaleProductSection";

interface SaleFormPageProps {
    onCancel: () => void;
}

export function SaleFormPage({
    onCancel,
}: SaleFormPageProps): JSX.Element {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "2fr 1.15fr",
                },
                gap: {
                    xs: 4,
                    md: 5,
                },
                color: "#111111",
            }}
        >
            <SaleProductSection />

            <SaleDataSection onCancel={onCancel} />
        </Box>
    );
}