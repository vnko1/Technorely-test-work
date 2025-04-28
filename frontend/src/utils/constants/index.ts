import { ActionLog, Role, Route } from "@/types";

export const accessToken = "access_token";

export const errorMessages = {
  email: {
    required: "Email is required",
    exist: "Email already exists",
    pattern: "Email is wrong",
  },
  password: {
    token: "Password reset token is required",
    required: "Password is required",
    requirement:
      "Password must be 8-30 characters, include uppercase, a number, and Latin letters only.",
    match: "Passwords don't match",
    unmatched: "The new password must be different from the current one",
  },
  role: { required: "Role is required" },
  username: { required: "Username is required" },
  company: {
    name: { required: "Name is required" },
    service: { required: "Service is required" },
    capital: { required: "Capital is required" },
    coords: { invalid: "Invalid coordinates" },

    logo: { required: "Logo is required" },
    update: "At least one field must be provided",
  },
  avatar: { deleted: "Avatar is already deleted" },
  logo: { deleted: "Logo is already deleted" },
};

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const userNameRegex =
  /^(?!.*[!@#\\$%^&*_+\-=~?]{2,})[A-Za-z0-9А-Яа-яҐЄІЇґєії!@#\\$%^&*_+\-=~?]{4,20}$/i;

export const coordsRegex = /^-?\d{1,2}\.\d+,\s?-?\d{1,3}\.\d+$/;

export const placeholder = "/placeholder.jpg";

export const publicRoutes = [Route.LOGIN, Route.SIGNUP];
export const privateRoutes = [Route.DASHBOARD, Route.COMPANIES, Route.PROFILE];
export const restrictedRoutes = [...privateRoutes, Route.ACTIONS];

export const sort = [
  { value: "ASC", label: "asc" },
  { value: "DESC", label: "desc" },
  { value: "", label: "" },
];

export const actionsFilters = [
  { value: ActionLog.CREATE, label: "Create" },
  { value: ActionLog.UPDATE, label: "Update" },
  { value: ActionLog.DELETE, label: "Delete" },
  { value: ActionLog.LOGIN, label: "Log in" },
  { value: ActionLog.LOGOUT, label: "Logout" },
  { value: "", label: "" },
];

export const rolesSelector = [
  { value: Role.Admin, label: "Admin" },
  { value: Role.User, label: "User" },
];

export const staleTime = 1000 * 60 * 5;
