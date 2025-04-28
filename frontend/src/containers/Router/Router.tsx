import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Route } from "@/types";
import {
  Dashboard,
  Layout,
  Login,
  NotFound,
  ResetPassword,
  SetPassword,
  Signup,
  Companies,
  Profile,
  PasswordChange,
  ActionLogs,
  Company,
  User,
} from "@/components";
import { PrivateRoute, RestrictedRoute, SuperAdminRoute } from "@/containers";

const router = createBrowserRouter([
  {
    path: Route.DASHBOARD,
    Component: Layout,
    children: [
      {
        Component: RestrictedRoute,
        children: [
          { path: Route.LOGIN, Component: Login },
          { path: Route.SIGNUP, Component: Signup },
          { path: Route.RESET, Component: ResetPassword },
          { path: `${Route.SET}/:token`, Component: SetPassword },
        ],
      },
      {
        Component: PrivateRoute,
        children: [
          { index: true, Component: Dashboard },
          { path: Route.COMPANIES, Component: Companies },
          { path: `${Route.COMPANIES}/:id`, Component: Company },
          { path: Route.PROFILE, Component: Profile },
          { path: Route.PASSWORD, Component: PasswordChange },
          { path: `${Route.USER}/:id`, Component: User },
        ],
      },
      {
        Component: SuperAdminRoute,
        children: [{ path: Route.ACTIONS, Component: ActionLogs }],
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
