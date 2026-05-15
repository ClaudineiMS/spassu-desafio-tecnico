import { forwardRef, useMemo } from "react";

import {
    Box,
    CircularProgress,
    Paper,
    Table as MuiTable,
    TableBody as MuiTableBody,
    TableCell,
    TableContainer,
    TableHead as MuiTableHead,
    TableRow as MuiTableRow,
    Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ComponentPropsWithoutRef, JSX, ReactNode } from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { TableComponents } from "react-virtuoso";

export interface VirtualizedTableColumn<T> {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    width?: number | string;
    render: (row: T) => ReactNode;
}

interface VirtualizedTableProps<T> {
    rows: T[];
    columns: VirtualizedTableColumn<T>[];
    getRowKey: (row: T) => string | number;
    ariaLabel: string;
    isLoadingMore?: boolean;
    onEndReached?: () => void;
    minWidth?: number;
    increaseViewportBy?: number;
    headerCellSx?: SxProps<Theme>;
    bodyCellSx?: SxProps<Theme>;
    headerTextSx?: SxProps<Theme>;
}

type VirtuosoTableRowProps<T> = ComponentPropsWithoutRef<
    typeof MuiTableRow
> & {
    item?: T;
};

export function VirtualizedTable<T>({
    rows,
    columns,
    getRowKey,
    ariaLabel,
    isLoadingMore = false,
    onEndReached,
    minWidth = 800,
    increaseViewportBy = 300,
    headerCellSx,
    bodyCellSx,
    headerTextSx,
}: VirtualizedTableProps<T>): JSX.Element {
    const tableComponents = useMemo<TableComponents<T, unknown>>(
        () => ({
            Scroller: forwardRef<
                HTMLDivElement,
                ComponentPropsWithoutRef<typeof TableContainer>
            >((props, ref) => (
                <TableContainer
                    component={Paper}
                    elevation={0}
                    {...props}
                    ref={ref}
                    sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        borderRadius: 0,
                        boxShadow: "none",
                        backgroundColor: "transparent",
                    }}
                />
            )),
            Table: (props) => (
                <MuiTable
                    {...props}
                    stickyHeader
                    aria-label={ariaLabel}
                    sx={{
                        minWidth,
                        borderCollapse: "separate",
                        tableLayout: "fixed",
                    }}
                />
            ),
            TableHead: forwardRef<
                HTMLTableSectionElement,
                ComponentPropsWithoutRef<typeof MuiTableHead>
            >((props, ref) => (
                <MuiTableHead
                    {...props}
                    ref={ref}
                />
            )),
            TableRow: ({ item: _item, ...props }: VirtuosoTableRowProps<T>) => (
                <MuiTableRow {...props} />
            ),
            TableBody: forwardRef<
                HTMLTableSectionElement,
                ComponentPropsWithoutRef<typeof MuiTableBody>
            >((props, ref) => (
                <MuiTableBody
                    {...props}
                    ref={ref}
                />
            )),
        }),
        [ariaLabel, minWidth],
    );

    function renderHeader(): JSX.Element {
        return (
            <MuiTableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.key}
                        align={column.align ?? "left"}
                        sx={{
                            width: column.width,
                            ...headerCellSx,
                        }}
                    >
                        <Typography sx={headerTextSx}>
                            {column.label}
                        </Typography>
                    </TableCell>
                ))}
            </MuiTableRow>
        );
    }

    function renderRow(_index: number, row: T): JSX.Element {
        return (
            <>
                {columns.map((column) => (
                    <TableCell
                        key={`${getRowKey(row)}-${column.key}`}
                        align={column.align ?? "left"}
                        sx={{
                            width: column.width,
                            ...bodyCellSx,
                        }}
                    >
                        {column.render(row)}
                    </TableCell>
                ))}
            </>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    width: "100%",
                }}
            >
                <TableVirtuoso
                    data={rows}
                    components={tableComponents}
                    fixedHeaderContent={renderHeader}
                    itemContent={renderRow}
                    endReached={onEndReached}
                    increaseViewportBy={increaseViewportBy}
                    style={{
                        height: "100%",
                    }}
                />
            </Box>

            {isLoadingMore && (
                <Box
                    sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress
                        size={24}
                        sx={{
                            color: "#00585E",
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}