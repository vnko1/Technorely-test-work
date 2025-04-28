import React from "react";
import clsx from "clsx";
import { ILog } from "@/types";
import { getTextFromMeta } from "@/utils";

interface Props extends ILog {
  classnames?: string;
}

const ActionCard: React.FC<Props> = ({
  classnames,
  action,
  createdAt,
  entityName,
  metadata,
  user,
  company,
}) => {
  return (
    <div className={clsx("card", classnames)}>
      <h2>
        <strong>Action type:</strong> {action}
      </h2>
      <p>
        <strong>Time:</strong> {createdAt}{" "}
      </p>
      <p>
        <strong>Entity:</strong> {entityName}
      </p>
      {metadata ? <p>{getTextFromMeta(metadata)}</p> : null}
      {user ? (
        <div className="flex flex-col gap-2">
          <h3>
            <strong>User:</strong>
          </h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ) : null}
      {company ? (
        <div className="flex flex-col gap-2">
          <h3>
            <strong>User:</strong>
          </h3>
          <p>{company.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ActionCard;
