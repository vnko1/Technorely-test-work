import React from "react";

import { ICompany } from "@/types";
import { DashboardCompanyCard, Loader, NoContent } from "@/components";

interface Props {
  companies?: ICompany[];
  isLoading: boolean;
}

const DashboardCompaniesList: React.FC<Props> = ({
  companies = [],
  isLoading,
}) => {
  if (isLoading) return <Loader />;

  if (!companies.length) return <NoContent />;
  return (
    <ul className="flex flex-col gap-1">
      {companies.map((company) => (
        <li key={company.id}>
          <DashboardCompanyCard {...company} />{" "}
        </li>
      ))}
    </ul>
  );
};

export default DashboardCompaniesList;
