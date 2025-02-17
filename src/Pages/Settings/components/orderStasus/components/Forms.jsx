import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  Stack,
} from "@mui/material";
import SwitchComponent from "../../../../../layouts/Switch";
import { useDispatch } from "react-redux";
import {
  createStatusProduct,
  updateStatusProduct,
} from "../../../../../Components/db/Redux/api/StatusSlice";
import { toast } from "react-toastify";
import {
  createStatusOrder,
  updateStatusOrder,
} from "../../../../../Components/db/Redux/api/OrderStatusSlice";

const MyForm = ({ handleClose, dataUpdate }) => {
  const [formData, setFormData] = useState({
    nameTm: "",
    nameRu: "",
    nameEn: "",
  });

  const [errors, setErrors] = useState({
    nameTm: "",
    nameRu: "",
    nameEn: "",
  });
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (dataUpdate) {
      setFormData({
        nameTm: dataUpdate.nameTm,
        nameRu: dataUpdate.nameRu,
        nameEn: dataUpdate.nameEn,
      });
      setActive(dataUpdate.isActive);
    }
  }, [dataUpdate]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    let newErrors = {};
    console.log("test");

    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = "Boş bolmaly däl !";
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      if (dataUpdate) {
        const body = {
          nameTm: formData.nameTm,
          nameRu: formData.nameRu,
          nameEn: formData.nameEn,
          isActive: active,
          id: dataUpdate?.id,
        };
        dispatch(updateStatusOrder(body));
        handleClose();
      } else {
        const body = {
          nameTm: formData.nameTm,
          nameRu: formData.nameRu,
          nameEn: formData.nameEn,
          isActive: active || true,
        };
        dispatch(createStatusOrder(body));
        handleClose();
      }
    }
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  const handleSwitchToggle = (newState) => {
    setActive(newState);
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Ady (TM)"
              name="nameTm"
              value={formData.nameTm}
              onChange={handleChange}
              fullWidth
              error={!!errors.nameTm}
              helperText={errors.nameTm}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ady (RU)"
              name="nameRu"
              value={formData.nameRu}
              onChange={handleChange}
              fullWidth
              error={!!errors.nameRu}
              helperText={errors.nameRu}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ady (EN)"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              fullWidth
              error={!!errors.nameEn}
              helperText={errors.nameEn}
              sx={inputStyle}
            />
          </Grid>
          <Stack width="100%" mt={1} justifyContent="end" direction="row">
            <SwitchComponent
              data={dataUpdate && dataUpdate}
              onChange={handleSwitchToggle}
            />
            <Button
              type="submit"
              sx={{
                textTransform: "revert",
                width: "25%",
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontFamily: "Montserrat",
                fontSize: 16,
                mt: 1,
              }}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};

export default MyForm;
