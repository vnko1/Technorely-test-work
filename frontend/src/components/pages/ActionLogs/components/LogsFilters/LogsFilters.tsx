import React from "react";
import dayjs from "dayjs";
import { useDebouncedCallback } from "use-debounce";
import { TextField } from "@mui/material";
import { FaTrash } from "react-icons/fa";

import {
  CustomButton,
  CustomDatePicker,
  CustomIconButton,
  CustomSelect,
  CustomSlider,
} from "@/components";
import { actionsFilters, sort } from "@/utils";
import { IQueryMethods } from "@/types";

interface Props extends Omit<IQueryMethods, "handlePageChange"> {
  id: string;
  action: string;
  createdAt: string;
  entityName: string;
  limit: string;
}

const LogsFilters: React.FC<Props> = ({
  id,
  action,
  createdAt,
  entityName,
  limit,
  handleSelect,
  handleDateChange,
  handleInputChange,
  clearParams,
  handleLimitChange,
}) => {
  const handleEntityNameChange = useDebouncedCallback(
    handleInputChange("entityName"),
    300
  );

  return (
    <div className="paper">
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
        <h2>Filters</h2>
        <div className="flex flex-wrap gap-10">
          <CustomSelect
            label="Actions"
            items={actionsFilters}
            onChange={handleSelect("action")}
            value={action}
          />
          <CustomIconButton
            disabled={!action}
            onClick={() => clearParams("action")}
          >
            <FaTrash />
          </CustomIconButton>
        </div>
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
          onClick={() => clearParams("id", "createdAt", "action")}
          disabled={!id && !createdAt && !action}
        >
          Clear All
        </CustomButton>
        <TextField
          type="text"
          label="Entity name"
          variant="outlined"
          defaultValue={entityName}
          onChange={handleEntityNameChange}
        />
      </div>
      <div className="flex flex-col gap-8">
        <h2>Total</h2>
        <CustomSlider
          max={50}
          label="Total"
          onChange={handleLimitChange}
          value={parseInt(limit || "10")}
        />
      </div>
    </div>
  );
};

export default LogsFilters;
