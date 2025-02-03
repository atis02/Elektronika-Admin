import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
} from "../../../Components/db/Redux/api/ProductSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Paper,
  Pagination,
  Button,
  Stack,
  IconButton,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../../Components/db/Redux/api/SubCategorySlice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getSegment } from "../../../Components/db/Redux/api/SegmentSlice";
import { getBrand } from "../../../Components/db/Redux/api/BrandSlice";

const Get = ({ filters, handleFilterChange, setFilters }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data); // Assuming sub-category data in Redux
  const segments = useSelector((state) => state.segment.data);
  const brands = useSelector((state) => state.brand.data);

  const data = useSelector((state) => state.product.data);

  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const meta = useSelector((state) => state.product.meta);
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  useEffect(() => {
    dispatch(getProducts(filters));
    dispatch(getSegment());
    dispatch(getBrand());
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [filters, dispatch]);

  const handleChangePagination = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };
  const productNavigate = (id) => {
    navigate(`/products/${id}`);
  };
  const handleResetFilters = () => {
    setFilters({
      categoryId: "",
      subCategoryId: "",
      segmentId: "",
      brandId: "",
      minPrice: "",
      maxPrice: "",
      nameTm: "",
      sortBy: "createdAt",
      sortOrder: "DESC",
      page: 1,
      limit: 10,
    });
  };
  const style2 = {
    cursor: "pointer",
    p: 0,
    ...(mode == "dark" ? { color: "#B2BDBF" } : { color: "inherit" }),
    fontFamily: "Montserrat",
  };
  const style3 = {
    fontSize: "14px",
    fontFamily: "Montserrat",

    // width: "",
    pt: 1,

    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };
  const inputsStyle = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      minWidth: "201px",
      width: "100%",
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
      pt: -3,
      lineHeight: "1",
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  const inputsStyle2 = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      minWidth: "101px",
      width: "100%",
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
      pt: -3,
      lineHeight: "1",
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Box p={1.5} pt={0.5}>
        <Stack
          direction="row"
          spacing={1}
          width="100%"
          justifyContent="space-between"
          mb={1}
        >
          <Autocomplete
            options={categories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            value={
              categories.find((cat) => cat.id === filters.categoryId) || null
            }
            onChange={(event, value) =>
              handleFilterChange("categoryId", value?.id || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Kategoriýa"
                //   variant="outlined"
                size="small"
                sx={{ ...inputsStyle }}
              />
            )}
          />

          <Autocomplete
            options={subCategories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            value={
              subCategories.find((sub) => sub.id === filters.subCategoryId) ||
              null
            }
            onChange={(event, value) =>
              handleFilterChange("subCategoryId", value?.id || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subkategoriýa"
                variant="outlined"
                size="small"
                sx={{ ...inputsStyle }}
              />
            )}
          />
          <Autocomplete
            options={segments || []}
            getOptionLabel={(option) => option.nameTm || ""}
            value={
              segments?.find((sub) => sub.id === filters.segmentId) || null
            }
            onChange={(event, value) =>
              handleFilterChange("segmentId", value?.id || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Segment"
                variant="outlined"
                size="small"
                sx={{ ...inputsStyle }}
              />
            )}
          />
          <Autocomplete
            options={brands || []}
            getOptionLabel={(option) => option.nameTm || ""}
            value={brands?.find((sub) => sub.id === filters.brandId) || null}
            onChange={(event, value) =>
              handleFilterChange("brandId", value?.id || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                variant="outlined"
                size="small"
                sx={{ ...inputsStyle }}
              />
            )}
          />
          <TextField
            label="Min Baha"
            variant="outlined"
            size="small"
            autoComplete="off"
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            sx={inputsStyle2}
          />
          <TextField
            label="Max Baha"
            autoComplete="off"
            variant="outlined"
            size="small"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            sx={inputsStyle2}
          />
          {/* <TextField
            label="Ady (TM)"
            variant="outlined"
            autoComplete="off"
            size="small"
            name="nameTm"
            value={filters.nameTm}
            onChange={(e) => handleFilterChange("nameTm", e.target.value)}
            sx={inputsStyle}
          /> */}
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            sx={{
              textTransform: "revert",
              width: "14%",
              //   ml: 0,
              height: 40,
              color: "#fff",
              bgcolor: "#00B69B",
              "&:hover": { bgcolor: "#00B69B" },
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Arassala
          </Button>
        </Stack>
        {/* <Grid container spacing={2} sx={{ mb: 0.5 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Autocomplete
              options={categories || []}
              getOptionLabel={(option) => option.nameTm || ""}
              value={
                categories.find((cat) => cat.id === filters.categoryId) || null
              }
              onChange={(event, value) =>
                handleFilterChange("categoryId", value?.id || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kategoriýa"
                  variant="outlined"
                  size="small"
                  sx={inputsStyle}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Autocomplete
              options={categories.subCategories || []}
              getOptionLabel={(option) => option.nameTm || ""}
              value={
                categories.subCategories?.find(
                  (sub) => sub.id === filters.subCategoryId
                ) || null
              }
              onChange={(event, value) =>
                handleFilterChange("subCategoryId", value?.id || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subkategoriýa"
                  variant="outlined"
                  size="small"
                  sx={inputsStyle}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <TextField
              label="Min Baha"
              variant="outlined"
              size="small"
              autoComplete="off"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              sx={{ ...inputsStyle, mb: 1 }}
            />
            <TextField
              label="Max Baha"
              autoComplete="off"
              variant="outlined"
              size="small"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              sx={inputsStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <TextField
              label="Ady (TM)"
              variant="outlined"
              autoComplete="off"
              size="small"
              name="nameTm"
              value={filters.nameTm}
              onChange={(e) => handleFilterChange("nameTm", e.target.value)}
              sx={inputsStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              sx={{
                width: "100%",
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Arassala
            </Button>
          </Grid>
        </Grid> */}

        {status === "loading" ? (
          <Stack
            direction="column"
            height="60%"
            alignItems="center"
            sx={{ gap: "10px", pt: 8 }}
          >
            <CircularProgress />
            Loading...
          </Stack>
        ) : status === "failed" ? (
          error == "Network Error" ? (
            (toast.error("Internet baglanyşygy ýok"),
            (
              <Typography textAlign="center" color="tomato" mt={7}>
                Internet baglanyşygy ýok
              </Typography>
            ))
          ) : (
            (toast.error(error),
            (
              <Typography textAlign="center" color="tomato" mt={7}>
                {error}
              </Typography>
            ))
          )
        ) : status === "succeeded" ? (
          <Box>
            {data.length === 0 ? (
              <Typography textAlign="center" mt={7}>
                Haryt ýok!
              </Typography>
            ) : (
              <TableContainer
                sx={{ background: mode === "dark" ? "#0D1117" : "#F3F2F7" }}
                component={Paper}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 1 }}>№</TableCell>
                      <TableCell sx={{ pl: 0 }}>Surady</TableCell>
                      <TableCell sx={{ pl: 0 }}>Haryt Ady (TM)</TableCell>
                      <TableCell sx={{ pl: 0 }}>Haryt Ady (RU)</TableCell>
                      <TableCell sx={{ pl: 0 }}>Haryt Ady (EN)</TableCell>
                      <TableCell sx={{ pl: 0 }}>Kategoriýa</TableCell>
                      <TableCell sx={{ pl: 0 }}>Bahasy</TableCell>
                      <TableCell sx={{ pl: 0 }}>Ýagdaýy</TableCell>
                      <TableCell sx={{ pl: 0 }}>Döredilen</TableCell>
                      <TableCell sx={{ pl: 0 }}>Üýtgedilen</TableCell>
                      <TableCell>Hereketler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((category, index) => (
                      <TableRow key={category.id}>
                        <TableCell
                          sx={{ ...style2, pl: 1, width: 15 }}
                          onClick={() => productNavigate(category.id)}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{ ...style2, width: 25 }}
                          onClick={() => productNavigate(category.id)}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${BASE_URL_Img}/images/${category.imageOne}`}
                              alt="Category"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2, minWidth: 200, maxWidth: 200 }}
                        >
                          <Typography sx={style3}>{category.nameTm}</Typography>
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2, minWidth: 200, maxWidth: 200 }}
                        >
                          <Typography sx={style3}>{category.nameRu}</Typography>
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2, minWidth: 200, maxWidth: 200 }}
                        >
                          <Typography sx={style3}>{category.nameEn}</Typography>
                        </TableCell>
                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.productCategory?.nameTm}
                        </TableCell>
                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.sellPrice} m
                        </TableCell>

                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.isActive ? "Hawa" : "Ýok"}
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2, width: "30px", textAlign: "center" }}
                        >
                          {dayjs(category.createdAt).format("DD.MM.YYYY HH:mm")}
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2, width: "30px", textAlign: "center" }}
                        >
                          {dayjs(category.updatedAt).format("DD.MM.YYYY HH:mm")}
                        </TableCell>

                        <TableCell sx={style2}>
                          <IconButton
                            onClick={() => productNavigate(category.id)}
                            sx={{ ml: 2 }}
                          >
                            <BorderColorOutlinedIcon
                              sx={{ color: "#00B69B" }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(category.id)}
                            sx={{ backgroundColor: "inherit", color: "#fff" }}
                          >
                            <img
                              style={{ width: 20, height: 20 }}
                              src="/images/Delete.png"
                              alt=""
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={meta?.totalPages || 0}
                  page={filters.page}
                  onChange={handleChangePagination}
                  color="primary"
                  variant="outlined"
                  sx={{ m: 1, display: "flex", justifyContent: "center" }}
                />
              </TableContainer>
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Get;
