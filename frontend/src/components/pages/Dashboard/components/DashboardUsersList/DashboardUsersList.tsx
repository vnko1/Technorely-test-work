import { DashBoardUserCard, Loader, NoContent } from "@/components/base";
import { IUser } from "@/types";
import React from "react";

interface Props {
  users?: IUser[];
  isLoading: boolean;
}
const DashboardUsersList: React.FC<Props> = ({ users = [], isLoading }) => {
  if (isLoading) return <Loader />;
  if (!users.length) return <NoContent />;

  return (
    <ul className="flex flex-col gap-1">
      {users.map((user) => (
        <li key={user.id}>
          <DashBoardUserCard key={user.id} {...user} />
        </li>
      ))}
    </ul>
  );
};

export default DashboardUsersList;
