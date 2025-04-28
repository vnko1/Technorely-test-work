import React from "react";

import { ActionCard, Loader, NoContent } from "@/components";
import { ILog } from "@/types";

interface Props {
  logs?: Array<ILog>;
  isLoading: boolean;
}
const LogsList: React.FC<Props> = ({ logs = [], isLoading }) => {
  if (isLoading) return <Loader />;
  if (!logs.length) return <NoContent />;
  return (
    <div className="paper">
      <ul className="flex flex-col gap-20 items-center">
        {logs.map((log) => (
          <li key={log.id} className="w-full">
            <ActionCard {...log} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsList;
