import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../Components/db/Redux/api/ReduxSlice";
import { toast } from "react-toastify";
import { BASE_URL_Img } from "../../../Components/db/Redux/api/AxiosHelper";
import SwitchComponent from "../../../layouts/Switch";
import {
  createSubCategory,
  updateSubCategory,
} from "../../../Components/db/Redux/api/SubCategorySlice";

const Forms = ({ handleClose, data }) => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    nameTm: data?.nameTm || "",
    nameRu: data?.nameRu || "",
    nameEn: data?.nameEn || "",
    file: null,
  });
  const [active, setActive] = useState(data?.isActive || false);
  const [selectedCategory, setSelectedCategory] = useState(
    data ? data.parentCategory : null
  );
  const { mode } = useThemeContext();
  const categories = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        nameTm: data.nameTm || "",
        nameRu: data.nameRu || "",
        nameEn: data.nameEn || "",
        file: data.image || null,
      });
      setSelectedCategory(data.parentCategory || null);
      setActive(data.isActive || false);
      setPreview(`${BASE_URL_Img}/images/${data.image}` || null);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSwitchToggle = (newState) => {
    setActive(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("nameTm", formData.nameTm);
    body.append("nameRu", formData.nameRu);
    body.append("nameEn", formData.nameEn);
    body.append("categoryId", selectedCategory.id);
    if (formData.file !== null) {
      body.append("image", formData.file);
    }
    if (data) {
      body.append("isActive", active);
      body.append("id", data?.id);
    }

    if (formData.nameTm || formData.nameRu || formData.nameEn) {
      data
        ? dispatch(updateSubCategory(body))
        : dispatch(createSubCategory(body));
      handleClose();
      setPreview(null);
      setFormData({
        nameTm: "",
        nameRu: "",
        nameEn: "",
        file: null,
      });
    } else {
      toast.error("Maglumatlary giriz!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        margin: "0 auto",
        padding: 2,
        borderRadius: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Text Fields */}
      <TextField
        label="Ady (TM)"
        name="nameTm"
        autoComplete="off"
        value={formData.nameTm}
        onChange={handleChange}
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />
      <TextField
        label="Ady (RU)"
        name="nameRu"
        autoComplete="off"
        value={formData.nameRu}
        onChange={handleChange}
        type="text"
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />
      <TextField
        label="Ady (EN)"
        name="nameEn"
        autoComplete="off"
        value={formData.nameEn}
        onChange={handleChange}
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />

      <Autocomplete
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories}
        getOptionLabel={(option) => option.nameTm}
        renderOption={(props, option) => (
          <Box component="li" {...props} display="flex" alignItems="center">
            <Typography variant="body1" textTransform="capitalize">
              {option.nameTm}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Kategoriýa ady ýazyň ýa-da saýlaň" />
        )}
      />

      {/* File Input */}
      <Box>
        <Stack direction="row" width="100%" justifyContent="space-between">
          {preview !== "http://localhost:4000/images/null" && preview && (
            <Box
              width="100%"
              sx={{
                textAlign: "center",
                border:
                  mode === "dark" ? "1px solid #474747" : "1px solid lightgray",
                gap: 1,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="textSecondary" mb={1}>
                {formData.file?.name}
              </Typography>
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  minWidth: "20%",
                  minHeight: "20px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Stack>

        <Stack
          direction="row"
          justifyContent="end"
          mt={1}
          spacing={2}
          width="100%"
        >
          {data && (
            <SwitchComponent data={data} onChange={handleSwitchToggle} />
          )}
          <Button
            component="label"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: 3,
              padding: "10px 20px",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AddPhotoAlternateIcon />
            Surat ýüklemek
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 3,
              padding: "10px 20px",
              fontSize: 16,
              bgcolor: "#00B69B",
              color: "#fff",
            }}
          >
            {data ? "Ýatda sakla" : "Goşmak"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Forms;
