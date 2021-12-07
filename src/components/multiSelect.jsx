import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  options,
  handleOptions,
  name,
  label,
  disabled,
  width,
}) {
  const [groupPermissions, setGroupPermissions] = React.useState([]);
  const handleChangeGroupPermissions = (e) => {
    setGroupPermissions(e.target.value);
    handleOptions(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: { width } }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          disabled={disabled}
          value={groupPermissions}
          onChange={handleChangeGroupPermissions}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => {
            return selected.reduce((acc, curentValue) => {
              if (acc === "") return `${curentValue.name}`;
              else return `${acc}, ${curentValue.name}`;
            }, "");
          }}
          // renderValue={(selected) => (selected ? selected.name.join(", ") : "")}
          MenuProps={MenuProps}
        >
          {options.map((x) => (
            <MenuItem key={x.id} value={x}>
              <Checkbox
                checked={
                  groupPermissions.find(
                    (permission) => permission.id === x.id
                  ) != undefined
                }
              />
              <ListItemText primary={x.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
