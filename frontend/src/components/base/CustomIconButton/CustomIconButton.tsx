import React from "react";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material";

import { ButtonType, ColorType, SizeType } from "@/types";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  size?: SizeType;
  color?: ColorType;
  sx?: SxProps;
}
const CustomIconButton: React.FC<Props> = ({
  children,
  type = "button",
  color = "primary",
  size = "large",
  ...props
}) => {
  return (
    <IconButton {...props} type={type} color={color} size={size}>
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
