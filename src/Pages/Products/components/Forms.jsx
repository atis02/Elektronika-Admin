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
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import { getSizeTable } from "../../../Components/db/Redux/api/SizeSlice";
import { useDispatch, useSelector } from "react-redux";

const Forms = ({
  formValues,
  handleProductTypeInputChange,
  handleProductTypeInputChange2,
  error,
}) => {
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
        {/* <Stack spacing={2} mt={2} direction="row">
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
        </Stack> */}
        <Stack spacing={2} pt={1} direction="row">
          <textarea
            placeholder="Beýan (TM)"
            value={formValues.descriptionTm}
            onChange={(e) =>
              handleProductTypeInputChange2("descriptionTm", e.target.value)
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
              handleProductTypeInputChange2("descriptionRu", e.target.value)
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
              handleProductTypeInputChange2("descriptionEn", e.target.value)
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

        <Stack spacing={2} pt={1} direction="row">
          <TextField
            autoComplete="off"
            label="Baha (satyn alnan)"
            type="number"
            name="incomePrice"
            value={formValues.incomePrice}
            onChange={(e) =>
              handleProductTypeInputChange2(
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
            name="sellPrice"
            error={error.sellPrice}
            value={formValues.sellPrice}
            onChange={handleProductTypeInputChange}
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

              handleProductTypeInputChange2(
                // index,
                "discount_priceTMT",
                salePrice
              );
              handleProductTypeInputChange2(
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
            value={Number(formValues.discount_pricePercent).toFixed(2)}
            onChange={(e) => {
              const salePricePercent = e.target.value;
              const salePrice =
                formValues.sellPrice > 0
                  ? (formValues.sellPrice * salePricePercent) / 100
                  : 0;

              handleProductTypeInputChange2(
                // index,
                "discount_pricePercent",
                salePricePercent
              );
              handleProductTypeInputChange2(
                // index,
                "discount_priceTMT",
                salePrice
              );
            }}
            size="small"
            fullWidth
            sx={inputsStyle}
          />

          {/* <TextField
            autoComplete="off"
            label="Arzanladyş (%-de)"
            type="number"
            value={Number(formValues.discount_pricePercent).toFixed(2)} // Ensure 2 decimal places
            onChange={(e) => {
              const salePricePercent = e.target.value;
              const salePrice =
                formValues.sellPrice > 0
                  ? (formValues.sellPrice * salePricePercent) / 100
                  : 0;

              handleProductTypeInputChange2(
                "discount_pricePercent",
                Number(salePricePercent).toFixed(2) // Ensure 2 decimal places
              );
              handleProductTypeInputChange2("discount_priceTMT", salePrice);
            }}
            size="small"
            fullWidth
            sx={inputsStyle}
          /> */}
          <TextField
            autoComplete="off"
            label="Haryt sany"
            type="number"
            name="productQuantity"
            error={error.productQuantity}
            value={Number(formValues.productQuantity)}
            onChange={handleProductTypeInputChange}
            // onChange={(e) => {
            //   handleProductTypeInputChange(
            //     "productQuantity",
            //     parseInt(e.target.value)
            //   );
            // }}
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
              {formValues.sellPrice} -{" "}
              {Number(formValues.discount_pricePercent).toFixed(2)}% ={" "}
              {(
                Number(formValues.sellPrice) -
                (Number(formValues.sellPrice) *
                  Number(formValues.discount_pricePercent).toFixed(2)) /
                  100
              ).toFixed(2)}
            </Typography>
          ) : (
            <Typography fontFamily="Montserrat" fontWeight={600} fontSize={22}>
              {Number(formValues.sellPrice)}
            </Typography>
          )}
        </Stack>
        <Divider sx={{ mt: 2, bgcolor: "gray" }} />
      </Stack>
    </>
  );
};

export default Forms;
