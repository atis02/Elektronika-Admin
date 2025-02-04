import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../Components/db/Redux/api/ProductSlice";
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
  TextField,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";
import DateRangeFilter from "./DateRange";
import { FaSearch } from "react-icons/fa";
import { deleteAuction } from "../../../Components/db/Redux/api/AuctionSlice";

const Get = ({ filters, setFilters }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempFilters, setTempFilters] = useState(filters);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auction.data);

  const status = useSelector((state) => state.auction.status);
  const error = useSelector((state) => state.auction.error);
  const meta = useSelector((state) => state.auction.meta);
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const handleFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setFilters(tempFilters);
  };

  const handleChangePagination = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };
  const productNavigate = (id) => {
    navigate(`/auction/${id}`);
  };
  const handleResetFilters = () => {
    setTempFilters({
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

    setFilters({
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
    setStartDate(null);
    setEndDate(null);
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
      dispatch(deleteAuction(id));
    }
  };
  const currentDate = new Date(); // Current date and time

  const activeAuctions = data.filter((auction) => {
    const endDate = new Date(auction.endDateAuction); // Convert endDateAuction to Date object
    return endDate > currentDate; // If endDateAuction is in the past, the auction has ended
  });

  return (
    <>
      <Box p={1.5} pt={0.5}>
        <Stack
          direction="column"
          spacing={1}
          width="100%"
          justifyContent="space-between"
          mb={1}
        >
          <Stack minWidth="100%">
            <TextField
              autoComplete="off"
              label="Haryt ady..."
              variant="outlined"
              fullWidth
              value={tempFilters.nameTm}
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
          <Stack direction="row" spacing={2}>
            <DateRangeFilter
              onFilter={handleFilterChange}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <TextField
              label="Min häzirki baha"
              variant="outlined"
              size="small"
              autoComplete="off"
              name="minPrice"
              type="number"
              value={tempFilters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              sx={inputsStyle2}
            />
            <TextField
              label="Max häzirki baha"
              autoComplete="off"
              variant="outlined"
              size="small"
              name="maxPrice"
              type="number"
              value={tempFilters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              sx={inputsStyle2}
            />

            <Button
              variant="outlined"
              onClick={applyFilters}
              sx={{
                textTransform: "revert",
                width: "14%",
                //   ml: 0,
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontSize: 18,
                gap: 1,
              }}
            >
              <FaSearch size={20} />
              Gözle
            </Button>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              sx={{
                textTransform: "revert",
                width: "14%",
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontSize: 18,
                gap: 1,
              }}
            >
              <MdSearchOff size={30} />
              Arassala
            </Button>
          </Stack>
        </Stack>

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
            {activeAuctions.length === 0 ? (
              <Typography textAlign="center" mt={7}>
                Auksion ýok!
              </Typography>
            ) : (
              <TableContainer
                sx={{ background: mode === "dark" ? "#0D1117" : "#F3F2F7" }}
                component={Paper}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 1 }}> ID</TableCell>
                      <TableCell sx={{ pl: 0 }}> Surady</TableCell>
                      <TableCell sx={{ pl: 0 }}>Harydyň Ady (TM)</TableCell>
                      <TableCell sx={{ pl: 0 }}>Häzirki baha (manat)</TableCell>
                      <TableCell sx={{ pl: 0 }}>Başdaky baha (manat)</TableCell>
                      <TableCell sx={{ pl: 0 }}>
                        Başlanýan - Tamamlanýan wagty
                      </TableCell>
                      {/* <TableCell sx={{ pl: 0 }}>Tamamlanýan wagty</TableCell> */}
                      <TableCell sx={{ pl: 0 }}>Ýeňiji ady</TableCell>
                      <TableCell sx={{ pl: 0 }}>Gatnaşyjylaryň sany</TableCell>
                      <TableCell sx={{ pl: 0 }}>Döredilen </TableCell>
                      <TableCell sx={{ pl: 0 }}>Üýtgedilen </TableCell>
                      <TableCell>Hereketler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeAuctions.map((category, index) => (
                      <TableRow
                        key={category.id}
                        style={{
                          ...(category.isActive
                            ? { background: "#6B8E23" }
                            : { background: "#455A64" }),
                        }}
                      >
                        <TableCell
                          sx={{ ...style2, pl: 1, width: 15 }}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.auctionID}
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
                              src={`${BASE_URL_Img}/images/${category.product?.imageOne}`}
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
                          sx={{ ...style2, minWidth: 190, maxWidth: 190 }}
                        >
                          <Typography sx={style3}>
                            {category.product?.nameTm}
                          </Typography>
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2 }}
                        >
                          <Typography sx={style3}>
                            {category.auctionProductPriceCurrent}
                          </Typography>
                        </TableCell>
                        <TableCell
                          onClick={() => productNavigate(category.id)}
                          sx={{ ...style2 }}
                        >
                          <Typography sx={style3}>
                            {category.auctionProductPriceStart}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {dayjs(category.startDateAuction).format(
                            "DD.MM.YYYY"
                          )}{" "}
                          -{" "}
                          {dayjs(category.endDateAuction).format("DD.MM.YYYY")}
                        </TableCell>

                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.lastBidder?.name}
                        </TableCell>

                        <TableCell
                          sx={style2}
                          onClick={() => productNavigate(category.id)}
                        >
                          {category.participants?.length}
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
