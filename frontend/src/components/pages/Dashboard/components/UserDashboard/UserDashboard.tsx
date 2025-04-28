import React from "react";

import { CompaniesType, Endpoints } from "@/types";
import { useHandleApi, useQueryCompanies, useQueryParams } from "@/hooks";
import { CompaniesFilters, CustomPagination } from "@/components";
import { CustomChart, DashboardCompaniesList } from "../";

const UserDashboard: React.FC = () => {
  const { params, page, handlePageChange, ...methods } = useQueryParams();

  const { name, service, createdAt, capital, capitalSorting, limit } = params;

  const parsedLimit = parseInt(limit);

  const { data, isLoading, error } = useQueryCompanies<CompaniesType>(
    Endpoints.USER_COMPANIES,
    params,
    page,
    isNaN(parsedLimit) ? 10 : parsedLimit
  );

  useHandleApi(error);

  return (
    <main className="page">
      <section className="section">
        <div className="paper">
          <CompaniesFilters
            name={name}
            capital={capital}
            service={service}
            createdAt={createdAt}
            capitalSorting={capitalSorting}
            limit={limit}
            withLimit
            {...methods}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="paper flex-2">
            <CustomChart companies={data?.data.data} />
          </div>
          <div className="paper flex-1">
            <DashboardCompaniesList
              isLoading={isLoading}
              companies={data?.data.data}
            />
            {data?.data.data.length ? (
              <div className="flex justify-center">
                <CustomPagination
                  total={data.data.meta.total}
                  limit={data.data.meta.limit}
                  offset={data.data.meta.offset + 1}
                  onChange={handlePageChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserDashboard;
