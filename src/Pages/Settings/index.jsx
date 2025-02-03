import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import ModalForSettings from "./components/ModalForSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import GridComponent from "../../layouts/Grid";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [open, setOpen] = useState(false);
  const [openElem, setOpenElem] = useState();

  const handleOpen = (elem) => {
    setOpen(true);
    setOpenElem(elem);
  };
  const handleClose = () => setOpen(false);

  const { mode } = useThemeContext();
  const navigate = useNavigate();
  const gridStyle = {
    ...(mode === "dark"
      ? { background: "#0D1117", border: "1px solid gray" }
      : { background: "#F3F2F7", border: "1px solid lightgray" }),
    padding: "16px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: 2,
    minHeight: "125px",
    fontSize: 18,
    display: "flex",
    ml: 1,
    mt: 1,
  };
  const settingsData = [
    {
      name: "Haryt statuslary",
      icon: <ShoppingCartIcon sx={{ width: 30, height: 30 }} />,
      url: "/settings/productStasuses",
    },
    {
      url: "/settings/orderStatuses",

      name: "Sargyt statuslary",
      icon: <AssignmentIcon sx={{ width: 30, height: 30 }} />,
    },
    {
      url: "/settings/regions",

      name: "Sebitler",
      icon: <LocationOnIcon sx={{ width: 30, height: 30 }} />,
    },
    {
      name: "Ulanyjylar",
      icon: <PeopleIcon sx={{ width: 30, height: 30 }} />,
      url: "/settings/users",
    },
    {
      url: "/settings/clients",
      name: "Müşderiler",
      icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
    },
    {
      url: "/settings/deliveryTimes",

      name: "Eltip berme wagtlary",
      icon: <AccessTimeIcon sx={{ width: 30, height: 30 }} />,
    },
    {
      url: "/settings/deliveryTypes",

      name: "Eltip berme görnüşleri",
      icon: <LocalShippingIcon sx={{ width: 30, height: 30 }} />,
    },
    {
      url: "/settings/paymentTypes",

      name: "Tölegiň görnüşleri",
      icon: <PaymentIcon sx={{ width: 30, height: 30 }} />,
    },
  ];
  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="0px 8px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
          //   mb={2}
        >
          Sazlamalar
        </Typography>
      </Stack>
      <Stack width="100%">
        <Grid container>
          {settingsData.map((elem, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => navigate(elem.url)}
            >
              <Stack sx={gridStyle}>
                {elem.icon}
                {elem.name}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      {/* <ModalForSettings open={open} elem={openElem} handleClose={handleClose} /> */}
    </Box>
  );
};

export default index;
