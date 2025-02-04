import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Stack, Button, Typography, Divider } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { toast } from "react-toastify";
import "../../../Components/db/utils/swiper.css";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";

const HoverImgInput = ({ images, setImages, handleFileChange }) => {
 console.log(images);

 const handleClear = () => {
   setImages(null);
 };

 return (
   <Stack
     spacing={1}
     width="70%"
     //   maxHeight="10%"
     minHeight="50px"
     sx={{
       border: "1px solid gray",
       borderRadius: 3,
       padding: 1,
     }}
     justifyContent="space-between"
     alignItems="center"
   >
     <Typography textAlign="center">
       Harydyň esasy suradynyň ölçegi 385x385 bolmaly.
     </Typography>
     {/* Слайды изображений */}
     {images ? (
       <img
         src={images}
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
     ) : (
       <AddPhotoAlternateIcon />
     )}
     {/* Кнопки для загрузки изображений */}
     <Stack
       direction="row"
       // spacing={1}
       width="100%"
       justifyContent="center"
       sx={{ flexWrap: "wrap", gap: 0.5 }}
     >
       <Button
         component="label"
         variant="outlined"
         color="primary"
         // disabled={activeIndex === index}
         sx={{
           textTransform: "none",
           padding: "5px 10px",
           fontSize: "14px",
           color: "#00B69B",
           borderColor: "#00B69B",
           "&:hover": {
             borderColor: "#00B69B",
           },
         }}
       >
         <AddPhotoAlternateIcon />
         Surat
         <input
           type="file"
           hidden
           onChange={handleFileChange}
           accept="image/*"
         />
       </Button>
       {images && (
         <Button
           variant="outlined"
           sx={{
             color: "#00B69B",
             borderColor: "#00B69B",
             textTransform: "revert",
           }}
           onClick={handleClear}
         >
           Arassala
         </Button>
       )}
     </Stack>
   </Stack>
 );
};

export default HoverImgInput;
