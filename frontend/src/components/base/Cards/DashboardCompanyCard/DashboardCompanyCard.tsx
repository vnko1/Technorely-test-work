import React from "react";
import { Link } from "react-router";
import clsx from "clsx";

import { ICompany, Route } from "@/types";
interface Props extends ICompany {
  classnames?: string;
}

const DashboardCompanyCard: React.FC<Props> = ({
  name,
  classnames,
  capital,
  currency,
  id,
}) => {
  return (
    <div
      className={clsx("dashboardCard flex flex-col items-center", classnames)}
    >
      <h3 className="text-center">
        <strong>Company name: </strong>
        {name}
      </h3>
      <p className="text-center">
        <strong>Capital:</strong> {Number(capital).toLocaleString("en-US")}{" "}
        {currency}
      </p>
      <Link className="link" to={`${Route.COMPANIES}/${id}`}>
        Details
      </Link>
    </div>
  );
};

export default DashboardCompanyCard;
