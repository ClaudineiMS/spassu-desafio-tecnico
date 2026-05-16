import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    CircularProgress
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import type { JSX } from "react";

import {
    datePickerSlotProps,
    filtersGridSx,
    searchButtonSx,
} from "../../styles/commissionsPageStyles";
import { CalendarIcon } from "../CalendarIcon/CalendarIcon";

interface CommissionFiltersProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    canSearch: boolean;
    isLoading: boolean;
    onStartDateChange: (value: Dayjs | null) => void;
    onEndDateChange: (value: Dayjs | null) => void;
    onSearch: () => void;
}

export function CommissionFilters({
    startDate,
    endDate,
    canSearch,
    isLoading,
    onStartDateChange,
    onEndDateChange,
    onSearch,
}: CommissionFiltersProps): JSX.Element {
    return (
        <Box sx={filtersGridSx}>
            <Box>
                <DatePicker
                    value={startDate}
                    onChange={onStartDateChange}
                    slots={{
                        openPickerIcon: CalendarIcon,
                    }}
                    slotProps={datePickerSlotProps}
                    label="Período de Início"
                />
            </Box>

            <Box>
                <DatePicker
                    value={endDate}
                    onChange={onEndDateChange}
                    label="Período de Fim"
                    slots={{
                        openPickerIcon: CalendarIcon,
                    }}
                    slotProps={datePickerSlotProps}
                />
            </Box>

            <Button
                variant="contained"
                disabled={!canSearch || isLoading}
                onClick={onSearch}
                sx={searchButtonSx}
            >
                {isLoading ? (
                    <CircularProgress
                        size={22}
                        sx={{
                            color: "#ffffff",
                        }}
                    />
                ) : (
                    <SearchIcon />
                )}
            </Button>
        </Box>
    );
}