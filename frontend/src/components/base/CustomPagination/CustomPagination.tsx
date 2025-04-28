import React from "react";
import Pagination from "@mui/material/Pagination";

interface Props {
  total: number;
  limit: number;
  offset: number;
  onChange: (event: React.ChangeEvent<unknown>, offset: number) => void;
}
const CustomPagination: React.FC<Props> = ({
  total,
  limit,
  onChange,
  offset,
}) => {
  const count = Math.ceil(total / limit);

  if (count < 2) return null;
  return (
    <Pagination
      color="primary"
      hidePrevButton
      hideNextButton
      onChange={onChange}
      count={count}
      page={offset}
    />
  );
};

export default CustomPagination;
