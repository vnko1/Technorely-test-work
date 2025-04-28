export enum Endpoints {
  AUTH = "/auth",
  LOGIN = `${AUTH}/login`,
  REGISTER = `${AUTH}/register`,
  REFRESH = `${AUTH}/refresh`,
  RESET = `${AUTH}/password/reset`,
  SET = `${AUTH}/password/set`,
  LOGOUT = `${AUTH}/logout`,

  USERS = "/users",
  ME = `${USERS}/me`,
  PASSWORD = `${ME}/password`,
  AVATAR = `${ME}/avatar`,
  ADMIN = `${USERS}/admin`,

  COMPANIES = "/companies",
  COMPANY = `${COMPANIES}/company`,
  LIST = `${COMPANIES}/list`,
  USER_COMPANIES = `${COMPANIES}/user`,

  LOGS = "logs",

  STATISTIC = "statistic",
}
