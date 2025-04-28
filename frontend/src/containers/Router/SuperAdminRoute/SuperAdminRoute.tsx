import React, { use } from "react";
import { Outlet, Navigate } from "react-router";

import { AppContext } from "@/context";
import { Role, Route } from "@/types";

const SuperAdminRoute: React.FC = () => {
  const { user, isLoading } = use(AppContext);

  if (isLoading) return null;

  if (user?.role === Role.SuperAdmin) return <Outlet />;

  return <Navigate to={Route.DASHBOARD} />;
};

export default SuperAdminRoute;
