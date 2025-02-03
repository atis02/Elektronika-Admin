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
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import Forms from "./Forms";

const CreateSubCategoryModal = ({ open, handleClose }) => {
  const { mode } = useThemeContext();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableAutoFocus
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "52%",
          transform: "translate(-50%, -50%)",
          width: 750,
          minHeight: 350,
          bgcolor: "background.paper",
          border: "0px solid #000",
          boxShadow: 24,
          //   p: 4,
          borderRadius: 2,
        }}
      >
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
            fontSize={24}
            fontWeight={500}
            fontFamily="Montserrat"
          >
            Täze subkategoriýa
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "inherit" }} />
          </IconButton>
        </Stack>
        <Forms handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default CreateSubCategoryModal;
