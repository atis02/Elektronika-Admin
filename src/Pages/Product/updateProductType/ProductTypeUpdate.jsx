import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";
import Forms from "./components/Forms";
import { useDispatch, useSelector } from "react-redux";
import MinImgInput from "./components/MinImgInput";
import SwiperWithFileInput from "./components/ImageInput";
import HoverImgInput from "./components/HoverImgInput";
import ProductSwitchComponent from "../../../layouts/ProductSwitch";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { updateProductColor } from "../../../Components/db/Redux/api/ProductSlice";

const ProductTypeUpdate = ({ open, handleClose, data }) => {
  const [textFieldValues, setTextFieldValues] = useState([]);
  const [images, setImages] = useState(Array(5).fill(null));
  const [productImages, setProductImages] = useState([]);
  const [imagesMin, setImagesMin] = useState(null);
  const [imageMin, setImageMin] = useState(null);
  const [imagesHover, setImagesHover] = useState(null);
  const [imageHover, setImageHover] = useState(null);
  const [active, setActive] = useState(true);

  const [formValues, setFormValues] = useState({
    sizesWithQuantities: textFieldValues,
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
    sizeTableId: null,
  });
  const [selectedValue, setSelectedValue] = useState([formValues.sizeTableId]);
  const [selectedSize, setSelectedSize] = useState(data?.sizesWithQuantities);
  const params = useParams();
  const dispatch = useDispatch();
  const sizeTable = useSelector((es) => es.size.data);
  const sizeTableStatus = useSelector((es) => es.size.status);
  const { mode } = useThemeContext();

  const handleProductTypeInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormValues({
        sizesWithQuantities: data.sizes,
        nameTm: data.nameTm,
        nameRu: data.nameRu,
        nameEn: data.nameEn,
        descriptionTm: data.descriptionTm,
        descriptionRu: data.descriptionRu,
        descriptionEn: data.descriptionEn,
        sellPrice: data.sellPrice,
        discount_priceTMT: data.discount_priceTMT,
        discount_pricePercent: data.discount_pricePercent,
        incomePrice: data.incomePrice,
      });
      setSelectedSize(data.sizes);
      setTextFieldValues(data.sizes);
      setSelectedValue([data.sizeTableId]);
      setImages(
        data.fullImages
          ? [
              ...data.fullImages,
              ...Array(6 - data.fullImages.length).fill(null),
            ]
          : Array(6).fill(null)
      );
      data.fullImages;
      // ? [
      //     ...data.fullImages,
      //     ...Array(6 - data.fullImages.length).fill(null),
      //   ]
      // : Array(6).fill(null)
      setImagesMin(data.minImage);
      setImageMin(data.minImage);
      setImagesHover(data.hoverImage);
      setImageHover(data.hoverImage);
    }
  }, [data]);

  useEffect(() => {
    if (data?.sizesWithQuantities?.length > 0) {
      const initialValues = data?.sizesWithQuantities?.map((elem) => ({
        size: elem.size,
        quantity: 0,
      }));
      setTextFieldValues(initialValues);
    }
  }, [selectedValue[0]?.sizes]);
  useEffect(() => {
    if (selectedValue[0]?.sizes?.length > 0) {
      const initialValues = selectedValue[0]?.sizes.map((elem) => ({
        size: elem.name,
        quantity: 0,
      }));
      setTextFieldValues(initialValues);
    }
  }, [selectedValue[0]?.sizes]);

  // const handleChangeSelectedValue = (event) => {
  //   setSelectedValue([event.target.value]);
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     sizeTableId: event.target.value?.id,
  //   }));
  // };
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
  // const handleTextFieldChange = (sizeName, quantity) => {
  //   const parsedQuantity = Number(quantity, 10);
  //   const updatedTextFieldValues = textFieldValues.map((item) =>
  //     item.size === sizeName ? { ...item, quantity: parsedQuantity } : item
  //   );
  //   setTextFieldValues(updatedTextFieldValues);
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     sizesWithQuantities: updatedTextFieldValues, // Update sizesWithQuantities in formValues
  //   }));
  // };
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    setProductImages((prevImagesAll) => [...prevImagesAll, file]);
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
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
  const handleSwitchToggle = (newState) => {
    setActive(newState);
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
        !data.sizesWithQuantities?.length ||
        // !selectedValue.length ||
        // !selectedValue[0]?.sizes?.length
        !data.sizeTableId
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
        // !productImages.length ||
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

    const colorDetail = JSON.stringify([formValues]);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    body.append("productId", params.id);
    body.append("colorDetailId", data?.id);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    dispatch(updateProductColor({ body: body, id: params.id }));
    handleClose();
  };

  const handleChangeSelectedValue = (event) => {
    const selectedId = event.target.value;
    const selectedSizeTable = sizeTable.find((item) => item.id === selectedId);

    setSelectedValue([selectedSizeTable]);
    setFormValues((prevValues) => ({
      ...prevValues,
      sizeTableId: selectedId,
    }));

    // Initialize textFieldValues based on the selected size table
    if (selectedSizeTable?.sizes?.length > 0) {
      const initialSizes = selectedSizeTable.sizes.map((size) => ({
        size: size.name,
        quantity: 0,
      }));
      setTextFieldValues(initialSizes);
      setFormValues((prev) => ({
        ...prev,
        sizesWithQuantities: initialSizes,
      }));
    }
  };

  // Handle updates to the TextField components
  const handleTextFieldChange = (sizeName, quantity) => {
    const updatedValues = textFieldValues.map((item) =>
      item.size === sizeName ? { ...item, quantity: Number(quantity) } : item
    );
    setTextFieldValues(updatedValues);
    setFormValues((prev) => ({
      ...prev,
      sizesWithQuantities: updatedValues,
    }));
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "3%",
          left: "8%",
          // transform: "translate(-50%, -50%)",
          width: "85%",
          bgcolor: "background.paper",
          boxShadow: 24,
          maxHeight: "94vh",
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
            fontSize={20}
            fontWeight={500}
            fontFamily="Montserrat"
          >
            Haryt görnüşi (Ady): {data?.nameTm}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "inherit" }} />
          </IconButton>
        </Stack>
        <Stack
          p={2}
          mb={3}
          sx={{
            overflow: "auto", // Enable scrolling
            maxHeight: "calc(94vh - 75px)", // Subtract header height
          }}
        >
          <Forms
            formValues={formValues}
            handleProductTypeInputChange={handleProductTypeInputChange}
          />

          <Stack direction="row" height="2000px" spacing={2}>
            <SwiperWithFileInput
              images={images}
              setImages={setImages}
              handleFileChange={handleFileChange}
            />

            <Stack direction="column" spacing={1} height="100%">
              <Stack direction="row" spacing={1} height="70%">
                <MinImgInput
                  images={imagesMin}
                  setImages={setImagesMin}
                  handleFileChange={handleMinImage}
                />
                <HoverImgInput
                  images={imagesHover}
                  setImages={setImagesHover}
                  handleFileChange={handleHoverImage}
                />
              </Stack>
              <Stack
                justifyContent="end"
                direction="row"
                mt={16}
                gap={3}
                width="100%"
              >
                <ProductSwitchComponent
                  // data={data}
                  onChange={handleSwitchToggle}
                />

                <Button
                  variant="contained"
                  sx={{
                    // position: "absolute",
                    bottom: 0,
                    zIndex: 100,
                    right: 18,
                    textTransform: "revert",
                    width: "40%",
                    height: 40,
                    color: "#fff",
                    bgcolor: "#00B69B",
                    "&:hover": { bgcolor: "#00B69B" },
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    mt: 1,
                  }}
                  onClick={handleNewProductSubmit}
                  // onClick={handleSubmitNewColor}
                >
                  {/* <LuPackagePlus /> */}
                  <SaveIcon style={{ width: 30, height: 30, marginRight: 8 }} />
                  Ýatda sakla
                  {/* Tassykla */}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProductTypeUpdate;
