import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../../Components/db/Theme/ThemeContext";
import { getSizeTable } from "../../../../Components/db/Redux/api/SizeSlice";
import { useDispatch, useSelector } from "react-redux";

const Forms = ({
  formValues,
  handleProductTypeInputChange,
  textFieldValues,
  setTextFieldValues,
  handleTextFieldChange,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  // const [textFieldValues, setTextFieldValues] = useState([]);

  // useEffect(() => {
  //   if (selectedValue.sizes?.length > 0) {
  //     const initialValues = selectedValue.sizes.map((elem) => ({
  //       size: elem.name,
  //       quantity: 0, // Initially, set quantity as an empty string
  //     }));
  //     setTextFieldValues(initialValues);
  //   }
  // }, [selectedValue.sizes]);

  const handleChangeSelectedValue = (event) => {
    setSelectedValue(event.target.value);
  };

  // const handleTextFieldChange = (sizeName, quantity) => {
  //   const parsedQuantity = parseInt(quantity, 10) || 0; // Parse input to a number
  //   setTextFieldValues((prevValues) =>
  //     prevValues.map((item) =>
  //       item.size === sizeName ? { ...item, quantity: parsedQuantity } : item
  //     )
  //   );
  // };
  console.log(textFieldValues);

  const handleChange = (event) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      selectedValue: value,
    }));
  };

  const { mode } = useThemeContext();
  const inputsStyle = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      minWidth: "200px",
      width: "100%",
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
  const dispatch = useDispatch();
  const sizeTable = useSelector((es) => es.size.data);
  const sizeTableStatus = useSelector((es) => es.size.status);
  console.log(sizeTableStatus);

  useEffect(() => {
    dispatch(getSizeTable());
  }, [dispatch]);

  return (
    <>
      <Stack
        width="100%"
        spacing={1}
        sx={{
          marginBottom: "15px",
          borderRadius: "5px",
          mt: 1,
        }}
      >
        <Stack spacing={2} mt={2} direction="row">
          <TextField
            autoComplete="off"
            label="Ady (TM)"
            value={formValues.nameTm}
            onChange={(e) =>
              handleProductTypeInputChange("nameTm", e.target.value)
            }
            size="small"
            fullWidth
            sx={inputsStyle}
          />
          <TextField
            sx={inputsStyle}
            label="Ady (RU)"
            value={formValues.nameRu}
            onChange={(e) =>
              handleProductTypeInputChange("nameRu", e.target.value)
            }
            size="small"
            fullWidth
          />
          <TextField
            sx={inputsStyle}
            label="Ady (EN)"
            value={formValues.nameEn}
            onChange={(e) =>
              handleProductTypeInputChange("nameEn", e.target.value)
            }
            size="small"
            fullWidth
          />
        </Stack>
        <Stack spacing={2} pt={1} direction="row">
          <textarea
            placeholder="Beýan (TM)"
            value={formValues.descriptionTm}
            onChange={(e) =>
              handleProductTypeInputChange("descriptionTm", e.target.value)
            }
            onFocus={(e) => (e.target.style.borderColor = "#00B69B")} // Focus style
            onBlur={(e) => (e.target.style.borderColor = "")} // Reset border color when focus is lost
            style={{
              color: "inherit",
              padding: "8px",
              width: "100%",
              height: "80px",
              borderRadius: "5px",
              background: "inherit",
              resize: "vertical",
              overflowX: "auto",
              transition: "border-color 0.3s ease",
            }}
          ></textarea>

          <textarea
            placeholder="Beýan (RU)"
            value={formValues.descriptionRu}
            onChange={(e) =>
              handleProductTypeInputChange("descriptionRu", e.target.value)
            }
            onFocus={(e) => (e.target.style.borderColor = "#00B69B")} // Focus style
            onBlur={(e) => (e.target.style.borderColor = "")} // Reset border color when focus is lost
            style={{
              color: "inherit",
              padding: "8px",
              width: "100%",
              height: "80px",
              borderRadius: "5px",
              background: "inherit",
              resize: "vertical",
              overflowX: "auto",
              transition: "border-color 0.3s ease",
            }}
          ></textarea>
          <textarea
            placeholder="Beýan (EN)"
            value={formValues.descriptionEn}
            onChange={(e) =>
              handleProductTypeInputChange("descriptionEn", e.target.value)
            }
            onFocus={(e) => (e.target.style.borderColor = "#00B69B")} // Focus style
            onBlur={(e) => (e.target.style.borderColor = "")} // Reset border color when focus is lost
            style={{
              color: "inherit",
              padding: "8px",
              width: "100%",
              height: "80px",
              borderRadius: "5px",
              background: "inherit",
              resize: "vertical",
              overflowX: "auto",
              transition: "border-color 0.3s ease",
            }}
          ></textarea>
        </Stack>

        {/* <Stack spacing={2} pt={1} direction="row">
          <textarea
            placeholder="Beýan (TM)"
            value={formValues.descriptionTm}
            onChange={(e) =>
              handleProductTypeInputChange("descriptionTm", e.target.value)
            }
            style={{ width: "100%", height: "80px", padding: "8px" }}
          />
          <textarea
            placeholder="Beýan (RU)"
            value={formValues.descriptionRu}
            onChange={(e) =>
              handleProductTypeInputChange("descriptionRu", e.target.value)
            }
            style={{ width: "100%", height: "80px", padding: "8px" }}
          />
          <textarea
            placeholder="Beýan (EN)"
            value={formValues.descriptionEn}
            onChange={(e) =>
                handleProductTypeChange(index, "descriptionEn", e.target.value)
                handleProductTypeInputChange("descriptionEn", e.target.value)
            }
            style={{ width: "100%", height: "80px", padding: "8px" }}
          />
        </Stack> */}

        <Stack spacing={2} pt={1} direction="row">
          <TextField
            autoComplete="off"
            label="Baha (satyn alnan)"
            type="number"
            value={formValues.incomePrice}
            onChange={(e) =>
              handleProductTypeInputChange(
                "incomePrice",
                parseFloat(e.target.value)
              )
            }
            size="small"
            fullWidth
            sx={inputsStyle}
          />
          <TextField
            autoComplete="off"
            label="Baha (satyş)"
            type="number"
            value={formValues.sellPrice}
            onChange={(e) =>
              handleProductTypeInputChange(
                "sellPrice",
                parseFloat(e.target.value)
              )
            }
            size="small"
            fullWidth
            sx={inputsStyle}
          />
          <TextField
            autoComplete="off"
            label="Arzanladyş (manatda)"
            type="number"
            value={formValues.discount_priceTMT}
            onChange={(e) => {
              const salePrice = parseFloat(e.target.value);
              const salePricePercent =
                formValues.sellPrice > 0
                  ? (salePrice * 100) / formValues.sellPrice
                  : 0;

              handleProductTypeInputChange(
                // index,
                "discount_priceTMT",
                salePrice
              );
              handleProductTypeInputChange(
                // index,
                "discount_pricePercent",
                salePricePercent
              );
            }}
            size="small"
            fullWidth
            sx={inputsStyle}
          />

          <TextField
            autoComplete="off"
            label="Arzanladyş (%-de)"
            type="number"
            value={formValues.discount_pricePercent}
            onChange={(e) => {
              const salePricePercent = parseFloat(e.target.value);
              const salePrice =
                formValues.sellPrice > 0
                  ? (formValues.sellPrice * salePricePercent) / 100
                  : 0;

              handleProductTypeInputChange(
                // index,
                "discount_pricePercent",
                salePricePercent
              );
              handleProductTypeInputChange(
                // index,
                "discount_priceTMT",
                salePrice
              );
            }}
            size="small"
            fullWidth
            sx={inputsStyle}
          />
        </Stack>
        <Stack
          height={40}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography fontFamily="Montserrat" fontSize={20}>
            Baha
          </Typography>
          {formValues.discount_pricePercent > 0 ? (
            <Typography
              sx={{
                ...(formValues.discount_pricePercent >= 100
                  ? { color: "red" }
                  : { color: "#00B69B" }),
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {formValues.sellPrice} - {formValues.discount_pricePercent}% ={" "}
              {(
                formValues.sellPrice -
                (formValues.sellPrice * formValues.discount_pricePercent) / 100
              ).toFixed(2)}
            </Typography>
          ) : (
            formValues.sellPrice
          )}
        </Stack>
        <Divider sx={{ mt: 2, bgcolor: "gray" }} />

        {/* <Stack
          direction="row"
          // flexWrap="wrap"
          alignItems="center"
          spacing={4}
        >
          <Stack width={"25%"} mt={1}>
            <FormControl>
              <InputLabel id="select-label" sx={{ height: 40, mb: 2 }}>
                Razmer hataryny saýlaň
              </InputLabel>
              <Select
                labelId="select-label"
                value={selectedValue}
                onChange={handleChangeSelectedValue}
                label="Razmer hataryny saýlaň"
                // size="small"
                sx={{
                  borderRadius: "10px", // Custom border radius
                  // backgroundColor: "white", // Background color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00B69B", // Border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#007A5A", // Hover border color
                  },
                }}
              >
                {sizeTableStatus === "succeeded" ? (
                  sizeTable.map((elem) => (
                    <MenuItem value={elem} key={elem.id}>
                      {elem.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Stack>
          <Stack width="100%" direction="row" gap={1} flexWrap="wrap">
            {selectedValue.sizes?.length == 0 ? (
              <Typography>Razmer ýok</Typography>
            ) : (
              selectedValue.sizes?.map((elem) => (
                <Stack
                  key={elem.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography>{elem.name}</Typography>
                  <TextField
                    autoComplete="off"
                    label="Haryt sany"
                    value={
                      textFieldValues.find((item) => item.size === elem.name)
                        ?.quantity || ""
                    }
                    onChange={(e) =>
                      handleTextFieldChange(elem.name, e.target.value)
                    }
                    size="small"
                    fullWidth
                    sx={inputsStyle2}
                  />
                </Stack>
              ))
            )}
          </Stack>
        </Stack> */}
      </Stack>
    </>
  );
};

export default Forms;
