import React, { use } from "react";
import dayjs from "dayjs";
import { useDebouncedCallback } from "use-debounce";
import { TextField } from "@mui/material";
import { SetURLSearchParams } from "react-router";
import { FaTrash } from "react-icons/fa";

import { Role } from "@/types";
import {
  CustomButton,
  CustomDatePicker,
  CustomSelect,
  CustomIconButton,
  CustomSlider,
} from "@/components";
import { rolesSelector, sort } from "@/utils";
import { AppContext } from "@/context";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  id: string;
  userCreatedAt: string;
  userLimit: string;
  username: string;
  email: string;
  role: string;
}

const UsersFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  id,
  userCreatedAt,
  userLimit,
  username,
  email,
  role,
}) => {
  const { user } = use(AppContext);
  const handleEmailChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        searchParams.set("email", value);
      } else {
        searchParams.delete("email");
      }
      searchParams.set("userPage", "1");
      setSearchParams(searchParams);
    },
    300
  );
  const handleUsernameChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        searchParams.set("username", value);
      } else {
        searchParams.delete("username");
      }
      searchParams.set("userPage", "1");
      setSearchParams(searchParams);
    },
    300
  );

  const handleSelect = (paramName: string) => (value: string) => {
    searchParams.set(paramName, value);
    searchParams.set("userPage", "1");
    setSearchParams(searchParams);
  };

  const handleDateChange = (value: PickerValue) => {
    const formattedDate = dayjs(value).format("YYYY/MM/DD");

    searchParams.set("userCreatedAt", formattedDate);
    searchParams.set("userPage", "1");
    setSearchParams(searchParams);
  };

  const clearParams = (...args: string[]) => {
    args.forEach((arg) => searchParams.delete(arg));
    searchParams.set("userPage", "1");
    setSearchParams(searchParams);
  };

  const handleLimitChange = (value: number) => {
    searchParams.set("userLimit", `${value}`);
    searchParams.set("userPage", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col paper">
      <div className="flex flex-col gap-8">
        <h2>Sort</h2>
        <div className="flex flex-wrap gap-10">
          <CustomSelect
            label="Id"
            items={sort}
            onChange={handleSelect("id")}
            value={id}
          />
          <CustomIconButton disabled={!id} onClick={() => clearParams("id")}>
            <FaTrash />
          </CustomIconButton>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2>Filters</h2>{" "}
        <div className="flex flex-wrap gap-20 items-center">
          <CustomDatePicker
            label="Created at"
            onChange={handleDateChange}
            value={dayjs(userCreatedAt || new Date())}
          />
          {user?.role === Role.SuperAdmin ? (
            <CustomSelect
              label="User role"
              items={rolesSelector}
              onChange={handleSelect("role")}
              value={role}
            />
          ) : null}
          <CustomIconButton
            disabled={!userCreatedAt && !role}
            onClick={() => clearParams("userCreatedAt", "role")}
          >
            <FaTrash />
          </CustomIconButton>
        </div>
        <CustomButton
          onClick={() => clearParams("id", "userCreatedAt", "role")}
          disabled={!id && !userCreatedAt && !role}
        >
          Clear All
        </CustomButton>
        <TextField
          type="text"
          label="User email"
          variant="outlined"
          defaultValue={email}
          onChange={handleEmailChange}
        />
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          defaultValue={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="flex flex-col gap-8">
        <h2>Total</h2>
        <CustomSlider
          max={50}
          label="Total"
          onChange={handleLimitChange}
          value={parseInt(userLimit || "10")}
        />
      </div>
    </div>
  );
};

export default UsersFilters;
