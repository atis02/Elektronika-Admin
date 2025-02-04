import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateRangeFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilter,
}) => {
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    onFilter(
      "startDateAuction",
      newValue ? newValue.format("YYYY-MM-DD") : null
    );
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    onFilter("endDateAuction", newValue ? newValue.format("YYYY-MM-DD") : null);
  };
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Başlangyç senesi"
            value={startDate}
            onChange={handleStartDateChange}
            format="DD.MM.YYYY"
            slotProps={{
              textField: {
                size: "small",
                error: false,
                InputProps: {
                  sx: {
                    width: "100%",
                    height: 40,
                  },
                },
              },
            }}
          />
          <DatePicker
            label="Tamamlanýan senesi"
            value={endDate}
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                size: "small",
                error: false,
                InputProps: {
                  sx: {
                    width: "100%",
                    height: 40,
                  },
                },
              },
            }}
            format="DD.MM.YYYY"
          />
        </LocalizationProvider>
      </Stack>
    </Box>
  );
};

export default DateRangeFilter;
