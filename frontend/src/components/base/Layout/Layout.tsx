import React from "react";
import { Outlet } from "react-router";

import { Navbar } from "@/components";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
