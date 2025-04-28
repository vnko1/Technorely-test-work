import React from "react";

import { IUser, Route } from "@/types";
import clsx from "clsx";
import { Link } from "react-router";

interface Props extends IUser {
  classnames?: string;
}

const DashBoardUserCard: React.FC<Props> = ({
  classnames,
  username,
  role,
  email,
  id,
}) => {
  return (
    <div
      className={clsx("dashboardCard flex flex-col items-center", classnames)}
    >
      <h3>
        <strong>Username: </strong>
        {username}
      </h3>
      <div className="flex gap-10">
        <p>
          <strong>Email: </strong>
          {email}
        </p>
        <p>
          <strong>Role: </strong>
          {role}
        </p>
      </div>
      <Link className="link" to={`${Route.USER}/${id}`}>
        Details
      </Link>
    </div>
  );
};

export default DashBoardUserCard;
