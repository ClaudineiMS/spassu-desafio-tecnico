import type { SxProps, Theme } from "@mui/material";

export const inputSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 0,
        backgroundColor: "#ffffff",
        minHeight: 43,
    },
    "& .MuiOutlinedInput-input": {
        py: 1.2,
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