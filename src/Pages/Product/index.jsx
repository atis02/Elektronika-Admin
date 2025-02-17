import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import Forms from "./components/Forms";
import SwiperWithFileInput from "./components/ImageInput";
import { LuPackagePlus } from "react-icons/lu";
import ProductSwitchComponent from "../../layouts/ProductSwitch";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProductColor,
  deleteProductColor,
  getProductById,
  getProductProperties,
  updateProduct,
} from "../../Components/db/Redux/api/ProductSlice";
import { getCategory } from "../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../Components/db/Redux/api/SubCategorySlice";
import SaveIcon from "@mui/icons-material/Save";
import ProductTypeUpdate from "./updateProductType/ProductTypeUpdate";
import { getSegment } from "../../Components/db/Redux/api/SegmentSlice";
import { getStatusProduct } from "../../Components/db/Redux/api/StatusSlice";
import { getBrand } from "../../Components/db/Redux/api/BrandSlice";
import AddProperty from "./components/Properties";

const UpdateProduct = () => {
  const data = useSelector((state) => state.product.onProductData);
  const propertyData = useSelector((state) => state.product.productProperties);
  const [active, setActive] = useState(data?.isActive);
  const [formData, setFormData] = useState({
    nameTm: data?.nameTm,
    nameRu: data?.nameRu,
    nameEn: data?.nameEn,
    barcode: data?.barcode,
    categoryId: data?.categoryId,
    subCategoryId: data?.subCategoryId,
    segmentId: data?.segmentId,
    statusId: data?.statusId,
    brandId: data?.brandId,
    descriptionTm: data?.descriptionTm,
    descriptionRu: data?.descriptionRu,
    descriptionEn: data?.descriptionEn,
    discount_priceTMT: data?.discount_priceTMT,
    discount_pricePercent: data?.discount_pricePercent,
    sellPrice: data?.sellPrice,
    incomePrice: data?.incomePrice,
    productQuantity: data?.productQuantity,
    isActive: data?.isActive,
  });
  const [openProperty, setOpenProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [productImagesServer, setProductImagesServer] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [textFieldValues, setTextFieldValues] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useThemeContext();
  const params = useParams();

  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data);
  const segments = useSelector((state) => state.segment.data);
  const brands = useSelector((state) => state.brand.data);
  const statuses = useSelector((state) => state.status.data);
  const handleClose = () => setOpen(false);

  const addProperty = (key, value) => {
    setProperties((prev) => [...prev, { key, value }]);
  };

  useEffect(() => {
    setFormData({
      nameTm: data?.nameTm,
      nameRu: data?.nameRu,
      nameEn: data?.nameEn,
      barcode: data?.barcode,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      segmentId: data?.segmentId,
      brandId: data?.brandId,
      statusId: data?.statusId,
      descriptionTm: data?.descriptionTm,
      descriptionRu: data?.descriptionRu,
      descriptionEn: data?.descriptionEn,
      discount_priceTMT: data?.discount_priceTMT,
      discount_pricePercent: data?.discount_pricePercent,
      sellPrice: data?.sellPrice,
      incomePrice: data?.incomePrice,
      productQuantity: data?.productQuantity,
      isActive: data?.isActive,
    });
    const imagesArray = [
      { image: data?.imageOne },
      { image: data?.imageTwo },
      { image: data?.imageThree },
      { image: data?.imageFour },
      { image: data?.imageFive },
    ].filter((img) => img !== null);

    setProductImagesServer(imagesArray);
    setProductImages(imagesArray);
  }, [data]);

  useEffect(() => {
    dispatch(getProductById(params.id));
    dispatch(getCategory());
    dispatch(getSegment());
    dispatch(getBrand());
    dispatch(getStatusProduct());
    dispatch(getSubCategory());
    dispatch(getProductProperties(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (selectedValue[0]?.sizes?.length > 0) {
      const initialValues = selectedValue[0].sizes.map((elem) => ({
        size: elem.name,
        quantity: 0,
      }));
      setTextFieldValues(initialValues);
    }
  }, [selectedValue[0]?.sizes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event, value) => {
    setFormData((prev) => ({ ...prev, categoryId: value ? value.id : null }));
  };

  const handleSubCategoryChange = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      subCategoryId: value ? value.id : null,
    }));
  };
  const handleStatusChange = (event, value) => {
    setFormData((prev) => ({ ...prev, statusId: value ? value.id : null }));
  };
  const handleSegmentChange = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      segmentId: value ? value.id : null,
    }));
  };
  const handleBrandChange = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      brandId: value ? value.id : null,
    }));
  };
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newProductImages = [...productImages];
      const previewUrl = URL.createObjectURL(file);
      newProductImages[index] = { imagePreview: previewUrl, file: file }; // Здесь мы сохраняем и preview URL, и сам файл
      setProductImages(newProductImages);
    } else {
      const newProductImages = [...productImages];
      newProductImages[index] = {
        image: productImages[index]?.image || null,
        file: null,
      };
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
    setFormData((prev) => ({
      ...prev,
      isActive: newState,
    }));
    setActive(newState);
  };

  const handleChangeSelectedValue = (event) => {
    setSelectedValue([event.target.value]);
  };

  const handleProductTypeInputChange = (field, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleTextFieldChange = (sizeName, quantity) => {
    const parsedQuantity = Number(quantity, 10);
    const updatedTextFieldValues = textFieldValues.map((item) =>
      item.size === sizeName ? { ...item, quantity: parsedQuantity } : item
    );
    setTextFieldValues(updatedTextFieldValues);
    setFormValues((prevValues) => ({
      ...prevValues,
      sizesWithQuantities: updatedTextFieldValues, // Update sizesWithQuantities in formValues
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    const imageFields = [
      "imageOne",
      "imageTwo",
      "imageThree",
      "imageFour",
      "imageFive",
    ];

    const colorDetail = JSON.stringify([formData]);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("productId", params.id);

    productImages?.forEach((image, index) => {
      const imageValue = image?.file || image?.image || null;
      body.append(imageFields[index], imageValue);
    });

    if (
      !formData.nameTm ||
      !formData.nameEn ||
      !formData.nameRu ||
      !formData.barcode ||
      formData.categoryId == null ||
      formData.subCategoryId == null ||
      formData.segmentId == null ||
      formData.statusId == null ||
      formData.brandId == null ||
      formData.sellPrice == ""
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(updateProduct(body));
      navigate("/products");
    }
  };

  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
          mb={2}
        >
          Haryt (Ady) : {data?.nameTm}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack width="100%" spacing={1}>
          <TextField
            sx={inputStyle}
            label="Ady (TM)"
            name="nameTm"
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
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>

        <Stack width="100%" spacing={1}>
          <FormControl sx={inputStyle} size="small">
            <InputLabel>Kategoriýa</InputLabel>
            <Select
              value={formData.categoryId || ""} // Controlled value
              onChange={(event) => handleCategoryChange(event.target.value)}
              label="Kategoriýa"
            >
              {categories?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={inputStyle} size="small">
            <InputLabel>Subkategoriýa</InputLabel>
            <Select
              value={formData.subCategoryId || ""} // Controlled value
              onChange={(event) => handleSubCategoryChange(event.target.value)}
              label="Subkategoriýa"
            >
              {subCategories?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={inputStyle} size="small">
            <InputLabel>Segment</InputLabel>
            <Select
              value={formData.segmentId || ""} // Controlled value
              onChange={(event) => handleSegmentChange(event.target.value)}
              label="Segment"
            >
              {segments?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            sx={{ inputStyle }}
            options={brands || []}
            value={
              brands.find((status) => status.id === formData.brandId) || null
            } // Find the default status
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleBrandChange}
            renderInput={(params) => (
              <TextField {...params} label="Brend" size="small" />
            )}
          />
          {/* <FormControl sx={inputStyle} size="small">
            <InputLabel>Brend</InputLabel>
            <Select
              value={formData.brandId || ""} // Controlled value
              onChange={(event) => handleBrandChange(event.target.value)}
              label="Brend"
            >
              {brands?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2, mb: 2, bgcolor: "gray" }} />

      <ProductTypeUpdate open={open} handleClose={handleClose} />
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
          Aýratynlyklary ({propertyData?.length})
        </Button>
        <AddProperty
          open={openProperty}
          handleClose={() => setOpenProperty(false)}
          properties={properties}
          addProperty={addProperty}
          setProperties={setProperties}
          productId={data?.id}
        />
      </Stack>
      <Stack mt={1} width="100%" alignItems={"end"}>
        <Stack width="100%" mt={0}>
          <Forms
            formValues={formData}
            handleProductTypeInputChange={handleProductTypeInputChange}
            textFieldValues={textFieldValues}
            setTextFieldValues={setTextFieldValues}
            handleTextFieldChange={handleTextFieldChange}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            handleChangeSelectedValue={handleChangeSelectedValue}
          />

          <Stack direction="row" spacing={2}>
            {/* {productImages.some((img) => img !== null) ? ( */}
            <SwiperWithFileInput
              productImagesServer={productImagesServer}
              images={productImages.filter((img) => img !== null)}
              setImages={setProductImages}
              handleFileChange={handleFileChange}
            />
            <Stack direction="column" spacing={1} width="40%" height="30%">
              <Stack
                direction="row"
                width="100%"
                spacing={2}
                alignItems="center"
                mt={2}
              >
                <Autocomplete
                  sx={{ inputStyle, width: "100%" }}
                  options={statuses || []}
                  value={
                    statuses.find(
                      (status) => status.id === formData.statusId
                    ) || null
                  }
                  getOptionLabel={(option) => option.nameTm || ""}
                  onChange={handleStatusChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" size="small" />
                  )}
                />

                <ProductSwitchComponent
                  data={data}
                  onChange={handleSwitchToggle}
                />
              </Stack>

              <Button
                variant="contained"
                sx={{
                  textTransform: "revert",
                  minWidth: "100%",
                  height: 40,
                  color: "#fff",
                  bgcolor: "#00B69B",
                  "&:hover": { bgcolor: "#00B69B" },
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  fontSize: 16,
                  mt: 2,
                }}
                onClick={handleSubmit}
              >
                <SaveIcon style={{ width: 30, height: 30, marginRight: 8 }} />
                Ýatda sakla
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UpdateProduct;
