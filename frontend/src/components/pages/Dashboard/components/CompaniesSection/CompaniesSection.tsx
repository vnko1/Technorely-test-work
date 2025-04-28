import React from "react";
import clsx from "clsx";

import { useHandleApi, useQueryCompanies, useQueryParams } from "@/hooks";
import { CompaniesType, Endpoints } from "@/types";
import { CompaniesFilters, CustomPagination } from "@/components";
import { DashboardCompaniesList } from "..";

interface Props {
  classnames?: string;
}
const CompaniesSection: React.FC<Props> = ({ classnames }) => {
  const { params, page, handlePageChange, ...methods } = useQueryParams();

  const { name, service, createdAt, capital, capitalSorting, limit } = params;

  const parsedLimit = parseInt(limit);

  const { data, isLoading, error } = useQueryCompanies<CompaniesType>(
    Endpoints.COMPANIES,
    params,
    page,
    isNaN(parsedLimit) ? 10 : parsedLimit
  );

  useHandleApi(error);

  return (
    <section
      className={clsx("section grid-companies place-self-start", classnames)}
    >
      <h2 className="lg:mb-[74px]">Companies</h2>

      <CompaniesFilters
        name={name}
        capital={capital}
        service={service}
        createdAt={createdAt}
        capitalSorting={capitalSorting}
        limit={limit}
        withLimit
        classnames="lg:pb-[144px]"
        {...methods}
      />
      <DashboardCompaniesList
        companies={data?.data.data}
        isLoading={isLoading}
      />
      {data ? (
        <div className="flex justify-center">
          <CustomPagination
            total={data.data.meta.total}
            limit={data.data.meta.limit}
            offset={data.data.meta.offset + 1}
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </section>
  );
};

export default CompaniesSection;
