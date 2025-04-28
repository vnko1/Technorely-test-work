import { AppContext } from "@/context";
import { Role } from "@/types";
import React, { use } from "react";
import { AdminDashboard, UserDashboard } from "./components";

const Dashboard: React.FC = () => {
  const { user } = use(AppContext);
  return user?.role === Role.User ? <UserDashboard /> : <AdminDashboard />;
};

export default Dashboard;
