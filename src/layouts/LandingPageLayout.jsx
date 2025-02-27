import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar/Navbar";
// import { ToastContainer } from "react-toastify";
import { ToastContainer } from "react-toastify";
// import Login from './Login'

export default function LandingPageLayout() {
  const admin = localStorage.getItem("token");

  return (
    <Box>
      <Stack direction="row" maxHeight="100vh">
        <Sidebar />
        <ToastContainer/>
        <Stack direction="column" width="100%">
          <Navbar />
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
}
