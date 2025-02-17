import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const AddPropertyModal = ({ open, handleClose, addProperty }) => {
  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const handleAddProperty = () => {
    if (propertyName && propertyValue) {
      addProperty(propertyName, propertyValue);
      toast.success("Üstünlikli!");
      setPropertyName("");
      setPropertyValue("");
      handleClose();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    bgcolor: "background.paper",
    border: "1px solid gray",
    borderRadius: 2,
    boxShadow: 24,
    pt: 0,
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#00B69B" },
      "&.Mui-focused fieldset": { borderColor: "#00B69B", borderWidth: 2 },
    },
    "& .MuiInputLabel-root": { "&.Mui-focused": { color: "#00B69B" } },
  };

  return (
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
            Täze Haryt aýratynlygy
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack p={2}>
          <Stack direction="column" spacing={2}>
            <TextField
              sx={{ ...inputStyle, width: "100%" }}
              label="Aýratynlyk ady"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <TextField
              sx={{ ...inputStyle, width: "100%" }}
              label="Aýratynlyk mazmuny"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Stack>
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
              mt: 2,
            }}
            onClick={handleAddProperty}
            disabled={!propertyName || !propertyValue}
          >
            <AddIcon />
            Goşmak
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddPropertyModal;
