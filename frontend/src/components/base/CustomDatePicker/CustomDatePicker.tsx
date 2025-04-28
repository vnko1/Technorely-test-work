import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface Props {
  value: PickerValue;
  onChange: (value: PickerValue) => void;
  label: string;
}
const CustomDatePicker: React.FC<Props> = ({ onChange, value, label }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="DD/MM/YYYY"
    />
  );
};

export default CustomDatePicker;
