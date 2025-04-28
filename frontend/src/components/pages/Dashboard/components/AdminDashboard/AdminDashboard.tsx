import React from "react";
import { UsersSection, CompaniesSection, StatisticSection } from "../";

const AdminDashboard: React.FC = () => {
  return (
    <main className="page grid-container">
      <StatisticSection />
      <UsersSection />
      <CompaniesSection />
    </main>
  );
};

export default AdminDashboard;
