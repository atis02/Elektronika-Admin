import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import ProductAutocomplete from "./ProductAutoComplete";
import DatePickerAuction from "./AuctionDates";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { RiAuctionLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createAuction } from "../../../Components/db/Redux/api/AuctionSlice";
import { useNavigate } from "react-router-dom";

const NewAuction = () => {
  const { mode } = useThemeContext();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [auctionStartPrice, setAuctionStartPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProductChange = (event, value) => {
    setSelectedProduct(value);
    if (value) setError(false);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleChange = (event) => {
    const value = event.target.value;

    // Allow only numbers (optional: no leading zeros)
    if (/^\d*$/.test(value)) {
      setAuctionStartPrice(value);
      if (value !== "") setErrorPrice(false);
    }
  };

  const handleCheck = () => {
    let hasError = false;
    if (!selectedProduct) {
      setError(true);
      hasError = true;
    }
    if (auctionStartPrice === "") {
      setErrorPrice(true);
      hasError = true;
    }
    return hasError;
  };

  const handleSubmit = () => {
    if (!handleCheck()) {
      const body = {
        productId: selectedProduct.id,
        startDateAuction: dayjs(startDate).format("YYYY-MM-DD"),
        endDateAuction: dayjs(endDate).format("YYYY-MM-DD"),
        auctionProductPriceStart: Number(auctionStartPrice),
      };
      dispatch(createAuction(body));
      navigate("/auction");
    } else {
      toast.error("Please fill in all required fields!");
    }
  };

  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px 5px 0" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "25px", md: "25px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
        >
          Täze Auksion
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ProductAutocomplete
          selectedProduct={selectedProduct}
          handleProductChange={handleProductChange}
          errors={error}
        />
        <DatePickerAuction
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleChange={handleChange}
          number={auctionStartPrice}
          errorPrice={errorPrice}
        />
      </Stack>
      <Stack alignItems="end" mt={2} mr={1}>
        <Button
          onClick={handleSubmit}
          sx={{
            width: "14%",
            height: 40,
            color: "inherit",
            textTransform: "revert",
            fontWeight: 600,
            fontSize: 18,
            p: 1,
            ...(mode === "dark"
              ? { color: "#fff", bgcolor: "#00B69B" }
              : {
                  color: "#fff",
                  bgcolor: "#00B69B",
                  "&:hover": { color: "#fff", bgcolor: "#00B69B" },
                }),
          }}
          variant="outlined"
        >
          <AddIcon sx={{ width: 15, height: 15, mr: -0.5 }} />
          <RiAuctionLine size={25} style={{ marginRight: "10px" }} />
          Goşmak
        </Button>
      </Stack>
    </Box>
  );
};

export default NewAuction;
