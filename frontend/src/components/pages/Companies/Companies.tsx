import React from "react";

import { CompaniesType, Endpoints } from "@/types";
import { useHandleApi, useQueryCompanies, useQueryParams } from "@/hooks";
import { CustomPagination, CompaniesFilters } from "@/components";
import { AddCompany, CompaniesList } from "./components";

const Companies: React.FC = () => {
  const { params, page, handlePageChange, ...methods } = useQueryParams();

  const { name, service, createdAt, capital, capitalSorting } = params;

  const { data, isLoading, error } = useQueryCompanies<CompaniesType>(
    Endpoints.LIST,
    params,
    page
  );

  useHandleApi(error);

  return (
    <main className="page">
      <section className="section">
        <AddCompany />
        <div className="flex flex-col gap-10 lg:h-[70vh] lg:flex-row relative overflow-y-auto">
          <div className="paper flex-1 lg:sticky lg:top-0 overflow-y-auto">
            <CompaniesFilters
              name={name}
              capital={capital}
              service={service}
              createdAt={createdAt}
              capitalSorting={capitalSorting}
              {...methods}
            />
          </div>
          <div className="section flex-2">
            <CompaniesList companies={data?.data.data} isLoading={isLoading} />
          </div>
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1"></div>{" "}
            {data ? (
              <div className="flex-2 flex justify-center">
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

export default Companies;
