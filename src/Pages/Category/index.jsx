import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Get from "./components/Get";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import CreateCategoryModal from "./components/CreateCategoryModal";
const index = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleOpenCategory = () => setOpen(true);
  const handleCloseCategory = () => setOpen(false);

  const { mode } = useThemeContext();
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Box height="100vh" overflow="auto" width="100%">
      <Stack
        direction="row"
        p="5px 13px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={{
            ...(mode == "dark" ? { color: "inherit" } : { color: "#474747" }),
          }}
        >
          Kategoriýalar
        </Typography>
        <Stack width="65%">
          <TextField
            autoComplete="off"
            label="Gözleg..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 40,
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
            }}
          />
        </Stack>

        <Button
          onClick={handleOpenCategory}
          sx={{
            height: 40,
            color: "inherit",
            textTransform: "revert",
            fontWeight: 600,
            fontSize: 18,
            p: 1,
            ...(mode == "dark"
              ? { color: "#fff", bgcolor: "#00B69B" }
              : {
                  color: "#fff",
                  bgcolor: "#00B69B",
                  "&:hover": { color: "#fff", bgcolor: "#00B69B" },
                }),
          }}
          variant="outlined"
          // color="primary"
        >
          <AddIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
          Täze Kategoriýa
        </Button>
      </Stack>
      <Get searchTerm={searchTerm} />
      <CreateCategoryModal open={open} handleClose={handleCloseCategory} />
    </Box>
  );
};

export default index;
