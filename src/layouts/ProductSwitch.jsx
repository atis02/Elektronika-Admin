import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

const ProductSwitchComponent = ({ data, onChange }) => {
  // Initialize the switch state based on `data`
  const [switchState, setSwitchState] = useState(data?.isActive || true);

  useEffect(() => {
    // Update the state when `data` changes
    if (data) {
      setSwitchState(data.isActive);
    }
  }, [data]);

  const handleSwitchChange = (event) => {
    const { checked } = event.target;
    setSwitchState(checked);

    // Call the parent's `onChange` method (if provided) to notify about the update
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        pl: 1,
        pr: 1,
        border: "1px solid gray",
        borderRadius: "8px",
        minWidth: "50%",
        // maxWidth: "400px",
        // mt: 1,
      }}
    >
      <Typography variant="h6">Haryt aktiw</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={switchState}
            onChange={handleSwitchChange}
            // color="#00B69B"
            sx={{
              color: "#00B69B",
            }}
          />
        }
        // label={switchState ? "Aktiw" : "Aktiw däl"}
      />
      {/* <Typography variant="body2" color="textSecondary">
        Current State: {switchState ? "Enabled" : "Disabled"}
      </Typography> */}
    </Box>
  );
};

export default ProductSwitchComponent;
