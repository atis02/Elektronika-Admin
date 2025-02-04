import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Stack,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { getProducts } from "../../../Components/db/Redux/api/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";

const ProductAutocomplete = ({
  selectedProduct,
  handleProductChange,
  errors,
}) => {
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

  const products = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(filters));
  }, [filters, dispatch]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  return (
    <Stack spacing={1} width="100%">
      <Typography variant="h6">Auksion üçin haryt saýla:</Typography>

      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.nameTm}
        value={selectedProduct}
        onChange={handleProductChange}
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
        renderOption={(props, option) =>
          status === "loading" ? (
            <Stack
              direction="column"
              height="60%"
              alignItems="center"
              sx={{ gap: "10px", pt: 8 }}
            >
              <CircularProgress />
              Loading...
            </Stack>
          ) : status === "failed" || error == "Network Error" ? (
            (toast.error("Internet baglanyşygy ýok"),
            (
              <Typography textAlign="center" color="tomato" mt={7}>
                Internet baglanyşygy ýok
              </Typography>
            ))
          ) : (
            <ListItem {...props}>
              <ListItemAvatar>
                <Avatar
                  alt={option.imageOne}
                  src={`${BASE_URL_Img}/images/${option.imageOne}`}
                />
              </ListItemAvatar>
              <ListItemText primary={option.nameTm} />
            </ListItem>
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Harytlar"
            variant="outlined"
            sx={inputStyle}
            error={errors}
          />
        )}
      />
      {selectedProduct && (
        <Stack>
          <br />
          <Stack alignItems="center">
            <div
              style={{
                width: "230px",
                height: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={`${BASE_URL_Img}/images/${selectedProduct.imageOne}`}
                alt="Category"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" mt={2} spacing={2}>
            <strong>Auksion harydy:</strong>{" "}
            <Typography textTransform="capitalize">
              {selectedProduct.nameTm}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" mt={2} spacing={2}>
            <strong>Bahasy:</strong>{" "}
            <Typography textTransform="capitalize">
              {selectedProduct.sellPrice} TMT
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductAutocomplete;
