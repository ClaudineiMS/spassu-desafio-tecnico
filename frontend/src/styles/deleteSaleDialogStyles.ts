import type { SxProps, Theme } from "@mui/material";

export const dialogPaperSx: SxProps<Theme> = {
    width: {
        xs: "calc(100% - 32px)",
        sm: 486,
    },
    maxWidth: "486px",
    borderRadius: "4px",
    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
};

export const dialogTitleSx: SxProps<Theme> = {
    px: 2.5,
    py: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

export const dialogTitleTextSx: SxProps<Theme> = {
    color: "#444444",
    fontSize: "18px",
    fontWeight: 700,
};

export const closeButtonSx: SxProps<Theme> = {
    color: "#444444",
    p: 0.5,
};

export const closeIconSx: SxProps<Theme> = {
    fontSize: 22,
    fontWeight: 700,
};

export const dialogContentSx: SxProps<Theme> = {
    px: 4,
    py: 5,
};

export const dialogMessageSx: SxProps<Theme> = {
    fontSize: "16px",
    color: "#444444",
};

export const dialogActionsSx: SxProps<Theme> = {
    px: 2.5,
    py: 1.5,
    display: "flex",
    justifyContent: "flex-end",
    gap: 0.75,
};

export const confirmButtonSx: SxProps<Theme> = {
    minWidth: 96,
    height: 37,
    backgroundColor: "#2A858A",
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#006B70",
    },
};

export const cancelButtonSx: SxProps<Theme> = {
    minWidth: 96,
    height: 37,
    backgroundColor: "#ffffff",
    color: "#006B70",
    border: "1px solid #006B70",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#F2F7F7",
        border: "1px solid #006B70",
    },
};