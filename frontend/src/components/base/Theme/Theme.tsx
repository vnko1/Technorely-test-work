import React, { use } from "react";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";

import { AppContext } from "@/context";

import { CustomIconButton } from "..";

const Theme: React.FC = () => {
  const { isDark, toggleTheme } = use(AppContext);
  return (
    <CustomIconButton onClick={toggleTheme}>
      {isDark ? <TbSunFilled /> : <TbMoonFilled />}
    </CustomIconButton>
  );
};

export default Theme;
