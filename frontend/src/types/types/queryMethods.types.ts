import React from "react";
import { PickerValue } from "@mui/x-date-pickers/internals";

export type HandlePageType = (e: React.ChangeEvent<unknown>, o: number) => void;

export type HandleSelectType = (p: string) => (v: string) => void;

export type HandleDateType = (v: PickerValue) => void;

export type HandleInputType = (
  p: string
) => (e: React.ChangeEvent<HTMLInputElement>) => void;

export type LimitChangeType = (v: number) => void;

export type ClearParamsType = (...a: string[]) => void;

export interface IQueryMethods {
  handlePageChange: HandlePageType;
  handleSelect: HandleSelectType;
  handleDateChange: HandleDateType;
  handleInputChange: HandleInputType;
  handleLimitChange: LimitChangeType;
  clearParams: ClearParamsType;
}
