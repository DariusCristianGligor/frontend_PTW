import React, { Component, useState } from "react";
import { Box, minWidth } from "@mui/system";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
const MyTextField = ({
  onChangeTextField,
  errorMessaje,
  min,
  max,
  ...rest
}) => {
  const [objectError, setObjectError] = useState(false);
  const handleOnChange = (input) => {
    setObjectError(true);
    if (input.length < min || input.length > max) {
      setObjectError(true);
    } else {
      setObjectError(false);
    }
    onChangeTextField(input);
  };
  return (
    <Box>
      <TextField
        sx={{
          width: "100%",
          maxWidth: "100%",
          spacing: 10,
        }}
        error={objectError}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        {...rest}
      ></TextField>
      {objectError ? <Alert severity="error">{errorMessaje}</Alert> : ""}
    </Box>
  );
};

export default MyTextField;
