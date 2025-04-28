import React from "react";
import { SxProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

interface Props {
  classnames?: string;
  show?: boolean;
  withBackdrop?: boolean;
  sx?: SxProps;
}
const Loader: React.FC<Props> = ({
  classnames,
  show = true,
  withBackdrop = false,
  sx,
}) => {
  if (!show) return null;

  if (withBackdrop)
    return (
      <Backdrop open={show} sx={{ zIndex: 100, ...sx }}>
        <CircularProgress />
      </Backdrop>
    );
  return (
    <div className={`self-center ${classnames}`}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
