import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../../Components/db/Redux/api/ReduxSlice";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";
import UpdateCategoryModal from "./UpdateSubCategory";
import {
  deleteSubCategory,
  getSubCategory,
} from "../../../Components/db/Redux/api/SubCategorySlice";
import {
  deleteSegment,
  getSegment,
} from "../../../Components/db/Redux/api/SegmentSlice";

const Get = ({ searchTerm }) => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(null);
  const [image, setImage] = useState("");
  const [data2, setData] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const [updateData, setUpdatedata] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const { mode } = useThemeContext();

  const Image = (event) => {
    setImage(event.target.files[0]);
  };
  const UpdateImage = (event) => {
    setImageUpdate(event.target.files[0]);
  };
  const handleOpenUpdateCategory = (elem) => {
    setCategoryData(elem);
    setOpenUpdate(true);
  };
  const handleCloseUpdateCategory = () => setOpenUpdate(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.segment.data);
  const status = useSelector((state) => state.segment.status);
  const error = useSelector((state) => state.segment.error);
  const meta = useSelector((state) => state.data.meta);

  console.log(data);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(getCategory({ limit: meta.limit, page: meta.page }));
  //   }
  // }, [status, dispatch, meta.page, meta.limit]);
  useEffect(() => {
    dispatch(getSegment());
  }, [dispatch]);

  const handleDelete = (category_id) => {
    const body = { id: category_id };
    dispatch(deleteSegment(body));
  };
  const handleCreate = () => {
    const body = new FormData();
    body.append("image", image);
    body.append("nameTm", data2);
    dispatch(createCategory(body));
    setData("");
  };
  const handleChangeStep = (e, newValues) => {
    setId(newValues.id);
  };
  const handleUpdate = () => {
    setShow(null);
    const updatedItem = {
      id,
      icon: imageUpdate,
      name: updateData,
    };
    dispatch(updateCategory(updatedItem));
    setUpdatedata("");
    setImageUpdate("");
  };
  const handleOpen = (id) => {
    setShow(id);
  };
  const handleChangePagination = (event, value) => {
    dispatch(getCategory({ limit: meta.limit, page: value }));
  };
  const handleClose = () => setShow(null);
  const style2 = {
    p: 0,
    pl: 2,
    fontFamily: "Montserrat",
    textTransform: "capitalize",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { lg: 500, md: 500, sm: 500, xs: "100%" },
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 14,
    p: 4,
  };
  const filteredData = data.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.nameTm.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.nameRu.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.nameEn.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <>
      {status === "loading..." ? (
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
        <Box p={1.5} pt={0}>
          {filteredData.length == 0 ? (
            <Typography textAlign="center" mt={7}>
              Segment ýok!
            </Typography>
          ) : (
            <TableContainer
              sx={{
                ...(mode === "dark"
                  ? { background: "#0D1117" }
                  : { background: "#F3F2F7" }),
              }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Surady</TableCell>
                    <TableCell>Subkategoriýasy</TableCell>
                    <TableCell>Ady (TM)</TableCell>
                    <TableCell>Ady (RU)</TableCell>
                    <TableCell>Ady (EN)</TableCell>
                    <TableCell>Aktiw</TableCell>
                    <TableCell>Hereketler</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell sx={style2}>{index + 1}</TableCell>
                      <TableCell sx={style2}>
                        {category.image ? (
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                              ...(mode == "dark"
                                ? { background: "#23272F" }
                                : { background: "#fff" }),
                            }}
                          >
                            <img
                              src={`${BASE_URL_Img}/images/${category.image}`}
                              alt="image of category"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                              crossOrigin="anonymous"
                            />
                          </div>
                        ) : (
                          <Stack height={50} justifyContent="center">
                            <Typography pl={1} color="gray" textAlign="start">
                              ýok
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell sx={style2}>
                        {category.parentSubCategory?.nameTm}
                      </TableCell>
                      <TableCell sx={style2}>{category.nameTm}</TableCell>
                      <TableCell sx={style2}>{category.nameRu}</TableCell>
                      <TableCell sx={style2}>{category.nameEn}</TableCell>
                      <TableCell sx={style2}>
                        {category.isActive ? "Hawa" : "Ýok"}
                      </TableCell>
                      <TableCell sx={style2}>
                        <IconButton
                          onClick={() => {
                            handleOpenUpdateCategory(category);
                            setId(category.id);
                          }}
                          sx={{ backgroundColor: "inherit", color: "#fff" }}
                        >
                          <BorderColorOutlinedIcon
                            sx={{
                              color: "#00B69B",
                              width: 20,
                              height: 20,
                            }}
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
            </TableContainer>
          )}
          <UpdateCategoryModal
            open={openUpdate}
            handleClose={handleCloseUpdateCategory}
            data={categoryData}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Get;
