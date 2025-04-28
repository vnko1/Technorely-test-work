import React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { FaTrash } from "react-icons/fa";

import { sort } from "@/utils";
import {
  CustomButton,
  CustomDatePicker,
  CustomSelect,
  CustomSlider,
  CustomIconButton,
} from "@/components";
import { IQueryMethods } from "@/types";

interface Props extends Omit<IQueryMethods, "handlePageChange"> {
  name?: string;
  service?: string;
  createdAt?: string;
  capital?: string;
  capitalSorting?: string;
  limit?: string;
  withLimit?: boolean;
  classnames?: string;
}

const CompaniesFilters: React.FC<Props> = ({
  name = "",
  service = "",
  createdAt,
  capital,
  capitalSorting = "",
  limit,
  withLimit,
  handleSelect,
  handleDateChange,
  handleInputChange,
  handleLimitChange,
  clearParams,
  classnames,
}) => {
  const handleCapitalChange = useDebouncedCallback(
    handleInputChange("capital"),
    300
  );

  return (
    <div className={`flex flex-col paper ${classnames}`}>
      <div className="flex flex-col gap-8">
        <h2>Sort</h2>
        <div className="flex flex-wrap gap-10">
          <CustomSelect
            label="Name"
            items={sort}
            onChange={handleSelect("name")}
            value={name}
          />
          <CustomSelect
            label="Service"
            items={sort}
            onChange={handleSelect("service")}
            value={service}
          />
          <CustomSelect
            label="Capital"
            items={sort}
            onChange={handleSelect("capitalSorting")}
            value={capitalSorting}
          />
          <CustomIconButton
            disabled={!name && !service && !capitalSorting}
            onClick={() => clearParams("name", "service", "capitalSorting")}
          >
            <FaTrash />
          </CustomIconButton>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2>Filters</h2>
        <div className="flex flex-wrap gap-20">
          <CustomDatePicker
            label="Created at"
            onChange={handleDateChange}
            value={dayjs(createdAt || new Date())}
          />
          <CustomIconButton
            disabled={!createdAt}
            onClick={() => clearParams("createdAt")}
          >
            <FaTrash />
          </CustomIconButton>
        </div>
        <CustomButton
          onClick={() =>
            clearParams("name", "service", "createdAt", "capitalSorting")
          }
          disabled={!createdAt && !name && !service && !capitalSorting}
        >
          Clear All
        </CustomButton>
        <TextField
          type="number"
          label="Capital"
          variant="outlined"
          defaultValue={capital}
          onChange={handleCapitalChange}
        />
      </div>
      {withLimit ? (
        <div className="flex flex-col gap-8">
          <h2>Total</h2>
          <CustomSlider
            max={50}
            label="Total"
            onChange={handleLimitChange}
            value={parseInt(limit || "10")}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CompaniesFilters;
