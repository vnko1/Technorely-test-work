import React, { use } from "react";
import { Navigate, Outlet } from "react-router";

import { AppContext } from "@/context";
import { Route } from "@/types";

const RestrictedRoute: React.FC = () => {
  const { user } = use(AppContext);

  if (user) return <Navigate to={Route.DASHBOARD} />;
  return <Outlet />;
};

export default RestrictedRoute;
