import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectItemType = { value: string | number; label: string };
interface Props {
  onChange: (value: string) => void;
  label: string;
  items: SelectItemType[];
  value: string;
}
const CustomSelect: React.FC<Props> = ({
  label,
  onChange,
  items,
  value = "",
}) => {
  const handleChange = (ev: SelectChangeEvent) => {
    onChange(ev.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange} autoWidth>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
