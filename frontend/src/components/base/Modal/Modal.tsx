import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import MUIModal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { MdClose } from "react-icons/md";
import CustomIconButton from "../CustomIconButton/CustomIconButton";

interface Props {
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  active: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "100%",
  bgcolor: "#303644",
  boxShadow: 24,
  p: 4,
};

const Modal: FC<Props> = ({ setActive, children, active }) => {
  const handleClose = () => setActive(false);

  return (
    <MUIModal open={active} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-end">
          <CustomIconButton onClick={handleClose}>
            <MdClose />
          </CustomIconButton>
        </div>
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
