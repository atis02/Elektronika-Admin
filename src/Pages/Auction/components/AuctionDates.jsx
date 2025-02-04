import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";

const DatePickerAuction = ({
  handleEndDateChange,
  handleStartDateChange,
  startDate,
  handleChange,
  number,
  endDate,
  errorPrice,
}) => {
  const { mode } = useThemeContext();
  const inputsStyle2 = {
    mt: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      //   height: 40,
      //   minWidth: "101px",
      //   width: "100%",
      ...(mode === "dark" ? { color: "#fff" } : { color: "#00B69B" }),
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      lineHeight: "1",
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box width="100%" gap={2}>
        <Typography variant="h6" mb={1}>
          Auksion geçirilýan seneleri saýla:
        </Typography>
        <Box display="flex" width="100%" gap={2}>
          {/* Start Date Picker */}
          <DatePicker
            label="Başlanýar"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            format="DD.MM.YYYY"
            slotProps={{
              textField: {
                error: false,
                InputProps: {
                  sx: {
                    width: "100%",
                  },
                },
              },
            }}
          />

          {/* End Date Picker */}
          <DatePicker
            label="Tamamlanýar"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            format="DD.MM.YYYY"
            slotProps={{
              textField: {
                error: false,
                InputProps: {
                  sx: {
                    width: "100%",
                  },
                },
              },
            }}
          />
        </Box>
        <TextField
          label="Harydyň auksion bahasy"
          variant="outlined"
          autoComplete="off"
          name="minPrice"
          //   type="number"
          value={number}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleChange}
          sx={inputsStyle2}
          error={errorPrice}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DatePickerAuction;
