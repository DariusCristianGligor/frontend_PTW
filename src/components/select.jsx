import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const Select2 = ({
  name,
  label,
  options,
  error,
  value,
  width,
  onChange,
  disabled,
}) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const onChangeValue = (event) => {
    console.log("    ", event.target.value);
    onChange(event);
    setSelectedValue(event.target.value);
  };
  return (
    <Box sx={{ minWidth: { width }, maxWidth: { width } }}>
      <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          disabled={disabled}
          onChange={onChangeValue}
          labelId={name}
          id={name}
          value={selectedValue}
        >
          {options.map((option) => (
            <MenuItem
              sx={{
                Width: 150,
                Width: 1000,
                maxHeight: 80,
                minHeight: 50,
              }}
              key={option.id}
              value={option.id}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
//  <div className={"form-group"}>
//    <label className="LabelSelect" htmlFor={name}>
//      {label}
//    </label>
//    <select
//      name={name}
//      id={name}
//      {...rest}
//      className="form-control"
//      value={value}
//    >
//      {options.map((option) => (
//        <option key={option.id} value={option.id}>
//          {option.name}
//        </option>
//      ))}
//    </select>
//  </div>;
export default Select2;
