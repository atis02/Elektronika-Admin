import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddPropertyModal from "./AddProperty";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductProperty,
  getProductProperties,
} from "../../../Components/db/Redux/api/ProductSlice";
import UpdatePropertyModal from "./updateProperty";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: 2,
  boxShadow: 24,
  //   p: 2,
  pt: 0,
};

export default function AddProperty({
  open,
  handleClose,
  addProperty,
  productId,
}) {
  const [addOpenProperty, setOpenAddProperty] = useState();
  const { mode } = useThemeContext();
  const [update, setUpdate] = useState();
  const dispatch = useDispatch();
  const propertyData = useSelector((state) => state.product.productProperties);
  const [addNewProperty, setAddOpenProperty] = useState();
  useEffect(() => {
    if (productId) {
      dispatch(getProductProperties(productId));
    }
  }, [productId, dispatch]);

  const handleDelete = (property) => {
    dispatch(
      deleteProductProperty({
        productPropertyId: property.id,
        productId: productId,
      })
    );
  };
  const handleOpenUpdateProperty = (property) => {
    setUpdate(property);
    setOpenAddProperty(true);
  };
  const style2 = {
    p: 0.8,
    pl: 2,
    fontFamily: "Montserrat",
    textTransform: "capitalize",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            borderBottom="1px solid gray"
          >
            <Typography fontFamily="Montserrat" fontSize={20}>
              Haryt aýratynlyklyklary
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack p={2}>
            <Stack alignItems="end">
              <Button
                sx={{
                  textTransform: "revert",
                  minWidth: "18%",
                  height: 40,
                  color: "#fff",
                  bgcolor: "#00B69B",
                  "&:hover": { bgcolor: "#00B69B" },
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  fontSize: 16,
                }}
                onClick={() => setAddOpenProperty(true)}
              >
                <AddIcon />
                Goşmak
              </Button>
            </Stack>

            <Stack
              sx={{
                overflow: "auto",
                maxHeight: "calc(72vh - 75px)",
                mt: 1,
              }}
            >
              {!propertyData?.length ? (
                <Typography textAlign="center">Aýratynlyk ýok</Typography>
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
                        <TableCell>Ady</TableCell>
                        <TableCell>Mazmuny</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {propertyData.map((property, index) => (
                        <TableRow key={property.id}>
                          <TableCell sx={style2}>{index + 1}</TableCell>
                          <TableCell sx={style2}>{property.key}</TableCell>
                          <TableCell sx={style2}>{property.value}</TableCell>
                          <TableCell sx={{ ...style2, width: 100 }}>
                            <IconButton
                              onClick={() => {
                                handleOpenUpdateProperty(property);
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
                              onClick={() => handleDelete(property)}
                              sx={{ backgroundColor: "inherit", color: "#fff" }}
                            >
                              <img
                                style={{ width: 20, height: 20 }}
                                src="/admin/images/Delete.png"
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
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <AddPropertyModal
        update={update}
        addProperty={addProperty}
        open={addNewProperty}
        handleClose={() => setAddOpenProperty(false)}
        productId={productId}
      />
      <UpdatePropertyModal
        update={update}
        addProperty={addProperty}
        open={addOpenProperty}
        handleClose={() => setOpenAddProperty(false)}
        productId={productId}
      />
    </div>
  );
}
