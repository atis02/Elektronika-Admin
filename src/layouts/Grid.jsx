import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles"; // Correct import

const CustomGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const GridComponent = ({ children }) => {
  return (
    <CustomGrid container spacing={2}>
      <CustomGrid item xs={12} sm={6} md={4}>
        {children}
      </CustomGrid>
    </CustomGrid>
  );
};

export default GridComponent;
