import { keepPreviousData, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { privateApi } from "@/api";

interface IParams {
  [k: string]: string;
}

export const useQueryCompanies = <T>(
  path: string,
  params: IParams,
  page: number,
  limit = 10
) => {
  const { name, service, createdAt, capital, capitalSorting } = params;

  return useQuery({
    queryKey: [
      "companies",
      page - 1,
      name,
      service,
      capital,
      createdAt,
      capitalSorting,
      path,
      limit,
    ],
    queryFn: () => {
      const params: Record<string, unknown> = { offset: page - 1, limit };
      if (name) params.name = name;
      if (service) params.service = service;
      if (capital) params.capital = capital;
      if (capitalSorting) params.capitalSorting = capitalSorting;
      if (createdAt) params.createdAt = dayjs(createdAt).format("YYYY/MM/DD");
      return privateApi.get<T>(path, {
        params,
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
