import {
  Box,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import dayjs from "dayjs";
import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";

const OrderProducts = ({ data }) => {
  const { mode } = useThemeContext();
  console.log(data);
  const style2 = {
    cursor: "pointer",
    p: 0,
    ...(mode == "dark" ? { color: "#B2BDBF" } : { color: "inherit" }),
    fontFamily: "Montserrat",
    textAlign: "center",
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
  return (
    <Box
      //  width="65%"
      className="hideOutItem"
    >
      <TableContainer
        sx={{
          background: mode === "dark" ? "#0D1117" : "#F3F2F7",
          borderRadius: 2,
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 1, textAlign: "center" }}>№</TableCell>
              <TableCell sx={{ pl: 0, textAlign: "center" }}>Surady</TableCell>
              <TableCell sx={{ pl: 0, textAlign: "center" }}>Ady</TableCell>
              <TableCell sx={{ pl: 0, textAlign: "center" }}>Sany</TableCell>
              <TableCell sx={{ pl: 0, textAlign: "center" }}>
                Haryt bahasy
              </TableCell>
              <TableCell sx={{ pl: 0, textAlign: "center" }}>
                Umumy baha
              </TableCell>
              {/* <TableCell sx={{ pl: 0, textAlign: "center" }}></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.orderItems?.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell
                  sx={{ ...style2 }}
                  onClick={() => productNavigate(category.id)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  onClick={() => productNavigate(category.id)}
                  sx={{ ...style2, width: 25 }}
                >
                  <div
                    style={{
                      width: "100%",
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
                  sx={{ ...style2, minWidth: 200, maxWidth: 200 }}
                  onClick={() => productNavigate(category.id)}
                >
                  {category.product?.nameTm}

                  {/* {dayjs(category.createdAt).format("DD.MM.YYYY (HH:mm)")} */}
                </TableCell>
                <TableCell
                  onClick={() => productNavigate(category.id)}
                  sx={{ ...style2 }}
                >
                  <Typography sx={style3}>{category.quantity}</Typography>
                </TableCell>
                <TableCell
                  onClick={() => productNavigate(category.id)}
                  sx={{ ...style2 }}
                >
                  <Typography sx={style3}>
                    {category.product?.sellPrice} m
                    {/* {dayjs(category.deliveryDate).format("DD.MM.YYYY")} */}
                  </Typography>
                </TableCell>
                <TableCell
                  onClick={() => productNavigate(category.id)}
                  sx={{ ...style2 }}
                >
                  <Typography sx={style3}> {data?.totalAmount}</Typography>
                </TableCell>
                {/* <TableCell
                  sx={style2}
                  onClick={() => productNavigate(category.id)}
                >
                  {data?.totalAmount}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderProducts;
