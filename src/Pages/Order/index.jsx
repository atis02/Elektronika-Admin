import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById,
  getOrderStatuses,
} from "../../Components/db/Redux/api/OrderSlice";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";

import OrderButtons from "./components/OrderButtons";
import OrderProducts from "./components/OrderProducts";
import OrderDetails from "./components/OrderDetails";

const index = () => {
  const data = useSelector((state) => state.order.oneOrderData);
  const orderStatuses = useSelector((state) => state.order.orderStasuses);
  const params = useParams();
  const dispatch = useDispatch();
  console.log(data);
  console.log(orderStatuses);
  const { mode } = useThemeContext();

  useEffect(() => {
    dispatch(getOrderById(params.id));
    dispatch(getOrderStatuses());
  }, [dispatch]);
  const hoverColors = {
    "Amala aşyrylýar": "#FDE047",
    Barlagda: "#DFDFDF",
    "Eltip berilen": "#343A46",
    "Kabul edilen": "#93C5FD",
    Ýatyrylan: "#343A46",
  };

  return (
    <Box height="100vh" overflow="auto" width="100%" p="10px 20px">
      <img src="/admin/images/logo.png" className="hideOutImg" alt="" />
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography
          p="0px 0px 10px 0"
          fontSize={{ lg: "25px", md: "25px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
        >
          Sargyt № {data?.orderNumber}
        </Typography>
        <OrderButtons data={data} />
      </Stack>
      <Stack spacing={2}>
        <Stack gap={1} direction="row" className="hideOut">
          <OrderProducts data={data} />
          <OrderDetails data={data} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
