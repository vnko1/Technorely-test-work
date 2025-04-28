import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

import { ICompany } from "@/types";
import { NoContent } from "@/components";

interface Props {
  companies?: Array<ICompany>;
}

const CustomChart: React.FC<Props> = ({ companies = [] }) => {
  const labels = useMemo(
    () => companies?.map((company) => company.name),
    [companies]
  );
  const capitals = useMemo(
    () => companies?.map((company) => Number(company.capital)),
    [companies]
  );

  if (!companies.length) return <NoContent />;

  return (
    <BarChart
      height={300}
      series={[{ data: capitals, type: "bar", stack: "total" }]}
      xAxis={[{ data: labels, scaleType: "band" }]}
    ></BarChart>
  );
};

export default CustomChart;
