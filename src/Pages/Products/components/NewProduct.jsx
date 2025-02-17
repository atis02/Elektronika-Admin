import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getSegment } from "../../../Components/db/Redux/api/SegmentSlice";
import { getStatusProduct } from "../../../Components/db/Redux/api/StatusSlice";
import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../../Components/db/Redux/api/SubCategorySlice";
import Forms from "./Forms";
import SwiperWithFileInput from "./ImageInput";
import { LuPackagePlus } from "react-icons/lu";
import ProductSwitchComponent from "../../../layouts/ProductSwitch";
import { toast } from "react-toastify";
import { createProduct } from "../../../Components/db/Redux/api/ProductSlice";
import { useNavigate } from "react-router-dom";
import { getBrand } from "../../../Components/db/Redux/api/BrandSlice";
import AddProperty from "./PropertyAdd";

const NewProduct = () => {
  const [active, setActive] = useState(true);
  const [openProperty, setOpenProperty] = useState(false);
  const [formData, setFormData] = useState({
    nameTm: "",
    nameRu: "",
    nameEn: "",
    barcode: "",
    categoryId: null,
    subCategoryId: null,
    statusId: null,
    segmentId: null,
    brandId: null,
    descriptionTm: "",
    descriptionRu: "",
    descriptionEn: "",
    discount_priceTMT: 0,
    discount_pricePercent: 0,
    sellPrice: "",
    incomePrice: 0,
    productQuantity: 0,
    isActive: active || true,
  });
  const [filtered, setFiltered] = useState([]);
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [errors, setErrors] = useState({
    nameTm: false,
    nameRu: false,
    nameEn: false,
    barcode: false,
    categoryId: false,
    subCategoryId: false,
    segmentId: false,
    statusId: false,
    brandId: false,
    sellPrice: false,
    incomePrice: false,
    productQuantity: false,
  });
  const [properties, setProperties] = useState([]);
  const addProperty = (key, value) => {
    setProperties((prev) => [...prev, { key, value }]);
  };
  const { mode } = useThemeContext();

  const categories = useSelector((state) => state.data.data);
  const segments = useSelector((state) => state.segment.data);
  const brands = useSelector((state) => state.brand.data);
  const status = useSelector((state) => state.status.data);
  const subCategories = useSelector((state) => state.subcategory.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSegment());
    dispatch(getBrand());
    dispatch(getStatusProduct());
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };
  const handleProductTypeInputChange = (field, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleCategoryChange = (event, value) => {
    const categoryId = value ? value.id : null;
    setFormData((prev) => ({ ...prev, categoryId }));
    setErrors((prev) => ({ ...prev, categoryId: !categoryId }));
    if (categoryId) {
      const filteredSubCategories = subCategories.filter(
        (item) => item.parentCategory?.id === categoryId
      );
      setFiltered(filteredSubCategories);
    } else {
      setFiltered([]);
    }
  };

  const handleSubCategoryChange = (event, value) => {
    const subCategoryId = value ? value.id : null;
    setFormData((prev) => ({ ...prev, subCategoryId }));
    setErrors((prev) => ({ ...prev, subCategoryId: !subCategoryId }));
    if (subCategoryId) {
      const filteredSegments = segments.filter(
        (item) => item.subCategoryId === subCategoryId
      );
      setFiltered(filteredSegments);
    } else {
      setFiltered([]);
    }
  };

  const handleSegmentChange = (event, value) => {
    const segmentId = value ? value.id : null;
    setFormData((prev) => ({ ...prev, segmentId }));
    setErrors((prev) => ({ ...prev, segmentId: !segmentId }));
  };

  const handleStatusChange = (event, value) => {
    const statusId = value ? value.id : null;
    setFormData((prev) => ({ ...prev, statusId }));
    setErrors((prev) => ({ ...prev, statusId: !statusId }));
  };

  const handleBrandChange = (event, value) => {
    const brandId = value ? value.id : null;
    setFormData((prev) => ({ ...prev, brandId }));
    setErrors((prev) => ({ ...prev, brandId: !brandId }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newProductImages = [...productImages];
      newProductImages[index] = file;
      setProductImages(newProductImages);
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

  const navigate = useNavigate();

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate required fields
    const requiredFields = [
      "nameTm",
      "nameRu",
      "nameEn",
      "barcode",
      "categoryId",
      "subCategoryId",
      "segmentId",
      "statusId",
      "brandId",
      "sellPrice",
      "productQuantity",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "" || formData[field] === 0) {
        newErrors[field] = true;
        valid = false;
      } else {
        newErrors[field] = false;
      }
    });

    setErrors(newErrors);
    if (!valid) {
      toast.error("Maglumatlary doly giriz!");
      return;
    }
    if (!productImages[0]) {
      toast.error("Surat giriz!");
      return;
    }
    // Proceed with the form submission if everything is valid
    const imageFields = [
      "imageOne",
      "imageTwo",
      "imageThree",
      "imageFour",
      "imageFive",
    ];

    const productDetail = JSON.stringify(formData);
    const body = new FormData();
    body.append("productDetail", productDetail);

    productImages.forEach((image, index) => {
      body.append(imageFields[index], image || "");
    });
    const productProperties = JSON.stringify(properties);
    body.append("productProperties", productProperties);
    dispatch(createProduct(body));
    navigate("/products");
  };

  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
        >
          Täze Haryt
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack width="100%" spacing={1}>
          <TextField
            sx={inputStyle}
            label="Ady (TM)"
            name="nameTm"
            error={errors.nameTm}
            autoComplete="off"
            value={formData.nameTm}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={inputStyle}
            label="Ady (RU)"
            error={errors.nameRu}
            name="nameRu"
            autoComplete="off"
            value={formData.nameRu}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={inputStyle}
            label="Ady (EN)"
            error={errors.nameEn}
            name="nameEn"
            autoComplete="off"
            value={formData.nameEn}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={inputStyle}
            label="Barkody"
            name="barcode"
            autoComplete="off"
            value={formData.barcode}
            onChange={handleInputChange}
            error={errors.barcode}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>

        <Stack width="100%" spacing={1}>
          <Autocomplete
            sx={inputStyle}
            options={categories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategoriýa"
                error={errors.categoryId}
                size="small"
              />
            )}
          />
          <Autocomplete
            sx={inputStyle}
            options={filtered.length ? filtered : subCategories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleSubCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subkategoriýa"
                error={errors.subCategoryId}
                size="small"
              />
            )}
          />
          <Autocomplete
            sx={inputStyle}
            options={filtered.length ? filtered : segments || []}
            // options={segments || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleSegmentChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Segment"
                error={errors.segmentId}
                size="small"
              />
            )}
          />
          <Autocomplete
            sx={inputStyle}
            options={brands || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleBrandChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brend"
                error={errors.brandId}
                size="small"
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack width="100%" mt={2} direction="row" spacing={2}>
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
          onClick={() => setOpenProperty(!openProperty)}
        >
          <LuPackagePlus style={{ width: 30, height: 30, marginRight: 8 }} />
          Aýratynlyklary
        </Button>
        <AddProperty
          open={openProperty}
          handleClose={() => setOpenProperty(false)}
          properties={properties}
          addProperty={addProperty}
          setProperties={setProperties}
        />
      </Stack>

      <Stack mt={1} width="100%" alignItems={"end"}>
        <Stack width="100%" mt={0}>
          <Forms
            error={errors}
            formValues={formData}
            handleProductTypeInputChange={handleInputChange}
            handleProductTypeInputChange2={handleProductTypeInputChange}
          />

          <Stack direction="row" spacing={2}>
            <SwiperWithFileInput
              images={productImages.filter((img) => img !== null)}
              setImages={setProductImages}
              handleFileChange={handleFileChange}
            />

            <Stack
              direction="column"
              width="50%"
              spacing={1}
              justifyContent="end"
              height="100%"
            >
              <Stack
                alignItems="center"
                justifyContent="end"
                height="100%"
                width="100%"
              >
                <Stack
                  direction="row"
                  width="80%"
                  spacing={2}
                  alignItems="center"
                  mt={2}
                >
                  <Autocomplete
                    sx={{ inputStyle, width: "55%" }}
                    options={status || []}
                    getOptionLabel={(option) => option.nameTm || ""}
                    onChange={handleStatusChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        error={errors.statusId}
                        size="small"
                      />
                    )}
                  />
                  <ProductSwitchComponent
                    // data={data}
                    onChange={handleSwitchToggle}
                  />
                </Stack>

                <Button
                  variant="contained"
                  sx={{
                    textTransform: "revert",
                    minWidth: "78%",
                    height: 40,
                    color: "#fff",
                    bgcolor: "#00B69B",
                    "&:hover": { bgcolor: "#00B69B" },
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    mt: 2,
                  }}
                  // onClick={handleNewProductSubmit}
                  onClick={handleSubmit}
                >
                  {/* <LuPackagePlus /> */}
                  <LuPackagePlus
                    style={{ width: 30, height: 30, marginRight: 8 }}
                  />
                  Goşmak
                  {/* Tassykla */}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewProduct;
