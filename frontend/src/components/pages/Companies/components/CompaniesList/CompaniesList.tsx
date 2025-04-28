import React from "react";
import { ICompany } from "@/types";
import { CompanyCard, Loader, NoContent } from "@/components";

interface Props {
  companies?: ICompany[];
  isLoading: boolean;
}
const CompaniesList: React.FC<Props> = ({ companies = [], isLoading }) => {
  if (isLoading) return <Loader />;
  if (!companies.length) return <NoContent />;
  return (
    <div className="paper">
      <ul className="flex flex-col gap-20 items-center">
        {companies.map((company) => (
          <li key={company.id} className="w-full">
            <CompanyCard {...company} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesList;
