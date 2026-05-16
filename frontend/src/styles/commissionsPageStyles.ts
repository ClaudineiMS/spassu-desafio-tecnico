import type { SxProps, Theme } from "@mui/material";

export const inputSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        height: 38,
        minHeight: 38,
        maxHeight: 38,
        borderRadius: "4px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
    },
    "& .MuiOutlinedInput-input": {
        height: "100%",
        boxSizing: "border-box",
        padding: "0 12px",
        fontSize: "15px",
        lineHeight: "38px",
    },
};

export const datePickerSlotProps = {
    textField: {
        fullWidth: true,
        size: "small" as const,
        sx: {
            ...inputSx,
            "& .MuiInputBase-root": {
                height: 38,
                minHeight: 38,
                maxHeight: 38,
                paddingRight: "8px",
                boxSizing: "border-box",
            },
            "& .MuiInputBase-input": {
                height: 38,
                padding: "0 12px",
                boxSizing: "border-box",
                fontSize: "15px",
                lineHeight: "38px",
            },
            "& .MuiInputAdornment-root": {
                height: 38,
                maxHeight: 38,
                marginLeft: 0,
            },
            "& .MuiIconButton-root": {
                width: 30,
                height: 30,
                padding: 0,
            },
            "& .MuiInputAdornment-root .MuiIconButton-root": {
                color: "#00585E",
            },
            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                color: "#00585E",
                fontSize: 22,
            },
        },
    },

    day: {
        sx: {
            fontSize: "15px",
            width: 32,
            height: 32,
            borderRadius: "6px",
            color: "#333333",

            "&.Mui-selected": {
                backgroundColor: "#00585E !important",
                color: "#ffffff",
            },
            "&.Mui-selected:hover": {
                backgroundColor: "#00585E !important",
                color: "#ffffff",
            },
            "&:hover": {
                backgroundColor: "#00585E",
                color: "#ffffff",
            },
            "&.MuiPickersDay-today": {
                border: "none",
                backgroundColor: "transparent",
            },
            "&.MuiPickersDay-today:not(.Mui-selected)": {
                border: "none",
                backgroundColor: "transparent",
                color: "#333333",
            },
            "&.MuiPickersDay-today:not(.Mui-selected):hover": {
                backgroundColor: "#00585E",
                color: "#ffffff",
            },
            "&.Mui-disabled": {
                color: "#c7c7c7",
            },
            "&.Mui-disabled:hover": {
                backgroundColor: "transparent",
                color: "#c7c7c7",
            },
        },
    },

    desktopPaper: {
        sx: {
            borderRadius: "4px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
            border: "1px solid #dddddd",

            "& .MuiDateCalendar-root": {
                width: 320,
                maxHeight: "none",
                height: "auto",
                backgroundColor: "#ffffff",
            },
            "& .MuiPickersCalendarHeader-root": {
                minHeight: 48,
                margin: 0,
                padding: "0 16px",
            },
            "& .MuiPickersCalendarHeader-label": {
                fontSize: "17px",
                fontWeight: 700,
                textTransform: "lowercase",
            },
            "& .MuiPickersArrowSwitcher-button": {
                color: "#00585E",
            },
            "& .MuiDayCalendar-header": {
                height: 36,
                padding: "0 10px",
            },
            "& .MuiDayCalendar-weekDayLabel": {
                width: 32,
                height: 36,
                margin: 0,
                fontSize: "14px",
                color: "#333333",
                fontWeight: 600,
            },
            "& .MuiDayCalendar-monthContainer": {
                padding: "6px 10px 12px",
            },
            "& .MuiDayCalendar-weekContainer": {
                margin: "4px 0",
                display: "flex",
                justifyContent: "space-between",
            },
            "& .MuiPickersDay-root": {
                margin: 0,
            },
        },
    },
};
export const searchButtonSx: SxProps<Theme> = {
    minWidth: 4,
    height: 41,
    backgroundColor: "#00585E",
    borderRadius: "4px",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#004A50",
    },
    "&.Mui-disabled": {
        backgroundColor: "#B7D4D8",
        color: "#ffffff",
    },
};

export const tableHeaderSx: SxProps<Theme> = {
    fontWeight: 700,
    color: "#111111",
};

export const pageContainerSx: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    color: "#111111",
};

export const pageHeaderSx: SxProps<Theme> = {
    mb: 5,
    display: "grid",
    gridTemplateColumns: {
        xs: "1fr",
        lg: "1fr auto",
    },
    alignItems: "end",
    gap: {
        xs: 3,
        lg: 4,
    },
};

export const pageTitleSx: SxProps<Theme> = {
    fontSize: {
        xs: "24px",
        sm: "28px",
        md: "32px",
    },
    fontWeight: 700,
    color: "#00585E",
    whiteSpace: "nowrap",
};

export const filtersGridSx: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr auto",
    },
    gap: 2,
    alignItems: "end",
    width: {
        xs: "100%",
        lg: 620,
        xl: 700,
    },
};

export function getDatePickerSlotProps(placeholder: string) {
    return {
        ...datePickerSlotProps,
        textField: {
            ...datePickerSlotProps.textField,
            placeholder,
        },
    };
}

export const commissionHeaderCellSx: SxProps<Theme> = {
    backgroundColor: "transparent",
    borderBottom: "1px solid #8A8A8A",
    py: 1.5,
    px: 0,
};

export const commissionBodyCellSx: SxProps<Theme> = {
    backgroundColor: "transparent",
    borderBottom: "1px solid #8A8A8A",
    py: 1.5,
    px: 0,
    fontSize: "16px",
};

export const commissionHeaderTextSx: SxProps<Theme> = {
    fontWeight: 700,
    color: "#111111",
    fontSize: "16px",
};

export const commissionFooterSx: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: {
        xs: "1fr 1.5fr",
        md: "12% 38% 25% 25%",
    },
    pt: 3,
    alignItems: "center",
    color: "#00585E",
};