import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import ProductAutocomplete from "./ProductAutoComplete";
import DatePickerAuction from "./AuctionDates";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { RiAuctionLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createAuction,
  getAuctionById,
  updateAuction,
} from "../../../Components/db/Redux/api/AuctionSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IoSaveOutline } from "react-icons/io5";
import Participants from "./Participants";

const UpdateAuction = () => {
  const { mode } = useThemeContext();
  const data = useSelector((state) => state.auction.onProductData);

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedProduct, setSelectedProduct] = useState(data?.product);
  const [error, setError] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [auctionStartPrice, setAuctionStartPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleProductChange = (event, value) => {
    setSelectedProduct(value);
    if (value) setError(false);
  };

  useEffect(() => {
    dispatch(getAuctionById(params?.id));
  }, [params, dispatch]);
  useEffect(() => {
    setSelectedProduct(data?.product || null);
    setStartDate(dayjs(data?.startDateAuction));
    setEndDate(dayjs(data?.endDateAuction));
    setAuctionStartPrice(data?.auctionProductPriceStart);
  }, [data]);
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
        auctionId: params.id,
        productId: selectedProduct.id,
        startDateAuction: dayjs(startDate).format("YYYY-MM-DD"),
        endDateAuction: dayjs(endDate).format("YYYY-MM-DD"),
        auctionProductPriceStart: Number(auctionStartPrice),
      };

      dispatch(updateAuction(body));
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
          Auksion ID : {data?.auctionID}
        </Typography>
      </Stack>
      <Stack direction="row" minHeight={"75vh"} spacing={2}>
        <ProductAutocomplete
          selectedProduct={selectedProduct}
          handleProductChange={handleProductChange}
          errors={error}
        />
        <Stack width="80%">
          <DatePickerAuction
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleChange={handleChange}
            number={auctionStartPrice}
            errorPrice={errorPrice}
          />

          <Participants data={data} />
        </Stack>
      </Stack>
      <Stack alignItems="end" mt={1} mr={1}>
        <Button
          onClick={handleSubmit}
          sx={{
            width: "16%",
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
          {/* <AddIcon sx={{ width: 15, height: 15, mr: -0.5 }} /> */}
          <IoSaveOutline size={25} style={{ marginRight: "10px" }} />
          Ýatda sakla
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdateAuction;
