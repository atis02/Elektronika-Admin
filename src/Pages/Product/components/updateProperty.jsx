import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import {
  createProperty,
  updateProductProperty,
} from "../../../Components/db/Redux/api/ProductSlice";

const UpdatePropertyModal = ({ open, handleClose, update, productId }) => {
  const [propertyName, setPropertyName] = useState(update?.key);
  const [propertyValue, setPropertyValue] = useState(update?.value);

  const dispatch = useDispatch();
  const handleAddProperty = () => {
    if (propertyName && propertyValue) {
      const body = {
        productPropertyId: update?.id,
        key: propertyName,
        value: propertyValue,
      };
      dispatch(updateProductProperty({ body, productId }));
      setPropertyName("");
      setPropertyValue("");
      handleClose();
    }
  };
  console.log(update);

  useEffect(() => {
    if (update) {
      setPropertyName(update.key || "");
      setPropertyValue(update.value || "");
    }
  }, [update]);

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
      onClose={() => {
        handleClose();
        setPropertyName("");
        setPropertyValue("");
      }}
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
          <Typography fontFamily="Montserrat" fontSize={20}></Typography>
          <IconButton
            onClick={() => {
              handleClose();
              setPropertyName("");
              setPropertyValue("");
            }}
          >
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
            <SaveIcon style={{ width: 30, height: 30, marginRight: 8 }} />
            Ýatda sakla
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdatePropertyModal;
