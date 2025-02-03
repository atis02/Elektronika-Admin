import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import Get from "./components/Get";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Components/db/Redux/api/ProductSlice";
import { useNavigate } from "react-router-dom";
const index = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    subCategoryId: "",
    minPrice: "",
    segmentId: "",
    brandId: "",
    maxPrice: "",
    nameTm: "",
    sortBy: "createdAt",
    sortOrder: "DESC",
    page: 1,
    limit: 10,
  });
  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);

  const { mode } = useThemeContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts(filters));
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
          Harytlar
        </Typography>
        <Stack minWidth="75%">
          <TextField
            autoComplete="off"
            label="Haryt ady..."
            variant="outlined"
            fullWidth
            value={filters.nameTm}
            onChange={(e) => handleFilterChange("nameTm", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 40,
                "&:hover fieldset": {
                  borderColor: "#00B69B",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00B69B",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                pt: -3,
                lineHeight: "1",
                "&.Mui-focused": {
                  color: "#00B69B",
                },
              },
            }}
          />
        </Stack>

        <Button
          onClick={() => navigate("/products/new")}
          sx={{
            width: "14%",
            height: 40,
            color: "inherit",
            textTransform: "revert",
            fontWeight: 600,
            fontSize: 18,
            p: 1,
            ...(mode == "dark"
              ? { color: "#fff", bgcolor: "#00B69B" }
              : {
                  color: "#fff",
                  bgcolor: "#00B69B",
                  "&:hover": { color: "#fff", bgcolor: "#00B69B" },
                }),
          }}
          variant="outlined"
          // color="primary"
        >
          <AddIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
          Täze Haryt
        </Button>
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
