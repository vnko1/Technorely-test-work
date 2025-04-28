import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    newOffset: number
  ) => {
    searchParams.set("page", newOffset.toString());
    setSearchParams(searchParams);
  };

  const handleSelect = (paramName: string) => (value: string) => {
    searchParams.set(paramName, value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleDateChange = (value: PickerValue) => {
    const formattedDate = dayjs(value).format("YYYY/MM/DD");

    searchParams.set("createdAt", formattedDate);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleInputChange =
    (paramName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        searchParams.set(paramName, value);
      } else {
        searchParams.delete(paramName);
      }
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    };

  const clearParams = (...args: string[]) => {
    args.forEach((arg) => searchParams.delete(arg));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleLimitChange = (value: number) => {
    searchParams.set("limit", `${value}`);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return {
    page,
    params,
    handlePageChange,
    handleSelect,
    clearParams,
    handleDateChange,
    handleInputChange,
    handleLimitChange,
  };
};
