import React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import dayjs from "dayjs";

import { CustomPagination } from "@/components";
import { privateApi } from "@/api";
import { Endpoints, LogsApiType } from "@/types";
import { useHandleApi, useQueryParams } from "@/hooks";

import { LogsFilters, LogsList } from "./components";

const ActionLogs: React.FC = () => {
  const { params, page, handlePageChange, ...methods } = useQueryParams();
  const { id, action, createdAt, entityName, limit } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["logs", page - 1, id, action, createdAt, entityName, limit],
    refetchInterval: 1000 * 60,
    placeholderData: keepPreviousData,
    retry: false,
    queryFn: () => {
      const params: Record<string, unknown> = {
        offset: page - 1,
        sort: id || "DESC",
      };

      if (action) params.action = action;
      if (entityName) params.entityName = entityName;
      if (createdAt) params.createdAt = dayjs(createdAt).format("YYYY/MM/DD");
      if (limit) params.limit = limit;
      return privateApi.get<LogsApiType>(Endpoints.LOGS, {
        params,
      });
    },
  });

  useHandleApi([error]);
  return (
    <main className="page">
      <section className="section">
        <div className="flex flex-col gap-10 lg:h-[70vh] lg:flex-row relative overflow-y-auto">
          <div className="paper flex-1 lg:sticky lg:top-0 overflow-y-auto">
            <LogsFilters
              id={id}
              action={action}
              createdAt={createdAt}
              entityName={entityName}
              limit={limit}
              {...methods}
            />
          </div>
          <div className="section flex-2">
            <LogsList logs={data?.data.data} isLoading={isLoading} />
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-1"></div>
          {data ? (
            <div className="flex-2 flex justify-center">
              <CustomPagination
                total={data.data.meta.total}
                limit={data.data.meta.limit}
                offset={data.data.meta.offset + 1}
                onChange={handlePageChange}
              />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default ActionLogs;
