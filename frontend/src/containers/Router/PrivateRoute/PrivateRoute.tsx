import React, { use } from "react";
import { Navigate, Outlet } from "react-router";

import { Route } from "@/types";
import { AppContext } from "@/context";
import { Loader } from "@/components";

const PrivateRoute: React.FC = () => {
  const { user, isLoading } = use(AppContext);

  if (isLoading) return <Loader withBackdrop />;
  if (!user) return <Navigate to={Route.LOGIN} />;
  return <Outlet />;
};

export default PrivateRoute;
