import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import Forms from "./components/Forms";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SwiperWithFileInput from "./components/ImageInput";
import MinImgInput from "./components/MinImgInput";
import HoverImgInput from "./components/HoverImgInput";
import { LuPackagePlus } from "react-icons/lu";
import ProductSwitchComponent from "../../layouts/ProductSwitch";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProductColor,
  deleteProductColor,
  getProductById,
  updateProduct,
} from "../../Components/db/Redux/api/ProductSlice";
import { getCategory } from "../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../Components/db/Redux/api/SubCategorySlice";
import { BASE_URL_Img } from "../../Components/db/Redux/api/AxiosHelper";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import ProductTypeUpdate from "./updateProductType/ProductTypeUpdate";
import { getSegment } from "../../Components/db/Redux/api/SegmentSlice";
import { getStatusProduct } from "../../Components/db/Redux/api/StatusSlice";
import { getBrand } from "../../Components/db/Redux/api/BrandSlice";
import UpdateImageSwiper from "./components/UpdateImageSwiper";

const UpdateProduct = () => {
  const data = useSelector((state) => state.product.onProductData);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
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

  const [openProductType, setOpenProductType] = useState(false);
  const [images, setImages] = useState([]);
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [productImagesServer, setProductImagesServer] = useState([]);

  const [imagesMin, setImagesMin] = useState(null);
  const [imageMin, setImageMin] = useState(null);
  const [imagesHover, setImagesHover] = useState(null);
  const [imageHover, setImageHover] = useState(null);
  const [activeProduct, setActiveProduct] = useState(true);
  const [selectedValue, setSelectedValue] = useState([]);
  const [textFieldValues, setTextFieldValues] = useState([]);
  const [updateProductType, setUpdateProductType] = useState([]);
  const [formValues, setFormValues] = useState({
    descriptionTm: data?.descriptionTm,
    descriptionRu: data?.descriptionRu,
    descriptionEn: data?.descriptionEn,
    sellPrice: data?.sellPrice,
    discount_priceTMT: data?.discount_priceTMT || 0,
    discount_pricePercent: data?.discount_pricePercent || 0,
    incomePrice: data?.incomePrice,
  });
  const [productType, setProductType] = useState(data?.ProductColorDetails);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useThemeContext();
  const params = useParams();

  const sizeTable = useSelector((es) => es.size.data);
  const sizeTableStatus = useSelector((es) => es.size.status);
  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data);
  const segments = useSelector((state) => state.segment.data);
  const brands = useSelector((state) => state.brand.data);
  const statuses = useSelector((state) => state.status.data);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setImages(imagesArray);
  }, [data]);

  useEffect(() => {
    dispatch(getProductById(params.id));
    dispatch(getCategory());
    dispatch(getSegment());
    dispatch(getBrand());
    dispatch(getStatusProduct());
    dispatch(getSubCategory());
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
  // const handleStatusChange = (event, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     statusId: value ? value.id : null,
  //   }));
  // };

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
      setImages(newProductImages.map((img) => img.image));
    } else {
      const newProductImages = [...productImages];
      newProductImages[index] = {
        image: productImages[index]?.image || null,
        file: null,
      };
      setProductImages(newProductImages);
    }
  };

  const handleMinImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageMin(file);
      setImagesMin(URL.createObjectURL(file));
    }
  };
  const handleHoverImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageHover(file);
      setImagesHover(URL.createObjectURL(file));
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
  const inputsStyle2 = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      width: "150px",
      ...(mode === "dark" ? { color: "#fff" } : { color: "#00B69B" }),
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      pt: -3,
      lineHeight: "1",
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
  const handleSwitchToggleProduct = (newState) => {
    setActiveProduct(newState);
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

  const style2 = {
    cursor: "pointer",
    p: 0,
    pl: 2,
    fontFamily: "Montserrat",
    textAlign: "center",
  };
  const handleClear = () => {
    setTextFieldValues([]); // Clear the textFieldValues array
    setFormValues({
      sizesWithQuantities: [],
      nameTm: "",
      nameRu: "",
      nameEn: "",
      descriptionTm: "",
      descriptionRu: "",
      descriptionEn: "",
      sellPrice: "",
      discount_priceTMT: 0,
      discount_pricePercent: 0,
      incomePrice: "",
    });
    setSelectedValue([]);
    setTextFieldValues([]);
    setImages(Array(5).fill(null));
    setImagesMin(null);
    setImageMin(null);
    setImagesHover(null);
    setImageHover(null);
    setProductImages([]);
  };

  const handleNewProductSubmit = () => {
    const checkAllData = (data) => {
      const keysToCheck = [
        "incomePrice",
        "nameEn",
        "nameRu",
        "nameTm",
        "sellPrice",
      ];

      // Check required fields
      for (let key of keysToCheck) {
        if (!data[key]) {
          toast.warn(`Maglumatlary doly giriz! (${key} is missing)`);
          return false;
        }
      }

      // Check sizes and quantities
      if (
        !data.sizesWithQuantities.length ||
        !selectedValue.length ||
        !selectedValue[0]?.sizes?.length
      ) {
        toast.warn(`Razmeri hökman girizmeli!`);
        return false;
      }

      for (let i = 0; i < data.sizesWithQuantities.length; i++) {
        const size = data.sizesWithQuantities[i];
        if (size.size === 0) {
          toast.warn(`Size for entry ${i} is invalid`);
          return false;
        }

        if (!size.quantity || size.quantity === 0) {
          toast.warn(`Haryt sany ${size.size} razmerde ýok`);
          return false;
        }
      }

      // Check images
      if (
        !imagesMin ||
        !imagesHover ||
        !images[0] ||
        !productImages.length ||
        !imageHover ||
        !imageMin
      ) {
        toast.warn(`Surat goşmaly!`);
        return false;
      }

      return true; // All checks passed
    };

    // Validate form data
    if (!checkAllData(formValues)) {
      return; // Exit if validation fails
    }

    const colorDetail = JSON.stringify(formValues);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    body.append("productId", params.id);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    dispatch(createProductColor({ body: body, id: params.id }));
    handleClear();
    setOpenProductType(false);
  };

  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteProductColor({ body: id, id: params.id }));
    }
  };

  const handleSubmitNewColor = () => {
    const colorDetail = JSON.stringify(productType);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    body.append("productId", data?.id);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    if (
      !data?.id ||
      !productType.length ||
      !productImages.length ||
      imageHover == null ||
      imagesMin == null
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(createProductColor({ body: body, id: data?.id }));
      // navigate("/products");
    }
  };

  const handleSubmit = () => {
    const imageFields = [
      "imageOne",
      "imageTwo",
      "imageThree",
      "imageFour",
      "imageFive",
    ];
    // const body = {
    //   nameTm: formData.nameTm,
    //   nameRu: formData.nameRu,
    //   nameEn: formData.nameEn,
    //   barcode: formData.barcode,
    //   categoryId: formData.categoryId,
    //   subCategoryId: formData.subCategoryId,
    //   isActive: activeProduct,
    //   id: params.id,
    //   statusId: formData.statusId,
    //   segmentId: formData.segmentId,
    //   brandId: formData.brandId,
    // };
    const colorDetail = JSON.stringify([formData]);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("productId", params.id);
    // productImages?.forEach((image, index) => {
    //   // body.append(imageFields[index], image || "");
    //   body.append(imageFields[index], image?.image || image.file);
    // });
    productImages?.forEach((image, index) => {
      const imageValue = image?.file || image?.image || null;
      body.append(imageFields[index], imageValue);
    });
    console.log(formData);

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
      // formData.productQuantity != ""
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(updateProduct(body));
      navigate("/products");
    }
  };
  const selectedValueSubcategory = subCategories.find(
    (subCategory) => subCategory.id === formData.subCategoryId
  );

  const productNavigate = (id) => {
    navigate(`/products/${params.id}/${id}`);
  };
  const handleUpdateProductType = (item) => {
    setUpdateProductType(item);
    setOpen(true);
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

      <ProductTypeUpdate
        open={open}
        handleClose={handleClose}
        data={updateProductType}
      />
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
            setFormValues={setFormValues}
          />

          <Stack direction="row" spacing={2}>
            {/* {productImages.some((img) => img !== null) ? ( */}
            <SwiperWithFileInput
              productImagesServer={productImagesServer}
              images={productImages.filter((img) => img !== null)}
              setImages={setProductImages}
              handleFileChange={handleFileChange}
            />
            {/* ) : (
              <UpdateImageSwiper
                images={productImagesServer}
                handleFileChange={handleFileChange}
                buttons={productImages}
              />
            )} */}
            {/* <SwiperWithFileInput
              images={images}
              setImages={setImages}
              handleFileChange={handleFileChange}
            /> */}

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
                  } // Find the default status
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
