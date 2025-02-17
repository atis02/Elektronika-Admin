import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../../../../../Components/db/Theme/ThemeContext";
import MyForm from "./Forms";

const style = {
  position: "absolute",
  top: "20%",
  left: "30%",
  //   transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%" }, // Responsive width
  bgcolor: "background.paper",
  border: "1px solid gray",
  height: "auto",
  boxShadow: 24,
  //   p: 4,
  borderRadius: 2, // Rounded corners
};

const UpdateStatusModal = ({ open, handleClose, dataUpdate }) => {
  //   const [open, setOpen] = useState(false);

  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const { mode } = useThemeContext();
  console.log(dataUpdate);

  return (
    <Modal
      disableAutoFocus
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Stack
          bgcolor={mode === "dark" ? "#0D1117" : "#F3F2F7"}
          p="15px 20px"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          textTransform="capitalize"
          sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          borderBottom={
            mode === "dark" ? "1px solid rgb(85, 85, 85)" : "1px solid gray"
          }
        >
          <Typography
            color={mode === "dark" ? "#fff" : "#474747"}
            fontSize={20}
            fontWeight={500}
            fontFamily="Montserrat"
          >
            {dataUpdate?.nameTm}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "inherit" }} />
          </IconButton>
        </Stack>
        <MyForm handleClose={handleClose} dataUpdate={dataUpdate} />
      </Box>
    </Modal>
  );
};

export default UpdateStatusModal;
