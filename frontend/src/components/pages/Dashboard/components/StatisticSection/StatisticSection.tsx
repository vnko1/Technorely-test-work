import React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import { DashboardStatisticCard, Loader, NoContent } from "@/components";
import { privateApi } from "@/api";
import { Endpoints, IStatistic } from "@/types";
import { useHandleApi } from "@/hooks";
import { staleTime } from "@/utils";

interface Props {
  classnames?: string;
}

const StatisticSection: React.FC<Props> = ({ classnames }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["statistic"],
    queryFn: () => privateApi.get<IStatistic>(Endpoints.STATISTIC),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime,
  });

  useHandleApi([error]);

  if (isLoading) return <Loader />;
  if (!data) return <NoContent />;

  return (
    <section className={clsx("section grid-stat", classnames)}>
      <DashboardStatisticCard statistic={data.data} />
    </section>
  );
};

export default StatisticSection;
