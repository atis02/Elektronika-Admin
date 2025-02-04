import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import Get from "./components/Get";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Components/db/Redux/api/ProductSlice";
import { useNavigate } from "react-router-dom";
import { getAuctions } from "../../Components/db/Redux/api/AuctionSlice";
const index = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    nameTm: "",
    sortBy: "createdAt",
    sortOrder: "DESC",
    startDateAuction: "",
    endDateAuction: "",
    page: 1,
    limit: 10,
  });
  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);

  const { mode } = useThemeContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAuctions(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };
  return (
    <Box height="100vh" overflow="auto" width="100%">
      <Stack
        direction="row"
        p="5px 13px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={{
            ...(mode == "dark" ? { color: "inherit" } : { color: "#474747" }),
          }}
        >
          Tamamlanan Auksionlar
        </Typography>
      </Stack>
      <Get
        filters={filters}
        handleFilterChange={handleFilterChange}
        setFilters={setFilters}
      />
      {/*<CreateCategoryModal open={open} handleClose={handleCloseCategory} /> */}
    </Box>
  );
};

export default index;
