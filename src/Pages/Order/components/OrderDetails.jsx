import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import dayjs from "dayjs";

const OrderDetails = ({ data }) => {
  const { mode } = useThemeContext();

  const borderColor = mode === "dark" ? "rgb(85, 85, 85)" : "lightgray";

  const formatPhoneNumber = (number) =>
    `+${number?.slice(0, 3)}-${number?.slice(3, 5)}-${number?.slice(
      5,
      7
    )}-${number?.slice(7, 9)}-${number?.slice(9)}`;

  const statusColors = {
    "Amala aşyrylýar": "#FDE047",
    Barlagda: "#DFDFDF",
    "Eltip berilen": "#86EFAC",
    "Kabul edilen": "#93C5FD",
    Ýatyrylan: "#FCA5A5",
  };

  const InfoRow = ({ label, value, customColor }) => (
    <Stack
      direction="row"
      justifyContent="space-between"
      borderBottom={`1px solid ${borderColor}`}
      p={0.5}
      mt={1}
    >
      <Typography fontFamily="Montserrat">{label}</Typography>
      <Typography
        fontFamily="Montserrat"
        sx={{
          color: customColor,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Box
      // width="35%"
      className="hideOutItem2"
      border={`1px solid ${borderColor}`}
      borderRadius={2}
      p={1.5}
    >
      {[
        { label: "Sargyt belgisi:", value: data.orderNumber },
        {
          label: "Döredilen senesi:",
          value: dayjs(data.createdAt).format("DD.MM.YYYY , HH:mm"),
        },
        {
          label: "Sargydyň ýagdaýy:",
          value: data.orderStatusDetails?.nameTm,
          customColor: statusColors[data.orderStatusDetails?.nameTm],
        },
        {
          label: "Telefon belgisi:",
          value: formatPhoneNumber(data.customerPhoneNumber?.replace("+", "")),
        },
        { label: "Salgy (welaýat):", value: data.orderRegion },
        { label: "Salgy (şäher):", value: data.orderCity },
        { label: "Salgy (öý):", value: data.shippingAddress },
        { label: "Teswir:", value: data.notes },
        { label: "Töleg:", value: data.paymentMethod },
        { label: "Eltip berme görnüşi:", value: data.deliveryType },
        {
          label: "Eltip bermeli senesi:",
          value: dayjs(data.deliveryDate).format("DD.MM.YYYY"),
        },
        { label: "Eltip bermeli salgysy:", value: `${data.orderCity} / 20 M` },
        { label: "Harytlaryň umumy sany:", value: data.orderItems?.length },
        { label: "Sargydyň umumy bahasy:", value: `${data.totalAmount} M` },
      ].map((item, index) => (
        <InfoRow key={index} {...item} />
      ))}
    </Box>
  );
};

export default OrderDetails;
