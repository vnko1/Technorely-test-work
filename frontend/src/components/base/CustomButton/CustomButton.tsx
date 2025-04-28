import React from "react";

import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";
import { ButtonType, ColorType, SizeType, VariantType } from "@/types";

interface Props {
  children: React.ReactNode;
  variant?: VariantType;
  loading?: boolean;
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  color?: ColorType;
  onClick?: () => void;
  sx?: SxProps;
}

const CustomButton: React.FC<Props> = ({
  children,
  variant = "contained",
  type = "button",
  size = "large",
  color = "primary",
  ...props
}) => {
  return (
    <Button {...props} color={color} type={type} variant={variant} size={size}>
      {children}
    </Button>
  );
};

export default CustomButton;
