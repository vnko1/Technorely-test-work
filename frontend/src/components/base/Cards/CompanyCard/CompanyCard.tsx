import React from "react";
import clsx from "clsx";
import { ICompany, Route } from "@/types";
import { coordsParser, placeholder } from "@/utils";
import { GoogleMap } from "@/components";
import { Link } from "react-router";

interface Props extends ICompany {
  classnames?: string;
}

const CompanyCard: React.FC<Props> = ({
  classnames,
  logo,
  name,
  service,
  capital,
  currency,
  coords,
  id,
}) => {
  return (
    <div className={clsx("card", classnames)}>
      <img
        src={logo || placeholder}
        alt={name}
        className="w-full max-w-1/3 mx-auto"
      />
      <h2>
        <strong>Name:</strong> {name}
      </h2>
      <div className="flex justify-between">
        <p>
          <strong>Service:</strong> {service}
        </p>
        <p>
          <strong>Capital:</strong> {Number(capital).toLocaleString("en-US")}{" "}
          {currency}
        </p>
      </div>
      {coords ? <GoogleMap center={coordsParser(coords)} /> : null}

      <Link className="button self-start" to={`${Route.COMPANIES}/${id}`}>
        Details
      </Link>
    </div>
  );
};

export default CompanyCard;
