import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

import { Endpoints, ICompany, Route } from "@/types";
import { privateApi } from "@/api";
import { useHandleApi } from "@/hooks";
import { Loader } from "@/components";
import { staleTime } from "@/utils";
import { CompanyDelete, CompanyDetail } from "./components";

const Company: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["company", id],
    queryFn: () => privateApi.get<ICompany>(`${Endpoints.COMPANY}/${id}`),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: staleTime,
  });

  useHandleApi(error);

  if (isLoading) return <Loader withBackdrop />;

  if (!data) return <Navigate to={Route.COMPANIES} />;

  return (
    <main className="page">
      <section className="section lg:max-w-[60%]">
        <div className="paper">
          <CompanyDetail {...data.data} />
        </div>
        <div className="paper">
          <CompanyDelete id={id} />
        </div>
      </section>
    </main>
  );
};

export default Company;
