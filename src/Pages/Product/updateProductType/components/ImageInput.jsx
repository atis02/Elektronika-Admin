import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Stack, Button, Typography, Divider, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { toast } from "react-toastify";
import "../../../../Components/db/utils/swiper.css";
import { useThemeContext } from "../../../../Components/db/Theme/ThemeContext";
import { BASE_URL_Img } from "../../../../Components/db/Redux/api/AxiosHelper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SwiperWithFileInput = ({ images, setImages, handleFileChange }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mode } = useThemeContext();

  const handleClear = () => {
    setImages(Array(5).fill(null));
  };
  const handleDeleteImg = (idx) => {
    const filtered = images.filter((item, index) => index !== idx);
    setImages(filtered);
  };
  return (
    <Stack
      spacing={2}
      width="55%"
      sx={{
        border: "1px solid gray",
        borderRadius: 3,
        // padding: 2,
        pt: 1,
        pb: 1,
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography>Suratlaryň sany 1-5 çenli bolmaly.</Typography>
      {/* Слайды изображений */}
      {images?.length > 0 ? (
        <Stack direction="row">
          {/* Основной слайдер */}
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            style={{
              width: "350px",
              height: "300px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {images?.map(
              (imgSrc, index) =>
                imgSrc && (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imgSrc.startsWith("blob:") ? (
                      <img
                        src={imgSrc}
                        alt={`Slide ${index + 1}`}
                        style={{
                          position: "absolute",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          inset: 0,
                          top: 0,
                          marginLeft: 23,
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <img
                        src={`${BASE_URL_Img}/images${imgSrc}`}
                        alt={`Slide ${index + 1}`}
                        style={{
                          position: "absolute",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          inset: 0,
                          top: 0,
                          marginLeft: 23,
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </SwiperSlide>
                )
            )}
          </Swiper>
          <Stack>
            <Typography fontSize={14}>
              * Suratlaryň göwrümi 2MB kän bolmaly däl
            </Typography>

            {/* Миниатюры */}
            {/* <Stack direction="column" width="40%"> */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              // spaceBetween={55}
              slidesPerView={5}
              style={{
                display: "flex",
                flexDirection: "column",
                // width: "100px",
                marginTop: 10,
                width: "300px",
                height: "300px",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {images?.map(
                (imgSrc, index) =>
                  imgSrc && (
                    <SwiperSlide key={index}>
                      {imgSrc.startsWith("blob:") ? (
                        <>
                          <img
                            src={imgSrc}
                            alt={`Slide ${index + 1}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                              cursor: "pointer",
                              border: "1px solid gray",
                              borderRadius: 4,
                            }}
                          />
                          <IconButton
                            sx={{
                              width: 30,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                              ml: 1.5,
                              color: "red",
                            }}
                            onClick={() => handleDeleteImg(index)}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <img
                            src={`${BASE_URL_Img}/images${imgSrc}`}
                            alt={`Slide ${index + 1}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                              cursor: "pointer",
                              border: "1px solid gray",
                              borderRadius: 4,
                            }}
                          />
                          <IconButton
                            sx={{
                              width: 30,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                              ml: 1.5,
                              color: "red",
                            }}
                            onClick={() => handleDeleteImg(index)}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </>
                      )}
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Stack>
          {/* </Stack> */}
        </Stack>
      ) : (
        <AddPhotoAlternateIcon sx={{ width: 50, height: 50 }} />
        // <Typography>Surat goşuň</Typography>
      )}

      {/* Кнопки для загрузки изображений */}
      <Stack
        direction="row"
        // spacing={1}
        width="100%"
        justifyContent="space-around"
        sx={{ flexWrap: "wrap", gap: 0.5 }}
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {images?.map((image, index) => (
            <Button
              key={index}
              component="label"
              variant="outlined"
              color="primary"
              // disabled={activeIndex === index}
              sx={{
                textTransform: "none",
                padding: "5px 10px",
                fontSize: "14px",
                color:
                  activeIndex === index || image !== null
                    ? "#00B69B"
                    : "inherit",
                borderColor:
                  activeIndex === index || image !== null ? "#00B69B" : "gray",
                "&:hover": {
                  borderColor: "#00B69B",
                },
              }}
            >
              <AddPhotoAlternateIcon />
              {`Surat ${index + 1}`}
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
              />
            </Button>
          ))}
        </Stack>
        <Stack>
          {images?.some((img) => img) && (
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#00B69B",
                textTransform: "revert",
                fontWeight: 500,
                fontSize: 16,
              }}
              onClick={handleClear}
            >
              Arassala
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Кнопка очистки */}
    </Stack>
  );
};

export default SwiperWithFileInput;
