import type { SxProps, Theme } from "@mui/material";

export const inputSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 1,
        backgroundColor: "#ffffff",
    },
    "& .MuiOutlinedInput-input": {
        py: 1.2,
        fontSize: "15px",
        minHeight: 20
    },
    "& .MuiAutocomplete-inputRoot": {
       
        paddingTop: "0 !important",
        paddingBottom: "0 !important",
    },
    "& .MuiAutocomplete-input": {
        paddingTop: "9.5px !important",
        paddingBottom: "9.5px !important",
        fontSize: "15px",
    },
};

export const primaryButtonSx: SxProps<Theme> = {
    minHeight: 44,
    px: 3,
    backgroundColor: "#00585E",
    borderRadius: "4px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#004A50",
    },
};

export const disabledButtonSx: SxProps<Theme> = {
    minHeight: 44,
    px: 4,
    borderRadius: "4px",
    fontWeight: 700,
    textTransform: "none",
    backgroundColor: "#B7D4D8",
    color: "#ffffff",
    "&.Mui-disabled": {
        backgroundColor: "#B7D4D8",
        color: "#ffffff",
    },
};

export const sectionTitleSx: SxProps<Theme> = {
    mb: 3,
    fontSize: {
        xs: "24px",
        md: "26px",
    },
    fontWeight: 400,
};

export const submitButtonSx = {
    minHeight: 44,
    px: 4,
    borderRadius: "4px",
    fontWeight: 700,
    textTransform: "none",
    backgroundColor: "#00585E",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#004A50",
    },
    "&.Mui-disabled": {
        backgroundColor: "#B7D4D8",
        color: "#ffffff",
    },
};

export const dateTimeInputSx: SxProps<Theme> = {
    backgroundColor: "#ffffff",
    "& .MuiInputBase-root": {
        backgroundColor: "#ffffff",
        cursor: "pointer",
    },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#ffffff",
    },
    "& .MuiOutlinedInput-input": {
        backgroundColor: "#ffffff",
    },
    "& input": {
        backgroundColor: "#ffffff",
    },
    "& fieldset": {
        borderRadius: 1,
    },
    "& .MuiInputAdornment-root": {
        display: "none",
    },
    
};

export const dateTimePickerSlotProps = {
    textField: {
        fullWidth: true,
        size: "small" as const,
        sx: dateTimeInputSx,
    },
    openPickerButton: {
        sx: {
            display: "none",
        },
    },
    inputAdornment: {
        sx: {
            display: "none",
        },
    },
    day: {
        sx: {
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
            },
        },
    },
    desktopPaper: {
        sx: {
            "& .MuiMenuItem-root.Mui-selected": {
                backgroundColor: "#00585E !important",
                color: "#ffffff",
            },
            "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: "#00585E !important",
                color: "#ffffff",
            },
            "& .MuiMenuItem-root:hover": {
                backgroundColor: "#E6F2F3",
            },
        },
    },
};
