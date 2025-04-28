import React, { useMemo } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import { useHandleApi } from "@/hooks";
import { privateApi } from "@/api";
import { Endpoints, UsersType } from "@/types";
import { CustomPagination } from "@/components";

import { UsersFilters, AddUserModal, DashboardUsersList } from "..";
import { staleTime } from "@/utils";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

interface Props {
  classnames?: string;
}

const UsersSection: React.FC<Props> = ({ classnames }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("userPage") || "1");

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const { id, username, email, role, userCreatedAt, userLimit } = params;

  const parsedLimit = parseInt(userLimit);

  const { error, data, isLoading } = useQuery({
    queryKey: [
      "users",
      page,
      parsedLimit,
      userCreatedAt,
      id,
      role,
      username,
      email,
    ],
    queryFn: () => {
      const params: Record<string, unknown> = {
        offset: page - 1,
        limit: isNaN(parsedLimit) ? 10 : parsedLimit,
      };
      if (id) params.sort = id;
      if (role) params.role = role;
      if (username) params.username = username;
      if (email) params.email = email;
      if (userCreatedAt)
        params.createdAt = dayjs(userCreatedAt).format("YYYY/MM/DD");
      return privateApi.get<UsersType>(Endpoints.USERS, { params });
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime,
  });

  useHandleApi(error);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    newOffset: number
  ) => {
    searchParams.set("userPage", newOffset.toString());
    setSearchParams(searchParams);
  };

  return (
    <section className={clsx("section grid-users", classnames)}>
      <h2>Users</h2>
      <AddUserModal />
      <UsersFilters
        id={id}
        userCreatedAt={userCreatedAt}
        userLimit={userLimit}
        username={username}
        role={role}
        email={email}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <DashboardUsersList isLoading={isLoading} users={data?.data.data} />
      {data ? (
        <div className="flex justify-center">
          <CustomPagination
            total={data.data.meta.total}
            limit={data.data.meta.limit}
            offset={data.data.meta.offset + 1}
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </section>
  );
};

export default UsersSection;
