import React from "react";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Endpoints, IUser, Route } from "@/types";
import { staleTime } from "@/utils";
import { privateApi } from "@/api";
import { useHandleApi } from "@/hooks";
import { Loader, Avatar, UserForm } from "@/components";
import { DeleteUserButton } from "./components";

const User: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => privateApi.get<IUser>(`${Endpoints.ADMIN}/${id}`),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime,
  });
  useHandleApi([error]);

  const user = data?.data;

  if (isLoading) return <Loader withBackdrop />;

  if (!user) return <Navigate to={Route.DASHBOARD} />;

  return (
    <main className="page">
      <section className="section lg:max-w-[60%]">
        <div className="paper">
          <Avatar
            user={user}
            queryKeys={[id || ""]}
            path={`${Endpoints.ADMIN}/${id}`}
          />
        </div>
        <div className="paper">
          <UserForm
            user={user}
            queryKeys={[id || ""]}
            path={`${Endpoints.ADMIN}/${id}`}
          />
        </div>
        {id ? (
          <div className="paper">
            <DeleteUserButton id={id} />
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default User;
