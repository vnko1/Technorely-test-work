import React from "react";
import Slider from "@mui/material/Slider";

interface Props {
  value?: number;
  label: string;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}
const CustomSlider: React.FC<Props> = ({
  value = 10,
  label,
  min = 1,
  max,
  onChange,
}) => {
  const handleChange = (_: Event, newValue: number) => {
    onChange(newValue);
  };
  return (
    <Slider
      value={value}
      onChange={handleChange}
      aria-label={label}
      valueLabelDisplay="on"
      min={min}
      max={max}
    />
  );
};

export default CustomSlider;
