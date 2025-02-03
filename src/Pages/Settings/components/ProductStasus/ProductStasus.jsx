import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStatusProduct,
  getStatusProduct,
} from "../../../../Components/db/Redux/api/StatusSlice";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AddStatusModal from "./components/AddStatusModal";
import MyForm from "./components/Forms";
import UpdateStatusModal from "./components/updateStatusModal";

const ProductStasus = () => {
  const [open, setOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const { mode } = useThemeContext();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.status.data);
  const status = useSelector((state) => state.status.status);
  const error = useSelector((state) => state.status.error);

  useEffect(() => {
    dispatch(getStatusProduct());
  }, [dispatch]);
  console.log(data);
  const style2 = {
    cursor: "pointer",
    p: 0,
    pl: 2,
    fontFamily: "Montserrat",
    textAlign: "center",
  };
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteStatusProduct(id));
    }
  };
  const handleUpdateProductStatus = (elem) => {
    setOpen(true);
    setDataUpdate(elem);
  };
  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack
        direction="row"
        p="0px 8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          fontSize={{ lg: "25", md: "25", sm: "18px", xs: "18px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
          //   mt={1}
        >
          Haryt Statuslary
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            textTransform: "revert",
            minWidth: "15%",
            height: 40,
            color: "#fff",
            bgcolor: "#00B69B",
            "&:hover": { bgcolor: "#00B69B" },
            fontWeight: 500,
            fontFamily: "Montserrat",
            fontSize: 16,
            mt: 1,
          }}
        >
          <AddIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
          Täze status
        </Button>
      </Stack>
      <Stack>
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
          <Box mt={2}>
            {data.length === 0 ? (
              <Typography textAlign="center" mt={7}>
                Haryt satus gornüşi ýok!
              </Typography>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                border="1px solid gray"
                borderRadius={3}
                p={1}
              >
                <TableContainer
                  sx={{
                    ...(mode === "dark"
                      ? { background: "#0D1117" }
                      : { background: "#F3F2F7" }),
                    borderRadius: 3,
                  }}
                  component={Paper}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ ...style2, p: 1 }}>№</TableCell>
                        <TableCell sx={{ ...style2, p: 1 }}>Ady (TM)</TableCell>
                        <TableCell sx={{ ...style2, p: 1 }}>Ady (RU)</TableCell>
                        <TableCell sx={{ ...style2, p: 1 }}>Ady (EN)</TableCell>

                        <TableCell sx={{ ...style2, p: 1 }}>Aktiw</TableCell>
                        <TableCell sx={{ ...style2, p: 1 }}></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell
                            onClick={() => handleUpdateProductStatus(item)}
                            sx={style2}
                          >
                            {index + 1}
                          </TableCell>

                          <TableCell
                            onClick={() => handleUpdateProductStatus(item)}
                            sx={style2}
                          >
                            {item.nameTm}
                          </TableCell>
                          <TableCell
                            onClick={() => handleUpdateProductStatus(item)}
                            sx={style2}
                          >
                            {item.nameRu}
                          </TableCell>
                          <TableCell
                            onClick={() => handleUpdateProductStatus(item)}
                            sx={style2}
                          >
                            {item.nameEn}
                          </TableCell>
                          <TableCell
                            onClick={() => handleUpdateProductStatus(item)}
                            sx={style2}
                          >
                            {item.isActive ? "Hawa" : "Ýok"}
                          </TableCell>
                          <TableCell sx={style2}>
                            <IconButton
                              onClick={() => handleUpdateProductStatus(item)}
                              sx={{
                                backgroundColor: "inherit",
                                color: "#fff",
                              }}
                            >
                              <CreateIcon
                                sx={{
                                  color: "#00B69B",
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(item.id)}
                              sx={{
                                backgroundColor: "inherit",
                                color: "#fff",
                              }}
                            >
                              <img
                                style={{ width: 25, height: 25 }}
                                src="/images/Delete.png"
                                alt=""
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            )}
          </Box>
        ) : null}
      </Stack>
      <AddStatusModal open={open} handleClose={handleClose} />
      <UpdateStatusModal
        dataUpdate={dataUpdate}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default ProductStasus;
