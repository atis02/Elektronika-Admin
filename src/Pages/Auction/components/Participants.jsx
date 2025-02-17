import {
  Box,
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
import React from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";

const Participants = ({ data }) => {
  const { mode } = useThemeContext();
  const style2 = {
    cursor: "pointer",
    p: 0,
    ...(mode == "dark" ? { color: "#B2BDBF" } : { color: "inherit" }),
    fontFamily: "Montserrat",
  };

  return (
    <Stack mt={1} style={{ height: "52vh", overflowY: "auto" }}>
      <Typography>Gatnaşyjylar:</Typography>
      <TableContainer
        sx={{ background: mode === "dark" ? "#0D1117" : "#F3F2F7" }}
        component={Paper}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: "0",
              background: mode === "dark" ? "#0D1117" : "#F3F2F7",
            }}
          >
            <TableRow>
              <TableCell sx={{ pl: 1 }}> № </TableCell>
              <TableCell sx={{ pl: 0 }}> Ady </TableCell>
              <TableCell sx={{ pl: 0 }}> Email</TableCell>
              <TableCell sx={{ pl: 0 }}>Telefon Belgisi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.participants?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell
                  sx={{ ...style2, pl: 1 }}
                  onClick={() => productNavigate(user.id)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ ...style2 }}
                  onClick={() => productNavigate(user.id)}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{ ...style2 }}
                  onClick={() => productNavigate(user.id)}
                >
                  {user?.email}
                </TableCell>
                <TableCell
                  sx={{ ...style2 }}
                  onClick={() => productNavigate(user.id)}
                >
                  {user.phoneNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography mt={1}>
        Ýeňiji: {data?.lastBidder?.email} - {data?.lastBidder?.name} -{" "}
        {data?.lastBidder?.phoneNumber}
      </Typography>
    </Stack>
  );
};

export default Participants;
