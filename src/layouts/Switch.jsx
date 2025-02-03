import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

const SwitchComponent = ({ data, onChange }) => {
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
        justifyContent: "end",
        gap: 1,
        // p: 2,
        // border: "1px solid lightgray",
        borderRadius: "8px",
        // minWidth: "100%",
        maxWidth: "400px",
      }}
    >
      <Typography variant="h6">Ýagdaýy</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={switchState}
            onChange={handleSwitchChange}
            color="primary"
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

export default SwitchComponent;
