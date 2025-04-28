import React from "react";
import clsx from "clsx";
import Chip from "@mui/material/Chip";

import { IStatistic } from "@/types";
import { formateWord } from "@/utils";

interface Props {
  classnames?: string;
  statistic: IStatistic;
}

const colors: Array<
  "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
> = ["primary", "secondary", "success"];

const DashboardStatisticCard: React.FC<Props> = ({ statistic, classnames }) => {
  const renderData = Object.entries(statistic);
  return (
    <div className={clsx("dashboardCard inline-block", classnames)}>
      <div className="flex gap-10 justify-center">
        {renderData.map(([key, value], idx) => {
          return (
            <Chip
              key={idx}
              label={`${formateWord(key)}: ${value}`}
              color={colors[idx % colors.length]}
            ></Chip>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStatisticCard;
