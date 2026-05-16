import { Box } from "@mui/material";
import type { JSX } from "react";

import calendar from "../../assets/calendar.svg"

export function CalendarIcon(): JSX.Element {
    return (
        <Box
            component="img"
            src={calendar}
            alt="Abrir calendário"
            sx={{
                width: 16,
                height: 22,
                display: "block",
                objectFit: "contain",
            }}
        />
    );
}